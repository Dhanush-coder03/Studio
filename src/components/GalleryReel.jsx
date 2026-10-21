import React from 'react';
import { useStudio } from '../context/StudioContext';
import img1 from '../assets/images/slice-reception.jpg';
import img2 from '../assets/images/cat-maternity.jpg';
import img3 from '../assets/images/cat-traditional.jpg';
import img4 from '../assets/images/cat-kids.jpg';
import img5 from '../assets/images/slice-outdoor.jpg';
import img6 from '../assets/images/slice-sisterhood.jpg';

export default function GalleryReel() {
  const { gallery } = useStudio();
  const defaultImgs = [img1, img2, img3, img4, img5, img6];
  const images = (gallery && gallery.length > 0) ? gallery.map((item) => item.image) : defaultImgs;
  const doubledImages = [...images, ...images];

  return (
    <section className="gallery-reel-section">
      <div className="container">
        <div className="gallery-reel-header">
          <span className="gallery-reel-eyebrow">Our Masterpieces</span>
          <h2 className="gallery-reel-title">Cinematic Gallery Reel</h2>
        </div>
      </div>

      <div className="film-reel-track-container">
        <div className="film-reel-track">
          <div className="film-strip">
            {doubledImages.map((src, idx) => (
              <div className="film-frame" key={`frame-${idx}`}>
                <img src={src} alt={`Gallery Frame ${idx + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
