import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';

export default function ServicesSection({ onBookClick }) {
  const { services } = useStudio();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Pre-Wedding', 'Wedding', 'Traditional', 'Maternity', 'Kids & Family', 'Destination'];

  const filteredServices = services.filter((srv) => {
    if (selectedCategory === 'All') return true;
    return srv.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <section id="services" className="studio-services-section">
      <div className="container">
        {/* Header */}
        <div className="section-header-centered">
          <span className="section-eyebrow">Our Master Offerings</span>
          <h2 className="section-main-title">Cinematic Photography Services</h2>
          <p className="section-subtitle">
            From intimate traditional rituals to grand destination vows, each service is curated with bespoke lighting, prime lenses, and emotion-driven storytelling.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="services-category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`services-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="studio-services-grid">
          {filteredServices.map((srv) => (
            <div className="studio-service-card-client" key={srv.id}>
              <div className="service-card-image-wrap">
                <img src={srv.image} alt={srv.title} className="service-card-image" loading="lazy" />
                <span className="service-card-price-badge">Starts at {srv.priceStarting}</span>
                <span className="service-card-category-tag">{srv.category}</span>
              </div>

              <div className="service-card-content">
                <h3 className="service-card-title">{srv.title}</h3>
                <p className="service-card-desc">{srv.description}</p>

                {srv.features && srv.features.length > 0 && (
                  <ul className="service-card-features-list">
                    {srv.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="service-card-feature-item">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  type="button"
                  className="btn-book-service mt-auto"
                  onClick={() => onBookClick && onBookClick(srv.title)}
                >
                  <span>Book This Service</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
