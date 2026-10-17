import React from 'react';
import { CheckCircle2, Navigation, Zap, Shield, Clock } from 'lucide-react';

export default function HeroIllustration() {
  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none flex items-center justify-center p-2 sm:p-4">
      {/* Soft background glow circles (minimal, no excessive glow) */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-sky-200/40 via-blue-100/30 to-indigo-100/40 rounded-3xl blur-2xl -z-10" />

      {/* Main Illustration Card Container */}
      <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-xl border border-sky-100/80 relative overflow-hidden">
        
        {/* Top Control Bar of Mock Map UI */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
            <span className="ml-2 text-xs font-semibold text-slate-500">Live Smart Lot Preview</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available Stalls: 14</span>
          </div>
        </div>

        {/* Detailed SVG Parking & Map Illustration */}
        <div className="relative w-full rounded-2xl bg-slate-900 overflow-hidden shadow-inner aspect-[16/11]">
          <svg
            viewBox="0 0 600 420"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="carBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="carGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e0f2fe" />
                <stop offset="100%" stopColor="#7dd3fc" />
              </linearGradient>
              <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.8" opacity="0.4" />
              </pattern>
            </defs>

            {/* Base Lot Floor */}
            <rect width="600" height="420" fill="url(#roadGrad)" />
            <rect width="600" height="420" fill="url(#gridPattern)" />

            {/* Driving Lane / Access Road */}
            <path d="M 0 210 Q 300 210 600 210" stroke="#475569" strokeWidth="60" fill="none" />
            <path d="M 0 210 L 600 210" stroke="#f8fafc" strokeWidth="2.5" strokeDasharray="14 12" fill="none" opacity="0.75" />

            {/* Directional Guide Arrows */}
            <g fill="#94a3b8" opacity="0.6">
              <polygon points="120,205 150,210 120,215" />
              <polygon points="420,205 450,210 420,215" />
            </g>

            {/* TOP ROW PARKING BAYS */}
            {/* Bay 1: Reserved */}
            <g transform="translate(60, 40)">
              <rect x="0" y="0" width="100" height="130" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
              <text x="50" y="24" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">BAY P-01</text>
              <rect x="18" y="45" width="64" height="24" rx="4" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1" />
              <text x="50" y="61" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">RESERVED</text>
              <circle cx="50" cy="95" r="4" fill="#38bdf8" />
            </g>

            {/* Bay 2: Parked Blue Car */}
            <g transform="translate(180, 40)">
              <rect x="0" y="0" width="100" height="130" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
              <text x="50" y="24" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">BAY P-02</text>
              
              {/* Top View Car Vector */}
              <g transform="translate(20, 32)">
                {/* Car Shadow */}
                <rect x="2" y="4" width="56" height="88" rx="14" fill="#020617" opacity="0.7" />
                {/* Wheels */}
                <rect x="-3" y="14" width="8" height="16" rx="3" fill="#0f172a" />
                <rect x="55" y="14" width="8" height="16" rx="3" fill="#0f172a" />
                <rect x="-3" y="60" width="8" height="16" rx="3" fill="#0f172a" />
                <rect x="55" y="60" width="8" height="16" rx="3" fill="#0f172a" />
                {/* Car Body */}
                <rect x="0" y="0" width="60" height="88" rx="14" fill="url(#carBody)" stroke="#bae6fd" strokeWidth="1" />
                {/* Windshield */}
                <path d="M 8 26 L 52 26 L 46 40 L 14 40 Z" fill="url(#carGlass)" />
                {/* Rear Window */}
                <path d="M 12 70 L 48 70 L 44 80 L 16 80 Z" fill="url(#carGlass)" />
                {/* Sunroof */}
                <rect x="18" y="46" width="24" height="18" rx="3" fill="#0369a1" />
                {/* Headlights */}
                <rect x="6" y="2" width="10" height="4" rx="2" fill="#fef08a" />
                <rect x="44" y="2" width="10" height="4" rx="2" fill="#fef08a" />
              </g>
            </g>

            {/* Bay 3: Active EV Bay */}
            <g transform="translate(300, 40)">
              <rect x="0" y="0" width="100" height="130" rx="8" fill="#134e4a" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" />
              <text x="50" y="24" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">EV RAPID P-03</text>
              {/* EV Charging Station Icon */}
              <circle cx="50" cy="65" r="18" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
              <path d="M 52 55 L 44 67 L 50 67 L 48 76 L 56 64 L 50 64 Z" fill="#34d399" />
              <text x="50" y="105" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">FREE TO BOOK</text>
            </g>

            {/* Bay 4: Available */}
            <g transform="translate(420, 40)">
              <rect x="0" y="0" width="100" height="130" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="50" y="24" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">BAY P-04</text>
              <circle cx="50" cy="70" r="14" fill="#1e40af" fillOpacity="0.4" stroke="#60a5fa" strokeWidth="1" />
              <text x="50" y="74" fill="#93c5fd" fontSize="12" fontWeight="bold" textAnchor="middle">P</text>
              <text x="50" y="104" fill="#93c5fd" fontSize="9" textAnchor="middle">$4.50 / hr</text>
            </g>

            {/* BOTTOM ROW PARKING BAYS */}
            {/* Bay 5 */}
            <g transform="translate(60, 250)">
              <rect x="0" y="0" width="100" height="130" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
              <text x="50" y="118" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">BAY P-05</text>
              {/* White Sedan Silhouette */}
              <g transform="translate(20, 16)">
                <rect x="2" y="4" width="56" height="88" rx="14" fill="#020617" opacity="0.7" />
                <rect x="-3" y="14" width="8" height="16" rx="3" fill="#0f172a" />
                <rect x="55" y="14" width="8" height="16" rx="3" fill="#0f172a" />
                <rect x="-3" y="60" width="8" height="16" rx="3" fill="#0f172a" />
                <rect x="55" y="60" width="8" height="16" rx="3" fill="#0f172a" />
                <rect x="0" y="0" width="60" height="88" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                <path d="M 8 26 L 52 26 L 46 40 L 14 40 Z" fill="#94a3b8" />
                <path d="M 12 70 L 48 70 L 44 80 L 16 80 Z" fill="#94a3b8" />
              </g>
            </g>

            {/* Bay 6: Sensor Available */}
            <g transform="translate(180, 250)">
              <rect x="0" y="0" width="100" height="130" rx="8" fill="#042f2e" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
              <text x="50" y="118" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">BAY P-06</text>
              <circle cx="50" cy="55" r="16" fill="#10b981" fillOpacity="0.2" stroke="#34d399" strokeWidth="1.5" />
              <text x="50" y="59" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">OPEN</text>
              <text x="50" y="85" fill="#a7f3d0" fontSize="9" textAnchor="middle">Sensors Active</text>
            </g>

            {/* Bay 7 */}
            <g transform="translate(300, 250)">
              <rect x="0" y="0" width="100" height="130" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
              <text x="50" y="118" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">BAY P-07</text>
              <circle cx="50" cy="55" r="12" fill="#334155" />
              <text x="50" y="59" fill="#94a3b8" fontSize="10" textAnchor="middle">24/7</text>
            </g>

            {/* Bay 8: Valet */}
            <g transform="translate(420, 250)">
              <rect x="0" y="0" width="100" height="130" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
              <text x="50" y="118" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">BAY P-08</text>
              <rect x="18" y="45" width="64" height="24" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1" />
              <text x="50" y="61" fill="#cbd5e1" fontSize="10" fontWeight="semibold" textAnchor="middle">VALET</text>
            </g>

            {/* Big Pulsing Location Pin Over Bay 1 */}
            <g transform="translate(110, 48)">
              {/* Pin Shadow */}
              <ellipse cx="0" cy="54" rx="12" ry="4" fill="#000000" opacity="0.4" />
              {/* Pin Body */}
              <path
                d="M 0 0 C -14 0 -22 8 -22 20 C -22 34 0 52 0 52 C 0 52 22 34 22 20 C 22 8 14 0 0 0 Z"
                fill="#38bdf8"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <circle cx="0" cy="18" r="8" fill="#0f172a" />
              <text x="0" y="22" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">P</text>
            </g>
          </svg>
        </div>

        {/* Live Status Ticker below the preview */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 px-1">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-sky-500" />
            <span>Real-time bay sync active</span>
          </span>
          <span className="flex items-center gap-1 font-medium text-slate-700">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>Guaranteed Spot Hold</span>
          </span>
        </div>
      </div>

      {/* Floating Card 1: Easy Booking (Top-Left / Top-Right depending on screen) */}
      <div className="absolute -top-3 -left-3 sm:-left-6 bg-white rounded-2xl p-3 shadow-lg border border-sky-100 flex items-center gap-3 animate-fade-in hover:scale-105 transition-transform duration-200">
        <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-900">Easy Booking</div>
          <div className="text-[11px] text-slate-500">Instant QR Access & Pass</div>
        </div>
      </div>

      {/* Floating Card 2: Nearby Parking (Bottom-Left) */}
      <div className="absolute -bottom-4 -left-2 sm:left-2 bg-white rounded-2xl p-3 shadow-lg border border-sky-100 flex items-center gap-3 hover:scale-105 transition-transform duration-200">
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
          <Navigation className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-900">Nearby Parking</div>
          <div className="text-[11px] text-slate-500">Spaces within 0.3 miles</div>
        </div>
      </div>

      {/* Floating Card 3: Quick Access (Bottom-Right) */}
      <div className="absolute -bottom-3 -right-2 sm:-right-4 bg-white rounded-2xl p-3 shadow-lg border border-sky-100 flex items-center gap-3 hover:scale-105 transition-transform duration-200">
        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-900">Quick Access</div>
          <div className="text-[11px] text-slate-500">Automated gate entry</div>
        </div>
      </div>

    </div>
  );
}
