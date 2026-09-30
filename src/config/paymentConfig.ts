/**
 * Knightesline Academy - Merchant Payment Gateway Configuration
 *
 * This configuration holds the Academy's public Razorpay Key ID so that
 * all students, parents, and visitors can pay directly without ever being
 * prompted to enter merchant credentials.
 */

// Default Academy Merchant Key (Public Client-side Key ID)
// Can be set via environment variable VITE_RAZORPAY_KEY_ID or edited here
export const DEFAULT_RAZORPAY_KEY_ID =
  (import.meta as any).env?.VITE_RAZORPAY_KEY_ID || 'rzp_live_default_key_placeholder';

export const getMerchantRazorpayKey = (): string => {
  if (typeof window !== 'undefined') {
    // 1. Check if admin configured a custom key in admin settings
    const adminKey = localStorage.getItem('shatranj_merchant_rzp_key');
    if (adminKey && (adminKey.startsWith('rzp_test_') || adminKey.startsWith('rzp_live_'))) {
      return adminKey.trim();
    }

    // 2. Check if previously saved key exists
    const legacyKey = localStorage.getItem('shatranj_razorpay_key_id');
    if (legacyKey && (legacyKey.startsWith('rzp_test_') || legacyKey.startsWith('rzp_live_'))) {
      return legacyKey.trim();
    }
  }

  // 3. Fallback to default configured key
  return DEFAULT_RAZORPAY_KEY_ID;
};

export const setMerchantRazorpayKey = (keyId: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('shatranj_merchant_rzp_key', keyId.trim());
    localStorage.setItem('shatranj_razorpay_key_id', keyId.trim());
  }
};
