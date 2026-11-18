import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';

export default function ServicesSection({ onBookClick }) {
  const { services, contactInfo, addInquiry, showToast } = useStudio();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Wedding', 'Candid', 'Pre-Wedding', 'Event', 'Portrait'];

  const filteredServices = services.filter((srv) => {
    if (selectedCategory === 'All') return true;
    const cat = srv.category ? srv.category.toLowerCase() : '';
    const title = srv.title ? srv.title.toLowerCase() : '';
    const target = selectedCategory.toLowerCase();
    return cat.includes(target) || title.includes(target);
  });

  const handleBookService = (srv) => {
    const rawPhone = (contactInfo?.whatsapp || contactInfo?.phone || '9600777591').toString().replace(/\D/g, '');
    const targetPhone = rawPhone.startsWith('91') ? rawPhone : `91${rawPhone}`;

    const featuresList = srv.features && srv.features.length > 0
      ? srv.features.map((f) => `  ✓ ${f}`).join('\n')
      : '  ✓ Complete Master Photography & Cinematography Coverage';

    // Campaign-style structured card message
    const orderText = 
`https://studio-eosin-phi.vercel.app/#services

━━━━━━━━━━━━━━━━━━━━━━━━━━
📸 *VELU PHOTOGRAPHY | SERVICE ORDER*
━━━━━━━━━━━━━━━━━━━━━━━━━━

✦ *Service Selected:* ${srv.title}
✦ *Category:* ${srv.category || 'Wedding & Lifestyle'}
✦ *Starting Investment:* Starts at ${srv.priceStarting}

📋 *Included Deliverables:*
${featuresList}

📍 *Studio Location:*
${contactInfo?.address || 'Gobichettipalayam, Tamil Nadu, India'}
📞 *Direct Phone / WhatsApp:* ${contactInfo?.phone || '+91 96007 77591'}

━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 *Hello Velu Photography! I would like to book this service. Please check date availability and send quotation.*`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(orderText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Also record lead in studio inquiries
    if (addInquiry) {
      addInquiry({
        name: 'WhatsApp Campaign Booking',
        phone: targetPhone,
        email: '',
        weddingDate: '',
        eventType: srv.category || 'Wedding',
        packageInterested: srv.title,
        location: 'Gobichettipalayam, Tamil Nadu, India',
        message: `Client initiated WhatsApp booking for "${srv.title}" (${srv.priceStarting})`,
        status: 'New',
      });
    }

    if (showToast) {
      showToast(`Opening WhatsApp booking for "${srv.title}"...`, 'success');
    }
  };

  return (
    <section id="services" className="studio-services-section">
      <div className="container">
        {/* Header - H2 & Local SEO Descriptions */}
        <div className="section-header-centered">
          <span className="section-eyebrow">Velu Photographs &bull; Master Offerings</span>
          <h2 className="section-main-title">Our Photography Services</h2>
          <p className="section-subtitle">
            Velu Photographs offers professional photography in Gobichettipalayam, Tamil Nadu. Specializing in wedding photography, candid photography, pre-wedding shoots, portrait photography, and event coverage, we capture your precious moments with cinematic brilliance.
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

        {/* Services Grid with H3 headings */}
        <div className="studio-services-grid">
          {filteredServices.map((srv) => (
            <div className="studio-service-card-client" key={srv.id}>
              <div className="service-card-image-wrap">
                <img
                  src={srv.image}
                  alt={`${srv.title} by Velu Photographs in Gobichettipalayam, Tamil Nadu`}
                  className="service-card-image"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="260"
                />
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
                  onClick={() => handleBookService(srv)}
                  title={`Book ${srv.title} on WhatsApp (${contactInfo?.phone || '+91 96007 77591'})`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.894-11.893a11.815 11.815 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Book This Service</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
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
