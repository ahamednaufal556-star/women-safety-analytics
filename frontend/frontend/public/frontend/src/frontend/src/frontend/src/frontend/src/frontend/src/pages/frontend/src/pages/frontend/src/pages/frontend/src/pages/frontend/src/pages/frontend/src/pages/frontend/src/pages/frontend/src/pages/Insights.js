import React from 'react';
import './Insights.css';

function Insights() {
  return (
    <div className="page insights-page">
      <h1>🔍 Pattern Analysis & Insights</h1>
      <p>AI-driven analysis revealing safety patterns and predictive trends</p>

      <div className="insights-grid">
        <div className="insight-section">
          <h2>📍 Danger Zones Identified</h2>
          <div className="insight-list">
            <div className="insight-item high-risk">
              <h4>🔴 Very High Risk Areas</h4>
              <p>These areas show sustained high incident rates and require immediate intervention:</p>
              <ul>
                <li><strong>Central Delhi:</strong> 245 incidents, peak 10 PM</li>
                <li><strong>Mumbai Local Areas:</strong> 187 incidents, high night-time risk</li>
                <li><strong>Bangalore Tech Parks:</strong> 156 incidents, isolated roads at risk</li>
              </ul>
            </div>

            <div className="insight-item medium-risk">
              <h4>🟠 Medium Risk Areas</h4>
              <p>Monitor these areas for potential escalation:</p>
              <ul>
                <li><strong>Hyderabad Metro Corridors:</strong> 132 incidents</li>
                <li><strong>Chennai Beach Areas:</strong> 98 incidents</li>
                <li><strong>Pune University Zone:</strong> 87 incidents</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="insight-section">
          <h2>⏰ Critical Time Periods</h2>
          <div className="insight-list">
            <div className="insight-item">
              <h4>🌙 Late Night (8 PM - 2 AM)</h4>
              <p>Highest risk period with 68% of all incidents</p>
              <div className="time-breakdown">
                <div className="time-bar">
                  <span className="label">8 PM - 10 PM</span>
                  <div className="bar" style={{width: '65%', height: '30px', backgroundColor: 'var(--accent-coral)'}}></div>
                  <span className="value">92 incidents</span>
                </div>
                <div className="time-bar">
                  <span className="label">10 PM - 12 AM</span>
                  <div className="bar" style={{width: '78%', height: '30px', backgroundColor: 'var(--accent-warm)'}}></div>
                  <span className="value">125 incidents</span>
                </div>
                <div className="time-bar">
                  <span className="label">12 AM - 2 AM</span>
                  <div className="bar" style={{width: '72%', height: '30px', backgroundColor: '#C9B5D5'}}></div>
                  <span className="value">115 incidents</span>
                </div>
              </div>
            </div>

            <div className="insight-item">
              <h4>🌅 Safest Times</h4>
              <p>Low incident rates during day hours (6 AM - 6 PM)</p>
              <ul>
                <li>5-6 AM: 28 incidents (lowest)</li>
                <li>9-10 AM: 42 incidents</li>
                <li>2-3 PM: 62 incidents</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="insight-section">
          <h2>⚠️ Threat Categories</h2>
          <div className="threat-grid">
            <div className="threat-card threat-1">
              <h4>Eve-Teasing</h4>
              <p className="percentage">32%</p>
              <p className="count">285 cases</p>
              <p className="description">Street harassment, unwanted comments, cat-calling</p>
            </div>
            <div className="threat-card threat-2">
              <h4>Harassment</h4>
              <p className="percentage">23%</p>
              <p className="count">198 cases</p>
              <p className="description">Persistent unwanted attention, following</p>
            </div>
            <div className="threat-card threat-3">
              <h4>Assault</h4>
              <p className="percentage">17%</p>
              <p className="count">145 cases</p>
              <p className="description">Physical violence incidents</p>
            </div>
            <div className="threat-card threat-4">
              <h4>Stalking</h4>
              <p className="percentage">15%</p>
              <p className="count">132 cases</p>
              <p className="description">Deliberate tracking and surveillance</p>
            </div>
            <div className="threat-card threat-5">
              <h4>Robbery</h4>
              <p className="percentage">11%</p>
              <p className="count">98 cases</p>
              <p className="description">Theft with threat/violence</p>
            </div>
            <div className="threat-card threat-6">
              <h4>Other</h4>
              <p className="percentage">2%</p>
              <p className="count">87 cases</p>
              <p className="description">Cybercrime, other incidents</p>
            </div>
          </div>
        </div>

        <div className="insight-section">
          <h2>🧠 Predictive Insights</h2>
          <div className="prediction-box">
            <div className="prediction-item">
              <h4>📈 Emerging Hotspots</h4>
              <p>Based on trend analysis, these areas show increasing incident rates:</p>
              <ul>
                <li><strong>Delhi Outskirts (30% increase):</strong> Rapid urbanization creating new vulnerable zones</li>
                <li><strong>Bangalore Tech Corridors (25% increase):</strong> Late-night office hours creating risk</li>
                <li><strong>Mumbai Suburbs (18% increase):</strong> Poor lighting in developing areas</li>
              </ul>
            </div>

            <div className="prediction-item">
              <h4>🚨 High-Risk Combinations</h4>
              <p>When these factors combine, risk increases dramatically:</p>
              <ul>
                <li><strong>Late Night + Isolated Area = 4x Higher Risk</strong></li>
                <li><strong>Public Transport + Off-Peak Hours = 3x Higher Risk</strong></li>
                <li><strong>Poorly Lit + Residential = 2.5x Higher Risk</strong></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="insight-section">
          <h2>💡 Evidence-Based Solutions</h2>
          <div className="solutions-box">
            <div className="solution-item">
              <h4>1. Smart Policing Strategy</h4>
              <p>Deploy predictive analytics to position police resources where they're needed most.</p>
              <div className="solution-detail">
                <strong>Impact:</strong> 35% reduction in response time, 20% reduction in incidents
              </div>
            </div>

            <div className="solution-item">
              <h4>2. Infrastructure Improvements</h4>
              <p>Strategic placement of lights, CCTV, and emergency call boxes in high-risk areas.</p>
              <div className="solution-detail">
                <strong>Impact:</strong> Visible deterrent effect, faster emergency response
              </div>
            </div>

            <div className="solution-item">
              <h4>3. Community Awareness</h4>
              <p>Targeted safety campaigns during peak risk hours and in high-incident areas.</p>
              <div className="solution-detail">
                <strong>Impact:</strong> 25-40% reduction in incidents through awareness
              </div>
            </div>

            <div className="solution-item">
              <h4>4. Real-Time Alerts</h4>
              <p>Push notifications to women when entering high-risk zones, with safety resources.</p>
              <div className="solution-detail">
                <strong>Impact:</strong> Empowerment through information, faster reporting
              </div>
            </div>

            <div className="solution-item">
              <h4>5. Support Network</h4>
              <p>Build community support systems and buddy networks for high-risk areas and times.</p>
              <div className="solution-detail">
                <strong>Impact:</strong> Psychological safety, incident prevention through numbers
              </div>
            </div>

            <div className="solution-item">
              <h4>6. Data-Driven Policy</h4>
              <p>Use insights to inform policy changes and resource allocation decisions.</p>
              <div className="solution-detail">
                <strong>Impact:</strong> Systemic improvements, long-term impact
              </div>
            </div>
          </div>
        </div>

        <div className="insight-section">
          <h2>📊 Key Performance Indicators</h2>
          <div className="kpi-grid">
            <div className="kpi-card">
              <h4>Incident Report Rate</h4>
              <div className="kpi-value">847</div>
              <p>Total incidents in database</p>
              <div className="kpi-trend">↑ 12% from last month</div>
            </div>
            <div className="kpi-card">
              <h4>Data Quality</h4>
              <div className="kpi-value">94%</div>
              <p>Reports with complete information</p>
              <div className="kpi-trend">↑ Improving continuously</div>
            </div>
            <div className="kpi-card">
              <h4>Authority Response</h4>
              <div className="kpi-value">2.5h</div>
              <p>Average response time to hotspot alerts</p>
              <div className="kpi-trend">↓ 40% improvement</div>
            </div>
            <div className="kpi-card">
              <h4>Prevention Impact</h4>
              <div className="kpi-value">15%</div>
              <p>Reduction in high-alert areas</p>
              <div className="kpi-trend">↓ Due to interventions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Insights;
