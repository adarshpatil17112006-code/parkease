import React from 'react';
import { X, MapPin, Clock, CheckCircle, ArrowRight } from 'lucide-react';

export default function ParkingDetailsModal({ parking, isOpen, onClose, onBookNow }) {
  if (!isOpen || !parking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative h-56 w-full bg-slate-900">
          <img
            src={parking.image}
            alt={parking.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on image */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-sky-500 text-white">
                {parking.type}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/50 text-slate-200 border border-white/20">
                Sample Data
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white">{parking.name}</h3>
            <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>{parking.location}</span>
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Rate</span>
              <span className="text-base font-extrabold text-slate-900">${parking.pricePerHour.toFixed(2)}/hr</span>
            </div>
            <div className="border-x border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Available</span>
              <span className="text-base font-extrabold text-emerald-600">{parking.availableSpaces} Spots</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Distance</span>
              <span className="text-base font-extrabold text-sky-600">{parking.distance}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">Facility Overview</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {parking.description}
            </p>
          </div>

          {/* Amenities & Features */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Amenities Included</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>24/7 Security &amp; CCTV</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Automated Barrier Pass</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Handicapped Accessible</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{parking.hasEV ? 'High-Speed EV Chargers' : 'Wide SUV Stalls'}</span>
              </div>
            </div>
          </div>

          {/* Hours & Access Rules */}
          <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs text-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600" />
              <span><b>Operating Hours:</b> {parking.openingHours}</span>
            </div>
            <span className="font-semibold text-sky-700">Max Height: 2.2m</span>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookNow(parking);
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Book Spot Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
