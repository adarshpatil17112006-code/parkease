import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle, QrCode, ArrowRight, Download } from 'lucide-react';

export default function BookingModal({ parking, isOpen, onClose, onBookingSuccess }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('14:00');
  const [duration, setDuration] = useState(2);
  const [vehicleType, setVehicleType] = useState('Sedan / Hatchback');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!isOpen || !parking) return null;

  const vehicleOptions = [
    { label: 'Sedan / Hatchback', icon: '🚗' },
    { label: 'SUV / Truck', icon: '🚙' },
    { label: 'Electric Vehicle (EV)', icon: '⚡' },
    { label: 'Motorcycle / Scooter', icon: '🏍️' }
  ];

  const totalCost = (parking.pricePerHour * Number(duration)).toFixed(2);
  const bookingFee = 0.50;
  const grandTotal = (Number(totalCost) + bookingFee).toFixed(2);

  const handleConfirm = (e) => {
    e.preventDefault();
    const reference = `PE-${Math.floor(100000 + Math.random() * 900000)}`;
    const bayNumber = `Bay P-${Math.floor(1 + Math.random() * 18).toString().padStart(2, '0')}`;
    const bookingDetails = {
      reference,
      parkingName: parking.name,
      location: parking.location,
      bayNumber,
      date,
      startTime,
      duration: `${duration} hour(s)`,
      vehicleType,
      vehiclePlate: vehiclePlate || 'KA-05-EX-4921',
      totalPaid: `$${grandTotal}`
    };
    setConfirmedBooking(bookingDetails);
    if (onBookingSuccess) {
      onBookingSuccess(bookingDetails);
    }
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                Sample Reservation
              </span>
              <span className="text-xs text-slate-300">Instant Hold</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              {confirmedBooking ? 'Booking Confirmed!' : `Reserve at ${parking.name}`}
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

        {/* Content */}
        <div className="p-6">
          {!confirmedBooking ? (
            <form onSubmit={handleConfirm} className="space-y-4">
              
              {/* Parking overview chip */}
              <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700">
                  <div className="font-semibold text-slate-900">{parking.name}</div>
                  <div className="text-slate-500 mt-0.5">{parking.location}</div>
                  <div className="mt-1 flex items-center gap-3 text-slate-600">
                    <span className="font-medium text-sky-700">${parking.pricePerHour.toFixed(2)}/hour</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-medium">{parking.availableSpaces} spots available</span>
                  </div>
                </div>
              </div>

              {/* Vehicle Type Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Vehicle Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {vehicleOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.label}
                      onClick={() => setVehicleType(opt.label)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                        vehicleType === opt.label
                          ? 'border-sky-500 bg-sky-50/70 text-sky-800 ring-2 ring-sky-400/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                      }`}
                    >
                      <span className="text-base">{opt.icon}</span>
                      <span className="truncate">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Start Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-600" /> Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-600" /> Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-slate-800"
                  />
                </div>
              </div>

              {/* Duration and Plate */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Duration (Hours)
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-slate-800"
                  >
                    <option value={1}>1 Hour</option>
                    <option value={2}>2 Hours</option>
                    <option value={3}>3 Hours</option>
                    <option value={4}>4 Hours</option>
                    <option value={8}>8 Hours (Full Day)</option>
                    <option value={24}>24 Hours (Overnight)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    License Plate (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. KA-05-EX-4921"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-slate-800 uppercase"
                  />
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="border-t border-dashed border-slate-200 pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Parking rate ({duration}h × ${parking.pricePerHour.toFixed(2)})</span>
                  <span className="font-semibold text-slate-800">${totalCost}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Platform service fee</span>
                  <span className="font-semibold text-slate-800">${bookingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Estimated Total</span>
                  <span className="text-sky-600">${grandTotal}</span>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="text-[11px] text-slate-400 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-600">Note:</span> This is a demonstration booking using sample data. No real payment is charged.
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-sky-600 hover:bg-sky-500 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm &amp; Generate Digital Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Digital Parking Pass View */
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Your Spot Is Reserved!</h4>
                <p className="text-xs text-slate-500 mt-0.5">Show this pass at the gate barrier or enter license plate.</p>
              </div>

              {/* Pass Card Container */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-sky-50/40 border border-sky-100 text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pass Reference</span>
                    <div className="text-sm font-extrabold text-sky-700 tracking-wide">{confirmedBooking.reference}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned Stall</span>
                    <div className="text-sm font-extrabold text-slate-900">{confirmedBooking.bayNumber}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400">Facility:</span>
                    <p className="font-semibold text-slate-800 truncate">{confirmedBooking.parkingName}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Time:</span>
                    <p className="font-semibold text-slate-800">{confirmedBooking.startTime} ({confirmedBooking.duration})</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Vehicle:</span>
                    <p className="font-semibold text-slate-800">{confirmedBooking.vehiclePlate}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Amount Paid:</span>
                    <p className="font-semibold text-emerald-600">{confirmedBooking.totalPaid}</p>
                  </div>
                </div>

                {/* Simulated QR Code */}
                <div className="pt-2 flex items-center justify-center flex-col">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm inline-block">
                    <QrCode className="w-24 h-24 text-slate-900" />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 font-mono">SCAN AT GATE BARRIER</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => alert('Demo pass downloaded to your device.')}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 bg-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Save Pass
                </button>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
