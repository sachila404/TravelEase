# TravelEase - Complete Setup Instructions

## 📋 What You Have

A complete full-stack web application with:
- ✅ User Registration & Login
- ✅ SQLite Database (works locally, no cloud setup!)
- ✅ Node.js Backend API
- ✅ React Frontend
- ✅ Google Maps Integration
- ✅ Weather Information
- ✅ Favorites System

---

## 🎯 Step 1: Install Node.js (15 minutes)

1. **Download Node.js**
   - Go to: https://nodejs.org
   - Click the **LTS** version (recommended)
   - Download the installer for your operating system

2. **Install Node.js**
   - Run the downloaded installer
   - Keep clicking "Next" (use default settings)
   - Click "Install"
   - Wait for installation to complete

3. **Verify Installation**
   - Open Command Prompt (Windows) or Terminal (Mac/Linux)
   - Type: `node --version`
   - You should see something like: v18.17.0
   - Type: `npm --version`
   - You should see something like: 9.8.1

**If you see version numbers, you're good! ✅**

---

## 🎯 Step 2: Get API Keys (15 minutes)

### Google Maps API Key

1. Go to: https://console.cloud.google.com
2. Click "Create Project"
3. Name it "TravelEase"
4. Wait for project to be created
5. Go to "APIs & Services" > "Library"
6. Search for "Maps JavaScript API"
7. Click on it and click "ENABLE"
8. Go to "Credentials" (left menu)
9. Click "CREATE CREDENTIALS" > "API Key"
10. Copy your API key
11. Click "RESTRICT KEY" (important!)
12. Under "API restrictions", select "Restrict key"
13. Check "Maps JavaScript API"
14. Save

### OpenWeather API Key (Optional for now)

1. Go to: https://openweathermap.org/api
2. Click "Sign Up"
3. Create free account
4. Check your email and verify
5. Go to: https://home.openweathermap.org/api_keys
6. Copy your API key

**Note:** OpenWeather key takes 1-2 hours to activate. The app will show mock weather data until then.

---

## 🎯 Step 3: Setup the Project (30 minutes)

### A. Place Your Files

1. **Extract the project folder** to your Desktop
2. You should have a folder called `travelease-fullstack` with:
   - `backend` folder
   - `frontend` folder

### B. Setup Backend

1. **Open Command Prompt/Terminal**

2. **Navigate to backend folder:**
   ```bash
   cd Desktop/travelease-fullstack/backend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```
   (This will take 2-3 minutes. You'll see a progress bar)

4. **Add your API keys:**
   - Open the file `backend/.env` in Notepad (Windows) or TextEdit (Mac)
   - Replace `your_openweather_api_key_here` with your actual OpenWeather API key
   - Replace `your_google_maps_api_key_here` with your Google Maps API key
   - Save the file

5. **Initialize the database:**
   ```bash
   node database.js
   ```
   You should see: "Database initialized successfully!"

6. **Start the backend:**
   ```bash
   npm start
   ```
   You should see: "🚀 Server is running on port 5000"

**Keep this window open!** The backend needs to stay running.

### C. Setup Frontend

1. **Open a NEW Command Prompt/Terminal window**
   (Keep the backend window open!)

2. **Navigate to frontend folder:**
   ```bash
   cd Desktop/travelease-fullstack/frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```
   (This will take 5-10 minutes. Lots of packages to download!)

4. **Add your Google Maps API key:**
   - Open `frontend/src/pages/Explore.js`
   - Find line 5: `const GOOGLE_MAPS_API_KEY = 'AIzaSyBHyour-api-key-here';`
   - Replace `'AIzaSyBHyour-api-key-here'` with your actual Google Maps API key
   - Make sure to keep the quotes!
   - Example: `const GOOGLE_MAPS_API_KEY = 'AIzaSyB1234567890abcdefghij';`
   - Save the file

5. **Start the frontend:**
   ```bash
   npm start
   ```
   (Takes 1-2 minutes to compile)

Your browser should automatically open to: http://localhost:3000

**You should see the TravelEase home page! 🎉**

---

## 🎯 Step 4: Test Everything (20 minutes)

### Test 1: Registration
1. Click "Register" in the top right
2. Fill in:
   - Username: testuser
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
3. Click "Register"
4. You should be redirected to the Dashboard

**✅ If you see the dashboard, registration works!**

### Test 2: Login/Logout
1. Click "Logout" in the top right
2. Click "Login"
3. Enter:
   - Email: test@example.com
   - Password: password123
4. Click "Login"
5. You should be back at the Dashboard

**✅ If you can login, authentication works!**

### Test 3: Explore Destinations
1. Click "Explore" in the navigation
2. You should see 10 destinations (Paris, Tokyo, etc.)
3. Click on any destination card
4. You should see:
   - A map showing the location
   - Weather information

**✅ If the map and weather show, everything works!**

### Test 4: Favorites
1. On the Explore page, click "Add to Favorites" on a destination
2. You should see "✅ Added to favorites!"
3. Click "Favorites" in the navigation
4. You should see the destination you just added
5. Click "Remove" to remove it

**✅ If you can add and remove favorites, the database works!**

### Test 5: Search
1. Go to Explore page
2. Type "Paris" in the search box
3. You should only see Paris
4. Clear the search to see all destinations again

**✅ If search works, frontend logic is working!**

---

## 🎯 What to Do If Something Doesn't Work

### Backend Won't Start
- **Error: "Cannot find module..."**
  - Go to backend folder
  - Delete `node_modules` folder
  - Run `npm install` again

- **Error: "Port 5000 is already in use"**
  - Open `.env` file in backend folder
  - Change `PORT=5000` to `PORT=5001`
  - Also update `frontend/package.json`
  - Change `"proxy": "http://localhost:5000"` to `"proxy": "http://localhost:5001"`
  - Restart both servers

### Frontend Won't Start
- **Error: "Cannot find module..."**
  - Go to frontend folder
  - Delete `node_modules` folder
  - Run `npm install` again

- **Browser shows "Proxy error"**
  - Make sure backend is running first
  - Check that backend is on port 5000
  - Restart frontend: Press Ctrl+C, then `npm start`

### Map Not Showing
- Make sure you added your Google Maps API key
- Check that you enabled "Maps JavaScript API" in Google Cloud Console
- Wait 2-3 minutes after enabling (sometimes takes time)

### Weather Shows Demo Data
- Your OpenWeather API key might not be activated yet (takes 1-2 hours)
- For now, it will show mock data
- Come back in 2 hours and it should show real weather

### Can't Login After Registering
- Make sure backend is still running
- Check browser console (F12) for errors
- Try refreshing the page

---

## 📱 Features You Built

### User Authentication
- Register new account
- Login with email/password
- JWT token-based security
- Protected routes (can't access Dashboard without login)

### Destinations
- View 10 pre-loaded destinations
- Search destinations
- View on Google Maps
- See real-time weather

### Favorites
- Save favorite destinations
- View all favorites
- Remove favorites
- Persisted in database

### Database
- SQLite database (file: backend/travelease.db)
- Stores users, destinations, favorites
- Automatic schema creation
- Sample data pre-loaded

---

## 🎓 For Your University Presentation

### What to Say:
"I built a full-stack web application called TravelEase that helps users discover and plan their travel destinations."

### Technical Stack:
- **Frontend:** React.js (JavaScript framework)
- **Backend:** Node.js with Express (REST API)
- **Database:** SQLite (lightweight SQL database)
- **Authentication:** JWT (JSON Web Tokens)
- **APIs:** Google Maps API, OpenWeather API
- **Security:** Bcrypt password hashing

### Features to Demo:
1. **Show homepage** - explain the concept
2. **Register a new account** - show authentication
3. **Login** - show security
4. **Explore destinations** - show search and filtering
5. **Click a destination** - show map and weather integration
6. **Add to favorites** - show database interaction
7. **View favorites** - show user-specific data

### Architecture:
```
User's Browser
     ↓
React Frontend (Port 3000)
     ↓
REST API (Port 5000)
     ↓
SQLite Database
     ↓
External APIs (Google Maps, OpenWeather)
```

---

## 🚀 How to Run Daily

**Every time you want to use the app:**

1. Open Command Prompt/Terminal
2. Start Backend:
   ```bash
   cd Desktop/travelease-fullstack/backend
   npm start
   ```

3. Open NEW Command Prompt/Terminal
4. Start Frontend:
   ```bash
   cd Desktop/travelease-fullstack/frontend
   npm start
   ```

5. Use the app at: http://localhost:3000

**To stop:**
- Press Ctrl+C in both terminal windows

---

## 💾 Your Database File

The database is saved as `backend/travelease.db`

**To reset everything (start fresh):**
1. Close backend (Ctrl+C)
2. Delete `backend/travelease.db`
3. Run `node database.js` again
4. Start backend with `npm start`

All users and favorites will be deleted, and sample destinations will be re-added.

---

## 📸 Take Screenshots For Your Report

1. Homepage
2. Registration page
3. Login page
4. Dashboard
5. Explore page with destinations
6. A destination with map and weather showing
7. Favorites page

---

## ✅ Success Checklist

Before submitting, make sure:
- [ ] Can register new user
- [ ] Can login with existing user
- [ ] Can search destinations
- [ ] Map shows when clicking destination
- [ ] Weather displays for destination
- [ ] Can add to favorites
- [ ] Can view favorites
- [ ] Can remove from favorites
- [ ] All 10 destinations show on Explore page
- [ ] Dashboard shows correct stats
- [ ] Navigation works properly
- [ ] Can logout and login again

If all checked, your app is complete! 🎉

---

## 🎯 Time Estimate

- Setup (Node.js, API keys): 30 min
- Install dependencies: 15 min
- Testing: 20 min
- **Total: ~1 hour to get running**

Then you can use it, test it, take screenshots, and prepare your presentation!

---

## 🆘 Emergency Contacts

If you get completely stuck:
1. Read the error message carefully
2. Google the exact error
3. Check if both servers are running
4. Try restarting both servers
5. As a last resort, delete node_modules and npm install again

Remember: Most errors are typos in API keys or forgetting to start the backend first!

Good luck! You've got this! 🚀
