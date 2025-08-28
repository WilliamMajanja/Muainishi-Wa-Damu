// This file is a duplicate of the frontend types.ts to be used in the serverless function environment.
// In a monorepo setup, this would be a shared package.

export enum BloodType {
  APositive = 'A+',
  ANegative = 'A-',
  BPositive = 'B+',
  BNegative = 'B-',
  ABPositive = 'AB+',
  ABNegative = 'AB-',
  OPositive = 'O+',
  ONegative = 'O-',
}

export interface BloodInventory {
  bloodType: BloodType;
  units: number;
}

export enum DonationType {
    Center = 'At a Donation Center',
    Pickup = 'Agent Pickup'
}

export interface DonationRequest {
    id: string;
    donorName: string;
    bloodType: BloodType;
    donationType: DonationType;
    location: string;
    status: 'Pending' | 'Scheduled' | 'Completed' | 'Cancelled';
    agentId?: string;
    donationDate: Date;
}

export interface BloodRequest {
    id: string;
    hospitalName: string;
    bloodType: BloodType;
    units: number;
    reason: string;
    status: 'Pending' | 'Approved' | 'In Transit' | 'Fulfilled';
    agentId?: string;
}

export interface AgentTask {
    id: string;
    type: 'Pickup' | 'Delivery';
    details: DonationRequest | BloodRequest;
    status: 'New' | 'Accepted' | 'In Progress' | 'Completed';
    completedDate?: Date;
}
