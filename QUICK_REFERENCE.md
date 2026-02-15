# Quick Reference Card - TravelEase

## 🚀 Start the App (Every Time)

### Step 1: Start Backend
```bash
cd Desktop/travelease-fullstack/backend
npm start
```
Wait for: "🚀 Server is running on port 5000"

### Step 2: Start Frontend (NEW window)
```bash
cd Desktop/travelease-fullstack/frontend
npm start
```
Browser opens automatically to: http://localhost:3000

## 🛑 Stop the App

Press `Ctrl+C` in both terminal windows

---

## 🔑 Test Account

**Email:** test@example.com  
**Password:** password123

---

## 📝 API Endpoints (For Testing)

- Backend: http://localhost:5000
- Frontend: http://localhost:3000

### Backend Routes:
- `GET /` - API info
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/destinations` - Get all destinations
- `GET /api/favorites` - Get user favorites
- `POST /api/favorites/:id` - Add to favorites
- `DELETE /api/favorites/:id` - Remove from favorites
- `GET /api/weather?lat=&lon=` - Get weather

---

## 🐛 Quick Fixes

### Backend won't start
```bash
cd backend
rm -rf node_modules
npm install
npm start
```

### Frontend won't start
```bash
cd frontend
rm -rf node_modules
npm install
npm start
```

### Reset database
```bash
cd backend
rm travelease.db
node database.js
npm start
```

### Change port (if 5000 is busy)
1. Edit `backend/.env`: Change `PORT=5000` to `PORT=5001`
2. Edit `frontend/package.json`: Change proxy to `http://localhost:5001`
3. Restart both servers

---

## 📦 Project Structure

```
travelease-fullstack/
├── backend/
│   ├── server.js          (Main API server)
│   ├── database.js        (Database setup)
│   ├── travelease.db      (SQLite database file)
│   ├── .env               (API keys)
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.js         (Main React app)
    │   ├── utils/api.js   (API calls)
    │   ├── components/    (Reusable components)
    │   │   └── Navbar.js
    │   └── pages/         (Different screens)
    │       ├── Home.js
    │       ├── Login.js
    │       ├── Register.js
    │       ├── Dashboard.js
    │       ├── Explore.js
    │       └── Favorites.js
    └── package.json
```

---

## ✅ Pre-Submission Checklist

- [ ] Can register new user
- [ ] Can login
- [ ] Can search destinations
- [ ] Map shows correctly
- [ ] Weather displays
- [ ] Can add favorites
- [ ] Can remove favorites
- [ ] Screenshots taken
- [ ] Report written

---

## 🎯 Demo Flow (5 minutes)

1. **Open homepage** (30 sec)
   - Show features section
   - Click "Get Started"

2. **Register** (30 sec)
   - Fill in form
   - Show success redirect

3. **Dashboard** (30 sec)
   - Show stats
   - Show quick links

4. **Explore** (2 min)
   - Show all destinations
   - Search for "Paris"
   - Click on Paris
   - Show map and weather

5. **Favorites** (1 min)
   - Add Paris to favorites
   - Go to Favorites page
   - Show saved destination
   - Remove it

6. **Logout/Login** (30 sec)
   - Logout
   - Login again
   - Back to dashboard

Total: ~5 minutes

---

## 📊 Stats to Mention

- **Lines of Code:** ~2000+
- **Files Created:** 15+
- **Technologies:** 6+
- **API Integrations:** 2
- **Features:** 8+
- **Development Time:** 6-8 hours

---

## 🔧 Useful Commands

### Check if Node.js is installed:
```bash
node --version
npm --version
```

### View running processes:
```bash
# Windows
netstat -ano | findstr :5000

# Mac/Linux
lsof -i :5000
```

### Kill process on port (if needed):
```bash
# Windows
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>
```

---

## 💡 Tips

1. **Always start backend first!**
2. **Keep both terminals open while using app**
3. **Check browser console (F12) for errors**
4. **Database file stores all data**
5. **API keys must be valid**
6. **Chrome works best**

---

## 🎓 For Presentation

**Opening:** "I built TravelEase, a full-stack web application that helps users discover and save their favorite travel destinations."

**Tech Stack:** "It uses React for the frontend, Node.js for the backend, SQLite for the database, and integrates with Google Maps and OpenWeather APIs."

**Features:** "Users can register, login, search destinations, view them on a map with real-time weather, and save their favorites."

**Architecture:** "It follows a client-server architecture with RESTful APIs and JWT authentication."

**Closing:** "This project demonstrates full-stack development skills including frontend design, backend API development, database management, and third-party API integration."

---

Print this card and keep it nearby! 📄
