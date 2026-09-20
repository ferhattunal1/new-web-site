'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Database, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Code2, 
  Plus, 
  Menu, 
  X,
  ExternalLink,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

interface NavbarProps {
  isConfigured: boolean;
  onOpenSqlGuide: () => void;
  onOpenNewTaskModal: () => void;
}

export function Navbar({ isConfigured, onOpenSqlGuide, onOpenNewTaskModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#090d16]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#090d16] rounded-xl flex items-center justify-center">
                <Database className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                  Nexus<span className="text-indigo-400">Hub</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Next.js + Supabase
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Modern App Router &amp; Veritabanı Portalı</p>
            </div>
          </div>

          {/* Desktop Navigation & Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Status Pill */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              isConfigured 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}>
              {isConfigured ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Supabase Canlı Bağlantı</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Demo Modu (Anahtarlar Bekleniyor)</span>
                </>
              )}
            </div>

            {/* Admin Panel Link */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all shadow-sm"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Paneli</span>
            </Link>

            {/* SQL Guide Button */}
            <button
              onClick={onOpenSqlGuide}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/60 border border-white/5 transition-all"
            >
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>SQL Şeması</span>
            </button>

            {/* Create Task Button */}
            <button
              onClick={onOpenNewTaskModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-md shadow-indigo-500/25 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Görev</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/admin"
              className="p-2 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-medium flex items-center gap-1"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Admin</span>
            </Link>
            <button
              onClick={onOpenNewTaskModal}
              className="p-2 rounded-lg bg-indigo-600 text-white shadow-md active:scale-95"
              aria-label="Yeni Görev Ekle"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800/50 border border-white/5"
              aria-label="Menüyü Aç"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0c1220]/95 backdrop-blur-2xl px-4 pt-3 pb-5 space-y-3 animate-fade-in">
          <div className={`flex items-center justify-between p-3 rounded-xl border ${
            isConfigured 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
          }`}>
            <span className="text-xs font-medium flex items-center gap-2">
              {isConfigured ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {isConfigured ? 'Supabase Canlı Bağlantı Aktif' : 'Demo Modu Aktif'}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold text-amber-300 bg-amber-500/15 border border-amber-500/30"
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Admin Yönetim Paneli</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20">Aç</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSqlGuide();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-slate-200 bg-slate-800/50 hover:bg-slate-700/50 border border-white/5"
            >
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>SQL Kurulum Şeması</span>
            </button>

            <a
              href="https://supabase.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 bg-slate-800/20 border border-white/5"
            >
              <span>Supabase Dashboard</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
