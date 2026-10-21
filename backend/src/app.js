import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Route imports
import imageRoutes from './routes/imageRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import seedRoutes from './routes/seedRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// ==========================================
// Middleware Configuration
// ==========================================
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Generous limit for image uploads & base64 preview strings
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure DB is connected for incoming API requests (essential for Vercel Serverless)
app.use(async (req, res, next) => {
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
    }
    next();
  } catch (err) {
    console.error('Database connection middleware error:', err.message);
    // Proceed so routes can return informative responses or fallbacks
    next();
  }
});

// ==========================================
// API Routes
// ==========================================
app.use('/api/images', imageRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/seed', seedRoutes);

// Health check endpoint for monitoring & Vercel
app.get('/api/health', (req, res) => {
  const isConnected = !!(global.mongoose && global.mongoose.conn);
  res.json({
    status: 'ok',
    message: 'Velu Photography Studio Backend API is running',
    database: isConnected ? 'connected' : 'disconnected (set MONGODB_URI)',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// Root welcome endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Velu Photography Studio API',
    version: '1.0.0',
    documentation: {
      images: '/api/images',
      services: '/api/services',
      gallery: '/api/gallery',
      packages: '/api/packages',
      contactInfo: '/api/contact/info',
      inquiries: '/api/contact/inquiries',
      health: '/api/health',
      seed: 'POST /api/seed',
    },
  });
});

// ==========================================
// Error Handling Middleware
// ==========================================
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

app.use((err, req, res, _next) => {
  console.error('API Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

export default app;
