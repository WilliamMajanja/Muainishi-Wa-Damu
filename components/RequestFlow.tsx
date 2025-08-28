import React, { useState } from 'react';
import { BloodType, isBloodType } from '../types';
import { submitBloodRequest } from '../services/bloodBankService';

interface RequestFlowProps {
  goHome: () => void;
}

const RequestFlow: React.FC<RequestFlowProps> = ({ goHome }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    hospitalName: '',
    bloodType: BloodType.OPositive,
    units: 1,
    reason: '',
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
      await submitBloodRequest(formData);
      console.log('Blood Request Submitted:', formData);
      setIsSubmitted(true);
    } catch(err) {
      console.error('Failed to submit blood request:', err);
      setError('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-3xl font-bold text-brand-green mb-4">Request Received!</h2>
            <p className="text-gray-600 mb-6">Your request for {formData.units} unit(s) of {formData.bloodType} blood has been submitted. Our logistics team has been notified and you will receive a confirmation shortly. An agent will be dispatched to {formData.hospitalName}.</p>
            <button onClick={goHome} className="bg-brand-red text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors">Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-brand-black mb-2">Request Emergency Blood</h2>
          <p className="text-center text-gray-500 mb-8">For registered hospitals and clinics.</p>
          
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Step 1: Request Details</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">Blood Type Needed</label>
                    <select id="bloodType" value={formData.bloodType} onChange={(e) => {
                        const value = e.target.value;
                        if (isBloodType(value)) {
                            setFormData({ ...formData, bloodType: value });
                        }
                    }} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red bg-white text-gray-900" required>
                      {Object.values(BloodType).map(bt => <option key={bt} value={bt}>{bt}</option>)}
                    </select>
                  </div>
                   <div>
                    <label htmlFor="units" className="block text-sm font-medium text-gray-700">Number of Units</label>
                    <input type="number" id="units" min="1" max="10" value={formData.units} onChange={(e) => setFormData({...formData, units: parseInt(e.target.value, 10)})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red bg-white text-gray-900" required />
                  </div>
                </div>
                <div className="mt-8 text-right">
                  <button type="button" onClick={handleNext} className="bg-brand-red text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors">Next</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Step 2: Delivery & Justification</h3>
                 <div className="space-y-4">
                   <div>
                    <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">Hospital/Clinic Name & Address</label>
                    <input type="text" id="hospitalName" value={formData.hospitalName} onChange={(e) => setFormData({...formData, hospitalName: e.target.value})} placeholder="e.g., Kenya National Hospital, Nairobi" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red bg-white text-gray-900" required />
                  </div>
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Request</label>
                    <textarea id="reason" value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} rows={3} placeholder="e.g., Emergency surgery, patient with anemia" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red bg-white text-gray-900" required />
                  </div>
                </div>
                 {error && <p className="text-sm text-red-500 mt-4 text-center">{error}</p>}
                <div className="mt-8 flex justify-between">
                  <button type="button" onClick={handleBack} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">Back</button>
                  <button type="submit" className="bg-brand-green text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Urgent Request'}
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

export default RequestFlow;