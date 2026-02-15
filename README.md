# TravelEase - Full Stack Web Application

A complete travel companion web application built with React and Node.js.

## 🎯 What's Included

This package contains a fully functional web application with:

- ✅ User Registration & Login (JWT Authentication)
- ✅ SQLite Database (No cloud setup required!)
- ✅ Node.js Backend with Express
- ✅ React Frontend
- ✅ Google Maps Integration
- ✅ Real-time Weather Information
- ✅ Favorites System
- ✅ Search Functionality
- ✅ 10 Pre-loaded Destinations

## 📂 Project Structure

```
travelease-fullstack/
├── backend/                  # Node.js Backend
│   ├── server.js            # Main API server
│   ├── database.js          # Database initialization
│   ├── package.json         # Backend dependencies
│   └── .env                 # Environment variables (API keys)
│
├── frontend/                # React Frontend
│   ├── src/
│   │   ├── App.js          # Main application
│   │   ├── App.css         # Styles
│   │   ├── index.js        # Entry point
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Application pages
│   │   └── utils/          # API utilities
│   ├── public/             # Static files
│   └── package.json        # Frontend dependencies
│
├── COMPLETE_SETUP_GUIDE.md  # Detailed setup instructions
├── QUICK_REFERENCE.md       # Quick commands reference
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js installed (download from https://nodejs.org)
- Google Maps API key
- OpenWeather API key (optional, mock data provided)

### Installation

1. **Navigate to backend folder:**
   ```bash
   cd backend
   npm install
   node database.js
   npm start
   ```

2. **In a new terminal, navigate to frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Open browser to:** http://localhost:3000

For detailed setup instructions, see `COMPLETE_SETUP_GUIDE.md`

## 🔑 Features

### Authentication
- User registration with validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- Protected routes

### Destinations
- Browse 10 pre-loaded destinations
- Search by name, country, or description
- View details with images
- Interactive Google Maps
- Real-time weather information

### Favorites
- Save favorite destinations
- View all favorites
- Remove from favorites
- Persistent storage in SQLite database

### User Interface
- Responsive design
- Clean and modern UI
- Easy navigation
- Smooth user experience

## 🛠️ Technology Stack

### Frontend
- React.js
- React Router
- Axios
- Google Maps React
- CSS3

### Backend
- Node.js
- Express.js
- SQLite (better-sqlite3)
- JWT (jsonwebtoken)
- Bcrypt.js
- Axios

### APIs
- Google Maps JavaScript API
- OpenWeather API

## 📖 Documentation

- **COMPLETE_SETUP_GUIDE.md** - Comprehensive setup instructions
- **QUICK_REFERENCE.md** - Quick commands and tips

## 🧪 Testing

### Test User
You can create your own account or use:
- Email: test@example.com
- Password: password123

### Test Flow
1. Register a new account
2. Login
3. View Dashboard
4. Explore destinations
5. Search for destinations
6. View destination on map
7. Check weather
8. Add to favorites
9. View favorites
10. Remove from favorites

## 📸 Screenshots

Take screenshots of:
- Home page
- Registration/Login
- Dashboard
- Explore page with destinations
- Map and weather display
- Favorites page

## 🎓 For University Submission

### What to Include:
1. This entire folder
2. Screenshots of the app running
3. A report describing:
   - Technologies used
   - Features implemented
   - Challenges faced
   - Architecture diagram

### Presentation Tips:
1. Start with the concept
2. Demo the features live
3. Explain the tech stack
4. Show the code structure
5. Discuss challenges and solutions

## 🐛 Troubleshooting

### Common Issues:

**Backend won't start**
- Ensure Node.js is installed
- Run `npm install` in backend folder
- Check that port 5000 is available

**Frontend won't start**
- Run `npm install` in frontend folder
- Make sure backend is running first
- Check browser console for errors

**Map not showing**
- Verify Google Maps API key
- Check that Maps JavaScript API is enabled
- Wait 2-3 minutes after enabling API

**Weather shows demo data**
- OpenWeather API key needs 1-2 hours to activate
- Mock data will display until then

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get single destination

### Favorites
- `GET /api/favorites` - Get user favorites
- `POST /api/favorites/:id` - Add to favorites
- `DELETE /api/favorites/:id` - Remove from favorites

### Weather
- `GET /api/weather?lat=&lon=` - Get weather data

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- CORS enabled
- Input validation

## 📊 Database Schema

### Users Table
- id (Primary Key)
- username (Unique)
- email (Unique)
- password (Hashed)
- created_at

### Destinations Table
- id (Primary Key)
- name
- description
- latitude
- longitude
- country
- image_url
- created_at

### Favorites Table
- id (Primary Key)
- user_id (Foreign Key)
- destination_id (Foreign Key)
- created_at

## 🎯 Learning Outcomes

By completing this project, you've learned:
- Full-stack web development
- React.js frontend development
- Node.js backend development
- RESTful API design
- Database management
- Authentication & Authorization
- Third-party API integration
- Responsive web design

## 🌟 Future Enhancements

Possible additions:
- User profile editing
- Reviews and ratings
- Itinerary planning
- Social features (share destinations)
- Admin dashboard
- More destinations
- Advanced search filters
- Image upload for users
- Email notifications
- Mobile responsive improvements

## 📞 Support

If you encounter issues:
1. Read the error message carefully
2. Check the COMPLETE_SETUP_GUIDE.md
3. Verify API keys are correct
4. Ensure both servers are running
5. Check browser console (F12) for errors

## ✅ Checklist Before Submission

- [ ] Both servers start without errors
- [ ] Can register new user
- [ ] Can login with existing user
- [ ] All destinations display
- [ ] Search works
- [ ] Map shows correctly
- [ ] Weather displays
- [ ] Can add to favorites
- [ ] Can view favorites
- [ ] Can remove from favorites
- [ ] Screenshots captured
- [ ] Documentation complete
- [ ] Code is clean and commented

## 🎉 Congratulations!

You now have a complete, working full-stack web application!

**Estimated Development Time:** 6-8 hours
**Lines of Code:** 2000+
**Technologies Used:** 6+
**Features Implemented:** 8+

Good luck with your project! 🚀
