import React from 'react';
import { Settings } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Settings className="h-8 w-8 text-gray-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure system settings and preferences</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">Settings features will be implemented here.</p>
      </div>
    </div>
  );
};

export default SettingsPage;