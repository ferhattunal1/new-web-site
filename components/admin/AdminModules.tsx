'use client';

import { useState, useEffect } from 'react';
import { 
  MenuSquare, 
  Layers, 
  LayoutTemplate, 
  Boxes, 
  Tags, 
  FileText, 
  BadgePercent, 
  HelpCircle, 
  FolderArchive, 
  Users, 
  Plus, 
  Trash2, 
  Check, 
  Save,
  CheckCircle2,
  Sliders, 
  Sparkles, 
  FileUp, 
  ShieldCheck, 
  Settings,
  Server,
  Globe,
  Bell,
  RefreshCw
} from 'lucide-react';
import { 
  ADMIN_STORAGE_KEYS, 
  loadAdminData, 
  saveAdminData, 
  SiteSettings, 
  DEFAULT_SITE_SETTINGS 
} from '@/lib/admin-storage';

interface ModuleProps {
  onShowToast?: (msg: string) => void;
}

/* ==============================================================================
 * 1. MENÜLER YÖNETİMİ (MENUS)
 * ============================================================================== */
const DEFAULT_MENUS = [
  { id: 1, title: 'Koleksiyon & Ürünler', url: '#katalog', location: 'Header & Mobil', active: true },
  { id: 2, title: 'Lansman Fırsatı', url: '#kampanya', location: 'Header & Mobil', active: true },
  { id: 3, title: 'Müşteri İncelemeleri', url: '#incelemeler', location: 'Header & Mobil', active: true },
  { id: 4, title: 'Hakkımızda', url: '#katalog', location: 'Footer', active: true },
  { id: 5, title: 'Gizlilik Politikası', url: '#', location: 'Footer', active: true },
];

export function MenusModule({ onShowToast }: ModuleProps) {
  const [menus, setMenus] = useState(DEFAULT_MENUS);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newLocation, setNewLocation] = useState('Header');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setMenus(loadAdminData(ADMIN_STORAGE_KEYS.MENUS, DEFAULT_MENUS));
  }, []);

  const handleSave = (updatedMenus = menus) => {
    saveAdminData(ADMIN_STORAGE_KEYS.MENUS, updatedMenus);
    setSavedSuccess(true);
    if (onShowToast) onShowToast('Menü değişiklikleri başarıyla kaydedildi!');
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const updated = [
      ...menus,
      { id: Date.now(), title: newTitle.trim(), url: newUrl.trim() || '#', location: newLocation, active: true },
    ];
    setMenus(updated);
    handleSave(updated);
    setNewTitle('');
    setNewUrl('');
  };

  const handleDelete = (id: number) => {
    const updated = menus.filter((m) => m.id !== id);
    setMenus(updated);
    handleSave(updated);
  };

  const handleToggle = (id: number) => {
    const updated = menus.map((m) => (m.id === id ? { ...m, active: !m.active } : m));
    setMenus(updated);
    handleSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <MenuSquare className="w-5 h-5 text-indigo-400" />
            <span>Menü &amp; Navigasyon Yönetimi</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Üst bilgi (Header), alt bilgi (Footer) ve mobil menü bağlantılarını düzenleyin.</p>
        </div>

        <button
          onClick={() => handleSave()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95 self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Kaydedildi!' : 'Değişiklikleri Kaydet'}</span>
        </button>
      </div>

      <form onSubmit={handleAdd} className="p-4 rounded-2xl glass-panel flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          required
          placeholder="Menü Başlığı (Örn: Kampanyalar)"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="Bağlantı URL (Örn: #katalog)"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <select
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="Header">Header (Üst Menü)</option>
          <option value="Footer">Footer (Alt Bilgi)</option>
          <option value="Header & Mobil">Header &amp; Mobil</option>
        </select>
        <button type="submit" className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shrink-0 flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> <span>Ekle &amp; Kaydet</span>
        </button>
      </form>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 text-slate-400 border-b border-white/10">
            <tr>
              <th className="py-3 px-4 font-semibold">Menü Başlığı</th>
              <th className="py-3 px-4 font-semibold">URL Hedefi</th>
              <th className="py-3 px-4 font-semibold">Konum</th>
              <th className="py-3 px-4 font-semibold">Durum</th>
              <th className="py-3 px-4 font-semibold text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {menus.map((menu) => (
              <tr key={menu.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-medium text-white">{menu.title}</td>
                <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">{menu.url}</td>
                <td className="py-3 px-4 text-slate-300">{menu.location}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleToggle(menu.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      menu.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {menu.active ? 'Aktif' : 'Pasif'}
                  </button>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleDelete(menu.id)}
                    className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg transition-colors"
                    title="Menüyü Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ==============================================================================
 * 2. LANDING SAYFALARI (LANDING PAGES)
 * ============================================================================== */
const DEFAULT_LANDING_PAGES = [
  { id: 1, title: 'litef Pro X Resmi Lansmanı', slug: '/lansman-litef-pro', visits: 1240, status: 'Yayında', date: '2026-09-15' },
  { id: 2, title: 'Sonbahar Teknoloji Fırsatları', slug: '/kampanya-sonbahar', visits: 850, status: 'Yayında', date: '2026-09-18' },
  { id: 3, title: 'Aura Chrono Ön Sipariş Sayfası', slug: '/on-siparis-aura', visits: 410, status: 'Taslak', date: '2026-09-20' },
];

export function LandingPagesModule({ onShowToast }: ModuleProps) {
  const [pages, setPages] = useState(DEFAULT_LANDING_PAGES);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setPages(loadAdminData(ADMIN_STORAGE_KEYS.LANDING_PAGES, DEFAULT_LANDING_PAGES));
  }, []);

  const handleSave = (updatedPages = pages) => {
    saveAdminData(ADMIN_STORAGE_KEYS.LANDING_PAGES, updatedPages);
    setSavedSuccess(true);
    if (onShowToast) onShowToast('Landing sayfaları kaydedildi!');
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const generatedSlug = slug.trim() ? (slug.startsWith('/') ? slug : `/${slug}`) : `/${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    const updated = [
      ...pages,
      { id: Date.now(), title: title.trim(), slug: generatedSlug, visits: 0, status: 'Yayında', date: new Date().toISOString().split('T')[0] },
    ];
    setPages(updated);
    handleSave(updated);
    setTitle('');
    setSlug('');
  };

  const handleDelete = (id: number) => {
    const updated = pages.filter((p) => p.id !== id);
    setPages(updated);
    handleSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>Landing Sayfa Yönetimi</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Özel ürün tanıtım ve kampanya iniş sayfaları oluşturup yönetin.</p>
        </div>

        <button
          onClick={() => handleSave()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95 self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Kaydedildi!' : 'Değişiklikleri Kaydet'}</span>
        </button>
      </div>

      <form onSubmit={handleCreate} className="p-4 rounded-2xl glass-panel flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          required
          placeholder="Sayfa Başlığı (Örn: litef SmartWatch Tanıtım)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="URL Slug (Örn: /smartwatch-ultra)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button type="submit" className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shrink-0 flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> <span>Oluştur &amp; Kaydet</span>
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pages.map((p) => (
          <div key={p.id} className="glass-panel p-4 rounded-2xl space-y-3 relative group">
            <div className="flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                p.status === 'Yayında' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {p.status}
              </span>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-slate-500 hover:text-red-400 p-1"
                title="Sayfayı Sil"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{p.title}</h3>
              <p className="text-[11px] font-mono text-indigo-400 mt-0.5">{p.slug}</p>
            </div>
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span>{p.visits} Ziyaretçi</span>
              <span>{p.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==============================================================================
 * 3. SAYFA DÜZENİ (PAGE LAYOUT)
 * ============================================================================== */
const DEFAULT_LAYOUT_SECTIONS = [
  { id: 'hero', name: 'Amiral Gemisi Lansman (Hero)', enabled: true },
  { id: 'campaign', name: 'Lansman Kuponu & Geri Sayım', enabled: true },
  { id: 'catalog', name: 'Öne Çıkan Ürün Kataloğu', enabled: true },
  { id: 'reviews', name: 'Doğrulanmış Müşteri İncelemeleri', enabled: true },
  { id: 'footer', name: 'Kurumsal Alt Bilgi & Bülten', enabled: true },
];

export function PageLayoutModule({ onShowToast }: ModuleProps) {
  const [sections, setSections] = useState(DEFAULT_LAYOUT_SECTIONS);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setSections(loadAdminData(ADMIN_STORAGE_KEYS.LAYOUT, DEFAULT_LAYOUT_SECTIONS));
  }, []);

  const handleSave = (updatedSections = sections) => {
    saveAdminData(ADMIN_STORAGE_KEYS.LAYOUT, updatedSections);
    setSavedSuccess(true);
    if (onShowToast) onShowToast('Sayfa düzeni başarıyla kaydedildi!');
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const toggleSection = (id: string) => {
    const updated = sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s));
    setSections(updated);
    handleSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-indigo-400" />
            <span>Ana Sayfa Bölüm Düzeni</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Ana sayfadaki bileşenlerin görünürlüğünü yönetin.</p>
        </div>

        <button
          onClick={() => handleSave()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95 self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Kaydedildi!' : 'Düzeni Kaydet'}</span>
        </button>
      </div>

      <div className="space-y-3">
        {sections.map((sec, idx) => (
          <div key={sec.id} className="p-4 rounded-2xl glass-panel flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-xs">
                {idx + 1}
              </span>
              <div>
                <h4 className="text-xs font-bold text-white">{sec.name}</h4>
                <p className="text-[10px] text-slate-400 font-mono">Bileşen Kimliği: {sec.id}</p>
              </div>
            </div>

            <button
              onClick={() => toggleSection(sec.id)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                sec.enabled ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {sec.enabled ? 'Görünür (Açık)' : 'Gizli (Kapalı)'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==============================================================================
 * 4. MODÜL OLUŞTURMA (MODULE BUILDER)
 * ============================================================================== */
const DEFAULT_CUSTOM_MODULES = [
  { id: 1, name: 'WhatsApp Canlı Destek Butonu', type: 'Floating Widget', active: true },
  { id: 2, name: 'Çerez İzin Bildirimi (GDPR/KVKK)', type: 'Modal Pop-up', active: true },
  { id: 3, name: 'Sepette Ek Ürün Önerisi', type: 'Cross-Sell Card', active: false },
];

export function ModuleBuilderModule({ onShowToast }: ModuleProps) {
  const [modules, setModules] = useState(DEFAULT_CUSTOM_MODULES);
  const [modName, setModName] = useState('');
  const [modType, setModType] = useState('Floating Widget');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setModules(loadAdminData(ADMIN_STORAGE_KEYS.MODULES, DEFAULT_CUSTOM_MODULES));
  }, []);

  const handleSave = (updated = modules) => {
    saveAdminData(ADMIN_STORAGE_KEYS.MODULES, updated);
    setSavedSuccess(true);
    if (onShowToast) onShowToast('Modüller başarıyla kaydedildi!');
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modName.trim()) return;
    const updated = [
      ...modules,
      { id: Date.now(), name: modName.trim(), type: modType, active: true },
    ];
    setModules(updated);
    handleSave(updated);
    setModName('');
  };

  const handleToggle = (id: number) => {
    const updated = modules.map((m) => (m.id === id ? { ...m, active: !m.active } : m));
    setModules(updated);
    handleSave(updated);
  };

  const handleDelete = (id: number) => {
    const updated = modules.filter((m) => m.id !== id);
    setModules(updated);
    handleSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Boxes className="w-5 h-5 text-indigo-400" />
            <span>Dinamik Modül Oluşturucu</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Sitenize kod yazmadan yeni eklentiler ve bileşenler ekleyin.</p>
        </div>

        <button
          onClick={() => handleSave()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95 self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Kaydedildi!' : 'Değişiklikleri Kaydet'}</span>
        </button>
      </div>

      <form onSubmit={handleCreate} className="p-4 rounded-2xl glass-panel flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          required
          placeholder="Modül Adı (Örn: Canlı Destek, E-Bülten Modal)"
          value={modName}
          onChange={(e) => setModName(e.target.value)}
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <select
          value={modType}
          onChange={(e) => setModType(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="Floating Widget">Floating Widget (Köşe Eklentisi)</option>
          <option value="Modal Pop-up">Modal Pop-up (Açılır Pencere)</option>
          <option value="Cross-Sell Card">Cross-Sell Card (Çapraz Satış)</option>
          <option value="Notification Bar">Notification Bar (Duyuru Çubuğu)</option>
        </select>
        <button type="submit" className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shrink-0 flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> <span>Modülü Ekle &amp; Kaydet</span>
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modules.map((m) => (
          <div key={m.id} className="glass-panel p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                {m.type}
              </span>
              <button
                onClick={() => handleDelete(m.id)}
                className="text-slate-500 hover:text-red-400 p-1"
                title="Modülü Sil"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <h4 className="text-xs font-bold text-white">{m.name}</h4>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Durum:</span>
              <button
                onClick={() => handleToggle(m.id)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  m.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                }`}
              >
                {m.active ? 'Aktif' : 'Devre Dışı'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==============================================================================
 * 5. KATEGORİLER (CATEGORIES)
 * ============================================================================== */
const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Kulaklık & Ses', count: 12, slug: 'kulaklik-ses' },
  { id: 2, name: 'Akıllı Saatler', count: 8, slug: 'akilli-saatler' },
  { id: 3, name: 'Giyilebilir Teknoloji', count: 6, slug: 'giyilebilir-teknoloji' },
  { id: 4, name: 'Aksesuarlar', count: 15, slug: 'aksesuarlar' },
];

export function CategoriesModule({ onShowToast }: ModuleProps) {
  const [cats, setCats] = useState(DEFAULT_CATEGORIES);
  const [name, setName] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setCats(loadAdminData(ADMIN_STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES));
  }, []);

  const handleSave = (updated = cats) => {
    saveAdminData(ADMIN_STORAGE_KEYS.CATEGORIES, updated);
    setSavedSuccess(true);
    if (onShowToast) onShowToast('Kategoriler başarıyla kaydedildi!');
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const updated = [
      ...cats,
      { id: Date.now(), name: name.trim(), count: 0, slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-') },
    ];
    setCats(updated);
    handleSave(updated);
    setName('');
  };

  const handleDelete = (id: number) => {
    const updated = cats.filter((c) => c.id !== id);
    setCats(updated);
    handleSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Tags className="w-5 h-5 text-indigo-400" />
            <span>Kategori Yönetimi</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Ürünlerin listelendiği vitrin kategorilerini düzenleyin.</p>
        </div>

        <button
          onClick={() => handleSave()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95 self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Kaydedildi!' : 'Kategorileri Kaydet'}</span>
        </button>
      </div>

      <form onSubmit={handleAdd} className="p-4 rounded-2xl glass-panel flex gap-3">
        <input
          type="text"
          required
          placeholder="Yeni Kategori Adı (Örn: Akıllı Ev Aletleri)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button type="submit" className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shrink-0 flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> <span>Kategori Ekle &amp; Kaydet</span>
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cats.map((c) => (
          <div key={c.id} className="glass-panel p-4 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">/{c.slug}</span>
              <button
                onClick={() => handleDelete(c.id)}
                className="text-slate-500 hover:text-red-400 p-1"
                title="Kategoriyi Sil"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <h4 className="text-sm font-bold text-white">{c.name}</h4>
            <p className="text-[11px] text-emerald-400 font-medium">{c.count} Ürün Bağlı</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==============================================================================
 * 6. TEKLİF TALEPLERİ (QUOTES)
 * ============================================================================== */
const DEFAULT_QUOTES = [
  { id: 'T-101', company: 'Atlas Bilişim A.Ş.', contact: 'Ahmet Yılmaz', email: 'ahmet@atlasbilisim.com', phone: '0532 555 0192', product: 'litef Pro X (50 Adet)', budget: '150.000 TL', status: 'Yeni' },
  { id: 'T-102', company: 'Teknoloji Vadisi Ltd.', contact: 'Canan Demir', email: 'canan@tekno.com', phone: '0544 222 9011', product: 'Aura Chrono (20 Adet)', budget: '90.000 TL', status: 'İnceleniyor' },
  { id: 'T-103', company: 'Global Çözümler', contact: 'Serdar Kaya', email: 'serdar@global.com', phone: '0555 111 4433', product: 'Vortex XR Gözlük (10 Adet)', budget: '120.000 TL', status: 'Teklif Verildi' },
];

export function QuotesModule({ onShowToast }: ModuleProps) {
  const [quotes, setQuotes] = useState(DEFAULT_QUOTES);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setQuotes(loadAdminData(ADMIN_STORAGE_KEYS.QUOTES, DEFAULT_QUOTES));
  }, []);

  const handleSave = (updated = quotes) => {
    saveAdminData(ADMIN_STORAGE_KEYS.QUOTES, updated);
    setSavedSuccess(true);
    if (onShowToast) onShowToast('Teklif durumu güncellendi & kaydedildi!');
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    const updated = quotes.map((q) => (q.id === id ? { ...q, status: newStatus } : q));
    setQuotes(updated);
    handleSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <span>Kurumsal Teklif Talepleri (B2B)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Toplu sipariş ve kurumsal bayi taleplerini yönetin.</p>
        </div>

        <button
          onClick={() => handleSave()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95 self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Kaydedildi!' : 'Durumları Kaydet'}</span>
        </button>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 text-slate-400 border-b border-white/10">
            <tr>
              <th className="py-3 px-4 font-semibold">Kod</th>
              <th className="py-3 px-4 font-semibold">Şirket / Yetkili</th>
              <th className="py-3 px-4 font-semibold">İletişim</th>
              <th className="py-3 px-4 font-semibold">Talep Edilen Ürün</th>
              <th className="py-3 px-4 font-semibold">Bütçe</th>
              <th className="py-3 px-4 font-semibold">Durum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {quotes.map((q) => (
              <tr key={q.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-mono font-bold text-indigo-400">{q.id}</td>
                <td className="py-3 px-4">
                  <div className="font-bold text-white">{q.company}</div>
                  <div className="text-[11px] text-slate-400">{q.contact}</div>
                </td>
                <td className="py-3 px-4 text-slate-300">
                  <div>{q.email}</div>
                  <div className="text-[10px] text-slate-400">{q.phone}</div>
                </td>
                <td className="py-3 px-4 text-white font-medium">{q.product}</td>
                <td className="py-3 px-4 font-bold text-emerald-400">{q.budget}</td>
                <td className="py-3 px-4">
                  <select
                    value={q.status}
                    onChange={(e) => handleStatusChange(q.id, e.target.value)}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Yeni">Yeni</option>
                    <option value="İnceleniyor">İnceleniyor</option>
                    <option value="Teklif Verildi">Teklif Verildi</option>
                    <option value="Tamamlandı">Tamamlandı</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ==============================================================================
 * 7. FİYAT LİSTESİ (PRICE LIST)
 * ============================================================================== */
const DEFAULT_PRICES = [
  { sku: 'LTF-01', name: 'litef Pro X Wireless', retail: 3499, wholesale: 2650, margin: '%32' },
  { sku: 'AUR-02', name: 'Aura Chrono Ultra', retail: 4999, wholesale: 3800, margin: '%31' },
  { sku: 'VRX-03', name: 'Vortex Vision XR', retail: 12899, wholesale: 9900, margin: '%30' },
  { sku: 'SNC-04', name: 'SonicPulse Studio', retail: 2199, wholesale: 1650, margin: '%33' },
  { sku: 'MGC-05', name: 'MagCharge Pro 3-in-1', retail: 999, wholesale: 650, margin: '%35' },
];

export function PriceListModule({ onShowToast }: ModuleProps) {
  const [items, setItems] = useState(DEFAULT_PRICES);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setItems(loadAdminData(ADMIN_STORAGE_KEYS.PRICES, DEFAULT_PRICES));
  }, []);

  const handleSave = (updated = items) => {
    saveAdminData(ADMIN_STORAGE_KEYS.PRICES, updated);
    setSavedSuccess(true);
    if (onShowToast) onShowToast('Fiyat listesi başarıyla kaydedildi!');
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handlePriceChange = (sku: string, field: 'retail' | 'wholesale', val: number) => {
    const updated = items.map((it) => (it.sku === sku ? { ...it, [field]: val } : it));
    setItems(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <BadgePercent className="w-5 h-5 text-indigo-400" />
            <span>Fiyat &amp; İskonto Matrisi</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Perakende ve toptan (bayi) satış fiyatlarını doğrudan düzenleyip kaydedin.</p>
        </div>

        <button
          onClick={() => handleSave()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95 self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Kaydedildi!' : 'Fiyatları Kaydet'}</span>
        </button>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 text-slate-400 border-b border-white/10">
            <tr>
              <th className="py-3 px-4 font-semibold">SKU Kodu</th>
              <th className="py-3 px-4 font-semibold">Ürün Adı</th>
              <th className="py-3 px-4 font-semibold">Perakende Fiyatı (TL)</th>
              <th className="py-3 px-4 font-semibold">Toptan / Bayi (TL)</th>
              <th className="py-3 px-4 font-semibold">Kâr Marjı</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items.map((it) => (
              <tr key={it.sku} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-mono font-bold text-indigo-400">{it.sku}</td>
                <td className="py-3 px-4 font-bold text-white">{it.name}</td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    value={it.retail}
                    onChange={(e) => handlePriceChange(it.sku, 'retail', Number(e.target.value))}
                    className="w-28 px-2.5 py-1 rounded-lg bg-slate-950 border border-white/10 text-white font-bold"
                  />
                </td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    value={it.wholesale}
                    onChange={(e) => handlePriceChange(it.sku, 'wholesale', Number(e.target.value))}
                    className="w-28 px-2.5 py-1 rounded-lg bg-slate-950 border border-white/10 text-emerald-400 font-bold"
                  />
                </td>
                <td className="py-3 px-4 font-bold text-amber-300">{it.margin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ==============================================================================
 * 8. SSS (FAQ)
 * ============================================================================== */
const DEFAULT_FAQS = [
  { id: 1, question: 'Siparişim ne zaman kargoya verilir?', answer: 'Hafta içi saat 16:00\'a kadar verilen siparişler aynı gün anlaşmalı kargo ile ücretsiz yola çıkar.', category: 'Kargo & Teslimat' },
  { id: 2, question: 'İade ve değişim süreci nasıl işler?', answer: 'Ürünü teslim aldığınız tarihten itibaren 30 gün içinde koşulsuz ücretsiz iade edebilirsiniz.', category: 'İade' },
  { id: 3, question: 'litef Pro X kulaklık su geçirir mi?', answer: 'Evet, IPX5 suya ve tere dayanıklılık sertifikasına sahiptir. Yağmur altında ve sporda güvenle kullanabilirsiniz.', category: 'Ürün Özellikleri' },
];

export function FaqModule({ onShowToast }: ModuleProps) {
  const [faqs, setFaqs] = useState(DEFAULT_FAQS);
  const [qText, setQText] = useState('');
  const [aText, setAText] = useState('');
  const [cat, setCat] = useState('Genel');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFaqs(loadAdminData(ADMIN_STORAGE_KEYS.FAQS, DEFAULT_FAQS));
  }, []);

  const handleSave = (updated = faqs) => {
    saveAdminData(ADMIN_STORAGE_KEYS.FAQS, updated);
    setSavedSuccess(true);
    if (onShowToast) onShowToast('SSS listesi başarıyla kaydedildi!');
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim() || !aText.trim()) return;
    const updated = [
      ...faqs,
      { id: Date.now(), question: qText.trim(), answer: aText.trim(), category: cat },
    ];
    setFaqs(updated);
    handleSave(updated);
    setQText('');
    setAText('');
  };

  const handleDelete = (id: number) => {
    const updated = faqs.filter((f) => f.id !== id);
    setFaqs(updated);
    handleSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <span>Sıkça Sorulan Sorular (SSS)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Müşteri destek ve ürün sorularını düzenleyin.</p>
        </div>

        <button
          onClick={() => handleSave()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95 self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Kaydedildi!' : 'SSS Kaydet'}</span>
        </button>
      </div>

      <form onSubmit={handleAdd} className="p-4 rounded-2xl glass-panel space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            required
            placeholder="Soru (Örn: Garanti süresi ne kadar?)"
            value={qText}
            onChange={(e) => setQText(e.target.value)}
            className="sm:col-span-2 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="Genel">Genel</option>
            <option value="Kargo & Teslimat">Kargo &amp; Teslimat</option>
            <option value="İade">İade &amp; Değişim</option>
            <option value="Ürün Özellikleri">Ürün Özellikleri</option>
          </select>
        </div>
        <textarea
          required
          rows={2}
          placeholder="Cevap metnini buraya yazın..."
          value={aText}
          onChange={(e) => setAText(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button type="submit" className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> <span>Soru Ekle &amp; Kaydet</span>
        </button>
      </form>

      <div className="space-y-3">
        {faqs.map((f) => (
          <div key={f.id} className="p-4 rounded-2xl glass-panel space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                {f.category}
              </span>
              <button
                onClick={() => handleDelete(f.id)}
                className="text-slate-500 hover:text-red-400 p-1"
                title="Soruyu Sil"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <h4 className="text-xs font-bold text-white">{f.question}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{f.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==============================================================================
 * 9. DOSYA YÖNETİCİSİ (FILE MANAGER)
 * ============================================================================== */
const DEFAULT_FILES = [
  { id: 1, name: 'litef-pro-x-banner.webp', size: '240 KB', type: 'Görsel', date: '2026-09-18', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e' },
  { id: 2, name: 'aura-chrono-catalogue.pdf', size: '2.4 MB', type: 'PDF Doküman', date: '2026-09-19', url: '#' },
  { id: 3, name: 'vortex-vision-specsheet.pdf', size: '1.8 MB', type: 'PDF Doküman', date: '2026-09-20', url: '#' },
  { id: 4, name: 'brand-logo-white.svg', size: '18 KB', type: 'Vektör', date: '2026-09-15', url: '#' },
];

export function FileManagerModule({ onShowToast }: ModuleProps) {
  const [files, setFiles] = useState(DEFAULT_FILES);
  const [fileName, setFileName] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFiles(loadAdminData(ADMIN_STORAGE_KEYS.FILES, DEFAULT_FILES));
  }, []);

  const handleSave = (updated = files) => {
    saveAdminData(ADMIN_STORAGE_KEYS.FILES, updated);
    setSavedSuccess(true);
    if (onShowToast) onShowToast('Dosya listesi kaydedildi!');
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleUploadSim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;
    const updated = [
      ...files,
      { id: Date.now(), name: fileName.trim(), size: '1.2 MB', type: 'Medya', date: new Date().toISOString().split('T')[0], url: '#' },
    ];
    setFiles(updated);
    handleSave(updated);
    setFileName('');
  };

  const handleDelete = (id: number) => {
    const updated = files.filter((f) => f.id !== id);
    setFiles(updated);
    handleSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FolderArchive className="w-5 h-5 text-indigo-400" />
            <span>Medya ve Dosya Yöneticisi</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Ürün görselleri, PDF kataloglar ve broşürleri depolayın.</p>
        </div>

        <button
          onClick={() => handleSave()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95 self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Kaydedildi!' : 'Dosyaları Kaydet'}</span>
        </button>
      </div>

      <form onSubmit={handleUploadSim} className="p-4 rounded-2xl glass-panel flex gap-3">
        <input
          type="text"
          required
          placeholder="Dosya Adı (Örn: yeni-kulaklik-katalog.pdf)"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button type="submit" className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shrink-0 flex items-center gap-1.5">
          <FileUp className="w-4 h-4" /> <span>Dosya Ekle &amp; Kaydet</span>
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {files.map((fl) => (
          <div key={fl.id} className="glass-panel p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">{fl.type}</span>
              <button
                onClick={() => handleDelete(fl.id)}
                className="text-slate-500 hover:text-red-400 p-1"
                title="Dosyayı Sil"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <h4 className="text-xs font-bold text-white truncate">{fl.name}</h4>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
              <span>{fl.size}</span>
              <span>{fl.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==============================================================================
 * 10. KULLANICILAR (USERS)
 * ============================================================================== */
const DEFAULT_USERS = [
  { id: 1, name: 'Sistem Yöneticisi', email: 'admin@litef.com', role: 'Süper Admin', status: 'Aktif', lastLogin: 'Az önce' },
  { id: 2, name: 'Ferhat Tunal', email: 'ferhat@litef.com', role: 'Yönetici (Admin)', status: 'Aktif', lastLogin: '1 saat önce' },
  { id: 3, name: 'İçerik Editörü', email: 'editor@litef.com', role: 'Editör', status: 'Aktif', lastLogin: '1 gün önce' },
];

export function UsersModule({ onShowToast }: ModuleProps) {
  const [users, setUsers] = useState(DEFAULT_USERS);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Editör');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setUsers(loadAdminData(ADMIN_STORAGE_KEYS.USERS, DEFAULT_USERS));
  }, []);

  const handleSave = (updated = users) => {
    saveAdminData(ADMIN_STORAGE_KEYS.USERS, updated);
    setSavedSuccess(true);
    if (onShowToast) onShowToast('Kullanıcı listesi başarıyla kaydedildi!');
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    const updated = [
      ...users,
      { id: Date.now(), name: name.trim(), email: email.trim(), role, status: 'Aktif', lastLogin: 'Henüz Giriş Yapmadı' },
    ];
    setUsers(updated);
    handleSave(updated);
    setName('');
    setEmail('');
  };

  const handleDelete = (id: number) => {
    if (id === 1) return; // Süper admin silinemez
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    handleSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <span>Kullanıcı &amp; Rol Yönetimi</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Admin paneline erişim yetkisi olan yöneticileri denetleyin.</p>
        </div>

        <button
          onClick={() => handleSave()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95 self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Kaydedildi!' : 'Kullanıcıları Kaydet'}</span>
        </button>
      </div>

      <form onSubmit={handleAddUser} className="p-4 rounded-2xl glass-panel flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          required
          placeholder="Tam Ad (Örn: Caner Korkmaz)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <input
          type="email"
          required
          placeholder="E-Posta (Örn: caner@litef.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="Editör">Editör</option>
          <option value="Yönetici (Admin)">Yönetici (Admin)</option>
          <option value="Süper Admin">Süper Admin</option>
        </select>
        <button type="submit" className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shrink-0 flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> <span>Kullanıcı Ekle &amp; Kaydet</span>
        </button>
      </form>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 text-slate-400 border-b border-white/10">
            <tr>
              <th className="py-3 px-4 font-semibold">Kullanıcı</th>
              <th className="py-3 px-4 font-semibold">Rol</th>
              <th className="py-3 px-4 font-semibold">Durum</th>
              <th className="py-3 px-4 font-semibold">Son Giriş</th>
              <th className="py-3 px-4 font-semibold text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4">
                  <div className="font-bold text-white">{u.name}</div>
                  <div className="text-[11px] text-slate-400">{u.email}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-emerald-400 font-semibold">{u.status}</span>
                </td>
                <td className="py-3 px-4 text-slate-400">{u.lastLogin}</td>
                <td className="py-3 px-4 text-right">
                  {u.id !== 1 && (
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg transition-colors"
                      title="Kullanıcıyı Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ==============================================================================
 * 11. SİSTEM & MAĞAZA AYARLARI (SYSTEM SETTINGS)
 * ============================================================================== */
export function SystemSettingsModule({ onShowToast }: ModuleProps) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setSettings(loadAdminData(ADMIN_STORAGE_KEYS.SETTINGS, DEFAULT_SITE_SETTINGS));
  }, []);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    saveAdminData(ADMIN_STORAGE_KEYS.SETTINGS, settings);
    setSavedSuccess(true);
    if (onShowToast) onShowToast('Sistem ve mağaza ayarları kalıcı olarak kaydedildi!');
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-400" />
            <span>Sistem &amp; Mağaza Ayarları</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Site başlığı, duyuru metni, kupon kodları ve genel mağaza tercihlerini yapılandırın.</p>
        </div>

        <button
          onClick={() => handleSave()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95 self-start sm:self-auto"
        >
          {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Başarıyla Kaydedildi!' : 'Tüm Ayarları Kaydet'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Mağaza Kimliği */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>Mağaza Kimliği &amp; Başlıklar</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Site Başlığı (Title)</label>
              <input
                type="text"
                value={settings.siteTitle}
                onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mağaza Sloganı</label>
              <input
                type="text"
                value={settings.slogan}
                onChange={(e) => setSettings({ ...settings, slogan: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* 2. Kampanya & Duyuru Bandı */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-400" />
            <span>Üst Duyuru Bandı &amp; İndirim Kuponu</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Duyuru Bandı Metni (Header Üstü)</label>
              <input
                type="text"
                value={settings.bannerText}
                onChange={(e) => setSettings({ ...settings, bannerText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Aktif Lansman Kuponu</label>
                <input
                  type="text"
                  value={settings.couponCode}
                  onChange={(e) => setSettings({ ...settings, couponCode: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-amber-300 font-mono font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Ücretsiz Kargo Alt Limiti (TL)</label>
                <input
                  type="number"
                  value={settings.freeShippingLimit}
                  onChange={(e) => setSettings({ ...settings, freeShippingLimit: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. İletişim & Bakım */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>İletişim &amp; Sistem Durumu</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Destek E-Postası</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Müşteri Destek Telefonu</label>
              <input
                type="text"
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white">Bakım Modu</h4>
              <p className="text-[11px] text-slate-400">Aktif edildiğinde sadece yöneticiler siteye erişebilir.</p>
            </div>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                settings.maintenanceMode ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {settings.maintenanceMode ? 'Açık (Bakımda)' : 'Kapalı (Yayında)'}
            </button>
          </div>
        </div>

        {/* Kaydet Butonu */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Tüm Sistem Ayarlarını Kaydet</span>
          </button>
        </div>
      </form>
    </div>
  );
}
