import React from 'react';

export default function Packages({ onBookClick }) {
  return (
    <section className="packages-section" id="packages">
      <div className="container">
        <div className="packages-header">
          <span className="packages-eyebrow">Investment</span>
          <h2 className="packages-title">Our Premium Packages</h2>
        </div>

        <div className="packages-grid">
          {/* Silver Package */}
          <div className="package-card" data-aos="fade-up" data-aos-delay="0">
            <h3 className="package-name">Essential</h3>
            <div className="package-price">$2,500</div>
            <ul className="package-features">
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                6 Hours Coverage
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                1 Lead Photographer
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Online Digital Gallery
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                300+ Edited High-Res Photos
              </li>
            </ul>
            <button className="btn-package" onClick={onBookClick}>Book Essential</button>
          </div>

          {/* Gold Package */}
          <div className="package-card popular" data-aos="fade-up" data-aos-delay="100">
            <div className="package-badge">Popular</div>
            <h3 className="package-name">Signature</h3>
            <div className="package-price">$4,200</div>
            <ul className="package-features">
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                10 Hours Coverage
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                2 Photographers
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Pre-Wedding Consultation
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                600+ Edited High-Res Photos
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Premium Layflat Album
              </li>
            </ul>
            <button className="btn-package" onClick={onBookClick}>Book Signature</button>
          </div>

          {/* Platinum Package */}
          <div className="package-card" data-aos="fade-up" data-aos-delay="200">
            <h3 className="package-name">Luxury</h3>
            <div className="package-price">$6,800</div>
            <ul className="package-features">
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Full Day Coverage
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                3 Photographers + Drone
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Pre-Wedding Engagement Shoot
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                1000+ Edited High-Res Photos
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                2 Parent Albums + 1 Large Album
              </li>
            </ul>
            <button className="btn-package" onClick={onBookClick}>Book Luxury</button>
          </div>
        </div>
      </div>
    </section>
  );
}
