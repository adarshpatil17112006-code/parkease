import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      findParking: 'Find Parking',
      vehicleAssistance: 'Vehicle Assistance',
      promotions: 'Promotions',
      howItWorks: 'How It Works',
      whyParkease: 'Why ParkEase',
      myBookings: 'My Bookings',
      listParking: 'List Your Parking',
      login: 'Login',
      register: 'Register',
      signOut: 'Sign Out'
    },
    // Hero
    hero: {
      badge: 'Smart Urban Mobility Network',
      title: 'Parking Made Easy. Every Journey.',
      subtitle: 'Skip the circling. Discover, reserve verified parking spaces instantly with dynamic digital QR passes — plus 24/7 on-demand roadside vehicle assistance.',
      searchPlaceholder: 'Search by neighborhood, street, or landmark...',
      findBtn: 'Find Parking',
      easyBooking: 'Easy Booking',
      easyBookingDesc: 'Zero wait hold',
      nearbyParking: 'Nearby Parking',
      nearbyParkingDesc: 'Verified lots',
      quickAccess: 'Quick Access',
      quickAccessDesc: 'QR barrier scan'
    },
    // Quick Search Widget
    search: {
      locationLabel: 'Location / City Area',
      dateLabel: 'Date',
      timeLabel: 'Start Time',
      durationLabel: 'Duration (Hours)',
      findParkingBtn: 'Find Available Parking',
      allLocations: 'All City Areas'
    },
    // Nearby Parking Section
    parking: {
      badge: 'Verified Parking Hubs',
      title: 'Nearby Parking Spaces',
      subtitle: 'Compare distance, real-time rates, and amenities across verified commercial garages and private bays.',
      viewDetails: 'View Details',
      bookNow: 'Book Now',
      viewAll: 'View All Facilities',
      rate: 'Rate',
      perHour: '/ hr',
      spotsAvailable: 'spots available',
      sampleData: 'Sample Data',
      evReady: 'EV Ready'
    },
    // How It Works
    howItWorks: {
      badge: 'Seamless 3-Step Experience',
      title: 'How ParkEase Works',
      subtitle: 'No more circling blocks in search of a spot. ParkEase simplifies parking into three intuitive steps.',
      step1Badge: 'Step 1',
      step1Title: 'Find Parking',
      step1Desc: 'Search for nearby spaces by street, neighborhood, or landmark. Compare real pricing and amenities.',
      step2Badge: 'Step 2',
      step2Title: 'Book Your Spot',
      step2Desc: 'Choose your preferred date, arrival time, and parking duration. Get instant confirmation with zero queues.',
      step3Badge: 'Step 3',
      step3Title: 'Park With Ease',
      step3Desc: 'Follow turn-by-turn directions to your reserved stall. Scan your digital QR pass at the barrier and enjoy your day.',
      verifiedGuaranteed: 'Verified & Guaranteed',
      readyToPark: 'Ready to park? Search available spots now'
    },
    // Roadside Assistance
    assistance: {
      badge: '24/7 Rapid Emergency Response',
      title: 'Help Is Just Around the Corner.',
      subtitle: 'Stranded with a flat tire, dead battery, or unexpected breakdown? Our network of certified mobile mechanics and tow operators is ready to roll.',
      emergencyDispatch: 'Emergency Dispatch',
      hotline: '1800-PARK-HELP',
      findService: 'Find Service',
      pricingGuarantee: 'Standardized Pricing & Certified Mechanics:',
      pricingGuaranteeDesc: 'All roadside providers are vetted, insured, and abide by transparent flat-rate pricing.',
      viewCoverage: 'View Coverage Area →',
      pageBadge: 'Rapid Emergency Vehicle Assistance',
      pageTitle: "Stranded? We're on Our Way.",
      pageSubtitle: 'From roadside flat tires and depleted batteries to heavy-duty towing and on-site mechanical diagnosis, ParkEase connects you to nearby certified units in minutes.',
      callSOS: 'Call SOS Hotline (1800-PARK-HELP)',
      requestOnline: 'Request Online Dispatch',
      capabilities: 'Assistance Capabilities',
      requestService: 'Request'
    },
    // Promotions
    promotions: {
      badge: 'Partner Perks & Discounts',
      title: 'Offers That Keep You Moving.',
      subtitle: 'Take advantage of hand-picked deals from accredited driving schools, service hubs, insurers, and EV networks.',
      autoApplied: 'Special promo codes automatically applied at checkout',
      sponsored: 'Sponsored',
      learnMore: 'Learn More',
      sponsoredOffer: 'Sponsored Offer',
      copyPromo: 'Copy Promo Code',
      closeOffer: 'Close Offer',
      codeCopied: 'Promo code copied to clipboard!'
    },
    // Host Banner & Page
    host: {
      badge: 'Host & Monetize Idle Real Estate',
      title: 'Have an Empty Parking Space?',
      subtitle: 'Turn your unused space into an earning opportunity with ParkEase.',
      monthlyPayouts: 'Monthly Payouts',
      monthlyPayoutsDesc: 'Automated direct bank deposits',
      scheduleControl: 'Total Schedule Control',
      scheduleControlDesc: 'Choose your open days & hours',
      verifiedDrivers: 'Verified Drivers',
      verifiedDriversDesc: 'ID & plate-checked bookings',
      listBtn: 'List Your Parking',
      dashboardSim: 'Host Dashboard Simulation',
      earnedMonth: '+ ₹18,500 Earned This Month',
      stall1: 'STALL #1',
      stall2: 'STALL #2',
      occupied: 'OCCUPIED (₹40/hr)',
      reserved: 'RESERVED FOR 2:30 PM',
      zeroSetup: 'Zero setup fee',
      hostShield: 'Protected by ParkEase Host Shield',
      pageBadge: 'ParkEase Host Program',
      pageTitle: 'Turn Idle Concrete into Passive Income.',
      pageSubtitle: 'Whether you own a driveway near a train station, an apartment basement stall, or a commercial parking lot, ParkEase helps you connect with vetted motorists and manage automated bookings.',
      listSpaceNow: 'List Your Space Now',
      existingLogin: 'Existing Host Login',
      calculator: 'Earnings Calculator',
      instantProjection: 'Instant Projection',
      numSpaces: 'Number of Parking Spaces:',
      hourlyRate: 'Hourly Rate:',
      projectedEarnings: 'Projected Monthly Earnings',
      perMonth: '/ month',
      utilizationNote: 'Estimated at ~8 hrs utilization per business day',
      hostPerks: 'Why Host With ParkEase?',
      guaranteedIncome: 'Predictable Monthly Revenue',
      guaranteedIncomeDesc: 'Direct deposits right to your bank account every month with automated receipts.',
      zeroEffort: 'Keyless & Contactless Operation',
      zeroEffortDesc: 'Smart QR-based entry means motorists check in smoothly without disturbing you.',
      hostInsurance: 'Host Protection Shield',
      hostInsuranceDesc: 'Comprehensive coverage against property damage with verified driver KYC.',
      automatedPayouts: 'Automated Payouts',
      automatedPayoutsDesc: 'Your earnings are transferred directly to your bank account weekly or monthly with full statement reporting.',
      hostGuarantee: 'ParkEase Host Guarantee',
      hostGuaranteeDesc: 'Every driver is identity-verified with active vehicle registration and ₹50,00,000 comprehensive property damage coverage.',
      availabilityControl: 'Complete Availability Control',
      availabilityControlDesc: 'Need your driveway for personal guests on weekends? Block dates anytime via your host dashboard in 1 click.'
    },
    // Why Choose Us
    whyUs: {
      badge: 'The Smarter Commute',
      title: 'Why Choose ParkEase',
      subtitle: 'Engineered to remove friction from every trip, offering drivers peace of mind whether parking for minutes or hours.',
      availablePlatforms: 'Available on iOS, Android & Web',
      benefit1Title: 'Easy Online Booking',
      benefit1Desc: 'Reserve a guaranteed parking stall in seconds with real-time price calculations, instant digital QR pass, and zero reservation delays.',
      benefit2Title: 'Convenient Parking Discovery',
      benefit2Desc: 'Locate close, secure parking lots, covered garages, and EV-enabled spaces matching your exact vehicle type and schedule.',
      benefit3Title: 'Flexible Parking Options',
      benefit3Desc: 'Choose hourly, daily, or extended monthly passes with easy extensions and cancellation terms tailored to urban flexibility.',
      benefit4Title: 'Vehicle Assistance Access',
      benefit4Desc: 'Get rapid roadside support including punctures, jump-starts, mechanic repairs, and certified flatbed towing on one unified platform.'
    },
    // Find Parking Page
    findParking: {
      badge: 'Explore Parking Network',
      title: 'Find & Reserve Parking',
      subtitle: 'Compare rates, distance, and real-time amenities across verified parking spaces with live map tracking.',
      splitView: 'Split View',
      gridOnly: 'Grid Only',
      mapOnly: 'Map Only',
      searchPlaceholder: 'Search by lot name, street, or landmark...',
      allLocations: 'All Locations',
      allTypes: 'All Types',
      coveredOnly: 'Covered Only',
      evCharging: 'EV Fast Charging',
      valetService: 'Valet Service',
      nearestDistance: 'Nearest Distance',
      lowestPrice: 'Lowest Price',
      highestRating: 'Highest Rating',
      showingFacilities: 'verified facilities',
      sampleDataMode: 'Sample Data Mode',
      details: 'Details',
      bookSpot: 'Book Spot'
    },
    // Footer
    footer: {
      tagline: 'ParkEase — Smart Parking & Vehicle Assistance Platform. Helping drivers discover secure, affordable parking spots and immediate 24/7 roadside mechanical support.',
      quickLinks: 'Quick Navigation',
      home: 'Home',
      findParking: 'Find Nearby Parking',
      howItWorks: 'How It Works',
      promotions: 'Sponsored Promotions',
      listSpace: 'List Your Space (Hosts)',
      driverLogin: 'Driver Account Login',
      assistanceTitle: 'Vehicle Assistance',
      mechanics: 'Mechanics & Repairs',
      puncture: 'Flat Tire & Puncture Repair',
      towing: '24/7 Flatbed Towing Service',
      battery: 'Emergency Battery Jump-Start',
      servicing: 'Scheduled Vehicle Servicing',
      sosHotline: 'SOS Hotline: 1800-PARK-HELP',
      contactTitle: 'Contact & Support',
      address: 'ParkEase Mobility Tower, 452 Grand Boulevard, Tech District',
      tollFree: '+1 (800) 727-5327 (Toll-Free)',
      email: 'support@parkease-platform.com',
      backToTop: 'Back to Top',
      rights: '© 2026 ParkEase Technologies Inc. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      samplePrototype: 'Sample Prototype'
    },
    // Booking Modal
    bookingModal: {
      reservationTitle: 'Reserve at',
      checkoutTitle: 'Secure Payment',
      passTitle: 'Booking Confirmed!',
      passIssued: 'Pass Issued',
      checkout: 'Checkout',
      reservation: 'Reservation',
      instantHold: 'Instant Digital Hold',
      step1: '1. Details',
      step2: '2. Payment',
      step3: '3. Digital Pass',
      vehicleCategory: 'Select Vehicle Category',
      date: 'Date',
      startTime: 'Start Time',
      duration: 'Duration (Hours)',
      plate: 'License Plate (Optional)',
      parkingRate: 'Parking rate',
      serviceFee: 'Platform service fee',
      totalEstimated: 'Estimated Total',
      proceedBtn: 'Proceed to Payment',
      selectPaymentMethod: 'Select Payment Method',
      totalLabel: 'Total:',
      upi: 'UPI / QR',
      upiDesc: 'Google Pay, PhonePe, Paytm',
      instantBadge: 'Instant',
      card: 'Credit / Debit',
      cardDesc: 'Visa, MasterCard, RuPay',
      netbanking: 'Net Banking',
      netbankingDesc: 'All major Indian banks',
      payAtGate: 'Pay at Gate',
      payAtGateDesc: 'Fastag / Cash on arrival',
      enterUpi: 'Enter UPI ID',
      upiNote: 'A test payment request will be simulated on confirmation.',
      cardNumber: 'Card Number',
      expiry: 'Expiry',
      cvv: 'CVV',
      sslEncrypted: '256-Bit SSL Encrypted & Verified Sandbox Checkout.',
      backBtn: 'Back',
      payBtn: 'Pay',
      verifying: 'Verifying...',
      passConfirmedTitle: 'Payment & Booking Confirmed!',
      passConfirmedSubtitle: 'Show this pass at the gate barrier or scan via license plate recognition.',
      passRef: 'Pass Reference',
      assignedStall: 'Assigned Stall',
      facility: 'Facility:',
      time: 'Time:',
      vehicle: 'Vehicle:',
      amountPaid: 'Amount Paid:',
      scanAtGate: 'SCAN AT GATE BARRIER',
      savePass: 'Save Pass',
      done: 'Done'
    },
    // My Bookings
    myBookings: {
      portalBadge: 'Driver Account Portal',
      title: 'My Reservations & Passes',
      subtitle: 'Access your digital QR parking passes, bay allocations, and booking receipts.',
      bookNew: 'Book New Spot',
      guestNotice: 'You are viewing passes saved on this browser. Sign in to permanently sync and access your reservations anywhere.',
      signInSync: 'Sign In to Sync',
      all: 'All Bookings',
      active: 'Active Passes',
      completed: 'Completed',
      cancelled: 'Cancelled',
      loading: 'Loading reservations...',
      noBookingsTitle: 'No Reservations Found',
      noBookingsDesc: 'You do not have any parking passes recorded yet.',
      exploreParking: 'Explore Available Parking',
      viewPass: 'View QR Pass',
      cancelBooking: 'Cancel Booking',
      assignedStall: 'Assigned Stall',
      date: 'Date',
      time: 'Time',
      vehicle: 'Vehicle',
      paid: 'Paid',
      digitalPassModal: 'Digital Entry Pass',
      facility: 'Facility:',
      stall: 'Stall:',
      passCode: 'Pass Code:',
      scanBarrier: 'SCAN AT ENTRY / EXIT BARRIER',
      downloadPass: 'Download Offline Pass',
      cancelModalTitle: 'Cancel Reservation?',
      cancelModalDesc: 'Are you sure you want to cancel pass {ref} at {parking}? This will free up your reserved bay.',
      keepPass: 'Keep Pass',
      yesCancel: 'Yes, Cancel',
      cancelling: 'Cancelling...'
    }
  },
  hi: {
    // Navigation
    nav: {
      home: 'होम',
      findParking: 'पार्किंग खोजें',
      vehicleAssistance: 'वाहन सहायता',
      promotions: 'ऑफ़र्स',
      howItWorks: 'कैसे काम करता है',
      whyParkease: 'पार्कईज़ क्यों',
      myBookings: 'मेरी बुकिंग्स',
      listParking: 'अपनी पार्किंग जोड़ें',
      login: 'लॉग इन',
      register: 'रजिस्टर',
      signOut: 'लॉग आउट'
    },
    // Hero
    hero: {
      badge: 'स्मार्ट शहरी मोबिलिटी नेटवर्क',
      title: 'हर सफर में आसान पार्किंग।',
      subtitle: 'पार्किंग के लिए चक्कर लगाना भूल जाइए। सत्यापित पार्किंग स्थल खोजें, आरक्षित करें और तत्काल डिजिटल क्यूआर पास प्राप्त करें — साथ ही 24/7 आपातकालीन वाहन सहायता।',
      searchPlaceholder: 'इलाका, मेट्रो स्टेशन, सड़क या लैंडमार्क खोजें...',
      findBtn: 'पार्किंग खोजें',
      easyBooking: 'आसान बुकिंग',
      easyBookingDesc: 'तुरंत कन्फर्मेशन',
      nearbyParking: 'नजदीकी पार्किंग',
      nearbyParkingDesc: 'सत्यापित स्थल',
      quickAccess: 'त्वरित प्रवेश',
      quickAccessDesc: 'क्यूआर बैरियर स्कैन'
    },
    // Quick Search Widget
    search: {
      locationLabel: 'स्थान / शहर का इलाका',
      dateLabel: 'तारीख',
      timeLabel: 'शुरुआती समय',
      durationLabel: 'अवधि (घंटे)',
      findParkingBtn: 'उपलब्ध पार्किंग खोजें',
      allLocations: 'सभी शहर इलाके'
    },
    // Nearby Parking Section
    parking: {
      badge: 'सत्यापित पार्किंग स्थल',
      title: 'नजदीकी पार्किंग सुविधाएं',
      subtitle: 'दूरी, वास्तविक समय की दरें और सुविधाओं की तुलना करें — व्यावसायिक गैरेज व निजी पार्किंग स्थल।',
      viewDetails: 'विवरण देखें',
      bookNow: 'अभी बुक करें',
      viewAll: 'सभी सुविधाएं देखें',
      rate: 'दर',
      perHour: '/ घंटा',
      spotsAvailable: 'स्थान उपलब्ध',
      sampleData: 'नमूना डेटा',
      evReady: 'ईवी चार्जिंग उपलब्ध'
    },
    // How It Works
    howItWorks: {
      badge: 'सहज 3-चरणीय अनुभव',
      title: 'पार्कईज़ कैसे काम करता है',
      subtitle: 'पार्किंग ढूंढने के लिए चक्कर लगाना बंद करें। पार्कईज़ पार्किंग को तीन आसान चरणों में सरल बनाता है।',
      step1Badge: 'चरण 1',
      step1Title: 'पार्किंग खोजें',
      step1Desc: 'सड़क, इलाके या लैंडमार्क द्वारा नजदीकी स्थान खोजें। वास्तविक कीमतों और सुविधाओं की तुलना करें।',
      step2Badge: 'चरण 2',
      step2Title: 'स्थान बुक करें',
      step2Desc: 'अपनी पसंदीदा तारीख, आगमन समय और अवधि चुनें। बिना कतार के तुरंत कन्फर्मेशन पाएं।',
      step3Badge: 'चरण 3',
      step3Title: 'आराम से पार्क करें',
      step3Desc: 'अपने आरक्षित स्टॉल तक सीधे दिशा-निर्देशों का पालन करें। गेट पर डिजिटल क्यूआर पास स्कैन करें।',
      verifiedGuaranteed: 'सत्यापित और गारंटीकृत',
      readyToPark: 'पार्क करने के लिए तैयार? अभी उपलब्ध स्थान खोजें'
    },
    // Roadside Assistance
    assistance: {
      badge: '24/7 त्वरित आपातकालीन प्रतिक्रिया',
      title: 'मदद बस आपके करीब है।',
      subtitle: 'पंचर टायर, डिस्चार्ज बैटरी या अचानक खराबी से परेशान? हमारे प्रमाणित मोबाइल मैकेनिक और टो ऑपरेटर्स आपकी मदद के लिए तैयार हैं।',
      emergencyDispatch: 'आपातकालीन सहायता',
      hotline: '1800-PARK-HELP',
      findService: 'सेवा खोजें',
      pricingGuarantee: 'मानकीकृत मूल्य और प्रमाणित मैकेनिक:',
      pricingGuaranteeDesc: 'सभी सड़क सहायता प्रदाता सत्यापित, बीमाकृत हैं और पारदर्शी निश्चित दरों का पालन करते हैं।',
      viewCoverage: 'कवरेज क्षेत्र देखें →',
      pageBadge: 'त्वरित आपातकालीन वाहन सहायता',
      pageTitle: 'सड़क पर फंसे हैं? हम रास्ते में हैं।',
      pageSubtitle: 'पंचर टायर और खाली बैटरी से लेकर टोइंग और ऑन-साइट मैकेनिक जांच तक, पार्कईज़ आपको मिनटों में नजदीकी प्रमाणित इकाइयों से जोड़ता है।',
      callSOS: 'SOS हेल्पलाइन पर कॉल करें (1800-PARK-HELP)',
      requestOnline: 'ऑनलाइन सहायता का अनुरोध करें',
      capabilities: 'सहायता क्षमताएं',
      requestService: 'अनुरोध करें'
    },
    // Promotions
    promotions: {
      badge: 'पार्टनर लाभ और छूट',
      title: 'ऑफ़र्स जो आपको आगे बढ़ाते रहें।',
      subtitle: 'मान्यता प्राप्त ड्राइविंग स्कूलों, सर्विस हब, बीमा कंपनियों और ईवी नेटवर्क से चुने हुए डील्स का लाभ उठाएं।',
      autoApplied: 'चेकआउट पर विशेष प्रोमो कोड स्वतः लागू होते हैं',
      sponsored: 'प्रायोजित',
      learnMore: 'अधिक जानें',
      sponsoredOffer: 'प्रायोजित ऑफ़र',
      copyPromo: 'प्रोमो कोड कॉपी करें',
      closeOffer: 'ऑफ़र बंद करें',
      codeCopied: 'प्रोमो कोड क्लिपबोर्ड पर कॉपी हो गया!'
    },
    // Host Banner & Page
    host: {
      badge: 'खाली संपत्ति को किराए पर दें और कमाएं',
      title: 'क्या आपके पास खाली पार्किंग स्थान है?',
      subtitle: 'पार्कईज़ के साथ अपनी अप्रयुक्त जगह को कमाई के अवसर में बदलें।',
      monthlyPayouts: 'मासिक भुगतान',
      monthlyPayoutsDesc: 'स्वचालित सीधे बैंक जमा',
      scheduleControl: 'पूरा समय नियंत्रण',
      scheduleControlDesc: 'अपने खुले दिन और घंटे चुनें',
      verifiedDrivers: 'सत्यापित ड्राइवर',
      verifiedDriversDesc: 'पहचान और नंबर प्लेट जांची गई बुकिंग्स',
      listBtn: 'अपनी पार्किंग जोड़ें',
      dashboardSim: 'होस्ट डैशबोर्ड सिमुलेशन',
      earnedMonth: '+ ₹18,500 इस महीने कमाई',
      stall1: 'स्टॉल #1',
      stall2: 'स्टॉल #2',
      occupied: 'आरक्षित (₹40/घंटा)',
      reserved: 'दोपहर 2:30 बजे आरक्षित',
      zeroSetup: 'शून्य सेटअप शुल्क',
      hostShield: 'पार्कईज़ होस्ट शील्ड द्वारा सुरक्षित',
      pageBadge: 'पार्कईज़ होस्ट प्रोग्राम',
      pageTitle: 'खाली जगह को निष्क्रिय आय में बदलें।',
      pageSubtitle: 'चाहे रेलवे स्टेशन के पास आपका ड्राइववे हो, अपार्टमेंट का बेसमेंट स्टॉल हो या व्यावसायिक पार्किंग लॉट, पार्कईज़ आपको सत्यापित ड्राइवरों से जोड़ता है।',
      listSpaceNow: 'अपनी जगह अभी जोड़ें',
      existingLogin: 'मौजूदा होस्ट लॉगिन',
      calculator: 'कमाई कैलकुलेटर',
      instantProjection: 'तत्काल अनुमान',
      numSpaces: 'पार्किंग स्थानों की संख्या:',
      hourlyRate: 'प्रति घंटा दर:',
      projectedEarnings: 'अनुमानित मासिक कमाई',
      perMonth: '/ महीना',
      utilizationNote: 'प्रत्येक कार्य दिवस में लगभग 8 घंटे उपयोग पर आधारित',
      hostPerks: 'पार्कईज़ के साथ होस्ट क्यों बनें?',
      guaranteedIncome: 'निश्चित मासिक आय',
      guaranteedIncomeDesc: 'स्वचालित रसीदों के साथ हर महीने सीधे आपके बैंक खाते में जमा।',
      zeroEffort: 'बिना चाबी और संपर्क रहित संचालन',
      zeroEffortDesc: 'स्मार्ट क्यूआर आधारित प्रवेश से ड्राइवर आपको परेशान किए बिना चेक-इन करते हैं।',
      hostInsurance: 'होस्ट सुरक्षा कवच',
      hostInsuranceDesc: 'सत्यापित ड्राइवर केवाईसी के साथ संपत्ति क्षति के खिलाफ व्यापक सुरक्षा।',
      automatedPayouts: 'स्वचालित भुगतान',
      automatedPayoutsDesc: 'आपकी कमाई साप्ताहिक या मासिक रूप से सीधे आपके बैंक खाते में पूर्ण विवरण के साथ स्थानांतरित की जाती है।',
      hostGuarantee: 'पार्कईज़ होस्ट गारंटी',
      hostGuaranteeDesc: 'प्रत्येक ड्राइवर सक्रिय वाहन पंजीकरण और ₹50,00,000 के संपत्ति सुरक्षा कवर के साथ सत्यापित होता है।',
      availabilityControl: 'उपलब्धता पर पूर्ण नियंत्रण',
      availabilityControlDesc: 'सप्ताहांत पर निजी मेहमानों के लिए जगह चाहिए? अपने होस्ट डैशबोर्ड से 1 क्लिक में कभी भी तारीखें ब्लॉक करें।'
    },
    // Why Choose Us
    whyUs: {
      badge: 'स्मार्ट यात्रा',
      title: 'पार्कईज़ क्यों चुनें',
      subtitle: 'हर यात्रा से परेशानी दूर करने के लिए डिज़ाइन किया गया, जिससे ड्राइवरों को मिनटों या घंटों की पार्किंग के लिए मानसिक शांति मिले।',
      availablePlatforms: 'iOS, Android और Web पर उपलब्ध',
      benefit1Title: 'आसान ऑनलाइन बुकिंग',
      benefit1Desc: 'वास्तविक समय मूल्य गणना, तत्काल डिजिटल क्यूआर पास और बिना किसी देरी के सेकंडों में गारंटीकृत पार्किंग स्लॉट आरक्षित करें।',
      benefit2Title: 'सुविधाजनक पार्किंग खोज',
      benefit2Desc: 'अपने वाहन के प्रकार और समय के अनुसार नजदीकी, सुरक्षित पार्किंग स्थल, ढके हुए गैरेज और ईवी चार्जिंग स्थान खोजें।',
      benefit3Title: 'लचीले पार्किंग विकल्प',
      benefit3Desc: 'शहरी आवश्यकताओं के अनुकूल आसान विस्तार और रद्दीकरण नियमों के साथ प्रति घंटा, दैनिक या मासिक पास चुनें।',
      benefit4Title: 'वाहन सहायता की सुविधा',
      benefit4Desc: 'एक ही प्लेटफ़ॉर्म पर पंचर, जंप-स्टार्ट, मैकेनिक मरम्मत और प्रमाणित टोइंग सहित त्वरित सड़क सहायता प्राप्त करें।'
    },
    // Find Parking Page
    findParking: {
      badge: 'पार्किंग नेटवर्क का अन्वेषण करें',
      title: 'पार्किंग खोजें और आरक्षित करें',
      subtitle: 'लाइव मैप ट्रैकिंग के साथ सत्यापित पार्किंग स्थलों पर दरों, दूरी और सुविधाओं की तुलना करें।',
      splitView: 'स्प्लिट व्यू',
      gridOnly: 'केवल ग्रिड',
      mapOnly: 'केवल मैप',
      searchPlaceholder: 'स्थान, सड़क या लैंडमार्क द्वारा खोजें...',
      allLocations: 'सभी स्थान',
      allTypes: 'सभी प्रकार',
      coveredOnly: 'केवल ढकी हुई (Covered)',
      evCharging: 'ईवी फास्ट चार्जिंग',
      valetService: 'वैले सेवा',
      nearestDistance: 'निकटतम दूरी',
      lowestPrice: 'सबसे कम कीमत',
      highestRating: 'सर्वोच्च रेटिंग',
      showingFacilities: 'सत्यापित सुविधाएं दिखाई जा रही हैं',
      sampleDataMode: 'डेमो डेटा मोड',
      details: 'विवरण',
      bookSpot: 'स्थान बुक करें'
    },
    // Footer
    footer: {
      tagline: 'पार्कईज़ — स्मार्ट पार्किंग और वाहन सहायता प्लेटफ़ॉर्म। ड्राइवरों को सुरक्षित, किफायती पार्किंग और 24/7 सड़क सहायता प्रदान करना।',
      quickLinks: 'त्वरित नेविगेशन',
      home: 'होम',
      findParking: 'नजदीकी पार्किंग खोजें',
      howItWorks: 'कैसे काम करता है',
      promotions: 'प्रायोजित ऑफ़र्स',
      listSpace: 'अपनी जगह जोड़ें (होस्ट)',
      driverLogin: 'ड्राइवर खाता लॉगिन',
      assistanceTitle: 'वाहन सहायता',
      mechanics: 'मैकेनिक और मरम्मत',
      puncture: 'पंचर रिपेयर',
      towing: '24/7 फ्लैटबेड टोइंग सेवा',
      battery: 'इमरजेंसी बैटरी जंप-स्टार्ट',
      servicing: 'नियमित वाहन सर्विसिंग',
      sosHotline: 'SOS हेल्पलाइन: 1800-PARK-HELP',
      contactTitle: 'संपर्क और सहायता',
      address: 'पार्कईज़ मोबिलिटी टॉवर, 452 ग्रैंड बुलेवार्ड, टेक डिस्ट्रिक्ट',
      tollFree: '+1 (800) 727-5327 (टोल-फ्री)',
      email: 'support@parkease-platform.com',
      backToTop: 'ऊपर जाएं',
      rights: '© 2026 पार्कईज़ टेक्नोलॉजीज इंक. सर्वाधिकार सुरक्षित।',
      privacy: 'गोपनीयता नीति',
      terms: 'सेवा की शर्तें',
      samplePrototype: 'डेमो प्रोटोटाइप'
    },
    // Booking Modal
    bookingModal: {
      reservationTitle: 'आरक्षण करें:',
      checkoutTitle: 'सुरक्षित भुगतान',
      passTitle: 'बुकिंग सफलतापूर्वक संपन्न!',
      passIssued: 'पास जारी किया गया',
      checkout: 'चेकआउट',
      reservation: 'आरक्षण',
      instantHold: 'तत्काल डिजिटल होल्ड',
      step1: '1. विवरण',
      step2: '2. भुगतान',
      step3: '3. डिजिटल पास',
      vehicleCategory: 'वाहन श्रेणी चुनें',
      date: 'तारीख',
      startTime: 'शुरुआती समय',
      duration: 'अवधि (घंटे)',
      plate: 'नंबर प्लेट (वैकल्पिक)',
      parkingRate: 'पार्किंग दर',
      serviceFee: 'प्लेटफ़ॉर्म सेवा शुल्क',
      totalEstimated: 'अनुमानित कुल राशि',
      proceedBtn: 'भुगतान के लिए आगे बढ़ें',
      selectPaymentMethod: 'भुगतान विधि चुनें',
      totalLabel: 'कुल राशि:',
      upi: 'यूपीआई / क्यूआर',
      upiDesc: 'Google Pay, PhonePe, Paytm',
      instantBadge: 'तुरंत',
      card: 'क्रेडिट / डेबिट कार्ड',
      cardDesc: 'Visa, MasterCard, RuPay',
      netbanking: 'नेट बैंकिंग',
      netbankingDesc: 'सभी प्रमुख भारतीय बैंक',
      payAtGate: 'गेट पर भुगतान',
      payAtGateDesc: 'फास्टैग / आगमन पर नकद',
      enterUpi: 'UPI ID दर्ज करें',
      upiNote: 'कन्फर्मेशन पर एक परीक्षण भुगतान अनुरोध तैयार किया जाएगा।',
      cardNumber: 'कार्ड नंबर',
      expiry: 'समाप्ति तिथि',
      cvv: 'CVV',
      sslEncrypted: '256-बिट एसएसएल एन्क्रिप्टेड और सुरक्षित सैंडबॉक्स चेकआउट।',
      backBtn: 'वापस जाएं',
      payBtn: 'भुगतान करें',
      verifying: 'सत्यापन जारी है...',
      passConfirmedTitle: 'भुगतान और बुकिंग कन्फर्म!',
      passConfirmedSubtitle: 'बैरियर पर यह पास दिखाएं या नंबर प्लेट से स्कैन करें।',
      passRef: 'पास संदर्भ संख्या',
      assignedStall: 'आवंटित स्टॉल',
      facility: 'सुविधा:',
      time: 'समय:',
      vehicle: 'वाहन:',
      amountPaid: 'भुगतान की गई राशि:',
      scanAtGate: 'गेट बैरियर पर स्कैन करें',
      savePass: 'पास डाउनलोड करें',
      done: 'पूर्ण'
    },
    // My Bookings
    myBookings: {
      portalBadge: 'ड्राइवर खाता पोर्टल',
      title: 'मेरी बुकिंग्स और पास',
      subtitle: 'अपने डिजिटल क्यूआर पार्किंग पास, स्टॉल आवंटन और रसीदें देखें।',
      bookNew: 'नई पार्किंग बुक करें',
      guestNotice: 'आप इस ब्राउज़र में सहेजे गए पास देख रहे हैं। अपनी बुकिंग्स को कहीं भी एक्सेस करने के लिए साइन इन करें।',
      signInSync: 'सिंक करने के लिए साइन इन करें',
      all: 'सभी बुकिंग्स',
      active: 'सक्रिय पास',
      completed: 'पूर्ण बुकिंग्स',
      cancelled: 'रद्द बुकिंग्स',
      loading: 'बुकिंग्स लोड हो रही हैं...',
      noBookingsTitle: 'कोई आरक्षण नहीं मिला',
      noBookingsDesc: 'इस श्रेणी में अभी तक कोई पार्किंग पास उपलब्ध नहीं है।',
      exploreParking: 'उपलब्ध पार्किंग खोजें',
      viewPass: 'क्यूआर पास देखें',
      cancelBooking: 'बुकिंग रद्द करें',
      assignedStall: 'आवंटित स्टॉल',
      date: 'तारीख',
      time: 'समय',
      vehicle: 'वाहन',
      paid: 'भुगतान',
      digitalPassModal: 'डिजिटल एंट्री पास',
      facility: 'सुविधा:',
      stall: 'स्टॉल:',
      passCode: 'पास कोड:',
      scanBarrier: 'प्रवेश / निकास बैरियर पर स्कैन करें',
      downloadPass: 'ऑफ़लाइन पास डाउनलोड करें',
      cancelModalTitle: 'आरक्षण रद्द करें?',
      cancelModalDesc: 'क्या आप निश्चित रूप से {parking} पर पास {ref} रद्द करना चाहते हैं? इससे आपका आरक्षित स्टॉल खाली हो जाएगा।',
      keepPass: 'पास रखें',
      yesCancel: 'हाँ, रद्द करें',
      cancelling: 'रद्द किया जा रहा है...'
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('parkease_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('parkease_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  // Helper function to resolve dot-notation keys: e.g. t('nav.home')
  const t = (path, params = {}) => {
    const keys = path.split('.');
    let current = translations[language];
    for (const key of keys) {
      if (!current || current[key] === undefined) {
        // Fallback to English
        let fallback = translations['en'];
        for (const fKey of keys) {
          if (!fallback || fallback[fKey] === undefined) {
            current = path;
            break;
          }
          fallback = fallback[fKey];
        }
        current = fallback || path;
        break;
      }
      current = current[key];
    }

    if (typeof current === 'string' && Object.keys(params).length > 0) {
      let str = current;
      for (const [k, v] of Object.entries(params)) {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
      }
      return str;
    }

    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// oxlint-disable-next-line react/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
