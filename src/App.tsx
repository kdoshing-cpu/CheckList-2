import { useState, useEffect, useMemo } from 'react';
import { 
  Menu,
  X,
  CheckCircle2,
  ClipboardList,
  Database,
  ListTodo,
  Loader2,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { checklistData } from './data';
import { ChecklistState, Phase, ProspectingEntry } from './types';
import ChecklistView from './components/ChecklistView';
import { auth, db, loginWithGoogle, logout, OperationType, handleFirestoreError } from './firebase';
import { User } from 'firebase/auth';
import { 
  doc, 
  onSnapshot, 
  setDoc, 
  serverTimestamp
} from 'firebase/firestore';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [connStatus, setConnStatus] = useState<'testing' | 'ok' | 'offline'>('testing');
  
  const [completedTasks, setCompletedTasks] = useState<ChecklistState>(() => {
    // Inicializar desde localStorage como respaldo
    const saved = localStorage.getItem('pintura_labranza_progress');
    return saved ? JSON.parse(saved) : {};
  });
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Auth Listener & Connection
  useEffect(() => {
    // Check connection
    import('./firebase').then(async (m) => {
      try {
        await m.dbConnection;
        setConnStatus('ok');
      } catch (e) {
        setConnStatus('offline');
      }
    });

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Guardar en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('pintura_labranza_progress', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const handleLogin = async () => {
    setAuthLoading(true);
    setLoginError(null);
    try {
      await loginWithGoogle();
    } catch (error: any) {
      console.error("Auth Error:", error);
      if (error.code === 'auth/unauthorized-domain') {
        setLoginError('Dominio no autorizado. Debes añadir la URL de la app en la Consola de Firebase > Auth > Settings > Authorized Domains.');
      } else if (error.code === 'auth/admin-restricted-operation') {
        setLoginError('Operación restringida. Asegúrate de que el método de inicio de sesión esté habilitado en Firebase.');
      } else {
        setLoginError(`Error de autenticación: ${error.message || 'Error desconocido'}`);
      }
      setAuthLoading(false);
    }
  };

  // Sync Progress from Firestore (User-specific)
  useEffect(() => {
    if (!user) return;

    const docRef = doc(db, 'userProgress', user.uid);
    return onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const remoteTasks = snapshot.data().completedTasks || {};
        // Fusionar con local, priorizando el más completo o reciente si fuera necesario
        setCompletedTasks(prev => ({ ...prev, ...remoteTasks }));
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `userProgress/${user.uid}`);
    });
  }, [user]);

  const toggleTask = async (taskId: string) => {
    const newTasks = { ...completedTasks, [taskId]: !completedTasks[taskId] };
    setCompletedTasks(newTasks);
    
    if (user) {
      try {
        await setDoc(doc(db, 'userProgress', user.uid), {
          userId: user.uid,
          completedTasks: newTasks,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        // Silently fail or log, since we have localStorage
        console.error("Firestore sync failed, using localStorage");
      }
    }
  };

  const getPhaseProgress = (phase: Phase) => {
    const total = phase.tasks.length;
    const completed = phase.tasks.filter(t => completedTasks[t.id]).length;
    return (completed / total) * 100;
  };

  const totalProgress = useMemo(() => {
    const allTasks = checklistData.flatMap(p => p.tasks);
    const completed = allTasks.filter(t => completedTasks[t.id]).length;
    return allTasks.length > 0 ? (completed / allTasks.length) * 100 : 0;
  }, [completedTasks]);

  if (authLoading || !user) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-6">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-brand rounded-3xl flex items-center justify-center shadow-lg shadow-orange-200">
            <LayoutDashboard size={40} className="text-white" />
          </div>
        </motion.div>
        <h1 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">
          Pintura <span className="text-brand">Labranza</span> Pro
        </h1>
        
        {authLoading ? (
          <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
            <Loader2 className="w-3 h-3 animate-spin" />
            Verificando sesión...
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={handleLogin}
              className="flex items-center gap-3 px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 hover:scale-105 transition-all active:scale-95"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Ingresar con Google
            </button>
            
            {loginError && (
              <div className="flex flex-col items-center gap-4">
                <p className="text-red-500 font-bold text-xs bg-red-50 px-4 py-3 rounded-xl border border-red-100 max-w-sm text-center leading-relaxed">
                  {loginError}
                </p>
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 max-w-sm text-center">
                  <p className="text-orange-800 text-[10px] font-bold uppercase tracking-widest mb-2">Importante</p>
                  <p className="text-orange-700 text-xs font-medium leading-relaxed mb-4">
                    Si el error persiste, intenta abrir la aplicación en una <strong>nueva pestaña</strong> o asegúrate de que el acceso a Google esté habilitado en este proyecto.
                  </p>
                  <a 
                    href={window.location.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-orange-200 transition-colors"
                  >
                    Abrir en nueva pestaña
                  </a>
                </div>
              </div>
            )}
            
            {!loginError && (
              <div className="flex flex-col items-center gap-2">
                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                  Acceso Seguro & Sincronizado
                </p>
                <div className={`text-[9px] font-bold uppercase tracking-tighter flex items-center gap-1.5 px-2 py-0.5 rounded-full ${
                  connStatus === 'ok' ? 'text-emerald-500 bg-emerald-50' : 
                  connStatus === 'offline' ? 'text-red-500 bg-red-50' : 
                  'text-slate-400 bg-slate-100'
                }`}>
                  <div className={`w-1 h-1 rounded-full ${
                    connStatus === 'ok' ? 'bg-emerald-500 animate-pulse' : 
                    connStatus === 'offline' ? 'bg-red-500' : 
                    'bg-slate-400 animate-bounce'
                  }`} />
                  {connStatus === 'ok' ? 'Servidor Conectado' : 
                   connStatus === 'offline' ? 'Error de Conexión (Offline)' : 
                   'Verificando Red...'}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-50 text-slate-800 flex flex-col overflow-hidden font-sans">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shrink-0">
        <h1 className="font-bold tracking-tight text-slate-900 uppercase text-sm">
          Ferretería <span className="text-brand">Labranza</span>
        </h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className={`fixed lg:sticky top-0 left-0 h-full w-72 bg-sidebar text-white z-50 flex flex-col border-r border-slate-800 transition-all duration-300 ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
              }`}
            >
              <div className="p-6 border-b border-slate-800 shrink-0">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <h1 className="text-xl font-bold tracking-tight">
                      FERRETERÍA <span className="text-brand">LABRANZA</span>
                    </h1>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">
                      Checklist Pro
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden p-1 hover:bg-slate-800 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest shrink-0">
                Fases de Apertura
              </div>

              <nav className="flex-1 overflow-y-auto py-2">
                {checklistData.map((phase, idx) => {
                  const progress = getPhaseProgress(phase);
                  const isActive = activePhaseIndex === idx;
                  return (
                    <button
                      key={phase.id}
                      onClick={() => {
                        setActivePhaseIndex(idx);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center px-6 py-4 transition-all border-l-4 ${
                        isActive 
                          ? 'bg-brand text-white border-brand-dark' 
                          : 'hover:bg-slate-800 border-transparent'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded flex items-center justify-center text-xs mr-3 font-bold shrink-0 ${
                        isActive ? 'bg-brand-dark' : 'bg-slate-700'
                      }`}>
                        0{idx + 1}
                      </span>
                      <div className="flex flex-col text-left min-w-0">
                        <span className={`text-sm font-semibold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                          {phase.title.replace(/FASE \d+ — /, '')}
                        </span>
                        <span className={`text-[10px] ${isActive ? 'opacity-70' : 'text-slate-500'}`}>
                          {phase.subtitle}
                        </span>
                      </div>
                      {progress === 100 && !isActive && (
                        <CheckCircle2 className="w-3 h-3 ml-auto text-emerald-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="p-6 bg-slate-950 shrink-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Progreso Global</span>
                  <span className="text-xs font-bold text-brand">{Math.round(totalProgress)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-brand"
                    initial={{ width: 0 }}
                    animate={{ width: `${totalProgress}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                
                <div className="mt-6 flex items-center gap-3 px-2 border-t border-slate-800 pt-6">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-brand ring-2 ring-slate-800">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
                        {user?.displayName?.substring(0, 1) || user?.email?.substring(0, 1) || '?'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate text-slate-200">
                      {user?.displayName || 'Usuario'}
                    </p>
                    <button 
                      onClick={() => logout()}
                      className="text-[10px] font-bold text-slate-500 hover:text-brand uppercase tracking-tighter mt-0.5 transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter mt-0.5">
                      Sincronización Activa
                    </p>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Content Wrapper */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-hidden">
          <main className="flex-1 overflow-y-auto relative">
            <ChecklistView 
              activePhaseIndex={activePhaseIndex}
              setActivePhaseIndex={setActivePhaseIndex}
              completedTasks={completedTasks}
              toggleTask={toggleTask}
            />
          </main>
        </div>
      </div>

      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
