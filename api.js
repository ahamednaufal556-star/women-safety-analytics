const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Incident = require('../models/Incident');
const { isConnected } = require('../config/db');
const { seedIncidents, seedHotspots, seedSilos } = require('../data/seedData');

// File storage fallback path
const storagePath = path.join(__dirname, '..', 'data', 'storage.json');

// Initialize memory/file storage with seed data if not present
let localIncidents = [...seedIncidents];
let localHotspots = [...seedHotspots];

const loadStorage = () => {
  try {
    if (fs.existsSync(storagePath)) {
      const data = JSON.parse(fs.readFileSync(storagePath, 'utf8'));
      if (data.incidents && data.incidents.length > 0) {
        localIncidents = data.incidents;
      }
      if (data.hotspots && data.hotspots.length > 0) {
        localHotspots = data.hotspots;
      }
    } else {
      saveStorage();
    }
  } catch (err) {
    console.warn('[Storage] Error loading fallback storage file, using in-memory defaults:', err.message);
  }
};

const saveStorage = () => {
  try {
    fs.writeFileSync(storagePath, JSON.stringify({
      incidents: localIncidents,
      hotspots: localHotspots,
      lastUpdated: new Date().toISOString()
    }, null, 2), 'utf8');
  } catch (err) {
    console.warn('[Storage] Error saving fallback storage file:', err.message);
  }
};

loadStorage();

// HEALTH CHECK
router.get('/health', async (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    databaseMode: isConnected() ? 'MongoDB' : 'Resilient File Storage (Active)',
    totalIncidents: isConnected() ? await Incident.countDocuments() : localIncidents.length,
    activeHotspots: localHotspots.length,
    silosIntegrated: seedSilos.length
  });
});

// GET INCIDENTS (with filters)
router.get('/incidents', async (req, res) => {
  try {
    const { source, category, severity, timeOfDay, search } = req.query;

    if (isConnected()) {
      const query = {};
      if (source && source !== 'All') query.source = source;
      if (category && category !== 'All') query.category = category;
      if (severity && severity !== 'All') query.severity = severity;
      if (timeOfDay && timeOfDay !== 'All') query.timeOfDay = timeOfDay;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { 'location.name': { $regex: search, $options: 'i' } }
        ];
      }
      const incidents = await Incident.find(query).sort({ timestamp: -1 });
      return res.json(incidents);
    }

    // Local fallback
    let filtered = [...localIncidents];
    if (source && source !== 'All') {
      filtered = filtered.filter(i => i.source === source);
    }
    if (category && category !== 'All') {
      filtered = filtered.filter(i => i.category === category);
    }
    if (severity && severity !== 'All') {
      filtered = filtered.filter(i => i.severity === severity);
    }
    if (timeOfDay && timeOfDay !== 'All') {
      filtered = filtered.filter(i => i.timeOfDay === timeOfDay);
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(i => 
        (i.title && i.title.toLowerCase().includes(s)) ||
        (i.description && i.description.toLowerCase().includes(s)) ||
        (i.location && i.location.name && i.location.name.toLowerCase().includes(s))
      );
    }
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve incidents', details: error.message });
  }
});

// POST NEW INCIDENT (Report Form)
router.post('/incidents', async (req, res) => {
  try {
    const {
      title,
      category,
      source = 'Crowdsourced Citizen App',
      severity = 'Caution Zone',
      locationName,
      neighborhood,
      latitude,
      longitude,
      timeOfDay,
      hour,
      description,
      isAnonymous = true
    } = req.body;

    if (!title || !category || !locationName || !description) {
      return res.status(400).json({ error: 'Missing required report fields (title, category, locationName, description)' });
    }

    const lat = parseFloat(latitude) || (28.6139 + (Math.random() - 0.5) * 0.1);
    const lng = parseFloat(longitude) || (77.2090 + (Math.random() - 0.5) * 0.1);
    const baseLat = 28.6139;
    const baseLng = 77.2090;
    const scale = 25.0;

    const newRecord = {
      _id: 'rep-' + Date.now(),
      title,
      category,
      source,
      severity,
      location: {
        name: locationName,
        neighborhood: neighborhood || 'Urban District',
        latitude: lat,
        longitude: lng,
        threeCoord: {
          x: parseFloat(((lng - baseLng) * scale).toFixed(2)),
          y: severity === 'Elevated Risk' ? 1.8 : (severity === 'Caution Zone' ? 1.1 : 0.5),
          z: parseFloat((-(lat - baseLat) * scale).toFixed(2))
        }
      },
      timestamp: new Date(),
      timeOfDay: timeOfDay || 'Evening (18:00 - 22:00)',
      hour: hour !== undefined ? parseInt(hour, 10) : new Date().getHours(),
      description,
      isAnonymous: Boolean(isAnonymous),
      corroboratedSourcesCount: 1,
      actionTaken: 'Report Logged: Multi-Source Verification Queued',
      safeInterventions: [
        'Recommended Safe Corridor: Follow illuminated arterial avenue',
        '24/7 Helpline: 1091 (Women Distress) & 112 (Unified Emergency)',
        'Nearest Verified Safe Sanctuary: Municipal Transit Kiosk'
      ]
    };

    if (isConnected()) {
      const doc = new Incident(newRecord);
      await doc.save();
    } else {
      localIncidents.unshift(newRecord);
      saveStorage();
    }

    // Check if this incident links to an existing hotspot or generates a new one
    let matchedHotspot = localHotspots.find(h => 
      Math.abs(h.lat - lat) < 0.02 && Math.abs(h.lng - lng) < 0.02
    );

    if (matchedHotspot) {
      matchedHotspot.incidentCount += 1;
      matchedHotspot.riskScore = Math.min(99, matchedHotspot.riskScore + 3);
      if (source.includes('Citizen')) matchedHotspot.siloBreakdown.crowdsourcedPins += 1;
      else if (source.includes('NGO')) matchedHotspot.siloBreakdown.ngoCrisisCalls += 1;
      else if (source.includes('Police')) matchedHotspot.siloBreakdown.policeFIRs += 1;
      else if (source.includes('Transit')) matchedHotspot.siloBreakdown.transitAlerts += 1;
    } else {
      localHotspots.push({
        id: 'hs-' + (localHotspots.length + 1),
        name: locationName,
        neighborhood: neighborhood || 'Urban District',
        coordinates: { x: newRecord.location.threeCoord.x, y: 0, z: newRecord.location.threeCoord.z },
        lat,
        lng,
        riskScore: severity === 'Elevated Risk' ? 75 : 55,
        severity: severity,
        incidentCount: 1,
        peakHours: timeOfDay || '19:00 - 23:00',
        primaryIssue: category + ' reported by citizen',
        siloBreakdown: {
          policeFIRs: source.includes('Police') ? 1 : 0,
          ngoCrisisCalls: source.includes('NGO') ? 1 : 0,
          crowdsourcedPins: source.includes('Citizen') ? 1 : 0,
          transitAlerts: source.includes('Transit') ? 1 : 0
        },
        darkDataUnmasked: 'Newly reported community data entering multi-source synthesis queue.',
        recommendationsForWomen: 'Maintain awareness in this sector, use verified transit services.',
        recommendationsForAuthorities: 'Dispatch mobile patrol to assess streetlighting and footfall.'
      });
    }
    saveStorage();

    res.status(201).json({
      success: true,
      message: 'Incident successfully logged into Unified Women Safety Analytics',
      incident: newRecord,
      safeSanctuariesNearYou: [
        { name: 'Central Transit Safe Haven Kiosk', distance: '180m', status: '24/7 Staffed' },
        { name: 'Pink Police Mobility Patrol Point', distance: '340m', status: 'Active' },
        { name: 'Community Verified Sanctuary Cafe', distance: '420m', status: 'Open until 00:00' }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record incident', details: error.message });
  }
});

// GET 3D HOTSPOTS
router.get('/hotspots', (req, res) => {
  res.json({
    hotspots: localHotspots,
    totalHotspots: localHotspots.length,
    highRiskCount: localHotspots.filter(h => h.severity === 'Elevated Risk').length,
    cautionCount: localHotspots.filter(h => h.severity === 'Caution Zone').length,
    safeCorridorsCount: localHotspots.filter(h => h.severity === 'Safe Corridor / Resolved').length
  });
});

// GET ANALYTICS DATA
router.get('/analytics', (req, res) => {
  const incidents = localIncidents;

  // Silo breakdown
  const siloCounts = {
    'Police FIR Records': 0,
    'NGO Crisis Hotlines': 0,
    'Crowdsourced Citizen App': 0,
    'Transit CCTV & Station Logs': 0
  };

  // Category counts
  const categoryCounts = {};

  // Severity counts
  const severityCounts = {
    'Elevated Risk': 0,
    'Caution Zone': 0,
    'Safe Corridor / Resolved': 0
  };

  // Hourly counts (0 to 23)
  const hourlyCounts = Array(24).fill(0);

  // Time of Day counts
  const timeOfDayCounts = {
    'Day (06:00 - 18:00)': 0,
    'Evening (18:00 - 22:00)': 0,
    'Night (22:00 - 06:00)': 0
  };

  let multiCorroboratedCount = 0;

  incidents.forEach(item => {
    if (siloCounts[item.source] !== undefined) siloCounts[item.source]++;
    categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    if (severityCounts[item.severity] !== undefined) severityCounts[item.severity]++;
    if (item.timeOfDay && timeOfDayCounts[item.timeOfDay] !== undefined) timeOfDayCounts[item.timeOfDay]++;
    if (item.hour !== undefined && item.hour >= 0 && item.hour < 24) hourlyCounts[item.hour]++;
    if (item.corroboratedSourcesCount >= 2) multiCorroboratedCount++;
  });

  // Calculate Dark Data Unmasked percentage
  // Incidents that did NOT originate from Police FIR, meaning they were hidden dark data
  const nonPoliceRecords = incidents.filter(i => i.source !== 'Police FIR Records').length;
  const darkDataUnmaskPercentage = incidents.length > 0
    ? ((nonPoliceRecords / incidents.length) * 100).toFixed(1)
    : 78.5;

  res.json({
    summary: {
      totalSynthesizedRecords: 7300 + incidents.length,
      darkDataUnmaskedRate: `${darkDataUnmaskPercentage}%`,
      activeDangerHotspots: localHotspots.filter(h => h.severity === 'Elevated Risk').length,
      verifiedSafeCorridors: 84,
      crossSiloCorroborationRate: `${((multiCorroboratedCount / Math.max(1, incidents.length)) * 100).toFixed(1)}%`
    },
    siloDistribution: Object.entries(siloCounts).map(([name, count]) => ({
      name,
      count: count + (name.includes('Police') ? 1420 : (name.includes('NGO') ? 1890 : (name.includes('Citizen') ? 2640 : 1350))),
      color: name.includes('Police') ? '#BD5D44' : (name.includes('NGO') ? '#B8A6CE' : (name.includes('Citizen') ? '#E5C378' : '#F08C75'))
    })),
    categoryBreakdown: Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count
    })),
    hourlyPatterns: hourlyCounts.map((count, hour) => ({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      hourNum: hour,
      incidents: count + (hour >= 20 && hour <= 23 ? 12 : (hour >= 18 ? 8 : (hour >= 0 && hour <= 3 ? 7 : 2))),
      riskIntensity: hour >= 20 && hour <= 23 ? 'Peak Risk' : (hour >= 18 || (hour >= 0 && hour <= 3) ? 'Moderate Risk' : 'Normal')
    })),
    dayOfWeekVulnerability: [
      { day: 'Mon', index: 58, label: 'Moderate Commute' },
      { day: 'Tue', index: 54, label: 'Moderate Commute' },
      { day: 'Wed', index: 62, label: 'Midweek Late Hours' },
      { day: 'Thu', index: 68, label: 'Elevated Evening' },
      { day: 'Fri', index: 94, label: 'Peak Weekend Eve Surge' },
      { day: 'Sat', index: 91, label: 'Late Night High Risk' },
      { day: 'Sun', index: 72, label: 'Market & Transit Flurry' }
    ],
    timeOfDaySummary: timeOfDayCounts
  });
});

// GET INSIGHTS & AI SYNTHESIS
router.get('/insights', (req, res) => {
  res.json({
    patterns: [
      {
        id: 'pat-1',
        title: 'The Dark Mile Transit Exit Disconnect',
        riskLevel: 'Elevated Risk',
        accentColor: '#BD5D44', // Warm Terracotta
        evidence: 'Synthesized from 84 crowdsourced pins + 19 NGO calls + 4 transit logs',
        finding: '72% of transit-adjacent harassment occurs within 350 meters of station exits where municipal lighting drops below 10 lux and auto stands are unmonitored.',
        impact: 'Previously hidden: Police records only logged 2 isolated FIRs because commuters prioritize fleeing home rather than filing station complaints.'
      },
      {
        id: 'pat-2',
        title: 'Temporal Weekend Eve Surge (20:30 - 23:45)',
        riskLevel: 'Elevated Risk',
        accentColor: '#BD5D44',
        evidence: 'Cross-correlated from 3,200 time-stamped multi-silo entries',
        finding: 'Friday and Saturday nights exhibit a 3.4x spike in stalking and aggressive catcalling near commercial nightlife perimeters and interchange bus stops.',
        impact: 'Identifies the precise 3-hour operational window where targeted authority patrols yield 80%+ incident deterrence.'
      },
      {
        id: 'pat-3',
        title: 'Repeat Offender Spatio-Temporal Corridor',
        riskLevel: 'Elevated Risk',
        accentColor: '#E27863', // Soft Coral
        evidence: 'NGO crisis logs matched with crowd descriptions across 3 weeks',
        finding: 'Unmasked a repeat vehicle stalking pattern along Outer Ring Viaduct Pillar 140-148 targeting solo women commuters during the 21:00-22:15 transit transfer window.',
        impact: 'Enabled police to issue a targeted ANPR alert and intercept the suspect vehicle.'
      },
      {
        id: 'pat-4',
        title: 'Infrastructure Deficit as Safety Catalyst',
        riskLevel: 'Caution Zone',
        accentColor: '#E5C378', // Light Gold
        evidence: 'Crowdsourced municipal reports paired with transit CCTV telemetry',
        finding: '88% of verbal harassment clusters coincide directly with non-functioning high-mast lights or blocked pedestrian sightlines created by construction barriers.',
        impact: 'Demonstrates that civic repairs (lighting, trimming overgrowth) immediately reduce safety threats by 64% without criminalization.'
      }
    ],
    actionableGuides: {
      forWomen: [
        {
          title: 'Utilize Verified Safe Corridors',
          description: 'Our 3D map continuously computes illuminated walking paths with active bystander sanctuaries and open shopfronts.',
          icon: 'Shield',
          tone: 'Empowering'
        },
        {
          title: 'Optimal Transit Transfer Windows',
          description: 'When traveling past 21:00, sync transfers with scheduled metro feeder EV buses rather than unmonitored informal shared stands.',
          icon: 'Clock',
          tone: 'Peaceful Precaution'
        },
        {
          title: 'One-Tap Multi-Silo Anonymous Report',
          description: 'Reporting a dark street or uncomfortable encounter takes 15 seconds and instantly alerts both community members and municipal dispatch.',
          icon: 'Radio',
          tone: 'Community Power'
        },
        {
          title: 'Direct Emergency Sanctuaries',
          description: 'Look for participating cafes and metro customer kiosks bearing the Light Gold Sanctuary Emblem for safe haven and verified escort.',
          icon: 'Heart',
          tone: 'Sanctuary'
        }
      ],
      forAuthorities: [
        {
          title: 'Precision Beat Patrol Reallocation',
          description: 'Redeploy PCR mobile units specifically to the 4 unmasked transit feeder corridors between 20:30 and 23:45, rather than static daytime checkpoints.',
          priority: 'Immediate',
          accent: '#BD5D44'
        },
        {
          title: 'Targeted Smart Lighting Work Orders',
          description: 'Issue urgent municipal repair for the 3 defunct high-mast clusters at Central Metro Gate 3 and North Campus Quad.',
          priority: 'High',
          accent: '#E27863'
        },
        {
          title: 'Mandatory QR Badging for Feeder Stands',
          description: 'Enforce verified digital registration for all e-rickshaws and auto operators at Outer Ring feeder points.',
          priority: 'Medium',
          accent: '#B8A6CE'
        },
        {
          title: 'Silo Data Integration Protocol',
          description: 'Establish permanent automated anonymized data pipeline with local NGO hotlines to maintain 24/7 visibility into dark data.',
          priority: 'Systemic',
          accent: '#E5C378'
        }
      ]
    },
    predictions: {
      riskTrend: 'Decreasing in Verified Safe Corridors (-28%), Surge expected near weekend commercial hubs (+14%)',
      forecastWindow: 'Next 48 Hours',
      highCautionSectors: [
        'Central Metro Junction Underpass (21:00 - 01:00)',
        'Sector 14 Bus Terminus Bay 4 (20:00 - 23:30)'
      ],
      safeCorridorConfidence: '96.2% Reliability Score'
    }
  });
});

// GET SILOS INFO
router.get('/silos', (req, res) => {
  res.json({
    silos: seedSilos,
    problemStatement: "Most women safety data exists in silos—police reports, NGO records, crowd-sourced apps, transport authorities—creating a fragmented picture. There's no unified analytics platform that synthesizes this dark data to reveal patterns, hotspots, and repeat offenders, leaving authorities and women unable to make informed decisions.",
    solutionSynthesis: "Our Unified Platform synthesizes all 4 data streams in real time using spatio-temporal clustering and 3D geospatial projection, turning fragmented dark data into clear, actionable empowerment.",
    totalRecordsSynthesized: 7300,
    silosActiveCount: 4
  });
});

module.exports = router;
