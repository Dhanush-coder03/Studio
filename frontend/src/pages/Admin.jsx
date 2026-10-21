import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminOverview from '../components/admin/AdminOverview';
import AdminImages from '../components/admin/AdminImages';
import AdminServices from '../components/admin/AdminServices';
import AdminGallery from '../components/admin/AdminGallery';
import AdminPackages from '../components/admin/AdminPackages';
import AdminContacts from '../components/admin/AdminContacts';
import AdminSettings from '../components/admin/AdminSettings';
import '../styles/admin.css';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'addImage', 'addService', 'addGallery', 'addPackage', 'addContact'
  const { toastMessage } = useStudio();

  // Quick add dispatcher depending on active tab or explicit modal
  const handleHeaderQuickAdd = () => {
    if (activeTab === 'images') setActiveModal('addImage');
    else if (activeTab === 'services') setActiveModal('addService');
    else if (activeTab === 'gallery') setActiveModal('addGallery');
    else if (activeTab === 'packages') setActiveModal('addPackage');
    else if (activeTab === 'contacts') setActiveModal('addContact');
    else setActiveModal('addImage');
  };

  return (
    <div className="admin-root">
      {/* Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Admin Content Container */}
      <div className="admin-main">
        <AdminHeader
          activeTab={activeTab}
          onQuickAdd={activeTab !== 'settings' ? handleHeaderQuickAdd : null}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="admin-content-body">
          {activeTab === 'overview' && (
            <AdminOverview
              setActiveTab={setActiveTab}
              onOpenModal={(modalName) => setActiveModal(modalName)}
            />
          )}

          {activeTab === 'images' && (
            <AdminImages
              isModalOpen={activeModal === 'addImage'}
              setIsModalOpen={(open) => setActiveModal(open ? 'addImage' : null)}
            />
          )}

          {activeTab === 'services' && (
            <AdminServices
              isModalOpen={activeModal === 'addService'}
              setIsModalOpen={(open) => setActiveModal(open ? 'addService' : null)}
            />
          )}

          {activeTab === 'gallery' && (
            <AdminGallery
              isModalOpen={activeModal === 'addGallery'}
              setIsModalOpen={(open) => setActiveModal(open ? 'addGallery' : null)}
            />
          )}

          {activeTab === 'packages' && (
            <AdminPackages
              isModalOpen={activeModal === 'addPackage'}
              setIsModalOpen={(open) => setActiveModal(open ? 'addPackage' : null)}
            />
          )}

          {activeTab === 'contacts' && (
            <AdminContacts
              isModalOpen={activeModal === 'addContact'}
              setIsModalOpen={(open) => setActiveModal(open ? 'addContact' : null)}
            />
          )}

          {activeTab === 'settings' && <AdminSettings />}
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`admin-toast ${toastMessage.type || 'success'}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--admin-gold)" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{toastMessage.message}</span>
        </div>
      )}
    </div>
  );
}
