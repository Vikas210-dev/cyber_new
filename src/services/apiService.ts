import { apiEndpoints } from './endpoints';
import { getClientHeaders, getAuthHeaders, getLoginHeaders } from './headers';

export interface ApiResponse<T = any> {
  statusCode: string;
  message: string;
  response?: T;
  data?: T;
}

class ApiService {
  private endpoints = apiEndpoints;

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

  private async get<T>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'GET', undefined, headers);
  }

  private async post<T>(url: string, payload: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'POST', payload, headers);
  }

  private async put<T>(url: string, payload: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'PUT', payload, headers);
  }

  private async delete<T>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'DELETE', undefined, headers);
  }

  // Authentication APIs
  async getClientToken(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.POST_GET_TOKEN, payload, getClientHeaders());
  }

  async login(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.POST_LOGIN, payload, getLoginHeaders());
  }

  async register(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.POST_REGISTER, payload, getAuthHeaders());
  }

  async refreshToken(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.POST_REFRESH_TOKEN, payload, getAuthHeaders());
  }

  async logout(): Promise<ApiResponse> {
    return this.post(this.endpoints.POST_LOGOUT, {}, getAuthHeaders());
  }

  async forgotPassword(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.POST_FORGOT_PASSWORD, payload, getClientHeaders());
  }

  async resetPassword(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.POST_RESET_PASSWORD, payload, getClientHeaders());
  }

  // User Management APIs
  async getUserProfile(): Promise<ApiResponse> {
    return this.get(this.endpoints.GET_USER_PROFILE);
  }

  async updateProfile(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.POST_UPDATE_PROFILE, payload);
  }

  async getUsersList(): Promise<ApiResponse> {
    return this.get(this.endpoints.GET_USERS_LIST);
  }

  async deleteUser(userId: string): Promise<ApiResponse> {
    return this.delete(`${this.endpoints.DELETE_USER}/${userId}`);
  }

  // Contact Management APIs
  async getContacts(): Promise<ApiResponse> {
    return this.get(this.endpoints.GET_CONTACTS);
  }

  async createContact(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.POST_CREATE_CONTACT, payload);
  }

  async updateContact(payload: any): Promise<ApiResponse> {
    return this.put(this.endpoints.PUT_UPDATE_CONTACT, payload);
  }

  async deleteContact(contactId: string): Promise<ApiResponse> {
    return this.delete(`${this.endpoints.DELETE_CONTACT}/${contactId}`);
  }

  async getContactDetails(contactId: string): Promise<ApiResponse> {
    return this.get(`${this.endpoints.GET_CONTACT_DETAILS}/${contactId}`);
  }

  // Incident Management APIs
  async getIncidents(): Promise<ApiResponse> {
    return this.get(this.endpoints.GET_INCIDENTS);
  }

  async createIncident(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.POST_CREATE_INCIDENT, payload);
  }

  async updateIncident(payload: any): Promise<ApiResponse> {
    return this.put(this.endpoints.PUT_UPDATE_INCIDENT, payload);
  }

  async deleteIncident(incidentId: string): Promise<ApiResponse> {
    return this.delete(`${this.endpoints.DELETE_INCIDENT}/${incidentId}`);
  }

  async getIncidentDetails(incidentId: string): Promise<ApiResponse> {
    return this.get(`${this.endpoints.GET_INCIDENT_DETAILS}/${incidentId}`);
  }

  // Threat Intelligence APIs
  async getThreats(): Promise<ApiResponse> {
    return this.get(this.endpoints.GET_THREATS);
  }

  async createThreat(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.POST_CREATE_THREAT, payload);
  }

  async updateThreat(payload: any): Promise<ApiResponse> {
    return this.put(this.endpoints.PUT_UPDATE_THREAT, payload);
  }

  async deleteThreat(threatId: string): Promise<ApiResponse> {
    return this.delete(`${this.endpoints.DELETE_THREAT}/${threatId}`);
  }

  // Reports APIs
  async getReports(): Promise<ApiResponse> {
    return this.get(this.endpoints.GET_REPORTS);
  }

  async generateReport(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.POST_GENERATE_REPORT, payload);
  }

  async getReportDetails(reportId: string): Promise<ApiResponse> {
    return this.get(`${this.endpoints.GET_REPORT_DETAILS}/${reportId}`);
  }

  // Analytics APIs
  async getAnalyticsDashboard(): Promise<ApiResponse> {
    return this.get(this.endpoints.GET_ANALYTICS_DASHBOARD);
  }

  async getAnalyticsIncidents(): Promise<ApiResponse> {
    return this.get(this.endpoints.GET_ANALYTICS_INCIDENTS);
  }

  async getAnalyticsThreats(): Promise<ApiResponse> {
    return this.get(this.endpoints.GET_ANALYTICS_THREATS);
  }

  // Communications APIs
  async getCommunications(): Promise<ApiResponse> {
    return this.get(this.endpoints.GET_COMMUNICATIONS);
  }

  async sendCommunication(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.POST_SEND_COMMUNICATION, payload);
  }

  async getCommunicationHistory(): Promise<ApiResponse> {
    return this.get(this.endpoints.GET_COMMUNICATION_HISTORY);
  }

  // Settings APIs
  async getSettings(): Promise<ApiResponse> {
    return this.get(this.endpoints.GET_SETTINGS);
  }

  async updateSettings(payload: any): Promise<ApiResponse> {
    return this.post(this.endpoints.POST_UPDATE_SETTINGS, payload);
  }

  // Master Data APIs
  async getStates(): Promise<ApiResponse> {
    return this.get(this.endpoints.GET_STATES);
  }

  async getDistricts(stateId?: string): Promise<ApiResponse> {
    const url = stateId ? `${this.endpoints.GET_DISTRICTS}?stateId=${stateId}` : this.endpoints.GET_DISTRICTS;
    return this.get(url);
  }

  async getRoles(): Promise<ApiResponse> {
    return this.get(this.endpoints.GET_ROLES);
  }
}

export const apiService = new ApiService();