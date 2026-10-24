import React, { useState } from 'react';
import { X, CheckCircle2, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { submitParkingListing } from '../services/api';

export default function ListParkingModal({ isOpen, onClose }) {
  const [spaceType, setSpaceType] = useState('Private Driveway');
  const [address, setAddress] = useState('');
  const [spotsCount, setSpotsCount] = useState(1);
  const [hourlyPrice, setHourlyPrice] = useState(4);
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [hasEV, setHasEV] = useState(false);
  const [hasCCTV, setHasCCTV] = useState(true);
  const [isCovered, setIsCovered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Approximate monthly earnings calculation based on 8 hours/day and 25 days/month
  const estimatedMonthly = Math.round(hourlyPrice * 8 * 25 * spotsCount * 0.85);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitParkingListing({
        spaceType,
        address,
        spotsCount,
        hourlyPrice,
        ownerName,
        ownerEmail,
        hasEV,
        hasCCTV,
        isCovered
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('List space error:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const spaceTypes = [
    { label: 'Private Driveway', desc: 'Residential parking spot or carport' },
    { label: 'Gated Garage', desc: 'Secure covered structure with barrier' },
    { label: 'Commercial Lot', desc: 'Office or retail customer lot' },
    { label: 'Underground Stall', desc: 'Basement parking in condo/building' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                Host Portal
              </span>
              <span className="text-xs text-slate-300">Earn with ParkEase</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              {isSubmitted ? 'Listing Application Received!' : 'List Your Parking Space'}
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Earnings estimate banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50/70 border border-sky-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-sky-900">Estimated Host Earnings</div>
                  <div className="text-2xl font-black text-sky-700 mt-0.5">${estimatedMonthly} <span className="text-xs font-normal text-slate-600">/ month</span></div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Based on ~8 hrs daily utilization for {spotsCount} space(s)</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-sky-200 shadow-sm flex items-center justify-center text-sky-600">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>

              {/* Space Type Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Space Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {spaceTypes.map((type) => (
                    <button
                      type="button"
                      key={type.label}
                      onClick={() => setSpaceType(type.label)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        spaceType === type.label
                          ? 'border-sky-500 bg-sky-50/70 text-sky-900 ring-2 ring-sky-400/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{type.label}</div>
                      <div className="text-[10px] text-slate-500 truncate">{type.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Address */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Parking Space Address or Landmark
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 142 Pine Street, Downtown (Near Central Metro)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-slate-800"
                  />
                </div>
              </div>

              {/* Spots Count & Hourly Rate */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Number of Spaces
                  </label>
                  <select
                    value={spotsCount}
                    onChange={(e) => setSpotsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-slate-800"
                  >
                    <option value={1}>1 Space</option>
                    <option value={2}>2 Spaces</option>
                    <option value={3}>3 Spaces</option>
                    <option value={5}>5 Spaces</option>
                    <option value={10}>10+ Spaces (Commercial)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Hourly Price ($ / hr)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-400 text-xs">$</span>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      step={0.5}
                      value={hourlyPrice}
                      onChange={(e) => setHourlyPrice(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Amenities Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Features &amp; Amenities
                </label>
                <div className="flex flex-wrap gap-2 text-xs">
                  <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100">
                    <input
                      type="checkbox"
                      checked={hasCCTV}
                      onChange={(e) => setHasCCTV(e.target.checked)}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>24/7 CCTV Surveillance</span>
                  </label>
                  <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100">
                    <input
                      type="checkbox"
                      checked={hasEV}
                      onChange={(e) => setHasEV(e.target.checked)}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>EV Charger Attached</span>
                  </label>
                  <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100">
                    <input
                      type="checkbox"
                      checked={isCovered}
                      onChange={(e) => setIsCovered(e.target.checked)}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>Covered / Weather-Protected</span>
                  </label>
                </div>
              </div>

              {/* Owner Contact */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-slate-800"
                  />
                </div>
              </div>

              {/* Disclaimer */}
              <div className="text-[11px] text-slate-400 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-600">Sample Simulation:</span> Submitting this form activates a sample host listing review with 0% commission in the introductory period.
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'Submitting Application...' : 'Submit Space for Review'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Success confirmation */
            <div className="space-y-4 text-center py-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Application Submitted Successfully!</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Our regional onboarding team will review your spot at <b>{address || 'Downtown'}</b> and contact {ownerEmail || 'your email'} within 24 hours.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Space Type:</span>
                  <span className="font-semibold text-slate-800">{spaceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Listed Capacity:</span>
                  <span className="font-semibold text-slate-800">{spotsCount} Vehicle Spot(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Proposed Rate:</span>
                  <span className="font-semibold text-slate-800">${hourlyPrice}.00 / hour</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Est. Monthly Earnings:</span>
                  <span className="font-bold text-emerald-600">${estimatedMonthly} / mo</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white transition-colors"
              >
                Close Portal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
