import React from 'react';

const features = [
  {
    id: 'creative-team',
    title: 'Creative Team',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'premium-quality',
    title: 'Premium Quality',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    id: 'custom-packages',
    title: 'Custom Packages',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
  {
    id: 'on-time-delivery',
    title: 'On-Time Delivery',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="13" r="8" />
        <polyline points="12 9 12 13 14 15" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="10" y1="2" x2="14" y2="2" />
      </svg>
    ),
  },
];

export default function FeatureBar() {
  return (
    <footer className="hero-bottom-feature-bar" aria-label="Studio Highlights">
      <div className="container">
        <div className="feature-bar-grid">
          {features.map((item) => (
            <div key={item.id} className="feature-column" tabIndex={0}>
              <div className="feature-circle-badge">
                {item.icon}
              </div>
              <h3 className="feature-column-title">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
