import React from 'react';
import { BloodDropIcon } from './icons/BloodDropIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <BloodDropIcon className="h-8 w-8 text-brand-red" />
            <span className="ml-2 text-xl font-bold">Muainishi wa Damu</span>
          </div>
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} Muainishi wa Damu. All rights reserved.</p>
            <p className="text-xs text-gray-400">Saving lives together in Kenya.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;