import React from 'react';
import '../styles/Navbar.css';

function Navbar({ user, currentPage, setCurrentPage, handleLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => setCurrentPage('home')}>
        <h1>Your App Name</h1>
      </div>
      <ul className="navbar-nav">
        <li className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}>
          <button 
            className="nav-link" 
            onClick={() => setCurrentPage('home')}
          >
            Home
          </button>
        </li>
        {user ? (
          <>
            <li className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}>
              <button 
                className="nav-link" 
                onClick={() => setCurrentPage('dashboard')}
              >
                Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li className={`nav-item ${currentPage === 'login' ? 'active' : ''}`}>
            <button 
              className="nav-link" 
              onClick={() => setCurrentPage('login')}
            >
              Login
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
