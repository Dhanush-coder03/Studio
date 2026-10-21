import React from 'react';
import { useStudio } from '../context/StudioContext';

export default function PackagesSection({ onBookClick }) {
  const { packages } = useStudio();

  return (
    <section id="packages" className="studio-packages-section">
      <div className="container">
        {/* Header */}
        <div className="section-header-centered">
          <span className="section-eyebrow">Transparent Investment</span>
          <h2 className="section-main-title">Wedding Photography Packages</h2>
          <p className="section-subtitle">
            All packages feature our senior cinema crew, dedicated drone aerial coverage, raw deliverables, and heirloom handcrafted albums.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="studio-packages-grid">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`studio-package-card-client ${pkg.isPopular ? 'popular' : ''}`}
            >
              {pkg.badge && (
                <span className="package-client-badge">{pkg.badge}</span>
              )}

              <h3 className="package-client-name">{pkg.name}</h3>
              <div className="package-client-period">{pkg.period}</div>
              <div className="package-client-price">{pkg.price}</div>

              {pkg.deliverablesSummary && (
                <div className="package-client-deliverables-box">
                  {pkg.deliverablesSummary}
                </div>
              )}

              <p className="package-client-desc">{pkg.description}</p>

              {/* Deliverables Checklist */}
              <ul className="package-client-features">
                {(pkg.features || []).map((feat, i) => (
                  <li key={i} className="package-client-feature-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="btn-select-package mt-auto"
                onClick={() => onBookClick && onBookClick(pkg.name)}
              >
                <span>Reserve {pkg.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
