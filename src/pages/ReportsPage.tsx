import React from 'react';
import { FileText } from 'lucide-react';

const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <FileText className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security Reports</h1>
          <p className="text-gray-600">Generate and view security reports</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">Security reports features will be implemented here.</p>
      </div>
    </div>
  );
};

export default ReportsPage;