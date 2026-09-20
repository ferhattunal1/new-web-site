'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/types/database';
import { CATEGORIES } from '@/lib/store-data';
import { 
  Star, 
  ShoppingBag, 
  Check, 
  Search, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductCatalog({ products, onAddToCart }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        selectedCategory === 'Tümü' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="katalog" className="py-16 md:py-24 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Geleceğin Cihazları</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              litef Özel Koleksiyonu
            </h2>
            <p className="text-sm text-slate-600 max-w-lg leading-relaxed">
              Yüksek kaliteli malzemeler ve en son teknolojiyle tasarlanmış amiral gemisi cihazlar.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün veya özellik ara..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all touch-manipulation active:scale-95 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                  : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isJustAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-200 flex flex-col justify-between group transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Image & Badge Wrapper */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-4 border border-slate-100">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white shadow-md">
                        {product.badge}
                      </span>
                    )}

                    {/* Category tag */}
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-medium bg-white/90 backdrop-blur-md text-slate-700 border border-slate-200 shadow-sm">
                      {product.category}
                    </span>
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">{product.rating}</span>
                    <span className="text-[11px] text-slate-500">({product.reviews_count} değerlendirme)</span>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {product.description}
                  </p>
                </div>

                {/* Bottom: Price & Add to Cart */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-slate-900">
                        {product.price.toLocaleString('tr-TR')} TL
                      </span>
                    </div>
                    {product.original_price && (
                      <span className="text-[11px] text-slate-400 line-through">
                        {product.original_price.toLocaleString('tr-TR')} TL
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAdd(product)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 touch-manipulation min-h-[44px] ${
                      isJustAdded
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Eklendi</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Sepete Ekle</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-2">
            <p className="text-slate-500 text-sm">Aramanıza uygun ürün bulunamadı.</p>
            <button
              onClick={() => { setSelectedCategory('Tümü'); setSearchQuery(''); }}
              className="text-xs text-indigo-600 font-bold hover:underline"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
