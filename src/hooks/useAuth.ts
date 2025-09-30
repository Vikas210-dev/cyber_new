import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  isAuthenticated,
  fetchAndStoreToken,
  loginUser,
  storeUserTokens,
  clearAuthData,
  getCurrentUser 
} from '../services/authService';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  permissions: string[];
}

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // Check if user is already authenticated
        if (isAuthenticated()) {
          const currentUser = getCurrentUser();
          if (currentUser) {
            setUser({
              id: currentUser.sub || 'unknown',
              username: currentUser.preferred_username || 'user',
              email: currentUser.email || '',
              role: currentUser.realm_access?.roles?.[0] || 'user',
              permissions: currentUser.realm_access?.roles || [],
            });
          }
          setAuthenticated(true);
        } else {
          // Fetch client token for login API
          await fetchAndStoreToken();
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      
      // Call login API
      const response = await loginUser(username, password);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || `Login failed with status ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Check if login was successful
      if (data.statusCode === 'ESS-000' && data.response) {
        // Store user tokens
        storeUserTokens(data);
        
        // Get user info from token
        const currentUser = getCurrentUser();
        if (currentUser) {
          setUser({
            id: currentUser.sub || 'unknown',
            username: currentUser.preferred_username || username,
            email: currentUser.email || '',
            role: currentUser.realm_access?.roles?.[0] || 'user',
            permissions: currentUser.realm_access?.roles || [],
          });
        }
        
        setAuthenticated(true);
        
        // Navigate to dashboard after successful login
        navigate('/', { replace: true });
        
        return { success: true };
      } else {
        throw new Error(data.message || 'Login response format is invalid');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
    setAuthenticated(false);
    navigate('/login', { replace: true });
  };

  return {
    user,
    loading,
    isAuthenticated: authenticated,
    login,
    logout,
  };
};