'use client';

import { 
  Sparkles, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star, 
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
    <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Decorative Gradient Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-cyan-500/15 to-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Specs & Call-to-Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>2026 Yeni Nesil Seri &bull; Resmi Lansman</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Kusursuz Ses.<br />
              <span className="gradient-brand">Nova Pro X</span> Wireless.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Uzamsal ses mimarisi, -45dB hibrit aktif gürültü engelleme ve 48 saat kesintisiz pil ömrü ile saf müzik deneyimine adım atın.
            </p>

            {/* Price Box */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {flagshipProduct.price.toLocaleString('tr-TR')} TL
                </span>
                {flagshipProduct.original_price && (
                  <span className="text-lg text-slate-500 line-through">
                    {flagshipProduct.original_price.toLocaleString('tr-TR')} TL
                  </span>
                )}
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                Lansmana Özel %28 Tasarruf
              </span>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => onAddToCart(flagshipProduct)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Hemen Sepete Ekle</span>
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-white/10 font-semibold text-sm transition-all"
              >
                <span>Tüm Kataloğu İncele</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-slate-400 text-xs">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Truck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Aynı Gün Kargo</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>2 Yıl Garanti</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <RotateCcw className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>30 Gün İade</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Glass Spec Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Visual Container */}
            <div className="relative w-full max-w-md aspect-square rounded-3xl p-6 glass-panel border border-white/10 flex items-center justify-center shadow-2xl group">
              {/* Product Image */}
              <img
                src={flagshipProduct.image_url}
                alt={flagshipProduct.name}
                className="w-full h-full object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-105"
              />

              {/* Floating Spec Badge 1 */}
              <div className="absolute -top-3 -left-3 glass-panel-interactive px-3.5 py-2 rounded-xl border border-white/10 shadow-lg flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Pil Ömrü</p>
                  <p className="text-xs font-bold text-white">48 Saat Kesintisiz</p>
                </div>
              </div>

              {/* Floating Spec Badge 2 */}
              <div className="absolute -bottom-3 -right-3 glass-panel-interactive px-3.5 py-2 rounded-xl border border-white/10 shadow-lg flex items-center gap-2">
                <Headphones className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Akustik Sürücü</p>
                  <p className="text-xs font-bold text-white">40mm Titanyum</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
