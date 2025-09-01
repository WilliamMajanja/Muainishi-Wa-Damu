import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ShieldIcon } from './icons/ShieldIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { UploadCloudIcon } from './icons/UploadCloudIcon';
import { WhiteCellAnalysisResult, analyzeWhiteCellFile } from '../services/geminiService';

const WhiteCellAnalyzer: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [analysisResult, setAnalysisResult] = useState<WhiteCellAnalysisResult | null>(null);
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
                const result = await analyzeWhiteCellFile(fileContent);
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
        <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <ShieldIcon className="h-6 w-6 mr-2 text-brand-red" />
                White Cell (Leukocyte) Marker Analysis
            </h3>
            <p className="text-sm text-gray-500 mb-6 flex-grow">
                Upload a CSV or TXT file with a white cell differential count for a detailed AI-powered breakdown.
            </p>

             <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-brand-red bg-red-50' : 'border-gray-300 hover:border-brand-red'}`}>
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center">
                    <UploadCloudIcon className="h-10 w-10 text-gray-400 mb-2" />
                    {isDragActive ? (
                        <p className="text-brand-red font-semibold">Drop the file here...</p>
                    ) : (
                        <p className="text-gray-500">Drag & drop a file here, or click</p>
                    )}
                </div>
            </div>

            {file && (
                <div className="mt-4 text-center text-sm font-semibold text-gray-700">
                     Selected File: <span className="font-normal">{file.name}</span>
                </div>
            )}

            <div className="mt-6">
                 <button
                    onClick={handleAnalyze}
                    disabled={isLoading || !file}
                    className="w-full bg-brand-red text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
                        'Analyze White Cells'
                    )}
                </button>
            </div>
            
             {error && (
                <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center text-sm">
                    {error}
                </div>
            )}
            
            {analysisResult && (
                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6 animate-fade-in">
                    <h4 className="text-xl font-bold text-brand-black mb-4">White Cell Analysis Complete</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-center">
                        <div className="bg-white p-3 rounded-lg border"><p className="text-xs text-gray-500">Total WBC Count</p><p className="text-lg font-bold text-brand-red">{analysisResult.summary.totalWBC}</p></div>
                        <div className="bg-white p-3 rounded-lg border"><p className="text-xs text-gray-500">Dominant Cell Type</p><p className="text-lg font-bold text-brand-red">{analysisResult.summary.dominantCellType}</p></div>
                    </div>
                     <div className="mb-4">
                        <h5 className="font-semibold text-gray-800 mb-2">Differential Breakdown</h5>
                        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 text-sm">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cell Type</th>
                                        <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                                        <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Abs. Count</th>
                                        <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Range</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {analysisResult.breakdown.map((item) => (
                                        <tr key={item.cellType}>
                                            <td className="px-3 py-2 whitespace-nowrap font-medium text-gray-900">{item.cellType}</td>
                                            <td className="px-3 py-2 whitespace-nowrap text-right font-mono">{item.percentage}</td>
                                            <td className="px-3 py-2 whitespace-nowrap text-right font-mono">{item.absoluteCount}</td>
                                            <td className="px-3 py-2 whitespace-nowrap text-right font-mono text-gray-500">{item.normalRange}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                     <div className="mt-4 pt-4 border-t border-gray-200">
                        <h5 className="font-semibold text-gray-800 flex items-center mb-2">
                           <SparklesIcon className="h-5 w-5 mr-2 text-amber-500" />
                            AI Insights
                        </h5>
                        <ul className="space-y-2 list-disc list-inside text-sm text-gray-700">
                            {analysisResult.insights.map((insight, index) => (
                                <li key={index}>{insight}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WhiteCellAnalyzer;