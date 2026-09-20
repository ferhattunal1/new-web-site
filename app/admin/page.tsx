'use client';

import { useState, useEffect, useRef } from 'react';
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
  UsersModule,
  SystemSettingsModule 
} from '@/components/admin/AdminModules';
import { SqlGuideModal } from '@/components/SqlGuideModal';
import { isAuthenticated, logoutAdmin } from '@/lib/admin-auth';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { INITIAL_PRODUCTS } from '@/lib/store-data';
import { INITIAL_PROJECTS, INITIAL_TASKS } from '@/lib/supabase/mock-data';
import { Product, Project, Task } from '@/types/database';
import { 
  ADMIN_STORAGE_KEYS, 
  loadAdminData, 
  saveAdminData, 
  getLastSavedTime,
  exportAllAdminData,
  importAdminData 
} from '@/lib/admin-storage';
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
  Save,
  Download,
  Upload,
  Check,
  RotateCcw
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
  const [lastSaved, setLastSaved] = useState<string>('Kayıtlı');
  const [isSavingGlobal, setIsSavingGlobal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check login state and load persisted products on mount
  useEffect(() => {
    setLoggedIn(isAuthenticated());
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);

    // 1. Önce LocalStorage'daki kalıcı ürünleri yükle
    const cachedProducts = loadAdminData<Product[]>(ADMIN_STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    setProducts(cachedProducts);
    setLastSaved(getLastSavedTime());

    // 2. Supabase yapılandırılmışsa sunucudan en günceli çek ve senkronize et
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
            saveAdminData(ADMIN_STORAGE_KEYS.PRODUCTS, prodData);
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
    setLastSaved(getLastSavedTime());
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogout = () => {
    logoutAdmin();
    setLoggedIn(false);
  };

  // Global "Değişiklikleri Kaydet" Butonu
  const handleGlobalSave = () => {
    setIsSavingGlobal(true);
    saveAdminData(ADMIN_STORAGE_KEYS.PRODUCTS, products);
    setTimeout(() => {
      setIsSavingGlobal(false);
      showToast('✓ Tüm sistem değişiklikleri başarıyla kaydedildi!');
    }, 400);
  };

  // Yedek İndir (JSON Export)
  const handleExportBackup = () => {
    const json = exportAllAdminData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `litef-admin-yedek-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Tüm admin ayarları JSON olarak bilgisayarınıza indirildi.');
  };

  // Yedek Yükle (JSON Import)
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (importAdminData(content)) {
        showToast('✓ Yedek başarıyla geri yüklendi! Sayfa yenileniyor...');
        setTimeout(() => window.location.reload(), 1200);
      } else {
        showToast('Yedek dosyası okunamadı veya biçim hatalı.');
      }
    };
    reader.readAsText(file);
  };

  // Ürün Ekleme (Hem State'e hem Kalıcı Depolamaya yazar)
  const handleAddProduct = async (newProd: Omit<Product, 'id' | 'created_at'>) => {
    const newId = `prod-${Date.now()}`;
    const productToAdd: Product = {
      ...newProd,
      id: newId,
      created_at: new Date().toISOString(),
    };

    const updatedList = [productToAdd, ...products];
    setProducts(updatedList);
    saveAdminData(ADMIN_STORAGE_KEYS.PRODUCTS, updatedList);

    if (isConfigured) {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('products')
          .insert([newProd])
          .select()
          .single();

        if (!error && data) {
          showToast('Ürün Supabase veritabanına ve sisteme kaydedildi!');
          return;
        }
      } catch (e) {
        console.warn('Supabase insert warning:', e);
      }
    }

    showToast(`"${productToAdd.name}" başarıyla eklendi ve kaydedildi.`);
  };

  // Ürün Silme
  const handleDeleteProduct = async (productId: string) => {
    const updatedList = products.filter((p) => p.id !== productId);
    setProducts(updatedList);
    saveAdminData(ADMIN_STORAGE_KEYS.PRODUCTS, updatedList);

    if (isConfigured) {
      try {
        const supabase = createClient();
        await supabase.from('products').delete().eq('id', productId);
      } catch (e) {
        console.error('Delete error:', e);
      }
    }
    showToast('Ürün katalogdan silindi ve kaydedildi.');
  };

  // Stok Durumu Güncelleme
  const handleToggleStock = async (productId: string, currentStock: boolean) => {
    const updated = !currentStock;
    const updatedList = products.map((p) => (p.id === productId ? { ...p, in_stock: updated } : p));
    setProducts(updatedList);
    saveAdminData(ADMIN_STORAGE_KEYS.PRODUCTS, updatedList);

    if (isConfigured) {
      try {
        const supabase = createClient();
        await supabase.from('products').update({ in_stock: updated }).eq('id', productId);
      } catch (e) {
        console.error('Stock error:', e);
      }
    }
    showToast('Stok durumu güncellendi ve kaydedildi.');
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
    <div className="flex min-h-screen bg-[#090d16] text-slate-100 selection:bg-indigo-500 selection:text-white font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 text-white shadow-2xl border border-emerald-400/30 text-xs font-bold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Gizli Dosya Girişi (Yedek Yükleme İçin) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportBackup}
        accept=".json"
        className="hidden"
      />

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
        {/* Sticky Header with Universal Save Button */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-8 border-b border-white/10 bg-[#090d16]/90 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 rounded-lg text-slate-400 hover:text-white lg:hidden bg-slate-800/50 touch-manipulation min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Menüyü Aç"
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
                {activeTab === 'system' && 'Sistem & Mağaza Ayarları'}
              </span>

              <span className="hidden sm:inline-flex text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-white/5">
                litef v2.5
              </span>
            </div>
          </div>

          {/* Right Header Actions: Kaydet Butonu, Yedekleme ve Mağaza Linki */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Canlı Kayıt Durumu */}
            <span className="hidden xl:inline-flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-white/5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Son Kayıt: {lastSaved}</span>
            </span>

            {/* Global "Değişiklikleri Kaydet" Butonu */}
            <button
              onClick={handleGlobalSave}
              disabled={isSavingGlobal}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-all active:scale-95 touch-manipulation min-h-[38px]"
              title="Paneldeki tüm modülleri kalıcı olarak kaydeder"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Değişiklikleri Kaydet</span>
              <span className="sm:hidden">Kaydet</span>
            </button>

            {/* Yedek Al & Yükle Butonları */}
            <div className="hidden md:flex items-center gap-1 bg-slate-900 border border-white/10 rounded-xl p-1">
              <button
                onClick={handleExportBackup}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                title="Tüm Ayarları Yedekle (JSON)"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                title="Yedekten Geri Yükle (JSON)"
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>

            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-white/10 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Mağazaya Git</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
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
                    <span className="text-xs font-medium">Sistem Kalıcılığı</span>
                    <Server className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-base font-bold text-white truncate">
                    Otomatik Kayıt Aktif
                  </div>
                  <p className="text-[11px] text-emerald-400">LocalStorage &amp; PostgreSQL</p>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="p-6 rounded-2xl glass-panel border border-indigo-500/20 bg-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Hızlı Yönetim &amp; Kayıt İşlemleri</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Panelde yaptığınız her işlem anında kalıcı olarak saklanır. Dilerseniz üstteki yeşil <b>Değişiklikleri Kaydet</b> butonuyla manuel onaylayabilirsiniz.
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
                    onClick={() => setActiveTab('system')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
                  >
                    Mağaza Ayarları
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
          {activeTab === 'menus' && <MenusModule onShowToast={showToast} />}

          {/* 3. LANDING SAYFALAR */}
          {activeTab === 'landing' && <LandingPagesModule onShowToast={showToast} />}

          {/* 4. SAYFA DÜZENİ */}
          {activeTab === 'layout' && <PageLayoutModule onShowToast={showToast} />}

          {/* 5. MODÜL OLUŞTURMA */}
          {activeTab === 'modules' && <ModuleBuilderModule onShowToast={showToast} />}

          {/* 6. ÜRÜNLER */}
          {activeTab === 'products' && (
            <ProductAdmin
              products={products}
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
              onToggleStock={handleToggleStock}
              onShowToast={showToast}
            />
          )}

          {/* 7. KATEGORİLER */}
          {activeTab === 'categories' && <CategoriesModule onShowToast={showToast} />}

          {/* 8. TEKLİF TALEPLERİ */}
          {activeTab === 'quotes' && <QuotesModule onShowToast={showToast} />}

          {/* 9. FİYAT LİSTESİ */}
          {activeTab === 'prices' && <PriceListModule onShowToast={showToast} />}

          {/* 10. SSS */}
          {activeTab === 'faq' && <FaqModule onShowToast={showToast} />}

          {/* 11. DOSYA YÖNETİCİSİ */}
          {activeTab === 'files' && <FileManagerModule onShowToast={showToast} />}

          {/* 12. KULLANICILAR */}
          {activeTab === 'users' && <UsersModule onShowToast={showToast} />}

          {/* 13. SİSTEM & MAĞAZA AYARLARI */}
          {activeTab === 'system' && (
            <div className="space-y-8">
              <SystemSettingsModule onShowToast={showToast} />

              <div className="pt-8 border-t border-white/10">
                <h3 className="text-sm font-bold text-white mb-4">Veritabanı &amp; Supabase Sağlık Durumu</h3>
                <SystemHealth
                  projects={projects}
                  tasks={tasks}
                  isConfigured={isConfigured}
                />
              </div>
            </div>
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
