import React, { useState } from 'react';
import { useStudio } from '../../context/StudioContext';

export default function AdminImages({ isModalOpen, setIsModalOpen }) {
  const { images, addImage, deleteImage, showToast } = useStudio();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: 'Showcase',
    caption: '',
  });
  const [previewDataUrl, setPreviewDataUrl] = useState('');

  const categories = ['All', 'Showcase', 'Wedding', 'Traditional', 'Pre-Wedding', 'Maternity', 'Kids', 'Equipment'];

  // Handle local file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!formData.title) {
        setFormData((prev) => ({
          ...prev,
          title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        }));
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setPreviewDataUrl(uploadEvent.target.result);
        setFormData((prev) => ({ ...prev, url: uploadEvent.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.url) {
      alert('Please upload an image file or provide an image URL');
      return;
    }
    addImage({
      title: formData.title || 'Untitled Image',
      url: formData.url,
      category: formData.category,
      caption: formData.caption,
    });
    // Reset and close
    setFormData({ title: '', url: '', category: 'Showcase', caption: '' });
    setPreviewDataUrl('');
    setIsModalOpen(false);
  };

  const handleCopyUrl = (url) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showToast('Image URL copied to clipboard');
    }
  };

  const filteredImages = images.filter((img) => {
    const matchCategory = selectedCategory === 'All' || img.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch =
      img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (img.caption && img.caption.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <div className="admin-images-view">
      {/* Top Filter and Actions Bar */}
      <div className="admin-card mb-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          {/* Category Filter Pills */}
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

          {/* Search + Add Image Button */}
          <div className="d-flex align-items-center gap-2">
            <input
              type="text"
              placeholder="Search images..."
              className="admin-input"
              style={{ width: '220px', padding: '8px 12px', fontSize: '0.84rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="button"
              className="btn-gold-primary"
              style={{ whiteSpace: 'nowrap' }}
              onClick={() => setIsModalOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>+ Add Image</span>
            </button>
          </div>
        </div>
      </div>

      {/* Images Grid */}
      <div className="admin-media-grid">
        {filteredImages.map((img) => (
          <div className="admin-media-card" key={img.id}>
            <img src={img.url} alt={img.title} className="admin-media-img" loading="lazy" />

            <div className="admin-media-overlay">
              <span className="admin-media-tag">{img.category}</span>

              <div className="admin-media-bottom">
                <div className="admin-media-info">
                  <h4 className="admin-media-title">{img.title}</h4>
                  {img.caption && <p className="admin-media-caption">{img.caption}</p>}
                </div>

                <div className="admin-media-actions">
                  <button
                    type="button"
                    className="btn-action-icon"
                    title="View Fullscreen"
                    onClick={() => setPreviewImage(img)}
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
                    className="btn-action-icon"
                    title="Copy Image URL"
                    onClick={() => handleCopyUrl(img.url)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn-action-icon danger"
                    title="Delete Image"
                    onClick={() => {
                      if (window.confirm(`Delete image "${img.title}"?`)) {
                        deleteImage(img.id);
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

      {filteredImages.length === 0 && (
        <div className="text-center py-5 admin-card">
          <p style={{ color: 'var(--admin-text-muted)' }}>No images found matching your filter.</p>
          <button
            type="button"
            className="btn-gold-primary mt-2"
            onClick={() => setIsModalOpen(true)}
          >
            Upload First Image
          </button>
        </div>
      )}

      {/* ================================================================
          ADD IMAGE MODAL
          ================================================================ */}
      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Upload &amp; Add Media Image</h3>
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
                {/* File Upload Zone */}
                <div className="admin-input-group">
                  <label className="admin-label">Upload File (Local Image)</label>
                  <label className="admin-dropzone">
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    <svg className="admin-dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <p>Click or drag to choose an image file from your device</p>
                    <span>Supports JPG, PNG, WEBP, AVIF</span>
                  </label>
                </div>

                {/* Or Web URL */}
                <div className="admin-input-group">
                  <label className="admin-label">Or Image URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    className="admin-input"
                    value={formData.url.startsWith('data:') ? '' : formData.url}
                    onChange={(e) => {
                      setFormData({ ...formData, url: e.target.value });
                      setPreviewDataUrl(e.target.value);
                    }}
                  />
                </div>

                {/* Preview Thumbnail */}
                {(previewDataUrl || (formData.url && !formData.url.startsWith('data:'))) && (
                  <div className="mb-3 text-center">
                    <span className="admin-label" style={{ textAlign: 'left' }}>Preview</span>
                    <img
                      src={previewDataUrl || formData.url}
                      alt="Preview"
                      style={{
                        maxHeight: '140px',
                        maxWidth: '100%',
                        borderRadius: '8px',
                        border: '1px solid var(--admin-gold)',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )}

                {/* Title */}
                <div className="admin-input-group">
                  <label className="admin-label">Image Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunset Mountain Pre-Wedding"
                    className="admin-input"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                {/* Category */}
                <div className="admin-input-group">
                  <label className="admin-label">Category</label>
                  <select
                    className="admin-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Showcase">Showcase / Hero</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Traditional">Traditional Heritage</option>
                    <option value="Pre-Wedding">Pre-Wedding</option>
                    <option value="Maternity">Maternity</option>
                    <option value="Kids">Kids &amp; Family</option>
                    <option value="Equipment">Camera &amp; Equipment</option>
                  </select>
                </div>

                {/* Caption */}
                <div className="admin-input-group">
                  <label className="admin-label">Short Caption / Description</label>
                  <textarea
                    rows="2"
                    placeholder="Brief description of the photo or camera gear..."
                    className="admin-textarea"
                    style={{ minHeight: '65px' }}
                    value={formData.caption}
                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
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
                  Save &amp; Add Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================
          LIGHTBOX PREVIEW MODAL
          ================================================================ */}
      {previewImage && (
        <div className="admin-modal-backdrop" onClick={() => setPreviewImage(null)}>
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
              src={previewImage.url}
              alt={previewImage.title}
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
              <h4 style={{ color: '#fff', margin: 0 }}>{previewImage.title}</h4>
              <p style={{ color: 'var(--admin-gold-light)', fontSize: '0.85rem', margin: '4px 0 0' }}>
                {previewImage.category} • {previewImage.caption}
              </p>
            </div>
            <button
              type="button"
              className="admin-modal-close"
              style={{ position: 'absolute', top: '-40px', right: 0 }}
              onClick={() => setPreviewImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
