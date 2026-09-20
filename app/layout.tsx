import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'litef | Yeni Nesil Teknoloji & Yaşam',
  description: 'litef resmi web sitesi. Yeni nesil akıllı teknoloji ürünleri, kulaklıklar, akıllı saatler ve aksesuarlar.',
  keywords: ['litef', 'teknoloji', 'kulaklık', 'akıllı saat', 'e-ticaret', 'lansman'],
  authors: [{ name: 'litef' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#f6f7f9',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-[#f6f7f9] text-slate-900 min-h-screen selection:bg-indigo-600 selection:text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
