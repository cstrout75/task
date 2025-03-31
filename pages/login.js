import React, { useState } from 'react';
import '../styles/Login.css';

function Login({ handleLogin, handleSignup, setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    const errorMessage = isLogin 
      ? await handleLogin(email, password)
      : await handleSignup(email, password);
      
    if (errorMessage) {
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="submit-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <div className="login-options">
          <button 
            className="toggle-form-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin 
              ? "Don't have an account? Sign Up" 
              : "Already have an account? Login"}
          </button>
          
          {isLogin && (
            <button className="forgot-password-button">
              Forgot Password?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
