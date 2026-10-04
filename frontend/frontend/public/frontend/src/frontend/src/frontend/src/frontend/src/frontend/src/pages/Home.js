import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="page home-page">
      <div className="hero">
        <h1>Women Safety Analytics Platform</h1>
        <p>Protecting Women from Safety Threats Through Data Integration & Analytics</p>
      </div>

      <div className="container">
        <div className="three-d-section">
          <svg viewBox="0 0 400 500" className="woman-3d">
            <defs>
              <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#F5C89A', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#E8B899', stopOpacity: 1}} />
              </linearGradient>
              <linearGradient id="clothGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#D4C5E2', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#C4B5D2', stopOpacity: 1}} />
              </linearGradient>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3"/>
              </filter>
            </defs>
            
            <ellipse cx="200" cy="450" rx="80" ry="20" fill="rgba(74,74,74,0.2)"/>
            
            <rect x="175" y="320" width="15" height="100" fill="url(#skinGradient)" rx="7"/>
            <rect x="210" y="320" width="15" height="100" fill="url(#skinGradient)" rx="7"/>
            
            <path d="M 160 200 L 150 320 L 250 320 L 240 200 Z" fill="url(#clothGradient)"/>
            
            <g>
              <path d="M 160 240 Q 120 180 100 140" stroke="url(#skinGradient)" strokeWidth="20" fill="none" strokeLinecap="round"/>
              <circle cx="95" cy="135" r="15" fill="url(#skinGradient)"/>
              
              <path d="M 240 240 Q 280 180 300 140" stroke="url(#skinGradient)" strokeWidth="20" fill="none" strokeLinecap="round"/>
              <circle cx="305" cy="135" r="15" fill="url(#skinGradient)"/>
            </g>
            
            <ellipse cx="200" cy="220" rx="45" ry="55" fill="url(#clothGradient)"/>
            
            <rect x="190" y="150" width="20" height="30" fill="url(#skinGradient)" rx="10"/>
            
            <circle cx="200" cy="120" r="35" fill="url(#skinGradient)"/>
            
            <path d="M 165 110 Q 165 75 200 70 Q 235 75 235 110" fill="#8B6F47"/>
            
            <circle cx="190" cy="115" r="4" fill="#4A4A4A"/>
            <circle cx="210" cy="115" r="4" fill="#4A4A4A"/>
            <path d="M 195 130 Q 200 135 205 130" stroke="#4A4A4A" strokeWidth="2" fill="none" strokeLinecap="round"/>
            
            <rect x="85" y="115" width="20" height="50" fill="#D4A574" rx="5"/>
            <circle cx="95" cy="110" r="12" fill="#FFD700" opacity="0.8"/>
            <circle cx="95" cy="110" r="8" fill="#FFA500" opacity="0.6"/>
            
            <rect x="295" y="115" width="20" height="50" fill="#D4A574" rx="5"/>
            <circle cx="305" cy="110" r="12" fill="#FFD700" opacity="0.8"/>
            <circle cx="305" cy="110" r="8" fill="#FFA500" opacity="0.6"/>
            
            <circle cx="200" cy="150" r="90" fill="none" stroke="#E8C4A0" strokeWidth="2" opacity="0.4"/>
            <circle cx="200" cy="150" r="100" fill="none" stroke="#D4A574" strokeWidth="1" opacity="0.3"/>
          </svg>
        </div>

        <div className="problem-box">
          <h2>🎯 The Problem</h2>
          <p>
            Most women safety data exists in silos—police reports, NGO records, crowd-sourced apps, 
            transport authorities—creating a fragmented picture. There's no unified analytics platform 
            that synthesizes this dark data to reveal patterns, hotspots, and repeat offenders, leaving 
            authorities and women unable to make informed decisions.
          </p>
        </div>

        <div className="solution-box">
          <h2>💡 Our Solution</h2>
          <p>
            A unified, real-time analytics platform that integrates fragmented safety data from multiple 
            sources to identify danger hotspots, predict high-risk areas and times, and empower women with 
            actionable safety insights.
          </p>
        </div>

        <div className="features">
          <h2>✨ Key Features</h2>
          <div className="grid">
            <div className="card">
              <h3>🗺️ Interactive Heatmap</h3>
              <p>Visualize danger hotspots across locations in real-time</p>
            </div>
            <div className="card">
              <h3>📊 Advanced Analytics</h3>
              <p>Analyze patterns by location, time, and incident type</p>
            </div>
            <div className="card">
              <h3>📢 Incident Reporting</h3>
              <p>Easy reporting system integrated with analytics</p>
            </div>
            <div className="card">
              <h3>🔍 Pattern Recognition</h3>
              <p>Identify trends and predict future high-risk areas</p>
            </div>
            <div className="card">
              <h3>💪 Empowerment Focused</h3>
              <p>Designed to empower, not frighten. Focus on solutions.</p>
            </div>
            <div className="card">
              <h3>🤝 Data Integration</h3>
              <p>Unifies data from police, NGOs, and crowd-sourced reports</p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Explore?</h2>
          <div className="cta-buttons">
            <Link to="/dashboard" className="btn btn-primary">View Heatmap</Link>
            <Link to="/analytics" className="btn btn-secondary">See Analytics</Link>
            <Link to="/report" className="btn btn-primary">Report Incident</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
