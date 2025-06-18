
import React, { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader';
import ImageSlider from '../components/ImageSlider';
import SensorCard from '../components/SensorCard';
import NotificationPanel from '../components/NotificationPanel';
import DeveloperDetails from '../components/DeveloperDetails';
import { Activity, Wind, Thermometer, Eye, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [sensorData, setSensorData] = useState({
    ph: 7.2,
    do: 6.5,
    turbidity: 25.0,
    temperature: 28.5
  });

  const [showNotifications, setShowNotifications] = useState(false);
  const [showDeveloper, setShowDeveloper] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ph: +(prev.ph + (Math.random() - 0.5) * 0.2).toFixed(1),
        do: +(prev.do + (Math.random() - 0.5) * 0.3).toFixed(1),
        turbidity: +(prev.turbidity + (Math.random() - 0.5) * 2).toFixed(1),
        temperature: +(prev.temperature + (Math.random() - 0.5) * 1).toFixed(1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sensorCards = [
    {
      icon: Activity,
      label: 'pH Level',
      value: sensorData.ph.toString(),
      unit: 'pH',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      delay: 0
    },
    {
      icon: Wind,
      label: 'Dissolved O2',
      value: sensorData.do.toString(),
      unit: 'mg/L',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      delay: 100
    },
    {
      icon: Eye,
      label: 'Turbidity',
      value: sensorData.turbidity.toString(),
      unit: 'NTU',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      delay: 200
    },
    {
      icon: Thermometer,
      label: 'Water Temp',
      value: sensorData.temperature.toString(),
      unit: '°C',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      delay: 300
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50">
      <div className="max-w-md mx-auto px-4 py-6">
        <AppHeader />
        <ImageSlider />
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Water Quality Status</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {sensorCards.map((sensor, index) => (
              <SensorCard
                key={index}
                icon={sensor.icon}
                label={sensor.label}
                value={sensor.value}
                unit={sensor.unit}
                color={sensor.color}
                bgColor={sensor.bgColor}
                delay={sensor.delay}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <Button 
            onClick={() => setShowNotifications(true)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          <Button 
            onClick={() => setShowDeveloper(true)}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
          >
            <User className="w-4 h-4 mr-2" />
            Developer
          </Button>
        </div>

        <NotificationPanel 
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
          sensorData={sensorData}
        />

        <DeveloperDetails 
          isOpen={showDeveloper}
          onClose={() => setShowDeveloper(false)}
        />
      </div>
    </div>
  );
};

export default Index;
