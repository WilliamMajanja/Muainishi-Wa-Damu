import { BloodType, DonationType } from './types';

// Type guards for enums
export function isBloodType(value: any): value is BloodType {
  return typeof value === 'string' && Object.values(BloodType).includes(value as BloodType);
}

export function isDonationType(value: any): value is DonationType {
  return typeof value === 'string' && Object.values(DonationType).includes(value as DonationType);
}

// Validation for Donation Request payload
interface DonationRequestPayload {
  donorName: string;
  bloodType: BloodType;
  donationType: DonationType;
  location: string;
}

export function isValidDonationRequestPayload(data: any): data is DonationRequestPayload {
  return (
    data &&
    typeof data.donorName === 'string' && data.donorName.trim() !== '' &&
    isBloodType(data.bloodType) &&
    isDonationType(data.donationType) &&
    typeof data.location === 'string' && data.location.trim() !== ''
  );
}

// Validation for Blood Request payload
interface BloodRequestPayload {
  hospitalName: string;
  bloodType: BloodType;
  units: number;
  reason: string;
}

export function isValidBloodRequestPayload(data: any): data is BloodRequestPayload {
  return (
    data &&
    typeof data.hospitalName === 'string' && data.hospitalName.trim() !== '' &&
    isBloodType(data.bloodType) &&
    typeof data.units === 'number' && data.units > 0 && Number.isInteger(data.units) &&
    typeof data.reason === 'string' && data.reason.trim() !== ''
  );
}
