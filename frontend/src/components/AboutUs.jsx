import React from 'react';
import outdoorImg from '../assets/images/slice-outdoor.jpg';

export default function AboutUs() {
  return (
    <section className="about-section" id="about">
      <div className="container about-container">
        <div className="about-image-wrapper" data-aos="fade-right">
          <img src={outdoorImg} alt="Our Creative Team" className="about-image" />
        </div>
        
        <div className="about-content" data-aos="fade-left">
          <span className="about-eyebrow">The Studio Behind The Lens</span>
          <h2 className="about-title">Crafting Timeless Memories Since 2010</h2>
          
          <p className="about-description">
            We are a team of passionate storytellers, visual artists, and dreamers dedicated to capturing the most beautiful moments of your life. With a blend of cinematic elegance and candid authenticity, we ensure your memories are preserved in the most breathtaking way possible.
          </p>

          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years of Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Weddings Captured</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">12</span>
              <span className="stat-label">Creative Artists</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Client Love</span>
            </div>
          </div>

          <button className="btn-about" onClick={() => window.scrollTo(0, 0)}>
            <span>Meet The Team</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
