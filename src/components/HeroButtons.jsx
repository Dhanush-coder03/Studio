import React from 'react';

export default function HeroButtons({ onBookClick, onReelClick }) {
  return (
    <div className="hero-cta-group animate-buttons">
      {/* Primary Pill Button: Book a Shoot */}
      <button 
        type="button" 
        className="btn-book-primary" 
        onClick={onBookClick}
        aria-label="Book a wedding photography shoot"
      >
        <span>Book a Shoot</span>
        <svg 
          className="arrow-icon" 
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

      {/* Secondary Button: Watch Our Reel */}
      <button 
        type="button" 
        className="btn-watch-reel" 
        onClick={onReelClick}
        aria-label="Watch our wedding photography cinema reel"
      >
        <div className="reel-play-circle animate-pulse-ring">
          <span className="reel-play-triangle"></span>
        </div>
        <span className="reel-label-text">Watch Our Reel</span>
      </button>
    </div>
  );
}
