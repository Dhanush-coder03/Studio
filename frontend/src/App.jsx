import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import './styles/animations.css';
import './styles/navbar.css';
import './styles/lens.css';
import './styles/hero.css';
import './styles/cinematic-showcase.css';
import './styles/about-us.css';
import './styles/gallery-reel.css';
import './styles/camera-details.css';
import './styles/footer.css';
import './styles/services-packages-contact.css';
import './styles/admin.css';
import { StudioProvider, useStudio } from './context/StudioContext';
import Home from './pages/Home';
import Admin from './pages/Admin';

function MainAppRouter() {
  const { currentView, navigateTo } = useStudio();

  return (
    <>
      {currentView === 'admin' ? <Admin /> : <Home />}

      {/* Floating Mode Switcher Button for Instant Pair Testing */}
      <button
        type="button"
        className="floating-mode-pill"
        onClick={() => navigateTo(currentView === 'admin' ? 'website' : 'admin')}
        title={currentView === 'admin' ? 'Switch to Live Website' : 'Open Studio Admin Panel'}
      >
        <span className="floating-mode-dot" style={{ background: currentView === 'admin' ? '#E91E4D' : '#B9822E' }} />
        <span>
          {currentView === 'admin' ? '← View Live Website' : '⚙️ Studio Admin Panel'}
        </span>
      </button>
    </>
  );
}

function App() {
  return (
    <StudioProvider>
      <MainAppRouter />
    </StudioProvider>
  );
}

export default App;
