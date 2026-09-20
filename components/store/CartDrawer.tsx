'use client';

import { useState } from 'react';
import { CartItem } from '@/types/database';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      setTimeout(() => {
        setOrderComplete(false);
        onClearCart();
        onClose();
      }, 2500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-full sm:max-w-md bg-[#f6f7f9] border-l border-slate-200 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Alışveriş Sepetim</h3>
                <p className="text-xs text-slate-500">{items.length} farklı ürün</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Sepeti Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {orderComplete ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Siparişiniz Alındı!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Tebrikler, siparişiniz başarıyla oluşturuldu. Kargo takip kodunuz e-postanıza iletilecektir.
                </p>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 text-slate-400 mx-auto flex items-center justify-center shadow-sm">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">Sepetiniz Boş</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    litef koleksiyonundan dilediğiniz amiral gemisi ürünü hemen sepetinize ekleyebilirsiniz.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-md transition-all active:scale-95 touch-manipulation min-h-[44px]"
                >
                  Koleksiyonu Keşfet
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3.5"
                  >
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-100"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-indigo-600 font-bold mt-0.5">
                        {item.product.price.toLocaleString('tr-TR')} TL
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-[#f6f7f9]">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center"
                            aria-label="Azalt"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center"
                            aria-label="Arttır"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors ml-auto touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center"
                          title="Ürünü Çıkar"
                          aria-label="Ürünü Çıkar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && !orderComplete && (
            <div className="p-6 border-t border-slate-200 bg-white space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Ara Toplam</span>
                  <span className="font-semibold text-slate-800">{totalAmount.toLocaleString('tr-TR')} TL</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Hızlı Kargo</span>
                  <span className="text-emerald-600 font-bold uppercase text-[11px]">Ücretsiz</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>Genel Toplam</span>
                  <span className="text-indigo-600">{totalAmount.toLocaleString('tr-TR')} TL</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-50 touch-manipulation min-h-[48px]"
              >
                {isCheckingOut ? (
                  <span>İşlem Yapılıyor...</span>
                ) : (
                  <>
                    <span>Siparişi Tamamla &amp; Güvenli Öde</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Uçtan Uca Şifreli Güvenli Ödeme</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
