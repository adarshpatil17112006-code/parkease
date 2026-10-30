import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  QrCode,
  ArrowRight,
  ArrowLeft,
  Download,
  CreditCard,
  Smartphone,
  Building2,
  Banknote,
  ShieldCheck
} from 'lucide-react';
import { submitBooking } from '../services/api';

export default function BookingModal({ parking, isOpen, onClose, onBookingSuccess }) {
  const [step, setStep] = useState(1); // 1 = Details, 2 = Payment, 3 = Confirmed Pass
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('14:00');
  const [duration, setDuration] = useState(2);
  const [vehicleType, setVehicleType] = useState('Sedan / Hatchback');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'pay_at_gate'
  const [upiId, setUpiId] = useState('alex.rivera@okaxis');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('882');
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleConfirmPayment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await submitBooking({
        parkingId: parking.id || parking.dbId,
        parkingName: parking.name,
        location: parking.location,
        pricePerHour: parking.pricePerHour,
        date,
        startTime,
        duration: Number(duration),
        vehicleType,
        vehiclePlate: vehiclePlate || 'KA-05-EX-4921',
        paymentMethod:
          paymentMethod === 'upi'
            ? 'UPI (Google Pay/PhonePe)'
            : paymentMethod === 'card'
            ? 'Credit/Debit Card'
            : paymentMethod === 'netbanking'
            ? 'Net Banking'
            : 'Pay at Barrier'
      });
      const b = response.booking;
      setConfirmedBooking(b);
      setStep(3);
      if (onBookingSuccess) {
        onBookingSuccess(b);
      }
    } catch (err) {
      console.error('Booking submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
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
                {step === 3 ? 'Pass Issued' : step === 2 ? 'Checkout' : 'Reservation'}
              </span>
              <span className="text-xs text-slate-300">Instant Digital Hold</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              {step === 3
                ? 'Booking Confirmed!'
                : step === 2
                ? 'Secure Payment'
                : `Reserve at ${parking.name}`}
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-3 bg-slate-100/70 border-b border-slate-200 text-[11px] font-bold text-center">
          <div className={`py-2 border-r border-slate-200 ${step >= 1 ? 'bg-sky-50 text-sky-700 font-extrabold' : 'text-slate-400'}`}>
            1. Details
          </div>
          <div className={`py-2 border-r border-slate-200 ${step >= 2 ? 'bg-sky-50 text-sky-700 font-extrabold' : 'text-slate-400'}`}>
            2. Payment
          </div>
          <div className={`py-2 ${step === 3 ? 'bg-emerald-50 text-emerald-700 font-extrabold' : 'text-slate-400'}`}>
            3. Digital Pass
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            /* STEP 1: Details Form */
            <form onSubmit={handleProceedToPayment} className="space-y-4">
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
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
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

              {/* Submit Button to Step 2 */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-sky-600 hover:bg-sky-500 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Payment (${grandTotal})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 2 && (
            /* STEP 2: Payment Gateway Selection */
            <form onSubmit={handleConfirmPayment} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Payment Method
                </span>
                <span className="text-xs font-extrabold text-sky-600">Total: ${grandTotal}</span>
              </div>

              {/* Payment Methods Grid */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-sky-500 bg-sky-50/80 text-sky-900 ring-2 ring-sky-400/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Smartphone className="w-5 h-5 text-sky-600" />
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">Instant</span>
                  </div>
                  <span className="text-xs font-bold">UPI / QR</span>
                  <span className="text-[10px] text-slate-500">Google Pay, PhonePe, Paytm</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-sky-500 bg-sky-50/80 text-sky-900 ring-2 ring-sky-400/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard className="w-5 h-5 text-sky-600" />
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-700">Card</span>
                  </div>
                  <span className="text-xs font-bold">Credit / Debit</span>
                  <span className="text-[10px] text-slate-500">Visa, MasterCard, RuPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'netbanking'
                      ? 'border-sky-500 bg-sky-50/80 text-sky-900 ring-2 ring-sky-400/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-sky-600 mb-2" />
                  <span className="text-xs font-bold">Net Banking</span>
                  <span className="text-[10px] text-slate-500">All major Indian banks</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('pay_at_gate')}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'pay_at_gate'
                      ? 'border-sky-500 bg-sky-50/80 text-sky-900 ring-2 ring-sky-400/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-sky-600 mb-2" />
                  <span className="text-xs font-bold">Pay at Gate</span>
                  <span className="text-[10px] text-slate-500">Fastag / Cash on arrival</span>
                </button>
              </div>

              {/* Dynamic Payment Details Input */}
              {paymentMethod === 'upi' && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="block text-xs font-medium text-slate-700">Enter UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@okhdfcbank"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    A test payment request will be simulated on confirmation.
                  </span>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Expiry</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Badge */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-[11px] border border-emerald-200/60">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>256-Bit SSL Encrypted &amp; Verified Sandbox Checkout.</span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-700 bg-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-4 rounded-xl font-bold text-xs bg-sky-600 hover:bg-sky-500 disabled:opacity-60 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Verifying...' : `Pay $${grandTotal}`}</span>
                  <CheckCircle className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 3 && confirmedBooking && (
            /* STEP 3: Digital Parking Pass View */
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Payment &amp; Booking Confirmed!</h4>
                <p className="text-xs text-slate-500 mt-0.5">Show this pass at the gate barrier or scan via license plate recognition.</p>
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

                {/* Real Server-Generated QR Code */}
                <div className="pt-2 flex items-center justify-center flex-col">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm inline-block">
                    {confirmedBooking.qrCode ? (
                      <img
                        src={confirmedBooking.qrCode}
                        alt={`Pass ${confirmedBooking.reference}`}
                        className="w-24 h-24 object-contain"
                      />
                    ) : (
                      <QrCode className="w-24 h-24 text-slate-900" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 font-mono">SCAN AT GATE BARRIER</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => alert(`Pass ${confirmedBooking.reference} saved to your device.`)}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 bg-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Save Pass
                </button>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white transition-colors cursor-pointer"
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
