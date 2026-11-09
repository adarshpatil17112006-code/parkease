import React from 'react';
import { Wrench, Disc, Truck, Zap, ShieldCheck, ArrowRight, Clock, Phone, AlertTriangle } from 'lucide-react';
import { assistanceServices } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

export default function VehicleAssistance({ onRequestAssistance }) {
  const { t } = useLanguage();

  // Map string icon names to Lucide icon components
  const iconMap = {
    Wrench: Wrench,
    Disc: Disc,
    Truck: Truck,
    Zap: Zap,
    ShieldCheck: ShieldCheck
  };

  return (
    <section id="vehicle-assistance" className="py-16 sm:py-24 bg-gradient-to-b from-sky-50/60 to-white border-b border-slate-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-3">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{t('assistance.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t('assistance.title')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              {t('assistance.subtitle')}
            </p>
          </div>

          {/* Rapid Hotline Pill */}
          <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {t('assistance.emergencyDispatch')}
              </div>
              <div className="text-sm font-black text-slate-900">{t('assistance.hotline')}</div>
            </div>
          </div>
        </div>

        {/* 5 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {assistanceServices.map((service) => {
            const IconComponent = iconMap[service.iconName] || Wrench;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 group-hover:bg-sky-600 text-sky-600 group-hover:text-white transition-colors flex items-center justify-center">
                      <IconComponent className="w-6 h-6 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-sky-700 transition-colors">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-1.5 mb-5 border-t border-slate-100 pt-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with ETA and "Find Service" Link */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-sky-500" />
                      <span>{service.responseTime}</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRequestAssistance(service)}
                    className="w-full py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer group-hover:bg-sky-600 group-hover:text-white"
                  >
                    <span>{t('assistance.findService')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-10 p-4 rounded-2xl bg-white border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-slate-700">
              <span className="font-bold text-slate-900">{t('assistance.pricingGuarantee')}</span> {t('assistance.pricingGuaranteeDesc')}
            </div>
          </div>
          <button
            onClick={() => onRequestAssistance(assistanceServices[0])}
            className="shrink-0 text-sky-600 hover:text-sky-700 font-bold hover:underline"
          >
            {t('assistance.viewCoverage')}
          </button>
        </div>

      </div>
    </section>
  );
}
