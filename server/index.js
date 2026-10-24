import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb, getDb } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import parkingRoutes from './routes/parkingRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import assistanceRoutes from './routes/assistanceRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/parking', parkingRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/assistance', assistanceRoutes);

// Promotions endpoint
app.get('/api/promotions', async (_req, res) => {
  try {
    const db = await getDb();
    const rows = await db.all('SELECT * FROM promotions');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching promotions:', err);
    res.status(500).json({ error: 'Failed to fetch promotions' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'ParkEase API Server',
    database: 'SQLite',
    timestamp: new Date().toISOString()
  });
});

// Root welcome
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to ParkEase Backend API',
    endpoints: [
      '/api/parking',
      '/api/bookings',
      '/api/assistance',
      '/api/promotions',
      '/api/auth',
      '/api/health'
    ]
  });
});

// Global error handler
app.use((err, req, res, _next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal server error occurred.' });
});

// Initialize database and start server
async function startServer() {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`🚀 ParkEase Backend Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
