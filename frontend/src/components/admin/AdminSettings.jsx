import React from 'react';
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
  } = useStudio();

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
