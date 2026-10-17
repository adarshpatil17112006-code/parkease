import React, { useState } from 'react';
import Hero from '../components/Hero';
import QuickSearch from '../components/QuickSearch';
import ParkingListings from '../components/ParkingListings';
import HowItWorks from '../components/HowItWorks';
import VehicleAssistance from '../components/VehicleAssistance';
import Promotions from '../components/Promotions';
import OwnerBanner from '../components/OwnerBanner';
import WhyChooseUs from '../components/WhyChooseUs';
import BookingModal from '../components/BookingModal';
import ParkingDetailsModal from '../components/ParkingDetailsModal';
import AssistanceModal from '../components/AssistanceModal';
import Toast from '../components/Toast';
import { parkingSpaces } from '../data/mockData';

export default function HomePage({
  searchQuery,
  setSearchQuery,
  onOpenListParking
}) {
  const [selectedBookingParking, setSelectedBookingParking] = useState(null);
  const [selectedDetailsParking, setSelectedDetailsParking] = useState(null);
  const [selectedAssistanceService, setSelectedAssistanceService] = useState(null);
  const [isAssistanceModalOpen, setIsAssistanceModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (title, message) => {
    setToast({ title, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Handler when quick search or hero search is triggered
  const handleHeroSearch = (query) => {
    setSearchQuery(query);
    showToast('Search Applied', `Showing sample parking spots for "${query || 'All areas'}"`);
  };

  const handleQuickFilter = (filters) => {
    setSearchQuery(filters.location);
    if (filters.location) {
      showToast('Filters Updated', `Filtered by location: ${filters.location}`);
    }
  };

  // Modal actions
  const handleBookNow = (spot) => {
    setSelectedBookingParking(spot);
  };

  const handleViewDetails = (spot) => {
    setSelectedDetailsParking(spot);
  };

  const handleRequestAssistance = (service) => {
    setSelectedAssistanceService(service);
    setIsAssistanceModalOpen(true);
  };

  const handleBookingSuccess = (booking) => {
    showToast('Reservation Successful', `Pass ${booking.reference} generated for ${booking.parkingName}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 2. Hero Section */}
      <Hero
        onSearchSubmit={handleHeroSearch}
        onOpenListParking={onOpenListParking}
      />

      {/* 3. Quick Parking Search */}
      <QuickSearch
        onFilterChange={handleQuickFilter}
        initialLocation={searchQuery}
      />

      {/* 4. Nearby Parking Spaces */}
      <ParkingListings
        parkingData={parkingSpaces}
        filterQuery={searchQuery}
        onBookNow={handleBookNow}
        onViewDetails={handleViewDetails}
      />

      {/* 5. How ParkEase Works */}
      <HowItWorks />

      {/* 6. Vehicle Assistance */}
      <VehicleAssistance
        onRequestAssistance={handleRequestAssistance}
      />

      {/* 7. Featured Promotions */}
      <Promotions />

      {/* 8. Parking Owner Banner */}
      <OwnerBanner
        onOpenListParking={onOpenListParking}
      />

      {/* 9. Why Choose ParkEase */}
      <WhyChooseUs />

      {/* Modals for Booking, Details & Assistance */}
      <BookingModal
        parking={selectedBookingParking}
        isOpen={Boolean(selectedBookingParking)}
        onClose={() => setSelectedBookingParking(null)}
        onBookingSuccess={handleBookingSuccess}
      />

      <ParkingDetailsModal
        parking={selectedDetailsParking}
        isOpen={Boolean(selectedDetailsParking)}
        onClose={() => setSelectedDetailsParking(null)}
        onBookNow={handleBookNow}
      />

      <AssistanceModal
        service={selectedAssistanceService}
        isOpen={isAssistanceModalOpen}
        onClose={() => setIsAssistanceModalOpen(false)}
      />

      {/* Feedback Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
