import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbDir = path.join(__dirname, '../data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'parkease.db');

let dbInstance = null;

export async function getDb() {
  if (dbInstance) return dbInstance;

  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Enable foreign keys
  await dbInstance.run('PRAGMA foreign_keys = ON;');

  return dbInstance;
}

export async function initDb() {
  const db = await getDb();

  // Create Users Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT,
      role TEXT NOT NULL DEFAULT 'driver', -- 'driver' | 'owner'
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Create Parking Spaces Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS parking_spaces (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      area TEXT NOT NULL,
      price_per_hour REAL NOT NULL,
      available_spaces INTEGER NOT NULL,
      total_spaces INTEGER NOT NULL,
      distance TEXT,
      opening_hours TEXT,
      rating REAL DEFAULT 4.8,
      reviews_count INTEGER DEFAULT 0,
      type TEXT NOT NULL,
      is_covered INTEGER DEFAULT 1,
      has_ev INTEGER DEFAULT 0,
      has_cctv INTEGER DEFAULT 1,
      has_disabled_access INTEGER DEFAULT 1,
      image TEXT,
      description TEXT,
      owner_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
    );
  `);

  // Create Bookings Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reference TEXT UNIQUE NOT NULL,
      user_id INTEGER,
      parking_id INTEGER NOT NULL,
      parking_name TEXT NOT NULL,
      parking_location TEXT NOT NULL,
      bay_number TEXT NOT NULL,
      booking_date TEXT NOT NULL,
      start_time TEXT NOT NULL,
      duration TEXT NOT NULL,
      vehicle_type TEXT NOT NULL,
      vehicle_plate TEXT NOT NULL,
      total_price REAL NOT NULL,
      status TEXT DEFAULT 'confirmed', -- 'confirmed' | 'active' | 'completed' | 'cancelled'
      qr_data TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
      FOREIGN KEY (parking_id) REFERENCES parking_spaces(id) ON DELETE CASCADE
    );
  `);

  // Create Assistance Requests Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS assistance_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      service_name TEXT NOT NULL,
      user_location TEXT NOT NULL,
      vehicle_model TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'dispatched', -- 'pending' | 'dispatched' | 'en_route' | 'completed'
      assigned_technician TEXT,
      estimated_arrival TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    );
  `);

  // Create Promotions Table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS promotions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      business_name TEXT NOT NULL,
      offer TEXT NOT NULL,
      location TEXT NOT NULL,
      rating REAL DEFAULT 4.8,
      badge TEXT,
      image TEXT,
      contact TEXT,
      tagline TEXT,
      promo_code TEXT DEFAULT 'PARKEASE2026',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default demo data if empty
  await seedDefaultData(db);

  return db;
}

async function seedDefaultData(db) {
  // Check if users exist
  const userCount = await db.get('SELECT COUNT(*) as count FROM users');
  if (userCount.count === 0) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    // Seed Driver User
    await db.run(
      `INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)`,
      'Alex Rivera',
      'alex.rivera@example.com',
      hashedPassword,
      '+1 (555) 234-8899',
      'driver'
    );

    // Seed Space Host User
    await db.run(
      `INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)`,
      'Downtown Host Co.',
      'host@parkease.com',
      hashedPassword,
      '+1 (555) 888-4321',
      'owner'
    );
    console.log('✔ Default demo users created.');
  }

  // Check if parking spaces exist
  const spaceCount = await db.get('SELECT COUNT(*) as count FROM parking_spaces');
  if (spaceCount.count === 0) {
    const defaultSpaces = [
      {
        name: 'Downtown Plaza Garage',
        location: 'Downtown Metro Center, 4th Ave',
        area: 'Downtown',
        price_per_hour: 40.0,
        available_spaces: 14,
        total_spaces: 45,
        distance: '0.3 miles away',
        opening_hours: 'Open 24/7',
        rating: 4.8,
        reviews_count: 312,
        type: 'Covered Garage',
        is_covered: 1,
        has_ev: 1,
        has_cctv: 1,
        has_disabled_access: 1,
        image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
        description: 'Multi-level secure parking complex with direct pedestrian access to downtown shopping and transit hub.'
      },
      {
        name: 'Metro Central Underground',
        location: 'Central Station concourse, Gate B',
        area: 'City Center',
        price_per_hour: 35.0,
        available_spaces: 8,
        total_spaces: 60,
        distance: '0.5 miles away',
        opening_hours: '5:00 AM - Midnight',
        rating: 4.6,
        reviews_count: 198,
        type: 'Underground',
        is_covered: 1,
        has_ev: 0,
        has_cctv: 1,
        has_disabled_access: 1,
        image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
        description: 'Direct underground connection to high-speed rail and subway. Height limit 2.1m. Monitored 24/7.'
      },
      {
        name: 'Harbor Bay Waterfront Lot',
        location: 'Pier 21 Promenade, Bayview',
        area: 'Waterfront',
        price_per_hour: 50.0,
        available_spaces: 22,
        total_spaces: 80,
        distance: '0.8 miles away',
        opening_hours: 'Open 24/7',
        rating: 4.9,
        reviews_count: 420,
        type: 'Open Lot',
        is_covered: 0,
        has_ev: 1,
        has_cctv: 1,
        has_disabled_access: 1,
        image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80',
        description: 'Spacious outdoor parking adjacent to waterfront dining and scenic ferry terminals. Wide bays for SUVs.'
      },
      {
        name: 'Financial Tower Executive Deck',
        location: '120 Market Street, Financial District',
        area: 'Financial District',
        price_per_hour: 60.0,
        available_spaces: 5,
        total_spaces: 35,
        distance: '1.1 miles away',
        opening_hours: '6:00 AM - 11:00 PM',
        rating: 4.9,
        reviews_count: 156,
        type: 'Valet & Covered',
        is_covered: 1,
        has_ev: 1,
        has_cctv: 1,
        has_disabled_access: 1,
        image: 'https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=800&q=80',
        description: 'Premium corporate parking facility with valet check-in, license plate recognition, and detail bay.'
      },
      {
        name: 'Tech Boulevard Smart Hub',
        location: 'Innovation District, Building 7',
        area: 'Tech Park',
        price_per_hour: 30.0,
        available_spaces: 19,
        total_spaces: 70,
        distance: '1.4 miles away',
        opening_hours: 'Open 24/7',
        rating: 4.7,
        reviews_count: 264,
        type: 'Smart EV Hub',
        is_covered: 1,
        has_ev: 1,
        has_cctv: 1,
        has_disabled_access: 1,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        description: 'Eco-friendly solar-powered facility with 16 rapid Level-3 DC EV chargers and app-guided bay lighting.'
      },
      {
        name: 'Grand Avenue Secure Lot',
        location: '88 Grand Avenue, Arts District',
        area: 'Arts District',
        price_per_hour: 40.0,
        available_spaces: 11,
        total_spaces: 50,
        distance: '1.7 miles away',
        opening_hours: 'Open 24/7',
        rating: 4.5,
        reviews_count: 142,
        type: 'Gated Surface Lot',
        is_covered: 0,
        has_ev: 0,
        has_cctv: 1,
        has_disabled_access: 1,
        image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
        description: 'Gated, illuminated perimeter lot within walking distance of galleries, theatres, and concert halls.'
      }
    ];

    for (const space of defaultSpaces) {
      await db.run(
        `INSERT INTO parking_spaces (
          name, location, area, price_per_hour, available_spaces, total_spaces,
          distance, opening_hours, rating, reviews_count, type,
          is_covered, has_ev, has_cctv, has_disabled_access, image, description
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        space.name, space.location, space.area, space.price_per_hour, space.available_spaces, space.total_spaces,
        space.distance, space.opening_hours, space.rating, space.reviews_count, space.type,
        space.is_covered, space.has_ev, space.has_cctv, space.has_disabled_access, space.image, space.description
      );
    }
    console.log('✔ Initial parking spaces seeded.');
  }

  // Check if promotions exist
  const promoCount = await db.get('SELECT COUNT(*) as count FROM promotions');
  if (promoCount.count === 0) {
    const defaultPromos = [
      {
        category: 'Driving Schools',
        business_name: 'Apex Pro Driving Academy',
        offer: 'Flat 20% OFF on Beginner & Defensive Driving Courses + Free Practice Test',
        location: 'Metro City • 4 Branches',
        rating: 4.9,
        badge: 'Special Student Offer',
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80',
        contact: '1800-APEX-DRIVE',
        tagline: 'Dual-control vehicles & RMS certified instructors',
        promo_code: 'APEX20'
      },
      {
        category: 'Car & Bike Garages',
        business_name: 'TurboTune Auto & Moto Care',
        offer: 'Complimentary 25-Point Safety Inspection with any Full Synthetic Oil Service',
        location: 'Industrial Park & Downtown West',
        rating: 4.8,
        badge: 'Free Inspection',
        image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
        contact: '0800-TURBOTUNE',
        tagline: 'Specialists in European & Japanese sedans & superbikes',
        promo_code: 'TURBOFREE'
      },
      {
        category: 'Vehicle Servicing Centres',
        business_name: 'Precision Lube & Detail Hub',
        offer: 'Save ₹450 on Complete Engine Flush, AC Decontamination & Ceramic Wash',
        location: 'Midtown Express Blvd',
        rating: 4.7,
        badge: 'Seasonal Deal',
        image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=600&q=80',
        contact: '0800-PRECISION',
        tagline: 'Eco-friendly waterless wash & advanced detailing studio',
        promo_code: 'PRECISION45'
      },
      {
        category: 'Vehicle Insurance Providers',
        business_name: 'ShieldDrive Motor Insurance',
        offer: 'Get up to ₹1,500 Cashback on New Comprehensive Policies + Zero Dep Cover',
        location: 'Online Nationwide & City Offices',
        rating: 4.9,
        badge: 'Cashback Rebate',
        image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
        contact: 'claims@shielddrive.com',
        tagline: 'Instant digital policy issuance & 30-min cashless claims',
        promo_code: 'SHIELD150'
      },
      {
        category: 'EV Charging Stations',
        business_name: 'VoltGrid UltraFast Network',
        offer: '30 Minutes Free High-Speed Charging when you book any ParkEase stall',
        location: 'Over 65 Hubs Citywide',
        rating: 4.8,
        badge: 'ParkEase Exclusive',
        image: 'https://images.unsplash.com/photo-1558441719-f53835e5d3fc?auto=format&fit=crop&w=600&q=80',
        contact: 'support@voltgrid.io',
        tagline: 'Up to 350kW CCS2 & NACS connectors with 99.9% uptime',
        promo_code: 'VOLTFREE30'
      }
    ];

    for (const promo of defaultPromos) {
      await db.run(
        `INSERT INTO promotions (
          category, business_name, offer, location, rating, badge, image, contact, tagline, promo_code
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        promo.category, promo.business_name, promo.offer, promo.location, promo.rating,
        promo.badge, promo.image, promo.contact, promo.tagline, promo.promo_code
      );
    }
    console.log('✔ Initial promotions seeded.');
  }
}
