import React from 'react';
import { PlusCircle, DollarSign, Calendar, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function OwnerBanner({ onOpenListParking }) {
  const { t } = useLanguage();

  return (
    <section id="list-parking" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden scroll-mt-20">
      
      {/* Background Accent Graphics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headline, Subtitle, Bullet Perks, Button */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('host.badge')}</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {t('host.title')}
            </h2>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t('host.subtitle')}
            </p>

            {/* 3 Host Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-left">
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-2">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">{t('host.monthlyPayouts')}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{t('host.monthlyPayoutsDesc')}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">{t('host.scheduleControl')}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{t('host.scheduleControlDesc')}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">{t('host.verifiedDrivers')}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{t('host.verifiedDriversDesc')}</div>
              </div>
            </div>

            {/* Prominent "List Your Parking" Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenListParking}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg hover:shadow-sky-500/25 transition-all cursor-pointer group"
              >
                <PlusCircle className="w-5 h-5 text-slate-950" />
                <span>{t('host.listBtn')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column: Simple parking-related illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-slate-800/90 rounded-3xl p-6 border border-slate-700/90 shadow-2xl">
              
              {/* Illustration Header */}
              <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-slate-300">{t('host.dashboardSim')}</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
                  {t('host.earnedMonth')}
                </span>
              </div>

              {/* Clean Vector Illustration of Driveway & Parking Spot */}
              <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800">
                <svg viewBox="0 0 400 240" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Pavement Ground */}
                  <rect x="20" y="20" width="360" height="200" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                  
                  {/* Two Stalls */}
                  <g transform="translate(40, 40)">
                    {/* Stall A (Parked) */}
                    <rect x="0" y="0" width="140" height="160" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />
                    <text x="70" y="24" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">{t('host.stall1')}</text>
                    
                    {/* Small parked car */}
                    <rect x="35" y="45" width="70" height="95" rx="12" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
                    <rect x="43" y="60" width="54" height="25" rx="4" fill="#bae6fd" opacity="0.8" />
                    <rect x="46" y="110" width="48" height="15" rx="3" fill="#bae6fd" opacity="0.8" />
                    
                    <rect x="25" y="145" width="90" height="18" rx="4" fill="#0f172a" opacity="0.9" />
                    <text x="70" y="157" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">{t('host.occupied')}</text>
                  </g>

                  <g transform="translate(220, 40)">
                    {/* Stall B (Available & Earning) */}
                    <rect x="0" y="0" width="140" height="160" rx="8" fill="#064e3b" fillOpacity="0.25" stroke="#10b981" strokeWidth="2" />
                    <text x="70" y="24" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">{t('host.stall2')}</text>
                    
                    {/* Big P Badge in stall */}
                    <circle cx="70" cy="80" r="26" fill="#047857" stroke="#34d399" strokeWidth="2" />
                    <text x="70" y="89" fill="#ffffff" fontSize="26" fontWeight="bold" textAnchor="middle">P</text>
                    
                    <rect x="15" y="125" width="110" height="24" rx="6" fill="#10b981" />
                    <text x="70" y="141" fill="#022c22" fontSize="10" fontWeight="bold" textAnchor="middle">{t('host.reserved')}</text>
                  </g>
                </svg>
              </div>

              {/* Stat footer */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>{t('host.zeroSetup')}</span>
                <span>•</span>
                <span>{t('host.hostShield')}</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
