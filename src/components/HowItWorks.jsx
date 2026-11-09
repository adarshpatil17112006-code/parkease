import React from 'react';
import { Search, CalendarCheck, Car, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      step: '01',
      title: t('howItWorks.step1Title'),
      description: t('howItWorks.step1Desc'),
      icon: Search,
      accentColor: 'from-sky-500 to-blue-600',
      badge: t('howItWorks.step1Badge')
    },
    {
      step: '02',
      title: t('howItWorks.step2Title'),
      description: t('howItWorks.step2Desc'),
      icon: CalendarCheck,
      accentColor: 'from-blue-600 to-indigo-600',
      badge: t('howItWorks.step2Badge')
    },
    {
      step: '03',
      title: t('howItWorks.step3Title'),
      description: t('howItWorks.step3Desc'),
      icon: Car,
      accentColor: 'from-indigo-600 to-slate-900',
      badge: t('howItWorks.step3Badge')
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-b border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-800 text-xs font-bold mb-3">
            <span>{t('howItWorks.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('howItWorks.title')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Subtle connecting dashed line on desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-sky-100 -translate-y-12 -z-0" />

          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative z-10 bg-gradient-to-b from-slate-50/90 to-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Number Badge */}
                <div className="absolute top-5 right-5 text-xs font-extrabold text-slate-300 font-mono">
                  {item.step}
                </div>

                {/* Step Icon with Gradient Background */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${item.accentColor} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 mb-6`}>
                  <Icon className="w-8 h-8" />
                </div>

                {/* Step Badge */}
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100/70 text-sky-800 mb-2">
                  {item.badge}
                </span>

                {/* Step Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Mini Checkpoint Indicator */}
                <div className="mt-6 pt-4 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{t('howItWorks.verifiedGuaranteed')}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick CTA strip below */}
        <div className="mt-12 text-center">
          <a
            href="#find-parking"
            className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:text-sky-800 hover:underline"
          >
            <span>{t('howItWorks.readyToPark')}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
