import { BloodInventory, AgentTask, DonationRequest, BloodRequest } from '../types';

// Helper to fetch data from our serverless API
const apiFetch = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(`/.netlify/functions/${endpoint}`, options);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API call failed for ${endpoint} with status ${response.status}: ${errorText}`);
    }
    return response.json();
};

export const getBloodInventory = async (): Promise<BloodInventory[]> => {
    console.log('Fetching blood inventory from API...');
    return apiFetch<BloodInventory[]>('get-inventory');
};

export const getAgentTasks = async (): Promise<AgentTask[]> => {
    console.log('Fetching agent tasks from API...');
    return apiFetch<AgentTask[]>('get-agent-tasks');
}

export const getCompletedAgentTasks = async (): Promise<AgentTask[]> => {
    console.log('Fetching completed agent tasks from API...');
    return apiFetch<AgentTask[]>('get-completed-agent-tasks');
}

export const submitDonationRequest = async (formData: Omit<DonationRequest, 'id' | 'status' | 'donationDate'>): Promise<any> => {
    console.log('Submitting donation request to API...');
    return apiFetch('create-donation-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
};

export const submitBloodRequest = async (formData: Omit<BloodRequest, 'id' | 'status'>): Promise<any> => {
    console.log('Submitting blood request to API...');
    return apiFetch('create-blood-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
};
