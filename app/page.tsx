'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { ConnectionBanner } from '@/components/ConnectionBanner';
import { DashboardStats } from '@/components/DashboardStats';
import { TaskManager } from '@/components/TaskManager';
import { SqlGuideModal } from '@/components/SqlGuideModal';
import { NewTaskModal } from '@/components/NewTaskModal';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { INITIAL_PROJECTS, INITIAL_TASKS } from '@/lib/supabase/mock-data';
import { Project, Task } from '@/types/database';
import { 
  Sparkles, 
  Database, 
  Layers, 
  Cpu, 
  Shield, 
  CheckCircle2, 
  Code2,
  RefreshCw,
  Plus
} from 'lucide-react';

export default function HomePage() {
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSqlModalOpen, setIsSqlModalOpen] = useState<boolean>(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState<boolean>(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  // Check Supabase Configuration and Fetch Data
  useEffect(() => {
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);

    const fetchData = async () => {
      setLoading(true);
      if (configured) {
        try {
          const supabase = createClient();
          
          // Projeleri çek
          const { data: projectsData, error: projError } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

          if (projError) {
            console.warn('Supabase projects fetch error, falling back to initial data:', projError);
          } else if (projectsData && projectsData.length > 0) {
            setProjects(projectsData as Project[]);
          }

          // Görevleri çek
          const { data: tasksData, error: tasksError } = await supabase
            .from('tasks')
            .select('*')
            .order('created_at', { ascending: false });

          if (tasksError) {
            console.warn('Supabase tasks fetch error, falling back to initial data:', tasksError);
          } else if (tasksData && tasksData.length > 0) {
            setTasks(tasksData as Task[]);
          }
        } catch (err) {
          console.error('Supabase connection error:', err);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Show transient sync feedback
  const showNotice = (msg: string) => {
    setSyncNotice(msg);
    setTimeout(() => setSyncNotice(null), 3000);
  };

  // Add new task
  const handleAddTask = async (newTaskData: Omit<Task, 'id' | 'created_at' | 'project'>) => {
    if (isConfigured) {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('tasks')
          .insert([newTaskData])
          .select()
          .single();

        if (error) throw error;
        if (data) {
          setTasks((prev) => [data as Task, ...prev]);
          showNotice('Görev canlı Supabase veritabanına başarıyla kaydedildi!');
        }
      } catch (err: unknown) {
        console.error('Supabase insert error:', err);
        // Fallback to local
        const fallbackTask: Task = {
          ...newTaskData,
          id: `task-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        setTasks((prev) => [fallbackTask, ...prev]);
        showNotice('Supabase bağlantısında hata oluştu, görev yerel listeye eklendi.');
      }
    } else {
      const demoTask: Task = {
        ...newTaskData,
        id: `demo-${Date.now()}`,
        created_at: new Date().toISOString(),
      };
      setTasks((prev) => [demoTask, ...prev]);
      showNotice('Görev demo modunda listeye eklendi.');
    }
  };

  // Update task status
  const handleUpdateStatus = async (taskId: string, newStatus: Task['status']) => {
    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    if (isConfigured) {
      try {
        const supabase = createClient();
        const { error } = await supabase
          .from('tasks')
          .update({ status: newStatus })
          .eq('id', taskId);

        if (error) throw error;
        showNotice('Görev durumu Supabase üzerinde güncellendi.');
      } catch (err) {
        console.error('Supabase update status error:', err);
      }
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId: string) => {
    const previousTasks = [...tasks];
    setTasks((prev) => prev.filter((t) => t.id !== taskId));

    if (isConfigured) {
      try {
        const supabase = createClient();
        const { error } = await supabase
          .from('tasks')
          .delete()
          .eq('id', taskId);

        if (error) {
          setTasks(previousTasks);
          throw error;
        }
        showNotice('Görev Supabase veritabanından silindi.');
      } catch (err) {
        console.error('Supabase delete error:', err);
      }
    } else {
      showNotice('Görev listeden silindi (Demo Modu).');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Global Navigation */}
      <Navbar
        isConfigured={isConfigured}
        onOpenSqlGuide={() => setIsSqlModalOpen(true)}
        onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Floating Toast / Notification */}
        {syncNotice && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white shadow-2xl border border-indigo-400/30 animate-fade-in text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>{syncNotice}</span>
          </div>
        )}

        {/* Hero Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2 pb-2">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next.js App Router &amp; Supabase Veri Yönetimi</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Gelişmiş <span className="gradient-brand">Proje &amp; Görev</span> Kontrol Paneli
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              TypeScript tip güvenliği, Tailwind CSS modern cam efekti ve PostgreSQL tabanlı Supabase veritabanı entegrasyonu ile tam duyarlı web uygulaması.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsSqlModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-white/10 shadow-sm transition-all"
            >
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>SQL Şemasını Gör</span>
            </button>
            <button
              onClick={() => setIsNewTaskModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-600/25 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Görev Ekle</span>
            </button>
          </div>
        </div>

        {/* Connection Status & Guide Banner */}
        <ConnectionBanner
          isConfigured={isConfigured}
          onOpenSqlGuide={() => setIsSqlModalOpen(true)}
        />

        {/* Statistics Metric Cards */}
        <DashboardStats
          projects={projects}
          tasks={tasks}
          isConfigured={isConfigured}
        />

        {/* Interactive Task Management Section */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-6 rounded-full bg-indigo-500" />
              <h2 className="text-lg font-bold text-white tracking-tight">
                Sprint Görevleri &amp; İş Akışı
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {tasks.length} toplam görev listeleniyor
            </span>
          </div>

          <TaskManager
            tasks={tasks}
            projects={projects}
            isConfigured={isConfigured}
            onUpdateStatus={handleUpdateStatus}
            onDeleteTask={handleDeleteTask}
            onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
          />
        </section>

        {/* Architecture & Feature Highlights */}
        <section className="pt-6 pb-4">
          <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Kullanılan Mimari &amp; Entegrasyon Standartları</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-1.5">
                <span className="text-xs font-semibold text-indigo-400">Next.js 15 App Router</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Sunucu Bileşenleri (RSC), async cookie yönetimi ve istemci ayrımı ile optimize edildi.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-1.5">
                <span className="text-xs font-semibold text-cyan-400">Supabase SSR</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  <code>@supabase/ssr</code> ile hem tarayıcı hem sunucu tarafı oturum ve veri senkronizasyonu.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-1.5">
                <span className="text-xs font-semibold text-emerald-400">Tailwind CSS &amp; Glassmorphism</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Karanlık tema, blur filtreleri, duyarlı düzen kırılımları ve zarif mikro animasyonlar.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-1.5">
                <span className="text-xs font-semibold text-purple-400">TypeScript Tip Güvenliği</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Supabase şemasına tam uyumlu arayüzler (Project, Task, Database Tables).
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 bg-[#070a12] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-slate-400 font-medium">NexusHub Web Platformu</span>
            <span>&bull;</span>
            <span>Next.js, TypeScript, Tailwind &amp; Supabase</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSqlModalOpen(true)}
              className="hover:text-slate-300 transition-colors"
            >
              SQL Kılavuzu
            </button>
            <a
              href="https://supabase.com/docs"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              Supabase Docs
            </a>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              Next.js Docs
            </a>
          </div>
        </div>
      </footer>

      {/* SQL Guide Modal */}
      <SqlGuideModal
        isOpen={isSqlModalOpen}
        onClose={() => setIsSqlModalOpen(false)}
      />

      {/* New Task Modal */}
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        projects={projects}
        onAddTask={handleAddTask}
      />
    </div>
  );
}
