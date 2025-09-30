import React from 'react';
import { BarChart3 } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <BarChart3 className="h-8 w-8 text-purple-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security Analytics</h1>
          <p className="text-gray-600">Analyze security metrics and trends</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">Security analytics features will be implemented here.</p>
      </div>
    </div>
  );
};

export default AnalyticsPage;