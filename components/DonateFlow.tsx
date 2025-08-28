import React, { useState } from 'react';
import { BloodType, DonationType } from '../types';
import ThankYouGenerator from './ThankYouGenerator';
import { submitDonationRequest } from '../services/bloodBankService';

interface DonateFlowProps {
  goHome: () => void;
}

const DonateFlow: React.FC<DonateFlowProps> = ({ goHome }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    donorName: '',
    bloodType: BloodType.APositive,
    donationType: DonationType.Center,
    location: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await submitDonationRequest(formData);
      console.log('Donation Submitted:', formData);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to submit donation:', err);
      setError('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <ThankYouGenerator donorName={formData.donorName} goHome={goHome} />;
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-brand-black mb-2">Schedule Your Donation</h2>
          <p className="text-center text-gray-500 mb-8">Thank you for your willingness to save a life.</p>
          
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Step 1: Your Information</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="name" value={formData.donorName} onChange={(e) => setFormData({...formData, donorName: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red" required />
                  </div>
                  <div>
                    <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">Blood Type</label>
                    <select id="bloodType" value={formData.bloodType} onChange={(e) => setFormData({...formData, bloodType: e.target.value as BloodType})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red bg-white text-gray-900" required>
                      {Object.values(BloodType).map(bt => <option key={bt} value={bt}>{bt}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mt-8 text-right">
                  <button type="button" onClick={handleNext} className="bg-brand-red text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors">Next</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Step 2: Donation Type & Location</h3>
                 <div className="space-y-4">
                  <div>
                    <label htmlFor="donationType" className="block text-sm font-medium text-gray-700">How would you like to donate?</label>
                    <select id="donationType" value={formData.donationType} onChange={(e) => setFormData({...formData, donationType: e.target.value as DonationType})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red bg-white text-gray-900" required>
                      {Object.values(DonationType).map(dt => <option key={dt} value={dt}>{dt}</option>)}
                    </select>
                  </div>
                   <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        {formData.donationType === DonationType.Center ? 'Preferred Donation Center' : 'Pickup Address'}
                    </label>
                    <input type="text" id="location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder={formData.donationType === DonationType.Center ? 'e.g., Nairobi Central KNBTS' : 'e.g., 123 Biashara St, Nairobi'} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red" required />
                  </div>
                </div>
                {error && <p className="text-sm text-red-500 mt-4 text-center">{error}</p>}
                <div className="mt-8 flex justify-between">
                  <button type="button" onClick={handleBack} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">Back</button>
                  <button type="submit" className="bg-brand-green text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50" disabled={isSubmitting}>
                    {isSubmitting ? 'Scheduling...' : 'Schedule Donation'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonateFlow;