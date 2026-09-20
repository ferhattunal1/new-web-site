'use client';

import { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Terminal, 
  Database, 
  ShieldCheck, 
  ExternalLink,
  Layers
} from 'lucide-react';

interface SqlGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SQL_CODE = `-- 1. PROJELER TABLOSU (PROJECTS)
create table if not exists public.projects (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    color text default '#6366f1',
    status text default 'active' check (status in ('active', 'completed', 'archived')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. GÖREVLER TABLOSU (TASKS)
create table if not exists public.tasks (
    id uuid primary key default gen_random_uuid(),
    project_id uuid references public.projects(id) on delete cascade,
    title text not null,
    description text,
    status text default 'todo' check (status in ('todo', 'in_progress', 'done')),
    priority text default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
    due_date date,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. GÜVENLİK (ROW LEVEL SECURITY - RLS)
alter table public.projects enable row level security;
alter table public.tasks enable row level security;

-- Hızlı test için anonim okuma ve yazma politikaları
drop policy if exists "Enable all operations for projects" on public.projects;
create policy "Enable all operations for projects" on public.projects for all using (true) with check (true);

drop policy if exists "Enable all operations for tasks" on public.tasks;
create policy "Enable all operations for tasks" on public.tasks for all using (true) with check (true);

-- 4. BAŞLANGIÇ VERİLERİ (SEED DATA)
insert into public.projects (name, description, color, status) values
('Modern E-Ticaret Arayüzü', 'Next.js App Router ve Tailwind ile yeni nesil alışveriş deneyimi', '#6366f1', 'active'),
('Supabase Veritabanı Entegrasyonu', 'Gerçek zamanlı abonelikler ve RLS güvenlik kuralları', '#06b6d4', 'active')
on conflict do nothing;`;

export function SqlGuideModal({ isOpen, onClose }: SqlGuideModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(SQL_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-[#0c1220] border border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Supabase SQL Kurulum Kılavuzu</h3>
              <p className="text-xs text-slate-400">Veritabanı tablolarını ve RLS politikalarını tek adımda oluşturun</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Adım Adım Rehber */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
              <span className="text-[11px] font-semibold text-indigo-400">Adım 1</span>
              <p className="text-xs text-slate-300 font-medium">Supabase Paneline Gidin</p>
              <p className="text-[11px] text-slate-400 leading-snug">Projenizi açıp sol menüdeki <b>SQL Editor</b> sekmesine tıklayın.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
              <span className="text-[11px] font-semibold text-cyan-400">Adım 2</span>
              <p className="text-xs text-slate-300 font-medium">Kodu Yapıştırıp Çalıştırın</p>
              <p className="text-[11px] text-slate-400 leading-snug">Aşağıdaki SQL betiğini kopyalayıp editöre yapıştırın ve <b>RUN</b> tuşuna basın.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
              <span className="text-[11px] font-semibold text-emerald-400">Adım 3</span>
              <p className="text-xs text-slate-300 font-medium">.env.local&apos;ı Doldurun</p>
              <p className="text-[11px] text-slate-400 leading-snug">Settings &gt; API sayfasındaki URL ve Anon Key&apos;i yerel dosyaya ekleyin.</p>
            </div>
          </div>

          {/* SQL Kod Kutusu */}
          <div className="relative rounded-xl border border-white/10 bg-slate-950 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-white/5">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>supabase/schema.sql</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-72">
              <code>{SQL_CODE}</code>
            </pre>
          </div>

          {/* Info note */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200">
            <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <p>
              Bu şema Postgres üzerinde <code>Row Level Security (RLS)</code> mekanizmasını etkinleştirir ve Next.js SSR istemcilerinin anonim erişimle tabloları okuyup yazabilmesini sağlayan politikalar içerir.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-slate-900/50">
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <span>Supabase Dashboard&apos;a Git</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
