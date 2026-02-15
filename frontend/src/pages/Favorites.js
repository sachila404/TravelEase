import React, { useState, useEffect } from 'react';
import { getFavorites, removeFavorite } from '../utils/api';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const response = await getFavorites();
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (destinationId) => {
    try {
      await removeFavorite(destinationId);
      setFavorites(favorites.filter(fav => fav.id !== destinationId));
      setMessage('✅ Removed from favorites');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to remove favorite');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) {
    return <div className="loading">Loading favorites...</div>;
  }

  return (
    <div className="destinations-page">
      <h1>My Favorite Destinations ❤️</h1>

      {message && (
        <div className={message.includes('✅') ? 'success' : 'error'}>
          {message}
        </div>
      )}

      {favorites.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'white',
          borderRadius: '10px',
          marginTop: '30px'
        }}>
          <h2 style={{ color: '#666', marginBottom: '20px' }}>No favorites yet</h2>
          <p style={{ color: '#999', marginBottom: '30px' }}>
            Start exploring and add your favorite destinations!
          </p>
          <a
            href="/explore"
            style={{
              display: 'inline-block',
              padding: '12px 30px',
              background: '#667eea',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px'
            }}
          >
            Explore Destinations
          </a>
        </div>
      ) : (
        <div className="destinations-grid">
          {favorites.map((destination) => (
            <div key={destination.id} className="destination-card">
              <img
                src={destination.image_url}
                alt={destination.name}
                className="destination-image"
              />
              <div className="destination-content">
                <h3>{destination.name}</h3>
                <p className="destination-country">📍 {destination.country}</p>
                <p className="destination-description">{destination.description}</p>
                <div className="destination-actions">
                  <button
                    className="btn-secondary btn-danger"
                    onClick={() => handleRemoveFavorite(destination.id)}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
