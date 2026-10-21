import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import BigCinematicShowcase from '../components/BigCinematicShowcase';
import PackagesSection from '../components/PackagesSection';
import AboutUs from '../components/AboutUs';
import GalleryReel from '../components/GalleryReel';
import CameraDetails from '../components/CameraDetails';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ReelModal from '../components/ReelModal';
import BookModal from '../components/BookModal';

export default function Home() {
  const [reelModalOpen, setReelModalOpen] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [selectedBookingItem, setSelectedBookingItem] = useState('');

  const handleOpenBook = (item = '') => {
    setSelectedBookingItem(item);
    setBookModalOpen(true);
  };

  return (
    <div className="lensify-app-root">
      {/* Top Luxury Navigation */}
      <Navbar onBookClick={() => handleOpenBook()} />

      {/* Main Home Flow */}
      <main>
        {/* Fullscreen Home Hero */}
        <Hero
          onBookClick={() => handleOpenBook()}
          onReelClick={() => setReelModalOpen(true)}
        />

        {/* Dynamic Studio Services Section */}
        <ServicesSection onBookClick={(srvTitle) => handleOpenBook(srvTitle)} />

        {/* Scroll-down Big Cinematic Image & Portfolio Category Cards */}
        <BigCinematicShowcase
          onBookClick={() => handleOpenBook()}
        />

        {/* Dynamic Studio Packages Section */}
        <PackagesSection onBookClick={(pkgName) => handleOpenBook(pkgName)} />

        {/* About Us / Our Approach Section */}
        <AboutUs />

        {/* Cinematic Film Reel Gallery */}
        <GalleryReel />

        {/* Camera Details Section */}
        <CameraDetails />

        {/* Studio Contact Information & Consultation Form */}
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Cinematic Showreel Modal */}
      <ReelModal
        isOpen={reelModalOpen}
        onClose={() => setReelModalOpen(false)}
      />

      {/* Luxury Wedding Consultation Booking Modal */}
      <BookModal
        isOpen={bookModalOpen}
        initialPackage={selectedBookingItem}
        onClose={() => {
          setBookModalOpen(false);
          setSelectedBookingItem('');
        }}
      />
    </div>
  );
}

