import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { SparklesIcon } from './icons/SparklesIcon';
import { InfoIcon } from './icons/InfoIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { BloodDropIcon } from './icons/BloodDropIcon';
import BloodAnalyzer from './BloodAnalyzer';
import PlateletAnalyzer from './PlateletAnalyzer';
import WhiteCellAnalyzer from './WhiteCellAnalyzer';
import FileUploadAnalyzer from './FileUploadAnalyzer';

// Data based on general global statistics for a representative infographic
// Updated colors to better reflect rarity (darker red = rarer)
const bloodRarityData = [
  { type: 'O+', percentage: 38, color: '#EF9A9A' },
  { type: 'A+', percentage: 34, color: '#EF9A9A' },
  { type: 'B+', percentage: 9, color: '#E57373' },
  { type: 'O-', percentage: 7, color: '#E57373' },
  { type: 'A-', percentage: 6, color: '#E57373' },
  { type: 'AB+', percentage: 3, color: '#EF5350' },
  { type: 'B-', percentage: 2, color: '#EF5350' },
  { type: 'AB-', percentage: 1, color: '#D32F2F' },
];

const scarcityIndexData = [
    { component: 'O- Blood', density: '7% Prevalence', scarcity: 'Very High', note: 'Universal donor for red cells, always in demand.'},
    { component: 'AB Plasma', density: '4% Prevalence (AB+ & AB-)', scarcity: 'Very High', note: 'Universal donor for plasma.'},
    { component: 'Platelets', density: 'All types', scarcity: 'High', note: 'Short shelf life (5 days), constant need.' },
    { component: 'B- Blood', density: '2% Prevalence', scarcity: 'High', note: 'Needed by B and AB patients.' },
    { component: 'O+ Blood', density: '38% Prevalence', scarcity: 'Medium', note: 'High demand due to being most common type.'},
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
        <p className="font-bold">{`Blood Type: ${label}`}</p>
        <p style={{ color: payload[0].payload.color, fontWeight: 'bold' }}>{`Prevalence: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const HaematologyInsights: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-black">Haematology Insights</h2>
            <p className="text-gray-600 mt-2">Understanding the value and rarity of every drop.</p>
        </div>

        {/* AI-Powered File Upload Analyzer */}
        <div className="mb-12">
            <FileUploadAnalyzer />
        </div>

        {/* Simulated Analysis Tools Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="lg:col-span-2">
                <BloodAnalyzer />
            </div>
            <PlateletAnalyzer />
            <WhiteCellAnalyzer />
        </div>


        {/* Blood Rarity Infographic */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <InfoIcon className="h-6 w-6 mr-2 text-brand-red" />
                Blood Type Prevalence
            </h3>
            <p className="text-sm text-gray-500 mb-6">This chart shows the approximate percentage of each blood type in the population. The demand for common types is high, while rare types present unique challenges.</p>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={bloodRarityData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="type" />
                        <YAxis unit="%" />
                        <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(211, 47, 47, 0.1)'}} />
                        <Bar dataKey="percentage" name="Prevalence">
                            {bloodRarityData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                            <LabelList 
                                dataKey="percentage" 
                                position="top" 
                                formatter={(value: number) => `${value}%`} 
                                style={{ fill: '#374151', fontWeight: 500 }} 
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
             <div className="flex justify-center items-center space-x-6 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: '#EF9A9A' }}></div>
                    <span>Common</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: '#E57373' }}></div>
                    <span>Less Common</span>
                </div>
                 <div className="flex items-center">
                    <div className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: '#D32F2F' }}></div>
                    <span>Rare</span>
                </div>
            </div>
        </div>

        {/* Rare & Golden Blood Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-yellow-300 to-amber-500 p-6 rounded-lg shadow-lg text-white flex flex-col">
                <h3 className="text-xl font-semibold text-yellow-900 mb-4 flex items-center">
                    <SparklesIcon className="h-6 w-6 mr-2 text-yellow-900" />
                    The "Golden Blood" (Rh-null)
                </h3>
                <p className="text-sm text-yellow-800 font-medium flex-grow">
                    This is the rarest blood type in the world, with fewer than 50 identified individuals globally. 
                    It lacks all 61 antigens in the Rh system. Its unique properties make it a universal donor for anyone with a rare blood type within the Rh system, but finding a match for an Rh-null individual is incredibly difficult.
                </p>
                <div className="mt-4 text-right">
                    <span className="text-xs font-bold text-yellow-900 bg-yellow-200 px-3 py-1 rounded-full">PHENOMENALLY RARE</span>
                </div>
            </div>
             <div className="bg-gradient-to-br from-rose-400 to-red-600 p-6 rounded-lg shadow-lg text-white flex flex-col">
                <h3 className="text-xl font-semibold text-rose-100 mb-4 flex items-center">
                    <BloodDropIcon className="h-6 w-6 mr-2 text-rose-100" />
                    The Bombay Blood Group (Hh)
                </h3>
                <p className="text-sm text-white font-medium flex-grow">
                   Found in about 1 in 250,000 people globally, but more common in some parts of South Asia (1 in 10,000). Individuals with this group lack the H antigen, which is a precursor to A and B antigens. They can only receive blood from other Bombay blood group donors.
                </p>
                <div className="mt-4 text-right">
                     <span className="text-xs font-bold text-red-800 bg-rose-200 px-3 py-1 rounded-full">EXTREMELY RARE</span>
                </div>
            </div>
        </div>

        {/* Scarcity vs Density Index */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
             <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <TrendingUpIcon className="h-6 w-6 mr-2 text-brand-red" />
                Scarcity & Demand Index
            </h3>
            <p className="text-sm text-gray-500 mb-6">This index highlights components in critical need based on prevalence, demand, and shelf life.</p>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Population Density</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Scarcity</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {scarcityIndexData.map((item) => (
                            <tr key={item.component}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.component}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.density}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        item.scarcity.includes('Very High') ? 'bg-red-100 text-red-800' : 
                                        item.scarcity.includes('High') ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {item.scarcity}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.note}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HaematologyInsights;