const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Street Harassment',
      'Stalking',
      'Poor Lighting / Infrastructure',
      'Transit Vulnerability',
      'Isolated Enclave',
      'Verbal Abuse / Intimidation',
      'Suspicious Gathering',
      'Physical Threat'
    ]
  },
  source: {
    type: String,
    required: true,
    enum: [
      'Police FIR Records',
      'NGO Crisis Hotlines',
      'Crowdsourced Citizen App',
      'Transit CCTV & Station Logs'
    ]
  },
  severity: {
    type: String,
    required: true,
    enum: ['Elevated Risk', 'Caution Zone', 'Safe Corridor / Resolved'],
    default: 'Caution Zone'
  },
  location: {
    name: { type: String, required: true },
    neighborhood: { type: String, default: 'Metropolitan Core' },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    threeCoord: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      z: { type: Number, default: 0 }
    }
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  timeOfDay: {
    type: String,
    enum: ['Day (06:00 - 18:00)', 'Evening (18:00 - 22:00)', 'Night (22:00 - 06:00)'],
    default: 'Evening (18:00 - 22:00)'
  },
  hour: {
    type: Number,
    min: 0,
    max: 23,
    default: 20
  },
  description: {
    type: String,
    required: true
  },
  isAnonymous: {
    type: Boolean,
    default: true
  },
  corroboratedSourcesCount: {
    type: Number,
    default: 1
  },
  actionTaken: {
    type: String,
    default: 'Under Multi-Source Synthesis Review'
  },
  safeInterventions: [{
    type: String
  }]
}, {
  timestamps: true
});

// Calculate 3D scene coordinate based on lat/lng normalized around city center
IncidentSchema.pre('save', function(next) {
  if (!this.location.threeCoord || (this.location.threeCoord.x === 0 && this.location.threeCoord.z === 0)) {
    const baseLat = 28.6139; // Central datum reference
    const baseLng = 77.2090;
    const scale = 25.0;
    this.location.threeCoord = {
      x: (this.location.longitude - baseLng) * scale,
      y: this.severity === 'Elevated Risk' ? 1.6 : (this.severity === 'Caution Zone' ? 1.0 : 0.4),
      z: -(this.location.latitude - baseLat) * scale
    };
  }
  next();
});

module.exports = mongoose.model('Incident', IncidentSchema);
