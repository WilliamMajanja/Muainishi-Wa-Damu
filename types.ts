
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

export function isBloodType(value: string): value is BloodType {
  return Object.values(BloodType).includes(value as BloodType);
}

export interface BloodInventory {
  bloodType: BloodType;
  units: number;
}

export enum DonationType {
    Center = 'At a Donation Center',
    Pickup = 'Agent Pickup'
}

export function isDonationType(value: string): value is DonationType {
    return Object.values(DonationType).includes(value as DonationType);
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

export enum AppView {
    Home,
    Donate,
    Request,
    AgentDashboard
}