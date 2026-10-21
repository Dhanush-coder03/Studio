import React from 'react';
import { useStudio } from '../context/StudioContext';

export default function Footer() {
  const { contactInfo, navigateTo } = useStudio();

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top">
          {/* Brand & Info */}
          <div className="footer-brand">
            <h2>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12A10 10 0 1 0 22 12 10 10 0 1 0 2 12"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              {contactInfo.studioName}
            </h2>
            <p>
              {contactInfo.tagline}. Capturing your most cherished celebrations with cinematic elegance and candid artistry.
            </p>
            <div className="social-links">
              <a href={contactInfo.instagram || '#'} className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href={contactInfo.facebook || '#'} className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href={contactInfo.youtube || '#'} className="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4 className="footer-title">Explore</h4>
            <ul className="footer-links">
              <li><a href="#services">Services</a></li>
              <li><a href="#gallery">Portfolio</a></li>
              <li><a href="#packages">Pricing Packages</a></li>
              <li><a href="#about">About Studio</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-column">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-links">
              <li>{contactInfo.address}</li>
              <li>{contactInfo.phone}</li>
              <li>{contactInfo.email}</li>
              <li>{contactInfo.workingHours}</li>
            </ul>
          </div>

          {/* Admin Suite shortcut */}
          <div className="footer-column">
            <h4 className="footer-title">Studio Admin</h4>
            <p style={{marginBottom: '15px', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem'}}>
              Studio managers and editors can manage images, services, pricing, and client leads.
            </p>
            <button
              type="button"
              className="btn-newsletter"
              style={{ padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
              onClick={() => navigateTo('admin')}
            >
              Open Admin Portal →
            </button>
          </div>
        </div>

        <div className="footer-bottom d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
          <p>&copy; {new Date().getFullYear()} {contactInfo.studioName}. All rights reserved.</p>
          <button
            type="button"
            onClick={() => navigateTo('admin')}
            style={{ color: 'var(--color-gold)', fontSize: '0.82rem', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ⚙️ Admin Dashboard
          </button>
        </div>
      </div>
    </footer>
  );
}

