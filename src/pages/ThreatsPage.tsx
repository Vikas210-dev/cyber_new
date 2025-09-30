import React from 'react';
import { Shield } from 'lucide-react';

const ThreatsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Shield className="h-8 w-8 text-orange-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Threat Intelligence</h1>
          <p className="text-gray-600">Monitor and analyze security threats</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">Threat intelligence features will be implemented here.</p>
      </div>
    </div>
  );
};

export default ThreatsPage;