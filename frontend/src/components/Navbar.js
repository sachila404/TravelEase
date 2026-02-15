import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">🌍 TravelEase</Link>
        <div className="navbar-links">
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/explore">Explore</Link>
              <Link to="/favorites">Favorites</Link>
              <span className="navbar-user">Hi, {user.username}!</span>
              <button onClick={onLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
