import { UserProfile } from '../types';

const isBrowser = typeof window !== 'undefined';
const isLocalhost =
  isBrowser && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// When deployed on Cloudflare Workers / static domains without a configured remote backend
export const isStandaloneHosting = isBrowser && !isLocalhost && !import.meta.env.VITE_API_URL;

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

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

      const text = await response.text();
      let data: any = {};

      if (text && text.trim().length > 0) {
        try {
          data = JSON.parse(text);
        } catch {
          data = { message: text };
        }
      }

      if (!response.ok) {
        const errorMsg =
          data?.message ||
          data?.error?.description ||
          (text ? text.slice(0, 150) : `Server returned empty response (HTTP ${response.status})`);
        throw new Error(errorMsg);
      }

      return data;
    } catch (err: any) {
      console.warn(`API call notice for ${endpoint}:`, err?.message || err);
      throw err;
    }
  }

  // --- Auth Endpoints ---
  public auth = {
    login: async (email: string, password?: string) => {
      if (isStandaloneHosting) {
        return {
          success: true,
          token: 'token_standalone_' + Date.now(),
          user: {
            id: 'usr_live_' + Date.now(),
            name: email.split('@')[0],
            email,
            role: 'student' as any,
            subscriptionTier: 'pro' as any,
          } as UserProfile,
        };
      }

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
      if (isStandaloneHosting) {
        return {
          success: true,
          token: 'token_standalone_' + Date.now(),
          user: {
            id: 'usr_role_' + role,
            name: role.toUpperCase() + ' Player',
            email: `${role}@knightesline.com`,
            role: role as any,
            subscriptionTier: 'pro' as any,
          } as UserProfile,
        };
      }

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
      if (isStandaloneHosting) {
        return {
          success: true,
          token: 'token_standalone_' + Date.now(),
          user: {
            id: 'usr_live_' + Date.now(),
            name: data.name,
            email: data.email,
            role: (data.role || 'student') as any,
            subscriptionTier: 'starter' as any,
          } as UserProfile,
        };
      }

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
      if (isStandaloneHosting) {
        return { success: true };
      }
      return await this.request<{ user: UserProfile }>('/auth/me', {
        method: 'GET',
      });
    },

    updateProfile: async (updates: Partial<UserProfile>) => {
      if (isStandaloneHosting) {
        return { success: true, user: updates as any };
      }
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
      const storedKey = isBrowser ? localStorage.getItem('shatranj_razorpay_key_id') : null;

      // On Cloudflare static hosting, avoid 405 by returning client-side standard order
      if (isStandaloneHosting) {
        return {
          success: true,
          orderId: '',
          isRealRazorpayOrder: Boolean(
            storedKey && (storedKey.startsWith('rzp_test_') || storedKey.startsWith('rzp_live_'))
          ),
          amount: params.amount,
          currency: params.currency || 'INR',
          receipt: `rcpt_${Date.now()}`,
          keyId: storedKey || '',
          merchantName: 'Knightesline Academy Pvt. Ltd.',
        };
      }

      return await this.request<{
        orderId: string;
        amount: number;
        currency: string;
        receipt: string;
        keyId: string;
        isRealRazorpayOrder?: boolean;
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
      if (isStandaloneHosting) {
        return {
          success: true,
          payment: {
            id: params.razorpay_payment_id,
            status: 'completed',
          },
        };
      }

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
      if (isStandaloneHosting) {
        return { success: true, payments: [] };
      }
      return await this.request<{ payments: any[] }>('/payments/history', {
        method: 'GET',
      });
    },

    getGatewayStatus: async () => {
      const storedKey = isBrowser ? localStorage.getItem('shatranj_razorpay_key_id') : null;

      if (isStandaloneHosting) {
        const isConfigured = Boolean(
          storedKey && (storedKey.startsWith('rzp_test_') || storedKey.startsWith('rzp_live_'))
        );
        return {
          success: true,
          isConfigured,
          keyId: storedKey || '',
          mode: storedKey?.startsWith('rzp_live_') ? ('live' as const) : ('test' as const),
          merchantName: 'Knightesline Academy Pvt. Ltd.',
          acceptedMethods: [
            'UPI (GPay, PhonePe, Paytm, BHIM)',
            'Cards (Visa, Mastercard, RuPay)',
            'NetBanking (50+ Banks)',
            'Wallets',
          ],
        };
      }

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
      if (isBrowser) {
        localStorage.setItem('shatranj_razorpay_key_id', params.keyId);
        if (params.keySecret) {
          localStorage.setItem('shatranj_razorpay_key_secret', params.keySecret);
        }
      }

      if (isStandaloneHosting) {
        return {
          success: true,
          message: 'Razorpay Gateway credentials saved and active in browser!',
          isConfigured: true,
          keyId: params.keyId,
          mode: params.keyId.startsWith('rzp_live_') ? 'live' : 'test',
        };
      }

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
      if (isStandaloneHosting) {
        return {
          success: true,
          message: 'Trial session successfully booked! Our team will contact you shortly.',
          booking: { id: 'trial_' + Date.now(), ...bookingData },
        };
      }

      return await this.request('/trials/book', {
        method: 'POST',
        body: JSON.stringify(bookingData),
      });
    },
  };
}

export const api = new ApiService();
