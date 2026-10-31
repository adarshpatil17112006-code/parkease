import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Download,
  AlertCircle,
  Car,
  CreditCard,
  ArrowRight
} from 'lucide-react';
import { fetchMyBookings, cancelBooking } from '../services/api';

export default function MyBookingsPage({ onOpenAuth, currentUser }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed' | 'cancelled'
  const [selectedPass, setSelectedPass] = useState(null);
  const [cancelModalBooking, setCancelModalBooking] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchMyBookings();
      setBookings(data);
      setLoading(false);
    }
    load();
  }, [currentUser]);

  const handleCancelConfirm = async () => {
    if (!cancelModalBooking) return;
    setIsCancelling(true);
    await cancelBooking(cancelModalBooking.id || cancelModalBooking.reference);
    setBookings((prev) =>
      prev.map((b) =>
        b.reference === cancelModalBooking.reference ? { ...b, status: 'cancelled' } : b
      )
    );
    setIsCancelling(false);
    setCancelModalBooking(null);
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'active') return b.status === 'confirmed' || !b.status;
    if (filter === 'completed') return b.status === 'completed';
    if (filter === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-2">
              <span>Driver Account Portal</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              My Reservations &amp; Passes
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Access your digital QR parking passes, bay allocations, and booking receipts.
            </p>
          </div>

          <Link
            to="/find-parking"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all self-start sm:self-auto cursor-pointer"
          >
            <span>Book New Spot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Guest Sync Banner */}
        {!currentUser && (
          <div className="mb-6 p-3.5 rounded-2xl bg-sky-50 border border-sky-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <span className="text-sky-900 font-medium">
              You are viewing passes saved on this browser. Sign in to permanently sync and access your reservations anywhere.
            </span>
            <button
              onClick={() => onOpenAuth('login')}
              className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold shrink-0 transition-colors cursor-pointer"
            >
              Sign In to Sync
            </button>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200/80 pb-3">
          {[
            { id: 'all', label: 'All Bookings' },
            { id: 'active', label: 'Active Passes' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Loading reservations...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-4 max-w-md mx-auto my-8">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
              <Car className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">No Reservations Found</h3>
              <p className="text-xs text-slate-500 mt-1">
                You do not have any {filter !== 'all' ? filter : ''} parking passes recorded yet.
              </p>
            </div>
            <Link
              to="/find-parking"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold"
            >
              <span>Explore Available Parking</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredBookings.map((b) => {
              const isCancelled = b.status === 'cancelled';
              const isCompleted = b.status === 'completed';

              return (
                <div
                  key={b.reference || b.id}
                  className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  {/* Top Bar */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-sky-700 tracking-wide">
                          {b.reference}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            isCancelled
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : isCompleted
                              ? 'bg-slate-100 text-slate-600'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {isCancelled ? 'Cancelled' : isCompleted ? 'Completed' : 'Active Pass'}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-1">{b.parkingName}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{b.location}</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Assigned Stall
                      </span>
                      <span className="text-sm font-extrabold text-slate-900 px-2.5 py-1 rounded-lg bg-slate-100 inline-block mt-0.5">
                        {b.bayNumber || 'Bay Assigned'}
                      </span>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs py-3 border-y border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[11px] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-sky-600" /> Date
                      </span>
                      <span className="font-semibold text-slate-800">{b.date || 'Today'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-sky-600" /> Time
                      </span>
                      <span className="font-semibold text-slate-800">{b.startTime} ({b.duration})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px] flex items-center gap-1">
                        <Car className="w-3 h-3 text-sky-600" /> Vehicle
                      </span>
                      <span className="font-semibold text-slate-800 uppercase truncate block">
                        {b.vehiclePlate || 'KA-05-EX-4921'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px] flex items-center gap-1">
                        <CreditCard className="w-3 h-3 text-sky-600" /> Paid
                      </span>
                      <span className="font-bold text-emerald-600">{b.totalPaid || '₹50.00'}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setSelectedPass(b)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>View QR Pass</span>
                    </button>

                    {!isCancelled && !isCompleted && (
                      <button
                        onClick={() => setCancelModalBooking(b)}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* QR Pass Inspection Modal */}
      {selectedPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-100 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-700 tracking-wider uppercase">
                Digital Entry Pass
              </span>
              <button
                onClick={() => setSelectedPass(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-500">Facility:</span>
                <span className="text-xs font-bold text-slate-900">{selectedPass.parkingName}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-500">Stall:</span>
                <span className="text-xs font-extrabold text-sky-700">{selectedPass.bayNumber}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-500">Vehicle:</span>
                <span className="text-xs font-semibold text-slate-800 uppercase">{selectedPass.vehiclePlate}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-500">Pass Code:</span>
                <span className="text-xs font-mono font-bold text-slate-800">{selectedPass.reference}</span>
              </div>
            </div>

            <div className="py-2 flex flex-col items-center">
              <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm inline-block">
                {selectedPass.qrCode ? (
                  <img src={selectedPass.qrCode} alt="Pass QR" className="w-40 h-40 object-contain" />
                ) : (
                  <QrCode className="w-36 h-36 text-slate-900" />
                )}
              </div>
              <span className="text-[10px] text-slate-400 font-mono mt-2">
                SCAN AT ENTRY / EXIT BARRIER
              </span>
            </div>

            <button
              onClick={() => {
                alert(`Pass ${selectedPass.reference} saved.`);
                setSelectedPass(null);
              }}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Offline Pass</span>
            </button>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Cancel Reservation?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to cancel pass <b>{cancelModalBooking.reference}</b> at {cancelModalBooking.parkingName}? This will free up your reserved bay.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setCancelModalBooking(null)}
                className="py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Keep Pass
              </button>
              <button
                onClick={handleCancelConfirm}
                disabled={isCancelling}
                className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-xs"
              >
                {isCancelling ? 'Cancelling...' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
