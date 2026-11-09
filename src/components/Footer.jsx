import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

// Clean SVG Social Icons
const TwitterIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export default function Footer({ onOpenAuth, onOpenListParking, onRequestAssistance }) {
  const { t } = useLanguage();
  const [legalModal, setLegalModal] = useState(null); // 'privacy' | 'terms' | null

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Brand & Tagline (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="dark" size="default" />
            
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed mt-2">
              {t('footer.tagline')}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-sky-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-sky-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-sky-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-sky-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-sky-400 transition-colors">{t('footer.home')}</a>
              </li>
              <li>
                <a href="#find-parking" className="hover:text-sky-400 transition-colors">{t('footer.findParking')}</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-sky-400 transition-colors">{t('footer.howItWorks')}</a>
              </li>
              <li>
                <a href="#promotions" className="hover:text-sky-400 transition-colors">{t('footer.promotions')}</a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenListParking}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  {t('footer.listSpace')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenAuth('login')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  {t('footer.driverLogin')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Vehicle Assistance Links (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t('footer.assistanceTitle')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#vehicle-assistance" className="hover:text-sky-400 transition-colors">{t('footer.mechanics')}</a>
              </li>
              <li>
                <a href="#vehicle-assistance" className="hover:text-sky-400 transition-colors">{t('footer.puncture')}</a>
              </li>
              <li>
                <a href="#vehicle-assistance" className="hover:text-sky-400 transition-colors">{t('footer.towing')}</a>
              </li>
              <li>
                <a href="#vehicle-assistance" className="hover:text-sky-400 transition-colors">{t('footer.battery')}</a>
              </li>
              <li>
                <a href="#vehicle-assistance" className="hover:text-sky-400 transition-colors">{t('footer.servicing')}</a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onRequestAssistance}
                  className="inline-block mt-1 px-2.5 py-1 rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 font-bold text-[10px] border border-rose-800 transition-colors cursor-pointer"
                >
                  {t('footer.sosHotline')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t('footer.contactTitle')}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{t('footer.address')}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{t('footer.tollFree')}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{t('footer.email')}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>{t('footer.backToTop')}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Terms & Privacy Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            {t('footer.rights')}
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              {t('footer.privacy')}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              {t('footer.terms')}
            </button>
            <span>•</span>
            <span className="text-slate-600">{t('footer.samplePrototype')}</span>
          </div>
        </div>

      </div>

      {/* Privacy / Terms Popup Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 text-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white text-base">
                {legalModal === 'privacy' ? 'ParkEase Privacy Policy' : 'ParkEase Terms of Service'}
              </h4>
              <button
                onClick={() => setLegalModal(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-slate-400 space-y-2 leading-relaxed max-h-60 overflow-y-auto pr-2">
              <p>
                <b>1. Sample Data Protocol:</b> All listings, availability counters, mock prices, and roadside estimates on this platform are demonstration data for user testing and prototyping.
              </p>
              <p>
                <b>2. Privacy &amp; Data Security:</b> We do not sell or monetize personal location telemetry. Passwords and credentials simulated within this interface are stored strictly locally in demo memory.
              </p>
              <p>
                <b>3. Parking Reservation Terms:</b> Guaranteed stalls are held upon pass issuance. Space hosts agree to keep entryways unblocked and safe for authorized drivers.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLegalModal(null)}
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              I Understand &amp; Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
