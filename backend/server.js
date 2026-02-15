const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();

const db = require('./database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// JWT verification middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// ==================== AUTH ROUTES ====================

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingUser = db.getUserByEmail(email) || db.getUserByUsername(username);
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = db.createUser(username, email, hashedPassword);

    // Generate token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = db.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user
app.get('/api/auth/me', verifyToken, (req, res) => {
  try {
    const user = db.getUserById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ==================== DESTINATIONS ROUTES ====================

// Get all destinations
app.get('/api/destinations', (req, res) => {
  try {
    const { search } = req.query;
    
    let destinations;
    
    if (search) {
      destinations = db.searchDestinations(search);
    } else {
      destinations = db.getAllDestinations();
    }

    res.json({ destinations });
  } catch (error) {
    console.error('Get destinations error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single destination
app.get('/api/destinations/:id', (req, res) => {
  try {
    const destination = db.getDestinationById(req.params.id);
    
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.json({ destination });
  } catch (error) {
    console.error('Get destination error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ==================== FAVORITES ROUTES ====================

// Get user favorites
app.get('/api/favorites', verifyToken, (req, res) => {
  try {
    const favorites = db.getUserFavorites(req.userId);
    res.json({ favorites });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add to favorites
app.post('/api/favorites/:destinationId', verifyToken, (req, res) => {
  try {
    const { destinationId } = req.params;

    // Check if destination exists
    const destination = db.getDestinationById(destinationId);
    
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    // Add to favorites
    const result = db.addFavorite(req.userId, parseInt(destinationId));
    
    if (!result) {
      return res.status(400).json({ message: 'Already in favorites' });
    }

    res.json({ message: 'Added to favorites', destination });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove from favorites
app.delete('/api/favorites/:destinationId', verifyToken, (req, res) => {
  try {
    const { destinationId } = req.params;

    const success = db.removeFavorite(req.userId, parseInt(destinationId));

    if (!success) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ==================== WEATHER ROUTE ====================

// Get weather for location
app.get('/api/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    // For demo purposes, return mock data if API key not set
    if (!process.env.OPENWEATHER_API_KEY || process.env.OPENWEATHER_API_KEY === 'your_openweather_api_key_here') {
      return res.json({
        weather: {
          temp: 22,
          description: 'Clear sky',
          icon: '01d',
          humidity: 65,
          wind_speed: 5.2
        }
      });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    const weatherData = {
      temp: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      humidity: response.data.main.humidity,
      wind_speed: response.data.wind.speed
    };

    res.json({ weather: weatherData });
  } catch (error) {
    console.error('Weather error:', error);
    res.status(500).json({ message: 'Failed to fetch weather data', error: error.message });
  }
});

// ==================== TEST ROUTE ====================

app.get('/', (req, res) => {
  res.json({ 
    message: 'TravelEase API is running!',
    database: 'JSON file (no compilation needed!)',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me'
      },
      destinations: {
        list: 'GET /api/destinations',
        single: 'GET /api/destinations/:id'
      },
      favorites: {
        list: 'GET /api/favorites',
        add: 'POST /api/favorites/:destinationId',
        remove: 'DELETE /api/favorites/:destinationId'
      },
      weather: 'GET /api/weather?lat=&lon='
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`📁 Database: JSON file (Simple and fast!)`);
});
