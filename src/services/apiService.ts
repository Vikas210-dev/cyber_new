import { endpoints } from './endpoints';
import { getClientHeaders, getAuthHeaders, getLoginHeaders } from './headers';

export interface ApiResponse<T = any> {
  statusCode: string;
  message: string;
  response?: T;
  data?: T;
}

class ApiService {
  private endpoints = endpoints;

  // Generic HTTP methods
  private async request<T>(
    url: string, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE', 
    payload?: any, 
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    try {
      const config: RequestInit = {
        method,
        headers: headers || getAuthHeaders(),
      };

      if (payload && (method === 'POST' || method === 'PUT')) {
        config.body = JSON.stringify(payload);
      }

      console.log(`${method} ${url}`, { payload, headers: config.headers });

      const response = await fetch(url, config);
      const data = await response.json();

      console.log(`${method} ${url} Response:`, { status: response.status, data });

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error - ${method} ${url}:`, error);
      throw error;
    }
  }

  async get<T>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'GET', undefined, headers);
  }

  async post<T>(url: string, payload: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'POST', payload, headers);
  }

  async put<T>(url: string, payload: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'PUT', payload, headers);
  }

  async delete<T>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'DELETE', undefined, headers);
  }

  // Authentication APIs
  getClientToken(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.getToken(), payload, getClientHeaders());
  }

  login(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.loginV1(), payload, getLoginHeaders());
  }

  register(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.register(), payload, getAuthHeaders());
  }

  refreshToken(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.refreshToken(), payload, getAuthHeaders());
  }

  logout(): Promise<ApiResponse> {
    return this.post(this.endpoints.logout(), {}, getAuthHeaders());
  }

  forgotPassword(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.forgotPassword(), payload, getClientHeaders());
  }

  resetPassword(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.resetPassword(), payload, getClientHeaders());
  }

  // User Management APIs
  getUserProfile(): Promise<ApiResponse> {
    return this.get(this.endpoints.GET_USER_PROFILE);
  }

  updateProfile(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.updateProfile(), payload);
  }

  getUsersList(): Promise<ApiResponse> {
    return this.get(this.endpoints.getUsersList());
  }

  deleteUser(userId: string): Promise<ApiResponse> {
    return this.delete(`${this.endpoints.deleteUser()}/${userId}`);
  }

  // Contact Management APIs
  getContacts(): Promise<ApiResponse> {
    return this.get(this.endpoints.getContacts());
  }

  createContact(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.createContact(), payload);
  }

  updateContact(payload: any): Promise<ApiResponse> {
    return this.put(this.endpoints.updateContact(), payload);
  }

  deleteContact(contactId: string): Promise<ApiResponse> {
    return this.delete(`${this.endpoints.deleteContact()}/${contactId}`);
  }

  getContactDetails(contactId: string): Promise<ApiResponse> {
    return this.get(`${this.endpoints.getContactDetails()}/${contactId}`);
  }

  // Incident Management APIs
  getIncidents(): Promise<ApiResponse> {
    return this.get(this.endpoints.getIncidents());
  }

  createIncident(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.createIncident(), payload);
  }

  updateIncident(payload: any): Promise<ApiResponse> {
    return this.put(this.endpoints.updateIncident(), payload);
  }

  deleteIncident(incidentId: string): Promise<ApiResponse> {
    return this.delete(`${this.endpoints.deleteIncident()}/${incidentId}`);
  }

  getIncidentDetails(incidentId: string): Promise<ApiResponse> {
    return this.get(`${this.endpoints.getIncidentDetails()}/${incidentId}`);
  }

  // Threat Intelligence APIs
  getThreats(): Promise<ApiResponse> {
    return this.get(this.endpoints.getThreats());
  }

  createThreat(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.createThreat(), payload);
  }

  updateThreat(payload: any): Promise<ApiResponse> {
    return this.put(this.endpoints.updateThreat(), payload);
  }

  deleteThreat(threatId: string): Promise<ApiResponse> {
    return this.delete(`${this.endpoints.deleteThreat()}/${threatId}`);
  }

  // Reports APIs
  getReports(): Promise<ApiResponse> {
    return this.get(this.endpoints.getReports());
  }

  generateReport(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.generateReport(), payload);
  }

  getReportDetails(reportId: string): Promise<ApiResponse> {
    return this.get(`${this.endpoints.getReportDetails()}/${reportId}`);
  }

  // Analytics APIs
  getAnalyticsDashboard(): Promise<ApiResponse> {
    return this.get(this.endpoints.getAnalyticsDashboard());
  }

  getAnalyticsIncidents(): Promise<ApiResponse> {
    return this.get(this.endpoints.getAnalyticsIncidents());
  }

  getAnalyticsThreats(): Promise<ApiResponse> {
    return this.get(this.endpoints.getAnalyticsThreats());
  }

  // Communications APIs
  getCommunications(): Promise<ApiResponse> {
    return this.get(this.endpoints.getCommunications());
  }

  sendCommunication(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.sendCommunication(), payload);
  }

  getCommunicationHistory(): Promise<ApiResponse> {
    return this.get(this.endpoints.getCommunicationHistory());
  }

  // Settings APIs
  getSettings(): Promise<ApiResponse> {
    return this.get(this.endpoints.getSettings());
  }

  updateSettings(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.updateSettings(), payload);
  }

  // Master Data APIs
  getStates(): Promise<ApiResponse> {
    return this.get(this.endpoints.getStates());
  }

  getDistricts(stateId?: string): Promise<ApiResponse> {
    const url = stateId ? `${this.endpoints.getDistricts()}?stateId=${stateId}` : this.endpoints.getDistricts();
    return this.get(url);
  }

  getRoles(): Promise<ApiResponse> {
    return this.get(this.endpoints.getRoles());
  }
}

export const apiService = new ApiService();