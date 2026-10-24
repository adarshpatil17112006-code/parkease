import express from 'express';
import { getAllParkingSpaces, getParkingSpaceById, createParkingSpace } from '../controllers/parkingController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllParkingSpaces);
router.get('/:id', getParkingSpaceById);
router.post('/', optionalAuth, createParkingSpace);

export default router;
