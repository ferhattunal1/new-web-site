'use client';

import Link from 'next/link';
import { Zap, Grid, ShoppingBag, ShieldAlert } from 'lucide-react';

interface MobileBottomNavProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToTop: () => void;
  onScrollToCatalog: () => void;
}

export function MobileBottomNav({
  cartCount,
  onOpenCart,
  onScrollToTop,
  onScrollToCatalog,
}: MobileBottomNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-3 py-2 pb-safe">
      <div className="flex items-center justify-around">
        {/* 1. Vitrin */}
        <button
          onClick={onScrollToTop}
          className="flex flex-col items-center gap-1 py-1 px-3 text-slate-500 hover:text-indigo-600 transition-colors active:scale-95"
        >
          <Zap className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Vitrin</span>
        </button>

        {/* 2. Katalog */}
        <button
          onClick={onScrollToCatalog}
          className="flex flex-col items-center gap-1 py-1 px-3 text-slate-500 hover:text-indigo-600 transition-colors active:scale-95"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Katalog</span>
        </button>

        {/* 3. Sepetim */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center gap-1 py-1 px-3 text-indigo-600 font-bold active:scale-95"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-black flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Sepetim</span>
        </button>

        {/* 4. Admin */}
        <Link
          href="/admin"
          className="flex flex-col items-center gap-1 py-1 px-3 text-slate-500 hover:text-amber-600 transition-colors active:scale-95"
        >
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          <span className="text-[10px] font-semibold text-slate-600">Admin</span>
        </Link>
      </div>
    </div>
  );
}
