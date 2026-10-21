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
          <span className="section-eyebrow">Let's Connect</span>
          <h2 className="section-main-title">Contact Velu Photography</h2>
          <p className="section-subtitle">
            Visit our studio or leave an inquiry. We would love to discuss your wedding dreams, venue details, and custom packages over coffee.
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
                  <div className="contact-info-label">Studio Address</div>
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
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-book-service"
                  style={{ textDecoration: 'none' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  <span>Chat on WhatsApp</span>
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
