import React, { useState } from 'react';
import '../styles/LoginForm.css';

const API_BASE_URL = 'http://localhost:8080/api';

const LoginForm = ({ onLoginSuccess, onError, onSwitchToRegister }) => {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    if (!loginForm.username.trim() || !loginForm.password.trim()) {
      onError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm)
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token || 'token-received';
        onLoginSuccess(token);
      } else {
        const errorData = await response.json().catch(() => ({}));
        onError(errorData.message || 'Error en el login');
      }
    } catch (err) {
      onError('Error de conexión: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-form">
      <div className="form-header">
        <div className="form-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10,17 15,12 10,7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
        </div>
        <h2 className="form-title">Iniciar Sesión</h2>
      </div>

      <div className="form-content">
        <div className="input-group">
          <label className="input-label">Usuario</label>
          <input
            type="text"
            name="username"
            value={loginForm.username}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="form-input"
            placeholder="Ingresa tu usuario"
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Contraseña</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={loginForm.password}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="form-input password-input"
              placeholder="Ingresa tu contraseña"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
              disabled={loading}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="submit-button login-button"
        >
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              Iniciando...
            </div>
          ) : (
            'Iniciar Sesión'
          )}
        </button>
      </div>

      <div className="form-footer">
        <button
          onClick={onSwitchToRegister}
          className="switch-button"
          disabled={loading}
        >
          ¿No tienes cuenta? Regístrate
        </button>
      </div>
    </div>
  );
};

export default LoginForm;