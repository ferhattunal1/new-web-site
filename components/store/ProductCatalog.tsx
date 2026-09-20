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
    <section id="katalog" className="py-16 md:py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Geleceğin Cihazları</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Öne Çıkan Koleksiyon
            </h2>
            <p className="text-sm text-slate-400 max-w-lg">
              Yüksek kaliteli malzemeler ve en son teknolojiyle tasarlanmış amiral gemisi cihazlar.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün veya özellik ara..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/70 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5'
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
                className="glass-panel-interactive rounded-3xl p-5 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Image & Badge Wrapper */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-900/90 mb-4">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-lg">
                        {product.badge}
                      </span>
                    )}

                    {/* Category tag */}
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-medium bg-slate-950/80 backdrop-blur-md text-slate-300 border border-white/10">
                      {product.category}
                    </span>
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex items-center text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                    </div>
                    <span className="text-xs font-bold text-white">{product.rating}</span>
                    <span className="text-[11px] text-slate-400">({product.reviews_count} değerlendirme)</span>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-base font-bold text-white tracking-tight mb-1 group-hover:text-indigo-400 transition-colors">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {product.description}
                  </p>
                </div>

                {/* Bottom: Price & Add to Cart */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-white">
                        {product.price.toLocaleString('tr-TR')} TL
                      </span>
                    </div>
                    {product.original_price && (
                      <span className="text-[11px] text-slate-500 line-through">
                        {product.original_price.toLocaleString('tr-TR')} TL
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAdd(product)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                      isJustAdded
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
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
      </div>
    </section>
  );
}
