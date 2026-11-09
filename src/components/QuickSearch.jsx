import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Timer, Search, RotateCcw } from 'lucide-react';
import { locationsList } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

export default function QuickSearch({ onFilterChange, initialLocation = '' }) {
  const { t } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState(initialLocation || 'All Locations');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('12:00');
  const [duration, setDuration] = useState('2');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onFilterChange) {
      onFilterChange({
        location: selectedLocation === 'All Locations' ? '' : selectedLocation,
        date,
        startTime,
        duration: Number(duration)
      });
    }

    // Scroll smoothly to parking listings if not already there
    const target = document.querySelector('#find-parking');
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleReset = () => {
    setSelectedLocation('All Locations');
    setDuration('2');
    if (onFilterChange) {
      onFilterChange({
        location: '',
        date,
        startTime,
        duration: 2
      });
    }
  };

  return (
    <section className="relative -mt-8 sm:-mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl border border-sky-100 p-4 sm:p-6 lg:p-7">
        
        {/* Section Header Tagline */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Quick Spot Finder</span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Customize Your Parking Schedule
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden sm:inline">Instant spot availability filters</span>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-sky-600 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Search Controls Form: Stacks vertically on mobile, horizontal row on desktop */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 sm:gap-4 items-end">
          
          {/* 1. Location Control */}
          <div className="lg:col-span-4">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-sky-600" />
              <span>{t('search.locationLabel')}</span>
            </label>
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  if (onFilterChange) {
                    onFilterChange({
                      location: e.target.value === 'All Locations' ? '' : e.target.value,
                      date,
                      startTime,
                      duration: Number(duration)
                    });
                  }
                }}
                className="w-full px-3.5 py-3 text-xs sm:text-sm font-medium rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-slate-50 hover:bg-white text-slate-800 transition-colors cursor-pointer appearance-none pr-8"
              >
                {locationsList.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === 'All Locations' ? t('search.allLocations') : loc}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* 2. Date Control */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-sky-600" />
              <span>{t('search.dateLabel')}</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2.5 text-xs sm:text-sm font-medium rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-slate-50 hover:bg-white text-slate-800 transition-colors"
            />
          </div>

          {/* 3. Start Time Control */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>{t('search.timeLabel')}</span>
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2.5 text-xs sm:text-sm font-medium rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-slate-50 hover:bg-white text-slate-800 transition-colors"
            />
          </div>

          {/* 4. Parking Duration Control */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Timer className="w-4 h-4 text-sky-600" />
              <span>{t('search.durationLabel')}</span>
            </label>
            <div className="relative">
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm font-medium rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-slate-50 hover:bg-white text-slate-800 transition-colors cursor-pointer appearance-none pr-8"
              >
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="3">3 Hours</option>
                <option value="4">4 Hours</option>
                <option value="6">6 Hours</option>
                <option value="8">8 Hours (Full Day)</option>
                <option value="24">24 Hours (Overnight)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* 5. Prominent Search Parking Button */}
          <div className="lg:col-span-2 sm:col-span-2">
            <button
              type="submit"
              className="w-full py-3 sm:py-3.5 px-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Search className="w-4 h-4" />
              <span>{t('hero.findBtn')}</span>
            </button>
          </div>

        </form>

      </div>
    </section>
  );
}
