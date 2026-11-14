import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';

export default function AdminLogin({ onCancel }) {
  const { loginAdmin, navigateTo } = useStudio();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const result = await loginAdmin(email, password, remember);
      if (!result.success) {
        setErrorMessage(result.message || 'Invalid email or password.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@velustudio.com');
    setPassword('admin123');
    setErrorMessage('');
  };

  const handleBackToWebsite = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigateTo('website');
    }
  };

  return (
    <div className="admin-login-wrapper">
      {/* Background Ambient Glows */}
      <div className="admin-login-ambient-1" />
      <div className="admin-login-ambient-2" />

      <div className="admin-login-card">
        {/* Brand Aperture Icon */}
        <div className="admin-login-header">
          <div className="admin-login-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>SECURITY ACCESS</span>
          </div>

          <div className="admin-login-icon">
            <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 8 L86 29 L86 71 L50 92 L14 71 L14 29 Z" fill="#18181D" stroke="#B9822E" strokeWidth="2.5" />
              <polygon points="50,22 66,38 52,48" fill="#E91E4D" />
              <polygon points="66,38 72,60 58,58" fill="#B9822E" />
              <polygon points="72,60 50,78 48,62" fill="#DFB25E" />
              <polygon points="50,78 34,62 48,52" fill="#E91E4D" />
              <polygon points="34,62 28,40 42,42" fill="#DFB25E" />
              <polygon points="28,40 50,22 52,38" fill="#F4EFE6" />
              <circle cx="50" cy="50" r="11" fill="#0E0E11" />
              <circle cx="50" cy="50" r="6" fill="#E91E4D" />
            </svg>
          </div>

          <h2 className="admin-login-title">Studio Admin Portal</h2>
          <p className="admin-login-subtitle">
            Sign in with your email and password to access the photography control panel.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="admin-login-error">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-login-field">
            <label htmlFor="admin-email">Admin Email Address</label>
            <div className="admin-login-input-wrapper">
              <svg className="admin-login-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input
                id="admin-email"
                type="email"
                placeholder="e.g. admin@velustudio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="admin-login-field">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label htmlFor="admin-password" style={{ margin: 0 }}>Password</label>
            </div>
            <div className="admin-login-input-wrapper">
              <svg className="admin-login-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-login-pwd-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="admin-login-options">
            <label className="admin-login-checkbox-label">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember login session</span>
            </label>
          </div>

          <button
            type="submit"
            className="btn-admin-submit-login"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Admin Dashboard</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Helper Pill */}
        <div className="admin-login-demo-helper">
          <div className="d-flex align-items-center justify-content-between">
            <span className="admin-demo-text">
              🔑 Demo Access: <strong>admin@velustudio.com</strong> / <strong>admin123</strong>
            </span>
            <button
              type="button"
              className="btn-autofill-demo"
              onClick={handleFillDemo}
              title="Click to automatically fill credentials"
            >
              Autofill
            </button>
          </div>
        </div>

        {/* Back to Live Website Footer */}
        <div className="admin-login-footer">
          <button
            type="button"
            className="btn-login-back-site"
            onClick={handleBackToWebsite}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Return to Live Website</span>
          </button>
        </div>
      </div>
    </div>
  );
}

