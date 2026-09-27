import React from 'react';

export default function Footer() {
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
              Lensify
            </h2>
            <p>
              Elevating the art of photography with timeless luxury and candid perfection. We preserve your most cherished memories for generations.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4 className="footer-title">Explore</h4>
            <ul className="footer-links">
              <li><a href="#about">About Studio</a></li>
              <li><a href="#gallery">Portfolio</a></li>
              <li><a href="#packages">Pricing</a></li>
              <li><a href="#blog">Journal</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-column">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-links">
              <li>123 Luxury Ave, NY 10001</li>
              <li>+1 (555) 123-4567</li>
              <li>hello@lensify.com</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-column">
            <h4 className="footer-title">Newsletter</h4>
            <p style={{marginBottom: '15px', color: 'rgba(255,255,255,0.6)'}}>Subscribe for exclusive offers and photography tips.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className="newsletter-input" required />
              <button type="submit" className="btn-newsletter">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Lensify Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
