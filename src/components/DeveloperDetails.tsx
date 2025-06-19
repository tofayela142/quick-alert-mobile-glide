import React from 'react';
import { X, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeveloperDetailsProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeveloperDetails: React.FC<DeveloperDetailsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Developer Details</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-center mb-6">
          <img
            src="https://raw.githubusercontent.com/tofayela142/StudentManagementSyatem/8139c92aefafc042021e4dc873d92b656bb4e091/2021%20April%20August%20Vaccination%20day.jpg"
            alt="Sheikh Torikul Islam"
            className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
          />
          <h4 className="text-xl font-bold text-gray-800">Sheikh Torikul Islam</h4>
          <p className="text-sm text-gray-600">
            Android Developer | IoT Project Specialist | Researcher
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-700">torikul0116@student.nstu.edu.bd</span>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Phone className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-700">+8801779738534</span>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="w-4 h-4 text-red-600" />
            <span className="text-sm text-gray-700">Noakhali, Bangladesh</span>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Github className="w-4 h-4 text-gray-800" />
            <span className="text-sm text-gray-700">github.com/sheikhtorikul</span>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Linkedin className="w-4 h-4 text-blue-800" />
            <span className="text-sm text-gray-700">linkedin.com/in/sheikhtorikul</span>
          </div>
        </div>

        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            Specialized in Android and IoT systems for smart aquaculture.
            Experienced in ML-powered monitoring and student automation solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDetails;
