import { getDb } from '../config/db.js';

export async function createAssistanceRequest(req, res) {
  try {
    const {
      serviceName = 'Mechanics and Repairs',
      userLocation = 'Current GPS: Market Street & 4th Ave',
      vehicleModel = 'Honda Civic / 2022',
      phoneNumber = '+1 (555) 234-8899',
      description = ''
    } = req.body;

    if (!userLocation || !phoneNumber) {
      return res.status(400).json({ error: 'Location and phone number are required.' });
    }

    const technicians = [
      'Marcus Sterling (Certified Unit #42)',
      'Elena Vance (Rapid Tow Operator #19)',
      'David K. (Mobile EV & Diagnostics #07)',
      'Siddharth Patel (Certified Master Tech #33)'
    ];

    const assignedTechnician = technicians[Math.floor(Math.random() * technicians.length)];
    const etaMinutes = Math.floor(10 + Math.random() * 12);
    const estimatedArrival = `${etaMinutes} - ${etaMinutes + 6} Minutes`;

    const db = await getDb();
    const userId = req.user ? req.user.id : null;

    const result = await db.run(
      `INSERT INTO assistance_requests (
        user_id, service_name, user_location, vehicle_model, phone_number,
        description, status, assigned_technician, estimated_arrival
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      userId,
      serviceName,
      userLocation,
      vehicleModel,
      phoneNumber,
      description,
      'dispatched',
      assignedTechnician,
      estimatedArrival
    );

    res.status(201).json({
      message: 'Roadside assistance unit dispatched!',
      request: {
        id: result.lastID,
        serviceName,
        userLocation,
        vehicleModel,
        phoneNumber,
        status: 'dispatched',
        assignedTechnician,
        estimatedArrival
      }
    });
  } catch (error) {
    console.error('createAssistanceRequest error:', error);
    res.status(500).json({ error: 'Server error creating assistance request.' });
  }
}

export async function getMyRequests(req, res) {
  try {
    const db = await getDb();
    const userId = req.user.id;

    const requests = await db.all(
      'SELECT * FROM assistance_requests WHERE user_id = ? ORDER BY id DESC',
      userId
    );

    res.json({ count: requests.length, requests });
  } catch (error) {
    console.error('getMyRequests error:', error);
    res.status(500).json({ error: 'Server error retrieving assistance history.' });
  }
}
