'use client';

import { Star, ShieldCheck, MessageSquareQuote } from 'lucide-react';
import { Review } from '@/types/database';

interface TestimonialsProps {
  reviews: Review[];
}

export function Testimonials({ reviews }: TestimonialsProps) {
  return (
    <section id="incelemeler" className="py-16 md:py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>%100 Doğrulanmış Müşteri İncelemeleri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Kullanıcılarımızın Yorumları
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Nova serisini deneyimleyen teknoloji tutkunlarının gerçek değerlendirmeleri.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel-interactive rounded-3xl p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" /> Onaylı Alıcı
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{rev.author}</h4>
                  <p className="text-[10px] text-slate-400">
                    Satın Alınan: <span className="text-indigo-400 font-medium">{rev.product_name}</span>
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
