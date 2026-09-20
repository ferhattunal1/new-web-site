'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Send, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CreditCard,
  Lock,
  ExternalLink
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
    <footer className="border-t border-white/10 bg-[#070a12] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top: Newsletter & Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10 items-center">
          <div className="lg:col-span-6 space-y-2">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Gelişmelerden ve Özel Lansmanlardan Haberdar Olun
            </h3>
            <p className="text-xs text-slate-400">
              Yeni nesil ürün indirimleri ve stok güncellemeleri ilk size gelsin.
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
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shrink-0 transition-all flex items-center gap-1.5"
              >
                <span>Abone Ol</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-emerald-400 font-semibold mt-2 animate-fade-in">
                ✓ Teşekkürler! %10 ilk sipariş indirim kuponunuz e-posta adresinize gönderildi.
              </p>
            )}
          </div>
        </div>

        {/* Middle: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          <div className="space-y-3">
            <h4 className="font-bold text-white">Koleksiyon</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#katalog" className="hover:text-white transition-colors">Kulaklık &amp; Ses</a></li>
              <li><a href="#katalog" className="hover:text-white transition-colors">Akıllı Saatler</a></li>
              <li><a href="#katalog" className="hover:text-white transition-colors">Giyilebilir Teknoloji</a></li>
              <li><a href="#katalog" className="hover:text-white transition-colors">Aksesuarlar</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white">Müşteri Desteği</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#kampanya" className="hover:text-white transition-colors">Sipariş Takibi</a></li>
              <li><a href="#kampanya" className="hover:text-white transition-colors">İade &amp; Değişim</a></li>
              <li><a href="#kampanya" className="hover:text-white transition-colors">Garanti Şartları</a></li>
              <li><a href="#kampanya" className="hover:text-white transition-colors">Sıkça Sorulan Sorular</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white">Kurumsal</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#katalog" className="hover:text-white transition-colors">Hakkımızda</a></li>
              <li><a href="#katalog" className="hover:text-white transition-colors">Vizyonumuz</a></li>
              <li><a href="#katalog" className="hover:text-white transition-colors">Kariyer</a></li>
              <li><a href="#katalog" className="hover:text-white transition-colors">İletişim</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white">Yönetim &amp; Güvenlik</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/admin" className="text-amber-400 hover:underline flex items-center gap-1 font-semibold">
                  <span>Yönetici Paneli (Admin)</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li><span className="text-slate-500">256-Bit SSL Koruma</span></li>
              <li><span className="text-slate-500">Supabase PostgreSQL</span></li>
              <li><span className="text-slate-500">Vercel Global Edge CDN</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 NovaStore Technologies. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-3">
            <span>Gizlilik Politikası</span>
            <span>&bull;</span>
            <span>Kullanım Koşulları</span>
            <span>&bull;</span>
            <span>KVKK</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
