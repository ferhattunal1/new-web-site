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
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f6f7f9] relative overflow-hidden font-sans">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>litef Mağazasına Dön</span>
          </Link>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xl space-y-6">
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600 shadow-sm">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Yönetici Girişi</h1>
            <p className="text-xs text-slate-500">litef Yönetim ve Denetim Konsolu</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Kullanıcı Adı veya E-Posta
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin veya admin@litef.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f6f7f9] border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Yönetici Şifresi
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#f6f7f9] border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-50 touch-manipulation min-h-[44px]"
            >
              {loading ? 'Doğrulanıyor...' : 'Giriş Yap'}
            </button>
          </form>

          {/* Quick Fill Box */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Test Girişi:</span>
            <button
              onClick={handleQuickFill}
              type="button"
              className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>admin / admin123 doldur</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
