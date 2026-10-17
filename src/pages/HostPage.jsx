import React, { useState } from 'react';
import { DollarSign, ShieldCheck, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import ListParkingModal from '../components/ListParkingModal';

export default function HostPage({ onOpenAuth }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calculatorSpots, setCalculatorSpots] = useState(1);
  const [calculatorRate, setCalculatorRate] = useState(4.5);

  const estimatedMonthly = Math.round(calculatorSpots * calculatorRate * 8 * 25 * 0.85);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 mb-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ParkEase Host Program</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Turn Idle Concrete into Passive Income.
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether you own a driveway near a train station, an apartment basement stall, or a commercial parking lot, ParkEase helps you connect with vetted motorists and manage automated bookings.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-7 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>List Your Space Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAuth('login')}
                  className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all cursor-pointer"
                >
                  Existing Host Login
                </button>
              </div>
            </div>

            {/* Interactive Host Earnings Estimator Widget */}
            <div className="lg:col-span-5 bg-slate-800/90 p-6 rounded-3xl border border-slate-700 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Earnings Calculator</span>
                <span className="text-[11px] text-sky-400 font-bold bg-sky-950 px-2.5 py-0.5 rounded-full border border-sky-800">
                  Instant Projection
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Number of Parking Spaces:</span>
                  <span className="font-bold text-white">{calculatorSpots} Space(s)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={calculatorSpots}
                  onChange={(e) => setCalculatorSpots(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Hourly Rate:</span>
                  <span className="font-bold text-white">${calculatorRate.toFixed(2)} / hour</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="15"
                  step="0.5"
                  value={calculatorRate}
                  onChange={(e) => setCalculatorRate(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 text-center">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Projected Monthly Earnings</span>
                <div className="text-3xl font-black text-sky-400 mt-1">
                  ${estimatedMonthly} <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Estimated at ~8 hrs utilization per business day</p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Start Listing This Space
              </button>
            </div>

          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Automated Payouts</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your earnings are transferred directly to your bank account weekly or monthly with full statement reporting.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">ParkEase Host Guarantee</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every driver is identity-verified with active vehicle registration and $1,000,000 property damage coverage.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Complete Availability Control</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Need your driveway for personal guests on weekends? Block dates anytime via your host dashboard in 1 click.
            </p>
          </div>
        </div>

      </div>

      <ListParkingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
