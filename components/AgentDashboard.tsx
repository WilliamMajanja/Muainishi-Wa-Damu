
import React, { useState, useEffect } from 'react';
import { AgentTask, DonationRequest, BloodRequest } from '../types';
import { getAgentTasks, getCompletedAgentTasks } from '../services/bloodBankService';
import { getAgentSession, setAgentSession, clearAgentSession } from '../services/sessionService';
import { MapPinIcon } from './icons/MapPinIcon';
import { BloodDropIcon } from './icons/BloodDropIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import AgentLogin from './AgentLogin';

const TaskCard: React.FC<{ task: AgentTask }> = ({ task }) => {
    const isPickup = task.type === 'Pickup';
    const details = task.details as DonationRequest | BloodRequest;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <div className={`p-4 border-l-4 ${isPickup ? 'border-blue-500' : 'border-green-500'}`}>
                <div className="flex justify-between items-start">
                    <div>
                        <p className={`text-sm font-bold ${isPickup ? 'text-blue-600' : 'text-green-600'}`}>{task.type}</p>
                        <p className="text-lg font-semibold text-gray-800">
                            {isPickup ? (details as DonationRequest).donorName : (details as BloodRequest).hospitalName}
                        </p>
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold text-white bg-gray-700 rounded-full">{task.status}</span>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{isPickup ? (details as DonationRequest).location : (details as BloodRequest).hospitalName}</span>
                    </div>
                    <div className="flex items-center">
                        <BloodDropIcon className="h-4 w-4 mr-2 text-brand-red" />
                        <span>{details.bloodType} - {isPickup ? 'Donation' : `${(details as BloodRequest).units} Units`}</span>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 p-3 flex justify-end space-x-2">
                <button className="text-xs font-bold text-gray-600 hover:text-black transition-colors">Details</button>
                {task.status === 'New' && <button className="text-xs font-bold bg-brand-green text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors">Accept</button>}
                {task.status === 'Accepted' && <button className="text-xs font-bold bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors">In Progress</button>}
            </div>
        </div>
    );
};


const AgentDashboard: React.FC = () => {
    // State is initialized from session storage for persistence
    const [agentName, setAgentName] = useState<string | null>(() => getAgentSession());
    // isAuthenticated is now a derived state, no need for its own useState
    const isAuthenticated = !!agentName;

    const [tasks, setTasks] = useState<AgentTask[]>([]);
    const [completedTasks, setCompletedTasks] = useState<AgentTask[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Only fetch tasks if authenticated
        if (!isAuthenticated) return;

        const fetchAllTasks = async () => {
            setLoading(true);
            setLoadingHistory(true);
            setError(null);
            try {
                const [activeData, completedData] = await Promise.all([
                    getAgentTasks(),
                    getCompletedAgentTasks()
                ]);
                setTasks(activeData);
                setCompletedTasks(completedData);
            } catch (err) {
                console.error("Failed to fetch tasks:", err);
                setError("Could not load agent tasks. Please try again later.");
            } finally {
                setLoading(false);
                setLoadingHistory(false);
            }
        };
        fetchAllTasks();
    }, [isAuthenticated]); // Re-run effect when authentication state changes
    
    const handleLoginSuccess = (name: string) => {
        setAgentSession(name); // Persist session
        setAgentName(name);
    };

    const handleLogout = () => {
        clearAgentSession(); // Clear session
        setAgentName(null);
        // Clear task data to prevent flashing on next login
        setTasks([]);
        setCompletedTasks([]);
    };

    if (!isAuthenticated) {
        return (
            <div className="bg-gray-100 min-h-screen py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <AgentLogin onLoginSuccess={handleLoginSuccess} />
                </div>
            </div>
        );
    }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Agent Dashboard</h2>
                    <p className="text-gray-500">Welcome back, {agentName}. Here are your tasks for today.</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-brand-red text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    aria-label="Log out"
                >
                    Log Out
                </button>
            </div>

            {loading ? (
                <p>Loading tasks...</p>
            ) : error ? (
                <div className="text-center py-16 bg-white rounded-lg shadow-md mb-12 text-red-500">
                    <h3 className="text-xl font-semibold">{error}</h3>
                </div>
            ) : tasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-md mb-12">
                    <h3 className="text-xl font-semibold text-gray-700">No active tasks available.</h3>
                    <p className="text-gray-500 mt-2">Check back later for new assignments.</p>
                </div>
            )}

            {/* Completed Tasks History Section */}
            <div className="mt-16">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <CheckCircleIcon className="h-7 w-7 mr-3 text-brand-green" />
                    Completed Task History
                </h3>
                {loadingHistory ? (
                    <p>Loading history...</p>
                ) : completedTasks.length > 0 ? (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task ID</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Completed</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {completedTasks.map((task) => {
                                        const detailsSummary = task.type === 'Pickup'
                                            ? `${(task.details as DonationRequest).donorName} (${task.details.bloodType})`
                                            : `${(task.details as BloodRequest).hospitalName} (${task.details.bloodType}, ${(task.details as BloodRequest).units} units)`;

                                        return (
                                            <tr key={task.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        task.type === 'Pickup' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                                    }`}>
                                                        {task.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{detailsSummary}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {task.completedDate ? new Date(task.completedDate).toLocaleDateString('en-KE') : 'N/A'}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                     <div className="text-center py-16 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-700">No completed tasks.</h3>
                        <p className="text-gray-500 mt-2">Your completed tasks will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default AgentDashboard;