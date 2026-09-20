-- ==============================================================================
-- SUPABASE VERİTABANI ŞEMASI (SCHEMA & SEED DATA)
-- Bu dosyayı Supabase Dashboard > SQL Editor sekmesine yapıştırıp "Run" butonuna basarak
-- tablolarınızı ve başlangıç verilerinizi oluşturabilirsiniz.
-- ==============================================================================

-- 1. PROJELER TABLOSU (PROJECTS)
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

-- Hızlı geliştirme ve test için anonim okuma ve yazma politikaları
drop policy if exists "Enable all operations for projects" on public.projects;
create policy "Enable all operations for projects"
    on public.projects
    for all
    using (true)
    with check (true);

drop policy if exists "Enable all operations for tasks" on public.tasks;
create policy "Enable all operations for tasks"
    on public.tasks
    for all
    using (true)
    with check (true);

-- 4. BAŞLANGIÇ ÖRNEK VERİLERİ (SEED DATA)
insert into public.projects (id, name, description, color, status)
values
    ('11111111-1111-1111-1111-111111111111', 'Modern E-Ticaret Arayüzü', 'Next.js App Router ve Tailwind ile yeni nesil alışveriş deneyimi', '#6366f1', 'active'),
    ('22222222-2222-2222-2222-222222222222', 'Supabase Veritabanı Entegrasyonu', 'Gerçek zamanlı abonelikler ve RLS güvenlik kuralları', '#06b6d4', 'active'),
    ('33333333-3333-3333-3333-333333333333', 'Mobil Uygulama v2', 'React Native ve API senkronizasyonu', '#10b981', 'completed')
on conflict (id) do nothing;

insert into public.tasks (id, project_id, title, description, status, priority, due_date)
values
    (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'Tailwind CSS Tasarım Sistemini Tamamla', 'Renk paletleri, kartlar, buton bileşenleri ve cam efekti hazırlandı.', 'done', 'high', current_date),
    (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'Duyarlı Navbar ve Mobil Menü', 'Mobil görünümde animasyonlu menü çekmecesi ve tema geçişleri test edilecek.', 'in_progress', 'urgent', current_date + interval '2 days'),
    (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 'Supabase Client ve Server İstemcileri', 'App Router için SSR paketini ve cookie yönetimini yapılandır.', 'done', 'high', current_date),
    (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 'Gerçek Zamanlı CRUD & API İşlemleri', 'Görev ekleme, filtreleme ve durum güncelleme işlemleri.', 'in_progress', 'medium', current_date + interval '4 days'),
    (gen_random_uuid(), '33333333-3333-3333-3333-333333333333', 'Karanlık Mod ve Glassmorphism Teması', 'Kullanıcı dostu, modern ve zarif arayüz deneyimi.', 'todo', 'low', current_date + interval '7 days')
on conflict do nothing;
