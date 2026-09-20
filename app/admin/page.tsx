'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminSidebar, AdminTab } from '@/components/admin/AdminSidebar';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { ProductAdmin } from '@/components/admin/ProductAdmin';
import { SystemHealth } from '@/components/admin/SystemHealth';
import { 
  MenusModule, 
  LandingPagesModule, 
  PageLayoutModule, 
  ModuleBuilderModule, 
  CategoriesModule, 
  QuotesModule, 
  PriceListModule, 
  FaqModule, 
  FileManagerModule, 
  UsersModule 
} from '@/components/admin/AdminModules';
import { SqlGuideModal } from '@/components/SqlGuideModal';
import { isAuthenticated, logoutAdmin } from '@/lib/admin-auth';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { INITIAL_PRODUCTS } from '@/lib/store-data';
import { INITIAL_PROJECTS, INITIAL_TASKS } from '@/lib/supabase/mock-data';
import { Product, Project, Task } from '@/types/database';
import { 
  Menu, 
  ArrowLeft, 
  Code2, 
  CheckCircle2, 
  Package, 
  DollarSign, 
  FileText, 
  Server, 
  LogOut,
  Sparkles,
  TrendingUp
} from 'lucide-react';

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [isSqlModalOpen, setIsSqlModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  // Check login state on mount
  useEffect(() => {
    setLoggedIn(isAuthenticated());
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);

    const fetchData = async () => {
      if (configured) {
        try {
          const supabase = createClient();
          const { data: prodData } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

          if (prodData && prodData.length > 0) {
            setProducts(prodData as Product[]);
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

  const handleLogout = () => {
    logoutAdmin();
    setLoggedIn(false);
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
          showToast('Ürün Supabase veritabanına kaydedildi!');
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
        console.error('Delete error:', e);
      }
    } else {
      showToast('Ürün silindi.');
    }
  };

  // Stok Durumu
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
        console.error('Stock error:', e);
      }
    }
  };

  // Loading indicator until auth checked
  if (loggedIn === null) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // Not logged in -> Show Login Page
  if (!loggedIn) {
    return <AdminLogin onLoginSuccess={() => setLoggedIn(true)} />;
  }

  // Metrikler
  const totalInventoryValue = products.reduce((sum, p) => sum + p.price, 0);
  const inStockCount = products.filter((p) => p.in_stock).length;

  return (
    <div className="flex min-h-screen bg-[#090d16] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white shadow-2xl border border-indigo-400/30 text-xs font-bold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toast}</span>
        </div>
      )}

      {/* 13 Modüllü Admin Kenar Çubuğu */}
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpenMobile={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        productCount={products.length}
        quoteCount={3}
        onLogout={handleLogout}
      />

      {/* Main Content Body */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-8 border-b border-white/10 bg-[#090d16]/85 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 rounded-lg text-slate-400 hover:text-white lg:hidden bg-slate-800/50"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                {activeTab === 'overview' && 'Özet & Genel Metrikler'}
                {activeTab === 'menus' && 'Menüler ve Navigasyon'}
                {activeTab === 'landing' && 'Landing Sayfaları'}
                {activeTab === 'layout' && 'Ana Sayfa Düzeni'}
                {activeTab === 'modules' && 'Modül Oluşturma'}
                {activeTab === 'products' && 'Ürün Kataloğu'}
                {activeTab === 'categories' && 'Kategoriler'}
                {activeTab === 'quotes' && 'Teklif Talepleri'}
                {activeTab === 'prices' && 'Fiyat Listesi'}
                {activeTab === 'faq' && 'Sıkça Sorulan Sorular (SSS)'}
                {activeTab === 'files' && 'Dosya Yöneticisi'}
                {activeTab === 'users' && 'Kullanıcılar & Roller'}
                {activeTab === 'system' && 'Sistem & Supabase Ayarları'}
              </span>

              <span className="hidden sm:inline-flex text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-white/5">
                Admin v2.0
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-white/10 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Mağazaya Git</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Güvenli Çıkış Yap"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Tab Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* 1. ÖZET (OVERVIEW) */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-panel rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Toplam Ürün</span>
                    <Package className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{products.length}</div>
                  <p className="text-[11px] text-emerald-400">{inStockCount} ürün aktif stokta</p>
                </div>

                <div className="glass-panel rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Katalog Değeri</span>
                    <DollarSign className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    {totalInventoryValue.toLocaleString('tr-TR')} TL
                  </div>
                  <p className="text-[11px] text-slate-400">Perakende portföy değeri</p>
                </div>

                <div className="glass-panel rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Bekleyen Teklifler</span>
                    <FileText className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-white">3 Adet</div>
                  <p className="text-[11px] text-amber-300">240.000 TL potansiyel ciro</p>
                </div>

                <div className="glass-panel rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Supabase Durumu</span>
                    <Server className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-base font-bold text-white truncate">
                    {isConfigured ? 'Canlı Bağlantı' : 'Demo Modu'}
                  </div>
                  <p className="text-[11px] text-emerald-400">PostgreSQL 15 Aktif</p>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="p-6 rounded-2xl glass-panel border border-indigo-500/20 bg-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Hızlı Yönetim İşlemleri</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Menüleri düzenleyebilir, yeni ürün ekleyebilir veya gelen teklif taleplerini inceleyebilirsiniz.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setActiveTab('products')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all"
                  >
                    Ürünleri Yönet
                  </button>
                  <button
                    onClick={() => setActiveTab('quotes')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-sm transition-all"
                  >
                    Teklif Talepleri
                  </button>
                  <button
                    onClick={() => setActiveTab('menus')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
                  >
                    Menüleri Düzenle
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. MENÜLER */}
          {activeTab === 'menus' && <MenusModule />}

          {/* 3. LANDING SAYFALAR */}
          {activeTab === 'landing' && <LandingPagesModule />}

          {/* 4. SAYFA DÜZENİ */}
          {activeTab === 'layout' && <PageLayoutModule />}

          {/* 5. MODÜL OLUŞTURMA */}
          {activeTab === 'modules' && <ModuleBuilderModule />}

          {/* 6. ÜRÜNLER */}
          {activeTab === 'products' && (
            <ProductAdmin
              products={products}
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
              onToggleStock={handleToggleStock}
            />
          )}

          {/* 7. KATEGORİLER */}
          {activeTab === 'categories' && <CategoriesModule />}

          {/* 8. TEKLİF TALEPLERİ */}
          {activeTab === 'quotes' && <QuotesModule />}

          {/* 9. FİYAT LİSTESİ */}
          {activeTab === 'prices' && <PriceListModule />}

          {/* 10. SSS */}
          {activeTab === 'faq' && <FaqModule />}

          {/* 11. DOSYA YÖNETİCİSİ */}
          {activeTab === 'files' && <FileManagerModule />}

          {/* 12. KULLANICILAR */}
          {activeTab === 'users' && <UsersModule />}

          {/* 13. SİSTEM AYARLARI */}
          {activeTab === 'system' && (
            <SystemHealth
              projects={projects}
              tasks={tasks}
              isConfigured={isConfigured}
            />
          )}
        </main>
      </div>

      {/* SQL Guide Modal */}
      <SqlGuideModal
        isOpen={isSqlModalOpen}
        onClose={() => setIsSqlModalOpen(false)}
      />
    </div>
  );
}
