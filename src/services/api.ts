import { UserProfile } from '../types';

const API_BASE_URL = '/api';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  [key: string]: any;
}

class ApiService {
  private getToken(): string | null {
    return localStorage.getItem('knightesline_token');
  }

  public setToken(token: string): void {
    localStorage.setItem('knightesline_token', token);
  }

  public clearToken(): void {
    localStorage.removeItem('knightesline_token');
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `API error: ${response.status}`);
      }
      return data;
    } catch (err: any) {
      console.warn(`API call failed for ${endpoint}:`, err?.message || err);
      throw err;
    }
  }

  // --- Auth Endpoints ---
  public auth = {
    login: async (email: string, password?: string) => {
      const res = await this.request<{ token: string; user: UserProfile }>(
        '/auth/login',
        {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        }
      );
      if (res.token) {
        this.setToken(res.token);
      }
      return res;
    },

    quickLoginByRole: async (role: string) => {
      const res = await this.request<{ token: string; user: UserProfile }>(
        '/auth/login',
        {
          method: 'POST',
          body: JSON.stringify({ role }),
        }
      );
      if (res.token) {
        this.setToken(res.token);
      }
      return res;
    },

    register: async (data: {
      name: string;
      email: string;
      password?: string;
      role?: string;
      phone?: string;
    }) => {
      const res = await this.request<{ token: string; user: UserProfile }>(
        '/auth/register',
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      );
      if (res.token) {
        this.setToken(res.token);
      }
      return res;
    },

    getMe: async () => {
      return await this.request<{ user: UserProfile }>('/auth/me', {
        method: 'GET',
      });
    },

    updateProfile: async (updates: Partial<UserProfile>) => {
      return await this.request<{ user: UserProfile }>('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },

    logout: () => {
      this.clearToken();
    },
  };

  // --- Payment Endpoints ---
  public payments = {
    createOrder: async (params: {
      planId: string;
      planName: string;
      amount: number;
      billingCycle: string;
      currency?: string;
    }) => {
      return await this.request<{
        orderId: string;
        amount: number;
        currency: string;
        receipt: string;
        keyId: string;
      }>('/payments/create-order', {
        method: 'POST',
        body: JSON.stringify(params),
      });
    },

    verifyPayment: async (params: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature?: string;
      planId: string;
      planName: string;
      amount: number;
      billingCycle: string;
      paymentMethod: string;
    }) => {
      return await this.request<{
        success: boolean;
        payment: any;
        user?: UserProfile;
      }>('/payments/verify', {
        method: 'POST',
        body: JSON.stringify(params),
      });
    },

    getHistory: async () => {
      return await this.request<{ payments: any[] }>('/payments/history', {
        method: 'GET',
      });
    },

    getGatewayStatus: async () => {
      return await this.request<{
        success: boolean;
        isConfigured: boolean;
        keyId: string;
        mode: 'live' | 'test';
        merchantName: string;
        acceptedMethods: string[];
      }>('/payments/gateway-status', {
        method: 'GET',
      });
    },

    configureGateway: async (params: { keyId: string; keySecret: string }) => {
      return await this.request<{
        success: boolean;
        message: string;
        isConfigured: boolean;
        keyId: string;
        mode: string;
      }>('/payments/configure-gateway', {
        method: 'POST',
        body: JSON.stringify(params),
      });
    },
  };

  // --- Trial Booking Endpoints ---
  public trials = {
    book: async (bookingData: {
      parentName: string;
      email: string;
      phone: string;
      childName: string;
      childAge?: number;
      experienceLevel?: string;
      preferredTimeSlot?: string;
      notes?: string;
    }) => {
      return await this.request('/trials/book', {
        method: 'POST',
        body: JSON.stringify(bookingData),
      });
    },
  };
}

export const api = new ApiService();
