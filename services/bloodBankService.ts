import { BloodInventory, AgentTask, DonationRequest, BloodRequest, BloodType, DonationType } from '../types';

// --- MOCK DATA from serverless functions ---

// from get-inventory.ts
const MOCK_INVENTORY: BloodInventory[] = [
    { bloodType: BloodType.APositive, units: 35 },
    { bloodType: BloodType.ANegative, units: 15 },
    { bloodType: BloodType.BPositive, units: 25 },
    { bloodType: BloodType.BNegative, units: 8 },
    { bloodType: BloodType.ABPositive, units: 5 },
    { bloodType: BloodType.ABNegative, units: 2 },
    { bloodType: BloodType.OPositive, units: 45 },
    { bloodType: BloodType.ONegative, units: 12 },
];

// from get-agent-tasks.ts & get-completed-agent-tasks.ts
const BASE_MOCK_DONATION: DonationRequest = {
    id: 'DONATE123',
    donorName: 'Jane Doe',
    bloodType: BloodType.APositive,
    donationType: DonationType.Pickup,
    location: '123 Biashara St, Nairobi',
    status: 'Scheduled',
    donationDate: new Date()
}

const BASE_MOCK_REQUEST: BloodRequest = {
    id: 'REQ456',
    hospitalName: 'Nairobi Hospital',
    bloodType: BloodType.ONegative,
    units: 2,
    reason: 'Emergency Surgery',
    status: 'Approved'
}

// from get-agent-tasks.ts
const MOCK_TASKS: AgentTask[] = [
    { id: 'TASK001', type: 'Pickup', details: BASE_MOCK_DONATION, status: 'New' },
    { id: 'TASK002', type: 'Delivery', details: BASE_MOCK_REQUEST, status: 'New' },
    { id: 'TASK003', type: 'Pickup', details: { ...BASE_MOCK_DONATION, id: 'DONATE124', donorName: 'John Smith', bloodType: BloodType.BPositive, location: 'Westlands Office Park'}, status: 'Accepted' },
];

// from get-completed-agent-tasks.ts
const MOCK_COMPLETED_TASKS: AgentTask[] = [
    {
        id: 'TASKC01',
        type: 'Delivery',
        details: { ...BASE_MOCK_REQUEST, id: 'REQ789', hospitalName: 'Aga Khan Hospital', units: 3, bloodType: BloodType.APositive },
        status: 'Completed',
        completedDate: new Date('2024-05-20T10:00:00Z')
    },
    {
        id: 'TASKC02',
        type: 'Pickup',
        details: { ...BASE_MOCK_DONATION, id: 'DONATE456', donorName: 'Peter Kamau', bloodType: BloodType.OPositive, location: 'Gigiri' },
        status: 'Completed',
        completedDate: new Date('2024-05-19T14:30:00Z')
    },
     {
        id: 'TASKC03',
        type: 'Delivery',
        details: { ...BASE_MOCK_REQUEST, id: 'REQ101', hospitalName: 'Kenyatta National Hospital', units: 1, bloodType: BloodType.ABNegative },
        status: 'Completed',
        completedDate: new Date('2024-05-18T09:15:00Z')
    }
];

// Helper to simulate API calls with a delay
const mockApiCall = <T>(data: T, delay = 300): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

export const getBloodInventory = async (): Promise<BloodInventory[]> => {
    console.log('Fetching blood inventory from mock service...');
    return mockApiCall(MOCK_INVENTORY);
};

export const getAgentTasks = async (): Promise<AgentTask[]> => {
    console.log('Fetching agent tasks from mock service...');
    return mockApiCall(MOCK_TASKS);
}

export const getCompletedAgentTasks = async (): Promise<AgentTask[]> => {
    console.log('Fetching completed agent tasks from mock service...');
    return mockApiCall(MOCK_COMPLETED_TASKS);
}

export const submitDonationRequest = async (formData: Omit<DonationRequest, 'id' | 'status' | 'donationDate'>): Promise<any> => {
    console.log('Submitting donation request to mock service...', formData);
    // In a real app, this would add a new task to the list
    return mockApiCall({ message: 'Donation request received successfully!', data: formData });
};

export const submitBloodRequest = async (formData: Omit<BloodRequest, 'id' | 'status'>): Promise<any> => {
    console.log('Submitting blood request to mock service...', formData);
    // In a real app, this would add a new task to the list
    return mockApiCall({ message: 'Blood request received successfully!', data: formData });
};
