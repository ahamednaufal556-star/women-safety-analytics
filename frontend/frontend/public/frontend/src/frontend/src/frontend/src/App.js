import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Report from './pages/Report';
import Insights from './pages/Insights';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              🛡️ Women Safety Analytics
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">Heatmap</Link>
              </li>
              <li className="nav-item">
                <Link to="/analytics" className="nav-link">Analytics</Link>
              </li>
              <li className="nav-item">
                <Link to="/report" className="nav-link">Report</Link>
              </li>
              <li className="nav-item">
                <Link to="/insights" className="nav-link">Insights</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/report" element={<Report />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
