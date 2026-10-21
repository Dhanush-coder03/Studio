import React from 'react';
import { useStudio } from '../../context/StudioContext';

export default function AdminOverview({ setActiveTab, onOpenModal }) {
  const { images, services, gallery, packages, inquiries, updateInquiryStatus } = useStudio();

  const newInquiries = inquiries.filter((i) => i.status === 'New').length;
  const bookedInquiries = inquiries.filter((i) => i.status === 'Booked').length;

  return (
    <div className="admin-overview-flow">
      {/* ================================================================
          KPI METRIC CARDS
          ================================================================ */}
      <div className="row g-3 mb-4">
        {/* Images */}
        <div className="col-12 col-sm-6 col-xl">
          <div className="stat-metric-card" onClick={() => setActiveTab('images')} style={{ cursor: 'pointer' }}>
            <div className="stat-metric-info">
              <span className="stat-metric-label">Media Assets</span>
              <span className="stat-metric-value">{images.length}</span>
              <span className="stat-metric-sub">High-Res Assets</span>
            </div>
            <div className="stat-metric-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="col-12 col-sm-6 col-xl">
          <div className="stat-metric-card" onClick={() => setActiveTab('services')} style={{ cursor: 'pointer' }}>
            <div className="stat-metric-info">
              <span className="stat-metric-label">Services</span>
              <span className="stat-metric-value">{services.length}</span>
              <span className="stat-metric-sub">{services.filter((s) => s.isFeatured).length} Featured</span>
            </div>
            <div className="stat-metric-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="col-12 col-sm-6 col-xl">
          <div className="stat-metric-card" onClick={() => setActiveTab('gallery')} style={{ cursor: 'pointer' }}>
            <div className="stat-metric-info">
              <span className="stat-metric-label">Gallery Works</span>
              <span className="stat-metric-value">{gallery.length}</span>
              <span className="stat-metric-sub">Portfolio Items</span>
            </div>
            <div className="stat-metric-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
            </div>
          </div>
        </div>

        {/* Packages */}
        <div className="col-12 col-sm-6 col-xl">
          <div className="stat-metric-card" onClick={() => setActiveTab('packages')} style={{ cursor: 'pointer' }}>
            <div className="stat-metric-info">
              <span className="stat-metric-label">Packages</span>
              <span className="stat-metric-value">{packages.length}</span>
              <span className="stat-metric-sub">Pricing Tiers</span>
            </div>
            <div className="stat-metric-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Inquiries */}
        <div className="col-12 col-sm-6 col-xl">
          <div className="stat-metric-card" onClick={() => setActiveTab('contacts')} style={{ cursor: 'pointer' }}>
            <div className="stat-metric-info">
              <span className="stat-metric-label">Client Inquiries</span>
              <span className="stat-metric-value">{inquiries.length}</span>
              <span className="stat-metric-sub" style={{ color: newInquiries > 0 ? '#60A5FA' : 'var(--admin-emerald)' }}>
                ● {newInquiries} New • {bookedInquiries} Booked
              </span>
            </div>
            <div className="stat-metric-icon" style={{ background: 'rgba(233, 30, 77, 0.12)', color: '#FF3C6A' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          QUICK ACTIONS STRIP
          ================================================================ */}
      <div className="admin-card mb-4">
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '14px', color: 'var(--admin-text-main)' }}>
          ⚡ Studio Quick Actions
        </h3>
        <div className="d-flex flex-wrap gap-2">
          <button
            type="button"
            className="btn-gold-primary"
            onClick={() => onOpenModal('addImage')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Upload Image</span>
          </button>

          <button
            type="button"
            className="btn-admin-secondary"
            onClick={() => onOpenModal('addService')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add Service</span>
          </button>

          <button
            type="button"
            className="btn-admin-secondary"
            onClick={() => onOpenModal('addGallery')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add to Gallery</span>
          </button>

          <button
            type="button"
            className="btn-admin-secondary"
            onClick={() => onOpenModal('addPackage')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add Package</span>
          </button>

          <button
            type="button"
            className="btn-admin-secondary"
            onClick={() => onOpenModal('addContact')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            <span>Add Contact Lead</span>
          </button>
        </div>
      </div>

      {/* ================================================================
          RECENT INQUIRIES & RECENT MEDIA PREVIEW
          ================================================================ */}
      <div className="row g-4">
        {/* Inquiries preview table */}
        <div className="col-12 col-xl-8">
          <div className="admin-card">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, fontFamily: 'var(--admin-font-serif)' }}>
                  Recent Booking Inquiries
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-dim)' }}>
                  Direct leads from website consultation forms
                </span>
              </div>
              <button
                type="button"
                className="btn-admin-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                onClick={() => setActiveTab('contacts')}
              >
                View All ({inquiries.length})
              </button>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Client / Couple</th>
                    <th>Event Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.slice(0, 5).map((inq) => (
                    <tr key={inq.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{inq.name}</div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--admin-text-dim)' }}>{inq.phone}</div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.82rem' }}>{inq.eventType}</span>
                        {inq.packageInterested && (
                          <div style={{ fontSize: '0.72rem', color: 'var(--admin-gold)' }}>{inq.packageInterested}</div>
                        )}
                      </td>
                      <td style={{ fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                        {inq.weddingDate || 'TBD'}
                      </td>
                      <td>
                        <span className={`status-pill ${inq.status.toLowerCase()}`}>
                          {inq.status}
                        </span>
                      </td>
                      <td>
                        <select
                          className="admin-select"
                          style={{ padding: '4px 8px', fontSize: '0.75rem', width: 'auto' }}
                          value={inq.status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Booked">Booked</option>
                          <option value="Archived">Archived</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {inquiries.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-4" style={{ color: 'var(--admin-text-dim)' }}>
                        No inquiries yet. Submissions from the website booking modal will appear here!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Media Highlights */}
        <div className="col-12 col-xl-4">
          <div className="admin-card h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, fontFamily: 'var(--admin-font-serif)' }}>
                  Media Library
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-dim)' }}>
                  {images.length} assets ready
                </span>
              </div>
              <button
                type="button"
                className="btn-admin-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                onClick={() => setActiveTab('images')}
              >
                Browse All
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {images.slice(0, 9).map((img) => (
                <div
                  key={img.id}
                  style={{
                    aspectRatio: '1',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.08)',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  onClick={() => setActiveTab('images')}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-3 text-center">
              <button
                type="button"
                className="btn-admin-secondary w-100"
                style={{ fontSize: '0.82rem' }}
                onClick={() => onOpenModal('addImage')}
              >
                + Upload New Asset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
