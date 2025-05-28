import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProfileView from './components/ProfileView';
import './App.css';

const App = () => {
  const [currentView, setCurrentView] = useState('login');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedToken = sessionStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
      setCurrentView('profile');
    }
  }, []);

  const handleLoginSuccess = (receivedToken) => {
    setToken(receivedToken);
    sessionStorage.setItem('authToken', receivedToken);
    setCurrentView('profile');
    setError('');
  };

  const handleLogout = () => {
    setToken('');
    sessionStorage.removeItem('authToken');
    setCurrentView('login');
    setError('');
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  const clearError = () => {
    setError('');
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">Sistema de Autenticación</h1>
          <p className="app-subtitle">Mini Frontend para Microservicio</p>
        </header>

        {error && (
          <div className="error-container">
            <div className="error-box">
              <p className="error-title">Error:</p>
              <p className="error-message">{error}</p>
              <button className="error-close" onClick={clearError}>×</button>
            </div>
          </div>
        )}

        <main className="app-main">
          {currentView === 'login' && (
            <LoginForm
              onLoginSuccess={handleLoginSuccess}
              onError={handleError}
              onSwitchToRegister={() => setCurrentView('register')}
            />
          )}
          
          {currentView === 'register' && (
            <RegisterForm
              onRegisterSuccess={handleLoginSuccess}
              onError={handleError}
              onSwitchToLogin={() => setCurrentView('login')}
            />
          )}
          
          {currentView === 'profile' && (
            <ProfileView
              token={token}
              onError={handleError}
              onLogout={handleLogout}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;