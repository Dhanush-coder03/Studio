import React from 'react';

export default function HeroContent({ onBookClick, onReelClick }) {
  return (
    <div className="hero-content-col">
      {/* Eyebrow: Gold Line + Uppercase Studio Name */}
      <div className="hero-eyebrow-container animate-eyebrow">
        <span className="hero-eyebrow-gold-line" />
        <span className="hero-eyebrow-text">WEDDING PHOTOGRAPHY STUDIO</span>
      </div>

      {/* Main Headline: Editorial Luxury Serif */}
      <h1 className="hero-headline">
        <span className="headline-row animate-title-line-1">
          Let’s Capture
        </span>
        <span className="headline-row animate-title-line-2">
          Your <span className="headline-gold-word">Special Day</span>
        </span>
      </h1>

      {/* Subtitle: Clean Dual-Line Sans-Serif */}
      <div className="hero-subtitle-container animate-subtitle">
        <p className="hero-subtitle-text">
          Weddings &nbsp;|&nbsp; Pre Weddings &nbsp;|&nbsp; Family Events
        </p>
        <p className="hero-subtitle-text">
          Traditional Functions &nbsp;|&nbsp; Candid Photography
        </p>
      </div>

      {/* CTA Button Group */}
      <div className="hero-actions-group animate-buttons">
        {/* Primary Pink/Red Pill Button */}
        <button
          type="button"
          className="btn-hero-primary"
          onClick={onBookClick}
          aria-label="Book a Shoot"
        >
          <span>Book a Shoot</span>
          <svg
            className="hero-btn-arrow"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

        {/* Secondary Reel Button with Play Icon */}
        <button
          type="button"
          className="btn-hero-reel"
          onClick={onReelClick}
          aria-label="Watch Our Reel"
        >
          <div className="hero-play-icon-badge">
            <span className="hero-play-triangle" />
          </div>
          <span className="hero-play-label">Watch Our Reel</span>
        </button>
      </div>
    </div>
  );
}
