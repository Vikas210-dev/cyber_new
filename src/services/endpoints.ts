const BASE_URL = "https://sandbox.techembryo.com";
const BASE_URL_USERS = `${BASE_URL}/hpcyber-users/`;
const BASE_URL_LOGIN = `${BASE_URL}/hpcyber-users/api/`;

export class ENDPOINTS {
  public readonly BASE_URL = BASE_URL;
  public readonly BASE_URL_USERS = BASE_URL_USERS;
  public readonly BASE_URL_LOGIN = BASE_URL_LOGIN;

  // Authentication endpoints
  public readonly POST_GET_TOKEN = `${BASE_URL_USERS}api/user/v1/token`;
  public readonly POST_LOGIN = `${BASE_URL_LOGIN}user/v1/login`;
  public readonly POST_REGISTER = `${BASE_URL_LOGIN}user/v1/register`;
  public readonly POST_REFRESH_TOKEN = `${BASE_URL_LOGIN}user/v1/refresh-token`;
  public readonly POST_LOGOUT = `${BASE_URL_LOGIN}user/v1/logout`;
  public readonly POST_FORGOT_PASSWORD = `${BASE_URL_LOGIN}user/v1/forgot-password`;
  public readonly POST_RESET_PASSWORD = `${BASE_URL_LOGIN}user/v1/reset-password`;

  // User management endpoints
  public readonly GET_USER_PROFILE = `${BASE_URL_USERS}api/user/user-profile`;
  public readonly POST_UPDATE_PROFILE = `${BASE_URL_USERS}api/user/v1/update-profile`;
  public readonly GET_USERS_LIST = `${BASE_URL_USERS}api/user/v1/users`;
  public readonly DELETE_USER = `${BASE_URL_USERS}api/user/v1/delete`;

  // Contact management endpoints
  public readonly GET_CONTACTS = `${BASE_URL_USERS}api/contact/v1/list`;
  public readonly POST_CREATE_CONTACT = `${BASE_URL_USERS}api/contact/v1/create`;
  public readonly PUT_UPDATE_CONTACT = `${BASE_URL_USERS}api/contact/v1/update`;
  public readonly DELETE_CONTACT = `${BASE_URL_USERS}api/contact/v1/delete`;
  public readonly GET_CONTACT_DETAILS = `${BASE_URL_USERS}api/contact/v1/details`;

  // Incident management endpoints
  public readonly GET_INCIDENTS = `${BASE_URL_USERS}api/incident/v1/list`;
  public readonly POST_CREATE_INCIDENT = `${BASE_URL_USERS}api/incident/v1/create`;
  public readonly PUT_UPDATE_INCIDENT = `${BASE_URL_USERS}api/incident/v1/update`;
  public readonly DELETE_INCIDENT = `${BASE_URL_USERS}api/incident/v1/delete`;
  public readonly GET_INCIDENT_DETAILS = `${BASE_URL_USERS}api/incident/v1/details`;

  // Threat intelligence endpoints
  public readonly GET_THREATS = `${BASE_URL_USERS}api/threat/v1/list`;
  public readonly POST_CREATE_THREAT = `${BASE_URL_USERS}api/threat/v1/create`;
  public readonly PUT_UPDATE_THREAT = `${BASE_URL_USERS}api/threat/v1/update`;
  public readonly DELETE_THREAT = `${BASE_URL_USERS}api/threat/v1/delete`;

  // Reports endpoints
  public readonly GET_REPORTS = `${BASE_URL_USERS}api/report/v1/list`;
  public readonly POST_GENERATE_REPORT = `${BASE_URL_USERS}api/report/v1/generate`;
  public readonly GET_REPORT_DETAILS = `${BASE_URL_USERS}api/report/v1/details`;

  // Analytics endpoints
  public readonly GET_ANALYTICS_DASHBOARD = `${BASE_URL_USERS}api/analytics/v1/dashboard`;
  public readonly GET_ANALYTICS_INCIDENTS = `${BASE_URL_USERS}api/analytics/v1/incidents`;
  public readonly GET_ANALYTICS_THREATS = `${BASE_URL_USERS}api/analytics/v1/threats`;

  // Communications endpoints
  public readonly GET_COMMUNICATIONS = `${BASE_URL_USERS}api/communication/v1/list`;
  public readonly POST_SEND_COMMUNICATION = `${BASE_URL_USERS}api/communication/v1/send`;
  public readonly GET_COMMUNICATION_HISTORY = `${BASE_URL_USERS}api/communication/v1/history`;

  // Settings endpoints
  public readonly GET_SETTINGS = `${BASE_URL_USERS}api/settings/v1/get`;
  public readonly POST_UPDATE_SETTINGS = `${BASE_URL_USERS}api/settings/v1/update`;

  // Master data endpoints
  public readonly GET_STATES = `${BASE_URL_USERS}api/master/v1/states`;
  public readonly GET_DISTRICTS = `${BASE_URL_USERS}api/master/v1/districts`;
  public readonly GET_ROLES = `${BASE_URL_USERS}api/master/v1/roles`;

  // Method functions for endpoints
  getToken() {
    return this.POST_GET_TOKEN;
  }

  loginV1() {
    return this.POST_LOGIN;
  }

  register() {
    return this.POST_REGISTER;
  }

  refreshToken() {
    return this.POST_REFRESH_TOKEN;
  }

  logout() {
    return this.POST_LOGOUT;
  }

  forgotPassword() {
    return this.POST_FORGOT_PASSWORD;
  }

  resetPassword() {
    return this.POST_RESET_PASSWORD;
  }

  getUserProfile() {
    return this.GET_USER_PROFILE;
  }

  updateProfile() {
    return this.POST_UPDATE_PROFILE;
  }

  getUsersList() {
    return this.GET_USERS_LIST;
  }

  deleteUser() {
    return this.DELETE_USER;
  }

  getContacts() {
    return this.GET_CONTACTS;
  }

  createContact() {
    return this.POST_CREATE_CONTACT;
  }

  updateContact() {
    return this.PUT_UPDATE_CONTACT;
  }

  deleteContact() {
    return this.DELETE_CONTACT;
  }

  getContactDetails() {
    return this.GET_CONTACT_DETAILS;
  }

  getIncidents() {
    return this.GET_INCIDENTS;
  }

  createIncident() {
    return this.POST_CREATE_INCIDENT;
  }

  updateIncident() {
    return this.PUT_UPDATE_INCIDENT;
  }

  deleteIncident() {
    return this.DELETE_INCIDENT;
  }

  getIncidentDetails() {
    return this.GET_INCIDENT_DETAILS;
  }

  getThreats() {
    return this.GET_THREATS;
  }

  createThreat() {
    return this.POST_CREATE_THREAT;
  }

  updateThreat() {
    return this.PUT_UPDATE_THREAT;
  }

  deleteThreat() {
    return this.DELETE_THREAT;
  }

  getReports() {
    return this.GET_REPORTS;
  }

  generateReport() {
    return this.POST_GENERATE_REPORT;
  }

  getReportDetails() {
    return this.GET_REPORT_DETAILS;
  }

  getAnalyticsDashboard() {
    return this.GET_ANALYTICS_DASHBOARD;
  }

  getAnalyticsIncidents() {
    return this.GET_ANALYTICS_INCIDENTS;
  }

  getAnalyticsThreats() {
    return this.GET_ANALYTICS_THREATS;
  }

  getCommunications() {
    return this.GET_COMMUNICATIONS;
  }

  sendCommunication() {
    return this.POST_SEND_COMMUNICATION;
  }

  getCommunicationHistory() {
    return this.GET_COMMUNICATION_HISTORY;
  }

  getSettings() {
    return this.GET_SETTINGS;
  }

  updateSettings() {
    return this.POST_UPDATE_SETTINGS;
  }

  getStates() {
    return this.GET_STATES;
  }

  getDistricts() {
    return this.GET_DISTRICTS;
  }

  getRoles() {
    return this.GET_ROLES;
  }
}

export const endpoints = new ENDPOINTS();

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