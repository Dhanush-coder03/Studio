import React from 'react';
import { useStudio } from '../../context/StudioContext';

export default function AdminHeader({ activeTab, onQuickAdd, setSidebarOpen }) {
  const { navigateTo } = useStudio();

  const tabTitles = {
    overview: { title: 'Dashboard Overview', sub: 'Velu Photography Studio analytics & quick controls' },
    images: { title: 'Media & Asset Library', sub: 'Upload, manage, and categorize photography showcase assets' },
    services: { title: 'Studio Services', sub: 'Manage photography packages, descriptions, and highlights' },
    gallery: { title: 'Gallery Showcase', sub: 'Curate client portfolio albums and cinematic reels' },
    packages: { title: 'Pricing & Packages', sub: 'Manage wedding tiers, pricing deliverables, and badges' },
    contacts: { title: 'Contacts & Inquiries', sub: 'Incoming booking leads and studio address information' },
    settings: { title: 'Studio Configuration', sub: 'Demo data backup, export, and system configuration' },
  };

  const currentInfo = tabTitles[activeTab] || { title: 'Admin Suite', sub: 'Studio Management' };

  return (
    <header className="admin-header">
      {/* Mobile Toggle */}
      <div className="d-flex align-items-center gap-3">
        <button
          type="button"
          className="btn-action-icon d-lg-none"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle Sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div className="admin-header-title-box">
          <h1>{currentInfo.title}</h1>
          <p className="d-none d-sm-block">{currentInfo.sub}</p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="admin-header-actions">
        {/* Status Indicator */}
        <div className="admin-status-indicator d-none d-md-flex">
          <span className="admin-status-dot"></span>
          <span>Studio Online</span>
        </div>

        {/* Quick Add Button if applicable */}
        {onQuickAdd && (
          <button
            type="button"
            className="btn-header-action"
            onClick={onQuickAdd}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add New</span>
          </button>
        )}

        {/* View Website Button */}
        <button
          type="button"
          className="btn-header-ghost d-none d-sm-flex"
          onClick={() => navigateTo('website')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          <span>Live Site</span>
        </button>
      </div>
    </header>
  );
}
