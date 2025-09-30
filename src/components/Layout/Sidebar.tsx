import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Shield, 
  AlertTriangle, 
  Users, 
  BarChart3, 
  Settings, 
  FileText,
  MessageSquare,
  X,
  Menu
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
    { id: 'incidents', label: 'Incidents', icon: AlertTriangle, path: '/incidents' },
    { id: 'threats', label: 'Threat Intelligence', icon: Shield, path: '/threats' },
    { id: 'users', label: 'User Management', icon: Users, path: '/users' },
    { id: 'reports', label: 'Reports', icon: FileText, path: '/reports' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { id: 'communications', label: 'Communications', icon: MessageSquare, path: '/communications' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Logo/Brand */}
        <div className="px-6 py-4 border-b border-gray-700">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-400 mr-3" />
            <span className="text-xl font-bold">CyberHelpline</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8">
          <div className="px-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      onClick={() => setSidebarOpen(false)} // Close sidebar on mobile after click
                      className={({ isActive }) =>
                        `w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`
                      }
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;