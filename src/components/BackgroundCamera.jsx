import React from 'react';
import dslrBg from '../assets/images/dslr-bg.jpg';

export default function BackgroundCamera({ mouseOffset }) {
  // Very subtle mouse parallax for background depth
  const moveX = (mouseOffset?.x || 0) * 5;
  const moveY = (mouseOffset?.y || 0) * 5;

  return (
    <div className="hero-background-camera-container" aria-hidden="true">
      {/* Background DSLR & Golden Bokeh Image */}
      <div 
        className="hero-dslr-image-wrapper"
        style={{
          transform: `translate(${moveX}px, ${moveY}px) scale(1.04)`,
        }}
      >
        <img
          src={dslrBg}
          alt=""
          className="hero-dslr-image"
          loading="eager"
        />
      </div>

      {/* Warm Ambient Radial Light Sheen */}
      <div className="hero-ambient-glow" />

      {/* Floating Bokeh Bubbles Overlay */}
      <div className="hero-bokeh-particles">
        <span className="bokeh-bubble b1" />
        <span className="bokeh-bubble b2" />
        <span className="bokeh-bubble b3" />
        <span className="bokeh-bubble b4" />
      </div>
    </div>
  );
}
