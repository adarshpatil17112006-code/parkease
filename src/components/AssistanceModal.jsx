import React, { useState } from 'react';
import { X, Wrench, Disc, Truck, Zap, ShieldCheck, PhoneCall, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { submitAssistanceRequest } from '../services/api';

export default function AssistanceModal({ service, isOpen, onClose }) {
  const [selectedService, setSelectedService] = useState(service ? service.name : 'Mechanics and Repairs');
  const [userLocation, setUserLocation] = useState('Current GPS: Market Street & 4th Ave');
  const [vehicleModel, setVehicleModel] = useState('Honda Civic / 2022');
  const [issueDescription, setIssueDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 234-8899');
  const [isDispatched, setIsDispatched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dispatchInfo, setDispatchInfo] = useState(null);

  if (!isOpen) return null;

  const servicesList = [
    { name: 'Mechanics and Repairs', icon: Wrench, eta: '15-25 min' },
    { name: 'Puncture Repair', icon: Disc, eta: '10-20 min' },
    { name: 'Towing Services', icon: Truck, eta: '20-30 min' },
    { name: 'Battery Jump-Start', icon: Zap, eta: '10-15 min' },
    { name: 'Vehicle Servicing', icon: ShieldCheck, eta: 'Scheduled' }
  ];

  const handleDispatch = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await submitAssistanceRequest({
        serviceName: selectedService,
        userLocation,
        vehicleModel,
        phoneNumber,
        description: issueDescription
      });
      setDispatchInfo(response.request);
      setIsDispatched(true);
    } catch (err) {
      console.error('Dispatch error:', err);
      setIsDispatched(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsDispatched(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-slate-900 to-sky-950 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                24/7 Roadside Network
              </span>
              <span className="text-xs text-slate-300">Live Assistance</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              {isDispatched ? 'Assistance Unit En Route!' : 'Request Emergency Assistance'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isDispatched ? (
            <form onSubmit={handleDispatch} className="space-y-4">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Required Service
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {servicesList.map((srv) => {
                    const Icon = srv.icon;
                    return (
                      <button
                        type="button"
                        key={srv.name}
                        onClick={() => setSelectedService(srv.name)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                          selectedService === srv.name
                            ? 'border-sky-500 bg-sky-50 text-sky-900 ring-2 ring-sky-400/20'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-bold leading-tight truncate">{srv.name}</div>
                          <div className="text-[10px] text-slate-500">{srv.eta}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Your Current Vehicle Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-rose-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Enter street, landmark or parking lot name"
                    value={userLocation}
                    onChange={(e) => setUserLocation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-800"
                  />
                </div>
              </div>

              {/* Vehicle & Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Vehicle Model
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Toyota Corolla / White"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Direct Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-800"
                  />
                </div>
              </div>

              {/* Issue Description */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Brief Issue Description (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Flat front-left tire, engine won't crank, keys locked inside..."
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-800"
                />
              </div>

              {/* Emergency Hotline Banner */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-amber-900 font-medium">
                  <PhoneCall className="w-4 h-4 text-amber-600" />
                  <span>Immediate Life-Safety Emergency? Call 911</span>
                </div>
                <span className="font-bold text-amber-800">Toll Free: 1800-PARK-HELP</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-sky-600 hover:bg-sky-500 disabled:opacity-60 text-white shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'Contacting Dispatch Center...' : `Dispatch Nearest ${selectedService} Unit`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Dispatch Confirmation View */
            <div className="text-center py-2 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Technician Dispatched!</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Assigned Provider: <b>ParkEase Rapid Response Unit #42</b>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-slate-800">{selectedService}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Estimated Arrival:</span>
                  <span className="font-extrabold text-sky-600">{dispatchInfo?.estimatedArrival || '12 - 18 Minutes'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Technician Name:</span>
                  <span className="font-medium text-slate-800">{dispatchInfo?.assignedTechnician || 'Marcus Sterling (Certified ID: #9832)'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Destination:</span>
                  <span className="font-medium text-slate-800 truncate max-w-[200px]">{userLocation}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => alert(`Calling Dispatcher at 1800-PARK-HELP...`)}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-800 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-sky-600" /> Call Technician
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white transition-colors"
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
