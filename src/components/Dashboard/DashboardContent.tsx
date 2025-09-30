import React from 'react';
import { Shield, AlertTriangle, Users, BarChart3, TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';

const DashboardContent: React.FC = () => {
  const stats = [
    {
      title: 'Total Incidents',
      value: '247',
      change: '+12% from last month',
      changeType: 'negative' as const,
      icon: AlertTriangle,
      color: 'bg-red-500',
    },
    {
      title: 'Active Threats',
      value: '18',
      change: '-3% from last week',
      changeType: 'positive' as const,
      icon: Shield,
      color: 'bg-orange-500',
    },
    {
      title: 'Protected Users',
      value: '15,432',
      change: '+8% from last month',
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Security Score',
      value: '94%',
      change: '+2% improvement',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'bg-blue-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-gray-600">Monitor your cybersecurity posture and incidents in real-time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Incidents</h3>
          <div className="space-y-4">
            {[
              { id: 1, type: 'Malware', severity: 'High', status: 'Under Investigation' },
              { id: 2, type: 'Phishing', severity: 'Medium', status: 'Resolved' },
              { id: 3, type: 'DDoS', severity: 'High', status: 'Active' },
              { id: 4, type: 'Data Breach', severity: 'Critical', status: 'Contained' },
            ].map((incident) => (
              <div key={incident.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{incident.type}</p>
                  <p className="text-sm text-gray-600">Severity: {incident.severity}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  incident.status === 'Active' ? 'bg-red-100 text-red-800' :
                  incident.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {incident.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Threat Intelligence Feed</h3>
          <div className="space-y-4">
            {[
              { id: 1, threat: 'New ransomware variant detected', time: '2 hours ago', severity: 'High' },
              { id: 2, threat: 'Suspicious network activity', time: '4 hours ago', severity: 'Medium' },
              { id: 3, threat: 'Malicious IP blocked', time: '6 hours ago', severity: 'Low' },
              { id: 4, threat: 'Phishing campaign identified', time: '8 hours ago', severity: 'High' },
            ].map((threat) => (
              <div key={threat.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  threat.severity === 'High' ? 'bg-red-500' :
                  threat.severity === 'Medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{threat.threat}</p>
                  <p className="text-xs text-gray-500">{threat.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;