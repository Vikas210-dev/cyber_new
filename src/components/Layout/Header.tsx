import React, { useState } from 'react';
import { Shield, User, Settings, LogOut, Bell, Menu, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { apiService } from '../../services/apiService';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

interface UserProfile {
  userId: string;
  userName: string;
  roleId: number;
  roleDesc: string;
  stateId: number;
  stateDesc: string;
  districtId: number | null;
  districtDesc: string | null;
  firstName: string;
  lastName: string | null;
  email: string | null;
  mobileNo: string;
  status: string;
  lastLoginOn: string;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Fetch user profile when dropdown opens
  const handleDropdownToggle = async () => {
    if (!userDropdownOpen && !userProfile) {
      setProfileLoading(true);
      try {
        const response = await apiService.getUserProfile();
        if (response.statusCode === 'ESS-000' && response.response?.content?.[0]) {
          setUserProfile(response.response.content[0]);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setProfileLoading(false);
      }
    }
    setUserDropdownOpen(!userDropdownOpen);
  };

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
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear all session storage
      sessionStorage.clear();
      // Clear all session storage
      sessionStorage.clear();
      // Call the logout function from useAuth
      logout();
    }
  };

  const handleProfileClick = () => {
    setUserDropdownOpen(false);
    navigate('/profile');
  };

  const handleSettingsClick = () => {
    setUserDropdownOpen(false);
    navigate('/settings');
  };

  // Get display name and email from profile or fallback to auth user
  const displayName = userProfile ? 
    `${userProfile.firstName} ${userProfile.lastName || ''}`.trim() : 
    (user?.username || 'Loading...');
  
  const displayEmail = userProfile?.email || user?.email || 'No email';
  const displayRole = userProfile?.roleDesc || user?.role || 'User';
  

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
                  onClick={handleDropdownToggle}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      {userProfile ? (
                        <span className="text-white text-sm font-medium">
                          {userProfile.firstName?.charAt(0) || 'U'}{userProfile.lastName?.charAt(0) || ''}
                        </span>
                      ) : (
                        <User className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {userProfile ? `${userProfile.firstName} ${userProfile.lastName || ''}`.trim() : (user?.username || 'User')}
                    </span>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      {profileLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                          <span className="text-sm text-gray-500">Loading...</span>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-gray-900">{displayName}</p>
                          <p className="text-xs text-gray-500">{displayEmail}</p>
                          <p className="text-xs text-blue-600 font-medium">{displayRole}</p>
                        </>
                      )}
                    </div>
                    
                    <button
                      onClick={handleProfileClick}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </button>
                    
                    <button
                      onClick={handleSettingsClick}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
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