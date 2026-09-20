'use client';

import { 
  Sparkles, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Zap, 
  Headphones 
} from 'lucide-react';
import { Product } from '@/types/database';

interface HeroLaunchProps {
  flagshipProduct: Product;
  onAddToCart: (product: Product) => void;
  onExploreClick: () => void;
}

export function HeroLaunch({ flagshipProduct, onAddToCart, onExploreClick }: HeroLaunchProps) {
  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-[#f6f7f9]">
      {/* Background Soft Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-indigo-100/60 via-purple-50/40 to-cyan-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-indigo-700 text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>litef 2026 Serisi &bull; Resmi Lansman</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Saf Ses Deneyimi.<br />
              <span className="text-indigo-600">litef Pro X</span> Wireless.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Uzamsal ses mimarisi, -45dB hibrit aktif gürültü engelleme ve 48 saat kesintisiz pil ömrü ile sesin geleceği kulaklarınızda.
            </p>

            {/* Price Box */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">
                  {flagshipProduct.price.toLocaleString('tr-TR')} TL
                </span>
                {flagshipProduct.original_price && (
                  <span className="text-lg text-slate-400 line-through">
                    {flagshipProduct.original_price.toLocaleString('tr-TR')} TL
                  </span>
                )}
              </div>
              <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black uppercase tracking-wider">
                Lansmana Özel %28 İndirim
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => onAddToCart(flagshipProduct)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Hemen Sepete Ekle</span>
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-bold text-sm shadow-sm transition-all"
              >
                <span>Tüm Cihazları İncele</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-slate-600 text-xs font-semibold">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Aynı Gün Kargo</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>2 Yıl Garanti</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <RotateCcw className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>30 Gün İade</span>
              </div>
            </div>
          </div>

          {/* Right: Product Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl p-6 bg-white border border-slate-200/80 shadow-2xl flex items-center justify-center group">
              <img
                src={flagshipProduct.image_url}
                alt={flagshipProduct.name}
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
              />

              {/* Floating Spec 1 */}
              <div className="absolute -top-3 -left-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-2.5">
                <div className="p-1.5 rounded-xl bg-amber-50 text-amber-600">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-semibold">Batarya</p>
                  <p className="text-xs font-black text-slate-900">48 Saat Kesintisiz</p>
                </div>
              </div>

              {/* Floating Spec 2 */}
              <div className="absolute -bottom-3 -right-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-2.5">
                <div className="p-1.5 rounded-xl bg-indigo-50 text-indigo-600">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-semibold">Akustik Sürücü</p>
                  <p className="text-xs font-black text-slate-900">40mm Titanyum</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
