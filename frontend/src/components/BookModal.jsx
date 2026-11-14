import React, { useState, useEffect } from 'react';
import { useStudio } from '../context/StudioContext';

export default function BookModal({ isOpen, onClose, initialPackage = '' }) {
  const { addInquiry, contactInfo } = useStudio();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    weddingDate: '',
    location: '',
    eventType: initialPackage || 'Traditional Tamil Wedding',
    packageInterested: initialPackage || 'Gold Cinematic Luxury',
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      if (initialPackage) {
        setFormData((prev) => ({
          ...prev,
          eventType: initialPackage,
          packageInterested: initialPackage,
        }));
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, initialPackage]);

  if (!isOpen) return null;

  const handleWhatsAppBooking = (e) => {
    if (e) e.preventDefault();
    const rawPhone = (contactInfo?.whatsapp || contactInfo?.phone || '9600777591').toString().replace(/\D/g, '');
    const targetPhone = rawPhone.startsWith('91') ? rawPhone : `91${rawPhone}`;

    const orderText = 
`https://studio-eosin-phi.vercel.app/#packages

━━━━━━━━━━━━━━━━━━━━━━━━━━
📸 *VELU PHOTOGRAPHY | BOOKING INQUIRY*
━━━━━━━━━━━━━━━━━━━━━━━━━━

✦ *Client Name:* ${formData.name || 'Valued Client'}
✦ *Client Contact:* ${formData.phone || 'Not provided'}
✦ *Target Date:* ${formData.weddingDate || 'To be scheduled'}
✦ *Event Location:* ${formData.location || 'Kurumathur / Gobichettipalayam / Erode'}
✦ *Service / Tier:* ${formData.packageInterested || formData.eventType || 'Photography Package'}

📍 *Studio Address:*
Kurumathur, Gobichettipalayam, Erode, Tamil Nadu 638457
📞 *Direct Line / WhatsApp:* ${contactInfo?.phone || '+91 96007 77591'}

━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 *Hello Velu Photography, please confirm date availability and discuss booking details!*`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(orderText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    addInquiry({
      name: formData.name || 'WhatsApp Client',
      phone: formData.phone || targetPhone,
      email: formData.email,
      weddingDate: formData.weddingDate,
      eventType: formData.eventType,
      packageInterested: formData.packageInterested || initialPackage,
      location: formData.location || 'Gobichettipalayam',
      status: 'New',
      message: `Direct WhatsApp booking sent for ${formData.packageInterested || formData.eventType}`,
    });

    setSubmitted(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addInquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      weddingDate: formData.weddingDate,
      eventType: formData.eventType,
      packageInterested: formData.packageInterested || initialPackage,
      location: formData.location,
      status: 'New',
    });
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
              <h2 className="book-modal-title">Book A Shoot With Velu Photography</h2>
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

                <div className="col-12 mt-4 d-flex flex-column flex-sm-row gap-3">
                  <button
                    type="button"
                    className="btn-book-submit flex-grow-1"
                    onClick={handleWhatsAppBooking}
                    style={{ background: '#25D366', borderColor: '#25D366' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.894-11.893a11.815 11.815 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>Book on WhatsApp</span>
                  </button>

                  <button type="submit" className="btn-book-submit flex-grow-1">
                    <span>Submit Inquiry</span>
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
              Your inquiry has been received for <strong>{formData.packageInterested || formData.eventType}</strong>. Our creative team at Velu Photography will reach out shortly at <strong>{formData.phone || formData.email}</strong>.
            </p>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                type="button"
                className="btn-pill-rose"
                style={{ background: '#25D366', borderColor: '#25D366' }}
                onClick={handleWhatsAppBooking}
              >
                <span>💬 Message Us on WhatsApp</span>
              </button>
              <button className="btn-pill-rose" onClick={onClose}>
                Return to Website
              </button>
            </div>
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
