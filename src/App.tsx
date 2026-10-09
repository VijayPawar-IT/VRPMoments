import { useEffect } from 'react';
import { BirthdayProvider, useBirthday } from './context/BirthdayContext';
import { TopNavigation } from './components/common/TopNavigation';
import { LandingPage } from './components/landing/LandingPage';
import { CreatorWizard } from './components/creator/CreatorWizard';
import { BirthdayViewer } from './components/viewer/BirthdayViewer';
import { AppRoute } from './types/birthday';

function AppContent() {
  const { route, setRoute } = useBirthday();

  // Listen for browser popstate (back/forward button)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get('mode') as AppRoute;
      const path = window.location.pathname;

      if (mode === 'view' || path === '/view') {
        setRoute('view');
      } else if (mode === 'create' || path === '/create') {
        setRoute('create');
      } else if (mode === 'preview' || path === '/preview') {
        setRoute('preview');
      } else {
        setRoute('landing');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setRoute]);

  return (
    <div className="min-h-screen bg-[#18040B] text-[#FAF5EE]">
      {/* TopNavigation is shown on Landing and Creator; Viewer has its own immersive header */}
      {(route === 'landing' || route === 'create') && <TopNavigation />}

      {route === 'landing' && <LandingPage />}
      {route === 'create' && <CreatorWizard />}
      {route === 'preview' && <BirthdayViewer isPreview={true} />}
      {route === 'view' && <BirthdayViewer isPreview={false} />}
    </div>
  );
}

export default function App() {
  return (
    <BirthdayProvider>
      <AppContent />
    </BirthdayProvider>
  );
}
