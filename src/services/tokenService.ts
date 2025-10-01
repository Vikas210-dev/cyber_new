import { ENDPOINTS } from './endpoints';
import { getClientHeaders } from './headers';

const endpoints = new ENDPOINTS();

// Generate token payload for client authentication
export const generateTokenPayload = (): {
  clientId: string;
  clientSecret: string;
  currentTimeMillis: number;
} => {
  return {
    clientId: "e28a8f22-bdee-4d2b-ace1-082ca8a0b129",
    clientSecret: "FsZagwDJJxbkeh09xrD9kMUUlwX1P6ve",
    currentTimeMillis: new Date().getTime(),
  };
};

// Fetch and store client token (used for API authentication)
export const fetchAndStoreToken = async (): Promise<void> => {
  try {
    const payload = generateTokenPayload();
    console.log("Payload Sent to API:", payload);

    const response = await fetch(endpoints.getToken(), {
      method: "POST",
      headers: getClientHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch token: ${response.status}`);
    }

    const data = await response.json();
    console.log("Full API Response:", data);

    const token = data?.response?.token || null;
    const tokenType = data?.response?.tokenType || null;
    const expiresIn = data?.response?.expiresIn || null;

    if (token && tokenType && expiresIn) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("tokenType", tokenType);
      sessionStorage.setItem(
        "tokenExpiry",
        (Date.now() + expiresIn * 1000).toString()
      );

      console.log("Client token stored successfully:", {
        token,
        tokenType,
        expiresIn,
      });
    } else {
      console.error(
        "Token, tokenType, or expiry time not found in the API response."
      );
      throw new Error("Invalid token response format");
    }
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};

// Check if client token is valid
export const isClientTokenValid = (): boolean => {
  const token = sessionStorage.getItem("token");
  const tokenExpiry = sessionStorage.getItem("tokenExpiry");

  if (!token || !tokenExpiry) return false;

  return Date.now() < parseInt(tokenExpiry, 10);
};

// Check if user token is valid
export const isUserTokenValid = (): boolean => {
  const userToken = sessionStorage.getItem("userToken");
  const userTokenExpiry = sessionStorage.getItem("userTokenExpiry");

  if (!userToken || !userTokenExpiry) return false;

  return Date.now() < parseInt(userTokenExpiry, 10);
};