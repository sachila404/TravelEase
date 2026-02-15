import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div className="home-hero">
        <h1>Discover Your Next Adventure</h1>
        <p>Your smart travel companion for exploring the world's most amazing destinations</p>
        <Link to="/register" className="btn-primary">Get Started</Link>
      </div>

      <div className="home-features">
        <h2>Why Choose TravelEase?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3>Interactive Maps</h3>
            <p>Explore destinations with integrated Google Maps and detailed location information</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌤️</div>
            <h3>Live Weather</h3>
            <p>Get real-time weather updates for any destination before you travel</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>Save Favorites</h3>
            <p>Bookmark your dream destinations and access them anytime</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Smart Search</h3>
            <p>Find destinations quickly with our intelligent search feature</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
