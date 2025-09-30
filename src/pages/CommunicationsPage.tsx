import React from 'react';
import { MessageSquare } from 'lucide-react';

const CommunicationsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <MessageSquare className="h-8 w-8 text-indigo-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Communications</h1>
          <p className="text-gray-600">Manage security communications and alerts</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">Communications features will be implemented here.</p>
      </div>
    </div>
  );
};

export default CommunicationsPage;