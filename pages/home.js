import React from 'react';
import '../styles/Home.css';

function Home({ setCurrentPage }) {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Your App</h1>
        <p>A simple and powerful application built with React and Firebase.</p>
        <div className="cta-buttons">
          <button 
            className="cta-button primary" 
            onClick={() => setCurrentPage('login')}
          >
            Get Started
          </button>
          <button className="cta-button secondary">
            Learn More
          </button>
        </div>
      </div>
      
      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Firebase Authentication</h3>
            <p>Secure user authentication with Firebase</p>
          </div>
          <div className="feature-card">
            <h3>Firestore Database</h3>
            <p>Store and sync data in real time</p>
          </div>
          <div className="feature-card">
            <h3>Responsive Design</h3>
            <p>Works on all devices and screen sizes</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
