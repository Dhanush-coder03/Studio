import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';

export default function ContactSection() {
  const { contactInfo, addInquiry } = useStudio();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    weddingDate: '',
    eventType: 'Traditional Tamil Wedding',
    packageInterested: 'Gold Cinematic Luxury',
    location: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addInquiry({
      ...formData,
      status: 'New',
    });
    setSubmitted(true);
  };

  return (
    <section id="contact" className="studio-contact-section">
      <div className="container">
        {/* Header */}
        <div className="section-header-centered">
          <span className="section-eyebrow">Velu Photographs &bull; Let's Connect</span>
          <h2 className="section-main-title">Contact Velu Photographs</h2>
          <p className="section-subtitle">
            Visit our photography studio in Gobichettipalayam, Tamil Nadu or send an inquiry. We would love to discuss your wedding photography dreams, candid shoots, and custom packages.
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          {/* Left: Studio Contact Information Card */}
          <div className="col-12 col-lg-5">
            <div className="contact-card-info">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 700, marginBottom: '6px' }}>
                {contactInfo.studioName}
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-muted)', marginBottom: '28px' }}>
                {contactInfo.tagline}
              </p>

              {/* Phone */}
              <div className="contact-info-item">
                <div className="contact-icon-bubble">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <div className="contact-info-label">Direct Studio Lines</div>
                  <div className="contact-info-value">{contactInfo.phone}</div>
                  {contactInfo.altPhone && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{contactInfo.altPhone}</div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="contact-info-item">
                <div className="contact-icon-bubble">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <div className="contact-info-label">Email Consultation</div>
                  <div className="contact-info-value">{contactInfo.email}</div>
                </div>
              </div>

              {/* Address */}
              <div className="contact-info-item">
                <div className="contact-icon-bubble">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <div className="contact-info-label">Studio Location</div>
                  <div className="contact-info-value">{contactInfo.address}</div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="contact-info-item">
                <div className="contact-icon-bubble">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <div className="contact-info-label">Studio Hours</div>
                  <div className="contact-info-value">{contactInfo.workingHours}</div>
                </div>
              </div>

              {/* WhatsApp Quick Chat */}
              <div className="mt-4 pt-3 border-top">
                <a
                  href={`https://wa.me/${(contactInfo.whatsapp || contactInfo.phone || '9600777591').toString().replace(/\D/g, '').startsWith('91') ? (contactInfo.whatsapp || contactInfo.phone || '9600777591').toString().replace(/\D/g, '') : `91${(contactInfo.whatsapp || contactInfo.phone || '9600777591').toString().replace(/\D/g, '')}`}?text=${encodeURIComponent(`Hello Velu Photography! I would like to inquire about wedding photography and cinematography services.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-book-service"
                  style={{ textDecoration: 'none', background: '#25D366', borderColor: '#25D366', color: '#fff' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.894-11.893a11.815 11.815 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Chat on WhatsApp (+91 96007 77591)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Consultation Inquiry Form */}
          <div className="col-12 col-lg-7">
            <div className="contact-form-card">
              {!submitted ? (
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 700, marginBottom: '6px' }}>
                    Send An Inquiry
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', marginBottom: '24px' }}>
                    Share your wedding dates and vision. Our creative director will call you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '6px', display: 'block' }}>
                          Couple / Contact Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Priya &amp; Karthik"
                          className="contact-input-custom"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '6px', display: 'block' }}>
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          className="contact-input-custom"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '6px', display: 'block' }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="your.email@gmail.com"
                          className="contact-input-custom"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '6px', display: 'block' }}>
                          Event / Wedding Date
                        </label>
                        <input
                          type="date"
                          className="contact-input-custom"
                          value={formData.weddingDate}
                          onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '6px', display: 'block' }}>
                          Event Type
                        </label>
                        <select
                          className="contact-input-custom"
                          value={formData.eventType}
                          onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        >
                          <option value="Traditional Tamil Wedding">Traditional Tamil Wedding</option>
                          <option value="Muhurtham & Reception">Muhurtham &amp; Reception</option>
                          <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
                          <option value="Destination Wedding">Destination Wedding</option>
                          <option value="Maternity Fine Art">Maternity Fine Art</option>
                          <option value="Kids & Family Candid">Kids &amp; Family Candid</option>
                        </select>
                      </div>

                      <div className="col-12 col-md-6">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '6px', display: 'block' }}>
                          Venue / City
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Chennai / Madurai / Ooty"
                          className="contact-input-custom"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>

                      <div className="col-12">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '6px', display: 'block' }}>
                          Tell Us About Your Vision
                        </label>
                        <textarea
                          rows="3"
                          placeholder="Number of guests, venue ideas, specific rituals or expectations..."
                          className="contact-input-custom"
                          style={{ minHeight: '80px', resize: 'vertical' }}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      <div className="col-12 mt-4">
                        <button type="submit" className="btn-contact-submit">
                          <span>Send Consultation Request</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center py-5">
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.12)',
                      color: '#10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 18px',
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>
                    Thank You, {formData.name}!
                  </h3>
                  <p style={{ color: 'var(--color-muted)', maxWidth: '440px', margin: '0 auto 24px', fontSize: '0.92rem' }}>
                    Your inquiry has been successfully sent to the studio director. We will call you on <strong>{formData.phone}</strong> soon!
                  </p>
                  <button
                    type="button"
                    className="btn-select-package"
                    style={{ maxWidth: '220px', margin: '0 auto' }}
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        weddingDate: '',
                        eventType: 'Traditional Tamil Wedding',
                        packageInterested: 'Gold Cinematic Luxury',
                        location: '',
                        message: '',
                      });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
