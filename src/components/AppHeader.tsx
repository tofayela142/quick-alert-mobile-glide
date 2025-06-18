
import React from 'react';
import { Waves, MapPin, Thermometer, Droplets } from 'lucide-react';

const AppHeader = () => {
  const currentTime = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'short', 
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 rounded-xl mb-6 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full">
            <Waves className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">AquaMonitor Pro</h1>
            <p className="text-blue-100 text-sm">Water Quality System</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 text-blue-100 text-sm mb-1">
            <MapPin className="w-4 h-4" />
            <span>Farm Site A</span>
          </div>
          <div className="text-xs text-blue-200">{currentTime}</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between bg-white bg-opacity-10 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <Thermometer className="w-4 h-4 text-orange-300" />
          <span className="text-sm">Air Temp</span>
          <span className="font-semibold">26°C</span>
        </div>
        <div className="flex items-center space-x-2">
          <Droplets className="w-4 h-4 text-blue-300" />
          <span className="text-sm">Humidity</span>
          <span className="font-semibold">95%</span>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
