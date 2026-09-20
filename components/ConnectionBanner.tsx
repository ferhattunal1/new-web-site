'use client';

import { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  ArrowRight, 
  Copy, 
  Check, 
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ConnectionBannerProps {
  isConfigured: boolean;
  onOpenSqlGuide: () => void;
}

export function ConnectionBanner({ isConfigured, onOpenSqlGuide }: ConnectionBannerProps) {
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const copyEnvSnippet = () => {
    const text = `NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...`;
    navigator.clipboard.writeText(text);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  if (isConfigured) {
    return (
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-teal-950/30 border border-emerald-500/30 p-4 shadow-lg shadow-emerald-950/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white">Supabase Canlı Veritabanı Bağlantısı Aktif</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Online & Senkronize
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Veriler doğrudan Supabase PostgreSQL veritabanınızdan okunuyor ve yazılıyor.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenSqlGuide}
            className="text-xs text-emerald-300 hover:text-white underline underline-offset-4 flex items-center gap-1 transition-colors self-end sm:self-center"
          >
            <span>Şema Detayları</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-indigo-500/30 p-5 shadow-xl relative overflow-hidden backdrop-blur-xl">
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-white">Uygulama Demo Modunda Çalışıyor</h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Gerçek Zamanlı Önizleme Aktif
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Supabase kimlik bilgileri henüz <code className="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-[11px]">.env.local</code> dosyasına eklenmedi. Tüm arayüz özelliklerini ve CRUD işlemlerini yerel verilerle hemen deneyebilirsiniz. Canlı Supabase veritabanına bağlanmak için 2 basit adım yeterlidir:
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 transition-all"
          >
            <span>{expanded ? 'Kılavuzu Gizle' : 'Kurulum Adımları'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onOpenSqlGuide}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>SQL Şemasını Gör</span>
          </button>
        </div>
      </div>

      {/* Expanded Quick Setup Guide */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-3 animate-fade-in">
          {/* Step 1 */}
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-[11px] font-bold">1</span>
              <span>Supabase Projesi Açın</span>
            </div>
            <p className="text-[11px] text-slate-400">
              <a 
                href="https://database.new" 
                target="_blank" 
                rel="noreferrer" 
                className="text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                database.new <ExternalLink className="w-2.5 h-2.5" />
              </a> adresinden ücretsiz bir Supabase projesi oluşturun.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[11px] font-bold">2</span>
              <span>SQL Şemasını Çalıştırın</span>
            </div>
            <p className="text-[11px] text-slate-400">
              &quot;SQL Şemasını Gör&quot; butonuna tıklayıp kodu kopyalayın ve Supabase Dashboard &gt; SQL Editor&apos;a yapıştırıp çalıştırın.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[11px] font-bold">3</span>
                <span>.env.local Dosyasına Ekleyin</span>
              </div>
              <button
                onClick={copyEnvSnippet}
                className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
              >
                {copiedEnv ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedEnv ? 'Kopyalandı' : 'Kopyala'}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Proje ayarlarından URL ve Anon Key&apos;i alıp <code className="text-slate-300 font-mono">.env.local</code> içerisine yapıştırın.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
