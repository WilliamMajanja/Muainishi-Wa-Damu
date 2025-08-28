
import React from 'react';
import { AppView } from '../types';

interface HeroProps {
  navigateTo: (view: AppView) => void;
}

const Hero: React.FC<HeroProps> = ({ navigateTo }) => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center py-12 md:py-24">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-extrabold text-brand-black leading-tight mb-4">
              Donate Blood, <br/>
              <span className="text-brand-red">Save a Life.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              Join a community of heroes. Your donation is a lifeline in an emergency. Schedule a donation or request blood for a patient in need through our streamlined platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => navigateTo(AppView.Donate)}
                className="bg-brand-red text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-red-700 transition-transform transform hover:scale-105 shadow-lg"
              >
                Become a Donor
              </button>
              <button
                onClick={() => navigateTo(AppView.Request)}
                className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-300 transition-transform transform hover:scale-105"
              >
                Request Blood
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://picsum.photos/seed/kenyahero/800/600" 
              alt="Smiling Kenyan nurse with a blood donor" 
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;