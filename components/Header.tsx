import React from 'react';
import { AppView } from '../types';
import { BloodDropIcon } from './icons/BloodDropIcon';

interface HeaderProps {
  navigateTo: (view: AppView) => void;
  currentView: AppView;
}

const Header: React.FC<HeaderProps> = ({ navigateTo, currentView }) => {
  const navLinkClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300";
  const activeLinkClasses = "bg-brand-red text-white";
  const inactiveLinkClasses = "text-gray-700 hover:bg-red-100 hover:text-brand-red";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigateTo(AppView.Home)}
          >
            <BloodDropIcon className="h-8 w-8 text-brand-red" />
            <h1 className="ml-2 text-2xl font-bold text-brand-black">Muainishi wa Damu</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => navigateTo(AppView.Home)} 
              className={`${navLinkClasses} ${currentView === AppView.Home ? activeLinkClasses : inactiveLinkClasses}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo(AppView.Donate)} 
              className={`${navLinkClasses} ${currentView === AppView.Donate ? activeLinkClasses : inactiveLinkClasses}`}
            >
              Donate Blood
            </button>
            <button 
              onClick={() => navigateTo(AppView.Request)} 
              className={`${navLinkClasses} ${currentView === AppView.Request ? activeLinkClasses : inactiveLinkClasses}`}
            >
              Request Blood
            </button>
            <button 
              onClick={() => navigateTo(AppView.AgentDashboard)} 
              className={`${navLinkClasses} ${currentView === AppView.AgentDashboard ? activeLinkClasses : inactiveLinkClasses}`}
            >
              Agent Login
            </button>
          </nav>
           <div className="md:hidden">
             {/* Mobile menu button could be added here */}
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;