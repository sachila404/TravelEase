import React, { useState, useEffect } from 'react';
import { getFavorites, getDestinations } from '../utils/api';

function Dashboard({ user }) {
  const [stats, setStats] = useState({
    favorites: 0,
    destinations: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [favoritesRes, destinationsRes] = await Promise.all([
        getFavorites(),
        getDestinations()
      ]);
      setStats({
        favorites: favoritesRes.data.favorites.length,
        destinations: destinationsRes.data.destinations.length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user.username}! 👋</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{stats.favorites}</h3>
          <p>Favorite Destinations</p>
        </div>

        <div className="stat-card">
          <h3>{stats.destinations}</h3>
          <p>Total Destinations</p>
        </div>

        <div className="stat-card">
          <h3>🌍</h3>
          <p>Countries Explored</p>
        </div>
      </div>

      <div style={{ marginTop: '40px', background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '20px' }}>Quick Links</h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          <a href="/explore" style={{ padding: '15px', background: '#667eea', color: 'white', textDecoration: 'none', borderRadius: '5px', textAlign: 'center' }}>
            🔍 Explore Destinations
          </a>
          <a href="/favorites" style={{ padding: '15px', background: '#764ba2', color: 'white', textDecoration: 'none', borderRadius: '5px', textAlign: 'center' }}>
            ❤️ View My Favorites
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
