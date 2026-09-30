import { api } from './api';
import { shatranjStore } from './store';
import { SubscriptionPlan, PaymentRecord } from '../types';

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

    // 1. Create Order on backend
    const orderData = await api.payments.createOrder({
      planId: plan.id,
      planName: `${plan.name} Academy Membership`,
      amount: price,
      billingCycle,
    });

    if (!orderData || !orderData.orderId) {
      throw new Error('Failed to initiate order with payment server.');
    }

    if (!orderData.isRealRazorpayOrder) {
      throw new Error(
        'Razorpay API Credentials required: Please click "Configure Razorpay API Keys" above to add your Razorpay Key ID and Secret (or set them in .env). Free test keys can be obtained from dashboard.razorpay.com.'
      );
    }

    // 2. Open Authentic Razorpay Checkout
    const rzpOptions: any = {
      key: orderData.keyId,
      amount: Math.round(price * 100),
      currency: orderData.currency || 'INR',
      name: 'Knightesline Chess Academy',
      description: `${plan.name} Membership (${billingCycle.toUpperCase()})`,
      image: 'https://cdn-icons-png.flaticon.com/512/3039/3039436.png',
      order_id: orderData.orderId,
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
        razorpay_order_id: string;
        razorpay_signature?: string;
      }) => {
        try {
          // 3. Cryptographically verify payment on backend
          const verifyRes = await api.payments.verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            planId: plan.id,
            planName: `${plan.name} Academy Membership (${billingCycle})`,
            amount: price,
            billingCycle,
            paymentMethod: 'Razorpay UPI & Cards',
          });

          // 4. Update local client state
          const savedPayment = shatranjStore.addPayment(
            price,
            `${plan.name} Academy Membership (${billingCycle})`,
            'Razorpay'
          );

          if (verifyRes?.user) {
            shatranjStore.updateUser({
              subscriptionTier: verifyRes.user.subscriptionTier,
              subscriptionValidUntil: verifyRes.user.subscriptionValidUntil,
            });
          }

          onSuccess(savedPayment, verifyRes?.user);
        } catch (verifyErr: any) {
          console.error('Payment verification failed:', verifyErr);
          onError(verifyErr?.message || 'Payment signature verification failed.');
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
