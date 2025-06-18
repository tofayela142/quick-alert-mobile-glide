
import React, { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader';
import ImageSlider from '../components/ImageSlider';
import SensorCard from '../components/SensorCard';
import { Activity, Droplets, Thermometer, Wind, Beaker, Waves } from 'lucide-react';

const Index = () => {
  const [sensorData, setSensorData] = useState({
    ph: 8.20,
    tds: 668.00,
    temperature: 32.00,
    do: 2.00,
    nh3: 1.67,
    salinity: 24.5
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ph: +(prev.ph + (Math.random() - 0.5) * 0.1).toFixed(2),
        tds: +(prev.tds + (Math.random() - 0.5) * 10).toFixed(2),
        temperature: +(prev.temperature + (Math.random() - 0.5) * 2).toFixed(2),
        do: +(prev.do + (Math.random() - 0.5) * 0.3).toFixed(2),
        nh3: +(prev.nh3 + (Math.random() - 0.5) * 0.1).toFixed(2),
        salinity: +(prev.salinity + (Math.random() - 0.5) * 1).toFixed(1)
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
      icon: Waves,
      label: 'TDS',
      value: sensorData.tds.toString(),
      unit: 'mg/L',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      delay: 100
    },
    {
      icon: Thermometer,
      label: 'Temperature',
      value: sensorData.temperature.toString(),
      unit: '°C',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      delay: 200
    },
    {
      icon: Wind,
      label: 'Dissolved O2',
      value: sensorData.do.toString(),
      unit: 'ppm',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      delay: 300
    },
    {
      icon: Beaker,
      label: 'Ammonia (NH3)',
      value: sensorData.nh3.toString(),
      unit: 'mg/L',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
      delay: 400
    },
    {
      icon: Droplets,
      label: 'Salinity',
      value: sensorData.salinity.toString(),
      unit: 'ppt',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      delay: 500
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

        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sensor Connection</span>
              <span className="text-green-600 font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Data Sync</span>
              <span className="text-blue-600 font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Update</span>
              <span className="text-gray-600 font-medium">Just now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
