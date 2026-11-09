import React, { useState } from 'react';
import { MapPin, Clock, Navigation, Zap, Star, Info, ChevronRight, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ParkingListings({ parkingData, filterQuery, onBookNow, onViewDetails }) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  // Filter based on location search query and category
  const filteredSpots = parkingData.filter((spot) => {
    // Location search matching
    const query = (filterQuery || '').toLowerCase().trim();
    const matchesLocation =
      !query ||
      spot.name.toLowerCase().includes(query) ||
      spot.location.toLowerCase().includes(query) ||
      spot.area.toLowerCase().includes(query);

    // Category matching
    let matchesCategory = true;
    if (activeCategory === 'Covered') matchesCategory = spot.isCovered;
    else if (activeCategory === 'EV Charging') matchesCategory = spot.hasEV;
    else if (activeCategory === 'Valet') matchesCategory = spot.type.toLowerCase().includes('valet');

    return matchesLocation && matchesCategory;
  });

  // Limit display to 3 or 4 cards initially, expandable with "View All Parking"
  const displayedSpots = showAll ? filteredSpots : filteredSpots.slice(0, 4);

  const categories = ['All', 'Covered', 'EV Charging', 'Valet'];

  return (
    <section id="find-parking" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-bold mb-2">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              <span>{t('parking.badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('parking.title')}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              {t('parking.subtitle')}
            </p>
          </div>

          {/* Sample Data Disclaimer Tag */}
          <div className="flex flex-col sm:items-end gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-800 text-xs font-medium">
              <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{t('parking.sampleData')}</span>
            </div>
            
            {filterQuery && (
              <div className="text-xs text-slate-500">
                Filtering by location: <b className="text-slate-900">"{filterQuery}"</b> ({filteredSpots.length} found)
              </div>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Parking Cards Grid */}
        {displayedSpots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedSpots.map((spot) => (
              <div
                key={spot.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col group"
              >
                {/* Card Image Container with Badges */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs">
                      {spot.type}
                    </span>
                    {spot.hasEV && (
                      <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-emerald-500 text-white shadow-xs flex items-center gap-1">
                        <Zap className="w-3 h-3" /> EV Ready
                      </span>
                    )}
                  </div>

                  {/* Sample Data Watermark Tag on Image */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-900/70 text-slate-200 backdrop-blur-xs border border-white/20">
                      Sample Data
                    </span>
                  </div>

                  {/* Bottom Image Stats (Distance & Available Spaces) */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 font-semibold drop-shadow-sm">
                      <Navigation className="w-3.5 h-3.5 text-sky-400" />
                      {spot.distance}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600/90 text-white font-bold text-[11px] shadow-sm">
                      {spot.availableSpaces} spots left
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Rating and Hours */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{spot.rating}</span>
                        <span className="text-slate-400 font-normal">({spot.reviewsCount})</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 font-medium">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{spot.openingHours}</span>
                      </div>
                    </div>

                    {/* Parking Name */}
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-sky-700 transition-colors">
                      {spot.name}
                    </h3>

                    {/* Location */}
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{spot.location}</span>
                    </p>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-500">{t('parking.rate')}</span>
                      <div className="text-right">
                        <span className="text-lg font-extrabold text-slate-900">₹{spot.pricePerHour.toFixed(2)}</span>
                        <span className="text-xs text-slate-500 font-medium"> {t('parking.perHour')}</span>
                      </div>
                    </div>

                    {/* Button Group: View Details and Book Now */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onViewDetails(spot)}
                        className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t('parking.viewDetails')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onBookNow(spot)}
                        className="py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-xs hover:shadow transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>{t('parking.bookNow')}</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="p-10 text-center bg-white rounded-3xl border border-slate-200">
            <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-900">No Parking Spaces Found</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find any spots matching "{filterQuery}". Try searching for Downtown, Waterfront, or clear your filters.
            </p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-4 px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-500"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* View All Parking Link / Expand Toggle */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-sm font-bold border border-slate-200 shadow-2xs transition-all cursor-pointer"
          >
            <span>{showAll ? 'Show Fewer Spots' : t('parking.viewAll')}</span>
            <ChevronRight className={`w-4 h-4 transition-transform ${showAll ? '-rotate-90' : 'rotate-90'}`} />
          </button>
        </div>

      </div>
    </section>
  );
}
