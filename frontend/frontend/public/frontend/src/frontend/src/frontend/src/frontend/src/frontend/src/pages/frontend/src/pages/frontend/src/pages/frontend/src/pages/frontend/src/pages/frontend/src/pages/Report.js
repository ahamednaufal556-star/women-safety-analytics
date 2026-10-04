import React, { useState } from 'react';
import axios from 'axios';
import './Report.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Report() {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    time: '',
    severity: 'medium',
    source: 'crowdsourced'
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const incidentTypes = [
    'Eve-teasing',
    'Harassment',
    'Assault',
    'Stalking',
    'Robbery',
    'Cybercrime',
    'Other'
  ];

  const severityLevels = [
    { value: 'low', label: 'Low Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'high', label: 'High Risk' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post(`${API_BASE}/incidents`, {
        ...formData,
        latitude: Math.random() * 180 - 90,
        longitude: Math.random() * 360 - 180,
        timestamp: new Date()
      });

      setSubmitted(true);
      setFormData({
        type: '',
        location: '',
        description: '',
        time: '',
        severity: 'medium',
        source: 'crowdsourced'
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Error submitting report. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="page report-page">
      <h1>📢 Report an Incident</h1>
      <p>Help us protect women by reporting safety incidents. Your information is confidential and secure.</p>

      <div className="report-container">
        <div className="form-section">
          <div className="safety-notice">
            <h3>⚠️ Emergency?</h3>
            <p>If you or someone else is in immediate danger, please call the police emergency number first: <strong>100</strong></p>
          </div>

          {submitted && (
            <div className="success-message">
              ✅ Thank you! Your incident report has been submitted. Your information will be analyzed and included in our safety database.
            </div>
          )}

          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="report-form">
            <div className="form-group">
              <label htmlFor="type">Type of Incident *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Incident Type --</option>
                {incidentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location/Area *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Metro Station, Park, Street name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time of Incident</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="severity">Severity Level *</label>
              <select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
              >
                {severityLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Please provide details about the incident (keep it brief, max 500 characters)"
                maxLength={500}
                rows={5}
                required
              />
              <small>{formData.description.length}/500</small>
            </div>

            <div className="form-group">
              <label htmlFor="source">Data Source</label>
              <select
                id="source"
                name="source"
                value={formData.source}
                onChange={handleChange}
              >
                <option value="crowdsourced">Crowdsourced Report</option>
                <option value="police">Police Report</option>
                <option value="ngo">NGO Report</option>
                <option value="media">Media Report</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Submit Report</button>
              <button type="reset" className="btn btn-secondary">Clear Form</button>
            </div>

            <div className="privacy-notice">
              <p>
                <strong>Privacy Notice:</strong> Your personal information will not be publicly disclosed. 
                Only aggregated and anonymized data will be used for analysis and safety improvements.
              </p>
            </div>
          </form>
        </div>

        <div className="info-section">
          <div className="info-card">
            <h3>✅ What Happens After Reporting?</h3>
            <ol>
              <li>Your report is received and stored securely</li>
              <li>Data is cross-referenced with other reports</li>
              <li>Patterns are identified automatically</li>
              <li>Authorities are notified of high-risk areas</li>
              <li>Safety recommendations are generated</li>
            </ol>
          </div>

          <div className="info-card">
            <h3>🛡️ Your Rights</h3>
            <ul>
              <li>Anonymous reporting option available</li>
              <li>No personal data will be shared</li>
              <li>Support resources provided</li>
              <li>Access to your report anytime</li>
              <li>Can request data deletion</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>📞 Need Help?</h3>
            <p>If you need counseling or support services:</p>
            <ul>
              <li><strong>Police Emergency:</strong> 100</li>
              <li><strong>Women's Helpline:</strong> 1091</li>
              <li><strong>Domestic Violence:</strong> 181</li>
              <li><strong>Mental Health:</strong> 9820466726</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
