import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle({ className = '', variant = 'pill' }) {
  const { language, toggleLanguage } = useLanguage();

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleLanguage}
        title={language === 'en' ? 'Switch to Hindi (हिन्दी)' : 'Switch to English'}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold transition-all bg-white hover:bg-slate-50 cursor-pointer ${className}`}
        aria-label="Toggle language"
      >
        <Languages className="w-3.5 h-3.5 text-sky-600" />
        <span className="text-slate-800">{language === 'en' ? 'हिन्दी' : 'English'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      title={language === 'en' ? 'Switch to Hindi (हिन्दी)' : 'Switch to English'}
      className={`inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 transition-all cursor-pointer ${className}`}
      aria-label="Language selector"
    >
      <div className="flex items-center gap-1 px-1.5 py-0.5 text-slate-500">
        <Languages className="w-3.5 h-3.5 text-sky-600" />
      </div>
      <div className="flex items-center gap-1 text-[11px] font-bold">
        <span
          className={`px-2 py-1 rounded-lg transition-all ${
            language === 'en'
              ? 'bg-white text-sky-700 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          EN
        </span>
        <span
          className={`px-2 py-1 rounded-lg transition-all ${
            language === 'hi'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          हिन्दी
        </span>
      </div>
    </button>
  );
}
