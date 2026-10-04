import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { AnalyzePage } from './pages/AnalyzePage';
import { ExplainPage } from './pages/ExplainPage';
import { ClaimCheckerPage } from './pages/ClaimCheckerPage';
import { GrievancePage } from './pages/GrievancePage';
import { DashboardPage } from './pages/DashboardPage';
import { Language } from './types';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [language, setLanguage] = useState<Language>('en');
  const [selectedDemoId, setSelectedDemoId] = useState<string | undefined>(undefined);

  const handleNavigate = (tab: string, demoId?: string) => {
    setSelectedDemoId(demoId);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Global Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => handleNavigate(tab)}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Content View */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage onNavigate={handleNavigate} language={language} />
        )}

        {currentTab === 'analyze' && (
          <AnalyzePage
            initialDemoId={selectedDemoId}
            language={language}
            onNavigateTab={handleNavigate}
          />
        )}

        {currentTab === 'explain' && (
          <ExplainPage language={language} />
        )}

        {currentTab === 'claim' && (
          <ClaimCheckerPage language={language} />
        )}

        {currentTab === 'grievance' && (
          <GrievancePage language={language} />
        )}

        {currentTab === 'dashboard' && (
          <DashboardPage language={language} />
        )}
      </main>

      {/* Global Footer */}
      <Footer language={language} />
    </div>
  );
};

export default App;
