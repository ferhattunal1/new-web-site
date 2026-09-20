'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ShieldAlert, 
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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-2xl transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-indigo-50/80 border-b border-indigo-100/80 py-2 px-4 text-center text-[11px] text-indigo-900 font-medium flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
        <span>litef Lansmanı: <b>LITEF15</b> kodu ile sepette ekstra %15 indirim &amp; Ücretsiz Hızlı Kargo!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo: litef */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-2xl tracking-tighter text-slate-900">
                  litef<span className="text-indigo-600">.</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  TR
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Yeni Nesil Teknoloji</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={onScrollToCatalog}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Koleksiyon &amp; Cihazlar
            </button>
            <button
              onClick={onScrollToCampaign}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Lansman Fırsatı
            </button>
            <button
              onClick={onScrollToReviews}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Değerlendirmeler
            </button>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Yönetici Paneli</span>
            </Link>
          </nav>

          {/* Right Actions: Cart & Mobile Drawer */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 transition-all active:scale-95 shadow-sm font-bold text-xs"
              aria-label="Sepeti Aç"
            >
              <ShoppingBag className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Sepetim</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-black flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 md:hidden"
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-5 py-4 space-y-3 animate-fade-in shadow-xl">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToCatalog();
              }}
              className="text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Koleksiyon &amp; Cihazlar
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToCampaign();
              }}
              className="text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Lansman Fırsatı
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToReviews();
              }}
              className="text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Değerlendirmeler
            </button>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold text-amber-800 bg-amber-50 border border-amber-200"
            >
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Yönetici (Admin) Paneli</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
