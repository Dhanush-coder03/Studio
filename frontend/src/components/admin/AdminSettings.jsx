import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';

export default function AdminSettings() {
  const {
    images,
    services,
    gallery,
    packages,
    contactInfo,
    inquiries,
    resetToDefaults,
    seedBackendDatabase,
    backendStatus,
    showToast,
    adminCredentials,
    updateAdminCredentials,
  } = useStudio();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState(adminCredentials?.email || 'admin@velustudio.com');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityStatus, setSecurityStatus] = useState(null);

  const handleExportJson = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      studioName: contactInfo.studioName,
      images,
      services,
      gallery,
      packages,
      contactInfo,
      inquiries,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `velu-studio-data-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported studio configuration to JSON file');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all Studio images, services, gallery items, packages, and inquiries to factory demo defaults?')) {
      resetToDefaults();
    }
  };

  const handleUpdateSecurity = (e) => {
    e.preventDefault();
    setSecurityStatus(null);

    if (!currentPassword) {
      setSecurityStatus({ type: 'error', message: 'Please enter your current password to authorize changes.' });
      return;
    }
    if (!newPassword || newPassword.length < 4) {
      setSecurityStatus({ type: 'error', message: 'New password must be at least 4 characters.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setSecurityStatus({ type: 'error', message: 'New password and confirmation do not match.' });
      return;
    }

    const res = updateAdminCredentials(currentPassword, newEmail, newPassword);
    if (res.success) {
      setSecurityStatus({ type: 'success', message: 'Admin email and password updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setSecurityStatus({ type: 'error', message: res.message });
    }
  };

  return (
    <div className="admin-settings-view">
      <div className="row g-4">
        {/* MongoDB Database Sync */}
        <div className="col-12">
          <div className="admin-card" style={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, fontFamily: 'var(--admin-font-serif)' }}>
                    MongoDB Database Synchronization
                  </h3>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      background: backendStatus === 'connected' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: backendStatus === 'connected' ? '#10B981' : '#F59E0B',
                    }}
                  >
                    {backendStatus === 'connected' ? '● Connected' : '● Ready to Connect'}
                  </span>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--admin-text-muted)', margin: 0 }}>
                  Populate your MongoDB database with the default photography services, portfolio reels, packages, and studio contact data.
                </p>
              </div>

              <button
                type="button"
                className="btn-gold-primary"
                style={{ whiteSpace: 'nowrap' }}
                onClick={() => {
                  if (window.confirm('Seed your MongoDB database collections with studio data?')) {
                    seedBackendDatabase(true);
                  }
                }}
              >
                <span>⚡ Seed Database Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Admin Security & Password Settings */}
        <div className="col-12">
          <div className="admin-card" style={{ borderColor: 'rgba(185, 130, 46, 0.3)' }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--admin-gold)" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, fontFamily: 'var(--admin-font-serif)' }}>
                Admin Security & Credentials
              </h3>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--admin-text-muted)', marginBottom: '16px' }}>
              Update the email address and password required to access the Studio Admin Panel.
            </p>

            {securityStatus && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  fontSize: '0.84rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: securityStatus.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(233, 30, 77, 0.15)',
                  color: securityStatus.type === 'success' ? '#10B981' : '#FF4B72',
                  border: `1px solid ${securityStatus.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(233, 30, 77, 0.3)'}`,
                }}
              >
                <span>{securityStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleUpdateSecurity}>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <label className="admin-form-label">Current Password (Required)</label>
                  <input
                    type="password"
                    className="admin-form-input"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="admin-form-label">Admin Email</label>
                  <input
                    type="email"
                    className="admin-form-input"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="admin-form-label">New Password</label>
                  <input
                    type="password"
                    className="admin-form-input"
                    placeholder="At least 4 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="admin-form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="admin-form-input"
                    placeholder="Repeat new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 d-flex align-items-center justify-content-between pt-2">
                  <span style={{ fontSize: '0.78rem', color: 'var(--admin-text-dim)' }}>
                    Current active login: <strong>{adminCredentials?.email}</strong>
                  </span>
                  <button type="submit" className="btn-gold-primary">
                    <span>Save New Credentials</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Backup & Export */}
        <div className="col-12 col-md-6">
          <div className="admin-card h-100">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 8px 0', fontFamily: 'var(--admin-font-serif)' }}>
              Export Studio Data
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--admin-text-muted)', marginBottom: '18px' }}>
              Download a complete JSON snapshot containing all your media items, custom services, gallery portfolio, pricing packages, and incoming leads.
            </p>

            <button
              type="button"
              className="btn-gold-primary"
              onClick={handleExportJson}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download JSON Backup</span>
            </button>
          </div>
        </div>

        {/* Reset Demo Data */}
        <div className="col-12 col-md-6">
          <div className="admin-card h-100" style={{ borderColor: 'rgba(233, 30, 77, 0.25)' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 8px 0', fontFamily: 'var(--admin-font-serif)', color: 'var(--admin-rose-light)' }}>
              Restore Demo Defaults
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--admin-text-muted)', marginBottom: '18px' }}>
              Reset all modifications and restore the rich default imagery, cinematic services, gallery collections, and wedding packages.
            </p>

            <button
              type="button"
              className="btn-admin-secondary"
              style={{ color: 'var(--admin-rose-light)', borderColor: 'rgba(233, 30, 77, 0.3)' }}
              onClick={handleResetData}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 4v6h-6"></path>
                <path d="M1 20v-6h6"></path>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
              <span>Reset to Factory Defaults</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
