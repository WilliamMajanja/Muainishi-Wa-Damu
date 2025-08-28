import { BloodInventory, BloodType } from './utils/types';

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

export const handler = async () => {
  // In a real application, you would query your Neon database here.
  // Example: const { rows } = await db.query('SELECT * FROM blood_inventory');
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Allow requests from any origin
    },
    body: JSON.stringify(MOCK_INVENTORY),
  };
};
