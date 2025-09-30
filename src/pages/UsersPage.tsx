import React, { useState } from 'react';
import { Users, Plus, Search, Filter, Eye, CreditCard as Edit, Trash2, Shield, Star, User } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  loginId: string;
  role: 'Agent' | 'Supervisor' | 'Admin';
  status: 'Online' | 'Offline';
  callerId: string;
  group: string;
  availability: 'Available' | 'Busy' | 'Away' | 'Offline';
  lastActive: string;
  agentCode: string;
}

const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedGroup, setSelectedGroup] = useState('All Groups');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  // Mock data matching the image
  const agents: Agent[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      loginId: 'rajesh.kumar',
      role: 'Agent',
      status: 'Online',
      callerId: '1001',
      group: 'Fraud Team',
      availability: 'Available',
      lastActive: '2 mins ago',
      agentCode: 'AG001'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      loginId: 'priya.sharma',
      role: 'Supervisor',
      status: 'Online',
      callerId: '2001',
      group: 'Fraud Team',
      availability: 'Busy',
      lastActive: 'Just now',
      agentCode: 'G002'
    },
    {
      id: '3',
      name: 'Amit Patel',
      loginId: 'amit.patel',
      role: 'Agent',
      status: 'Offline',
      callerId: '1003',
      group: 'Phishing Team',
      availability: 'Offline',
      lastActive: '1 hour ago',
      agentCode: 'G003'
    },
    {
      id: '4',
      name: 'Sunita Singh',
      loginId: 'sunita.singh',
      role: 'Agent',
      status: 'Offline',
      callerId: '1004',
      group: 'Identity Team',
      availability: 'Offline',
      lastActive: '3 days ago',
      agentCode: 'G004'
    },
    {
      id: '5',
      name: 'Vikram Gupta',
      loginId: 'vikram.gupta',
      role: 'Admin',
      status: 'Online',
      callerId: '3001',
      group: 'Management',
      availability: 'Away',
      lastActive: '15 mins ago',
      agentCode: 'G005'
    }
  ];

  const activeAgents = agents.filter(agent => agent.status === 'Online').length;
  const totalAgents = agents.length;

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Agent':
        return <User className="h-4 w-4 text-blue-600" />;
      case 'Supervisor':
        return <Star className="h-4 w-4 text-yellow-600" />;
      case 'Admin':
        return <Shield className="h-4 w-4 text-red-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Online' ? 'bg-green-500' : 'bg-gray-400';
  };

  const getAvailabilityBadge = (availability: string) => {
    const colors = {
      'Available': 'bg-blue-600 text-white',
      'Busy': 'bg-gray-600 text-white',
      'Away': 'bg-yellow-600 text-white',
      'Offline': 'bg-red-600 text-white'
    };
    return colors[availability as keyof typeof colors] || 'bg-gray-600 text-white';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.loginId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All Roles' || agent.role === selectedRole;
    const matchesGroup = selectedGroup === 'All Groups' || agent.group === selectedGroup;
    const matchesStatus = selectedStatus === 'All Status' || agent.availability === selectedStatus;
    
    return matchesSearch && matchesRole && matchesGroup && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agent Management</h1>
            <p className="text-gray-600">Manage agents, roles, and permissions</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">{activeAgents} Active</span>
            </div>
            <div className="text-gray-600">{totalAgents}/5 Enabled</div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Agent</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters & Search</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or login ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>All Roles</option>
              <option>Agent</option>
              <option>Supervisor</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Group Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Group</label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>All Groups</option>
              <option>Fraud Team</option>
              <option>Phishing Team</option>
              <option>Identity Team</option>
              <option>Management</option>
            </select>
          </div>

          {/* Availability Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>All Status</option>
              <option>Available</option>
              <option>Busy</option>
              <option>Away</option>
              <option>Offline</option>
            </select>
          </div>
        </div>
      </div>

      {/* Agents Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Agents ({filteredAgents.length})</h3>
            </div>
            <div className="text-sm text-gray-600">
              {activeAgents} currently logged in
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Login ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Caller ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAgents.map((agent) => (
                <tr key={agent.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {getInitials(agent.name)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                        <div className="text-sm text-gray-500">{agent.agentCode}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(agent.role)}
                      <span className="text-sm text-gray-900">{agent.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-blue-600 font-medium">{agent.loginId}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`}></div>
                      <span className={`text-sm ${agent.status === 'Online' ? 'text-green-600' : 'text-gray-600'}`}>
                        {agent.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-600">📞</span>
                      <span className="text-sm text-gray-900">{agent.callerId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{agent.group}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityBadge(agent.availability)}`}>
                      {agent.availability}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{agent.lastActive}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-green-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No agents found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;