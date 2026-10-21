import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';

export default function AdminServices({ isModalOpen, setIsModalOpen }) {
  const { services, images, addService, updateService, deleteService } = useStudio();
  const [editingServiceId, setEditingServiceId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Wedding',
    priceStarting: '₹50,000',
    image: '',
    description: '',
    detailedInfo: '',
    features: ['2 Senior Photographers', '4K Cinematic Film', 'Album Included'],
    isFeatured: true,
  });

  const [newFeatureInput, setNewFeatureInput] = useState('');

  // Handle open add modal
  const handleOpenAdd = () => {
    setEditingServiceId(null);
    setFormData({
      title: '',
      category: 'Wedding',
      priceStarting: '₹50,000',
      image: images[0]?.url || '',
      description: '',
      detailedInfo: '',
      features: ['2 Senior Photographers', '4K Cinematic Film', 'Album Included'],
      isFeatured: true,
    });
    setIsModalOpen(true);
  };

  // Handle open edit modal
  const handleOpenEdit = (srv) => {
    setEditingServiceId(srv.id);
    setFormData({
      title: srv.title,
      category: srv.category,
      priceStarting: srv.priceStarting,
      image: srv.image,
      description: srv.description,
      detailedInfo: srv.detailedInfo || '',
      features: srv.features || [],
      isFeatured: !!srv.isFeatured,
    });
    setIsModalOpen(true);
  };

  // Add bullet feature
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

  // Remove bullet feature
  const handleRemoveFeature = (idx) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx),
    }));
  };

  // Handle file upload for service image
  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData((prev) => ({ ...prev, image: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.image) {
      alert('Please provide a service title and an image');
      return;
    }

    if (editingServiceId) {
      updateService(editingServiceId, formData);
    } else {
      addService(formData);
    }

    setIsModalOpen(false);
    setEditingServiceId(null);
  };

  return (
    <div className="admin-services-view">
      {/* Header action bar */}
      <div className="admin-card mb-4 d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, fontFamily: 'var(--admin-font-serif)' }}>
            Studio Services ({services.length})
          </h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--admin-text-dim)' }}>
            Showcased photography offerings with custom cover imagery, pricing, and descriptions
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
          <span>+ Add New Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="admin-services-grid">
        {services.map((srv) => (
          <div className="admin-service-card" key={srv.id}>
            <div className="admin-service-img-wrap">
              <img src={srv.image} alt={srv.title} className="admin-service-img" />
              <span className="admin-service-price-pill">{srv.priceStarting}</span>
              <span className="admin-service-cat-pill">{srv.category}</span>
            </div>

            <div className="admin-service-body">
              <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                <h4 className="admin-service-title">{srv.title}</h4>
                {srv.isFeatured && (
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: 'var(--admin-gold)',
                      background: 'rgba(185, 130, 46, 0.15)',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Featured
                  </span>
                )}
              </div>

              <p className="admin-service-desc">{srv.description}</p>

              {/* Feature bullet list */}
              <ul className="admin-service-features">
                {(srv.features || []).slice(0, 4).map((f, i) => (
                  <li key={i} className="admin-service-feature-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="admin-service-card-footer">
              <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-dim)' }}>
                {(srv.features || []).length} highlights
              </span>

              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  className="btn-action-icon"
                  title="Edit Service"
                  onClick={() => handleOpenEdit(srv)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>

                <button
                  type="button"
                  className="btn-action-icon danger"
                  title="Delete Service"
                  onClick={() => {
                    if (window.confirm(`Delete service "${srv.title}"?`)) {
                      deleteService(srv.id);
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
          </div>
        ))}
      </div>

      {/* ================================================================
          ADD / EDIT SERVICE MODAL
          ================================================================ */}
      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal-box" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editingServiceId ? 'Edit Service' : 'Add New Service & Imagery'}
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
                {/* Title & Category */}
                <div className="row g-3">
                  <div className="col-12 col-md-7">
                    <div className="admin-input-group">
                      <label className="admin-label">Service Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pre-Wedding Cinematic Stories"
                        className="admin-input"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-5">
                    <div className="admin-input-group">
                      <label className="admin-label">Category</label>
                      <select
                        className="admin-select"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="Pre-Wedding">Pre-Wedding</option>
                        <option value="Wedding">Wedding / Muhurtham</option>
                        <option value="Traditional">Traditional Heritage</option>
                        <option value="Maternity">Maternity</option>
                        <option value="Kids & Family">Kids &amp; Family</option>
                        <option value="Destination">Destination Special</option>
                        <option value="Fashion / Editorial">Fashion / Editorial</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Starting Price & Featured */}
                <div className="row g-3">
                  <div className="col-12 col-md-7">
                    <div className="admin-input-group">
                      <label className="admin-label">Starting Price Tag *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. ₹45,000 / $600"
                        className="admin-input"
                        value={formData.priceStarting}
                        onChange={(e) => setFormData({ ...formData, priceStarting: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-5 d-flex align-items-center">
                    <label className="d-flex align-items-center gap-2" style={{ cursor: 'pointer', marginTop: '10px' }}>
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--admin-gold)' }}
                      />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-text-main)' }}>
                        Feature on Homepage
                      </span>
                    </label>
                  </div>
                </div>

                {/* Cover Image Uploader / Selector */}
                <div className="admin-input-group">
                  <label className="admin-label">Service Cover Image *</label>
                  <div className="d-flex flex-column gap-2">
                    {/* Pick from library or upload file */}
                    <div className="d-flex gap-2">
                      <label
                        className="btn-admin-secondary"
                        style={{ cursor: 'pointer', padding: '8px 14px', fontSize: '0.82rem' }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleImageFile}
                        />
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <span>Upload File</span>
                      </label>

                      <select
                        className="admin-select"
                        style={{ flex: 1, fontSize: '0.82rem' }}
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      >
                        <option value="">-- Choose from Media Assets --</option>
                        {images.map((img) => (
                          <option key={img.id} value={img.url}>
                            {img.title} ({img.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="url"
                      placeholder="Or paste external image URL..."
                      className="admin-input"
                      value={formData.image.startsWith('data:') ? '' : formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />

                    {formData.image && (
                      <div className="d-flex align-items-center gap-3 p-2 rounded" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <img
                          src={formData.image}
                          alt="Selected"
                          style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--admin-gold)' }}
                        />
                        <span style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>
                          Image selected &amp; ready
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Short Description */}
                <div className="admin-input-group">
                  <label className="admin-label">Short Description *</label>
                  <textarea
                    rows="2"
                    required
                    placeholder="Crisp teaser description displayed on cards..."
                    className="admin-textarea"
                    style={{ minHeight: '65px' }}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Detailed Info */}
                <div className="admin-input-group">
                  <label className="admin-label">Detailed Information &amp; Scope</label>
                  <textarea
                    rows="2"
                    placeholder="Detailed explanation of gear, style, and process..."
                    className="admin-textarea"
                    style={{ minHeight: '65px' }}
                    value={formData.detailedInfo}
                    onChange={(e) => setFormData({ ...formData, detailedInfo: e.target.value })}
                  />
                </div>

                {/* Features Checklist */}
                <div className="admin-input-group">
                  <label className="admin-label">Key Highlights / Inclusions</label>
                  <div className="d-flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="e.g. 2 Senior Photographers, 4K Cinema Rig..."
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

                  {/* Feature chips */}
                  <div className="d-flex flex-wrap gap-2">
                    {formData.features.map((feat, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.78rem',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          color: '#fff',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        {feat}
                        <button
                          type="button"
                          style={{ color: 'var(--admin-rose-light)', cursor: 'pointer', fontSize: '1rem', lineHeight: '1' }}
                          onClick={() => handleRemoveFeature(idx)}
                        >
                          ×
                        </button>
                      </span>
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
                  {editingServiceId ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
