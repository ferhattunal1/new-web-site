'use client';

import Link from 'next/link';
import { 
  LayoutDashboard, 
  MenuSquare, 
  Layers, 
  LayoutTemplate, 
  Boxes, 
  Package, 
  Tags, 
  FileText, 
  BadgePercent, 
  HelpCircle, 
  FolderArchive, 
  Users, 
  Settings, 
  LogOut, 
  ArrowLeft, 
  ShieldAlert, 
  X 
} from 'lucide-react';

export type AdminTab = 
  | 'overview' 
  | 'menus' 
  | 'landing' 
  | 'layout' 
  | 'modules' 
  | 'products' 
  | 'categories' 
  | 'quotes' 
  | 'prices' 
  | 'faq' 
  | 'files' 
  | 'users' 
  | 'system';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  productCount: number;
  quoteCount: number;
  onLogout: () => void;
}

export function AdminSidebar({
  activeTab,
  onTabChange,
  isOpenMobile,
  onCloseMobile,
  productCount,
  quoteCount,
  onLogout,
}: AdminSidebarProps) {
  const navItems = [
    { id: 'overview' as AdminTab, label: 'Özet', icon: LayoutDashboard, badge: null },
    { id: 'menus' as AdminTab, label: 'Menüler', icon: MenuSquare, badge: null },
    { id: 'landing' as AdminTab, label: 'Landing Sayfalar', icon: Layers, badge: 'Yeni' },
    { id: 'layout' as AdminTab, label: 'Sayfa Düzeni', icon: LayoutTemplate, badge: null },
    { id: 'modules' as AdminTab, label: 'Modül Oluşturma', icon: Boxes, badge: null },
    { id: 'products' as AdminTab, label: 'Ürünler', icon: Package, badge: productCount },
    { id: 'categories' as AdminTab, label: 'Kategoriler', icon: Tags, badge: null },
    { id: 'quotes' as AdminTab, label: 'Teklif Talepleri', icon: FileText, badge: quoteCount },
    { id: 'prices' as AdminTab, label: 'Fiyat Listesi', icon: BadgePercent, badge: null },
    { id: 'faq' as AdminTab, label: 'SSS (Sorular)', icon: HelpCircle, badge: null },
    { id: 'files' as AdminTab, label: 'Dosya Yöneticisi', icon: FolderArchive, badge: null },
    { id: 'users' as AdminTab, label: 'Kullanıcılar', icon: Users, badge: null },
    { id: 'system' as AdminTab, label: 'Sistem Ayarları', icon: Settings, badge: 'Supabase' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm lg:hidden animate-fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#090d16] border-r border-white/10 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white">litef</span>
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Admin
                </span>
              </div>
              <p className="text-[10px] text-slate-400">13 Modüllü Yönetim</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg text-slate-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items (Scrollable) */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Yönetim Menüsü
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== null && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-indigo-700 text-white'
                        : 'bg-slate-800 text-slate-300 border border-white/5'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 border-t border-white/10 space-y-2 bg-slate-950/60 shrink-0">
          <Link
            href="/"
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-white/5 transition-all"
          >
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" />
              <span>Mağazaya Git</span>
            </div>
            <span className="text-[10px] text-slate-500">Canlı</span>
          </Link>

          <button
            onClick={onLogout}
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-all"
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-3.5 h-3.5" />
              <span>Oturumu Kapat</span>
            </div>
            <span className="text-[10px] text-red-500">Çıkış</span>
          </button>
        </div>
      </aside>
    </>
  );
}
