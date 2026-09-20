'use client';

import { Star, ShieldCheck } from 'lucide-react';
import { Review } from '@/types/database';

interface TestimonialsProps {
  reviews: Review[];
}

export function Testimonials({ reviews }: TestimonialsProps) {
  return (
    <section id="incelemeler" className="py-16 md:py-24 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>%100 Doğrulanmış Müşteri İncelemeleri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Kullanıcılarımızın Yorumları
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            litef ekosistemini ve cihazlarını deneyimleyen kullanıcıların gerçek değerlendirmeleri.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 flex flex-col justify-between space-y-4 transition-all duration-200"
            >
              <div className="space-y-3">
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500 gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Onaylı Alıcı
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-100"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{rev.author}</h4>
                  <p className="text-[10px] text-slate-500">
                    Satın Alınan: <span className="text-indigo-600 font-medium">{rev.product_name}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
