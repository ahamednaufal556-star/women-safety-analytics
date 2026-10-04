const seedIncidents = [
  {
    title: "Unlit Pedestrian Underpass near Central Metro Gate 3",
    category: "Poor Lighting / Infrastructure",
    source: "Crowdsourced Citizen App",
    severity: "Elevated Risk",
    location: {
      name: "Central Metro Junction Underpass",
      neighborhood: "Downtown Hub",
      latitude: 28.6328,
      longitude: 77.2195,
      threeCoord: { x: 2.6, y: 1.8, z: -3.2 }
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    timeOfDay: "Night (22:00 - 06:00)",
    hour: 23,
    description: "All three overhead high-mast sodium lamps are defunct. Multiple reports of aggressive catcalling and blocked stairways.",
    isAnonymous: true,
    corroboratedSourcesCount: 3,
    actionTaken: "Municipal Escort & Solar High-Mast Lighting Work Order Issued",
    safeInterventions: [
      "Use Gate 1 well-lit boulevard route (2 mins extra)",
      "Stationed Pink Patrol kiosk active 50m north",
      "Emergency SOS pillar operational at Concourse level"
    ]
  },
  {
    title: "Persistent Stalking Pattern along Bus Terminal 4 Feeder Route",
    category: "Stalking",
    source: "NGO Crisis Hotlines",
    severity: "Elevated Risk",
    location: {
      name: "Sector 14 Inter-State Bus Terminus",
      neighborhood: "Transit District",
      latitude: 28.6415,
      longitude: 77.2280,
      threeCoord: { x: 4.7, y: 2.1, z: -4.8 }
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18),
    timeOfDay: "Evening (18:00 - 22:00)",
    hour: 21,
    description: "Repeated calls to women's helpline from college students about two-wheeler following commuters into unlit lane between 20:30 and 21:45.",
    isAnonymous: true,
    corroboratedSourcesCount: 4,
    actionTaken: "Police PCR Van Reallocated & High-Definition CCTV Camera Installed",
    safeInterventions: [
      "Board dedicated women's shuttle bus starting at Bay 2",
      "Illuminated Safe Corridor established along Main Avenue",
      "Campus security patrol available for escort via helpline"
    ]
  },
  {
    title: "Verbal Harassment at Desolate Shared Auto Stand",
    category: "Transit Vulnerability",
    source: "Transit CCTV & Station Logs",
    severity: "Elevated Risk",
    location: {
      name: "East Corridor Ring Road Auto Stand",
      neighborhood: "Industrial Ring",
      latitude: 28.5912,
      longitude: 77.2410,
      threeCoord: { x: 5.2, y: 1.9, z: 3.5 }
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 32),
    timeOfDay: "Evening (18:00 - 22:00)",
    hour: 20,
    description: "Transport CCTV flagged irregular unauthorized auto drivers crowding the feeder entrance without permits. Commuters intimidated.",
    isAnonymous: false,
    corroboratedSourcesCount: 3,
    actionTaken: "Prepaid Booth Mandated & Transport Marshal Deployed",
    safeInterventions: [
      "Use official prepaid verified taxi booth across the foot-overbridge",
      "Metro feeder EV buses run every 7 minutes until 23:00"
    ]
  },
  {
    title: "Attempted Bag Snatching & Intimidation in Park Alley",
    category: "Physical Threat",
    source: "Police FIR Records",
    severity: "Elevated Risk",
    location: {
      name: "Greenwood Park Western Boundary Lane",
      neighborhood: "Residential Sector 9",
      latitude: 28.5720,
      longitude: 77.1950,
      threeCoord: { x: -2.3, y: 2.2, z: 6.8 }
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    timeOfDay: "Night (22:00 - 06:00)",
    hour: 22,
    description: "FIR #2049 filed. Suspect approached woman walking back from hospital shift. Cross-referenced with earlier NGO distress call from same coordinate.",
    isAnonymous: false,
    corroboratedSourcesCount: 3,
    actionTaken: "Suspect Apprehended & Perimeter Gate Locked after 20:00",
    safeInterventions: [
      "Use Sector 9 Main Arterial Road (100% illuminated)",
      "24/7 Security checkpoint at Greenwood Gate 1"
    ]
  },
  {
    title: "Crowded Marketplace Low-Visibility Leering & Groping Zone",
    category: "Street Harassment",
    source: "Crowdsourced Citizen App",
    severity: "Caution Zone",
    location: {
      name: "Old Bazaar Narrow Alleyway",
      neighborhood: "Heritage Market",
      latitude: 28.6510,
      longitude: 77.2310,
      threeCoord: { x: 5.5, y: 1.2, z: -6.4 }
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    timeOfDay: "Evening (18:00 - 22:00)",
    hour: 19,
    description: "Multiple crowd-sourced pins reporting bottlenecks created by illegal shop encroachers where women face harassment during festive rush.",
    isAnonymous: true,
    corroboratedSourcesCount: 2,
    actionTaken: "Civic Encroachment Clearance & Plainclothes Women Officers Stationed",
    safeInterventions: [
      "Follow marked Market Walkway with overhead mirrors",
      "Merchant Association Safe Haven shops display light gold badge"
    ]
  },
  {
    title: "Defunct Streetlights on University North Campus Promenade",
    category: "Poor Lighting / Infrastructure",
    source: "Crowdsourced Citizen App",
    severity: "Caution Zone",
    location: {
      name: "University North Campus Science Quad",
      neighborhood: "Academic Quarter",
      latitude: 28.6890,
      longitude: 77.2080,
      threeCoord: { x: -0.2, y: 1.1, z: -12.5 }
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22),
    timeOfDay: "Night (22:00 - 06:00)",
    hour: 23,
    description: "Starlight-only visibility along 400m tree-lined stretch between library and women's hostel block.",
    isAnonymous: true,
    corroboratedSourcesCount: 3,
    actionTaken: "Temporary Smart Light Towers Erected",
    safeInterventions: [
      "Use Central Campus Boulevard which is fully illuminated",
      "Campus Safety Van provides on-demand doorstep drops"
    ]
  },
  {
    title: "Suspicious Group Loitering near Railway Footbridge",
    category: "Suspicious Gathering",
    source: "Transit CCTV & Station Logs",
    severity: "Elevated Risk",
    location: {
      name: "Suburban Railway Terminal Overbridge",
      neighborhood: "Old Station District",
      latitude: 28.6620,
      longitude: 77.2200,
      threeCoord: { x: 2.7, y: 2.0, z: -8.5 }
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 15),
    timeOfDay: "Night (22:00 - 06:00)",
    hour: 1,
    description: "Automated CCTV crowd density analytics detected persistent loitering on eastern ramp after last train arrival.",
    isAnonymous: false,
    corroboratedSourcesCount: 4,
    actionTaken: "Railway Protection Force Foot Patrol Increased",
    safeInterventions: [
      "Use West concourse escalators directly connected to taxi stand",
      "Station master office maintains direct CCTV monitor room"
    ]
  },
  {
    title: "Isolated Tech Park Service Road between 21:00 - 23:00",
    category: "Isolated Enclave",
    source: "NGO Crisis Hotlines",
    severity: "Caution Zone",
    location: {
      name: "Cyber Valley Rear Exit & Service Road",
      neighborhood: "IT Corridor",
      latitude: 28.4980,
      longitude: 77.0890,
      threeCoord: { x: -18.2, y: 1.3, z: 19.5 }
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 40),
    timeOfDay: "Night (22:00 - 06:00)",
    hour: 22,
    description: "Late-shift female tech employees reporting feeling vulnerable due to zero foot traffic and long distance to main highway cab pick-up.",
    isAnonymous: true,
    corroboratedSourcesCount: 2,
    actionTaken: "Corporate Security Consortium Marshals Assigned",
    safeInterventions: [
      "Request verified cab pick-up directly inside Tower 3 basement",
      "Guard escort on duty at Gate 4 till midnight"
    ]
  },
  {
    title: "Verified Safe Corridor: Heritage Garden Promenade",
    category: "Transit Vulnerability",
    source: "Crowdsourced Citizen App",
    severity: "Safe Corridor / Resolved",
    location: {
      name: "Heritage Garden Promenade Walkway",
      neighborhood: "Civic Center",
      latitude: 28.6180,
      longitude: 77.2150,
      threeCoord: { x: 1.5, y: 0.6, z: -1.0 }
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 60),
    timeOfDay: "Evening (18:00 - 22:00)",
    hour: 19,
    description: "Community-verified safe pathway with warm LED lighting every 10 meters, frequent family presence, and active CCTV.",
    isAnonymous: true,
    corroboratedSourcesCount: 5,
    actionTaken: "Declared Official Pink Safe Corridor with Free SOS Wi-Fi",
    safeInterventions: [
      "Recommended walking corridor connecting South and East Metro lines",
      "Cafe owners trained in Bystander Intervention & Sanctuary Protocol"
    ]
  },
  {
    title: "Verbal Harassment Reported at Late-Night Chemist Lane",
    category: "Verbal Abuse / Intimidation",
    source: "Police FIR Records",
    severity: "Caution Zone",
    location: {
      name: "Hospital Square Allied Lane",
      neighborhood: "Medical District",
      latitude: 28.5680,
      longitude: 77.2100,
      threeCoord: { x: 0.2, y: 1.1, z: 7.8 }
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    timeOfDay: "Night (22:00 - 06:00)",
    hour: 2,
    description: "Pharmacist reported harassment of women collecting urgent prescriptions. Combined with 2 crowdsourced pins from previous week.",
    isAnonymous: false,
    corroboratedSourcesCount: 2,
    actionTaken: "Police Emergency Beacon Installed outside 24/7 Pharmacy",
    safeInterventions: [
      "Use Hospital Main Entrance Gate for all night pharmacy access",
      "Hospital security guard escorts patients to parking"
    ]
  },
  {
    title: "Repeat Offender Loitering Cluster near Metro Substation",
    category: "Stalking",
    source: "NGO Crisis Hotlines",
    severity: "Elevated Risk",
    location: {
      name: "Metro Viaduct Pillar 140-148",
      neighborhood: "Outer Ring Expressway",
      latitude: 28.5350,
      longitude: 77.2650,
      threeCoord: { x: 8.4, y: 2.3, z: 12.0 }
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 14),
    timeOfDay: "Evening (18:00 - 22:00)",
    hour: 21,
    description: "Pattern analysis unmasked: 6 distinct anonymous calls over 3 weeks describing same silver hatchback trailing women walking from transit hub.",
    isAnonymous: true,
    corroboratedSourcesCount: 4,
    actionTaken: "High-Priority Police Patrol Intercept & License Plate ANPR Scan Alert",
    safeInterventions: [
      "Use designated e-bus feeder rather than walking under the flyover",
      "Dial 112 or local Women's helpline 1091 directly"
    ]
  },
  {
    title: "Safe Haven Transit Hub: Central Concourse & Women Lounge",
    category: "Transit Vulnerability",
    source: "Transit CCTV & Station Logs",
    severity: "Safe Corridor / Resolved",
    location: {
      name: "Central Interchange Terminal Concourse",
      neighborhood: "Downtown Hub",
      latitude: 28.6310,
      longitude: 77.2180,
      threeCoord: { x: 2.1, y: 0.5, z: -2.8 }
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
    timeOfDay: "Day (06:00 - 18:00)",
    hour: 14,
    description: "Fully staffed women safety assistance kiosk, well-lit charging stations, and dedicated quick-response team.",
    isAnonymous: false,
    corroboratedSourcesCount: 4,
    actionTaken: "Benchmark Safe Haven Facility Operational 24/7",
    safeInterventions: [
      "Access Women-Only Rest Lounge with attendant",
      "Immediate secure cab dispatch from monitored bay"
    ]
  }
];

const seedHotspots = [
  {
    id: "hs-1",
    name: "Central Metro Junction Underpass",
    neighborhood: "Downtown Hub",
    coordinates: { x: 2.6, y: 0, z: -3.2 },
    lat: 28.6328,
    lng: 77.2195,
    riskScore: 88,
    severity: "Elevated Risk",
    incidentCount: 14,
    peakHours: "21:00 - 02:00",
    primaryIssue: "Defunct lighting & blocked pedestrian line-of-sight",
    siloBreakdown: {
      policeFIRs: 2,
      ngoCrisisCalls: 4,
      crowdsourcedPins: 6,
      transitAlerts: 2
    },
    darkDataUnmasked: "Police only recorded 2 cases, but synthesis unmasked 12 unreported incidents.",
    recommendationsForWomen: "Divert through Gate 1 plaza. Avoid lower underpass after 21:00.",
    recommendationsForAuthorities: "Deploy emergency solar lighting and reposition CCTV camera #4."
  },
  {
    id: "hs-2",
    name: "Sector 14 Inter-State Bus Terminus",
    neighborhood: "Transit District",
    coordinates: { x: 4.7, y: 0, z: -4.8 },
    lat: 28.6415,
    lng: 77.2280,
    riskScore: 92,
    severity: "Elevated Risk",
    incidentCount: 19,
    peakHours: "20:00 - 23:30",
    primaryIssue: "Persistent stalking & unmonitored private vehicle pickups",
    siloBreakdown: {
      policeFIRs: 3,
      ngoCrisisCalls: 8,
      crowdsourcedPins: 5,
      transitAlerts: 3
    },
    darkDataUnmasked: "High correlation of NGO helpline calls pinpointed a repeat vehicle stalking pattern undetected by local beat.",
    recommendationsForWomen: "Board from well-lit Bay 2 only. Utilize Women's Security Escort.",
    recommendationsForAuthorities: "Install ANPR speed cameras and mandate verified QR badges on private feeder cabs."
  },
  {
    id: "hs-3",
    name: "Suburban Railway Terminal Overbridge",
    neighborhood: "Old Station District",
    coordinates: { x: 2.7, y: 0, z: -8.5 },
    lat: 28.6620,
    lng: 77.2200,
    riskScore: 84,
    severity: "Elevated Risk",
    incidentCount: 11,
    peakHours: "22:30 - 03:00",
    primaryIssue: "Late-night loitering & isolated eastern stairs",
    siloBreakdown: {
      policeFIRs: 1,
      ngoCrisisCalls: 3,
      crowdsourcedPins: 4,
      transitAlerts: 3
    },
    darkDataUnmasked: "Transit CCTV crowd AI flagged severe dwell times matching crowd reports.",
    recommendationsForWomen: "Use main western concourse with escalator.",
    recommendationsForAuthorities: "Close eastern stairs after 22:30 and reroute traffic to illuminated concourse."
  },
  {
    id: "hs-4",
    name: "Metro Viaduct Pillar 140-148",
    neighborhood: "Outer Ring Expressway",
    coordinates: { x: 8.4, y: 0, z: 12.0 },
    lat: 28.5350,
    lng: 77.2650,
    riskScore: 86,
    severity: "Elevated Risk",
    incidentCount: 13,
    peakHours: "19:30 - 22:30",
    primaryIssue: "Desolate stretch with zero pedestrian infrastructure",
    siloBreakdown: {
      policeFIRs: 1,
      ngoCrisisCalls: 6,
      crowdsourcedPins: 4,
      transitAlerts: 2
    },
    darkDataUnmasked: "Repeat offender corridor identified through combined spatio-temporal clustering.",
    recommendationsForWomen: "Take feeder e-rickshaws directly from station exit; do not walk along pillars.",
    recommendationsForAuthorities: "Continuous police cruiser patrols during peak evening dispersal."
  },
  {
    id: "hs-5",
    name: "Old Bazaar Narrow Alleyway",
    neighborhood: "Heritage Market",
    coordinates: { x: 5.5, y: 0, z: -6.4 },
    lat: 28.6510,
    lng: 77.2310,
    riskScore: 64,
    severity: "Caution Zone",
    incidentCount: 9,
    peakHours: "17:30 - 20:30",
    primaryIssue: "High crowding & narrow bottlenecks causing street harassment",
    siloBreakdown: {
      policeFIRs: 0,
      ngoCrisisCalls: 2,
      crowdsourcedPins: 7,
      transitAlerts: 0
    },
    darkDataUnmasked: "Zero police reports filed due to social stigma, but high crowd pin density.",
    recommendationsForWomen: "Walk in central illuminated pedestrian thoroughfares.",
    recommendationsForAuthorities: "Clear encroachments to widen choke points and station civil volunteers."
  },
  {
    id: "hs-6",
    name: "Cyber Valley Rear Exit & Service Road",
    neighborhood: "IT Corridor",
    coordinates: { x: -18.2, y: 0, z: 19.5 },
    lat: 28.4980,
    lng: 77.0890,
    riskScore: 61,
    severity: "Caution Zone",
    incidentCount: 8,
    peakHours: "21:00 - 00:30",
    primaryIssue: "Isolated service road with intermittent transit connectivity",
    siloBreakdown: {
      policeFIRs: 1,
      ngoCrisisCalls: 3,
      crowdsourcedPins: 3,
      transitAlerts: 1
    },
    darkDataUnmasked: "Night-shift corporate workers reporting unsafe last-mile walks to main road.",
    recommendationsForWomen: "Request security escort from campus gate to vehicle.",
    recommendationsForAuthorities: "Mandate direct-to-lobby employee pickups and install street poles."
  },
  {
    id: "hs-7",
    name: "Heritage Garden Promenade Walkway",
    neighborhood: "Civic Center",
    coordinates: { x: 1.5, y: 0, z: -1.0 },
    lat: 28.6180,
    lng: 77.2150,
    riskScore: 18,
    severity: "Safe Corridor / Resolved",
    incidentCount: 2,
    peakHours: "Low Risk All Hours",
    primaryIssue: "Previously unlit, now transformed into verified Safe Corridor",
    siloBreakdown: {
      policeFIRs: 0,
      ngoCrisisCalls: 0,
      crowdsourcedPins: 2,
      transitAlerts: 0
    },
    darkDataUnmasked: "Multi-agency lighting and community engagement turned a dark zone into a safe haven.",
    recommendationsForWomen: "Preferred walking path for commuters traversing North-South.",
    recommendationsForAuthorities: "Maintain active lighting sensors and solar battery backups."
  }
];

const seedSilos = [
  {
    id: "police",
    name: "Police FIR Records",
    role: "Official First Information Reports & Investigated Crimes",
    siloIssue: "Severe underreporting due to procedural intimidation, stigma, and filing delays. Captures <12% of everyday street harassment.",
    recordsSynthesized: 1420,
    updateCadence: "Daily 04:00 Sync",
    badgeColor: "#BD5D44", // Terracotta
    keyStrength: "Legal enforcement authority & formal investigations",
    darkDataCoverage: "High severity, low frequency"
  },
  {
    id: "ngo",
    name: "NGO Crisis Hotlines",
    role: "24/7 Distress Calls, Mental Health & Crisis Counseling Logs",
    siloIssue: "Held in private counselor logs and confidential databases. Rarely shared with urban planners or police.",
    recordsSynthesized: 1890,
    updateCadence: "Hourly Anonymized Stream",
    badgeColor: "#B8A6CE", // Warm Lavender
    keyStrength: "Real-time emotional distress detection & unvarnished truth",
    darkDataCoverage: "Captures psychological intimidation & repeat harassment"
  },
  {
    id: "crowd",
    name: "Crowdsourced Citizen App",
    role: "Community Micro-Reports (Broken Lights, Catcalling, Loitering)",
    siloIssue: "Fragmented across dozens of disconnected mobile apps without unified authority verification.",
    recordsSynthesized: 2640,
    updateCadence: "Instant Webhook Stream",
    badgeColor: "#E5C378", // Light Gold
    keyStrength: "Granular street-level infrastructure & environmental alerts",
    darkDataCoverage: "Early warning signs before crimes occur"
  },
  {
    id: "transit",
    name: "Transit CCTV & Station Logs",
    role: "Metro Turnstiles, Bus Terminal Cameras, Last-Mile Stand Flags",
    siloIssue: "Isolated in municipal transit silos; rarely cross-referenced with municipal police beats.",
    recordsSynthesized: 1350,
    updateCadence: "Real-time Automated Feed",
    badgeColor: "#F08C75", // Soft Coral
    keyStrength: "Objective sensor/camera feeds & commuter flow bottlenecks",
    darkDataCoverage: "Vulnerabilities in transit interchanges & parking zones"
  }
];

module.exports = { seedIncidents, seedHotspots, seedSilos };
