export const parkingSpaces = [
  {
    id: 'park-1',
    name: 'Downtown Plaza Garage',
    location: 'Downtown Metro Center, 4th Ave',
    area: 'Downtown',
    pricePerHour: 40.0,
    availableSpaces: 14,
    totalSpaces: 45,
    distance: '0.3 miles away',
    openingHours: 'Open 24/7',
    rating: 4.8,
    reviewsCount: 312,
    type: 'Covered Garage',
    isCovered: true,
    hasEV: true,
    hasCCTV: true,
    hasDisabledAccess: true,
    latitude: 12.9752,
    longitude: 77.5985,
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    description: 'Multi-level secure parking complex with direct pedestrian access to downtown shopping and transit hub.'
  },
  {
    id: 'park-2',
    name: 'Metro Central Underground',
    location: 'Central Station concourse, Gate B',
    area: 'City Center',
    pricePerHour: 35.0,
    availableSpaces: 8,
    totalSpaces: 60,
    distance: '0.5 miles away',
    openingHours: '5:00 AM - Midnight',
    rating: 4.6,
    reviewsCount: 198,
    type: 'Underground',
    isCovered: true,
    hasEV: false,
    hasCCTV: true,
    hasDisabledAccess: true,
    latitude: 12.9785,
    longitude: 77.6030,
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
    description: 'Direct underground connection to high-speed rail and subway. Height limit 2.1m. Monitored 24/7.'
  },
  {
    id: 'park-3',
    name: 'Harbor Bay Waterfront Lot',
    location: 'Pier 21 Promenade, Bayview',
    area: 'Waterfront',
    pricePerHour: 50.0,
    availableSpaces: 22,
    totalSpaces: 80,
    distance: '0.8 miles away',
    openingHours: 'Open 24/7',
    rating: 4.9,
    reviewsCount: 420,
    type: 'Open Lot',
    isCovered: false,
    hasEV: true,
    hasCCTV: true,
    hasDisabledAccess: true,
    latitude: 12.9695,
    longitude: 77.6105,
    image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80',
    description: 'Spacious outdoor parking adjacent to waterfront dining and scenic ferry terminals. Wide bays for SUVs.'
  },
  {
    id: 'park-4',
    name: 'Financial Tower Executive Deck',
    location: '120 Market Street, Financial District',
    area: 'Financial District',
    pricePerHour: 60.0,
    availableSpaces: 5,
    totalSpaces: 35,
    distance: '1.1 miles away',
    openingHours: '6:00 AM - 11:00 PM',
    rating: 4.9,
    reviewsCount: 156,
    type: 'Valet & Covered',
    isCovered: true,
    hasEV: true,
    hasCCTV: true,
    hasDisabledAccess: true,
    latitude: 12.9658,
    longitude: 77.5942,
    image: 'https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=800&q=80',
    description: 'Premium corporate parking facility with valet check-in, license plate recognition, and detail bay.'
  },
  {
    id: 'park-5',
    name: 'Tech Boulevard Smart Hub',
    location: 'Innovation District, Building 7',
    area: 'Tech Park',
    pricePerHour: 30.0,
    availableSpaces: 19,
    totalSpaces: 70,
    distance: '1.4 miles away',
    openingHours: 'Open 24/7',
    rating: 4.7,
    reviewsCount: 264,
    type: 'Smart EV Hub',
    isCovered: true,
    hasEV: true,
    hasCCTV: true,
    hasDisabledAccess: true,
    latitude: 12.9825,
    longitude: 77.6152,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    description: 'Eco-friendly solar-powered facility with 16 rapid Level-3 DC EV chargers and app-guided bay lighting.'
  },
  {
    id: 'park-6',
    name: 'Grand Avenue Secure Lot',
    location: '88 Grand Avenue, Arts District',
    area: 'Arts District',
    pricePerHour: 40.0,
    availableSpaces: 11,
    totalSpaces: 50,
    distance: '1.7 miles away',
    openingHours: 'Open 24/7',
    rating: 4.5,
    reviewsCount: 142,
    type: 'Gated Surface Lot',
    isCovered: false,
    hasEV: false,
    hasCCTV: true,
    hasDisabledAccess: true,
    latitude: 12.9620,
    longitude: 77.6055,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    description: 'Gated, illuminated perimeter lot within walking distance of galleries, theatres, and concert halls.'
  }
];

export const assistanceServices = [
  {
    id: 'service-1',
    name: 'Mechanics and Repairs',
    shortDesc: 'Certified mobile mechanics for engine diagnostics, overheating, brake issues, and urgent fixes.',
    responseTime: '15-25 min ETA',
    iconName: 'Wrench',
    badge: 'Popular',
    features: ['On-site Diagnostics', 'Certified Technicians', 'Upfront Estimates']
  },
  {
    id: 'service-2',
    name: 'Puncture Repair',
    shortDesc: 'Rapid mobile tire change, puncture plug repairs, and portable pressure inflation right where you are.',
    responseTime: '10-20 min ETA',
    iconName: 'Disc',
    badge: 'Fast Dispatch',
    features: ['Tire Swaps', 'Bead & Valve Sealing', 'Spare Mounting']
  },
  {
    id: 'service-3',
    name: 'Towing Services',
    shortDesc: 'Flatbed and wheel-lift towing for cars, SUVs, and motorbikes with safe transit to your preferred garage.',
    responseTime: '20-30 min ETA',
    iconName: 'Truck',
    badge: '24/7 Available',
    features: ['Flatbed Towing', 'Accident Recovery', 'Long-distance Tow']
  },
  {
    id: 'service-4',
    name: 'Battery Jump-Start',
    shortDesc: 'Instant booster pack jump-start, alternator output testing, and urgent battery replacements.',
    responseTime: '10-15 min ETA',
    iconName: 'Zap',
    badge: 'Express',
    features: ['Heavy-duty Boosters', 'Voltage Testing', 'Replacement on Demand']
  },
  {
    id: 'service-5',
    name: 'Vehicle Servicing',
    shortDesc: 'Doorstep routine maintenance, oil & filter replenishment, fluids top-up, and multipoint safety checks.',
    responseTime: 'Scheduled or Same-Day',
    iconName: 'ShieldCheck',
    badge: 'Comprehensive',
    features: ['Complete Fluid Check', 'Filter Replacements', 'Digital Health Report']
  }
];

export const sponsoredPromotions = [
  {
    id: 'promo-1',
    category: 'Driving Schools',
    businessName: 'Apex Pro Driving Academy',
    offer: 'Flat 20% OFF on Beginner & Defensive Driving Courses + Free Practice Test',
    location: 'Metro City • 4 Branches',
    rating: 4.9,
    badge: 'Special Student Offer',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80',
    contact: '1800-APEX-DRIVE',
    tagline: 'Dual-control vehicles & RMS certified instructors'
  },
  {
    id: 'promo-2',
    category: 'Car & Bike Garages',
    businessName: 'TurboTune Auto & Moto Care',
    offer: 'Complimentary 25-Point Safety Inspection with any Full Synthetic Oil Service',
    location: 'Industrial Park & Downtown West',
    rating: 4.8,
    badge: 'Free Inspection',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    contact: '0800-TURBOTUNE',
    tagline: 'Specialists in European & Japanese sedans & superbikes'
  },
  {
    id: 'promo-3',
    category: 'Vehicle Servicing Centres',
    businessName: 'Precision Lube & Detail Hub',
    offer: 'Save ₹450 on Complete Engine Flush, AC Decontamination & Ceramic Wash',
    location: 'Midtown Express Blvd',
    rating: 4.7,
    badge: 'Seasonal Deal',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=600&q=80',
    contact: '0800-PRECISION',
    tagline: 'Eco-friendly waterless wash & advanced detailing studio'
  },
  {
    id: 'promo-4',
    category: 'Vehicle Insurance Providers',
    businessName: 'ShieldDrive Motor Insurance',
    offer: 'Get up to ₹1,500 Cashback on New Comprehensive Policies + Zero Dep Cover',
    location: 'Online Nationwide & City Offices',
    rating: 4.9,
    badge: 'Cashback Rebate',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    contact: 'claims@shielddrive.com',
    tagline: 'Instant digital policy issuance & 30-min cashless claims'
  },
  {
    id: 'promo-5',
    category: 'EV Charging Stations',
    businessName: 'VoltGrid UltraFast Network',
    offer: '30 Minutes Free High-Speed Charging when you book any ParkEase stall',
    location: 'Over 65 Hubs Citywide',
    rating: 4.8,
    badge: 'ParkEase Exclusive',
    image: 'https://images.unsplash.com/photo-1558441719-f53835e5d3fc?auto=format&fit=crop&w=600&q=80',
    contact: 'support@voltgrid.io',
    tagline: 'Up to 350kW CCS2 & NACS connectors with 99.9% uptime'
  }
];

export const platformBenefits = [
  {
    id: 'benefit-1',
    title: 'Easy Online Booking',
    desc: 'Reserve a guaranteed parking stall in seconds with real-time price calculations, instant digital QR pass, and zero reservation delays.',
    iconName: 'Smartphone'
  },
  {
    id: 'benefit-2',
    title: 'Convenient Parking Discovery',
    desc: 'Locate close, secure parking lots, covered garages, and EV-enabled spaces matching your exact vehicle type and schedule.',
    iconName: 'Compass'
  },
  {
    id: 'benefit-3',
    title: 'Flexible Parking Options',
    desc: 'Choose hourly, daily, or extended monthly passes with easy extensions and cancellation terms tailored to urban flexibility.',
    iconName: 'Clock'
  },
  {
    id: 'benefit-4',
    title: 'Vehicle Assistance Access',
    desc: 'Get rapid roadside support including punctures, jump-starts, mechanic repairs, and certified flatbed towing on one unified platform.',
    iconName: 'Shield'
  }
];

export const locationsList = [
  'All Locations',
  'Downtown Metro',
  'City Center',
  'Waterfront Pier',
  'Financial District',
  'Tech Park Innovation',
  'Arts District'
];
