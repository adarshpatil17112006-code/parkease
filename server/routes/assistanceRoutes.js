import express from 'express';
import { createAssistanceRequest, getMyRequests } from '../controllers/assistanceController.js';
import { optionalAuth, authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', optionalAuth, createAssistanceRequest);
router.get('/my-requests', authenticateToken, getMyRequests);

export default router;
