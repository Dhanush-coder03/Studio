import React, { useState } from 'react';
import bigMountainImg from '../assets/images/big-mountain-hero.jpg';
import preWeddingImg from '../assets/images/cat-wedding.jpg';
import weddingImg from '../assets/images/slice-reception.jpg';
import traditionalImg from '../assets/images/cat-traditional.jpg';
import maternityImg from '../assets/images/cat-maternity.jpg';
import kidsImg from '../assets/images/cat-kids.jpg';

const categories = [
  {
    id: 'pre-wedding',
    title: 'Pre Wedding',
    subtitle: 'ROMANTIC STORIES',
    image: preWeddingImg,
    description: 'Cinematic destination love stories captured in picturesque outdoor landscapes and golden hour radiance.',
  },
  {
    id: 'wedding',
    title: 'Wedding',
    subtitle: 'BEAUTIFUL BEGINNINGS',
    image: weddingImg,
    description: 'Opulent wedding celebrations, grand reception stages, and unforgettable vows etched in timeless elegance.',
  },
  {
    id: 'traditional',
    title: 'Traditional',
    subtitle: 'OUR CULTURE',
    image: traditionalImg,
    description: 'Sacred Tamil Muhurtham rituals, temple heritage ceremonies, and vibrant silk saree heirlooms.',
  },
  {
    id: 'maternity',
    title: 'Maternity',
    subtitle: 'A NEW CHAPTER',
    image: maternityImg,
    description: 'Gentle, tender celebrations of new life set amidst serene natural meadows and mountain breeze.',
  },
  {
    id: 'kids-photos',
    title: 'Kids Photos',
    subtitle: 'LITTLE MOMENTS',
    image: kidsImg,
    description: 'Pure, authentic laughter and innocent childhood smiles captured in spontaneous candid portraits.',
  },
];

export default function BigCinematicShowcase({ onBookClick }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (cat) => {
    setSelectedItem(cat);
  };

  const handleViewGalleryClick = () => {
    setSelectedItem(categories[0]);
  };

  const handleCloseLightbox = () => {
    setSelectedItem(null);
  };

  return (
    <section id="gallery" className="cinematic-section-wrapper">
      <div className="container">
        {/* ================================================================
            SECTION HEADER
            ================================================================ */}
        <div className="cinematic-section-header">
          <span className="cinematic-header-eyebrow">Wedding Photography Studio</span>
          <h2 className="cinematic-header-title">Signature Collections</h2>
          <p className="cinematic-header-sub">Romantic &amp; Elegant &mdash; Pre Wedding Focus</p>
          <svg className="cinematic-header-flourish" viewBox="0 0 120 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="6" x2="48" y2="6" stroke="#B9822E" strokeWidth="1" strokeOpacity="0.5" />
            <polygon points="60,2 64,6 60,10 56,6" fill="#B9822E" />
            <line x1="72" y1="6" x2="120" y2="6" stroke="#B9822E" strokeWidth="1" strokeOpacity="0.5" />
          </svg>
        </div>

        {/* ================================================================
            BIG CINEMATIC IMAGE BANNER (Reference Image Concept)
            ================================================================ */}
        <div className="cinematic-banner-card">
          {/* Background Mountain Couple with Flowing Red Gown */}
          <img
            src={bigMountainImg}
            alt="Romantic Couple in Mountain with Flying Red Dress"
            className="cinematic-banner-bg"
          />

          {/* Vignette & Contrast Overlay */}
          <div className="cinematic-banner-overlay" />

          {/* Content on Left */}
          <div className="cinematic-banner-content">
            <span className="cinematic-eyebrow">Pre Wedding Photography</span>

            <h2 className="cinematic-headline-script">
              <span>Love</span>
              <span>Captured</span>
              <span className="word-forever">Forever</span>
            </h2>

            {/* Decorative Filigree Divider matching reference */}
            <svg
              className="cinematic-divider-svg"
              viewBox="0 0 160 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="0" y1="9" x2="60" y2="9" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
              <circle cx="80" cy="9" r="4" fill="#B9822E" />
              <polygon points="80,2 85,9 80,16 75,9" fill="#FFFFFF" opacity="0.9" />
              <line x1="100" y1="9" x2="160" y2="9" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
            </svg>

            {/* Subtitle Metadata */}
            <p className="cinematic-sub-metadata">
              BEAUTIFUL LOCATIONS &nbsp;|&nbsp; CANDID MOMENTS &nbsp;|&nbsp; TIMELESS STORIES
            </p>

            {/* Pill Action Button */}
            <button
              type="button"
              className="btn-cinematic-gallery"
              onClick={handleViewGalleryClick}
              aria-label="View Our Gallery"
            >
              <span>View Our Gallery</span>
              <svg
                className="gallery-arrow-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* ================================================================
            5 PORTFOLIO CATEGORY CARDS (Exact Template 2 Bottom Row)
            ================================================================ */}
        <div className="portfolio-categories-container">
          <div className="categories-grid-row">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="category-showcase-card"
                onClick={() => handleCardClick(cat)}
                tabIndex={0}
                role="button"
                aria-label={`View ${cat.title} collection`}
              >
                {/* Image Thumbnail */}
                <div className="category-card-img-wrapper">
                  <img
                    src={cat.image}
                    alt={`${cat.title} - ${cat.subtitle}`}
                    className="category-card-img"
                    loading="lazy"
                  />
                </div>

                {/* Title & Subtitle */}
                <h3 className="category-card-title">{cat.title}</h3>
                <span className="category-card-subtitle">{cat.subtitle}</span>

                {/* Centered Red Accent Line */}
                <div className="category-accent-line" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================
          INTERACTIVE LIGHTBOX MODAL FOR CATEGORY GALLERIES
          ================================================================ */}
      {selectedItem && (
        <div className="lightbox-backdrop animate-fade-in" onClick={handleCloseLightbox}>
          <div className="lightbox-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={handleCloseLightbox}
              aria-label="Close Gallery Lightbox"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="row g-0 align-items-center">
              <div className="col-12 col-md-7">
                <div className="lightbox-img-frame">
                  <img src={selectedItem.image} alt={selectedItem.title} />
                </div>
              </div>
              <div className="col-12 col-md-5 p-4 p-md-5">
                <span className="lightbox-badge-category">{selectedItem.subtitle}</span>
                <h3 className="lightbox-item-title mt-2">{selectedItem.title} Collection</h3>
                <p className="lightbox-item-desc my-3">{selectedItem.description}</p>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <button
                    className="btn-hero-primary"
                    onClick={() => {
                      handleCloseLightbox();
                      onBookClick();
                    }}
                  >
                    <span>Book This Shoot</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                  <button className="btn-lightbox-prev-next" onClick={handleCloseLightbox}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 14, 13, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 2200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .lightbox-modal-content {
          background: #FDFBF7;
          border: 1px solid rgba(185, 130, 46, 0.3);
          border-radius: 22px;
          max-width: 900px;
          width: 100%;
          position: relative;
          overflow: hidden;
          box-shadow: 0 30px 70px rgba(0,0,0,0.5);
        }
        .lightbox-close-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--color-beige);
          color: #161616;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: all 0.2s ease;
        }
        .lightbox-close-btn:hover {
          background: var(--color-primary-pink);
          color: #FFF;
          transform: rotate(90deg);
        }
        .lightbox-img-frame {
          width: 100%;
          height: 480px;
          background: #111;
        }
        .lightbox-img-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .lightbox-badge-category {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--color-gold);
        }
        .lightbox-item-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: var(--color-charcoal);
        }
        .lightbox-item-desc {
          font-size: 0.96rem;
          color: var(--color-muted);
          line-height: 1.65;
        }
        .btn-lightbox-prev-next {
          padding: 12px 20px;
          border-radius: 9999px;
          background: var(--color-beige);
          color: var(--color-charcoal);
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }
        .btn-lightbox-prev-next:hover {
          background: var(--color-beige-border);
        }
        @media (max-width: 767px) {
          .lightbox-img-frame {
            height: 260px;
          }
        }
      `}</style>
    </section>
  );
}
