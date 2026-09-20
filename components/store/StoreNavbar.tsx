'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ShieldAlert, 
  Sparkles,
  Zap
} from 'lucide-react';

interface StoreNavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToCatalog: () => void;
  onScrollToCampaign: () => void;
  onScrollToReviews: () => void;
}

export function StoreNavbar({
  cartCount,
  onOpenCart,
  onScrollToCatalog,
  onScrollToCampaign,
  onScrollToReviews,
}: StoreNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090d16]/85 backdrop-blur-2xl transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-purple-950 border-b border-indigo-500/20 py-1.5 px-4 text-center text-[11px] text-indigo-200 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span>Lansmana Özel: <b>NOVALAUNCH</b> kodu ile tüm ürünlerde sepette anında %15 indirim &amp; Ücretsiz Kargo!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#090d16] rounded-2xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-indigo-400 group-hover:text-cyan-400 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Nova<span className="gradient-brand">Store</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 uppercase">
                  2026
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Yeni Nesil Teknoloji &amp; Lansman</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={onScrollToCatalog}
              className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Koleksiyon &amp; Ürünler
            </button>
            <button
              onClick={onScrollToCampaign}
              className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Lansman Fırsatı
            </button>
            <button
              onClick={onScrollToReviews}
              className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Müşteri İncelemeleri
            </button>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Yönetim (Admin)</span>
            </Link>
          </nav>

          {/* Right Action Icons: Cart & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Cart Trigger Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-white transition-all active:scale-95 shadow-sm"
              aria-label="Sepeti Aç"
            >
              <ShoppingBag className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold hidden sm:inline">Sepetim</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 border border-white/5 md:hidden"
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0c1220]/95 backdrop-blur-2xl px-5 py-4 space-y-3 animate-fade-in">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToCatalog();
              }}
              className="text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/5"
            >
              Koleksiyon &amp; Ürünler
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToCampaign();
              }}
              className="text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/5"
            >
              Lansman Fırsatı
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToReviews();
              }}
              className="text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/5"
            >
              Müşteri İncelemeleri
            </button>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Yönetici (Admin) Paneli</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
