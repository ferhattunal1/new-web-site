import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NexusHub | Next.js App Router, Tailwind & Supabase Portal',
  description: 'Next.js App Router, TypeScript, Tailwind CSS ve Supabase ile geliştirilmiş modern, gerçek zamanlı web yönetim portalı.',
  keywords: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Web Application', 'Dashboard'],
  authors: [{ name: 'Ferhat & Antigravity' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#090d16',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`dark ${inter.variable}`}>
      <body className="bg-[#090d16] text-slate-100 min-h-screen selection:bg-indigo-500 selection:text-white antialiased">
        {/* Background glow effects */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
