import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  if (process.env.MONGODB_URI) {
    try {
      await connectDB();
    } catch (err) {
      console.warn('⚠️ Could not connect to MongoDB initially:', err.message);
      console.warn('💡 Tip: For local dev or Vercel, set MONGODB_URI in backend/.env to your MongoDB Atlas connection string');
    }
  } else {
    console.warn('⚠️ MONGODB_URI not specified. Running server in fallback mode.');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Studio Backend Server running on port ${PORT}`);
    console.log(`🔗 Local API: http://localhost:${PORT}/api`);
    console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  });
}

startServer();
