import React, { useEffect } from 'react';
import heroCoupleImg from '../assets/images/hero-couple.jpg';
import sliceTraditionalImg from '../assets/images/slice-traditional.jpg';
import sliceReceptionImg from '../assets/images/slice-reception.jpg';

export default function ReelModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-luxury animate-fade-in" onClick={onClose}>
      <div className="modal-container-luxury" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close Cinema Reel Modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Video / Reel Showcase Header */}
        <div className="reel-modal-header">
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="badge-cinema-live">SHOWREEL 2026</span>
            <span className="reel-quality-tag">4K CINEMA MASTER</span>
          </div>
          <h2 className="reel-modal-title">Eternal Symphony &mdash; Tamil Wedding Cinema</h2>
          <p className="reel-modal-desc">
            Experience our signature cinematic storytelling capturing deep emotions, sacred temple traditions, and genuine laughter.
          </p>
        </div>

        {/* Cinematic Video Player Mockup with Dynamic Visuals */}
        <div className="reel-player-frame">
          <img 
            src={heroCoupleImg} 
            alt="Wedding Reel Thumbnail" 
            className="reel-video-preview-image animate-couple-zoom" 
          />
          <div className="reel-video-overlay-gradient"></div>

          {/* Center Play / Pause Indicator */}
          <div className="reel-center-controls">
            <div className="reel-pulsing-play">
              <span className="reel-play-triangle-large"></span>
            </div>
            <span className="reel-status-text">Playing 4K Master Reel (02:45)</span>
          </div>

          {/* Bottom Video Progress Bar */}
          <div className="reel-bottom-bar">
            <div className="reel-progress-track">
              <div className="reel-progress-fill"></div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2 text-white-50" style={{ fontSize: '0.85rem' }}>
              <span>01:14 / 02:45</span>
              <span>Sound: Dolby Atmos &bull; 60 FPS</span>
            </div>
          </div>
        </div>

        {/* Reel Highlights Carousel / Thumbnails */}
        <div className="reel-moments-row mt-4">
          <div className="reel-moment-card active">
            <img src={heroCoupleImg} alt="Couple Vows" />
            <div className="reel-moment-info">
              <h6>Grand Reception</h6>
              <small>00:45</small>
            </div>
          </div>
          <div className="reel-moment-card">
            <img src={sliceTraditionalImg} alt="Traditional Muhurtham" />
            <div className="reel-moment-info">
              <h6>Sacred Muhurtham</h6>
              <small>01:20</small>
            </div>
          </div>
          <div className="reel-moment-card">
            <img src={sliceReceptionImg} alt="Sunset Vows" />
            <div className="reel-moment-info">
              <h6>Sunset Romance</h6>
              <small>02:10</small>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .modal-backdrop-luxury {
          position: fixed;
          inset: 0;
          background: rgba(15, 14, 13, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .modal-container-luxury {
          background: #181716;
          border: 1px solid rgba(232, 221, 203, 0.2);
          border-radius: 20px;
          max-width: 860px;
          width: 100%;
          padding: 32px;
          position: relative;
          color: #FFF;
          box-shadow: 0 25px 60px rgba(0,0,0,0.6);
        }
        .modal-close-btn {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          color: #FFF;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .modal-close-btn:hover {
          background: #DF2048;
          transform: rotate(90deg);
        }
        .badge-cinema-live {
          background: #DF2048;
          color: #FFF;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 4px 10px;
          border-radius: 4px;
        }
        .reel-quality-tag {
          font-size: 0.75rem;
          color: #B88732;
          font-weight: 600;
          letter-spacing: 0.08em;
        }
        .reel-modal-title {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          margin-top: 6px;
          color: #F8F4EC;
        }
        .reel-modal-desc {
          font-size: 0.95rem;
          color: #A39F97;
          margin-bottom: 20px;
        }
        .reel-player-frame {
          position: relative;
          width: 100%;
          height: 400px;
          border-radius: 14px;
          overflow: hidden;
          background: #000;
          box-shadow: inset 0 0 40px rgba(0,0,0,0.8);
        }
        .reel-video-preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.85);
        }
        .reel-video-overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%);
        }
        .reel-center-controls {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          z-index: 5;
        }
        .reel-pulsing-play {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: #DF2048;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 25px rgba(223, 32, 72, 0.6);
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .reel-pulsing-play:hover {
          transform: scale(1.12);
        }
        .reel-play-triangle-large {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 10px 0 10px 18px;
          border-color: transparent transparent transparent #FFFFFF;
          margin-left: 4px;
        }
        .reel-status-text {
          font-size: 0.9rem;
          font-weight: 500;
          color: #FFF;
          letter-spacing: 0.04em;
          text-shadow: 0 2px 8px rgba(0,0,0,0.8);
        }
        .reel-bottom-bar {
          position: absolute;
          bottom: 18px;
          left: 20px;
          right: 20px;
          z-index: 6;
        }
        .reel-progress-track {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.25);
          border-radius: 2px;
          overflow: hidden;
        }
        .reel-progress-fill {
          width: 45%;
          height: 100%;
          background: linear-gradient(90deg, #DF2048, #B88732);
        }
        .reel-moments-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .reel-moment-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.05);
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }
        .reel-moment-card.active, .reel-moment-card:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #B88732;
        }
        .reel-moment-card img {
          width: 52px;
          height: 52px;
          border-radius: 6px;
          object-fit: cover;
        }
        .reel-moment-info h6 {
          font-size: 0.88rem;
          margin: 0;
          color: #F8F4EC;
        }
        .reel-moment-info small {
          color: #A39F97;
        }
        @media (max-width: 768px) {
          .reel-player-frame {
            height: 240px;
          }
          .reel-moments-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
