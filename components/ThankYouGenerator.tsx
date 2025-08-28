
import React, { useState, useEffect } from 'react';
import { generateThankYouNote } from '../services/geminiService';

interface ThankYouGeneratorProps {
  donorName: string;
  goHome: () => void;
}

const ThankYouGenerator: React.FC<ThankYouGeneratorProps> = ({ donorName, goHome }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      if (!donorName) {
        setLoading(false);
        setMessage("Thank you for your incredible gift! Your donation can help save up to three lives. You are a true hero.");
        return;
      }
      try {
        setLoading(true);
        setError('');
        const generatedMessage = await generateThankYouNote(donorName);
        setMessage(generatedMessage);
      } catch (err) {
        console.error("Error generating thank you message:", err);
        setError('Could not generate a personalized message at this time.');
        // Fallback message
        setMessage(`Dear ${donorName}, thank you for your incredible gift! Your donation can help save up to three lives. You are a true hero.`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donorName]);

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-brand-green mb-4">Thank You, Hero!</h2>
          
          {loading && (
            <div className="animate-pulse space-y-3 my-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-full mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
            </div>
          )}

          {!loading && (
            <p className="text-gray-700 my-6 text-lg leading-relaxed">
              {message}
            </p>
          )}

          {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
          
          <button 
            onClick={goHome} 
            className="bg-brand-red text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-colors mt-4"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouGenerator;
