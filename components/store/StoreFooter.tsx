'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Send, 
  ExternalLink,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export function StoreFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-14 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Value Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-12 border-b border-slate-100">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f6f7f9] border border-slate-200/60">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Aynı Gün Ücretsiz Kargo</h4>
              <p className="text-xs text-slate-500">Saat 16:00'ya kadar olan siparişlerinizde</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f6f7f9] border border-slate-200/60">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">2 Yıl litef Resmi Garanti</h4>
              <p className="text-xs text-slate-500">Birebir değişim ve teknik destek güvencesi</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f6f7f9] border border-slate-200/60">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">14 Gün Koşulsuz İade</h4>
              <p className="text-xs text-slate-500">Hızlı ve şeffaf iade & değişim süreci</p>
            </div>
          </div>
        </div>

        {/* Newsletter Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-100 items-center">
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-slate-900">litef<span className="text-indigo-600">.</span></span>
              <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">Bülten</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Özel Lansmanlardan ve Fırsatlardan Haberdar Olun
            </h3>
            <p className="text-xs text-slate-500">
              litef serisi yeni teknoloji duyuruları ve stok güncellemeleri ilk size gelsin.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresinizi girin..."
                className="w-full px-4 py-3 rounded-2xl bg-[#f6f7f9] border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shrink-0 transition-all flex items-center gap-1.5 shadow-sm active:scale-95 touch-manipulation min-h-[44px]"
              >
                <span>Abone Ol</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-emerald-600 font-semibold mt-2">
                ✓ Teşekkürler! %10 ilk sipariş indirim kuponunuz e-postanıza gönderildi.
              </p>
            )}
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900">Koleksiyon</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#katalog" className="hover:text-slate-900 transition-colors">litef Pro X Wireless</a></li>
              <li><a href="#katalog" className="hover:text-slate-900 transition-colors">litef SmartWatch Ultra</a></li>
              <li><a href="#katalog" className="hover:text-slate-900 transition-colors">litef MagCharge Pad</a></li>
              <li><a href="#katalog" className="hover:text-slate-900 transition-colors">litef Pure Buds ANC</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900">Müşteri Desteği</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#kampanya" className="hover:text-slate-900 transition-colors">Sipariş Takibi</a></li>
              <li><a href="#kampanya" className="hover:text-slate-900 transition-colors">İade &amp; Değişim</a></li>
              <li><a href="#kampanya" className="hover:text-slate-900 transition-colors">Garanti Şartları</a></li>
              <li><a href="#kampanya" className="hover:text-slate-900 transition-colors">Sıkça Sorulan Sorular</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900">Kurumsal</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#katalog" className="hover:text-slate-900 transition-colors">Hakkımızda</a></li>
              <li><a href="#katalog" className="hover:text-slate-900 transition-colors">Vizyonumuz</a></li>
              <li><a href="#katalog" className="hover:text-slate-900 transition-colors">Kariyer</a></li>
              <li><a href="#katalog" className="hover:text-slate-900 transition-colors">İletişim</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900">Yönetim &amp; Güvenlik</h4>
            <ul className="space-y-2 text-slate-500">
              <li>
                <Link href="/admin" className="text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1 font-semibold">
                  <span>Yönetici Paneli (litef Admin)</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li><span className="text-slate-400">256-Bit SSL Koruma</span></li>
              <li><span className="text-slate-400">Supabase PostgreSQL</span></li>
              <li><span className="text-slate-400">Vercel Global Edge CDN</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 litef Technologies A.Ş. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-3">
            <span>Gizlilik Politikası</span>
            <span>&bull;</span>
            <span>Kullanım Koşulları</span>
            <span>&bull;</span>
            <span>KVKK Aydınlatma Metni</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
