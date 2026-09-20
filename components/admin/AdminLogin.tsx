'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  KeyRound
} from 'lucide-react';
import { loginAdmin } from '@/lib/admin-auth';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      const result = loginAdmin(username, password);
      if (result.success) {
        onLoginSuccess();
      } else {
        setError(result.message || 'Giriş başarısız!');
      }
      setLoading(false);
    }, 400);
  };

  const handleQuickFill = () => {
    setUsername('admin');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#090d16] relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Mağazaya Dön</span>
          </Link>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl glass-panel border border-white/10 bg-slate-900/90 shadow-2xl space-y-6">
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-[1px] mx-auto shadow-lg shadow-indigo-600/30">
              <div className="w-full h-full bg-[#090d16] rounded-2xl flex items-center justify-center">
                <ShieldAlert className="w-7 h-7 text-indigo-400" />
              </div>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Yönetici Girişi</h1>
            <p className="text-xs text-slate-400">NovaStore Yönetim ve Denetim Konsolu</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Kullanıcı Adı veya E-Posta
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin veya admin@novastore.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Yönetici Şifresi
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? <span>Giriş Yapılıyor...</span> : <span>Güvenli Giriş Yap</span>}
            </button>
          </form>

          {/* Quick Demo Fill Box */}
          <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <KeyRound className="w-4 h-4 text-indigo-400 shrink-0" />
              <div className="truncate">
                <p className="font-semibold text-white">Giriş Bilgisi:</p>
                <p className="text-[11px] text-slate-400 font-mono">admin / admin123</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleQuickFill}
              className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold shrink-0 transition-colors"
            >
              Doldur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
