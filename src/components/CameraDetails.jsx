import React from 'react';
import '../styles/camera-details.css';
import sonyAlpha7Img from '../assets/sony_alpha_7.jpg';
import sonyFx3Img from '../assets/sony_fx3.jpg';

export default function CameraDetails() {
  return (
    <section className="camera-details-section" id="cameras">
      <div className="container">
        <div className="camera-details-header">
          <span className="camera-eyebrow">Equipment</span>
          <h2 className="camera-title">Our Cinematic Arsenal</h2>
          <p className="camera-subtitle">We capture your moments using industry-leading cameras to deliver stunning visual quality.</p>
        </div>
        
        <div className="camera-grid">
          {/* Sony Alpha 7 */}
          <div className="camera-card" data-aos="fade-up" data-aos-delay="0">
            <div className="camera-image-container">
              <img src={sonyAlpha7Img} alt="Sony Alpha 7" className="camera-image" />
            </div>
            <div className="camera-info">
              <h3>Sony Alpha 7</h3>
              <p>Exceptional full-frame image quality with breathtaking low-light performance. Perfect for capturing natural, stunning portraits and fast action in any environment.</p>
              <ul className="camera-features">
                <li>Full-Frame Sensor</li>
                <li>4K Video Recording</li>
                <li>Superior Autofocus</li>
              </ul>
            </div>
          </div>

          {/* Sony FX3 */}
          <div className="camera-card" data-aos="fade-up" data-aos-delay="100">
            <div className="camera-image-container">
              <img src={sonyFx3Img} alt="Sony FX3" className="camera-image" />
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
