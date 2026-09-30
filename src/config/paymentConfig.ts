/**
 * Knightesline Academy - Merchant Payment Gateway Configuration
 *
 * This configuration holds the Academy's public Razorpay Key ID so that
 * all students, parents, and visitors can pay directly without ever being
 * prompted to enter merchant credentials.
 */

// Default Academy Merchant Key (Public Client-side Live Key ID)
export const DEFAULT_RAZORPAY_KEY_ID = 'rzp_live_TiE3vAnrRHpSgT';

export const getMerchantRazorpayKey = (): string => {
  if (typeof window !== 'undefined') {
    // 1. Check if admin configured an explicit live key in admin settings
    const adminKey = localStorage.getItem('shatranj_merchant_rzp_key');
    if (adminKey && adminKey.trim().startsWith('rzp_live_')) {
      return adminKey.trim();
    }
  }

  // 2. Return pre-configured Live Merchant Key
  return DEFAULT_RAZORPAY_KEY_ID;
};

export const setMerchantRazorpayKey = (keyId: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('shatranj_merchant_rzp_key', keyId.trim());
    localStorage.setItem('shatranj_razorpay_key_id', keyId.trim());
  }
};
