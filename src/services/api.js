import { parkingSpaces as fallbackSpaces } from '../data/mockData';

const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('parkease_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// 1. Parking APIs
export async function fetchParkingSpaces(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.area && params.area !== 'All Locations') query.append('area', params.area);
    if (params.sort) query.append('sort', params.sort);

    const res = await fetch(`${API_BASE}/parking?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch from backend');
    const data = await res.json();
    return data.spaces || [];
  } catch (err) {
    console.warn('Backend unavailable, using fallback mock data:', err.message);
    let list = [...fallbackSpaces];
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q) ||
          s.area.toLowerCase().includes(q)
      );
    }
    if (params.category && params.category !== 'All') {
      if (params.category === 'Covered') list = list.filter((s) => s.isCovered);
      if (params.category === 'EV Charging') list = list.filter((s) => s.hasEV);
      if (params.category === 'Valet') list = list.filter((s) => s.type.toLowerCase().includes('valet'));
    }
    return list;
  }
}

export async function fetchParkingSpaceById(id) {
  try {
    const res = await fetch(`${API_BASE}/parking/${id}`);
    if (!res.ok) throw new Error('Failed to fetch parking space details');
    const data = await res.json();
    return data.space;
  } catch (err) {
    console.warn('Using local fallback for space details:', err.message);
    return fallbackSpaces.find((s) => s.id === id) || null;
  }
}

export async function submitParkingListing(spaceData) {
  try {
    const res = await fetch(`${API_BASE}/parking`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(spaceData)
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to list space');
    }
    return await res.json();
  } catch (err) {
    console.warn('API error, simulating local host listing:', err.message);
    return {
      message: 'Parking space listed successfully (simulation)',
      space: {
        id: `park-${Date.now()}`,
        name: spaceData.address,
        location: spaceData.address,
        pricePerHour: spaceData.hourlyPrice || 40.0,
        availableSpaces: spaceData.spotsCount || 1,
        type: spaceData.spaceType || 'Private Driveway'
      }
    };
  }
}

// 2. Booking APIs
export async function submitBooking(bookingPayload) {
  try {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingPayload)
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Booking creation failed');
    }
    const data = await res.json();
    if (data.booking) {
      saveLocalBooking(data.booking);
    }
    return data;
  } catch (err) {
    console.warn('API error, generating simulated reservation pass:', err.message);
    const ref = `PE-${Math.floor(100000 + Math.random() * 900000)}`;
    const bay = `Bay P-${Math.floor(1 + Math.random() * 18).toString().padStart(2, '0')}`;
    const simBooking = {
      reference: ref,
      parkingName: bookingPayload.parkingName || 'Downtown Facility',
      location: bookingPayload.location || 'Metro Center',
      bayNumber: bay,
      date: bookingPayload.date,
      startTime: bookingPayload.startTime,
      duration: `${bookingPayload.duration || 2} hour(s)`,
      vehicleType: bookingPayload.vehicleType,
      vehiclePlate: bookingPayload.vehiclePlate || 'KA-05-EX-4921',
      totalPaid: `₹${((bookingPayload.pricePerHour || 40.0) * (bookingPayload.duration || 2) + 10).toFixed(2)}`,
      paymentMethod: bookingPayload.paymentMethod || 'UPI / QR',
      status: 'confirmed'
    };
    saveLocalBooking(simBooking);
    return {
      message: 'Booking confirmed (local simulation)',
      booking: simBooking
    };
  }
}

function saveLocalBooking(booking) {
  try {
    const existing = JSON.parse(localStorage.getItem('parkease_local_bookings') || '[]');
    const updated = [booking, ...existing.filter((b) => b.reference !== booking.reference)];
    localStorage.setItem('parkease_local_bookings', JSON.stringify(updated));
  } catch {
    // Ignore storage quota errors
  }
}

export async function fetchMyBookings() {
  try {
    const token = localStorage.getItem('parkease_token');
    let serverBookings = [];
    if (token) {
      const res = await fetch(`${API_BASE}/bookings/my-bookings`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        serverBookings = data.bookings || [];
      }
    }

    const localBookings = JSON.parse(localStorage.getItem('parkease_local_bookings') || '[]');
    
    // Merge server and local bookings without duplicates
    const combined = [...serverBookings];
    localBookings.forEach((lb) => {
      if (!combined.some((sb) => sb.reference === lb.reference)) {
        combined.push(lb);
      }
    });

    return combined;
  } catch (err) {
    console.warn('Error fetching server bookings, using local history:', err.message);
    return JSON.parse(localStorage.getItem('parkease_local_bookings') || '[]');
  }
}

export async function cancelBooking(bookingIdOrRef) {
  try {
    const res = await fetch(`${API_BASE}/bookings/${bookingIdOrRef}/cancel`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to cancel on server');
    
    // Also update local storage status
    const local = JSON.parse(localStorage.getItem('parkease_local_bookings') || '[]');
    const updated = local.map((b) =>
      b.id === bookingIdOrRef || b.reference === bookingIdOrRef ? { ...b, status: 'cancelled' } : b
    );
    localStorage.setItem('parkease_local_bookings', JSON.stringify(updated));
    return await res.json();
  } catch {
    const local = JSON.parse(localStorage.getItem('parkease_local_bookings') || '[]');
    const updated = local.map((b) =>
      b.id === bookingIdOrRef || b.reference === bookingIdOrRef ? { ...b, status: 'cancelled' } : b
    );
    localStorage.setItem('parkease_local_bookings', JSON.stringify(updated));
    return { message: 'Booking cancelled' };
  }
}

// 3. Roadside Assistance APIs
export async function submitAssistanceRequest(reqPayload) {
  try {
    const res = await fetch(`${API_BASE}/assistance`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reqPayload)
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Dispatch request failed');
    }
    return await res.json();
  } catch (err) {
    console.warn('API error, simulating dispatch:', err.message);
    return {
      message: 'Assistance dispatched (local simulation)',
      request: {
        serviceName: reqPayload.serviceName,
        userLocation: reqPayload.userLocation,
        vehicleModel: reqPayload.vehicleModel,
        status: 'dispatched',
        assignedTechnician: 'Marcus Sterling (Certified Unit #42)',
        estimatedArrival: '12 - 18 Minutes'
      }
    };
  }
}

// 4. Auth APIs
export async function apiLogin(credentials) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Login failed');
  }
  const data = await res.json();
  if (data.token) {
    localStorage.setItem('parkease_token', data.token);
  }
  return data;
}

export async function apiRegister(userData) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Registration failed');
  }
  const data = await res.json();
  if (data.token) {
    localStorage.setItem('parkease_token', data.token);
  }
  return data;
}

export async function apiGetMe() {
  const token = localStorage.getItem('parkease_token');
  if (!token) return null;
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      localStorage.removeItem('parkease_token');
      return null;
    }
    const data = await res.json();
    return data.user;
  } catch {
    return null;
  }
}

export function apiLogout() {
  localStorage.removeItem('parkease_token');
}
