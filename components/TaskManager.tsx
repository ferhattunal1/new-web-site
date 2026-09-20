'use client';

import { useState, useMemo } from 'react';
import { Project, Task } from '@/types/database';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Trash2, 
  Calendar, 
  AlertCircle, 
  Plus,
  Flame,
  ArrowUpDown,
  Tag
} from 'lucide-react';

interface TaskManagerProps {
  tasks: Task[];
  projects: Project[];
  isConfigured: boolean;
  onUpdateStatus: (taskId: string, newStatus: Task['status']) => Promise<void>;
  onDeleteTask: (taskId: string) => Promise<void>;
  onOpenNewTaskModal: () => void;
}

export function TaskManager({
  tasks,
  projects,
  isConfigured,
  onUpdateStatus,
  onDeleteTask,
  onOpenNewTaskModal,
}: TaskManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Task['status']>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | Task['priority']>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Filtered & Sorted Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Search query filter
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

      // Status filter
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;

      // Priority filter
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;

      // Project filter
      const matchesProject = selectedProjectId === 'all' || task.project_id === selectedProjectId;

      return matchesSearch && matchesStatus && matchesPriority && matchesProject;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter, selectedProjectId]);

  const handleToggleStatus = async (task: Task) => {
    try {
      setUpdatingId(task.id);
      let nextStatus: Task['status'] = 'todo';
      if (task.status === 'todo') nextStatus = 'in_progress';
      else if (task.status === 'in_progress') nextStatus = 'done';
      else nextStatus = 'todo';

      await onUpdateStatus(task.id, nextStatus);
    } finally {
      setUpdatingId(null);
    }
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-red-500/15 text-red-400 border border-red-500/20">
            <Flame className="w-3 h-3" /> Acil
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/15 text-amber-400 border border-amber-500/20">
            Yüksek
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/15 text-blue-400 border border-blue-500/20">
            Orta
          </span>
        );
      case 'low':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-500/15 text-slate-400 border border-slate-500/20">
            Düşük
          </span>
        );
    }
  };

  const getStatusBadge = (status: Task['status']) => {
    switch (status) {
      case 'done':
        return (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4" /> Tamamlandı
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 text-xs text-cyan-400">
            <Clock className="w-4 h-4" /> Devam Ediyor
          </span>
        );
      case 'todo':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
            <Circle className="w-4 h-4" /> Yapılacak
          </span>
        );
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Controls Bar: Search & Filters */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Görevlerde veya açıklamalarda ara..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-white/10">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tümü ({tasks.length})
            </button>
            <button
              onClick={() => setStatusFilter('todo')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === 'todo'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Yapılacak
            </button>
            <button
              onClick={() => setStatusFilter('in_progress')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === 'in_progress'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Devam Eden
            </button>
            <button
              onClick={() => setStatusFilter('done')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === 'done'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bitenler
            </button>
          </div>

          {/* Priority filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-all"
          >
            <option value="all">Tüm Öncelikler</option>
            <option value="urgent">Acil</option>
            <option value="high">Yüksek</option>
            <option value="medium">Orta</option>
            <option value="low">Düşük</option>
          </select>

          {/* Project filter */}
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-all"
          >
            <option value="all">Tüm Projeler</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Task Cards Grid / List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center flex flex-col items-center justify-center">
            <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-3">
              <Filter className="w-8 h-8" />
            </div>
            <h4 className="text-base font-medium text-white">Görev Bulunamadı</h4>
            <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">
              Arama kriterlerinize uygun görev bulunmuyor. Filtreleri temizleyebilir veya yeni bir görev ekleyebilirsiniz.
            </p>
            <button
              onClick={onOpenNewTaskModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Görev Oluştur</span>
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const project = projects.find((p) => p.id === task.project_id);
            const isUpdating = updatingId === task.id;

            return (
              <div
                key={task.id}
                className={`glass-panel-interactive rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200 ${
                  task.status === 'done' ? 'opacity-70 bg-slate-950/40' : ''
                }`}
              >
                {/* Left Side: Status Toggle + Title + Description */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <button
                    onClick={() => handleToggleStatus(task)}
                    disabled={isUpdating}
                    title="Durumu Değiştir"
                    className="mt-1 text-slate-400 hover:text-indigo-400 transition-colors shrink-0 disabled:opacity-50"
                  >
                    {task.status === 'done' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : task.status === 'in_progress' ? (
                      <Clock className="w-5 h-5 text-cyan-400 animate-pulse" />
                    ) : (
                      <Circle className="w-5 h-5 hover:text-indigo-400" />
                    )}
                  </button>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4
                        className={`text-sm font-semibold tracking-tight ${
                          task.status === 'done' ? 'line-through text-slate-400' : 'text-white'
                        }`}
                      >
                        {task.title}
                      </h4>

                      {/* Priority Tag */}
                      {getPriorityBadge(task.priority)}

                      {/* Project Tag */}
                      {project && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-white/5">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: project.color || '#6366f1' }}
                          />
                          <span className="truncate max-w-[140px]">{project.name}</span>
                        </span>
                      )}
                    </div>

                    {task.description && (
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Side: Status Text, Due Date & Actions */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5 shrink-0">
                  {/* Status Indicator */}
                  <div className="hidden md:block">
                    {getStatusBadge(task.status)}
                  </div>

                  {/* Due Date */}
                  {task.due_date && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{task.due_date}</span>
                    </div>
                  )}

                  {/* Status Cycle Button */}
                  <button
                    onClick={() => handleToggleStatus(task)}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-white/5 transition-all"
                  >
                    {task.status === 'todo' ? 'Başlat' : task.status === 'in_progress' ? 'Tamamla' : 'Geri Al'}
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Görevi Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
