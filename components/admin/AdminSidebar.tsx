'use client';

import Link from 'next/link';
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Database, 
  Activity, 
  ArrowLeft, 
  ShieldAlert, 
  ExternalLink,
  Sparkles,
  X
} from 'lucide-react';

export type AdminTab = 'overview' | 'projects' | 'tasks' | 'system' | 'logs';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  projectCount: number;
  taskCount: number;
}

export function AdminSidebar({
  activeTab,
  onTabChange,
  isOpenMobile,
  onCloseMobile,
  projectCount,
  taskCount,
}: AdminSidebarProps) {
  const navItems = [
    {
      id: 'overview' as AdminTab,
      label: 'Genel Bakış',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'projects' as AdminTab,
      label: 'Proje Yönetimi',
      icon: FolderKanban,
      badge: projectCount,
    },
    {
      id: 'tasks' as AdminTab,
      label: 'Görev Denetimi',
      icon: CheckSquare,
      badge: taskCount,
    },
    {
      id: 'system' as AdminTab,
      label: 'Sistem & Supabase',
      icon: Database,
      badge: 'Canlı',
    },
    {
      id: 'logs' as AdminTab,
      label: 'Aktivite Günlüğü',
      icon: Activity,
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden animate-fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#090d16] border-r border-white/10 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-white">NexusHub</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Yönetim Paneli</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg text-slate-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Yönetim Modülleri
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
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== null && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      isActive
                        ? 'bg-indigo-700/80 text-white'
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

        {/* Bottom Section */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-slate-950/40">
          <Link
            href="/"
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-white/10 transition-all"
          >
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-indigo-400" />
              <span>Ana Siteye Dön</span>
            </div>
            <span className="text-[10px] text-slate-500">Live Hub</span>
          </Link>

          {/* Admin User Status */}
          <div className="flex items-center gap-3 px-2 pt-1">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                A
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#090d16]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white truncate">Sistem Yöneticisi</p>
              <p className="text-[10px] text-emerald-400 truncate">Süper Yetkili</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
