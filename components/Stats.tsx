
import React from 'react';
import { UsersIcon } from './icons/UsersIcon';
import { HeartIcon } from './icons/HeartIcon';
import { ClockIcon } from './icons/ClockIcon';

const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({ icon, value, label }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 transition-transform transform hover:-translate-y-2">
    <div className="bg-red-100 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-3xl font-bold text-brand-black">{value}</p>
      <p className="text-gray-500">{label}</p>
    </div>
  </div>
);

const Stats: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-black">Our Impact at a Glance</h2>
            <p className="text-gray-600 mt-2">Real-time data from our network across Kenya.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard 
            icon={<HeartIcon className="h-8 w-8 text-brand-red" />}
            value="1,200+"
            label="Lives Saved This Month"
          />
          <StatCard 
            icon={<UsersIcon className="h-8 w-8 text-brand-red" />}
            value="5,000+"
            label="Active Volunteer Donors"
          />
          <StatCard 
            icon={<ClockIcon className="h-8 w-8 text-brand-red" />}
            value="35 Mins"
            label="Average Delivery Time"
          />
        </div>
      </div>
    </div>
  );
};

export default Stats;
