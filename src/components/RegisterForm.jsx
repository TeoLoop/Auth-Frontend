import React, { useState } from 'react';
import '../styles/RegisterForm.css';

const API_BASE_URL = 'http://localhost:8080/api';

const RegisterForm = ({ onRegisterSuccess, onError, onSwitchToLogin }) => {
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    name: '',
    lastName: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { username, email, name, lastName, password } = registerForm;
    
    if (!username.trim()) {
      onError('El nombre de usuario es requerido');
      return false;
    }
    
    if (!email.trim()) {
      onError('El email es requerido');
      return false;
    }
    
    if (!email.includes('@')) {
      onError('El email debe tener un formato válido');
      return false;
    }
    
    if (!name.trim()) {
      onError('El nombre es requerido');
      return false;
    }
    
    if (!lastName.trim()) {
      onError('El apellido es requerido');
      return false;
    }
    
    if (!password.trim()) {
      onError('La contraseña es requerida');
      return false;
    }
    
    if (password.length < 6) {
      onError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerForm)
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token || 'token-received';
        onRegisterSuccess(token);
      } else {
        const errorData = await response.json().catch(() => ({}));
        onError(errorData.message || 'Error en el registro');
      }
    } catch (err) {
      onError('Error de conexión: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <div className="register-form">
      <div className="form-header">
        <div className="form-icon register-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="8.5" cy="7" r="4"/>
            <line x1="20" y1="8" x2="20" y2="14"/>
            <line x1="23" y1="11" x2="17" y2="11"/>
          </svg>
        </div>
        <h2 className="form-title">Crear Cuenta</h2>
      </div>

      <div className="form-content">
        <div className="input-group">
          <label className="input-label">Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            value={registerForm.username}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="form-input"
            placeholder="Ingresa tu nombre de usuario"
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Email</label>
          <input
            type="email"
            name="email"
            value={registerForm.email}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="form-input"
            placeholder="ejemplo@correo.com"
            disabled={loading}
          />
        </div>

        <div className="input-row">
          <div className="input-group">
            <label className="input-label">Nombre</label>
            <input
              type="text"
              name="name"
              value={registerForm.name}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="form-input"
              placeholder="Tu nombre"
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Apellido</label>
            <input
              type="text"
              name="lastName"
              value={registerForm.lastName}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="form-input"
              placeholder="Tu apellido"
              disabled={loading}
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Contraseña</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={registerForm.password}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="form-input password-input"
              placeholder="Mínimo 6 caracteres"
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
          onClick={handleRegister}
          disabled={loading}
          className="submit-button register-button"
        >
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              Registrando...
            </div>
          ) : (
            'Crear Cuenta'
          )}
        </button>
      </div>

      <div className="form-footer">
        <button
          onClick={onSwitchToLogin}
          className="switch-button"
          disabled={loading}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;