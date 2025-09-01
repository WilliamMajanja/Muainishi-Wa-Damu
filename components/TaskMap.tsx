import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { AgentTask, DonationRequest, BloodRequest } from '../types';

// Using string literals for SVG icons to avoid react-dom/server dependency which may not be available.
const bluePinSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#0ea5e9" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" fill="#ffffff"/></svg>`;
const greenPinSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#22c55e" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" fill="#ffffff"/></svg>`;

interface TaskMapProps {
    tasks: AgentTask[];
}

const TaskMap: React.FC<TaskMapProps> = ({ tasks }) => {
    const nairobiPosition: [number, number] = [-1.286389, 36.817223]; // Center of Nairobi

    const createIcon = (svgString: string) => {
        return L.divIcon({
            html: svgString,
            className: 'bg-transparent border-0',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
    };
    
    const pickupIcon = createIcon(bluePinSvg);
    const deliveryIcon = createIcon(greenPinSvg);

    const validTasks = tasks.filter(task => task.details.lat && task.details.lng);
    
    return (
        <MapContainer center={nairobiPosition} zoom={12} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {validTasks.map(task => {
                const { lat, lng } = task.details;
                if (!lat || !lng) return null;

                const position: [number, number] = [lat, lng];
                const isPickup = task.type === 'Pickup';
                const details = task.details as DonationRequest | BloodRequest;

                return (
                    <Marker key={task.id} position={position} icon={isPickup ? pickupIcon : deliveryIcon}>
                        <Popup>
                           <div className="font-sans">
                               <p className={`font-bold text-lg ${isPickup ? 'text-blue-600' : 'text-green-600'}`}>{task.type}</p>
                               <p className="font-semibold text-gray-800">
                                   {isPickup ? (details as DonationRequest).donorName : (details as BloodRequest).hospitalName}
                               </p>
                               <p className="text-sm text-gray-600">
                                   {isPickup ? (details as DonationRequest).location : (details as BloodRequest).hospitalName}
                               </p>
                               <p className="text-sm mt-1">
                                   <span className="font-semibold text-brand-red">{details.bloodType}</span>
                                   {!isPickup && ` - ${(details as BloodRequest).units} Units`}
                               </p>
                           </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default TaskMap;
