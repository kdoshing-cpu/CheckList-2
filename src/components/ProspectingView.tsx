import { useState, FormEvent } from 'react';
import { workshopsData } from '../data';
import { ProspectingEntry } from '../types';
import { Save, ClipboardList, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onSave: (entry: Omit<ProspectingEntry, 'id' | 'createdAt'>) => Promise<void>;
}

export default function ProspectingView({ onSave }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<ProspectingEntry>>({
    workshopId: '',
    whatTheyBuy: '',
    whereTheyBuy: '',
    monthlySpend: '',
    whatIsMissing: '',
    satisfaction: 3,
    notes: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.workshopId || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const selectedWorkshop = workshopsData.find(w => w.id === formData.workshopId);
      
      const entry: Omit<ProspectingEntry, 'id' | 'createdAt'> = {
        workshopId: formData.workshopId!,
        workshopName: selectedWorkshop?.name || 'Desconocido',
        date: new Date().toISOString(),
        whatTheyBuy: formData.whatTheyBuy || '',
        whereTheyBuy: formData.whereTheyBuy || '',
        monthlySpend: formData.monthlySpend || '',
        whatIsMissing: formData.whatIsMissing || '',
        satisfaction: formData.satisfaction || 3,
        notes: formData.notes || ''
      };

      await onSave(entry);
      
      setFormData({
        workshopId: '',
        whatTheyBuy: '',
        whereTheyBuy: '',
        monthlySpend: '',
        whatIsMissing: '',
        satisfaction: 3,
        notes: ''
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
          <ClipboardList size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Hoja de Prospección</h2>
          <p className="text-sm text-slate-500">Registra los detalles de tu visita al taller</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Taller Visitado</label>
          <select
            required
            value={formData.workshopId}
            onChange={e => setFormData(p => ({ ...p, workshopId: e.target.value }))}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          >
            <option value="">Selecciona un taller...</option>
            {workshopsData.map(w => (
              <option key={w.id} value={w.id}>{w.name} ({w.address})</option>
            ))}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">¿Qué productos compran?</label>
            <input
              type="text"
              placeholder="Ej: Pintura, Barniz, Lijas"
              value={formData.whatTheyBuy}
              onChange={e => setFormData(p => ({ ...p, whatTheyBuy: e.target.value }))}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">¿Dónde compran hoy?</label>
            <input
              type="text"
              placeholder="Ej: PinturasPLC, Homecenter"
              value={formData.whereTheyBuy}
              onChange={e => setFormData(p => ({ ...p, whereTheyBuy: e.target.value }))}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Gasto Mensual Estimado</label>
            <input
              type="text"
              placeholder="Ej: $150.000"
              value={formData.monthlySpend}
              onChange={e => setFormData(p => ({ ...p, monthlySpend: e.target.value }))}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">¿Qué les falta / falla?</label>
            <input
              type="text"
              placeholder="Ej: Stock, Delivery"
              value={formData.whatIsMissing}
              onChange={e => setFormData(p => ({ ...p, whatIsMissing: e.target.value }))}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nivel de Satisfacción con proveedor actual</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData(p => ({ ...p, satisfaction: star }))}
                className={`p-2 rounded-lg transition-all ${
                  star <= (formData.satisfaction || 0) ? 'text-orange-500 scale-110' : 'text-slate-300'
                }`}
              >
                <Star fill={star <= (formData.satisfaction || 0) ? "currentColor" : "none"} size={24} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Notas adicionales</label>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all resize-none"
            placeholder="Observaciones importantes..."
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
            isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-sidebar hover:bg-brand'
          }`}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={20} />
          )}
          {isSubmitting ? 'Guardando...' : 'Guardar Prospección'}
        </motion.button>
      </form>
    </div>
  );
}
