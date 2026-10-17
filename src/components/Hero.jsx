import React, { useState } from 'react';
import { MapPin, Search, ArrowRight, ShieldCheck, Car, Sparkles } from 'lucide-react';
import HeroIllustration from './HeroIllustration';

export default function Hero({ onSearchSubmit, onOpenListParking }) {
  const [heroLocation, setHeroLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(heroLocation);
    }
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

  const popularLocations = ['Downtown Metro', 'Financial District', 'Airport Terminal', 'Harbor Bay'];

  return (
    <section id="home" className="relative bg-gradient-to-b from-sky-100/70 via-sky-50/50 to-white pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden border-b border-sky-100/60">
      
      {/* Subtle background geo accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Subtitle, Search, CTA */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-xs border border-sky-200 text-sky-800 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <span>Smart Parking &amp; 24/7 Roadside Assistance</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Parking Made Easy. <br />
              <span className="bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
                Every Journey.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Find nearby parking, book your spot in seconds, and get reliable vehicle assistance whenever you need it.
            </p>

            {/* Hero Location Search Bar */}
            <div className="max-w-xl mx-auto lg:mx-0">
              <form
                onSubmit={handleSearch}
                className="p-2 sm:p-2.5 bg-white rounded-2xl sm:rounded-3xl shadow-md border border-sky-200/80 flex flex-col sm:flex-row items-center gap-2 transition-shadow focus-within:shadow-lg focus-within:border-sky-400"
              >
                <div className="flex items-center gap-2.5 w-full px-3 py-1.5">
                  <MapPin className="w-5 h-5 text-sky-600 shrink-0" />
                  <input
                    type="text"
                    value={heroLocation}
                    onChange={(e) => setHeroLocation(e.target.value)}
                    placeholder="Where are you heading? (e.g. Downtown Metro)"
                    className="w-full text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full sm:w-auto shrink-0 px-6 py-3 rounded-xl sm:rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Find Parking</span>
                </button>
              </form>

              {/* Quick suggestions */}
              <div className="mt-3 flex flex-wrap items-center justify-center lg:justify-start gap-1.5 text-xs text-slate-500">
                <span className="font-medium text-slate-400">Popular:</span>
                {popularLocations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setHeroLocation(loc);
                      if (onSearchSubmit) onSearchSubmit(loc);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-slate-600 hover:text-sky-700 border border-slate-200/60 shadow-2xs transition-colors"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons: Primary & Secondary */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#find-parking"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Find Nearby Parking</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <button
                type="button"
                onClick={onOpenListParking}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>List Your Parking</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 border-t border-sky-100 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Secure Locations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Car className="w-4 h-4 text-sky-600" />
                <span>Guaranteed Bay Hold</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Roadside Help On-Demand</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Parking Illustration & Floating Badges */}
          <div className="lg:col-span-5 relative">
            <HeroIllustration />
          </div>

        </div>
      </div>
    </section>
  );
}
