'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminSidebar, AdminTab } from '@/components/admin/AdminSidebar';
import { ProductAdmin } from '@/components/admin/ProductAdmin';
import { ProjectManagement } from '@/components/admin/ProjectManagement';
import { SystemHealth } from '@/components/admin/SystemHealth';
import { ActivityLogs } from '@/components/admin/ActivityLogs';
import { TaskManager } from '@/components/TaskManager';
import { NewTaskModal } from '@/components/NewTaskModal';
import { SqlGuideModal } from '@/components/SqlGuideModal';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { INITIAL_PRODUCTS } from '@/lib/store-data';
import { INITIAL_PROJECTS, INITIAL_TASKS } from '@/lib/supabase/mock-data';
import { Product, Project, Task } from '@/types/database';
import { 
  Menu, 
  ArrowLeft, 
  Plus, 
  Code2, 
  CheckCircle2, 
  Package, 
  FolderKanban, 
  CheckSquare, 
  Database, 
  Activity, 
  Sparkles,
  TrendingUp,
  ShieldAlert,
  Server,
  DollarSign
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
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

          // Ürünleri Çek
          const { data: prodData } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

          if (prodData && prodData.length > 0) {
            setProducts(prodData as Product[]);
          }

          // Projeleri Çek
          const { data: projData } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

          if (projData && projData.length > 0) {
            setProjects(projData as Project[]);
          }

          // Görevleri Çek
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

  // Ürün Ekleme
  const handleAddProduct = async (newProd: Omit<Product, 'id' | 'created_at'>) => {
    if (isConfigured) {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('products')
          .insert([newProd])
          .select()
          .single();

        if (error) throw error;
        if (data) {
          setProducts((prev) => [data as Product, ...prev]);
          showToast('Ürün Supabase veritabanına eklendi!');
        }
      } catch {
        const fallback: Product = {
          ...newProd,
          id: `prod-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        setProducts((prev) => [fallback, ...prev]);
        showToast('Ürün vitrine eklendi.');
      }
    } else {
      const fallback: Product = {
        ...newProd,
        id: `prod-${Date.now()}`,
        created_at: new Date().toISOString(),
      };
      setProducts((prev) => [fallback, ...prev]);
      showToast('Ürün vitrine eklendi (Demo Modu).');
    }
  };

  // Ürün Silme
  const handleDeleteProduct = async (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    if (isConfigured) {
      try {
        const supabase = createClient();
        await supabase.from('products').delete().eq('id', productId);
        showToast('Ürün veritabanından silindi.');
      } catch (e) {
        console.error('Product delete error:', e);
      }
    } else {
      showToast('Ürün vitrinden kaldırıldı.');
    }
  };

  // Stok Durumu Değiştirme
  const handleToggleStock = async (productId: string, currentStock: boolean) => {
    const updated = !currentStock;
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, in_stock: updated } : p))
    );

    if (isConfigured) {
      try {
        const supabase = createClient();
        await supabase.from('products').update({ in_stock: updated }).eq('id', productId);
        showToast('Stok durumu güncellendi.');
      } catch (e) {
        console.error('Stock update error:', e);
      }
    }
  };

  // Proje Ekleme
  const handleAddProject = async (newProj: Omit<Project, 'id' | 'created_at'>) => {
    const fallbackProj: Project = {
      ...newProj,
      id: `proj-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setProjects((prev) => [fallbackProj, ...prev]);
    showToast('Proje listeye eklendi.');
  };

  const handleDeleteProject = async (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    showToast('Proje silindi.');
  };

  const handleUpdateProjectStatus = async (projectId: string, status: Project['status']) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, status } : p))
    );
    showToast('Proje durumu güncellendi.');
  };

  // Görev Ekleme
  const handleAddTask = async (newTaskData: Omit<Task, 'id' | 'created_at' | 'project'>) => {
    const demoTask: Task = {
      ...newTaskData,
      id: `task-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setTasks((prev) => [demoTask, ...prev]);
    showToast('Görev eklendi.');
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleDeleteTask = async (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast('Görev silindi.');
  };

  const inStockCount = products.filter((p) => p.in_stock).length;
  const totalInventoryValue = products.reduce((sum, p) => sum + p.price, 0);

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
        productCount={products.length}
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
                {activeTab === 'overview' && 'Mağaza Genel Bakış & Metrikler'}
                {activeTab === 'products' && 'Ürün Kataloğu Yönetimi'}
                {activeTab === 'projects' && 'Proje & Çalışma Alanı'}
                {activeTab === 'tasks' && 'Görev Denetimi'}
                {activeTab === 'system' && 'Sistem & Supabase'}
                {activeTab === 'logs' && 'Aktivite Günlüğü'}
              </span>

              <span className="hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-white/5">
                NovaStore Console
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

            <Link
              href="/"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-200 hover:text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Mağazaya Git</span>
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
                    <span className="text-xs font-medium">Toplam Ürün</span>
                    <Package className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{products.length}</div>
                  <p className="text-[11px] text-emerald-400">{inStockCount} ürün aktif stokta</p>
                </div>

                <div className="glass-panel rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Katalog Değeri</span>
                    <DollarSign className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {totalInventoryValue.toLocaleString('tr-TR')} TL
                  </div>
                  <p className="text-[11px] text-slate-400">Toplam ürün portföyü</p>
                </div>

                <div className="glass-panel rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Aktif Sprint Görevleri</span>
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{tasks.length}</div>
                  <p className="text-[11px] text-slate-400">İşlem ve teslimat maddeleri</p>
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

              {/* Quick Actions */}
              <div className="p-6 rounded-2xl glass-panel border border-indigo-500/20 bg-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-indigo-400" />
                    <span>Hızlı Yönetim Aksiyonları</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Vitrindeki ürünleri güncelleyebilir, yeni ürün ekleyebilir veya veritabanı yedeği alabilirsiniz.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setActiveTab('products')}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all"
                  >
                    Ürün Kataloğunu Yönet
                  </button>
                  <button
                    onClick={() => setActiveTab('system')}
                    className="px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
                  >
                    Sistem Teşhisi &amp; Yedek
                  </button>
                </div>
              </div>

              {/* Products Preview */}
              <div className="glass-panel rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Vitrindeki Ürünler</h3>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="text-xs text-indigo-400 hover:underline"
                  >
                    Tümünü Yönet
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {products.slice(0, 3).map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-xl bg-slate-900/80 border border-white/5 flex items-center gap-3"
                    >
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-950 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{p.name}</p>
                        <p className="text-[11px] text-indigo-400 font-semibold">
                          {p.price.toLocaleString('tr-TR')} TL
                        </p>
                        <span className="text-[9px] text-slate-400">{p.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS */}
          {activeTab === 'products' && (
            <ProductAdmin
              products={products}
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
              onToggleStock={handleToggleStock}
            />
          )}

          {/* TAB 3: PROJECTS */}
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

          {/* TAB 4: TASKS */}
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

          {/* TAB 5: SYSTEM */}
          {activeTab === 'system' && (
            <SystemHealth
              projects={projects}
              tasks={tasks}
              isConfigured={isConfigured}
            />
          )}

          {/* TAB 6: LOGS */}
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
