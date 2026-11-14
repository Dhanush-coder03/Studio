import React from 'react';
import '../styles/camera-details.css';
import sonyAlpha7Img from '../assets/sony_alpha_7.jpg';
import sonyFx3Img from '../assets/sony_fx3.jpg';

export default function CameraDetails() {
  return (
    <section className="camera-details-section" id="cameras">
      <div className="container">
        <div className="camera-details-header">
          <span className="camera-eyebrow">Velu Photographs &bull; Cinema Equipment</span>
          <h2 className="camera-title">Professional Photography &amp; 4K Cinema Gear</h2>
          <p className="camera-subtitle">At Velu Photographs, we capture your memories using industry-leading cameras to deliver stunning cinematic wedding and candid photography.</p>
        </div>
        
        <div className="camera-grid">
          {/* Sony Alpha 7 */}
          <div className="camera-card" data-aos="fade-up" data-aos-delay="0">
            <div className="camera-image-container">
              <img
                src={sonyAlpha7Img}
                alt="Sony Alpha 7 IV Full Frame Camera used for Candid Wedding Photography by Velu Photographs"
                className="camera-image"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="camera-info">
              <h3>Sony Alpha 7 IV</h3>
              <p>Exceptional full-frame image quality with breathtaking low-light performance. Perfect for capturing natural, stunning candid wedding portraits and emotional moments.</p>
              <ul className="camera-features">
                <li>Full-Frame Sensor</li>
                <li>4K Video Recording</li>
                <li>Superior Real-Time Autofocus</li>
              </ul>
            </div>
          </div>

          {/* Sony FX3 */}
          <div className="camera-card" data-aos="fade-up" data-aos-delay="100">
            <div className="camera-image-container">
              <img
                src={sonyFx3Img}
                alt="Sony FX3 Cinema Line Camera for 4K Wedding Films at Velu Photographs"
                className="camera-image"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="camera-info">
              <h3>Sony FX3</h3>
              <p>A compact cinema camera that delivers cinematic expression and professional operability. Designed for creators who demand high cinematic quality in a compact body.</p>
              <ul className="camera-features">
                <li>Cinematic Color Science</li>
                <li>High Frame Rate 4K</li>
                <li>Built-in Image Stabilization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
