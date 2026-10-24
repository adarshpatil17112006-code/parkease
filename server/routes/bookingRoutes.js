import express from 'express';
import { createBooking, getMyBookings, getBookingByReference, cancelBooking } from '../controllers/bookingController.js';
import { authenticateToken, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', optionalAuth, createBooking);
router.get('/my-bookings', authenticateToken, getMyBookings);
router.get('/:reference', getBookingByReference);
router.put('/:id/cancel', optionalAuth, cancelBooking);

export default router;
