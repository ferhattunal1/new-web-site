'use client';

import { useState } from 'react';
import { Product } from '@/types/database';
import { CATEGORIES } from '@/lib/store-data';
import { 
  Package, 
  Plus, 
  Trash2, 
  Star, 
  Check, 
  AlertCircle, 
  Tag, 
  Sparkles,
  X
} from 'lucide-react';

interface ProductAdminProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id' | 'created_at'>) => Promise<void>;
  onDeleteProduct: (productId: string) => Promise<void>;
  onToggleStock: (productId: string, currentStock: boolean) => Promise<void>;
}

export function ProductAdmin({
  products,
  onAddProduct,
  onDeleteProduct,
  onToggleStock,
}: ProductAdminProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1] || 'Kulaklık & Ses');
  const [imageUrl, setImageUrl] = useState('');
  const [badge, setBadge] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    try {
      setSubmitting(true);
      await onAddProduct({
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        original_price: originalPrice ? Number(originalPrice) : null,
        rating: 5.0,
        reviews_count: 1,
        category,
        image_url: imageUrl.trim() || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        badge: badge.trim() || null,
        in_stock: true,
        featured: false,
      });

      // Reset
      setName('');
      setDescription('');
      setPrice('');
      setOriginalPrice('');
      setImageUrl('');
      setBadge('');
      setIsCreating(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Ürün Kataloğu Yönetimi</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            E-ticaret vitrininde sergilenen ürünleri, fiyatları ve stok durumlarını yönetin.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all self-start sm:self-auto"
        >
          {isCreating ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isCreating ? 'Formu Kapat' : 'Yeni Ürün Ekle'}</span>
        </button>
      </div>

      {/* Add Product Form */}
      {isCreating && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl glass-panel border border-indigo-500/30 bg-slate-900/90 space-y-4 animate-fade-in shadow-2xl"
        >
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Yeni Ürün Tanımla</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Ürün Adı *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: Nova Buds Air"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {CATEGORIES.filter((c) => c !== 'Tümü').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Satış Fiyatı (TL) *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="2499"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Eski Fiyat (İndirimli ise)</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="3200"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Rozet / Etiket</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="Örn: Yeni Çıktı"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Görsel URL Adresi</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Açıklama</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ürünün teknik özellikleri, pil ve ses kalitesi..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all"
            >
              {submitting ? 'Kaydediliyor...' : 'Ürünü Vitrine Ekle'}
            </button>
          </div>
        </form>
      )}

      {/* Products Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Ürün</th>
                <th className="py-3.5 px-4 font-semibold">Kategori</th>
                <th className="py-3.5 px-4 font-semibold">Fiyat</th>
                <th className="py-3.5 px-4 font-semibold">Stok Durumu</th>
                <th className="py-3.5 px-4 font-semibold text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {products.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-900"
                      />
                      <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        {item.badge && (
                          <span className="text-[10px] text-indigo-400 font-medium">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-slate-400">{item.category}</td>

                  <td className="py-3 px-4 font-bold text-white">
                    {item.price.toLocaleString('tr-TR')} TL
                  </td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => onToggleStock(item.id, item.in_stock)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.in_stock
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                          : 'bg-red-500/15 text-red-400 border border-red-500/20'
                      }`}
                    >
                      {item.in_stock ? 'Stokta Var' : 'Tükendi'}
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onDeleteProduct(item.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Ürünü Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
