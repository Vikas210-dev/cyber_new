const BASE_URL = "https://sandbox.techembryo.com";
const GET_TOKEN = `${BASE_URL}/hpcyber-users/api/user/v1/`;
const BASE_URL_LOGIN = `${BASE_URL}/hpcyber-users/api/`;

export const ENDPOINTS = {
  // Base URLs
  BASE_URL,
  GET_TOKEN,
  BASE_URL_LOGIN,

  // Authentication endpoints
  getToken: () => `${GET_TOKEN}token`,
  loginV1: () => `${BASE_URL_LOGIN}user/v1/login`,
  refreshToken: () => `${BASE_URL_LOGIN}user/v1/refresh-token`,
  logout: () => `${BASE_URL_LOGIN}user/v1/logout`,
};

export const SESSION_KEYS = {
  // Client token keys
  TOKEN: 'token',
  TOKEN_TYPE: 'tokenType',
  TOKEN_EXPIRY: 'tokenExpiry',
  
  // User token keys
  USER_TOKEN: 'userToken',
  USER_TOKEN_TYPE: 'userTokenType',
  USER_TOKEN_EXPIRY: 'userTokenExpiry',
  USER_REFRESH_TOKEN: 'userRefreshToken',
  USER_REFRESH_TOKEN_EXPIRY: 'userRefreshTokenExpiry',
  
  // User data keys
  USER_INFO: 'userInfo',
  USER_ROLE: 'userRole',
} as const;