import React, { useState } from 'react';
import heroCoupleImg from '../assets/images/hero-couple.jpg';
import sliceOutdoorImg from '../assets/images/slice-outdoor.jpg';
import sliceTraditionalImg from '../assets/images/slice-traditional.jpg';
import sliceReceptionImg from '../assets/images/slice-reception.jpg';
import sliceSisterhoodImg from '../assets/images/slice-sisterhood.jpg';

/**
 * Computes SVG path for an annular sector (radial pie wedge)
 */
function getAnnularSectorPath(cx, cy, rIn, rOut, startDeg, endDeg) {
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

export default function HeroLens({ mouseOffset }) {
  const [activeSlice, setActiveSlice] = useState(null);
  const [lensHovered, setLensHovered] = useState(false);

  // Parallax translation based on mouse movement
  const lensMoveX = (mouseOffset?.x || 0) * 10;
  const lensMoveY = (mouseOffset?.y || 0) * 10;
  const fanMoveX = (mouseOffset?.x || 0) * -7;
  const fanMoveY = (mouseOffset?.y || 0) * -7;

  // ViewBox geometry
  const cx = 300;
  const cy = 300;
  const rIn = 168;  // nestled behind camera lens outer rim
  const rOut = 286; // outer circumference arc

  // 4 Radial Photo Slices matching Image 1:
  const slices = [
    {
      id: 'reception',
      title: 'Sunset Romance',
      startDeg: 295,
      endDeg: 341,
      image: sliceReceptionImg,
      imgX: 310,
      imgY: 30,
      imgW: 280,
      imgH: 280,
    },
    {
      id: 'traditional',
      title: 'Sacred Rituals',
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
      title: 'Candid Love',
      startDeg: 195,
      endDeg: 241,
      image: sliceOutdoorImg,
      imgX: 10,
      imgY: 60,
      imgW: 280,
      imgH: 280,
    },
    {
      id: 'sisterhood',
      title: 'Silk & Smiles',
      startDeg: 145,
      endDeg: 191,
      image: sliceSisterhoodImg,
      imgX: 10,
      imgY: 220,
      imgW: 280,
      imgH: 280,
    },
  ];

  return (
    <div className="hero-right-column">
      <div
        className="lens-composition-wrapper animate-lens-entry"
        style={{
          transform: `perspective(1000px) rotateY(${lensMoveX * 0.35}deg) rotateX(${-lensMoveY * 0.35}deg)`,
        }}
      >
        {/* ================================================================
            RADIAL PHOTO SLICES FAN (SVG Annular Sectors matching Image 1)
            ================================================================ */}
        <div
          className="lens-fan-container"
          style={{
            transform: `translate(${fanMoveX}px, ${fanMoveY}px)`,
          }}
        >
          <svg
            viewBox="0 0 600 600"
            className="w-100 h-100"
            style={{ overflow: 'visible', filter: 'drop-shadow(0 18px 36px rgba(21, 21, 21, 0.16))' }}
          >
            <defs>
              {slices.map((slice) => {
                const pathD = getAnnularSectorPath(cx, cy, rIn, rOut, slice.startDeg, slice.endDeg);
                return (
                  <clipPath id={`clip-${slice.id}`} key={`clip-${slice.id}`}>
                    <path d={pathD} />
                  </clipPath>
                );
              })}
            </defs>

            {/* Render Each Radial Photo Slice */}
            {slices.map((slice) => {
              const pathD = getAnnularSectorPath(cx, cy, rIn, rOut, slice.startDeg, slice.endDeg);
              const isHovered = activeSlice === slice.id;

              // Center of slice for subtle expansion on hover
              const midAngle = ((slice.startDeg + slice.endDeg) / 2 * Math.PI) / 180;
              const expandDist = isHovered ? 9 : 0;
              const transX = Math.cos(midAngle) * expandDist;
              const transY = Math.sin(midAngle) * expandDist;

              return (
                <g
                  key={slice.id}
                  style={{
                    cursor: 'pointer',
                    transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: `translate(${transX}px, ${transY}px)`,
                  }}
                  onMouseEnter={() => setActiveSlice(slice.id)}
                  onMouseLeave={() => setActiveSlice(null)}
                >
                  {/* High Quality Photograph inside Sector */}
                  <image
                    href={slice.image}
                    x={slice.imgX}
                    y={slice.imgY}
                    width={slice.imgW}
                    height={slice.imgH}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#clip-${slice.id})`}
                    style={{
                      transition: 'filter 0.35s ease',
                      filter: isHovered ? 'brightness(1.08) contrast(1.04)' : 'brightness(0.98)',
                    }}
                  />

                  {/* Clean Crisp White Photographic Border & Separation Gap */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />

                  {/* Subtle Inner Highlight on Hover */}
                  {isHovered && (
                    <path
                      d={pathD}
                      fill="rgba(255, 255, 255, 0.1)"
                      stroke="#B88732"
                      strokeWidth="2.5"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* ================================================================
            MAIN REALISTIC CAMERA LENS ASSEMBLY
            ================================================================ */}
        <div
          className={`camera-lens-assembly animate-lens-float ${lensHovered ? 'hovered' : ''}`}
          style={{
            transform: `translate(${lensMoveX}px, ${lensMoveY}px) scale(${lensHovered ? 1.02 : 1})`,
          }}
          onMouseEnter={() => setLensHovered(true)}
          onMouseLeave={() => setLensHovered(false)}
        >
          {/* Outer Knurled Metallic Bezel */}
          <div className="lens-outer-barrel">
            {/* Signature Canon L-Series Crimson Red Metallic Accent Ring */}
            <div className="lens-red-accent-ring"></div>

            {/* Inner Matte Barrel with Engraved Markings */}
            <div className="lens-engraved-barrel">
              {/* SVG Engraved Curving Typography: LENSIFY & Specifications */}
              <svg viewBox="0 0 340 340" className="lens-markings-svg">
                <defs>
                  {/* Top Arc Path for "LENSIFY" */}
                  <path
                    id="lensTextPathTop"
                    d="M 68,170 A 102,102 0 0,1 272,170"
                    fill="none"
                  />
                  {/* Bottom Arc Path for "24-70mm 1:2.8 L ø 82mm" */}
                  <path
                    id="lensTextPathBottom"
                    d="M 272,170 A 102,102 0 0,1 68,170"
                    fill="none"
                  />
                </defs>

                {/* Top Engraving: LENSIFY */}
                <text
                  fill="#EDE8DF"
                  fontSize="12.5"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontWeight="700"
                  letterSpacing="0.32em"
                  opacity="0.9"
                >
                  <textPath href="#lensTextPathTop" startOffset="50%" textAnchor="middle">
                    LENSIFY
                  </textPath>
                </text>

                {/* Bottom Engraving: 24-70mm 1:2.8 L ø 82mm */}
                <text
                  fill="#DDD7CB"
                  fontSize="10"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontWeight="600"
                  letterSpacing="0.22em"
                  opacity="0.85"
                >
                  <textPath href="#lensTextPathBottom" startOffset="50%" textAnchor="middle">
                    24-70mm &nbsp; 1:2.8 L &nbsp; ø 82mm
                  </textPath>
                </text>
              </svg>

              {/* Central Aperture Core Opening */}
              <div className="lens-aperture-core">
                {/* Large Emotional South Indian Wedding Couple Photograph */}
                <img
                  src={heroCoupleImg}
                  alt="Tamil South Indian Wedding Couple"
                  className="lens-couple-image animate-couple-zoom"
                />

                {/* Realistic Multi-Coated Optical Glass Reflection */}
                <div
                  className="lens-glass-reflection"
                  style={{
                    transform: `translate(${lensMoveX * 0.4}px, ${lensMoveY * 0.4}px)`,
                  }}
                ></div>

                {/* Curved Specular Glint Arc */}
                <div className="lens-glass-arc-reflection"></div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================
            HANDWRITTEN ACCENT: "More Than Just Photos" (Matching Image 1)
            ================================================================ */}
        <div className="lens-script-accent">
          {/* Animated Hand-Drawn Heart */}
          <svg
            className="script-heart-icon animate-heart"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>

          {/* Script Text */}
          <span className="script-text-primary">More Than</span>
          <span className="script-text-sub">
            Just Photos
            {/* Hand-drawn underline swoop */}
            <svg
              className="script-underline-svg"
              viewBox="0 0 150 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 11C42 3 95 3 147 13"
                stroke="#DF2048"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
