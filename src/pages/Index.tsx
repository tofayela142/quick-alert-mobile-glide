
import React, { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader';
import ImageSlider from '../components/ImageSlider';
import SensorCard from '../components/SensorCard';
import NotificationPanel from '../components/NotificationPanel';
import DeveloperDetails from '../components/DeveloperDetails';
import { Activity, Wind, Thermometer, Eye, Bell, User, Droplets, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

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
    console.log('Setting up Firebase listeners...');
    
    const phRef = ref(database, 'sensors/ph');
    const doRef = ref(database, 'sensors/do');
    const turbidityRef = ref(database, 'sensors/turbidity');
    const temperatureRef = ref(database, 'sensors/temperature');
    const tdsRef = ref(database, 'sensors/tds');
    const nh3Ref = ref(database, 'sensors/nh3');

    const unsubscribes = [];

    // Listen to pH changes
    const phUnsubscribe = onValue(phRef, (snapshot) => {
      const value = snapshot.val();
      if (value !== null) {
        console.log('pH data received:', value);
        setSensorData(prev => ({ ...prev, ph: parseFloat(value) }));
      }
    });
    unsubscribes.push(phUnsubscribe);

    // Listen to DO changes
    const doUnsubscribe = onValue(doRef, (snapshot) => {
      const value = snapshot.val();
      if (value !== null) {
        console.log('DO data received:', value);
        setSensorData(prev => ({ ...prev, do: parseFloat(value) }));
      }
    });
    unsubscribes.push(doUnsubscribe);

    // Listen to turbidity changes
    const turbidityUnsubscribe = onValue(turbidityRef, (snapshot) => {
      const value = snapshot.val();
      if (value !== null) {
        console.log('Turbidity data received:', value);
        setSensorData(prev => ({ ...prev, turbidity: parseFloat(value) }));
      }
    });
    unsubscribes.push(turbidityUnsubscribe);

    // Listen to temperature changes
    const temperatureUnsubscribe = onValue(temperatureRef, (snapshot) => {
      const value = snapshot.val();
      if (value !== null) {
        console.log('Temperature data received:', value);
        setSensorData(prev => ({ ...prev, temperature: parseFloat(value) }));
      }
    });
    unsubscribes.push(temperatureUnsubscribe);

    // Listen to TDS changes
    const tdsUnsubscribe = onValue(tdsRef, (snapshot) => {
      const value = snapshot.val();
      if (value !== null) {
        console.log('TDS data received:', value);
        setSensorData(prev => ({ ...prev, tds: parseFloat(value) }));
      }
    });
    unsubscribes.push(tdsUnsubscribe);

    // Listen to NH3 changes
    const nh3Unsubscribe = onValue(nh3Ref, (snapshot) => {
      const value = snapshot.val();
      if (value !== null) {
        console.log('NH3 data received:', value);
        setSensorData(prev => ({ ...prev, nh3: parseFloat(value) }));
      }
    });
    unsubscribes.push(nh3Unsubscribe);

    // Cleanup function
    return () => {
      console.log('Cleaning up Firebase listeners...');
      unsubscribes.forEach(unsubscribe => unsubscribe());
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
