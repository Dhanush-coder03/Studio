import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';

export default function AdminContacts({ isModalOpen, setIsModalOpen }) {
  const { inquiries, contactInfo, addInquiry, updateInquiryStatus, deleteInquiry, updateContactInfo } = useStudio();
  const [subTab, setSubTab] = useState('leads'); // 'leads' or 'studio-info'
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);

  // New Lead Form State
  const [leadFormData, setLeadFormData] = useState({
    name: '',
    phone: '',
    email: '',
    weddingDate: '',
    eventType: 'Traditional Tamil Wedding',
    packageInterested: 'Gold Cinematic Luxury',
    location: '',
    message: '',
    status: 'New',
  });

  // Studio Info Form State
  const [studioFormData, setStudioFormData] = useState({ ...contactInfo });

  const statuses = ['All', 'New', 'Contacted', 'Booked', 'Archived'];

  const handleOpenAddLead = () => {
    setLeadFormData({
      name: '',
      phone: '',
      email: '',
      weddingDate: '',
      eventType: 'Traditional Tamil Wedding',
      packageInterested: 'Gold Cinematic Luxury',
      location: '',
      message: '',
      status: 'New',
    });
    setIsModalOpen(true);
  };

  const handleAddLeadSubmit = (e) => {
    e.preventDefault();
    if (!leadFormData.name || !leadFormData.phone) {
      alert('Please provide client name and phone number');
      return;
    }
    addInquiry(leadFormData);
    setIsModalOpen(false);
  };

  const handleSaveStudioInfo = (e) => {
    e.preventDefault();
    updateContactInfo(studioFormData);
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchStatus = statusFilter === 'All' || inq.status.toLowerCase() === statusFilter.toLowerCase();
    const matchSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.includes(searchQuery) ||
      (inq.email && inq.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inq.eventType && inq.eventType.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchStatus && matchSearch;
  });

  return (
    <div className="admin-contacts-view">
      {/* Sub Tabs Bar */}
      <div className="admin-card mb-4 d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
        <div className="d-flex gap-2">
          <button
            type="button"
            className={`btn-admin-secondary ${subTab === 'leads' ? 'active' : ''}`}
            style={{
              borderColor: subTab === 'leads' ? 'var(--admin-gold)' : undefined,
              color: subTab === 'leads' ? 'var(--admin-gold-light)' : undefined,
              background: subTab === 'leads' ? 'rgba(185, 130, 46, 0.15)' : undefined,
              fontWeight: subTab === 'leads' ? 600 : 500,
            }}
            onClick={() => setSubTab('leads')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>Client Inquiries &amp; Leads ({inquiries.length})</span>
          </button>

          <button
            type="button"
            className={`btn-admin-secondary ${subTab === 'studio-info' ? 'active' : ''}`}
            style={{
              borderColor: subTab === 'studio-info' ? 'var(--admin-gold)' : undefined,
              color: subTab === 'studio-info' ? 'var(--admin-gold-light)' : undefined,
              background: subTab === 'studio-info' ? 'rgba(185, 130, 46, 0.15)' : undefined,
              fontWeight: subTab === 'studio-info' ? 600 : 500,
            }}
            onClick={() => setSubTab('studio-info')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Studio Contact Information</span>
          </button>
        </div>

        {subTab === 'leads' && (
          <button
            type="button"
            className="btn-gold-primary"
            onClick={handleOpenAddLead}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>+ Add Contact Lead</span>
          </button>
        )}
      </div>

      {/* ================================================================
          TAB 1: LEADS & INQUIRIES MANAGEMENT
          ================================================================ */}
      {subTab === 'leads' && (
        <div>
          {/* Filter and Search Bar */}
          <div className="admin-card mb-4">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
              <div className="d-flex flex-wrap gap-2">
                {statuses.map((st) => (
                  <button
                    key={st}
                    type="button"
                    className={`btn-admin-secondary ${statusFilter === st ? 'active' : ''}`}
                    style={{
                      padding: '5px 12px',
                      fontSize: '0.8rem',
                      borderColor: statusFilter === st ? 'var(--admin-gold)' : undefined,
                      color: statusFilter === st ? 'var(--admin-gold-light)' : undefined,
                      background: statusFilter === st ? 'rgba(185, 130, 46, 0.15)' : undefined,
                    }}
                    onClick={() => setStatusFilter(st)}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Search by client, phone, or date..."
                className="admin-input"
                style={{ width: '280px', padding: '8px 12px', fontSize: '0.84rem' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Leads Table */}
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Contact Info</th>
                  <th>Event Details</th>
                  <th>Date &amp; Package</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{inq.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--admin-text-dim)' }}>
                        Received: {inq.dateReceived || 'Recent'}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.84rem', color: 'var(--admin-gold-light)' }}>
                        📞 {inq.phone}
                      </div>
                      {inq.email && (
                        <div style={{ fontSize: '0.76rem', color: 'var(--admin-text-muted)' }}>
                          ✉️ {inq.email}
                        </div>
                      )}
                    </td>
                    <td>
                      <div style={{ fontSize: '0.84rem', fontWeight: 500 }}>{inq.eventType}</div>
                      {inq.location && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-dim)' }}>
                          📍 {inq.location}
                        </div>
                      )}
                    </td>
                    <td>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                        📅 {inq.weddingDate || 'Date TBD'}
                      </div>
                      {inq.packageInterested && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--admin-gold)', background: 'rgba(185, 130, 46, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                          {inq.packageInterested}
                        </span>
                      )}
                    </td>
                    <td>
                      <select
                        className="admin-select"
                        style={{ padding: '4px 8px', fontSize: '0.78rem', width: 'auto' }}
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Booked">Booked</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <button
                          type="button"
                          className="btn-action-icon"
                          title="View Details"
                          onClick={() => setSelectedLead(inq)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </button>

                        <button
                          type="button"
                          className="btn-action-icon danger"
                          title="Delete Lead"
                          onClick={() => {
                            if (window.confirm(`Delete lead "${inq.name}"?`)) {
                              deleteInquiry(inq.id);
                            }
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredInquiries.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-5" style={{ color: 'var(--admin-text-dim)' }}>
                      No contact leads found. Click "+ Add Contact Lead" or submit from website booking forms!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================================================================
          TAB 2: STUDIO CONTACT INFORMATION EDITOR
          ================================================================ */}
      {subTab === 'studio-info' && (
        <div className="admin-card">
          <div className="mb-4">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, fontFamily: 'var(--admin-font-serif)' }}>
              Studio Contact Details
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--admin-text-dim)' }}>
              These contact numbers, email, physical studio address, and hours display across the entire website and footer.
            </span>
          </div>

          <form onSubmit={handleSaveStudioInfo}>
            <div className="row g-3">
              {/* Studio Name & Tagline */}
              <div className="col-12 col-md-6">
                <div className="admin-input-group">
                  <label className="admin-label">Studio Brand Name</label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    value={studioFormData.studioName}
                    onChange={(e) => setStudioFormData({ ...studioFormData, studioName: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="admin-input-group">
                  <label className="admin-label">Tagline / Subheading</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={studioFormData.tagline}
                    onChange={(e) => setStudioFormData({ ...studioFormData, tagline: e.target.value })}
                  />
                </div>
              </div>

              {/* Primary Phone & Alternate Phone */}
              <div className="col-12 col-md-6">
                <div className="admin-input-group">
                  <label className="admin-label">Primary Studio Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98401 23456"
                    className="admin-input"
                    value={studioFormData.phone}
                    onChange={(e) => setStudioFormData({ ...studioFormData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="admin-input-group">
                  <label className="admin-label">Alternate Booking Phone</label>
                  <input
                    type="text"
                    placeholder="+91 94440 98765"
                    className="admin-input"
                    value={studioFormData.altPhone}
                    onChange={(e) => setStudioFormData({ ...studioFormData, altPhone: e.target.value })}
                  />
                </div>
              </div>

              {/* Email & Hours */}
              <div className="col-12 col-md-6">
                <div className="admin-input-group">
                  <label className="admin-label">Official Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="hello@veluphotography.com"
                    className="admin-input"
                    value={studioFormData.email}
                    onChange={(e) => setStudioFormData({ ...studioFormData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="admin-input-group">
                  <label className="admin-label">Working Hours / Visiting Times</label>
                  <input
                    type="text"
                    placeholder="Mon - Sat: 9:30 AM - 8:30 PM"
                    className="admin-input"
                    value={studioFormData.workingHours}
                    onChange={(e) => setStudioFormData({ ...studioFormData, workingHours: e.target.value })}
                  />
                </div>
              </div>

              {/* Physical Studio Address */}
              <div className="col-12">
                <div className="admin-input-group">
                  <label className="admin-label">Physical Studio Address</label>
                  <textarea
                    rows="2"
                    placeholder="Full street address, landmark, city, and pincode..."
                    className="admin-textarea"
                    style={{ minHeight: '65px' }}
                    value={studioFormData.address}
                    onChange={(e) => setStudioFormData({ ...studioFormData, address: e.target.value })}
                  />
                </div>
              </div>

              {/* Social links */}
              <div className="col-12 col-md-4">
                <div className="admin-input-group">
                  <label className="admin-label">Instagram Handle / URL</label>
                  <input
                    type="text"
                    placeholder="https://instagram.com/veluphotography"
                    className="admin-input"
                    value={studioFormData.instagram}
                    onChange={(e) => setStudioFormData({ ...studioFormData, instagram: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="admin-input-group">
                  <label className="admin-label">Facebook URL</label>
                  <input
                    type="text"
                    placeholder="https://facebook.com/veluphotography"
                    className="admin-input"
                    value={studioFormData.facebook}
                    onChange={(e) => setStudioFormData({ ...studioFormData, facebook: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="admin-input-group">
                  <label className="admin-label">YouTube Showcase URL</label>
                  <input
                    type="text"
                    placeholder="https://youtube.com/@veluphotography"
                    className="admin-input"
                    value={studioFormData.youtube}
                    onChange={(e) => setStudioFormData({ ...studioFormData, youtube: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-3 mt-3">
              <button type="submit" className="btn-gold-primary">
                Save Studio Contact Information
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================================================================
          ADD CONTACT LEAD MODAL (MANUAL ENTRY / OFFLINE CLIENT)
          ================================================================ */}
      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Record New Client Contact Lead</h3>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddLeadSubmit}>
              <div className="admin-modal-body">
                {/* Name & Phone */}
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <div className="admin-input-group">
                      <label className="admin-label">Client / Couple Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Meenakshi &amp; Anand"
                        className="admin-input"
                        value={leadFormData.name}
                        onChange={(e) => setLeadFormData({ ...leadFormData, name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="admin-input-group">
                      <label className="admin-label">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="admin-input"
                        value={leadFormData.phone}
                        onChange={(e) => setLeadFormData({ ...leadFormData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Date */}
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <div className="admin-input-group">
                      <label className="admin-label">Email Address</label>
                      <input
                        type="email"
                        placeholder="client@gmail.com"
                        className="admin-input"
                        value={leadFormData.email}
                        onChange={(e) => setLeadFormData({ ...leadFormData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="admin-input-group">
                      <label className="admin-label">Wedding / Event Date</label>
                      <input
                        type="date"
                        className="admin-input"
                        value={leadFormData.weddingDate}
                        onChange={(e) => setLeadFormData({ ...leadFormData, weddingDate: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Event Type & Package */}
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <div className="admin-input-group">
                      <label className="admin-label">Event Type</label>
                      <select
                        className="admin-select"
                        value={leadFormData.eventType}
                        onChange={(e) => setLeadFormData({ ...leadFormData, eventType: e.target.value })}
                      >
                        <option value="Traditional Tamil Wedding">Traditional Tamil Wedding</option>
                        <option value="Muhurtham & Reception">Muhurtham &amp; Reception</option>
                        <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
                        <option value="Destination Wedding">Destination Wedding</option>
                        <option value="Maternity Fine Art">Maternity Fine Art</option>
                        <option value="Kids & Family Candid">Kids &amp; Family Candid</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="admin-input-group">
                      <label className="admin-label">Initial Status</label>
                      <select
                        className="admin-select"
                        value={leadFormData.status}
                        onChange={(e) => setLeadFormData({ ...leadFormData, status: e.target.value })}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Booked">Booked</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="admin-input-group">
                  <label className="admin-label">Venue / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. ITC Grand Chola, Chennai"
                    className="admin-input"
                    value={leadFormData.location}
                    onChange={(e) => setLeadFormData({ ...leadFormData, location: e.target.value })}
                  />
                </div>

                {/* Message / Notes */}
                <div className="admin-input-group">
                  <label className="admin-label">Internal Notes / Requirements</label>
                  <textarea
                    rows="2"
                    placeholder="Customer expectations, budget notes, preferred photographers..."
                    className="admin-textarea"
                    style={{ minHeight: '65px' }}
                    value={leadFormData.message}
                    onChange={(e) => setLeadFormData({ ...leadFormData, message: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="btn-admin-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-gold-primary">
                  Save Contact Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================
          LEAD DETAILS DRAWER / MODAL
          ================================================================ */}
      {selectedLead && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedLead(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3 className="admin-modal-title">{selectedLead.name}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--admin-gold-light)' }}>
                  Inquiry ID: {selectedLead.id}
                </span>
              </div>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setSelectedLead(null)}
              >
                ✕
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="p-3 rounded mb-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="row g-2">
                  <div className="col-6">
                    <span style={{ fontSize: '0.72rem', color: 'var(--admin-text-dim)', textTransform: 'uppercase' }}>Phone</span>
                    <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>{selectedLead.phone}</div>
                  </div>
                  <div className="col-6">
                    <span style={{ fontSize: '0.72rem', color: 'var(--admin-text-dim)', textTransform: 'uppercase' }}>Email</span>
                    <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>{selectedLead.email || 'N/A'}</div>
                  </div>
                  <div className="col-6 mt-2">
                    <span style={{ fontSize: '0.72rem', color: 'var(--admin-text-dim)', textTransform: 'uppercase' }}>Event Date</span>
                    <div style={{ fontSize: '0.85rem', color: '#fff' }}>{selectedLead.weddingDate || 'TBD'}</div>
                  </div>
                  <div className="col-6 mt-2">
                    <span style={{ fontSize: '0.72rem', color: 'var(--admin-text-dim)', textTransform: 'uppercase' }}>Event Type</span>
                    <div style={{ fontSize: '0.85rem', color: 'var(--admin-gold-light)' }}>{selectedLead.eventType}</div>
                  </div>
                </div>
              </div>

              {selectedLead.location && (
                <div className="mb-3">
                  <span className="admin-label">Venue Location</span>
                  <p style={{ color: '#fff', fontSize: '0.85rem' }}>📍 {selectedLead.location}</p>
                </div>
              )}

              {selectedLead.packageInterested && (
                <div className="mb-3">
                  <span className="admin-label">Interested Package</span>
                  <p style={{ color: 'var(--admin-gold)', fontWeight: 600, fontSize: '0.88rem' }}>
                    {selectedLead.packageInterested}
                  </p>
                </div>
              )}

              {selectedLead.message && (
                <div className="mb-3">
                  <span className="admin-label">Client Notes &amp; Message</span>
                  <div className="p-3 rounded" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--admin-text-muted)', fontSize: '0.84rem' }}>
                    {selectedLead.message}
                  </div>
                </div>
              )}

              <div className="admin-input-group mt-3">
                <label className="admin-label">Update Status</label>
                <select
                  className="admin-select"
                  value={selectedLead.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    updateInquiryStatus(selectedLead.id, newStatus);
                    setSelectedLead({ ...selectedLead, status: newStatus });
                  }}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Booked">Booked</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              {/* Direct Quick Contact Buttons */}
              <div className="d-flex gap-2 mt-4">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="btn-admin-secondary flex-grow-1 text-center"
                  style={{ textDecoration: 'none' }}
                >
                  📞 Call Client
                </a>
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-primary flex-grow-1 text-center"
                  style={{ textDecoration: 'none' }}
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
