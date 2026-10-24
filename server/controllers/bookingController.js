import QRCode from 'qrcode';
import { getDb } from '../config/db.js';

export async function createBooking(req, res) {
  try {
    const {
      parkingId,
      date,
      startTime = '14:00',
      duration = 2,
      vehicleType = 'Sedan / Hatchback',
      vehiclePlate = 'KA-05-EX-4921'
    } = req.body;

    if (!parkingId) {
      return res.status(400).json({ error: 'Parking facility ID is required.' });
    }

    const rawParkingId = parkingId.toString().replace('park-', '');
    const db = await getDb();

    // Verify parking facility exists
    const facility = await db.get('SELECT * FROM parking_spaces WHERE id = ?', rawParkingId);
    if (!facility) {
      return res.status(404).json({ error: 'Parking facility not found.' });
    }

    // Generate unique reference & bay
    const reference = `PE-${Math.floor(100000 + Math.random() * 900000)}`;
    const bayNumber = `Bay P-${Math.floor(1 + Math.random() * 18).toString().padStart(2, '0')}`;

    // Price calculation
    const durationNum = Number(duration) || 2;
    const baseCost = facility.price_per_hour * durationNum;
    const platformFee = 0.50;
    const grandTotal = Number((baseCost + platformFee).toFixed(2));

    // Generate dynamic QR code payload
    const qrPayload = JSON.stringify({
      pass: reference,
      facility: facility.name,
      stall: bayNumber,
      date: date || new Date().toISOString().split('T')[0],
      time: startTime,
      vehicle: vehiclePlate
    });
    const qrDataUrl = await QRCode.toDataURL(qrPayload, {
      width: 256,
      margin: 2,
      color: { dark: '#0f172a', light: '#ffffff' }
    });

    const userId = req.user ? req.user.id : null;

    // Insert booking
    const result = await db.run(
      `INSERT INTO bookings (
        reference, user_id, parking_id, parking_name, parking_location,
        bay_number, booking_date, start_time, duration, vehicle_type,
        vehicle_plate, total_price, status, qr_data
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      reference,
      userId,
      facility.id,
      facility.name,
      facility.location,
      bayNumber,
      date || new Date().toISOString().split('T')[0],
      startTime,
      `${durationNum} hour(s)`,
      vehicleType,
      vehiclePlate,
      grandTotal,
      'confirmed',
      qrDataUrl
    );

    // Decrement available spaces
    if (facility.available_spaces > 0) {
      await db.run(
        'UPDATE parking_spaces SET available_spaces = available_spaces - 1 WHERE id = ?',
        facility.id
      );
    }

    res.status(201).json({
      message: 'Booking confirmed successfully!',
      booking: {
        id: result.lastID,
        reference,
        parkingName: facility.name,
        location: facility.location,
        bayNumber,
        date: date || new Date().toISOString().split('T')[0],
        startTime,
        duration: `${durationNum} hour(s)`,
        vehicleType,
        vehiclePlate,
        totalPaid: `$${grandTotal.toFixed(2)}`,
        qrCode: qrDataUrl,
        status: 'confirmed'
      }
    });
  } catch (error) {
    console.error('createBooking error:', error);
    res.status(500).json({ error: 'Server error while generating booking reservation.' });
  }
}

export async function getMyBookings(req, res) {
  try {
    const db = await getDb();
    const userId = req.user.id;

    const bookings = await db.all(
      'SELECT * FROM bookings WHERE user_id = ? ORDER BY id DESC',
      userId
    );

    res.json({ count: bookings.length, bookings });
  } catch (error) {
    console.error('getMyBookings error:', error);
    res.status(500).json({ error: 'Server error retrieving bookings.' });
  }
}

export async function getBookingByReference(req, res) {
  try {
    const { reference } = req.params;
    const db = await getDb();

    const booking = await db.get('SELECT * FROM bookings WHERE reference = ?', reference.toUpperCase());
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    res.json({ booking });
  } catch (error) {
    console.error('getBookingByReference error:', error);
    res.status(500).json({ error: 'Server error retrieving booking.' });
  }
}

export async function cancelBooking(req, res) {
  try {
    const { id } = req.params;
    const db = await getDb();

    const booking = await db.get('SELECT * FROM bookings WHERE id = ?', id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ error: 'Booking is already cancelled.' });
    }

    await db.run("UPDATE bookings SET status = 'cancelled' WHERE id = ?", id);

    // Restore available space count
    await db.run(
      'UPDATE parking_spaces SET available_spaces = available_spaces + 1 WHERE id = ?',
      booking.parking_id
    );

    res.json({ message: 'Booking cancelled successfully.' });
  } catch (error) {
    console.error('cancelBooking error:', error);
    res.status(500).json({ error: 'Server error cancelling booking.' });
  }
}
