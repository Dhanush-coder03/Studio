import React, { useState, useEffect } from 'react';
import { useStudio } from '../context/StudioContext';

export default function Navbar({ onBookClick }) {
  const { navigateTo } = useStudio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Packages', href: '#packages' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setActiveNav(item.label);
    setMobileMenuOpen(false);

    if (item.href.startsWith('#')) {
      const targetElem = document.querySelector(item.href);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`lensify-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo & Wordmark (Image 1 reference) */}
          <a 
            href="#home" 
            className="brand-logo-link" 
            onClick={(e) => handleNavClick(e, { label: 'Home', href: '#home' })}
            aria-label="Lensify Wedding Photography Studio Home"
          >
            <div className="brand-icon-wrapper">
              <svg 
                className="brand-icon-svg" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer Black Aperture Hexagonal Ring */}
                <path 
                  d="M50 8 L86 29 L86 71 L50 92 L14 71 L14 29 Z" 
                  fill="#151515" 
                />
                {/* Inner Aperture Blades */}
                <polygon points="50,22 66,38 52,48" fill="#DF2048" />
                <polygon points="66,38 72,60 58,58" fill="#C41238" />
                <polygon points="72,60 50,78 48,62" fill="#B88732" />
                <polygon points="50,78 34,62 48,52" fill="#D4AF37" />
                <polygon points="34,62 28,40 42,42" fill="#DF2048" />
                <polygon points="28,40 50,22 52,38" fill="#F8F4EC" />
                {/* Center Core */}
                <circle cx="50" cy="50" r="10" fill="#151515" />
                <circle cx="50" cy="50" r="6" fill="#DF2048" />
              </svg>
            </div>
            <span className="brand-wordmark">Velu Photography</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="d-none d-lg-block" aria-label="Main Navigation">
            <ul className="desktop-nav-menu">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`nav-item-link ${activeNav === item.label ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Action: Admin Portal & Book Now Pill Button */}
          <div className="nav-action-wrapper d-none d-lg-flex align-items-center gap-2">
            <button
              type="button"
              className="btn-admin-nav-pill"
              onClick={() => navigateTo('admin')}
              title="Open Admin Dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '25px',
                background: 'rgba(22, 22, 22, 0.85)',
                color: '#DFB25E',
                border: '1px solid rgba(185, 130, 46, 0.5)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Admin</span>
            </button>

            <button 
              type="button" 
              className="btn-nav-book" 
              onClick={onBookClick}
              aria-label="Book Now"
            >
              <span>Book Now</span>
              <svg 
                className="btn-arrow-icon" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className={`mobile-toggle-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="mobile-toggle-bar"></span>
            <span className="mobile-toggle-bar"></span>
            <span className="mobile-toggle-bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-menu">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`mobile-nav-link ${activeNav === item.label ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-4 d-flex flex-column gap-2">
          <button 
            type="button" 
            className="btn-pill-rose" 
            onClick={() => {
              setMobileMenuOpen(false);
              onBookClick();
            }}
          >
            <span>Book Now</span>
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>

          <button
            type="button"
            className="btn-admin-secondary"
            style={{ width: '100%', justifyContent: 'center', borderColor: 'var(--color-gold)' }}
            onClick={() => {
              setMobileMenuOpen(false);
              navigateTo('admin');
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Admin Dashboard</span>
          </button>
        </div>
      </div>
    </header>
  );
}
