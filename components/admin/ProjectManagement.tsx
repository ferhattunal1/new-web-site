'use client';

import { useState } from 'react';
import { Project, Task } from '@/types/database';
import { 
  FolderKanban, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Archive, 
  Activity, 
  Clock, 
  Sparkles,
  X
} from 'lucide-react';

interface ProjectManagementProps {
  projects: Project[];
  tasks: Task[];
  isConfigured: boolean;
  onAddProject: (project: Omit<Project, 'id' | 'created_at'>) => Promise<void>;
  onDeleteProject: (projectId: string) => Promise<void>;
  onUpdateProjectStatus: (projectId: string, status: Project['status']) => Promise<void>;
}

const PRESET_COLORS = [
  '#6366f1', // Indigo
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6', // Purple
  '#ef4444', // Red
];

export function ProjectManagement({
  projects,
  tasks,
  isConfigured,
  onAddProject,
  onDeleteProject,
  onUpdateProjectStatus,
}: ProjectManagementProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#6366f1');
  const [status, setStatus] = useState<Project['status']>('active');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setSubmitting(true);
      await onAddProject({
        name: name.trim(),
        description: description.trim() || null,
        color,
        status,
      });

      // Reset
      setName('');
      setDescription('');
      setColor('#6366f1');
      setStatus('active');
      setIsCreating(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Proje Portföyü Yönetimi</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Sistemdeki tüm projeleri, departman çalışma alanlarını ve modülleri yönetin.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-600/25 transition-all self-start sm:self-auto"
        >
          {isCreating ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isCreating ? 'Formu Kapat' : 'Yeni Proje Tanımla'}</span>
        </button>
      </div>

      {/* New Project Form */}
      {isCreating && (
        <form
          onSubmit={handleSubmit}
          className="p-5 rounded-2xl glass-panel border border-indigo-500/30 bg-slate-900/90 space-y-4 animate-fade-in shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Yeni Proje Oluştur</span>
            </h3>
            <span className="text-[11px] text-slate-400">PostgreSQL / Supabase Tablosu: &quot;projects&quot;</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Proje Adı *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: Yapay Zeka Raporlama Servisi"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Başlangıç Durumu
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Project['status'])}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all"
              >
                <option value="active">Aktif (Geliştirme Aşamasında)</option>
                <option value="completed">Tamamlandı</option>
                <option value="archived">Arşivlendi</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Proje Açıklaması
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Projenin kapsamı, hedefleri ve mimari notları..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
            />
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Proje Vurgu Rengi
            </label>
            <div className="flex items-center gap-3">
              {PRESET_COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-7 h-7 rounded-full transition-transform ${
                    color === c ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-[#090d16]' : 'hover:scale-110 opacity-80 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
            >
              {submitting ? 'Kaydediliyor...' : 'Projeyi Kaydet'}
            </button>
          </div>
        </form>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => {
          const projectTasks = tasks.filter((t) => t.project_id === project.id);
          const completedCount = projectTasks.filter((t) => t.status === 'done').length;

          return (
            <div
              key={project.id}
              className="glass-panel-interactive rounded-2xl p-5 flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              {/* Color Stripe */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: project.color || '#6366f1' }}
              />

              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold text-white tracking-tight">
                    {project.name}
                  </h3>

                  {/* Status Dropdown */}
                  <select
                    value={project.status}
                    onChange={(e) => onUpdateProjectStatus(project.id, e.target.value as Project['status'])}
                    className="text-[11px] font-medium px-2 py-1 rounded-lg bg-slate-800 border border-white/10 text-slate-300 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="active">Aktif</option>
                    <option value="completed">Tamamlandı</option>
                    <option value="archived">Arşiv</option>
                  </select>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {project.description || 'Açıklama belirtilmedi.'}
                </p>
              </div>

              {/* Stats & Actions */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Görev Durumu:</span>
                  <span className="font-semibold text-slate-200">
                    {completedCount} / {projectTasks.length} Bitti
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: project.color || '#6366f1',
                      width: `${projectTasks.length > 0 ? (completedCount / projectTasks.length) * 100 : 0}%`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-500">
                    Kayıt: {new Date(project.created_at).toLocaleDateString('tr-TR')}
                  </span>

                  <button
                    onClick={() => {
                      if (confirm(`"${project.name}" projesini silmek istediğinize emin misiniz? Bağlı tüm görevler de silinecektir.`)) {
                        onDeleteProject(project.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Projeyi Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
