import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BigCinematicShowcase from '../components/BigCinematicShowcase';
import ReelModal from '../components/ReelModal';
import BookModal from '../components/BookModal';
import AboutUs from '../components/AboutUs';
import GalleryReel from '../components/GalleryReel';
import CameraDetails from '../components/CameraDetails';
import Footer from '../components/Footer';

export default function Home() {
  const [reelModalOpen, setReelModalOpen] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);

  return (
    <div className="lensify-app-root">
      {/* Top Luxury Navigation */}
      <Navbar onBookClick={() => setBookModalOpen(true)} />

      {/* Main Home Flow */}
      <main>
        {/* Fullscreen Home Hero */}
        <Hero
          onBookClick={() => setBookModalOpen(true)}
          onReelClick={() => setReelModalOpen(true)}
        />

        {/* Scroll-down Big Cinematic Image & 5 Portfolio Category Cards */}
        <BigCinematicShowcase
          onBookClick={() => setBookModalOpen(true)}
        />

        {/* About Us / Our Approach Section */}
        <AboutUs />

        {/* Cinematic Film Reel Gallery */}
        <GalleryReel />

        {/* Camera Details Section */}
        <CameraDetails />
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
        onClose={() => setBookModalOpen(false)}
      />
    </div>
  );
}
