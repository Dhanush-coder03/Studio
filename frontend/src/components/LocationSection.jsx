import React from 'react';
import { useStudio } from '../context/StudioContext';

export default function LocationSection({ onBookClick }) {
  const { contactInfo } = useStudio();

  const locationFeatures = [
    {
      id: 'studio-base',
      title: 'Studio Base in Kurumathur',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
      description: 'Conveniently located at Kurumathur, Gobichettipalayam, our studio provides a welcoming space for couples and families for portfolio viewings, album design consultations, and portrait sessions.',
      meta: 'Kurumathur, Gobichettipalayam, Erode - 638457',
    },
    {
      id: 'marriage-photography',
      title: 'Marriage & Wedding Venues',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
        </svg>
      ),
      description: 'Specializing in photography in Gobichettipalayam for marriage ceremonies, Muhurtham rituals, and receptions across local Kalyana Mandapams, community halls, and heritage temple venues.',
      meta: 'Full Mandapam & Reception Multi-Camera Setup',
    },
    {
      id: 'scenic-locations',
      title: 'Pre-Wedding Scenic Shoots',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="10 8 16 12 10 16 10 8"></polygon>
        </svg>
      ),
      description: 'Gobichettipalayam is famed for lush green paddy fields, canal waterways, and cinema-shoot backdrops. We capture pre-wedding photography at Kodiveri Dam, Bhavani riverbanks, and rural landscapes.',
      meta: 'Kodiveri, Bhavani River & Countryside Vistas',
    },
    {
      id: 'regional-coverage',
      title: 'Kongu Region Service Areas',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      ),
      description: 'While based in Kurumathur, Gobichettipalayam, our wedding photographers readily travel to Sathyamangalam, Perundurai, Erode, Tirupur, Bhavani, and destination wedding venues throughout Tamil Nadu.',
      meta: 'Gobichettipalayam, Erode, Sathyamangalam & Beyond',
    },
  ];

  const mapUrl = contactInfo?.mapEmbedUrl || 'https://maps.google.com/?q=Kurumathur+Gobichettipalayam+Erode+Tamil+Nadu+638457';

  return (
    <section id="location" className="studio-location-section">
      <div className="container">
        {/* Header */}
        <div className="section-header-centered">
          <span className="section-eyebrow">Velu Photographs &bull; Local Presence</span>
          <h2 className="section-main-title">Photography in Gobichettipalayam &amp; Service Areas</h2>
          <p className="section-subtitle">
            Velu Photographs is proudly rooted in Kurumathur, Gobichettipalayam in the Erode district of Tamil Nadu. Recognized for the best wedding photography in Gobichettipalayam, we provide end-to-end coverage for marriage ceremonies, candid wedding journalism, and cinematic pre-wedding shoots across the region.
          </p>
        </div>

        {/* 4 Informational Cards */}
        <div className="location-cards-grid">
          {locationFeatures.map((item) => (
            <div className="location-info-card" key={item.id}>
              <div className="location-card-icon-wrapper">
                {item.icon}
              </div>
              <h3 className="location-card-title">{item.title}</h3>
              <p className="location-card-desc">{item.description}</p>
              <div style={{ marginTop: 'auto', paddingTop: '16px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-gold)' }}>
                {item.meta}
              </div>
            </div>
          ))}
        </div>

        {/* Banner with Google Maps link and Consultation CTA */}
        <div className="location-cta-banner">
          <div className="location-cta-text">
            <h4>Planning a Marriage or Shoot in Gobichettipalayam?</h4>
            <p>
              Visit our studio in Kurumathur, Gobichettipalayam or connect with our team for wedding dates, package customisation, and venue availability.
            </p>
          </div>
          <div className="location-cta-actions">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-map-directions"
              aria-label="Open Studio Location in Google Maps"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>View On Google Maps</span>
            </a>
            {onBookClick && (
              <button
                type="button"
                className="btn-hero-primary"
                onClick={onBookClick}
                style={{ padding: '12px 24px', fontSize: '0.9rem' }}
              >
                <span>Book A Consultation</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
