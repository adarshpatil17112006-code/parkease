import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Navigation, Zap, LayoutGrid, Map as MapIcon, Columns2 } from 'lucide-react';
import { parkingSpaces, locationsList } from '../data/mockData';
import { fetchParkingSpaces } from '../services/api';
import BookingModal from '../components/BookingModal';
import ParkingDetailsModal from '../components/ParkingDetailsModal';
import ParkingMap from '../components/ParkingMap';

export default function FindParkingPage() {
  const [spacesList, setSpacesList] = useState(parkingSpaces);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('distance'); // 'distance' | 'price' | 'rating'
  const [viewMode, setViewMode] = useState('split'); // 'grid' | 'map' | 'split'
  const [selectedSpotId, setSelectedSpotId] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await fetchParkingSpaces();
      if (data && data.length > 0) {
        setSpacesList(data);
      }
    }
    load();
  }, []);

  const filteredListings = spacesList
    .filter((spot) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        !query ||
        spot.name.toLowerCase().includes(query) ||
        spot.location.toLowerCase().includes(query) ||
        spot.area.toLowerCase().includes(query);

      const matchesLocation =
        selectedLocation === 'All Locations' ||
        spot.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        spot.area.toLowerCase().includes(selectedLocation.toLowerCase());

      let matchesType = true;
      if (selectedType === 'Covered') matchesType = spot.isCovered;
      if (selectedType === 'EV Charging') matchesType = spot.hasEV;
      if (selectedType === 'Valet') matchesType = spot.type.toLowerCase().includes('valet');

      return matchesSearch && matchesLocation && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.pricePerHour - b.pricePerHour;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: parse distance
      const distA = parseFloat(a.distance);
      const distB = parseFloat(b.distance);
      return distA - distB;
    });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-2">
              <span>Explore Parking Network</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Find &amp; Reserve Parking
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Compare rates, distance, and real-time amenities across verified parking spaces with live map tracking.
            </p>
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="inline-flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-xs self-start md:self-auto">
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'split'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Split View</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grid Only</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'map'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Map Only</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200/80 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by lot name, street, or landmark..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
              />
            </div>

            {/* Location Select */}
            <div className="md:col-span-3">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-slate-800"
              >
                {locationsList.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Parking Type */}
            <div className="md:col-span-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-slate-800"
              >
                <option value="All">All Types</option>
                <option value="Covered">Covered Only</option>
                <option value="EV Charging">EV Fast Charging</option>
                <option value="Valet">Valet Service</option>
              </select>
            </div>

            {/* Sort */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-slate-800"
              >
                <option value="distance">Nearest Distance</option>
                <option value="price">Lowest Price</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>

          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Showing <b>{filteredListings.length}</b> verified facilities</span>
            <span className="text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
              Sample Data Mode
            </span>
          </div>
        </div>

        {/* Render View Modes */}
        {viewMode === 'map' && (
          <div className="h-[620px] w-full rounded-3xl overflow-hidden shadow-sm">
            <ParkingMap
              spaces={filteredListings}
              selectedSpotId={selectedSpotId}
              onSelectSpot={(spot) => setSelectedSpotId(spot.id)}
              onBookSpot={(spot) => setSelectedBooking(spot)}
            />
          </div>
        )}

        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Scrollable Cards (5 cols) */}
            <div className="lg:col-span-6 space-y-4 max-h-[720px] overflow-y-auto pr-1">
              {filteredListings.map((spot) => (
                <div
                  key={spot.id}
                  onMouseEnter={() => setSelectedSpotId(spot.id)}
                  onClick={() => setSelectedSpotId(spot.id)}
                  className={`bg-white rounded-3xl border transition-all p-4 flex flex-col sm:flex-row gap-4 cursor-pointer ${
                    selectedSpotId === spot.id
                      ? 'border-sky-500 ring-2 ring-sky-400/20 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="sm:w-36 h-32 rounded-2xl overflow-hidden relative shrink-0">
                    <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold bg-white/95 text-slate-800">
                      {spot.type}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400" /> {spot.rating}
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Navigation className="w-3 h-3 text-sky-500" /> {spot.distance}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">{spot.name}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{spot.location}</span>
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-2">
                      <div>
                        <span className="text-sm font-extrabold text-slate-900">${spot.pricePerHour.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-400"> / hr</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDetails(spot);
                          }}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Details
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBooking(spot);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-bold shadow-xs"
                        >
                          Book Spot
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Sticky Interactive Map (6 cols) */}
            <div className="lg:col-span-6 lg:sticky lg:top-24 h-[550px] lg:h-[720px]">
              <ParkingMap
                spaces={filteredListings}
                selectedSpotId={selectedSpotId}
                onSelectSpot={(spot) => setSelectedSpotId(spot.id)}
                onBookSpot={(spot) => setSelectedBooking(spot)}
              />
            </div>
          </div>
        )}

        {viewMode === 'grid' && (
          /* Listings Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((spot) => (
              <div
                key={spot.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-sky-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full">
                    <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white/95 text-slate-800">
                        {spot.type}
                      </span>
                      {spot.hasEV && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500 text-white flex items-center gap-1">
                          <Zap className="w-3 h-3" /> EV Ready
                        </span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900/70 text-slate-200">
                        Sample Data
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{spot.rating}</span>
                        <span className="text-slate-400 font-normal">({spot.reviewsCount})</span>
                      </div>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Navigation className="w-3 h-3 text-sky-500" />
                        {spot.distance}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{spot.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{spot.location}</span>
                    </p>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                      <span className="text-emerald-700 font-semibold">{spot.availableSpaces} spots available</span>
                      <span className="text-slate-500 font-medium">{spot.openingHours}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-2">
                  <div className="flex items-baseline justify-between mb-3 pt-3">
                    <span className="text-xs text-slate-500">Rate</span>
                    <div>
                      <span className="text-lg font-extrabold text-slate-900">${spot.pricePerHour.toFixed(2)}</span>
                      <span className="text-xs text-slate-500"> / hr</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedDetails(spot)}
                      className="py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => setSelectedBooking(spot)}
                      className="py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-xs"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <BookingModal
        parking={selectedBooking}
        isOpen={Boolean(selectedBooking)}
        onClose={() => setSelectedBooking(null)}
      />

      <ParkingDetailsModal
        parking={selectedDetails}
        isOpen={Boolean(selectedDetails)}
        onClose={() => setSelectedDetails(null)}
        onBookNow={(spot) => setSelectedBooking(spot)}
      />
    </div>
  );
}
