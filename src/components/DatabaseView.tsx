import { ProspectingEntry, Workshop } from '../types';
import { workshopsData } from '../data';
import { Database, Phone, MapPin, TrendingUp, Search } from 'lucide-react';
import { useState } from 'react';

interface Props {
  prospections: ProspectingEntry[];
}

export default function DatabaseView({ prospections }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  // Combine workshopsData with prospection info
  const workshopsWithInfo = workshopsData.map(w => {
    const prospection = prospections.find(p => p.workshopId === w.id);
    return {
      ...w,
      prospection
    };
  });

  const filteredWorkshops = workshopsWithInfo.filter(w => 
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Database className="text-orange-500" />
            Base de Datos de Talleres
          </h2>
          <p className="text-sm text-slate-500">Listado consolidado de clientes potenciales en Labranza</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Buscar taller..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Taller</th>
                <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Contacto</th>
                <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Estado Prospección</th>
                <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Gasto Est.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWorkshops.map((w) => (
                <tr key={w.id} className="hover:bg-orange-50/30 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{w.name}</div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                      <MapPin size={12} /> {w.address}
                    </div>
                  </td>
                  <td className="p-4">
                    {w.phone ? (
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <Phone size={14} className="text-slate-400" />
                        {w.phone}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-300 italic">Sin datos</span>
                    )}
                  </td>
                  <td className="p-4">
                    {w.prospection ? (
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 w-fit">
                          VISITADO
                        </span>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1">
                          <TrendingUp size={10} /> Compra: {w.prospection.whatTheyBuy}
                        </div>
                      </div>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-400 w-fit uppercase">
                        Pendiente
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="font-bold text-slate-900">
                      {w.prospection?.monthlySpend || '-'}
                    </div>
                    {w.prospection && (
                      <div className="text-[10px] text-slate-500">
                        Satisfacción: {w.prospection.satisfaction}/5
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredWorkshops.length === 0 && (
          <div className="p-12 text-center text-slate-400 font-medium">
            No se encontraron talleres con ese nombre.
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
          <div className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1">Total Talleres</div>
          <div className="text-2xl font-bold text-slate-900">{workshopsData.length}</div>
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Talleres Visitados</div>
          <div className="text-2xl font-bold text-slate-900">{prospections.length}</div>
        </div>
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">% Cobertura</div>
          <div className="text-2xl font-bold text-slate-900">
            {Math.round((prospections.length / workshopsData.length) * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
}
