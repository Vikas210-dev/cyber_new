import React, { useState } from 'react';
import { Shield, User, Settings, LogOut, Bell, Menu, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: 'New Security Alert',
      message: 'Suspicious activity detected on network',
      time: '2 minutes ago',
      type: 'alert',
      unread: true
    },
    {
      id: 2,
      title: 'System Update',
      message: 'Security patches have been applied',
      time: '1 hour ago',
      type: 'info',
      unread: true
    },
    {
      id: 3,
      title: 'Incident Resolved',
      message: 'Malware threat has been contained',
      time: '3 hours ago',
      type: 'success',
      unread: false
    },
    {
      id: 4,
      title: 'New User Registration',
      message: 'A new user has been added to the system',
      time: '5 hours ago',
      type: 'info',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    setUserDropdownOpen(false);
    logout();
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile menu button */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              {/* Desktop logo - hidden on mobile since sidebar has it */}
              <div className="hidden lg:flex items-center ml-4">
                <Shield className="h-8 w-8 text-blue-600 mr-2" />
                <span className="text-xl font-bold text-gray-900">CyberHelpline</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notification Bell */}
              <div className="relative">
                <button 
                  onClick={() => setNotificationModalOpen(true)}
                  className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 block h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {user?.username || 'superuser'}
                    </span>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.username || 'superuser'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'admin@hpcyber.gov.in'}</p>
                    </div>
                    
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </button>
                    
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </button>
                    
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Modal */}
      {notificationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-96 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <button
                onClick={() => setNotificationModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-4 hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`}>
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'alert' ? 'bg-red-500' :
                          notification.type === 'success' ? 'bg-green-500' :
                          'bg-blue-500'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${notification.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No notifications</p>
                </div>
              )}
            </div>
            
            {notifications.length > 0 && (
              <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Mark all as read
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Click outside handlers */}
      {userDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setUserDropdownOpen(false)}
        />
      )}
      
      {notificationModalOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setNotificationModalOpen(false)}
        />
      )}
    </>
  );
};

export default Header;