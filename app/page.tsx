'use client';

import { useState, useEffect } from 'react';
import { StoreNavbar } from '@/components/store/StoreNavbar';
import { HeroLaunch } from '@/components/store/HeroLaunch';
import { ProductCatalog } from '@/components/store/ProductCatalog';
import { CartDrawer } from '@/components/store/CartDrawer';
import { CampaignBanner } from '@/components/store/CampaignBanner';
import { Testimonials } from '@/components/store/Testimonials';
import { StoreFooter } from '@/components/store/StoreFooter';
import { MobileBottomNav } from '@/components/store/MobileBottomNav';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '@/lib/store-data';
import { Product, CartItem } from '@/types/database';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { CheckCircle2 } from 'lucide-react';

import { 
  ADMIN_STORAGE_KEYS, 
  loadAdminData, 
  SiteSettings, 
  DEFAULT_SITE_SETTINGS 
} from '@/lib/admin-storage';

export default function StoreHomePage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin Storage ve Supabase'den Canlı Ürünleri Çek
  useEffect(() => {
    // 1. Önce Admin panelinde kaydedilen ürünleri yükle
    const savedProducts = loadAdminData<Product[]>(ADMIN_STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    setProducts(savedProducts);

    // 2. Supabase yapılandırılmışsa veritabanından çek
    const fetchLiveProducts = async () => {
      if (isSupabaseConfigured()) {
        try {
          const supabase = createClient();
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

          if (!error && data && data.length > 0) {
            setProducts(data as Product[]);
          }
        } catch (e) {
          console.warn('Supabase product fetch warning:', e);
        }
      }
    };

    fetchLiveProducts();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sepete Ekleme Fonksiyonu
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [{ product, quantity: 1 }, ...prev];
    });

    showToast(`"${product.name}" sepete eklendi!`);
  };

  // Adet Güncelleme
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Sepetten Çıkarma
  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Ürün sepetten çıkarıldı.');
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const flagshipProduct = products[0] || INITIAL_PRODUCTS[0];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f7f9] text-slate-900 pb-20 md:pb-0 selection:bg-indigo-600 selection:text-white font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800 text-xs font-bold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modern E-Ticaret Navbar (litef) */}
      <StoreNavbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToCatalog={() => scrollToSection('katalog')}
        onScrollToCampaign={() => scrollToSection('kampanya')}
        onScrollToReviews={() => scrollToSection('incelemeler')}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. litef Amiral Gemisi Hero Lansman Bölümü */}
        <HeroLaunch
          flagshipProduct={flagshipProduct}
          onAddToCart={handleAddToCart}
          onExploreClick={() => scrollToSection('katalog')}
        />

        {/* 2. Lansman İndirimi & Geri Sayım Kampanyası */}
        <CampaignBanner
          onShopClick={() => scrollToSection('katalog')}
        />

        {/* 3. Öne Çıkan Ürün Koleksiyonu & Filtreler */}
        <ProductCatalog
          products={products}
          onAddToCart={handleAddToCart}
        />

        {/* 4. Doğrulanmış Müşteri İncelemeleri */}
        <Testimonials
          reviews={INITIAL_REVIEWS}
        />
      </main>

      {/* Modern Alt Bilgi (Footer) */}
      <StoreFooter />

      {/* Mobil Yapışkan Alt Menü (Bottom Navigation) */}
      <MobileBottomNav
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onScrollToCatalog={() => scrollToSection('katalog')}
      />

      {/* Sepet Çekmecesi (Slide-Over Cart Drawer) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}
