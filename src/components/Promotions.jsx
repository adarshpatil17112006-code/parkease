import React, { useState } from 'react';
import { Tag, MapPin, ExternalLink, Star, Sparkles, X } from 'lucide-react';
import { sponsoredPromotions } from '../data/mockData';

export default function Promotions() {
  const [activePromoModal, setActivePromoModal] = useState(null);

  return (
    <section id="promotions" className="py-16 sm:py-24 bg-white border-b border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Partner Perks &amp; Discounts</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Offers That Keep You Moving.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Take advantage of hand-picked deals from accredited driving schools, service hubs, insurers, and EV networks.
            </p>
          </div>

          <div className="text-xs text-slate-400">
            <span>Special promo codes automatically applied at checkout</span>
          </div>
        </div>

        {/* 5 Sponsored Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {sponsoredPromotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={promo.image}
                    alt={promo.businessName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Mandatory Sponsored Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-900/80 text-amber-300 backdrop-blur-xs border border-amber-400/30 shadow-xs">
                      Sponsored
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-white/95 text-slate-800 backdrop-blur-xs shadow-2xs">
                      {promo.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-600 text-white shadow-2xs">
                      {promo.badge}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5">
                  {/* Rating & Location */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span className="flex items-center gap-1 font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {promo.rating}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500 truncate max-w-[120px]">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      {promo.location}
                    </span>
                  </div>

                  {/* Business Name */}
                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-sky-700 transition-colors mb-2">
                    {promo.businessName}
                  </h3>

                  {/* Offer Description */}
                  <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100/90 text-xs text-amber-950 font-semibold mb-3">
                    <div className="flex items-start gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span>{promo.offer}</span>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {promo.tagline}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 sm:p-5 pt-0">
                <button
                  type="button"
                  onClick={() => setActivePromoModal(promo)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-800 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Learn More</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Promotion Details Modal */}
        {activePromoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden p-6 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-amber-100 text-amber-800 rounded">
                    Sponsored Offer
                  </span>
                  <span className="text-xs text-slate-500">{activePromoModal.category}</span>
                </div>
                <button
                  onClick={() => setActivePromoModal(null)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">{activePromoModal.businessName}</h3>
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-bold text-amber-900">
                  {activePromoModal.offer}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activePromoModal.tagline}. Present your ParkEase account voucher or redeem online using promo code: <b className="text-sky-700">PARKEASE2026</b>.
                </p>
                <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1">
                  <div><b>Location:</b> {activePromoModal.location}</div>
                  <div><b>Support Helpline:</b> {activePromoModal.contact}</div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText('PARKEASE2026');
                    alert('Promo code "PARKEASE2026" copied to clipboard!');
                  }}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50"
                >
                  Copy Promo Code
                </button>
                <button
                  type="button"
                  onClick={() => setActivePromoModal(null)}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 text-xs font-bold text-white hover:bg-slate-800"
                >
                  Close Offer
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
