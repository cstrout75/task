import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setCurrentPage('dashboard');
    } catch (error) {
      console.error("Login error:", error);
      return error.message;
    }
  };

  const handleSignup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setCurrentPage('dashboard');
    } catch (error) {
      console.error("Signup error:", error);
      return error.message;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentPage('home');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const renderPage = () => {
    if (loading) return <div className="loading">Loading...</div>;
    
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'login':
        return <Login 
          handleLogin={handleLogin} 
          handleSignup={handleSignup} 
          setCurrentPage={setCurrentPage} 
        />;
      case 'dashboard':
        return user ? 
          <Dashboard user={user} handleLogout={handleLogout} /> : 
          <Login 
            handleLogin={handleLogin} 
            handleSignup={handleSignup} 
            setCurrentPage={setCurrentPage} 
          />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app">
      <Navbar 
        user={user} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} 
        handleLogout={handleLogout}
      />
      <main className="main-content">
        {renderPage()}
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Your Company Name</p>
      </footer>
    </div>
  );
}

export default App;
