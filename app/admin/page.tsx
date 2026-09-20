'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminSidebar, AdminTab } from '@/components/admin/AdminSidebar';
import { ProjectManagement } from '@/components/admin/ProjectManagement';
import { SystemHealth } from '@/components/admin/SystemHealth';
import { ActivityLogs } from '@/components/admin/ActivityLogs';
import { TaskManager } from '@/components/TaskManager';
import { NewTaskModal } from '@/components/NewTaskModal';
import { SqlGuideModal } from '@/components/SqlGuideModal';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { INITIAL_PROJECTS, INITIAL_TASKS } from '@/lib/supabase/mock-data';
import { Project, Task } from '@/types/database';
import { 
  Menu, 
  ArrowLeft, 
  Plus, 
  Code2, 
  CheckCircle2, 
  FolderKanban, 
  CheckSquare, 
  Database, 
  Activity, 
  Sparkles,
  TrendingUp,
  ShieldAlert,
  Server
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState<boolean>(false);
  const [isSqlModalOpen, setIsSqlModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);

    const fetchData = async () => {
      if (configured) {
        try {
          const supabase = createClient();
          const { data: projData } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

          if (projData && projData.length > 0) {
            setProjects(projData as Project[]);
          }

          const { data: taskData } = await supabase
            .from('tasks')
            .select('*')
            .order('created_at', { ascending: false });

          if (taskData && taskData.length > 0) {
            setTasks(taskData as Task[]);
          }
        } catch (e) {
          console.error('Admin fetch error:', e);
        }
      }
    };

    fetchData();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Proje Ekleme
  const handleAddProject = async (newProj: Omit<Project, 'id' | 'created_at'>) => {
    if (isConfigured) {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('projects')
          .insert([newProj])
          .select()
          .single();

        if (error) throw error;
        if (data) {
          setProjects((prev) => [data as Project, ...prev]);
          showToast('Proje Supabase veritabanına eklendi.');
        }
      } catch (e) {
        console.error('Project insert error:', e);
        const fallbackProj: Project = {
          ...newProj,
          id: `proj-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        setProjects((prev) => [fallbackProj, ...prev]);
        showToast('Yerel listeye eklendi.');
      }
    } else {
      const fallbackProj: Project = {
        ...newProj,
        id: `proj-${Date.now()}`,
        created_at: new Date().toISOString(),
      };
      setProjects((prev) => [fallbackProj, ...prev]);
      showToast('Proje demo listesine eklendi.');
    }
  };

  // Proje Silme
  const handleDeleteProject = async (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    setTasks((prev) => prev.filter((t) => t.project_id !== projectId));

    if (isConfigured) {
      try {
        const supabase = createClient();
        await supabase.from('projects').delete().eq('id', projectId);
        showToast('Proje Supabase veritabanından silindi.');
      } catch (e) {
        console.error('Project delete error:', e);
      }
    } else {
      showToast('Proje silindi (Demo Modu).');
    }
  };

  // Proje Durumu Güncelleme
  const handleUpdateProjectStatus = async (projectId: string, status: Project['status']) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, status } : p))
    );

    if (isConfigured) {
      try {
        const supabase = createClient();
        await supabase.from('projects').update({ status }).eq('id', projectId);
        showToast('Proje durumu güncellendi.');
      } catch (e) {
        console.error('Project status update error:', e);
      }
    }
  };

  // Görev Ekleme
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
          showToast('Görev canlı veritabanına kaydedildi.');
        }
      } catch {
        const demoTask: Task = {
          ...newTaskData,
          id: `task-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        setTasks((prev) => [demoTask, ...prev]);
        showToast('Görev listeye eklendi.');
      }
    } else {
      const demoTask: Task = {
        ...newTaskData,
        id: `demo-${Date.now()}`,
        created_at: new Date().toISOString(),
      };
      setTasks((prev) => [demoTask, ...prev]);
      showToast('Görev eklendi (Demo Modu).');
    }
  };

  // Görev Durumu Değiştirme
  const handleUpdateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    if (isConfigured) {
      try {
        const supabase = createClient();
        await supabase.from('tasks').update({ status: newStatus }).eq('id', taskId);
        showToast('Görev durumu güncellendi.');
      } catch (e) {
        console.error('Task update error:', e);
      }
    }
  };

  // Görev Silme
  const handleDeleteTask = async (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    if (isConfigured) {
      try {
        const supabase = createClient();
        await supabase.from('tasks').delete().eq('id', taskId);
        showToast('Görev silindi.');
      } catch (e) {
        console.error('Task delete error:', e);
      }
    }
  };

  // Metrikler
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="flex min-h-screen">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white shadow-2xl border border-indigo-400/30 text-xs font-medium animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toast}</span>
        </div>
      )}

      {/* Admin Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpenMobile={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        projectCount={projects.length}
        taskCount={tasks.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Admin Top Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-8 border-b border-white/10 bg-[#090d16]/85 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 rounded-lg text-slate-400 hover:text-white lg:hidden bg-slate-800/50"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">
                {activeTab === 'overview' && 'Genel Bakış & Metrikler'}
                {activeTab === 'projects' && 'Proje Yönetimi'}
                {activeTab === 'tasks' && 'Görev Denetimi'}
                {activeTab === 'system' && 'Sistem & Supabase'}
                {activeTab === 'logs' && 'Aktivite Günlüğü'}
              </span>

              <span className="hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-white/5">
                v1.2 Admin Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsSqlModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>SQL Şeması</span>
            </button>

            <button
              onClick={() => setIsNewTaskOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Hızlı Görev</span>
            </button>

            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white border border-white/10 hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Siteye Dön</span>
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-panel rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Toplam Proje</span>
                    <FolderKanban className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{projects.length}</div>
                  <p className="text-[11px] text-slate-400">Aktif çalışma alanları</p>
                </div>

                <div className="glass-panel rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Devam Eden Görev</span>
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{inProgressTasks}</div>
                  <p className="text-[11px] text-slate-400">İşlemdeki sprint maddeleri</p>
                </div>

                <div className="glass-panel rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Tamamlanma Oranı</span>
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">%{completionRate}</div>
                  <p className="text-[11px] text-slate-400">{completedTasks} / {totalTasks} tamamlandı</p>
                </div>

                <div className="glass-panel rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Veritabanı Durumu</span>
                    <Server className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-base font-bold text-white truncate">
                    {isConfigured ? 'Supabase Canlı' : 'Yerel Demo'}
                  </div>
                  <p className="text-[11px] text-emerald-400">RLS Güvenliği Aktif</p>
                </div>
              </div>

              {/* Quick Actions & Navigation Bar */}
              <div className="p-6 rounded-2xl glass-panel border border-indigo-500/20 bg-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-indigo-400" />
                    <span>Yönetici Hızlı Aksiyonları</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Projelerinizi yönetebilir, görev durumlarını topluca denetleyebilir veya veritabanı yedeği alabilirsiniz.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="px-3.5 py-2 rounded-xl text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all"
                  >
                    Projeleri Yönet
                  </button>
                  <button
                    onClick={() => setActiveTab('system')}
                    className="px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
                  >
                    Sistem Teşhisi &amp; Yedek
                  </button>
                </div>
              </div>

              {/* Projects Preview & Activity stream */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-panel rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">Son Eklenen Projeler</h3>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="text-xs text-indigo-400 hover:underline"
                    >
                      Tümünü Gör
                    </button>
                  </div>
                  <div className="space-y-3">
                    {projects.slice(0, 3).map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: p.color || '#6366f1' }}
                          />
                          <div>
                            <p className="text-xs font-semibold text-white">{p.name}</p>
                            <p className="text-[11px] text-slate-400 line-clamp-1">{p.description}</p>
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                          {p.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-panel rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">Sistem Faaliyetleri</h3>
                    <button
                      onClick={() => setActiveTab('logs')}
                      className="text-xs text-indigo-400 hover:underline"
                    >
                      Tüm Günlükler
                    </button>
                  </div>
                  <div className="space-y-3">
                    {tasks.slice(0, 3).map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-white/5"
                      >
                        <div>
                          <p className="text-xs font-semibold text-white">{t.title}</p>
                          <p className="text-[11px] text-slate-400">Durum: {t.status}</p>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {t.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <ProjectManagement
              projects={projects}
              tasks={tasks}
              isConfigured={isConfigured}
              onAddProject={handleAddProject}
              onDeleteProject={handleDeleteProject}
              onUpdateProjectStatus={handleUpdateProjectStatus}
            />
          )}

          {/* TAB 3: TASKS */}
          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Tüm Görevlerin Denetimi</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Sistemdeki görevleri arayın, filtreleyin veya durumlarını güncelleyin.
                  </p>
                </div>
              </div>

              <TaskManager
                tasks={tasks}
                projects={projects}
                isConfigured={isConfigured}
                onUpdateStatus={handleUpdateTaskStatus}
                onDeleteTask={handleDeleteTask}
                onOpenNewTaskModal={() => setIsNewTaskOpen(true)}
              />
            </div>
          )}

          {/* TAB 4: SYSTEM */}
          {activeTab === 'system' && (
            <SystemHealth
              projects={projects}
              tasks={tasks}
              isConfigured={isConfigured}
            />
          )}

          {/* TAB 5: LOGS */}
          {activeTab === 'logs' && (
            <ActivityLogs
              projects={projects}
              tasks={tasks}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        projects={projects}
        onAddTask={handleAddTask}
      />

      <SqlGuideModal
        isOpen={isSqlModalOpen}
        onClose={() => setIsSqlModalOpen(false)}
      />
    </div>
  );
}
