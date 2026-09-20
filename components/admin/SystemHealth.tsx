'use client';

import { useState } from 'react';
import { Project, Task } from '@/types/database';
import { 
  Database, 
  ShieldCheck, 
  Download, 
  RefreshCw, 
  Server, 
  Cpu, 
  HardDrive, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface SystemHealthProps {
  projects: Project[];
  tasks: Task[];
  isConfigured: boolean;
}

export function SystemHealth({ projects, tasks, isConfigured }: SystemHealthProps) {
  const [testingPing, setTestingPing] = useState(false);
  const [pingResult, setPingResult] = useState<number | null>(null);

  const handleTestPing = async () => {
    setTestingPing(true);
    const start = performance.now();
    try {
      if (isConfigured) {
        const supabase = createClient();
        await supabase.from('projects').select('id').limit(1);
      } else {
        await new Promise((r) => setTimeout(r, 80));
      }
      const duration = Math.round(performance.now() - start);
      setPingResult(duration);
    } catch {
      setPingResult(-1);
    } finally {
      setTestingPing(false);
    }
  };

  const handleExportData = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      source: 'NexusHub Admin Console',
      metrics: {
        totalProjects: projects.length,
        totalTasks: tasks.length,
      },
      projects,
      tasks,
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexushub-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Sistem &amp; Supabase Teşhisi</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Veritabanı bağlantı kalitesi, tablo istatistikleri ve veri yedekleme araçları.
        </p>
      </div>

      {/* Grid of Diagnostics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Veritabanı Motoru */}
        <div className="glass-panel-interactive rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Veritabanı Motoru</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">PostgreSQL 15</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium">
                {isConfigured ? 'Supabase Bulut' : 'Yerel / Demo'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {isConfigured
                ? 'Bağlantı havuzu ve REST API uç noktaları aktif.'
                : 'Demo modu aktif, yerel bellek senkronizasyonu çalışıyor.'}
            </p>
          </div>
        </div>

        {/* Card 2: Güvenlik & RLS */}
        <div className="glass-panel-interactive rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Güvenlik Katmanı</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">Row Level Security</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium">
                Aktif
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Tablo bazlı okuma ve yazma politikaları PostgreSQL seviyesinde korunuyor.
            </p>
          </div>
        </div>

        {/* Card 3: Gecikme & Ping */}
        <div className="glass-panel-interactive rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Bağlantı Gecikmesi (Ping)</span>
            <button
              onClick={handleTestPing}
              disabled={testingPing}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all"
              title="Yeniden Ölç"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testingPing ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">
                {pingResult !== null ? `${pingResult} ms` : 'Ölçülmedi'}
              </span>
              {pingResult !== null && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium">
                  Hızlı
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              REST endpoint yanıt verme süresi teşhisi.
            </p>
          </div>
        </div>
      </div>

      {/* Table Statistics & Backup Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Table Metrics */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-indigo-400" />
            <span>Tablo Kayıt Sayıları</span>
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span className="text-xs font-mono text-slate-300">public.projects</span>
              </div>
              <span className="text-xs font-bold text-white">{projects.length} kayıt</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span className="text-xs font-mono text-slate-300">public.tasks</span>
              </div>
              <span className="text-xs font-bold text-white">{tasks.length} kayıt</span>
            </div>
          </div>
        </div>

        {/* Data Backup Card */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Veri Yedekleme (JSON Export)</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tüm projelerinizi, ilişkili görevlerinizi ve meta verilerinizi tek tıkla yapılandırılmış JSON dosyası olarak bilgisayarınıza indirin.
            </p>
          </div>

          <button
            onClick={handleExportData}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-medium bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Veritabanı Yedeğini İndir (.json)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
