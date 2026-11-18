import React from 'react';
import { useStudio } from '../context/StudioContext';
import img1 from '../assets/images/velu-photographs-wedding-reception-photography.webp';
import img2 from '../assets/images/maternity-photoshoot-in-gobichettipalayam.webp';
import img3 from '../assets/images/traditional-temple-wedding-photography-tamil-nadu.webp';
import img4 from '../assets/images/candid-kids-and-family-portrait-photography.webp';
import img5 from '../assets/images/outdoor-pre-wedding-photography-gobichettipalayam.webp';
import img6 from '../assets/images/professional-candid-wedding-photography-velu-photographs.webp';

const slideDescriptions = [
  "Velu Photographs wedding reception photography and celebratory couple moments in Gobichettipalayam",
  "Maternity photoshoot in Gobichettipalayam by Velu Photographs",
  "Traditional South Indian temple wedding photography in Tamil Nadu by Velu Photographs",
  "Candid kids and family photography by Velu Photographs in Gobichettipalayam",
  "Outdoor pre-wedding photoshoot by Velu Photographs in Tamil Nadu",
  "Professional candid wedding photography of bride and bridesmaids by Velu Photographs",
];

export default function GalleryReel() {
  const { gallery } = useStudio();
  const defaultImgs = [img1, img2, img3, img4, img5, img6];
  const images = (gallery && gallery.length > 0) ? gallery.map((item) => item.image) : defaultImgs;
  const doubledImages = [...images, ...images];

  return (
    <section className="gallery-reel-section">
      <div className="container">
        <div className="gallery-reel-header">
          <span className="gallery-reel-eyebrow">Velu Photographs &bull; Our Masterpieces</span>
          <h2 className="gallery-reel-title">Cinematic Wedding &amp; Candid Gallery Reel</h2>
        </div>
      </div>

      <div className="film-reel-track-container">
        <div className="film-reel-track">
          <div className="film-strip">
            {doubledImages.map((src, idx) => (
              <div className="film-frame" key={`frame-${idx}`}>
                <img
                  src={src}
                  alt={slideDescriptions[idx % slideDescriptions.length]}
                  loading="lazy"
                  decoding="async"
                  width="380"
                  height="250"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
