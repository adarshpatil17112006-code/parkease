import { getDb } from '../config/db.js';

export async function getAllParkingSpaces(req, res) {
  try {
    const { search, category, area, sort } = req.query;
    const db = await getDb();

    let query = 'SELECT * FROM parking_spaces WHERE 1=1';
    const params = [];

    if (search) {
      const searchTerm = `%${search.trim().toLowerCase()}%`;
      query += ' AND (LOWER(name) LIKE ? OR LOWER(location) LIKE ? OR LOWER(area) LIKE ?)';
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (area && area !== 'All Locations') {
      query += ' AND (LOWER(area) LIKE ? OR LOWER(location) LIKE ?)';
      params.push(`%${area.toLowerCase()}%`, `%${area.toLowerCase()}%`);
    }

    if (category && category !== 'All') {
      if (category === 'Covered') {
        query += ' AND is_covered = 1';
      } else if (category === 'EV Charging') {
        query += ' AND has_ev = 1';
      } else if (category === 'Valet') {
        query += " AND LOWER(type) LIKE '%valet%'";
      }
    }

    if (sort === 'price') {
      query += ' ORDER BY price_per_hour ASC';
    } else if (sort === 'rating') {
      query += ' ORDER BY rating DESC';
    } else {
      query += ' ORDER BY id ASC';
    }

    const rows = await db.all(query, ...params);

    // Format boolean columns for frontend convenience
    const spaces = rows.map((r) => ({
      id: `park-${r.id}`,
      dbId: r.id,
      name: r.name,
      location: r.location,
      area: r.area,
      pricePerHour: r.price_per_hour,
      availableSpaces: r.available_spaces,
      totalSpaces: r.total_spaces,
      distance: r.distance || 'Nearby',
      openingHours: r.opening_hours || '24/7 Access',
      rating: r.rating,
      reviewsCount: r.reviews_count,
      type: r.type,
      isCovered: Boolean(r.is_covered),
      hasEV: Boolean(r.has_ev),
      hasCCTV: Boolean(r.has_cctv),
      hasDisabledAccess: Boolean(r.has_disabled_access),
      image: r.image || 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
      description: r.description
    }));

    res.json({ count: spaces.length, spaces });
  } catch (error) {
    console.error('getAllParkingSpaces error:', error);
    res.status(500).json({ error: 'Server error retrieving parking spaces.' });
  }
}

export async function getParkingSpaceById(req, res) {
  try {
    const rawId = req.params.id.replace('park-', '');
    const db = await getDb();
    const r = await db.get('SELECT * FROM parking_spaces WHERE id = ?', rawId);

    if (!r) {
      return res.status(404).json({ error: 'Parking space not found.' });
    }

    const space = {
      id: `park-${r.id}`,
      dbId: r.id,
      name: r.name,
      location: r.location,
      area: r.area,
      pricePerHour: r.price_per_hour,
      availableSpaces: r.available_spaces,
      totalSpaces: r.total_spaces,
      distance: r.distance || 'Nearby',
      openingHours: r.opening_hours || '24/7 Access',
      rating: r.rating,
      reviewsCount: r.reviews_count,
      type: r.type,
      isCovered: Boolean(r.is_covered),
      hasEV: Boolean(r.has_ev),
      hasCCTV: Boolean(r.has_cctv),
      hasDisabledAccess: Boolean(r.has_disabled_access),
      image: r.image,
      description: r.description
    };

    res.json({ space });
  } catch (error) {
    console.error('getParkingSpaceById error:', error);
    res.status(500).json({ error: 'Server error retrieving parking space details.' });
  }
}

export async function createParkingSpace(req, res) {
  try {
    const {
      name,
      address,
      spaceType = 'Private Driveway',
      spotsCount = 1,
      hourlyPrice = 4.0,
      hasCCTV = true,
      hasEV = false,
      isCovered = false,
      ownerName,
      ownerEmail
    } = req.body;

    if (!address) {
      return res.status(400).json({ error: 'Parking location address is required.' });
    }

    const db = await getDb();
    const facilityName = name || `${spaceType} - ${address.split(',')[0]}`;
    const area = address.split(',')[1]?.trim() || 'Metro Area';

    const result = await db.run(
      `INSERT INTO parking_spaces (
        name, location, area, price_per_hour, available_spaces, total_spaces,
        distance, opening_hours, rating, reviews_count, type,
        is_covered, has_ev, has_cctv, has_disabled_access, image, description, owner_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      facilityName,
      address,
      area,
      Number(hourlyPrice),
      Number(spotsCount),
      Number(spotsCount),
      '0.2 miles away',
      'Open 24/7',
      5.0,
      1,
      spaceType,
      isCovered ? 1 : 0,
      hasEV ? 1 : 0,
      hasCCTV ? 1 : 0,
      1,
      'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
      `Newly listed verified parking space hosted by ${ownerName || 'Verified Host'}${ownerEmail ? ` (${ownerEmail})` : ''}.`,
      req.user ? req.user.id : null
    );

    const newSpace = await db.get('SELECT * FROM parking_spaces WHERE id = ?', result.lastID);

    res.status(201).json({
      message: 'Parking space listed successfully!',
      space: {
        id: `park-${newSpace.id}`,
        name: newSpace.name,
        location: newSpace.location,
        pricePerHour: newSpace.price_per_hour,
        availableSpaces: newSpace.available_spaces,
        type: newSpace.type
      }
    });
  } catch (error) {
    console.error('createParkingSpace error:', error);
    res.status(500).json({ error: 'Server error while listing parking space.' });
  }
}
