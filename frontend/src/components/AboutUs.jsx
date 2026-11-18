import React from 'react';
import outdoorImg from '../assets/images/outdoor-pre-wedding-photography-gobichettipalayam.webp';

export default function AboutUs() {
  return (
    <section className="about-section" id="about">
      <div className="container about-container">
        <div className="about-image-wrapper" data-aos="fade-right">
          <img
            src={outdoorImg}
            alt="Velu Photographs professional wedding photography team on outdoor photoshoot in Gobichettipalayam"
            className="about-image"
            loading="lazy"
            decoding="async"
            width="600"
            height="400"
          />
        </div>
        
        <div className="about-content" data-aos="fade-left">
          <span className="about-eyebrow">The Studio Behind The Lens</span>
          <h2 className="about-title">Velu Photographs &mdash; Crafting Timeless Memories in Gobichettipalayam</h2>
          
          <p className="about-description">
            At <strong>Velu Photographs</strong>, we are a passionate crew of visual storytellers, candid wedding photographers, and cinematographers based in Gobichettipalayam, Tamil Nadu. With a seamless blend of cinematic elegance and candid authenticity, we specialize in wedding photography, candid photography, pre-wedding shoots, portraits, and professional event photography across Gobichettipalayam and Tamil Nadu.
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

          <button className="btn-about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
