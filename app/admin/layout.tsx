import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NexusHub Admin | Yönetim ve Denetim Paneli',
  description: 'NexusHub web uygulaması için gelişmiş proje, görev ve Supabase veritabanı yönetim konsolu.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      {children}
    </div>
  );
}
