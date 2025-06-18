
import React from 'react';
import { X, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  sensorData: {
    ph: number;
    do: number;
    turbidity: number;
    temperature: number;
  };
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose, sensorData }) => {
  if (!isOpen) return null;

  const getNotifications = () => {
    const notifications = [];
    
    // pH notifications (ideal range: 6.5-8.5)
    if (sensorData.ph < 6.5) {
      notifications.push({
        type: 'warning',
        title: 'Low pH Level',
        message: 'pH is below optimal range. Consider adding lime to increase pH.',
        icon: AlertTriangle,
        color: 'text-yellow-600'
      });
    } else if (sensorData.ph > 8.5) {
      notifications.push({
        type: 'warning',
        title: 'High pH Level', 
        message: 'pH is above optimal range. Consider water exchange or pH adjustment.',
        icon: AlertTriangle,
        color: 'text-yellow-600'
      });
    }

    // DO notifications (ideal range: 5-8 mg/L)
    if (sensorData.do < 5) {
      notifications.push({
        type: 'critical',
        title: 'Low Dissolved Oxygen',
        message: 'Critical! Increase aeration immediately to prevent fish stress.',
        icon: AlertCircle,
        color: 'text-red-600'
      });
    } else if (sensorData.do > 8) {
      notifications.push({
        type: 'info',
        title: 'High Dissolved Oxygen',
        message: 'DO levels are high but within acceptable range.',
        icon: CheckCircle,
        color: 'text-blue-600'
      });
    }

    // Turbidity notifications (ideal range: 10-40 NTU)
    if (sensorData.turbidity > 40) {
      notifications.push({
        type: 'warning',
        title: 'High Turbidity',
        message: 'Water clarity is poor. Consider filtration or water exchange.',
        icon: AlertTriangle,
        color: 'text-orange-600'
      });
    }

    // Temperature notifications (ideal range: 25-30°C)
    if (sensorData.temperature < 25) {
      notifications.push({
        type: 'info',
        title: 'Low Water Temperature',
        message: 'Temperature is below optimal range for most fish species.',
        icon: AlertCircle,
        color: 'text-blue-600'
      });
    } else if (sensorData.temperature > 30) {
      notifications.push({
        type: 'warning',
        title: 'High Water Temperature',
        message: 'Temperature is high. Increase aeration and consider shading.',
        icon: AlertTriangle,
        color: 'text-red-600'
      });
    }

    if (notifications.length === 0) {
      notifications.push({
        type: 'success',
        title: 'All Parameters Normal',
        message: 'All water quality parameters are within optimal ranges.',
        icon: CheckCircle,
        color: 'text-green-600'
      });
    }

    return notifications;
  };

  const notifications = getNotifications();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {notifications.map((notification, index) => {
            const IconComponent = notification.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-start space-x-3">
                  <IconComponent className={`w-5 h-5 mt-0.5 ${notification.color}`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 text-sm">{notification.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
