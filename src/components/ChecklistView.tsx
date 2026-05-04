import { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  Info, 
  ExternalLink,
  Rocket,
  Circle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { checklistData } from '../data';
import { Phase, ChecklistState } from '../types';

interface Props {
  activePhaseIndex: number;
  setActivePhaseIndex: (idx: number) => void;
  completedTasks: ChecklistState;
  toggleTask: (taskId: string) => void;
}

export default function ChecklistView({ activePhaseIndex, setActivePhaseIndex, completedTasks, toggleTask }: Props) {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const activePhase = checklistData[activePhaseIndex];
  const selectedTask = activePhase.tasks.find(t => t.id === selectedTaskId);

  // Set first task as selected by default when entering a phase
  useState(() => {
    if (activePhase.tasks.length > 0) {
      setSelectedTaskId(activePhase.tasks[0].id);
    }
  });

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden h-full">
      {/* Task List Header */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
          <div className="flex flex-col text-center sm:text-left">
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">
              Fase {activePhaseIndex + 1}: {activePhase.title.replace(/FASE \d+ — /, '')}
            </h2>
            <p className="text-sm text-slate-500">{activePhase.subtitle} • Gestión estratégica de apertura</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {activePhaseIndex > 0 && (
              <button 
                onClick={() => setActivePhaseIndex(activePhaseIndex - 1)}
                className="flex-1 sm:flex-none px-4 py-2 border border-slate-200 rounded text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Anterior
              </button>
            )}
            {activePhaseIndex < checklistData.length - 1 ? (
              <button 
                onClick={() => setActivePhaseIndex(activePhaseIndex + 1)}
                className="flex-1 sm:flex-none px-4 py-2 bg-sidebar text-white rounded text-sm font-medium hover:bg-brand transition-colors"
              >
                Siguiente Fase
              </button>
            ) : (
              <div className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 text-white rounded text-sm font-medium">
                Plan Finalizado
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-4 scroll-area">
          {activePhase.tasks.map((task) => {
            const isCompleted = completedTasks[task.id];
            const isSelected = selectedTaskId === task.id;
            return (
              <div
                key={task.id}
                onClick={() => setSelectedTaskId(task.id)}
                className={`flex items-start p-4 bg-white border border-slate-200 rounded-lg shadow-sm transition-all cursor-pointer group ${
                  isSelected ? 'ring-4 ring-orange-50 border-brand' : 'hover:border-orange-200'
                }`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTask(task.id);
                  }}
                  className={`w-5 h-5 rounded border-2 mr-4 mt-0.5 flex items-center justify-center transition-all shrink-0 ${
                    isCompleted 
                      ? 'bg-brand border-brand text-white shadow-[0_0_8px_rgba(249,115,22,0.5)]' 
                      : 'border-slate-300'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />}
                </button>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-bold transition-all ${
                    isCompleted ? 'text-slate-400 line-through' : 'text-slate-900 group-hover:text-brand'
                  }`}>
                    {task.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 truncate">
                    {task.description}
                  </p>
                </div>
                {isSelected && (
                  <ChevronRight className="w-4 h-4 text-brand ml-2 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Panel */}
      <aside className="w-full lg:w-96 bg-slate-100 border-l border-slate-200 p-6 lg:p-8 overflow-y-auto shrink-0 flex flex-col">
        <AnimatePresence mode="wait">
          {selectedTaskId && selectedTask ? (
            <motion.div
              key={selectedTask.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-brand text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">Guía Estratégica</h3>
                  <p className="text-sm opacity-90 leading-relaxed italic">
                    "{selectedTask.title}"
                  </p>
                </div>
                <div className="absolute -right-4 -bottom-4 text-white opacity-10">
                  <Info size={100} />
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-l-2 border-brand pl-4">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">
                    Explicación Paso a Paso
                  </h5>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {selectedTask.description}
                  </p>
                </div>

                {selectedTask.links && selectedTask.links.length > 0 && (
                  <div className="p-4 bg-white rounded border border-slate-200 shadow-sm">
                    <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase mb-3 tracking-widest">
                      <ExternalLink size={12} className="mr-1.5" /> Enlaces Útiles
                    </div>
                    <div className="space-y-2">
                      {selectedTask.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs text-blue-600 hover:text-brand font-semibold transition-colors"
                        >
                          <ChevronRight size={10} className="text-slate-300" />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-center px-10">Selecciona un hito para ver detalles</p>
            </div>
          )}
        </AnimatePresence>
      </aside>
    </div>
  );
}
