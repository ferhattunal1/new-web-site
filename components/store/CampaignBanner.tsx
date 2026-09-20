'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Copy, Check, ArrowRight } from 'lucide-react';

interface CampaignBannerProps {
  onShopClick: () => void;
}

export function CampaignBanner({ onShopClick }: CampaignBannerProps) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 38,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('LITEF15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="kampanya" className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 shadow-xl">
          {/* Background Glow Effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            {/* Offer details */}
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>litef Lansmana Özel İndirim</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Sepette Anında <span className="text-indigo-400">%15 Ekstra İndirim</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tüm litef amiral gemisi cihazlarda ve aksesuarlarda geçerli kupon koduyla avantajı yakalayın. Ücretsiz sigortalı kargo dahildir.
              </p>
            </div>

            {/* Countdown & Coupon Box */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Countdown Digits */}
              <div className="flex items-center gap-2">
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-white/10 min-w-[62px] text-center shadow-md">
                  <span className="text-xl sm:text-2xl font-black text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <p className="text-[10px] text-slate-400 font-medium">Saat</p>
                </div>
                <span className="text-slate-500 font-bold">:</span>
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-white/10 min-w-[62px] text-center shadow-md">
                  <span className="text-xl sm:text-2xl font-black text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <p className="text-[10px] text-slate-400 font-medium">Dakika</p>
                </div>
                <span className="text-slate-500 font-bold">:</span>
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-white/10 min-w-[62px] text-center shadow-md">
                  <span className="text-xl sm:text-2xl font-black text-indigo-400">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <p className="text-[10px] text-slate-400 font-medium">Saniye</p>
                </div>
              </div>

              {/* Coupon Copy Button */}
              <div className="flex items-center gap-2 bg-black/40 border border-white/15 p-2 rounded-2xl backdrop-blur-md">
                <span className="font-mono text-sm font-bold text-amber-300 px-3 tracking-wider">LITEF15</span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md active:scale-95 touch-manipulation min-h-[44px]"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
