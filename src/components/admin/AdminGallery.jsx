import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';

export default function AdminGallery({ isModalOpen, setIsModalOpen }) {
  const { gallery, images, addGalleryItem, deleteGalleryItem } = useStudio();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewItem, setPreviewItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Pre-Wedding',
    image: '',
    client: '',
    location: '',
    year: '2026',
    description: '',
    isFeatured: true,
  });

  const categories = ['All', 'Pre-Wedding', 'Wedding', 'Traditional', 'Maternity', 'Kids'];

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      category: 'Pre-Wedding',
      image: images[0]?.url || '',
      client: '',
      location: '',
      year: new Date().getFullYear().toString(),
      description: '',
      isFeatured: true,
    });
    setIsModalOpen(true);
  };

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
      alert('Please enter a title and select/upload an image');
      return;
    }

    addGalleryItem(formData);
    setIsModalOpen(false);
  };

  const filteredGallery = gallery.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="admin-gallery-view">
      {/* Top Filter and Actions Bar */}
      <div className="admin-card mb-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          {/* Category Tabs */}
          <div className="d-flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn-admin-secondary ${selectedCategory === cat ? 'active' : ''}`}
                style={{
                  padding: '6px 14px',
                  fontSize: '0.82rem',
                  borderColor: selectedCategory === cat ? 'var(--admin-gold)' : undefined,
                  color: selectedCategory === cat ? 'var(--admin-gold-light)' : undefined,
                  background: selectedCategory === cat ? 'rgba(185, 130, 46, 0.15)' : undefined,
                }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
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
            <span>+ Add to Gallery</span>
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="admin-media-grid">
        {filteredGallery.map((item) => (
          <div className="admin-media-card" key={item.id}>
            <img src={item.image} alt={item.title} className="admin-media-img" loading="lazy" />

            <div className="admin-media-overlay">
              <div className="d-flex justify-content-between align-items-center w-100">
                <span className="admin-media-tag">{item.category}</span>
                {item.location && (
                  <span style={{ fontSize: '0.7rem', color: '#ddd', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px' }}>
                    📍 {item.location}
                  </span>
                )}
              </div>

              <div className="admin-media-bottom">
                <div className="admin-media-info">
                  <h4 className="admin-media-title">{item.title}</h4>
                  <p className="admin-media-caption">
                    {item.client ? `${item.client} • ` : ''}{item.year}
                  </p>
                </div>

                <div className="admin-media-actions">
                  <button
                    type="button"
                    className="btn-action-icon"
                    title="View Fullscreen"
                    onClick={() => setPreviewItem(item)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn-action-icon danger"
                    title="Delete Gallery Item"
                    onClick={() => {
                      if (window.confirm(`Delete "${item.title}" from gallery?`)) {
                        deleteGalleryItem(item.id);
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
          </div>
        ))}
      </div>

      {filteredGallery.length === 0 && (
        <div className="text-center py-5 admin-card">
          <p style={{ color: 'var(--admin-text-muted)' }}>No gallery items in this category.</p>
          <button
            type="button"
            className="btn-gold-primary mt-2"
            onClick={handleOpenAdd}
          >
            Add First Photo
          </button>
        </div>
      )}

      {/* ================================================================
          ADD TO GALLERY MODAL
          ================================================================ */}
      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Add Work to Gallery Showcase</h3>
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
                      <label className="admin-label">Title / Event Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ooty Misty Sunrise Romance"
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
                        <option value="Wedding">Wedding / Reception</option>
                        <option value="Traditional">Traditional Heritage</option>
                        <option value="Maternity">Maternity</option>
                        <option value="Kids">Kids &amp; Family</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Client & Location */}
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <div className="admin-input-group">
                      <label className="admin-label">Client / Couple Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Arjun &amp; Keerthana"
                        className="admin-input"
                        value={formData.client}
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="admin-input-group">
                      <label className="admin-label">Shoot Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Ooty / Leela Palace Chennai"
                        className="admin-input"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Image upload / select */}
                <div className="admin-input-group">
                  <label className="admin-label">Photo Image *</label>
                  <div className="d-flex flex-column gap-2">
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
                            {img.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="url"
                      placeholder="Or paste image URL..."
                      className="admin-input"
                      value={formData.image.startsWith('data:') ? '' : formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />

                    {formData.image && (
                      <div className="mt-2 text-center">
                        <img
                          src={formData.image}
                          alt="Selected"
                          style={{ maxHeight: '110px', borderRadius: '8px', border: '1px solid var(--admin-gold)' }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Story / Description */}
                <div className="admin-input-group">
                  <label className="admin-label">Story / Caption</label>
                  <textarea
                    rows="2"
                    placeholder="Short description of the moment captured..."
                    className="admin-textarea"
                    style={{ minHeight: '65px' }}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  Save to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox view */}
      {previewItem && (
        <div className="admin-modal-backdrop" onClick={() => setPreviewItem(null)}>
          <div
            style={{
              maxWidth: '85vw',
              maxHeight: '85vh',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewItem.image}
              alt={previewItem.title}
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                borderRadius: '12px',
                objectFit: 'contain',
                border: '1px solid var(--admin-gold)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
              }}
            />
            <div className="mt-3 text-center">
              <h4 style={{ color: '#fff', margin: 0 }}>{previewItem.title}</h4>
              <p style={{ color: 'var(--admin-gold-light)', fontSize: '0.85rem', margin: '4px 0 0' }}>
                {previewItem.category} • {previewItem.client} • {previewItem.location} ({previewItem.year})
              </p>
              {previewItem.description && (
                <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.8rem', maxWidth: '600px', margin: '6px auto 0' }}>
                  {previewItem.description}
                </p>
              )}
            </div>
            <button
              type="button"
              className="admin-modal-close"
              style={{ position: 'absolute', top: '-40px', right: 0 }}
              onClick={() => setPreviewItem(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
