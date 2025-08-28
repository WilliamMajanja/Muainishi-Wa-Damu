
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BloodInventory as BloodInventoryType } from '../types';
import { getBloodInventory } from '../services/bloodBankService';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
        <p className="font-bold">{`${label}`}</p>
        <p className="text-brand-red">{`Units: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const BloodInventory: React.FC = () => {
    const [inventory, setInventory] = useState<BloodInventoryType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInventory = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getBloodInventory();
                const sortedData = data.sort((a, b) => a.bloodType.localeCompare(b.bloodType));
                setInventory(sortedData);
            } catch (err) {
                console.error("Failed to fetch blood inventory:", err);
                setError("Could not load inventory data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchInventory();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-20">
                <p>Loading Inventory...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-500">
                <p>{error}</p>
            </div>
        )
    }

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-black">Live Blood Bank Inventory</h2>
            <p className="text-gray-600 mt-2">Help us balance the scales. Some blood types are critically low.</p>
        </div>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart
              data={inventory}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bloodType" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="units" name="Available Units" fill="#D32F2F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-12">
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">Inventory Details</h3>
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Blood Type
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Available Units
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {inventory.map((item) => (
                                <tr key={item.bloodType} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {item.bloodType}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right font-mono">
                                        {item.units}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default BloodInventory;
