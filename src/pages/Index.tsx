import React, { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader';
import ImageSlider from '../components/ImageSlider';
import SensorCard from '../components/SensorCard';
import NotificationPanel from '../components/NotificationPanel';
import DeveloperDetails from '../components/DeveloperDetails';
import { Activity, Wind, Thermometer, Eye, Bell, User, Droplets, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, query, orderByKey, limitToLast } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  databaseURL: "https://sensormonitor-3c8db-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Index = () => {
  const [sensorData, setSensorData] = useState({
    ph: 7.2,
    do: 6.5,
    turbidity: 25.0,
    temperature: 28.5,
    tds: 150.0,
    nh3: 0.02
  });

  const [showNotifications, setShowNotifications] = useState(false);
  const [showDeveloper, setShowDeveloper] = useState(false);

  // Fetch real-time data from Firebase
  useEffect(() => {
    console.log('Setting up Firebase listener for sensorData...');
    
    // Listen to the sensorData collection and get the latest entry
    const sensorDataRef = ref(database, 'sensorData');
    const latestDataQuery = query(sensorDataRef, orderByKey(), limitToLast(1));

    const unsubscribe = onValue(latestDataQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log('Raw Firebase data received:', data);
        
        // Get the latest entry (there should be only one due to limitToLast(1))
        const latestEntry = Object.values(data)[0] as any;
        console.log('Latest sensor data:', latestEntry);
        
        if (latestEntry) {
          setSensorData(prev => ({
            ...prev,
            ph: latestEntry.ph || prev.ph,
            do: latestEntry.do || prev.do,
            turbidity: latestEntry.turbidity || prev.turbidity,
            temperature: latestEntry.temp || prev.temperature, // Note: Python uses 'temp', React uses 'temperature'
            // TDS and NH3 will be added when available in your Python script
            tds: latestEntry.tds || prev.tds,
            nh3: latestEntry.nh3 || prev.nh3
          }));
        }
      }
    }, (error) => {
      console.error('Firebase read error:', error);
    });

    // Cleanup function
    return () => {
      console.log('Cleaning up Firebase listener...');
      unsubscribe();
    };
  }, []);

  const sensorCards = [
    {
      icon: Activity,
      label: 'pH Level',
      value: sensorData.ph.toFixed(1),
      unit: 'pH',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      delay: 0
    },
    {
      icon: Wind,
      label: 'Dissolved O2',
      value: sensorData.do.toFixed(1),
      unit: 'mg/L',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      delay: 100
    },
    {
      icon: Eye,
      label: 'Turbidity',
      value: sensorData.turbidity.toFixed(1),
      unit: 'NTU',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      delay: 200
    },
    {
      icon: Thermometer,
      label: 'Water Temp',
      value: sensorData.temperature.toFixed(1),
      unit: '°C',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      delay: 300
    },
    {
      icon: Droplets,
      label: 'TDS',
      value: sensorData.tds.toFixed(0),
      unit: 'ppm',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100',
      delay: 400
    },
    {
      icon: Zap,
      label: 'NH3',
      value: sensorData.nh3.toFixed(3),
      unit: 'mg/L',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      delay: 500
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50">
      <div className="max-w-md mx-auto px-4 py-6">

        <div className="text-center w-full mb-2 w-20">
          <img src="https://seeklogo.com/images/N/noakhali-science-and-technology-university-logo-6626023A42-seeklogo.com.png" alt="NSTU logo" class="w-" />
        </div>
        
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
          <button 
            onClick={() => setShowNotifications(true)}
            className="flex-1 relative bg-gradient-to-b from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95 border-b-4 border-red-800 hover:border-red-900"
          >
            <div className="flex items-center justify-center">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-20 rounded-xl pointer-events-none"></div>
          </button>
          <button 
            onClick={() => setShowDeveloper(true)}
            className="flex-1 relative bg-gradient-to-b from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95 border-b-4 border-gray-900 hover:border-black"
          >
            <div className="flex items-center justify-center">
              <User className="w-4 h-4 mr-2" />
              Developer
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-20 rounded-xl pointer-events-none"></div>
          </button>
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
