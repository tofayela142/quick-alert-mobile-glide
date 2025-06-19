
import React, { useState, useEffect } from 'react';
import { Waves, MapPin, Thermometer, Droplets } from 'lucide-react';

const AppHeader = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [airTemp] = useState(26); // This would come from weather API
  const [humidity] = useState(78); // This would come from weather API
  const [location] = useState('Noakhali, Chittagong, Bangladesh'); // Updated location

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 rounded-xl mb-6 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-16">
            <img
              src="https://seeklogo.com/images/N/noakhali-science-and-technology-university-logo-6626023A42-seeklogo.com.png"
              alt="NSTU Logo"
              className="w-16"
            />
        </div>
          <div>
            <h1 className="text-lg font-bold">Smart Fish Farm Monitoring</h1>
            <p className="text-blue-100 text-sm">CSTE Department - NSTU</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 text-blue-100 text-sm mb-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="text-xs text-blue-200">{currentTime}</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between bg-white bg-opacity-10 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <Thermometer className="w-4 h-4 text-orange-300" />
          <span className="text-sm">Air Temp</span>
          <span className="font-semibold">{airTemp}°C</span>
        </div>
        <div className="flex items-center space-x-2">
          <Droplets className="w-4 h-4 text-blue-300" />
          <span className="text-sm">Humidity</span>
          <span className="font-semibold">{humidity}%</span>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
