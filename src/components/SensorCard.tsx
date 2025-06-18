
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SensorCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit: string;
  color: string;
  bgColor: string;
  delay?: number;
}

const SensorCard: React.FC<SensorCardProps> = ({
  icon: Icon,
  label,
  value,
  unit,
  color,
  bgColor,
  delay = 0
}) => {
  return (
    <div 
      className={`bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in border border-gray-100 hover:scale-105`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`${bgColor} p-3 rounded-full mb-3 shadow-md`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className={`text-2xl font-bold ${color} mb-1`}>
          {value}
        </div>
        <div className="text-xs text-gray-500 mb-1">{unit}</div>
        <div className="text-sm font-medium text-gray-700">{label}</div>
      </div>
    </div>
  );
};

export default SensorCard;
