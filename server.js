require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB, isConnected } = require('./config/db');
const Incident = require('./models/Incident');
const { seedIncidents } = require('./data/seedData');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger for transparent visibility
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api', apiRoutes);

// Serve Frontend Static Files
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

// Fallback to index.html for single-page routing
app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(frontendPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send(`
        <html>
          <head><title>Women Safety Analytics API</title></head>
          <body style="font-family: sans-serif; padding: 2rem; background: #FAF6F0; color: #2E2520;">
            <h1>Women Safety Analytics Backend Service</h1>
            <p>API is active and operational at <a href="/api/health">/api/health</a></p>
            <p>Frontend interface is being initialized.</p>
          </body>
        </html>
      `);
    }
  });
});

// Start Server and initialize DB
const startServer = async () => {
  await connectDB();

  // If MongoDB connected, ensure seed data exists
  if (isConnected()) {
    try {
      const count = await Incident.countDocuments();
      if (count === 0) {
        console.log('[Seed] Seeding MongoDB with initial multi-silo incidents...');
        await Incident.insertMany(seedIncidents);
        console.log(`[Seed] Seeded ${seedIncidents.length} incidents successfully into MongoDB.`);
      }
    } catch (seedErr) {
      console.warn('[Seed] Warning during initial seed check:', seedErr.message);
    }
  }

  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  WOMEN SAFETY ANALYTICS: UNIFIED INTELLIGENCE ENGINE  `);
    console.log(`  Server running on http://localhost:${PORT}          `);
    console.log(`  API Status: http://localhost:${PORT}/api/health     `);
    console.log(`  Palette Mode: Warm, Peaceful, Calming Tones         `);
    console.log(`=======================================================`);
  });
};

startServer();
