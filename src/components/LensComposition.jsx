import React, { useState } from 'react';
import heroCoupleImg from '../assets/images/hero-couple.jpg';
import sliceOutdoorImg from '../assets/images/slice-outdoor.jpg';
import sliceTraditionalImg from '../assets/images/slice-traditional.jpg';
import sliceReceptionImg from '../assets/images/slice-reception.jpg';
import sliceSisterhoodImg from '../assets/images/slice-sisterhood.jpg';

/**
 * Computes SVG path for an annular sector (curved radial photographic wedge)
 */
function getCurvedWedgePath(cx, cy, rIn, rOut, startDeg, endDeg) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const a1 = toRad(startDeg);
  const a2 = toRad(endDeg);

  const p1x = cx + rIn * Math.cos(a1);
  const p1y = cy + rIn * Math.sin(a1);
  const p2x = cx + rIn * Math.cos(a2);
  const p2y = cy + rIn * Math.sin(a2);
  const p3x = cx + rOut * Math.cos(a2);
  const p3y = cy + rOut * Math.sin(a2);
  const p4x = cx + rOut * Math.cos(a1);
  const p4y = cy + rOut * Math.sin(a1);

  const largeArcFlag = endDeg - startDeg <= 180 ? 0 : 1;

  return `M ${p1x} ${p1y} A ${rIn} ${rIn} 0 ${largeArcFlag} 1 ${p2x} ${p2y} L ${p3x} ${p3y} A ${rOut} ${rOut} 0 ${largeArcFlag} 0 ${p4x} ${p4y} Z`;
}

export default function LensComposition({ mouseOffset }) {
  const [activeSlice, setActiveSlice] = useState(null);
  const [isLensHovered, setIsLensHovered] = useState(false);

  // Parallax offsets
  const lensMoveX = (mouseOffset?.x || 0) * 8;
  const lensMoveY = (mouseOffset?.y || 0) * 8;
  const fanMoveX = (mouseOffset?.x || 0) * -6;
  const fanMoveY = (mouseOffset?.y || 0) * -6;

  // Geometry: SVG 600x600 coordinate center
  const cx = 300;
  const cy = 300;
  const rIn = 172; // tucked directly behind lens outer rim
  const rOut = 286; // outer radiating boundary

  // 4 Photographic Wedges matching the reference image:
  // 1. Reception / Pre-wedding couple (top-right)
  // 2. Opulent mandap traditional ceremony (top-center)
  // 3. Garden outdoor pre-wedding couple (left)
  // 4. Cultural silk saree ceremony (bottom-left)
  const photoWedges = [
    {
      id: 'reception',
      title: 'Reception Romance',
      startDeg: 295,
      endDeg: 341,
      image: sliceReceptionImg,
      imgX: 305,
      imgY: 30,
      imgW: 280,
      imgH: 280,
    },
    {
      id: 'mandap',
      title: 'Sacred Mandap',
      startDeg: 245,
      endDeg: 291,
      image: sliceTraditionalImg,
      imgX: 160,
      imgY: 15,
      imgW: 280,
      imgH: 280,
    },
    {
      id: 'outdoor',
      title: 'Pre-Wedding Bliss',
      startDeg: 195,
      endDeg: 241,
      image: sliceOutdoorImg,
      imgX: 15,
      imgY: 65,
      imgW: 280,
      imgH: 280,
    },
    {
      id: 'sisterhood',
      title: 'Silk & Traditions',
      startDeg: 145,
      endDeg: 191,
      image: sliceSisterhoodImg,
      imgX: 15,
      imgY: 220,
      imgW: 280,
      imgH: 280,
    },
  ];

  return (
    <div className="lens-composition-container">
      <div
        className="lens-perspective-card animate-lens-entry"
        style={{
          transform: `perspective(1100px) rotateY(${lensMoveX * 0.3}deg) rotateX(${-lensMoveY * 0.3}deg)`,
        }}
      >
        {/* ================================================================
            SURROUNDING CURVED PHOTO WEDGES (Annular Sector Collage)
            ================================================================ */}
        <div
          className="lens-fan-wings"
          style={{
            transform: `translate(${fanMoveX}px, ${fanMoveY}px)`,
          }}
        >
          <svg
            viewBox="0 0 600 600"
            className="w-100 h-100"
            style={{
              overflow: 'visible',
              filter: 'drop-shadow(0 18px 36px rgba(22, 22, 22, 0.16))',
            }}
          >
            <defs>
              {photoWedges.map((wedge) => {
                const pathD = getCurvedWedgePath(cx, cy, rIn, rOut, wedge.startDeg, wedge.endDeg);
                return (
                  <clipPath id={`wedge-clip-${wedge.id}`} key={`wedge-clip-${wedge.id}`}>
                    <path d={pathD} />
                  </clipPath>
                );
              })}
            </defs>

            {/* Render Each Curved Photo Wedge */}
            {photoWedges.map((wedge) => {
              const pathD = getCurvedWedgePath(cx, cy, rIn, rOut, wedge.startDeg, wedge.endDeg);
              const isHovered = activeSlice === wedge.id;

              // Center angle for subtle radial expansion on hover
              const midAngle = (((wedge.startDeg + wedge.endDeg) / 2) * Math.PI) / 180;
              const expandDist = isHovered ? 9 : 0;
              const transX = Math.cos(midAngle) * expandDist;
              const transY = Math.sin(midAngle) * expandDist;

              return (
                <g
                  key={wedge.id}
                  style={{
                    cursor: 'pointer',
                    transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: `translate(${transX}px, ${transY}px)`,
                  }}
                  onMouseEnter={() => setActiveSlice(wedge.id)}
                  onMouseLeave={() => setActiveSlice(null)}
                >
                  {/* Photo Clipped Inside Annular Sector */}
                  <image
                    href={wedge.image}
                    x={wedge.imgX}
                    y={wedge.imgY}
                    width={wedge.imgW}
                    height={wedge.imgH}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#wedge-clip-${wedge.id})`}
                    style={{
                      transition: 'filter 0.35s ease',
                      filter: isHovered ? 'brightness(1.08) contrast(1.05)' : 'brightness(0.98)',
                    }}
                  />

                  {/* Clean Ivory/White Separation Border matching reference */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#FBF8F1"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />

                  {/* Subtle Gold Shimmer Accent on Hover */}
                  {isHovered && (
                    <path
                      d={pathD}
                      fill="rgba(255, 255, 255, 0.12)"
                      stroke="#B9822E"
                      strokeWidth="2.5"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* ================================================================
            MAIN REALISTIC PROFESSIONAL CAMERA LENS (Focal Point)
            ================================================================ */}
        <div
          className={`main-camera-lens-body animate-lens-float ${isLensHovered ? 'hovered' : ''}`}
          style={{
            transform: `translate(${lensMoveX}px, ${lensMoveY}px) scale(${isLensHovered ? 1.02 : 1})`,
          }}
          onMouseEnter={() => setIsLensHovered(true)}
          onMouseLeave={() => setIsLensHovered(false)}
        >
          {/* Outer Knurled Metal Barrel */}
          <div className="lens-knurled-rim">
            {/* Signature Canon L-Series Crimson Red Metallic Accent Ring */}
            <div className="lens-signature-red-ring" />

            {/* Inner Dark Optical Bezel with Engraved Lens Markings */}
            <div className="lens-matte-bezel">
              {/* Curving SVG Vector Typography matching reference */}
              <svg viewBox="0 0 340 340" className="lens-barrel-svg-text">
                <defs>
                  {/* Top Arc for "LENSIFY" */}
                  <path
                    id="lensPathTop"
                    d="M 68,170 A 102,102 0 0,1 272,170"
                    fill="none"
                  />
                  {/* Bottom Arc for "24-70mm 1:2.8 L ø82mm" */}
                  <path
                    id="lensPathBottom"
                    d="M 272,170 A 102,102 0 0,1 68,170"
                    fill="none"
                  />
                </defs>

                {/* Top Engraving: LENSIFY */}
                <text
                  fill="#EFE7D9"
                  fontSize="12.5"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontWeight="700"
                  letterSpacing="0.32em"
                  opacity="0.92"
                >
                  <textPath href="#lensPathTop" startOffset="50%" textAnchor="middle">
                    LENSIFY
                  </textPath>
                </text>

                {/* Bottom Engraving: 24-70mm 1:2.8 L ø82mm */}
                <text
                  fill="#DDD5C7"
                  fontSize="10"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontWeight="600"
                  letterSpacing="0.22em"
                  opacity="0.88"
                >
                  <textPath href="#lensPathBottom" startOffset="50%" textAnchor="middle">
                    24-70mm &nbsp; 1:2.8 <tspan fill="#E91E4D" fontWeight="700">L</tspan> &nbsp; &Phi;82mm
                  </textPath>
                </text>
              </svg>

              {/* Central Circular Glass Aperture Window */}
              <div className="lens-central-glass-aperture">
                {/* Cinematic South Indian Wedding Couple Portrait */}
                <img
                  src={heroCoupleImg}
                  alt="South Indian Wedding Couple in Lens"
                  className="lens-couple-portrait animate-couple-zoom"
                />

                {/* Optical Glass Multi-Coated Reflection Overlays */}
                <div
                  className="lens-glass-reflection-coating"
                  style={{
                    transform: `translate(${lensMoveX * 0.4}px, ${lensMoveY * 0.4}px)`,
                  }}
                />

                {/* Specular Curved Glint Arc */}
                <div className="lens-specular-arc" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
