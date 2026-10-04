const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/women_safety_analytics';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500 // Don't hang if local mongodb daemon is not running
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Database] MongoDB not reachable at ${uri}. Switching to resilient in-memory & file storage mode.`);
    console.warn(`[Database] Reason: ${error.message}`);
    isConnected = false;
    return false;
  }
};

const getStatus = () => ({
  connected: isConnected,
  mode: isConnected ? 'MongoDB (Production / Live)' : 'Resilient File Storage (Active Fallback)',
  uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/women_safety_analytics'
});

module.exports = { connectDB, getStatus, isConnected: () => isConnected };
