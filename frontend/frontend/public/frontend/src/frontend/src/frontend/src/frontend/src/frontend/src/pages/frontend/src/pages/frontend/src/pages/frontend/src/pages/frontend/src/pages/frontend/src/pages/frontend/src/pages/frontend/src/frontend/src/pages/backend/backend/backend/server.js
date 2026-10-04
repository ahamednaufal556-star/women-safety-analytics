const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = 'women_safety_db';
let db;

const mongoClient = new MongoClient(MONGO_URI);

async function connectDB() {
  try {
    await mongoClient.connect();
    db = mongoClient.db(DB_NAME);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Women Safety Analytics API is running' });
});

// Get all incidents
app.get('/api/incidents', async (req, res) => {
  try {
    const incidents = await db.collection('incidents').find({}).toArray();
    res.json(incidents);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    res.status(500).json({ error: 'Failed to fetch incidents' });
  }
});

// Create new incident
app.post('/api/incidents', async (req, res) => {
  try {
    const { type, location, description, time, severity, source, latitude, longitude, timestamp } = req.body;

    if (!type || !location || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const incident = {
      type,
      location,
      description,
      time: time || new Date().toLocaleTimeString(),
      severity: severity || 'medium',
      source: source || 'crowdsourced',
      latitude: latitude || Math.random() * 180 - 90,
      longitude: longitude || Math.random() * 360 - 180,
      timestamp: timestamp || new Date(),
      createdAt: new Date()
    };

    const result = await db.collection('incidents').insertOne(incident);
    res.status(201).json({
      message: 'Incident reported successfully',
      id: result.insertedId,
      incident
    });
  } catch (error) {
    console.error('Error creating incident:', error);
    res.status(500).json({ error: 'Failed to create incident' });
  }
});

// Get hotspots
app.get('/api/hotspots', async (req, res) => {
  try {
    const incidents = await db.collection('incidents').find({}).toArray();
    
    // Group by location and count
    const hotspots = {};
    incidents.forEach(incident => {
      const location = incident.location;
      hotspots[location] = (hotspots[location] || 0) + 1;
    });

    // Sort by count and return top 10
    const topHotspots = Object.entries(hotspots)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([location, count]) => ({ location, count }));

    res.json(topHotspots);
  } catch (error) {
    console.error('Error fetching hotspots:', error);
    res.status(500).json({ error: 'Failed to fetch hotspots' });
  }
});

// Get patterns
app.get('/api/patterns', async (req, res) => {
  try {
    const incidents = await db.collection('incidents').find({}).toArray();

    // Analyze patterns
    const patterns = {
      byType: {},
      byHour: {},
      byLocation: {},
      bySeverity: {}
    };

    incidents.forEach(incident => {
      // By type
      patterns.byType[incident.type] = (patterns.byType[incident.type] || 0) + 1;

      // By hour
      const hour = incident.time ? new Date(incident.timestamp).getHours() : 0;
      patterns.byHour[hour] = (patterns.byHour[hour] || 0) + 1;

      // By location
      patterns.byLocation[incident.location] = (patterns.byLocation[incident.location] || 0) + 1;

      // By severity
      patterns.bySeverity[incident.severity] = (patterns.bySeverity[incident.severity] || 0) + 1;
    });

    res.json(patterns);
  } catch (error) {
    console.error('Error fetching patterns:', error);
    res.status(500).json({ error: 'Failed to fetch patterns' });
  }
});

// Get statistics
app.get('/api/statistics', async (req, res) => {
  try {
    const incidents = await db.collection('incidents').find({}).toArray();

    // Sample statistics
    const stats = {
      totalIncidents: incidents.length,
      incidentsByLocation: {
        labels: ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'],
        data: [245, 187, 156, 132, 98, 87]
      },
      incidentsByHour: {
        labels: ['12AM', '2AM', '4AM', '6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
        data: [45, 52, 38, 28, 35, 42, 55, 62, 78, 92, 125, 142]
      },
      incidentsByType: {
        labels: ['Eve-teasing', 'Harassment', 'Assault', 'Stalking', 'Robbery', 'Other'],
        data: [285, 198, 145, 132, 98, 87]
      }
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Get incident by ID
app.get('/api/incidents/:id', async (req, res) => {
  try {
    const { ObjectId } = require('mongodb');
    const incident = await db.collection('incidents').findOne({ _id: new ObjectId(req.params.id) });
    
    if (!incident) {
      return res.status(404).json({ error: 'Incident not found' });
    }
    
    res.json(incident);
  } catch (error) {
    console.error('Error fetching incident:', error);
    res.status(500).json({ error: 'Failed to fetch incident' });
  }
});

// Update incident
app.put('/api/incidents/:id', async (req, res) => {
  try {
    const { ObjectId } = require('mongodb');
    const { severity, status } = req.body;

    const result = await db.collection('incidents').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { severity, status, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    res.json({ message: 'Incident updated successfully' });
  } catch (error) {
    console.error('Error updating incident:', error);
    res.status(500).json({ error: 'Failed to update incident' });
  }
});

// Delete incident
app.delete('/api/incidents/:id', async (req, res) => {
  try {
    const { ObjectId } = require('mongodb');
    const result = await db.collection('incidents').deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    res.json({ message: 'Incident deleted successfully' });
  } catch (error) {
    console.error('Error deleting incident:', error);
    res.status(500).json({ error: 'Failed to delete incident' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 API: http://localhost:${PORT}/api`);
    console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
  });
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
