import React from 'react';
import { AlertTriangle } from 'lucide-react';

const IncidentsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="h-8 w-8 text-red-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Incident Management</h1>
          <p className="text-gray-600">Manage and track security incidents</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">Incident management features will be implemented here.</p>
      </div>
    </div>
  );
};

export default IncidentsPage;