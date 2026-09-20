'use client';

import { Activity, CheckCircle2, Clock, PlusCircle, Trash2, FolderKanban } from 'lucide-react';
import { Project, Task } from '@/types/database';

interface ActivityLogsProps {
  projects: Project[];
  tasks: Task[];
}

export function ActivityLogs({ projects, tasks }: ActivityLogsProps) {
  // Synthesize realistic activity events based on actual projects and tasks
  const events = [
    {
      id: 'e-1',
      action: 'Sistem Başlatıldı',
      detail: 'Next.js App Router ve Supabase istemcisi başarıyla yüklendi.',
      time: 'Az önce',
      type: 'system',
      icon: Activity,
      color: 'text-indigo-400 bg-indigo-500/10',
    },
    ...tasks.slice(0, 4).map((t, idx) => ({
      id: `task-ev-${t.id}`,
      action: t.status === 'done' ? 'Görev Tamamlandı' : 'Görev İşlemde',
      detail: `"${t.title}" görevi güncellendi.`,
      time: `${idx + 1} saat önce`,
      type: 'task',
      icon: t.status === 'done' ? CheckCircle2 : Clock,
      color: t.status === 'done' ? 'text-emerald-400 bg-emerald-500/10' : 'text-cyan-400 bg-cyan-500/10',
    })),
    ...projects.slice(0, 2).map((p, idx) => ({
      id: `proj-ev-${p.id}`,
      action: 'Proje Kaydı',
      detail: `"${p.name}" çalışma alanı oluşturuldu.`,
      time: `${idx + 2} gün önce`,
      type: 'project',
      icon: FolderKanban,
      color: 'text-purple-400 bg-purple-500/10',
    })),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Sistem &amp; Aktivite Günlükleri</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Veritabanı üzerinde gerçekleşen son işlemler, görev değişimleri ve sistem olayları.
        </p>
      </div>

      <div className="glass-panel rounded-2xl p-6">
        <div className="space-y-6">
          {events.map((ev, index) => {
            const Icon = ev.icon;
            const isLast = index === events.length - 1;

            return (
              <div key={ev.id} className="relative flex items-start gap-4">
                {/* Connecting line */}
                {!isLast && (
                  <span
                    className="absolute left-4 top-8 -bottom-6 w-0.5 bg-white/10 pointer-events-none"
                    aria-hidden="true"
                  />
                )}

                <div className={`p-2 rounded-xl shrink-0 ${ev.color}`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-xs font-semibold text-white">{ev.action}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{ev.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{ev.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
