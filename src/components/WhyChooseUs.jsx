import React from 'react';
import { Smartphone, Compass, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { platformBenefits } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const iconMap = {
    Smartphone: Smartphone,
    Compass: Compass,
    Clock: Clock,
    Shield: ShieldCheck
  };

  const getBenefitTitle = (id, defaultTitle) => {
    if (id === 'benefit-1') return t('whyUs.benefit1Title');
    if (id === 'benefit-2') return t('whyUs.benefit2Title');
    if (id === 'benefit-3') return t('whyUs.benefit3Title');
    if (id === 'benefit-4') return t('whyUs.benefit4Title');
    return defaultTitle;
  };

  const getBenefitDesc = (id, defaultDesc) => {
    if (id === 'benefit-1') return t('whyUs.benefit1Desc');
    if (id === 'benefit-2') return t('whyUs.benefit2Desc');
    if (id === 'benefit-3') return t('whyUs.benefit3Desc');
    if (id === 'benefit-4') return t('whyUs.benefit4Desc');
    return defaultDesc;
  };

  return (
    <section id="why-choose-us" className="py-16 sm:py-24 bg-slate-50/60 border-b border-slate-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-800 text-xs font-bold mb-3">
            <span>{t('whyUs.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('whyUs.title')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {t('whyUs.subtitle')}
          </p>
        </div>

        {/* 4 Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformBenefits.map((item) => {
            const Icon = iconMap[item.iconName] || Smartphone;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 group-hover:bg-sky-600 text-sky-600 group-hover:text-white flex items-center justify-center transition-all duration-300 mb-6 shadow-xs">
                    <Icon className="w-7 h-7 transition-transform group-hover:scale-110" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                    {getBenefitTitle(item.id, item.title)}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {getBenefitDesc(item.id, item.desc)}
                  </p>
                </div>

                {/* Sub-check note */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{t('whyUs.availablePlatforms')}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
