import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { TrialModal } from './components/common/TrialModal';

// All 27 Application Views
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CoachesPage } from './pages/CoachesPage';
import { CoachDetailPage } from './pages/CoachDetailPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LessonPlayerPage } from './pages/LessonPlayerPage';
import { PuzzlesPage } from './pages/PuzzlesPage';
import { PlayPage } from './pages/PlayPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { PricingPage } from './pages/PricingPage';
import { FreeTrialPage } from './pages/FreeTrialPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { ParentDashboardPage } from './pages/ParentDashboardPage';
import { CoachDashboardPage } from './pages/CoachDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ClassroomPage } from './pages/ClassroomPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { CommunityPage } from './pages/CommunityPage';

import { updatePageSeo } from './services/seo';

// Helper to parse URL hash into path and param
function parseHash(): { path: string; param?: string } {
  if (typeof window === 'undefined') return { path: 'home', param: undefined };
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw) return { path: 'home', param: undefined };
  const [pathPart, queryPart] = raw.split('?');
  return { path: pathPart || 'home', param: queryPart || undefined };
}

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => parseHash().path);
  const [routeParam, setRouteParam] = useState<string | undefined>(() => parseHash().param);
  const [trialModalOpen, setTrialModalOpen] = useState<boolean>(false);

  // Sync with browser back/forward buttons and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const { path, param } = parseHash();
      setCurrentPath(path);
      setRouteParam(param);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update document title, meta descriptions, and OpenGraph dynamically
  useEffect(() => {
    updatePageSeo(currentPath, routeParam);
  }, [currentPath, routeParam]);

  const handleNavigate = (path: string, param?: string) => {
    setCurrentPath(path);
    setRouteParam(param);
    const newHash = param ? `#/${path}?${param}` : (path === 'home' ? '#/' : `#/${path}`);
    if (window.location.hash !== newHash) {
      window.history.pushState(null, '', newHash);
    }
    updatePageSeo(path, param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveView = () => {
    switch (currentPath) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onOpenTrialModal={() => setTrialModalOpen(true)} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} onOpenTrialModal={() => setTrialModalOpen(true)} />;
      case 'coaches':
        return <CoachesPage onNavigate={handleNavigate} onOpenTrialModal={() => setTrialModalOpen(true)} />;
      case 'coach-profile':
        return <CoachDetailPage coachId={routeParam} onNavigate={handleNavigate} onOpenTrialModal={() => setTrialModalOpen(true)} />;
      case 'courses':
        return <CoursesPage onNavigate={handleNavigate} />;
      case 'course-detail':
        return <CourseDetailPage courseSlug={routeParam} onNavigate={handleNavigate} onOpenTrialModal={() => setTrialModalOpen(true)} />;
      case 'lesson-player':
      case 'lessons':
        return <LessonPlayerPage courseId={routeParam} onNavigate={handleNavigate} />;
      case 'puzzles':
        return <PuzzlesPage />;
      case 'play':
        return <PlayPage />;
      case 'analysis':
        return <AnalysisPage />;
      case 'pricing':
        return <PricingPage onOpenTrialModal={() => setTrialModalOpen(true)} />;
      case 'free-trial':
        return <FreeTrialPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FaqPage />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'signup':
        return <SignupPage onNavigate={handleNavigate} />;
      case 'student-dashboard':
        return <StudentDashboardPage onNavigate={handleNavigate} onOpenTrialModal={() => setTrialModalOpen(true)} />;
      case 'parent-dashboard':
        return <ParentDashboardPage onNavigate={handleNavigate} onOpenTrialModal={() => setTrialModalOpen(true)} />;
      case 'coach-dashboard':
        return <CoachDashboardPage onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return <AdminDashboardPage />;
      case 'classroom':
        return <ClassroomPage />;
      case 'payments':
        return <PaymentsPage onNavigate={handleNavigate} />;
      case 'subscription':
        return <SubscriptionPage onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      case 'notifications':
        return <NotificationsPage onNavigate={handleNavigate} />;
      case 'community':
        return <CommunityPage />;
      default:
        return <HomePage onNavigate={handleNavigate} onOpenTrialModal={() => setTrialModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0e14] text-slate-100 transition-colors duration-200">
      
      {/* Top Navbar with Logo, Persona Switcher & Trial CTA */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenTrialModal={() => setTrialModalOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* Comprehensive Academic Footer */}
      <Footer
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenTrialModal={() => setTrialModalOpen(true)}
      />

      {/* Global Free Trial Modal */}
      <TrialModal
        isOpen={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
        onBookingSuccess={() => {}}
      />
    </div>
  );
}

export default App;
