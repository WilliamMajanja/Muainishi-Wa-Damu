import { AgentTask, BloodRequest, BloodType, DonationRequest, DonationType } from './utils/types';

const MOCK_REQUEST: BloodRequest = {
    id: 'REQ456',
    hospitalName: 'Nairobi Hospital',
    bloodType: BloodType.ONegative,
    units: 2,
    reason: 'Emergency Surgery',
    status: 'Approved'
}

const MOCK_DONATION: DonationRequest = {
    id: 'DONATE123',
    donorName: 'Jane Doe',
    bloodType: BloodType.APositive,
    donationType: DonationType.Pickup,
    location: '123 Biashara St, Nairobi',
    status: 'Scheduled',
    donationDate: new Date()
}

const MOCK_COMPLETED_TASKS: AgentTask[] = [
    {
        id: 'TASKC01',
        type: 'Delivery',
        details: { ...MOCK_REQUEST, id: 'REQ789', hospitalName: 'Aga Khan Hospital', units: 3, bloodType: BloodType.APositive },
        status: 'Completed',
        completedDate: new Date('2024-05-20T10:00:00Z')
    },
    {
        id: 'TASKC02',
        type: 'Pickup',
        details: { ...MOCK_DONATION, id: 'DONATE456', donorName: 'Peter Kamau', bloodType: BloodType.OPositive, location: 'Gigiri' },
        status: 'Completed',
        completedDate: new Date('2024-05-19T14:30:00Z')
    },
     {
        id: 'TASKC03',
        type: 'Delivery',
        details: { ...MOCK_REQUEST, id: 'REQ101', hospitalName: 'Kenyatta National Hospital', units: 1, bloodType: BloodType.ABNegative },
        status: 'Completed',
        // FIX: Changed `new date` to `new Date` to correct the typo.
        completedDate: new Date('2024-05-18T09:15:00Z')
    }
];

export const handler = async () => {
    // In a real application, query your database for tasks where status is 'Completed'.
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(MOCK_COMPLETED_TASKS),
    };
};