import { fetchAndStoreToken, isClientTokenValid, isUserTokenValid } from './tokenService';
import { loginUser, storeUserTokens, getCurrentUser } from './login';

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const userToken = sessionStorage.getItem("userToken");
  const userTokenExpiry = sessionStorage.getItem("userTokenExpiry");

  if (!userToken || !userTokenExpiry) return false;

  return Date.now() < parseInt(userTokenExpiry, 10);
};

// Clear all authentication data
export const clearAuthData = (): void => {
  // Clear client tokens
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("tokenType");
  sessionStorage.removeItem("tokenExpiry");

  // Clear user tokens
  sessionStorage.removeItem("userToken");
  sessionStorage.removeItem("userTokenType");
  sessionStorage.removeItem("userTokenExpiry");
  sessionStorage.removeItem("userRefreshToken");
  sessionStorage.removeItem("userRefreshTokenExpiry");
  console.log("All authentication data cleared");
};

// Logout user
export const logout = (): void => {
  clearAuthData();
};

// Initialize authentication
export const initializeAuth = async (): Promise<void> => {
  try {
    // Check if user is already authenticated
    if (isAuthenticated()) {
      console.log('User already authenticated');
      return;
    }

    // Fetch client token for API authentication
    await fetchAndStoreToken();
    console.log('Client token fetched and stored successfully');
  } catch (error) {
    console.error('Auth initialization failed:', error);
    throw new Error('Failed to authenticate with server');
  }
};

// Export all functions from other services for convenience
export { 
  fetchAndStoreToken, 
  isClientTokenValid, 
  loginUser,
  storeUserTokens,
  getCurrentUser
};