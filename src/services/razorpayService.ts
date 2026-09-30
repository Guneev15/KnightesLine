import { api } from './api';
import { shatranjStore } from './store';
import { SubscriptionPlan, PaymentRecord } from '../types';
import { getMerchantRazorpayKey } from '../config/paymentConfig';

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector('script[src*="checkout.razorpay.com"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export interface CheckoutParams {
  plan: SubscriptionPlan;
  billingCycle: 'monthly' | 'yearly';
  user?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  onSuccess: (payment: PaymentRecord, updatedUser?: any) => void;
  onError: (errorMessage: string) => void;
  onDismiss?: () => void;
}

export const openOfficialRazorpay = async ({
  plan,
  billingCycle,
  user,
  onSuccess,
  onError,
  onDismiss,
}: CheckoutParams): Promise<void> => {
  try {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      throw new Error(
        'Unable to load official Razorpay Checkout SDK. Please check your internet connection or disable ad blockers.'
      );
    }

    const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

    let keyId = getMerchantRazorpayKey();
    let orderId: string | undefined = undefined;

    // 1. Try to create Order via backend if available
    try {
      const orderData = await api.payments.createOrder({
        planId: plan.id,
        planName: `${plan.name} Academy Membership`,
        amount: price,
        billingCycle,
      });

      if (
        orderData?.keyId &&
        !orderData.keyId.includes('knightesline') &&
        !orderData.keyId.includes('placeholder')
      ) {
        keyId = orderData.keyId;
      }
      if (orderData?.isRealRazorpayOrder && orderData.orderId) {
        orderId = orderData.orderId;
      }
    } catch (apiErr: any) {
      console.warn('Backend order creation notice (standalone client checkout active):', apiErr?.message);
    }

    // Check if key is available
    if (!keyId || keyId.includes('placeholder') || keyId.includes('setup_required')) {
      throw new Error(
        'The Academy payment gateway is currently being finalized. Please check back in a few minutes or contact support.'
      );
    }

    // 2. Open Authentic Razorpay Checkout
    const rzpOptions: any = {
      key: keyId,
      amount: Math.round(price * 100),
      currency: 'INR',
      name: 'Knightesline Chess Academy',
      description: `${plan.name} Membership (${billingCycle.toUpperCase()})`,
      image: 'https://cdn-icons-png.flaticon.com/512/3039/3039436.png',
      ...(orderId ? { order_id: orderId } : {}),
      prefill: {
        name: user?.name || 'Grandmaster Student',
        email: user?.email || 'student@knightesline.com',
        contact: user?.phone || '',
      },
      notes: {
        planId: plan.id,
        billingCycle,
        platform: 'Knightesline Web Academy',
      },
      theme: {
        color: '#f59e0b',
        backdrop_color: 'rgba(7, 10, 19, 0.88)',
      },
      modal: {
        confirm_close: true,
        ondismiss: () => {
          if (onDismiss) onDismiss();
        },
      },
      handler: async (response: {
        razorpay_payment_id: string;
        razorpay_order_id?: string;
        razorpay_signature?: string;
      }) => {
        try {
          // If backend is active and order was generated, verify signature
          if (response.razorpay_order_id && response.razorpay_signature) {
            try {
              await api.payments.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planId: plan.id,
                planName: `${plan.name} Academy Membership (${billingCycle})`,
                amount: price,
                billingCycle,
                paymentMethod: 'Razorpay UPI & Cards',
              });
            } catch (vErr) {
              console.warn('Backend verification notice:', vErr);
            }
          }

          // Update local client state
          const savedPayment = shatranjStore.addPayment(
            price,
            `${plan.name} Academy Membership (${billingCycle})`,
            'Razorpay'
          );

          const validUntil = new Date();
          if (billingCycle === 'yearly') {
            validUntil.setFullYear(validUntil.getFullYear() + 1);
          } else {
            validUntil.setMonth(validUntil.getMonth() + 1);
          }

          shatranjStore.updateUser({
            subscriptionTier: plan.id.includes('elite') ? 'elite' : 'pro',
            subscriptionValidUntil: validUntil.toISOString().split('T')[0],
          });

          onSuccess(savedPayment);
        } catch (verifyErr: any) {
          console.error('Payment completion error:', verifyErr);
          onError(verifyErr?.message || 'Payment verification could not be completed.');
        }
      },
    };

    const rzp = new (window as any).Razorpay(rzpOptions);

    rzp.on('payment.failed', (resp: any) => {
      console.error('Razorpay payment failed:', resp?.error);
      const desc = resp?.error?.description || resp?.error?.reason || 'Transaction could not be completed.';
      onError(`Payment Failed: ${desc}`);
    });

    rzp.open();
  } catch (err: any) {
    console.error('Error in openOfficialRazorpay:', err);
    onError(err?.message || 'Failed to initialize payment gateway.');
  }
};
