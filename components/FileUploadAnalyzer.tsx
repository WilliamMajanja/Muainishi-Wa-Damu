import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloudIcon } from './icons/UploadCloudIcon';
import { BeakerIcon } from './icons/BeakerIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { BloodWorkAnalysis, analyzeBloodWorkFile } from '../services/geminiService';

const FileUploadAnalyzer: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [analysisResult, setAnalysisResult] = useState<BloodWorkAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            setError('');
            setAnalysisResult(null);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'text/csv': ['.csv'], 'text/plain': ['.txt'] },
        maxFiles: 1,
    });

    const handleAnalyze = async () => {
        if (!file) {
            setError('Please select a file first.');
            return;
        }

        setIsLoading(true);
        setError('');
        setAnalysisResult(null);

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const fileContent = event.target?.result as string;
                if (!fileContent) {
                    throw new Error("File is empty or could not be read.");
                }
                const result = await analyzeBloodWorkFile(fileContent);
                setAnalysisResult(result);
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'An unknown error occurred during analysis.');
            } finally {
                setIsLoading(false);
            }
        };
        reader.onerror = () => {
            setError('Failed to read the file.');
            setIsLoading(false);
        };
        reader.readAsText(file);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <BeakerIcon className="h-6 w-6 mr-2 text-brand-red" />
                Automated Report Analyzer
            </h3>
            <p className="text-sm text-gray-500 mb-6">Upload a CSV or TXT file with blood work data (e.g., BloodType,Units) for an AI-powered summary and insights.</p>

            <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-brand-red bg-red-50' : 'border-gray-300 hover:border-brand-red'}`}>
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center">
                    <UploadCloudIcon className="h-12 w-12 text-gray-400 mb-2" />
                    {isDragActive ? (
                        <p className="text-brand-red font-semibold">Drop the file here ...</p>
                    ) : (
                        <p className="text-gray-500">Drag & drop a file here, or click to select</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">Supported formats: .csv, .txt</p>
                </div>
            </div>

            {file && (
                <div className="mt-4 text-center font-semibold text-gray-700">
                    Selected File: {file.name}
                </div>
            )}

            <div className="mt-6">
                <button
                    onClick={handleAnalyze}
                    disabled={isLoading || !file}
                    className="w-full bg-brand-red text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing Report...
                        </>
                    ) : (
                        'Analyze Report'
                    )}
                </button>
            </div>
            
            {error && (
                <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
                    <p className="font-bold">Analysis Error</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {analysisResult && (
                <div className="mt-8 animate-fade-in">
                    <h4 className="text-2xl font-bold text-brand-black mb-4">AI Analysis Complete</h4>
                    
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
                        <div className="bg-gray-100 p-3 rounded-lg"><p className="text-sm text-gray-600">Total Units</p><p className="text-2xl font-bold text-brand-red">{analysisResult.summary.totalUnits}</p></div>
                        <div className="bg-gray-100 p-3 rounded-lg"><p className="text-sm text-gray-600">Blood Types</p><p className="text-2xl font-bold text-brand-red">{analysisResult.summary.bloodTypesFound}</p></div>
                        <div className="bg-gray-100 p-3 rounded-lg"><p className="text-sm text-gray-600">Most Common</p><p className="text-2xl font-bold text-brand-red">{analysisResult.summary.mostCommonType}</p></div>
                        <div className="bg-gray-100 p-3 rounded-lg"><p className="text-sm text-gray-600">Rarest</p><p className="text-2xl font-bold text-brand-red">{analysisResult.summary.rarestType}</p></div>
                    </div>

                    {/* Breakdown and Insights */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-3">
                            <h5 className="font-semibold text-gray-800 mb-2">Inventory Breakdown</h5>
                            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
                                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {analysisResult.breakdown.map((item) => (
                                            <tr key={item.bloodType}>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.bloodType}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-right font-mono">{item.units}</td>
                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-right font-mono">{item.percentage}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="lg:col-span-2 bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <h5 className="font-semibold text-amber-900 flex items-center mb-2">
                                <SparklesIcon className="h-5 w-5 mr-2 text-amber-500" />
                                Key Insights
                            </h5>
                            <ul className="space-y-2 list-disc list-inside text-sm text-amber-800">
                                {analysisResult.insights.map((insight, index) => (
                                    <li key={index}>{insight}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUploadAnalyzer;
