import React, { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import '../styles/ProfileView.css';

const API_BASE_URL = 'http://localhost:8080/api';

const ProfileView = ({ token, onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchUsername, setSearchUsername] = useState('');

  const getUserProfile = async (username) => {
    if (!username.trim()) {
      setError('Por favor ingresa un nombre de usuario');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/user/${username}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al obtener el usuario');
      }
    } catch (err) {
      setError('Error de conexión: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getUserProfile(searchUsername);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-title">
            <User className="profile-icon" />
            <h2>Perfil de Usuario</h2>
          </div>
          <button
            onClick={onLogout}
            className="logout-btn"
          >
            <LogOut className="logout-icon" />
            Cerrar Sesión
          </button>
        </div>

        <div className="session-info">
          <div className="session-active">
            <p className="session-text">✓ Sesión activa</p>
            <p className="token-text">Token: {token.substring(0, 20)}...</p>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <p className="error-title">Error:</p>
            <p className="error-detail">{error}</p>
          </div>
        )}

        <div className="search-section">
          <label className="search-label">
            Buscar usuario por nombre de usuario:
          </label>
          <div className="search-container">
            <input
              type="text"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ej: administrador, admin..."
              className="search-input"
            />
            <button
              onClick={() => getUserProfile(searchUsername)}
              disabled={loading}
              className="search-btn"
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </div>

        {user && (
          <div className="user-info-section">
            <h3 className="user-info-title">Información del Usuario</h3>
            <div className="user-info-grid">
              <div className="user-field">
                <label className="field-label">Nombre</label>
                <p className="field-value">{user.name}</p>
              </div>
              <div className="user-field">
                <label className="field-label">Apellido</label>
                <p className="field-value">{user.lastName}</p>
              </div>
              <div className="user-field">
                <label className="field-label">Email</label>
                <p className="field-value">{user.email}</p>
              </div>
              <div className="user-field">
                <label className="field-label">Rol</label>
                <span className={`role-badge ${user.role === 'ADMIN' ? 'role-admin' : 'role-user'}`}>
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;