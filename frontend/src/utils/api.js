import axios from 'axios';

const API_URL = 'http://Travelease-backend-env.eba-ynimte6r.us-east-1.elasticbeanstalk.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const getCurrentUser = () => api.get('/auth/me');

// Destinations APIs
export const getDestinations = (params) => api.get('/destinations', { params });
export const getDestination = (id) => api.get(`/destinations/${id}`);

// Favorites APIs
export const getFavorites = () => api.get('/favorites');
export const addFavorite = (destinationId) => api.post(`/favorites/${destinationId}`);
export const removeFavorite = (destinationId) => api.delete(`/favorites/${destinationId}`);

// Weather API
export const getWeather = (lat, lon) => api.get(`/weather?lat=${lat}&lon=${lon}`);

export default api;
