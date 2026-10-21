import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';

export default function AdminPackages({ isModalOpen, setIsModalOpen }) {
  const { packages, addPackage, updatePackage, deletePackage } = useStudio();
  const [editingPkgId, setEditingPkgId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    badge: 'Popular',
    price: '₹95,000',
    period: '2 Days / Muhurtham & Reception',
    description: '',
    deliverablesSummary: '',
    features: [
      '2 Senior Candid Photographers',
      '2 Cinema Line 4K Videographers',
      'Full HD Cinematic Wedding Film',
      '40-Page Flush Mount Leather Album',
    ],
    isPopular: false,
  });

  const [newFeatureInput, setNewFeatureInput] = useState('');

  const handleOpenAdd = () => {
    setEditingPkgId(null);
    setFormData({
      name: '',
      badge: 'Popular',
      price: '₹95,000',
      period: '2 Days / Muhurtham & Reception',
      description: 'Complete ceremony & celebration coverage with high-end cinema line gear.',
      deliverablesSummary: '2 Photographers + 2 Videographers + Album',
      features: [
        '2 Senior Candid Photographers',
        '2 Cinema Line 4K Videographers',
        'Full HD Cinematic Wedding Film',
        '40-Page Flush Mount Leather Album',
      ],
      isPopular: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pkg) => {
    setEditingPkgId(pkg.id);
    setFormData({
      name: pkg.name,
      badge: pkg.badge || '',
      price: pkg.price,
      period: pkg.period || '',
      description: pkg.description || '',
      deliverablesSummary: pkg.deliverablesSummary || '',
      features: pkg.features || [],
      isPopular: !!pkg.isPopular,
    });
    setIsModalOpen(true);
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (newFeatureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeatureInput.trim()],
      }));
      setNewFeatureInput('');
    }
  };

  const handleRemoveFeature = (idx) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Please provide a package name and price');
      return;
    }

    if (editingPkgId) {
      updatePackage(editingPkgId, formData);
    } else {
      addPackage(formData);
    }

    setIsModalOpen(false);
    setEditingPkgId(null);
  };

  return (
    <div className="admin-packages-view">
      {/* Action Header */}
      <div className="admin-card mb-4 d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, fontFamily: 'var(--admin-font-serif)' }}>
            Photography Packages ({packages.length})
          </h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--admin-text-dim)' }}>
            Transparent pricing tiers, equipment allotments, and album deliverables for couples
          </span>
        </div>

        <button
          type="button"
          className="btn-gold-primary"
          onClick={handleOpenAdd}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>+ Add Package</span>
        </button>
      </div>

      {/* Packages Grid */}
      <div className="admin-packages-grid">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`admin-package-card ${pkg.isPopular ? 'popular' : ''}`}
          >
            {pkg.badge && <span className="admin-package-badge">{pkg.badge}</span>}

            <h4 className="admin-package-title">{pkg.name}</h4>
            <div className="admin-package-period">{pkg.period}</div>
            <div className="admin-package-price">{pkg.price}</div>

            {pkg.deliverablesSummary && (
              <div className="admin-package-deliverables">
                {pkg.deliverablesSummary}
              </div>
            )}

            <p style={{ fontSize: '0.82rem', color: 'var(--admin-text-muted)', marginBottom: '16px' }}>
              {pkg.description}
            </p>

            {/* Checklist */}
            <ul className="admin-package-features">
              {(pkg.features || []).map((feat, i) => (
                <li key={i} className="admin-package-feature-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="admin-package-actions">
              <button
                type="button"
                className="btn-admin-secondary flex-grow-1"
                style={{ fontSize: '0.82rem' }}
                onClick={() => handleOpenEdit(pkg)}
              >
                Edit Package
              </button>

              <button
                type="button"
                className="btn-action-icon danger"
                title="Delete Package"
                onClick={() => {
                  if (window.confirm(`Delete package "${pkg.name}"?`)) {
                    deletePackage(pkg.id);
                  }
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================================================================
          ADD / EDIT PACKAGE MODAL
          ================================================================ */}
      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal-box" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editingPkgId ? 'Edit Package Tier' : 'Add New Photography Package'}
              </h3>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                {/* Name & Badge */}
                <div className="row g-3">
                  <div className="col-12 col-md-7">
                    <div className="admin-input-group">
                      <label className="admin-label">Package Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Gold Cinematic Luxury"
                        className="admin-input"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-5">
                    <div className="admin-input-group">
                      <label className="admin-label">Badge / Pill Text</label>
                      <input
                        type="text"
                        placeholder="e.g. Most Popular"
                        className="admin-input"
                        value={formData.badge}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Price & Period */}
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <div className="admin-input-group">
                      <label className="admin-label">Price (Display Text) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. ₹1,35,000"
                        className="admin-input"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="admin-input-group">
                      <label className="admin-label">Duration / Period</label>
                      <input
                        type="text"
                        placeholder="e.g. 2 Days / Muhurtham &amp; Reception"
                        className="admin-input"
                        value={formData.period}
                        onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Deliverables Summary & Is Popular */}
                <div className="row g-3">
                  <div className="col-12 col-md-8">
                    <div className="admin-input-group">
                      <label className="admin-label">Deliverables Summary Line</label>
                      <input
                        type="text"
                        placeholder="e.g. 2 Photographers + 2 Videographers + Album"
                        className="admin-input"
                        value={formData.deliverablesSummary}
                        onChange={(e) => setFormData({ ...formData, deliverablesSummary: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-4 d-flex align-items-center">
                    <label className="d-flex align-items-center gap-2" style={{ cursor: 'pointer', marginTop: '10px' }}>
                      <input
                        type="checkbox"
                        checked={formData.isPopular}
                        onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--admin-gold)' }}
                      />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-text-main)' }}>
                        Highlight Card
                      </span>
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div className="admin-input-group">
                  <label className="admin-label">Short Package Description</label>
                  <textarea
                    rows="2"
                    placeholder="Brief description of whom this package is suited for..."
                    className="admin-textarea"
                    style={{ minHeight: '60px' }}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Features list */}
                <div className="admin-input-group">
                  <label className="admin-label">Included Deliverables Checklist</label>
                  <div className="d-flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="e.g. 1 Drone Aerial Pilot, High-Res Pendrive..."
                      className="admin-input"
                      value={newFeatureInput}
                      onChange={(e) => setNewFeatureInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddFeature(e);
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="btn-gold-primary"
                      style={{ padding: '8px 14px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
                      onClick={handleAddFeature}
                    >
                      + Add
                    </button>
                  </div>

                  <div className="d-flex flex-direction-column gap-1">
                    {formData.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="d-flex align-items-center justify-content-between p-2 rounded mb-1"
                        style={{ background: 'rgba(255, 255, 255, 0.04)', fontSize: '0.82rem' }}
                      >
                        <span className="d-flex align-items-center gap-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--admin-gold)" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          {feat}
                        </span>
                        <button
                          type="button"
                          style={{ color: 'var(--admin-rose-light)', cursor: 'pointer', fontSize: '1rem', lineHeight: '1' }}
                          onClick={() => handleRemoveFeature(idx)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
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
                  {editingPkgId ? 'Save Changes' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
