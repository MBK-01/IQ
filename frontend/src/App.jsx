import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { LMSModule } from './components/lms/LMSModule';
import { InternshipModule } from './components/internship/InternshipModule';
import { EventModule } from './components/events/EventModule';
import { CareerModule } from './components/career/CareerModule';
import { CommunityModule } from './components/community/CommunityModule';
import { AIModule } from './components/ai/AIModule';
import { AdminModule } from './components/admin/AdminModule';
import { ProfileModule } from './components/profile/ProfileModule';
import { AuthModal } from './components/auth/AuthModal';

export const AppContent = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white">
      <div>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          {activeTab === 'landing' && <LandingPage />}
          {activeTab === 'lms' && <LMSModule />}
          {activeTab === 'internships' && <InternshipModule />}
          {activeTab === 'events' && <EventModule />}
          {activeTab === 'career' && <CareerModule />}
          {activeTab === 'community' && <CommunityModule />}
          {activeTab === 'ai_suite' && <AIModule />}
          {activeTab === 'admin' && <AdminModule />}
          {activeTab === 'my_profile' && <ProfileModule />}
        </main>
      </div>

      <Footer />
      <AuthModal />
    </div>
  );
};

export default AppContent;
