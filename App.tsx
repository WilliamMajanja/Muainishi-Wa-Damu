
import React, { useState, useCallback } from 'react';
import { AppView } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import BloodInventory from './components/BloodInventory';
import DonateFlow from './components/DonateFlow';
import RequestFlow from './components/RequestFlow';
import AgentDashboard from './components/AgentDashboard';
import Footer from './components/Footer';
import HaematologyInsights from './components/HaematologyInsights';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.Home);

  const navigateTo = useCallback((view: AppView) => {
    setCurrentView(view);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case AppView.Donate:
        return <DonateFlow goHome={() => navigateTo(AppView.Home)} />;
      case AppView.Request:
        return <RequestFlow goHome={() => navigateTo(AppView.Home)} />;
      case AppView.AgentDashboard:
        return <AgentDashboard />;
      case AppView.Home:
      default:
        return (
          <>
            <Hero navigateTo={navigateTo} />
            <Stats />
            <BloodInventory />
            <HaematologyInsights />
          </>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans text-gray-800">
      <Header navigateTo={navigateTo} currentView={currentView} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;