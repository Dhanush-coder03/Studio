import React, { useState, useEffect } from 'react';

export default function BookModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    weddingDate: '',
    location: '',
    eventType: 'Traditional Tamil Wedding',
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
      setSubmitted(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="book-modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="book-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="book-modal-close" 
          onClick={onClose}
          aria-label="Close Booking Modal"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {!submitted ? (
          <div>
            <div className="text-center mb-4">
              <span className="book-modal-eyebrow">RESERVE YOUR DATE</span>
              <h2 className="book-modal-title">Book A Shoot With Lensify</h2>
              <p className="book-modal-sub">
                Tell us about your dream celebration. Our creative director will get in touch within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="book-form">
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label-custom">Couple / Contact Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya & Karthik"
                    className="form-control-custom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label-custom">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="form-control-custom"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label-custom">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="your.story@email.com"
                    className="form-control-custom"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label-custom">Tentative Date</label>
                  <input
                    type="date"
                    required
                    className="form-control-custom"
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label-custom">Event Type</label>
                  <select
                    className="form-control-custom"
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  >
                    <option value="Traditional Tamil Wedding">Traditional Tamil Wedding</option>
                    <option value="Pre-Wedding Romance & Outdoor">Pre-Wedding Romance & Outdoor</option>
                    <option value="Grand Reception & Sangeet">Grand Reception & Sangeet</option>
                    <option value="Candid & Family Moments">Candid & Family Moments</option>
                    <option value="Destination Luxury Wedding">Destination Luxury Wedding</option>
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label-custom">Wedding Destination / City</label>
                  <input
                    type="text"
                    placeholder="e.g. Chennai, Madurai, Coimbatore"
                    className="form-control-custom"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="col-12 mt-4">
                  <button type="submit" className="btn-book-submit w-100">
                    <span>Submit Booking Inquiry</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="success-icon-badge mb-3">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#DF2048" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 className="book-modal-title">Thank You, {formData.name || 'Valued Client'}!</h2>
            <p className="book-modal-sub my-3">
              Your inquiry has been received. Our team is excited to craft your timeless visual heirloom. We will reach out shortly at <strong>{formData.phone || formData.email}</strong>.
            </p>
            <button className="btn-pill-rose mt-3" onClick={onClose}>
              Return to Homepage
            </button>
          </div>
        )}
      </div>

      <style>{`
        .book-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(21, 21, 21, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 2100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .book-modal-card {
          background: #FDFBF7;
          border: 1px solid rgba(184, 135, 50, 0.3);
          border-radius: 20px;
          max-width: 650px;
          width: 100%;
          padding: 40px;
          position: relative;
          color: #151515;
          box-shadow: 0 30px 70px rgba(0,0,0,0.3);
        }
        .book-modal-close {
          position: absolute;
          top: 22px;
          right: 22px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #F3ECE2;
          color: #151515;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .book-modal-close:hover {
          background: #DF2048;
          color: #FFF;
          transform: rotate(90deg);
        }
        .book-modal-eyebrow {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #B88732;
        }
        .book-modal-title {
          font-family: var(--font-serif);
          font-size: 2.1rem;
          color: #151515;
          margin-top: 4px;
        }
        .book-modal-sub {
          font-size: 0.95rem;
          color: #5C5850;
        }
        .form-label-custom {
          font-size: 0.82rem;
          font-weight: 600;
          color: #2A2723;
          margin-bottom: 6px;
          display: block;
          letter-spacing: 0.02em;
        }
        .form-control-custom {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid rgba(232, 221, 203, 0.9);
          background: #FFFFFF;
          font-size: 0.95rem;
          color: #151515;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .form-control-custom:focus {
          border-color: #DF2048;
          outline: none;
          box-shadow: 0 0 0 3px rgba(223, 32, 72, 0.12);
        }
        .btn-book-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: var(--rose-gradient);
          color: #FFF;
          font-weight: 600;
          font-size: 1rem;
          padding: 14px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(223, 32, 72, 0.32);
          transition: all 0.2s ease;
        }
        .btn-book-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(223, 32, 72, 0.42);
        }
        .success-icon-badge {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #FFEAEF;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
