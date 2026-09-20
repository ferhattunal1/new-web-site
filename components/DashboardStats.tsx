'use client';

import { Project, Task } from '@/types/database';
import { 
  FolderKanban, 
  CheckCircle, 
  Clock, 
  Flame, 
  TrendingUp,
  Activity
} from 'lucide-react';

interface DashboardStatsProps {
  projects: Project[];
  tasks: Task[];
  isConfigured: boolean;
}

export function DashboardStats({ projects, tasks, isConfigured }: DashboardStatsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const urgentTasks = tasks.filter(t => t.priority === 'urgent' || t.priority === 'high').length;
  
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Projeler */}
      <div className="glass-panel-interactive rounded-2xl p-5 relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Aktif Projeler</span>
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
            <FolderKanban className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-white">{projects.length}</span>
          <span className="text-xs text-indigo-400 font-medium flex items-center">
            <TrendingUp className="w-3 h-3 mr-0.5" /> 3 Çalışma Alanı
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">Sistemde kayıtlı portföy ve modüller</p>

        {/* Progress bar visual */}
        <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-4 overflow-hidden">
          <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: '85%' }} />
        </div>
      </div>

      {/* 2. Devam Eden Görevler */}
      <div className="glass-panel-interactive rounded-2xl p-5 relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Devam Eden Görevler</span>
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
            <Clock className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-white">{inProgressTasks}</span>
          <span className="text-xs text-amber-400 font-medium flex items-center">
            <Flame className="w-3 h-3 mr-0.5" /> {urgentTasks} Öncelikli
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">İşlem sırasındaki sprint maddeleri</p>

        {/* Progress bar visual */}
        <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-4 overflow-hidden">
          <div 
            className="bg-cyan-400 h-full rounded-full transition-all duration-500" 
            style={{ width: `${Math.max(20, Math.min(100, inProgressTasks * 25))}%` }} 
          />
        </div>
      </div>

      {/* 3. Tamamlanan Görevler ve Oran */}
      <div className="glass-panel-interactive rounded-2xl p-5 relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Tamamlanma Oranı</span>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-white">%{completionPercentage}</span>
          <span className="text-xs text-emerald-400 font-medium">
            {completedTasks} / {totalTasks} görev
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">Başarıyla teslim edilen görevler</p>

        {/* Progress bar visual */}
        <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-4 overflow-hidden">
          <div 
            className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
            style={{ width: `${completionPercentage}%` }} 
          />
        </div>
      </div>

      {/* 4. Supabase Sağlık ve Senkronizasyon */}
      <div className="glass-panel-interactive rounded-2xl p-5 relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Veritabanı Entegrasyonu</span>
          <div className={`p-2.5 rounded-xl transition-colors ${
            isConfigured 
              ? 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20' 
              : 'bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20'
          }`}>
            <Activity className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-white">
            {isConfigured ? 'PostgreSQL' : 'Hazır Şema'}
          </span>
          <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${
            isConfigured ? 'bg-emerald-500/15 text-emerald-400' : 'bg-indigo-500/15 text-indigo-400'
          }`}>
            {isConfigured ? 'RLS Aktif' : 'Tip Güvenli'}
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          {isConfigured ? 'Supabase SSR & Canlı Tablolar' : '2 Tablo & Otomatik Geçiş'}
        </p>

        {/* Status bar */}
        <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-4 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              isConfigured ? 'bg-emerald-400 w-full' : 'bg-indigo-400 w-3/4'
            }`} 
          />
        </div>
      </div>
    </div>
  );
}
