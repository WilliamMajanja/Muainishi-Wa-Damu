import React, { useState, useEffect } from 'react';
import { BeakerIcon } from './icons/BeakerIcon';
import { SparklesIcon } from './icons/SparklesIcon';

type BloodAnalysis = {
    antigens: string;
    antibodies: string;
    canDonateTo: string;
    canReceiveFrom: string;
    insight: string;
};

const analysisData: Record<string, BloodAnalysis> = {
    'A+': { antigens: 'A, Rh', antibodies: 'Anti-B', canDonateTo: 'A+, AB+', canReceiveFrom: 'A+, A-, O+, O-', insight: 'A common blood type. A+ individuals can receive blood from a large pool of donors.' },
    'A-': { antigens: 'A', antibodies: 'Anti-B', canDonateTo: 'A+, A-, AB+, AB-', canReceiveFrom: 'A-, O-', insight: 'Can be given to both A and AB patients, making it quite versatile.' },
    'B+': { antigens: 'B, Rh', antibodies: 'Anti-A', canDonateTo: 'B+, AB+', canReceiveFrom: 'B+, B-, O+, O-', insight: 'More common in some Asian populations compared to Western populations.' },
    'B-': { antigens: 'B', antibodies: 'Anti-A', canDonateTo: 'B+, B-, AB+, AB-', canReceiveFrom: 'B-, O-', insight: 'A relatively rare and valuable blood type.' },
    'AB+': { antigens: 'A, B, Rh', antibodies: 'None', canDonateTo: 'AB+', canReceiveFrom: 'All blood types', insight: 'Known as the "universal recipient" because they can receive red blood cells from any ABO/Rh type.' },
    'AB-': { antigens: 'A, B', antibodies: 'None', canDonateTo: 'AB+, AB-', canReceiveFrom: 'A-, B-, AB-, O-', insight: 'The rarest blood type. AB- plasma is universal and can be given to anyone.' },
    'O+': { antigens: 'Rh', antibodies: 'Anti-A, Anti-B', canDonateTo: 'A+, B+, AB+, O+', canReceiveFrom: 'O+, O-', insight: 'The most common blood type, making it critical for routine transfusions.' },
    'O-': { antigens: 'None', antibodies: 'Anti-A, Anti-B', canDonateTo: 'All blood types', canReceiveFrom: 'O-', insight: 'Known as the "universal donor". O- blood is used in emergencies when the patient\'s blood type is unknown.' },
    'Rh-null (Golden Blood)': { antigens: 'None (Lacks all 61 Rh antigens)', antibodies: 'Various (Requires expert consultation)', canDonateTo: 'Universal for all rare blood types with negative Rh factor, including other Rh-null individuals.', canReceiveFrom: 'Only other Rh-null donors.', insight: 'Known as "Golden Blood" for its immense life-saving potential. Fewer than 50 people worldwide have it.' },
    'Hh (Bombay Blood Group)': { antigens: 'None (Lacks H antigen)', antibodies: 'Anti-A, Anti-B, Anti-H', canDonateTo: 'Any ABO type, but reserved for other Hh donors due to rarity.', canReceiveFrom: 'Only other Hh donors.', insight: 'This type can be mistaken for Type O. Without the H antigen, the A and B antigens cannot be formed.' }
};

const BloodAnalyzer: React.FC = () => {
    const [selectedSample, setSelectedSample] = useState<string>('A+');
    const [analysisResult, setAnalysisResult] = useState<BloodAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleAnalyze = () => {
        setIsLoading(true);
        setAnalysisResult(null);
        setTimeout(() => {
            setAnalysisResult(analysisData[selectedSample]);
            setIsLoading(false);
        }, 1000); // Simulate analysis time
    };

    // Automatically run analysis for the default sample on initial component load.
    useEffect(() => {
        handleAnalyze();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <BeakerIcon className="h-6 w-6 mr-2 text-brand-red" />
                Simulated Blood Sample Analysis
            </h3>
            <p className="text-sm text-gray-500 mb-6">Select a blood type to see its characteristics. This tool demonstrates the basic principles of blood compatibility.</p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="w-full sm:w-auto flex-grow">
                    <label htmlFor="bloodSample" className="sr-only">Select Blood Sample</label>
                    <select
                        id="bloodSample"
                        value={selectedSample}
                        onChange={(e) => setSelectedSample(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red bg-white text-gray-900"
                    >
                        {Object.keys(analysisData).map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="w-full sm:w-auto bg-brand-red text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                        </>
                    ) : (
                        'Analyze Sample'
                    )}
                </button>
            </div>
            
            {(isLoading && !analysisResult) && (
                 <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 animate-pulse">
                     <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-2/5"></div>
                            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                        </div>
                         <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-2/5"></div>
                            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                        </div>
                         <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-2/5"></div>
                            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                        </div>
                         <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-2/5"></div>
                            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                        </div>
                     </div>
                     <div className="mt-6 pt-4 border-t border-gray-200">
                         <div className="h-5 bg-gray-300 rounded w-1/4 mb-2"></div>
                         <div className="h-4 bg-gray-200 rounded w-full"></div>
                     </div>
                 </div>
            )}
            
            {analysisResult && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 animate-fade-in">
                    <h4 className="text-2xl font-bold text-brand-black mb-4">Analysis for: <span className="text-brand-red">{selectedSample}</span></h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                        <div><strong className="text-gray-600 block">Antigens Present:</strong> <span className="font-mono">{analysisResult.antigens}</span></div>
                        <div><strong className="text-gray-600 block">Antibodies in Plasma:</strong> <span className="font-mono">{analysisResult.antibodies}</span></div>
                        <div className="text-green-700"><strong className="block">Can Donate To:</strong> <span className="font-semibold">{analysisResult.canDonateTo}</span></div>
                        <div className="text-blue-700"><strong className="block">Can Receive From:</strong> <span className="font-semibold">{analysisResult.canReceiveFrom}</span></div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <h5 className="font-semibold text-gray-800 flex items-center mb-2">
                           <SparklesIcon className="h-5 w-5 mr-2 text-amber-500" />
                            Key Insight
                        </h5>
                        <p className="text-gray-600 text-sm">{analysisResult.insight}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BloodAnalyzer;
