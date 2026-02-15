const fs = require('fs');
const path = require('path');

// Database file path
const DB_FILE = path.join(__dirname, 'database.json');

// Initialize database with sample data
const initializeDatabase = () => {
  const initialData = {
    users: [],
    destinations: [
      {
        id: 1,
        name: 'Paris',
        description: 'The City of Light, known for the Eiffel Tower and art museums',
        latitude: 48.8566,
        longitude: 2.3522,
        country: 'France',
        image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'
      },
      {
        id: 2,
        name: 'Tokyo',
        description: 'A bustling metropolis blending tradition and modernity',
        latitude: 35.6762,
        longitude: 139.6503,
        country: 'Japan',
        image_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf'
      },
      {
        id: 3,
        name: 'New York',
        description: 'The Big Apple, famous for Times Square and Central Park',
        latitude: 40.7128,
        longitude: -74.0060,
        country: 'USA',
        image_url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9'
      },
      {
        id: 4,
        name: 'London',
        description: 'Historic city with Big Ben, Tower Bridge, and royal palaces',
        latitude: 51.5074,
        longitude: -0.1278,
        country: 'UK',
        image_url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad'
      },
      {
        id: 5,
        name: 'Dubai',
        description: 'Luxury destination with stunning architecture and beaches',
        latitude: 25.2048,
        longitude: 55.2708,
        country: 'UAE',
        image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'
      },
      {
        id: 6,
        name: 'Rome',
        description: 'Eternal City with ancient ruins and Renaissance art',
        latitude: 41.9028,
        longitude: 12.4964,
        country: 'Italy',
        image_url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5'
      },
      {
        id: 7,
        name: 'Barcelona',
        description: 'Vibrant city known for Gaudí architecture and beaches',
        latitude: 41.3851,
        longitude: 2.1734,
        country: 'Spain',
        image_url: 'https://images.unsplash.com/photo-1583422409516-2895a77efded'
      },
      {
        id: 8,
        name: 'Sydney',
        description: 'Beautiful harbor city with the iconic Opera House',
        latitude: -33.8688,
        longitude: 151.2093,
        country: 'Australia',
        image_url: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9'
      },
      {
        id: 9,
        name: 'Bali',
        description: 'Tropical paradise with temples, beaches, and rice terraces',
        latitude: -8.3405,
        longitude: 115.0920,
        country: 'Indonesia',
        image_url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4'
      },
      {
        id: 10,
        name: 'Maldives',
        description: 'Island paradise with crystal-clear waters and luxury resorts',
        latitude: 3.2028,
        longitude: 73.2207,
        country: 'Maldives',
        image_url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8'
      }
    ],
    favorites: []
  };

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    console.log('✅ Database initialized with sample data!');
  } else {
    console.log('✅ Database file already exists');
  }
};

// Read database
const readDB = () => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    initializeDatabase();
    return readDB();
  }
};

// Write database
const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing database:', error);
    throw error;
  }
};

// Database operations
const db = {
  // Users
  createUser: (username, email, password) => {
    const data = readDB();
    const newUser = {
      id: data.users.length + 1,
      username,
      email,
      password,
      created_at: new Date().toISOString()
    };
    data.users.push(newUser);
    writeDB(data);
    return newUser;
  },

  getUserByEmail: (email) => {
    const data = readDB();
    return data.users.find(user => user.email === email);
  },

  getUserByUsername: (username) => {
    const data = readDB();
    return data.users.find(user => user.username === username);
  },

  getUserById: (id) => {
    const data = readDB();
    return data.users.find(user => user.id === id);
  },

  // Destinations
  getAllDestinations: () => {
    const data = readDB();
    return data.destinations;
  },

  getDestinationById: (id) => {
    const data = readDB();
    return data.destinations.find(dest => dest.id === parseInt(id));
  },

  searchDestinations: (searchTerm) => {
    const data = readDB();
    const term = searchTerm.toLowerCase();
    return data.destinations.filter(dest =>
      dest.name.toLowerCase().includes(term) ||
      dest.description.toLowerCase().includes(term) ||
      dest.country.toLowerCase().includes(term)
    );
  },

  // Favorites
  getUserFavorites: (userId) => {
    const data = readDB();
    const userFavs = data.favorites.filter(fav => fav.user_id === userId);
    return userFavs.map(fav => {
      const destination = data.destinations.find(d => d.id === fav.destination_id);
      return destination;
    }).filter(Boolean);
  },

  addFavorite: (userId, destinationId) => {
    const data = readDB();
    
    // Check if already exists
    const exists = data.favorites.find(
      fav => fav.user_id === userId && fav.destination_id === destinationId
    );
    
    if (exists) {
      return null;
    }

    const newFav = {
      id: data.favorites.length + 1,
      user_id: userId,
      destination_id: destinationId,
      created_at: new Date().toISOString()
    };
    
    data.favorites.push(newFav);
    writeDB(data);
    return newFav;
  },

  removeFavorite: (userId, destinationId) => {
    const data = readDB();
    const initialLength = data.favorites.length;
    data.favorites = data.favorites.filter(
      fav => !(fav.user_id === userId && fav.destination_id === destinationId)
    );
    
    if (data.favorites.length < initialLength) {
      writeDB(data);
      return true;
    }
    return false;
  }
};

// Initialize database on load
initializeDatabase();

module.exports = db;
