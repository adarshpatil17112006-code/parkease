import React, { useState } from 'react';
import { Phone, Wrench, Disc, Truck, Zap, ShieldCheck, AlertTriangle } from 'lucide-react';
import { assistanceServices } from '../data/mockData';
import AssistanceModal from '../components/AssistanceModal';
import { useLanguage } from '../context/LanguageContext';

export default function AssistancePage() {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const iconMap = {
    Wrench: Wrench,
    Disc: Disc,
    Truck: Truck,
    Zap: Zap,
    ShieldCheck: ShieldCheck
  };

  const handleOpenService = (srv) => {
    setSelectedService(srv);
    setIsModalOpen(true);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{t('assistance.pageBadge')}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              {t('assistance.pageTitle')}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t('assistance.pageSubtitle')}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="tel:18007275327"
                className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>{t('assistance.callSOS')}</span>
              </a>
              <button
                type="button"
                onClick={() => handleOpenService(assistanceServices[0])}
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
              >
                {t('assistance.requestOnline')}
              </button>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('assistance.capabilities')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assistanceServices.map((srv) => {
              const Icon = iconMap[srv.iconName] || Wrench;
              return (
                <div
                  key={srv.id}
                  className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{srv.name}</h3>
                      <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full">
                        {srv.responseTime}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {srv.shortDesc}
                    </p>
                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      {srv.features.map((f, idx) => (
                        <div key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenService(srv)}
                    className="w-full mt-6 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    {t('assistance.requestService')} {srv.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <AssistanceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
