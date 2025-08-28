import { AgentTask, DonationType, DonationRequest, BloodRequest, BloodType } from './utils/types';

const MOCK_DONATION: DonationRequest = {
    id: 'DONATE123',
    donorName: 'Jane Doe',
    bloodType: BloodType.APositive,
    donationType: DonationType.Pickup,
    location: '123 Biashara St, Nairobi',
    status: 'Scheduled',
    donationDate: new Date()
}

const MOCK_REQUEST: BloodRequest = {
    id: 'REQ456',
    hospitalName: 'Nairobi Hospital',
    bloodType: BloodType.ONegative,
    units: 2,
    reason: 'Emergency Surgery',
    status: 'Approved'
}

const MOCK_TASKS: AgentTask[] = [
    { id: 'TASK001', type: 'Pickup', details: MOCK_DONATION, status: 'New' },
    { id: 'TASK002', type: 'Delivery', details: MOCK_REQUEST, status: 'New' },
    { id: 'TASK003', type: 'Pickup', details: { ...MOCK_DONATION, id: 'DONATE124', donorName: 'John Smith', bloodType: BloodType.BPositive, location: 'Westlands Office Park'}, status: 'Accepted' },
];


export const handler = async () => {
    // In a real application, query your database for tasks where status is not 'Completed'.
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(MOCK_TASKS),
    };
};
