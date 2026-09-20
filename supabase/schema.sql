-- ==============================================================================
-- SUPABASE VERİTABANI ŞEMASI (E-TİCARET & YÖNETİM PORTALI)
-- Bu dosyayı Supabase Dashboard > SQL Editor sekmesine yapıştırıp "Run" butonuna basarak
-- tablolarınızı ve başlangıç verilerinizi oluşturabilirsiniz.
-- ==============================================================================

-- 1. ÜRÜNLER TABLOSU (PRODUCTS)
create table if not exists public.products (
    id text primary key default gen_random_uuid()::text,
    name text not null,
    description text,
    price numeric not null,
    original_price numeric,
    rating numeric default 5.0,
    reviews_count integer default 0,
    category text default 'Genel',
    image_url text,
    badge text,
    in_stock boolean default true,
    featured boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PROJELER VE GÖREVLER (YÖNETİM)
create table if not exists public.projects (
    id text primary key default gen_random_uuid()::text,
    name text not null,
    description text,
    color text default '#6366f1',
    status text default 'active',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.tasks (
    id text primary key default gen_random_uuid()::text,
    project_id text references public.projects(id) on delete cascade,
    title text not null,
    description text,
    status text default 'todo',
    priority text default 'medium',
    due_date date,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. GÜVENLİK (ROW LEVEL SECURITY - RLS)
alter table public.products enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;

-- Açık okuma ve yazma politikaları
drop policy if exists "Allow public read-write products" on public.products;
create policy "Allow public read-write products" on public.products for all using (true) with check (true);

drop policy if exists "Enable all operations for projects" on public.projects;
create policy "Enable all operations for projects" on public.projects for all using (true) with check (true);

drop policy if exists "Enable all operations for tasks" on public.tasks;
create policy "Enable all operations for tasks" on public.tasks for all using (true) with check (true);

-- 4. BAŞLANGIÇ E-TİCARET ÜRÜNLERİ (SEED PRODUCTS)
insert into public.products (id, name, description, price, original_price, rating, reviews_count, category, image_url, badge, in_stock, featured)
values
    ('prod-1', 'litef Pro X Wireless Kulaklık', 'Hibrit Aktif Gürültü Engelleme (ANC), 48 saat pil ömrü, uzamsal ses ve 40mm berilyum sürücüler.', 3499, 4899, 4.9, 142, 'Kulaklık & Ses', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80', 'Lansman Özel', true, true),
    ('prod-2', 'Aura Chrono Ultra Akıllı Saat', 'Havacılık sınıfı titanyum gövde, safir cam, EKG & kan oksijeni takibi ve 14 güne varan pil ömrü.', 4999, 6200, 4.8, 98, 'Akıllı Saatler', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80', 'Yeni Nesil', true, true),
    ('prod-3', 'Vortex Vision XR Sanal Gözlük', 'Çift 4K Mikro-OLED ekran, entegre göz ve el takibi, 120Hz yenileme hızı ve uzamsal ses mimarisi.', 12899, 15400, 5.0, 54, 'Giyilebilir Teknoloji', 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=80', 'Sınırlı Üretim', true, true),
    ('prod-4', 'SonicPulse Studio Hoparlör', '120W RMS güç çıkışı, ahşap akustik kabin, Bluetooth 5.3 ve optik yüksek çözünürlüklü giriş.', 2199, 2800, 4.7, 86, 'Kulaklık & Ses', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80', 'Çok Satan', true, false),
    ('prod-5', 'MagCharge Pro 3-in-1 Şarj İstasyonu', 'Telefon, saat ve kulaklığı aynı anda 15W hızlı şarj edebilen alüminyum katlanabilir şarj standı.', 999, 1450, 4.9, 110, 'Aksesuarlar', 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=800&auto=format&fit=crop&q=80', '%30 İndirim', true, false),
    ('prod-6', 'CyberKey RGB Manyetik Mekanik Klavye', '0.1mm hassasiyetli hall-effect manyetik switchler, CNC alüminyum gövde ve dinamik RGB.', 2650, 3200, 4.8, 73, 'Aksesuarlar', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80', 'Oyuncu Serisi', true, false)
on conflict (id) do nothing;
