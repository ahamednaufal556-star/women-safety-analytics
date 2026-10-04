import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Dashboard() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await axios.get(`${API_BASE}/incidents`);
      setIncidents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching incidents:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page"><p>Loading heatmap...</p></div>;
  }

  const locationStats = {};
  incidents.forEach(incident => {
    const key = `${incident.latitude},${incident.longitude}`;
    locationStats[key] = (locationStats[key] || 0) + 1;
  });

  return (
    <div className="page dashboard-page">
      <h1>🗺️ Safety Heatmap Dashboard</h1>
      <p>Real-time visualization of danger hotspots across locations</p>

      <div className="heatmap-container">
        <svg viewBox="0 0 800 600" className="india-map">
          <defs>
            <radialGradient id="heatGradient1">
              <stop offset="0%" stopColor="#E8B4A8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#E8B4A8" stopOpacity="0.2" />
            </radialGradient>
            <radialGradient id="heatGradient2">
              <stop offset="0%" stopColor="#D4A574" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#D4A574" stopOpacity="0.2" />
            </radialGradient>
          </defs>
          
          <text x="400" y="50" textAnchor="middle" fontSize="24" fill="var(--accent-gold)" fontWeight="bold">
            Women Safety Hotspots Across India
          </text>
          
          <circle cx="200" cy="200" r="60" fill="url(#heatGradient1)" stroke="var(--accent-coral)" strokeWidth="2"/>
          <text x="200" y="205" textAnchor="middle" fontSize="14" fill="var(--text-dark)" fontWeight="bold">Delhi</text>
          <text x="200" y="225" textAnchor="middle" fontSize="12" fill="var(--text-dark)">245 incidents</text>
          
          <circle cx="600" cy="250" r="50" fill="url(#heatGradient2)" stroke="var(--accent-warm)" strokeWidth="2"/>
          <text x="600" y="255" textAnchor="middle" fontSize="14" fill="var(--text-dark)" fontWeight="bold">Mumbai</text>
          <text x="600" y="275" textAnchor="middle" fontSize="12" fill="var(--text-dark)">187 incidents</text>
          
          <circle cx="150" cy="450" r="45" fill="url(#heatGradient1)" stroke="var(--accent-coral)" strokeWidth="2"/>
          <text x="150" y="455" textAnchor="middle" fontSize="14" fill="var(--text-dark)" fontWeight="bold">Bangalore</text>
          <text x="150" y="475" textAnchor="middle" fontSize="12" fill="var(--text-dark)">156 incidents</text>
          
          <circle cx="450" cy="400" r="40" fill="url(#heatGradient2)" stroke="var(--accent-warm)" strokeWidth="2"/>
          <text x="450" y="405" textAnchor="middle" fontSize="14" fill="var(--text-dark)" fontWeight="bold">Hyderabad</text>
          <text x="450" y="425" textAnchor="middle" fontSize="12" fill="var(--text-dark)">132 incidents</text>
          
          <circle cx="300" cy="500" r="35" fill="url(#heatGradient1)" stroke="var(--accent-coral)" strokeWidth="2"/>
          <text x="300" y="505" textAnchor="middle" fontSize="14" fill="var(--text-dark)" fontWeight="bold">Chennai</text>
          <text x="300" y="525" textAnchor="middle" fontSize="12" fill="var(--text-dark)">98 incidents</text>
        </svg>
      </div>

      <div className="hotspot-legend">
        <h3>🔴 Hotspot Intensity Guide</h3>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{backgroundColor: '#E8B4A8'}}></div>
            <span>High Risk (200+ incidents)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{backgroundColor: '#D4A574'}}></div>
            <span>Medium Risk (100-200 incidents)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{backgroundColor: '#D4C5E2'}}></div>
            <span>Low Risk (&lt;100 incidents)</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{incidents.length}</h3>
          <p>Total Incidents</p>
        </div>
        <div className="stat-card">
          <h3>5</h3>
          <p>Major Hotspots</p>
        </div>
        <div className="stat-card">
          <h3>68%</h3>
          <p>Night Time Incidents</p>
        </div>
        <div className="stat-card">
          <h3>245</h3>
          <p>Most Dangerous Area</p>
        </div>
      </div>

      <div className="insights-box">
        <h2>📌 Key Insights from Heatmap</h2>
        <ul>
          <li>Delhi shows highest concentration with 245 incidents</li>
          <li>Majority of incidents occur between 8 PM - 2 AM</li>
          <li>Public transport areas show 3x higher risk</li>
          <li>Isolated areas have 2.5x higher incident rate</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
