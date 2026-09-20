'use client';

import { useState } from 'react';
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
  Copy, 
  Download, 
  Eye, 
  Sliders, 
  Sparkles, 
  FileUp, 
  ShieldCheck, 
  X,
  Send,
  ExternalLink
} from 'lucide-react';

/* ==============================================================================
 * 1. MENÜLER YÖNETİMİ (MENUS)
 * ============================================================================== */
export function MenusModule() {
  const [menus, setMenus] = useState([
    { id: 1, title: 'Koleksiyon & Ürünler', url: '#katalog', location: 'Header & Mobil', active: true },
    { id: 2, title: 'Lansman Fırsatı', url: '#kampanya', location: 'Header & Mobil', active: true },
    { id: 3, title: 'Müşteri İncelemeleri', url: '#incelemeler', location: 'Header & Mobil', active: true },
    { id: 4, title: 'Hakkımızda', url: '#katalog', location: 'Footer', active: true },
    { id: 5, title: 'Gizlilik Politikası', url: '#', location: 'Footer', active: true },
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newLocation, setNewLocation] = useState('Header');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setMenus((prev) => [
      ...prev,
      { id: Date.now(), title: newTitle.trim(), url: newUrl.trim() || '#', location: newLocation, active: true },
    ]);
    setNewTitle('');
    setNewUrl('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Menü &amp; Navigasyon Yönetimi</h2>
        <p className="text-xs text-slate-400 mt-0.5">Üst bilgi (Header), alt bilgi (Footer) ve mobil menü bağlantılarını düzenleyin.</p>
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
          <Plus className="w-4 h-4" /> <span>Ekle</span>
        </button>
      </form>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 text-slate-400 border-b border-white/10">
            <tr>
              <th className="py-3 px-4 font-semibold">Menü Başlığı</th>
              <th className="py-3 px-4 font-semibold">URL Hedefi</th>
              <th className="py-3 px-4 font-semibold">Konum</th>
              <th className="py-3 px-4 font-semibold text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {menus.map((m) => (
              <tr key={m.id} className="hover:bg-slate-800/40">
                <td className="py-3 px-4 font-semibold text-white">{m.title}</td>
                <td className="py-3 px-4 font-mono text-indigo-400">{m.url}</td>
                <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">{m.location}</span></td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => setMenus(menus.filter(item => item.id !== m.id))} className="p-1.5 rounded-lg text-slate-500 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
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
 * 2. LANDING SAYFALAR (LANDING PAGES)
 * ============================================================================== */
export function LandingPagesModule() {
  const [pages, setPages] = useState([
    { id: 1, title: 'litef Pro X Resmi Lansmanı', slug: '/lansman-litef-pro', visits: 1240, status: 'Yayında', date: '2026-09-15' },
    { id: 2, title: 'Sonbahar Teknoloji Fırsatları', slug: '/kampanya-sonbahar', visits: 850, status: 'Yayında', date: '2026-09-18' },
    { id: 3, title: 'Aura Chrono Ön Sipariş Sayfası', slug: '/on-siparis-aura', visits: 410, status: 'Taslak', date: '2026-09-20' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Özel Landing Sayfaları</h2>
          <p className="text-xs text-slate-400 mt-0.5">Ürün lansmanları, kampanyalar ve Google/Meta reklam açılış sayfaları.</p>
        </div>
        <button 
          onClick={() => {
            const title = prompt('Yeni Landing Sayfa Başlığı:');
            if (title) {
              setPages(prev => [...prev, { id: Date.now(), title, slug: `/${title.toLowerCase().replace(/ /g, '-')}`, visits: 0, status: 'Taslak', date: new Date().toISOString().split('T')[0] }]);
            }
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" /> <span>Yeni Landing Sayfa</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pages.map((p) => (
          <div key={p.id} className="glass-panel-interactive rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.status === 'Yayında' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-300'}`}>
                {p.status}
              </span>
              <span className="text-[11px] text-slate-400">{p.visits} Ziyaret</span>
            </div>
            <h3 className="text-sm font-bold text-white">{p.title}</h3>
            <p className="text-xs text-indigo-400 font-mono">{p.slug}</p>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>Tarih: {p.date}</span>
              <button onClick={() => setPages(pages.filter(item => item.id !== p.id))} className="text-red-400 hover:underline">Sil</button>
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
export function PageLayoutModule() {
  const [sections, setSections] = useState([
    { id: 'hero', name: 'Amiral Gemisi Lansman Bölümü (Hero)', active: true, order: 1 },
    { id: 'campaign', name: 'Geri Sayımlı İndirim Bandı', active: true, order: 2 },
    { id: 'catalog', name: 'Öne Çıkan Ürün Koleksiyonu & Filtreler', active: true, order: 3 },
    { id: 'reviews', name: 'Müşteri Değerlendirmeleri & İncelemeler', active: true, order: 4 },
    { id: 'newsletter', name: 'E-Bülten & Footer İndirim Formu', active: true, order: 5 },
  ]);

  const toggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Ana Sayfa Blok Düzeni</h2>
        <p className="text-xs text-slate-400 mt-0.5">Vitrindeki bölümleri aktif/pasif yapın veya sayfa akışını kontrol edin.</p>
      </div>

      <div className="glass-panel rounded-2xl p-5 space-y-3">
        {sections.map((sec, idx) => (
          <div key={sec.id} className="p-4 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-lg bg-slate-800 text-indigo-400 text-xs font-bold flex items-center justify-center">
                {idx + 1}
              </span>
              <div>
                <h4 className="text-xs font-bold text-white">{sec.name}</h4>
                <p className="text-[10px] text-slate-500 font-mono">Bileşen Kimliği: {sec.id}</p>
              </div>
            </div>

            <button
              onClick={() => toggleSection(sec.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                sec.active
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border border-white/5'
              }`}
            >
              {sec.active ? 'Aktif (Yayında)' : 'Pasif (Gizli)'}
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
export function ModuleBuilderModule() {
  const [modules, setModules] = useState([
    { id: 1, name: 'Lansman Üst Duyuru Çubuğu', type: 'Duyuru Bandı', position: 'Header Üstü', active: true },
    { id: 2, name: 'İlk Ziyaretçiye %10 Kupon Pop-Up', type: 'Modal Pop-Up', position: 'Açılışta', active: true },
    { id: 3, name: 'Canlı WhatsApp Sipariş Hattı', type: 'Yüzen Buton', position: 'Sağ Alt', active: false },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Dinamik Modül Oluşturucu</h2>
          <p className="text-xs text-slate-400 mt-0.5">Siteye kod yazmadan yeni duyuru bantları, pop-up pencereleri ve etkileşimli widget&apos;lar ekleyin.</p>
        </div>
        <button 
          onClick={() => {
            const name = prompt('Modül Adı:');
            if (name) {
              setModules(prev => [...prev, { id: Date.now(), name, type: 'Özel Widget', position: 'Ana Sayfa', active: true }]);
            }
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" /> <span>Yeni Modül Oluştur</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modules.map((m) => (
          <div key={m.id} className="glass-panel-interactive rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">{m.type}</span>
              <span className={`text-[10px] font-bold ${m.active ? 'text-emerald-400' : 'text-slate-500'}`}>{m.active ? 'Aktif' : 'Devre Dışı'}</span>
            </div>
            <h3 className="text-sm font-bold text-white">{m.name}</h3>
            <p className="text-xs text-slate-400">Konum: {m.position}</p>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <button 
                onClick={() => setModules(modules.map(item => item.id === m.id ? { ...item, active: !item.active } : item))}
                className="text-xs text-indigo-400 hover:underline"
              >
                {m.active ? 'Kapat' : 'Aktifleştir'}
              </button>
              <button onClick={() => setModules(modules.filter(item => item.id !== m.id))} className="text-xs text-red-400 hover:underline">Sil</button>
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
export function CategoriesModule() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Kulaklık & Ses', slug: 'kulaklik-ses', count: 12, color: '#6366f1' },
    { id: 2, name: 'Akıllı Saatler', slug: 'akilli-saatler', count: 8, color: '#06b6d4' },
    { id: 3, name: 'Giyilebilir Teknoloji', slug: 'giyilebilir-teknoloji', count: 5, color: '#10b981' },
    { id: 4, name: 'Aksesuarlar', slug: 'aksesuarlar', count: 16, color: '#f59e0b' },
  ]);
  const [newCat, setNewCat] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.trim()) return;
    setCategories((prev) => [
      ...prev,
      { id: Date.now(), name: newCat.trim(), slug: newCat.toLowerCase().replace(/ /g, '-'), count: 0, color: '#8b5cf6' },
    ]);
    setNewCat('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Kategori Yönetimi</h2>
        <p className="text-xs text-slate-400 mt-0.5">Ürünlerin listelendiği ana ve alt kategorileri düzenleyin.</p>
      </div>

      <form onSubmit={handleAdd} className="flex gap-3 max-w-md">
        <input
          type="text"
          required
          placeholder="Yeni Kategori Adı (Örn: Akıllı Ev)"
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button type="submit" className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shrink-0 flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> <span>Ekle</span>
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((c) => (
          <div key={c.id} className="glass-panel-interactive rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
              <button onClick={() => setCategories(categories.filter(item => item.id !== c.id))} className="text-slate-500 hover:text-red-400">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{c.name}</h3>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">/{c.slug}</p>
            </div>
            <div className="pt-2 border-t border-white/10 text-xs text-slate-400 flex justify-between">
              <span>Bağlı Ürünler:</span>
              <span className="font-bold text-white">{c.count} adet</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==============================================================================
 * 6. TEKLİF TALEPLERİ (QUOTE REQUESTS / RFQ)
 * ============================================================================== */
export function QuotesModule() {
  const [quotes, setQuotes] = useState([
    { id: 'T-101', company: 'Atlas Bilişim A.Ş.', contact: 'Ahmet Yılmaz', email: 'ahmet@atlasbilisim.com', phone: '0532 555 0192', product: 'litef Pro X (50 Adet)', budget: '150.000 TL', status: 'Yeni' },
    { id: 'T-102', company: 'Teknoloji Vadisi Ltd.', contact: 'Canan Demir', email: 'canan@tekno.com', phone: '0544 222 9011', product: 'Aura Chrono (20 Adet)', budget: '90.000 TL', status: 'İnceleniyor' },
    { id: 'T-103', company: 'Global Çözümler', contact: 'Serdar Kaya', email: 'serdar@global.com', phone: '0555 111 4433', product: 'Vortex XR Gözlük (10 Adet)', budget: '120.000 TL', status: 'Teklif Verildi' },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Teklif ve Toptan Satış Talepleri</h2>
        <p className="text-xs text-slate-400 mt-0.5">Kurumsal müşterilerden gelen toplu alım ve fiyat teklifi formları.</p>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 text-slate-400 border-b border-white/10">
            <tr>
              <th className="py-3.5 px-4 font-semibold">Firma / Yetkili</th>
              <th className="py-3.5 px-4 font-semibold">Talep Edilen Ürün</th>
              <th className="py-3.5 px-4 font-semibold">Bütçe</th>
              <th className="py-3.5 px-4 font-semibold">İletişim</th>
              <th className="py-3.5 px-4 font-semibold">Durum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {quotes.map((q) => (
              <tr key={q.id} className="hover:bg-slate-800/40">
                <td className="py-3 px-4">
                  <p className="font-bold text-white">{q.company}</p>
                  <p className="text-[11px] text-slate-400">{q.contact}</p>
                </td>
                <td className="py-3 px-4 text-indigo-300 font-semibold">{q.product}</td>
                <td className="py-3 px-4 font-mono font-bold text-white">{q.budget}</td>
                <td className="py-3 px-4 text-[11px] text-slate-400">
                  <p>{q.email}</p>
                  <p>{q.phone}</p>
                </td>
                <td className="py-3 px-4">
                  <select
                    value={q.status}
                    onChange={(e) => updateStatus(q.id, e.target.value)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-[11px] text-slate-200 focus:outline-none focus:border-indigo-500"
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
export function PriceListModule() {
  const [items] = useState([
    { sku: 'LTF-01', name: 'litef Pro X Wireless', retail: 3499, wholesale: 2650, margin: '%32' },
    { sku: 'AUR-02', name: 'Aura Chrono Ultra', retail: 4999, wholesale: 3800, margin: '%31' },
    { sku: 'VRX-03', name: 'Vortex Vision XR', retail: 12899, wholesale: 9900, margin: '%30' },
    { sku: 'SNC-04', name: 'SonicPulse Studio', retail: 2199, wholesale: 1650, margin: '%33' },
  ]);

  const handleExport = () => {
    const csv = 'SKU,Urun,Perakende_Fiyat,Toptan_Fiyat,Kar_Marji\n' + items.map(i => `${i.sku},${i.name},${i.retail},${i.wholesale},${i.margin}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fiyat-listesi.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Fiyat ve İskonto Listesi</h2>
          <p className="text-xs text-slate-400 mt-0.5">Toptan, perakende ve bayi kâr marjları matrisi.</p>
        </div>
        <button onClick={handleExport} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all">
          <Download className="w-4 h-4" /> <span>Fiyat Listesini İndir (.CSV)</span>
        </button>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 text-slate-400 border-b border-white/10">
            <tr>
              <th className="py-3.5 px-4 font-semibold">SKU Kodu</th>
              <th className="py-3.5 px-4 font-semibold">Ürün Adı</th>
              <th className="py-3.5 px-4 font-semibold">Perakende Fiyat</th>
              <th className="py-3.5 px-4 font-semibold">Toptan / Bayi</th>
              <th className="py-3.5 px-4 font-semibold">Brüt Kâr Marjı</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {items.map((i) => (
              <tr key={i.sku} className="hover:bg-slate-800/40">
                <td className="py-3 px-4 font-mono text-slate-400">{i.sku}</td>
                <td className="py-3 px-4 font-bold text-white">{i.name}</td>
                <td className="py-3 px-4 font-bold text-emerald-400">{i.retail.toLocaleString('tr-TR')} TL</td>
                <td className="py-3 px-4 text-slate-300">{i.wholesale.toLocaleString('tr-TR')} TL</td>
                <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">{i.margin}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ==============================================================================
 * 8. SSS YÖNETİMİ (FAQ)
 * ============================================================================== */
export function FaqModule() {
  const [faqs, setFaqs] = useState([
    { id: 1, question: 'Siparişim ne zaman kargoya verilir?', answer: 'Hafta içi saat 16:00\'a kadar verilen siparişler aynı gün anlaşmalı kargo ile ücretsiz yola çıkar.', category: 'Kargo & Teslimat' },
    { id: 2, question: 'İade ve değişim süreci nasıl işler?', answer: 'Ürünü teslim aldığınız tarihten itibaren 30 gün içinde koşulsuz ücretsiz iade edebilirsiniz.', category: 'İade' },
    { id: 3, question: 'litef Pro X kulaklık su geçirir mi?', answer: 'Evet, IPX5 suya ve tere dayanıklılık sertifikasına sahiptir. Yağmur altında ve sporda güvenle kullanabilirsiniz.', category: 'Ürün Özellikleri' },
  ]);
  const [qText, setQText] = useState('');
  const [aText, setAText] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim() || !aText.trim()) return;
    setFaqs((prev) => [...prev, { id: Date.now(), question: qText.trim(), answer: aText.trim(), category: 'Genel' }]);
    setQText('');
    setAText('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Sıkça Sorulan Sorular (SSS)</h2>
        <p className="text-xs text-slate-400 mt-0.5">Müşteri destek sayfasında ve ürün detaylarında gösterilen sorular.</p>
      </div>

      <form onSubmit={handleAdd} className="p-5 rounded-2xl glass-panel space-y-3">
        <input
          type="text"
          required
          placeholder="Soru Başlığı (Örn: Taksit seçenekleri nelerdir?)"
          value={qText}
          onChange={(e) => setQText(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <textarea
          rows={2}
          required
          placeholder="Cevap metni..."
          value={aText}
          onChange={(e) => setAText(e.target.value)}
          className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
        />
        <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> <span>Yeni Soru Ekle</span>
        </button>
      </form>

      <div className="space-y-3">
        {faqs.map((f) => (
          <div key={f.id} className="glass-panel rounded-2xl p-4 flex justify-between items-start gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-indigo-400 font-semibold">{f.category}</span>
              <h4 className="text-xs font-bold text-white">{f.question}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{f.answer}</p>
            </div>
            <button onClick={() => setFaqs(faqs.filter(item => item.id !== f.id))} className="text-slate-500 hover:text-red-400">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==============================================================================
 * 9. DOSYA YÖNETİCİSİ (FILE MANAGER)
 * ============================================================================== */
export function FileManagerModule() {
  const [files, setFiles] = useState([
    { id: 1, name: 'litef-pro-x-banner.webp', size: '240 KB', type: 'Görsel', date: '2026-09-18', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e' },
    { id: 2, name: 'aura-chrono-catalogue.pdf', size: '2.4 MB', type: 'PDF Doküman', date: '2026-09-19', url: '#' },
    { id: 3, name: 'vortex-vision-specsheet.pdf', size: '1.8 MB', type: 'PDF Doküman', date: '2026-09-20', url: '#' },
    { id: 4, name: 'brand-logo-white.svg', size: '18 KB', type: 'Vektör', date: '2026-09-15', url: '#' },
  ]);

  const handleUpload = () => {
    const name = prompt('Yüklenecek Dosya Adı:');
    if (name) {
      setFiles(prev => [...prev, { id: Date.now(), name, size: '850 KB', type: 'Medya', date: new Date().toISOString().split('T')[0], url: '#' }]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Medya &amp; Dosya Yöneticisi</h2>
          <p className="text-xs text-slate-400 mt-0.5">Ürün görselleri, teknik kataloglar ve PDF doküman kütüphanesi.</p>
        </div>
        <button onClick={handleUpload} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all">
          <FileUp className="w-4 h-4" /> <span>Yeni Dosya Yükle</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {files.map((f) => (
          <div key={f.id} className="glass-panel-interactive rounded-2xl p-4 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">{f.type}</span>
              <button onClick={() => setFiles(files.filter(item => item.id !== f.id))} className="text-slate-500 hover:text-red-400">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white truncate" title={f.name}>{f.name}</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">{f.size} &bull; {f.date}</p>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(f.url);
                alert('Dosya bağlantısı kopyalandı!');
              }}
              className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <Copy className="w-3 h-3" /> <span>URL&apos;yi Kopyala</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==============================================================================
 * 10. KULLANICILAR (USERS / TEAM)
 * ============================================================================== */
export function UsersModule() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Sistem Yöneticisi', email: 'admin@litef.com', role: 'Süper Admin', status: 'Aktif', lastLogin: 'Az önce' },
    { id: 2, name: 'Ferhat Tunal', email: 'ferhat@litef.com', role: 'Yönetici (Admin)', status: 'Aktif', lastLogin: '1 saat önce' },
    { id: 3, name: 'İçerik Editörü', email: 'editor@litef.com', role: 'Editör', status: 'Aktif', lastLogin: '1 gün önce' },
  ]);

  const handleAddUser = () => {
    const name = prompt('Yetkili Adı Soyadı:');
    const email = prompt('E-Posta Adresi:');
    if (name && email) {
      setUsers(prev => [...prev, { id: Date.now(), name, email, role: 'Editör', status: 'Aktif', lastLogin: 'Henüz girmedi' }]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Yönetici &amp; Personel Hesapları</h2>
          <p className="text-xs text-slate-400 mt-0.5">Admin paneline erişim yetkisi olan yöneticiler ve roller.</p>
        </div>
        <button onClick={handleAddUser} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all">
          <Plus className="w-4 h-4" /> <span>Yeni Yönetici Ekle</span>
        </button>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 text-slate-400 border-b border-white/10">
            <tr>
              <th className="py-3.5 px-4 font-semibold">Ad Soyad</th>
              <th className="py-3.5 px-4 font-semibold">E-Posta</th>
              <th className="py-3.5 px-4 font-semibold">Rol</th>
              <th className="py-3.5 px-4 font-semibold">Durum</th>
              <th className="py-3.5 px-4 font-semibold">Son Giriş</th>
              <th className="py-3.5 px-4 font-semibold text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-800/40">
                <td className="py-3 px-4 font-bold text-white">{u.name}</td>
                <td className="py-3 px-4 font-mono text-slate-400">{u.email}</td>
                <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold text-[10px]">{u.role}</span></td>
                <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold">● {u.status}</span></td>
                <td className="py-3 px-4 text-slate-400">{u.lastLogin}</td>
                <td className="py-3 px-4 text-right">
                  {u.id !== 1 && (
                    <button onClick={() => setUsers(users.filter(item => item.id !== u.id))} className="text-slate-500 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
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
