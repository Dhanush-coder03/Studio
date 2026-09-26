import React, { useState, useEffect, useRef } from 'react';
import BackgroundCamera from './BackgroundCamera';
import HeroContent from './HeroContent';
import LensComposition from './LensComposition';
import FeatureBar from './FeatureBar';

export default function Hero({ onBookClick, onReelClick }) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Smooth mouse movement parallax with damped interpolation
  useEffect(() => {
    let animationFrameId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      // Normalize mouse coordinates between -1 and 1
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const updateParallax = () => {
      // Linear interpolation (lerp) for smooth cinematic glide
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      setMouseOffset({
        x: parseFloat(currentX.toFixed(4)),
        y: parseFloat(currentY.toFixed(4)),
      });

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      {/* ================================================================
          LAYER 2: BACKGROUND DSLR CAMERA & GOLDEN BOKEH (Right 45%)
          ================================================================ */}
      <BackgroundCamera mouseOffset={mouseOffset} />

      {/* ================================================================
          LAYERS 4-7: MAIN HERO TWO-COLUMN CONTENT
          ================================================================ */}
      <div className="hero-main-container">
        <div className="container">
          <div className="hero-two-column-row">
            {/* Left 45%: Editorial Typography & CTAs */}
            <HeroContent
              onBookClick={onBookClick}
              onReelClick={onReelClick}
            />

            {/* Right 55%: Main Lens Composition & Surrounding Photo Wedges */}
            <LensComposition mouseOffset={mouseOffset} />
          </div>
        </div>
      </div>

      {/* ================================================================
          BOTTOM FEATURE ROW (4 Columns)
          ================================================================ */}
      <FeatureBar />
    </section>
  );
}
