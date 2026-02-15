import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { getDestinations, addFavorite, getWeather } from '../utils/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBHyour-api-key-here'; // Replace with your actual key

function Explore() {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadDestinations();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = destinations.filter(dest =>
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDestinations(filtered);
    } else {
      setFilteredDestinations(destinations);
    }
  }, [searchTerm, destinations]);

  const loadDestinations = async () => {
    try {
      const response = await getDestinations();
      setDestinations(response.data.destinations);
      setFilteredDestinations(response.data.destinations);
    } catch (error) {
      console.error('Error loading destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadWeather = async (lat, lon) => {
    try {
      const response = await getWeather(lat, lon);
      setWeather(response.data.weather);
    } catch (error) {
      console.error('Error loading weather:', error);
    }
  };

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
    loadWeather(destination.latitude, destination.longitude);
  };

  const handleAddFavorite = async (destinationId) => {
    try {
      await addFavorite(destinationId);
      setMessage('✅ Added to favorites!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add to favorites');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) {
    return <div className="loading">Loading destinations...</div>;
  }

  return (
    <div className="destinations-page">
      <h1>Explore Destinations</h1>

      {message && (
        <div className={message.includes('✅') ? 'success' : 'error'}>
          {message}
        </div>
      )}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search destinations by name, country, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="destinations-grid">
        {filteredDestinations.map((destination) => (
          <div
            key={destination.id}
            className="destination-card"
            onClick={() => handleDestinationClick(destination)}
          >
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
                  className="btn-secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddFavorite(destination.id);
                  }}
                >
                  ❤️ Add to Favorites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDestination && (
        <div className="map-container">
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '400px' }}
              center={{
                lat: selectedDestination.latitude,
                lng: selectedDestination.longitude
              }}
              zoom={12}
            >
              <Marker
                position={{
                  lat: selectedDestination.latitude,
                  lng: selectedDestination.longitude
                }}
              />
            </GoogleMap>
          </LoadScript>
        </div>
      )}

      {weather && selectedDestination && (
        <div className="weather-widget">
          <h3>Weather in {selectedDestination.name}</h3>
          <div className="weather-info">
            <div className="weather-icon">🌤️</div>
            <div className="weather-details">
              <p className="weather-temp">{weather.temp}°C</p>
              <p>{weather.description}</p>
              <p>💧 Humidity: {weather.humidity}%</p>
              <p>💨 Wind Speed: {weather.wind_speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Explore;
