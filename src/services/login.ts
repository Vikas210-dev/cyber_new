import { ENDPOINTS } from './endpoints';
import { getLoginHeaders } from './headers';

// Login user and store user tokens
export const loginUser = async (
  userName: string,
  password: string
): Promise<Response> => {
  try {
    const payload = {
      userName,
      password,
      currentTimeMillis: new Date().getTime(),
    };

    const headers = getLoginHeaders();
    console.log("Login headers:", headers);
    console.log("Login payload:", payload);

    const response = await fetch(ENDPOINTS.loginV1(), {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Store user tokens after successful login
export const storeUserTokens = (loginResponse: any): void => {
  try {
    const { token, tokenType, expiresIn, refreshToken, refreshExpiresIn } =
      loginResponse.response;

    // Store user login tokens
    sessionStorage.setItem("userToken", token);
    sessionStorage.setItem("userTokenType", tokenType);
    sessionStorage.setItem(
      "userTokenExpiry",
      (Date.now() + expiresIn * 1000).toString()
    );

    // Store refresh token
    if (refreshToken && refreshExpiresIn) {
      sessionStorage.setItem("userRefreshToken", refreshToken);
      sessionStorage.setItem(
        "userRefreshTokenExpiry",
        (Date.now() + refreshExpiresIn * 1000).toString()
      );
    }

    console.log("User tokens stored successfully:", {
      userToken: token,
      userTokenType: tokenType,
      userTokenExpiry: new Date(Date.now() + expiresIn * 1000),
      userRefreshToken: refreshToken,
      userRefreshTokenExpiry: refreshExpiresIn
        ? new Date(Date.now() + refreshExpiresIn * 1000)
        : null,
    });
  } catch (error) {
    console.error("Error storing user tokens:", error);
    throw error;
  }
};

// Get current user info from token
export const getCurrentUser = (): any => {
  const userToken = sessionStorage.getItem("userToken");
  if (!userToken) return null;

  try {
    // Decode JWT token to get user info
    const base64Url = userToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding user token:", error);
    return null;
  }
};