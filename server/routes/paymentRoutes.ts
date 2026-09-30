import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import Razorpay from 'razorpay';
import { db, PaymentRecord } from '../db';
import { config } from '../config/env';
import { authenticateJwt, optionalJwt, AuthRequest } from '../middleware/auth';

const router = Router();

// Helper to check if real Razorpay keys are configured
export const isRazorpayLiveConfigured = (): boolean => {
  return (
    Boolean(config.razorpay.keyId) &&
    Boolean(config.razorpay.keySecret) &&
    !config.razorpay.keyId.includes('knightesline') &&
    (config.razorpay.keyId.startsWith('rzp_test_') || config.razorpay.keyId.startsWith('rzp_live_'))
  );
};

// Initialize Razorpay client
let razorpayInstance: Razorpay | null = null;
const initRazorpayInstance = () => {
  try {
    if (isRazorpayLiveConfigured()) {
      razorpayInstance = new Razorpay({
        key_id: config.razorpay.keyId,
        key_secret: config.razorpay.keySecret,
      });
      console.log(`[Razorpay] Gateway active with Key ID: ${config.razorpay.keyId.substring(0, 12)}... (${config.razorpay.keyId.startsWith('rzp_test_') ? 'Test Mode' : 'Live Production'})`);
    } else {
      razorpayInstance = null;
      console.log('[Razorpay] Ready for configuration (Add your Razorpay Key ID & Secret to activate)');
    }
  } catch (err) {
    console.warn('[Razorpay] Client initialization warning:', err);
    razorpayInstance = null;
  }
};

initRazorpayInstance();

// Helper to write keys to .env
const persistKeysToEnv = (keyId: string, keySecret: string) => {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf-8');
    }

    if (envContent.includes('RAZORPAY_KEY_ID=')) {
      envContent = envContent.replace(/RAZORPAY_KEY_ID=.*/g, `RAZORPAY_KEY_ID=${keyId}`);
    } else {
      envContent += `\nRAZORPAY_KEY_ID=${keyId}`;
    }

    if (envContent.includes('RAZORPAY_KEY_SECRET=')) {
      envContent = envContent.replace(/RAZORPAY_KEY_SECRET=.*/g, `RAZORPAY_KEY_SECRET=${keySecret}`);
    } else {
      envContent += `\nRAZORPAY_KEY_SECRET=${keySecret}`;
    }

    fs.writeFileSync(envPath, envContent.trim() + '\n', 'utf-8');
  } catch (e) {
    console.warn('[Razorpay] Could not write .env file:', e);
  }
};

// GET /api/payments/gateway-status
router.get('/gateway-status', (_req: Request, res: Response): void => {
  const configured = isRazorpayLiveConfigured();
  res.json({
    success: true,
    isConfigured: configured,
    keyId: config.razorpay.keyId,
    mode: config.razorpay.keyId.startsWith('rzp_live_') ? 'live' : 'test',
    merchantName: 'Knightesline Academy Pvt. Ltd.',
    acceptedMethods: ['UPI (GPay, PhonePe, Paytm, BHIM)', 'Cards (Visa, Mastercard, RuPay)', 'NetBanking (50+ Banks)', 'Wallets'],
  });
});

// POST /api/payments/configure-gateway
router.post('/configure-gateway', (req: Request, res: Response): void => {
  const { keyId, keySecret } = req.body;

  if (!keyId || !keySecret) {
    res.status(400).json({
      success: false,
      message: 'Both Razorpay Key ID and Key Secret are required.',
    });
    return;
  }

  const cleanKeyId = keyId.trim();
  const cleanKeySecret = keySecret.trim();

  if (!cleanKeyId.startsWith('rzp_test_') && !cleanKeyId.startsWith('rzp_live_')) {
    res.status(400).json({
      success: false,
      message: 'Invalid Razorpay Key ID format. It must start with rzp_test_ or rzp_live_.',
    });
    return;
  }

  config.razorpay.keyId = cleanKeyId;
  config.razorpay.keySecret = cleanKeySecret;
  initRazorpayInstance();

  // Send response back to frontend first
  res.json({
    success: true,
    message: 'Razorpay Gateway credentials saved and activated successfully!',
    isConfigured: true,
    keyId: cleanKeyId,
    mode: cleanKeyId.startsWith('rzp_live_') ? 'live' : 'test',
  });

  // Asynchronously persist to .env
  setImmediate(() => {
    persistKeysToEnv(cleanKeyId, cleanKeySecret);
  });
});

// POST /api/payments/create-order
router.post('/create-order', optionalJwt, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { planId, planName, amount, billingCycle = 'monthly', currency = 'INR' } = req.body;

    if (!amount || amount <= 0) {
      res.status(400).json({ success: false, message: 'Valid payment amount is required.' });
      return;
    }

    const receipt = `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const configured = isRazorpayLiveConfigured();

    // 1. If real Razorpay keys are configured, create order via Razorpay API
    if (configured && razorpayInstance) {
      try {
        const order = await razorpayInstance.orders.create({
          amount: Math.round(amount * 100), // Razorpay accepts amount in paise
          currency: currency || 'INR',
          receipt,
          notes: {
            planId: planId || 'plan_pro',
            planName: planName || 'Chess Academy Plan',
            billingCycle,
            userId: req.user?.id || 'guest',
            userEmail: req.user?.email || '',
            userName: req.user?.name || '',
          },
        });

        res.json({
          success: true,
          isRealRazorpayOrder: true,
          orderId: order.id,
          amount,
          amountInPaise: order.amount,
          currency: order.currency,
          receipt,
          keyId: config.razorpay.keyId,
          merchantName: 'Knightesline Academy Pvt. Ltd.',
        });
        return;
      } catch (rzpErr: any) {
        console.error('[Razorpay] Order creation API error:', rzpErr);
        const errMsg = rzpErr?.error?.description || rzpErr?.message || 'Razorpay order creation failed.';
        res.status(400).json({
          success: false,
          message: `Razorpay Gateway Error: ${errMsg}`,
          details: rzpErr?.error,
        });
        return;
      }
    }

    // 2. Fallback / sandbox test order when keys are pending setup
    const orderId = `order_demo_${Date.now()}`;
    res.json({
      success: true,
      isRealRazorpayOrder: false,
      orderId,
      amount,
      currency: currency || 'INR',
      receipt,
      keyId: config.razorpay.keyId,
      merchantName: 'Knightesline Academy Pvt. Ltd.',
      notice: 'Using development sandbox order. Configure live Razorpay keys to connect to real UPI/Card rails.',
    });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ success: false, message: 'Failed to create payment order.' });
  }
});

// POST /api/payments/verify
router.post('/verify', optionalJwt, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
      planName,
      amount,
      billingCycle = 'monthly',
      paymentMethod = 'Razorpay Gateway',
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      res.status(400).json({
        success: false,
        message: 'Order ID and Payment ID are required to verify transaction.',
      });
      return;
    }

    const configured = isRazorpayLiveConfigured();

    // Cryptographic HMAC SHA-256 verification when signature is present
    if (configured && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac('sha256', config.razorpay.keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        res.status(400).json({
          success: false,
          message: 'Payment verification failed: Invalid cryptographic signature from Razorpay.',
        });
        return;
      }
    }

    // Determine subscription validity based on cycle
    const now = new Date();
    const validUntilDate = new Date(now);
    if (billingCycle === 'annual' || billingCycle === 'yearly') {
      validUntilDate.setFullYear(validUntilDate.getFullYear() + 1);
    } else if (billingCycle === 'quarterly') {
      validUntilDate.setMonth(validUntilDate.getMonth() + 3);
    } else {
      validUntilDate.setMonth(validUntilDate.getMonth() + 1);
    }

    const targetTier = planId?.includes('elite') ? 'elite' : 'pro';

    // Record payment in database
    const paymentRecord: PaymentRecord = {
      id: 'pay_' + Date.now(),
      userId: req.user?.id || 'usr_member',
      userEmail: req.user?.email || 'player@knightesline.com',
      userName: req.user?.name || 'Academy Student',
      planId: planId || 'plan_pro',
      planName: planName || 'Knightesline Membership',
      billingCycle,
      amount: Number(amount) || 1499,
      currency: 'INR',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature || '',
      paymentMethod: paymentMethod || 'Razorpay Gateway',
      status: 'completed',
      createdAt: new Date().toISOString(),
    };

    const savedPayment = db.createPayment(paymentRecord);

    // Upgrade user subscription in database if user is authenticated
    let updatedUser = undefined;
    if (req.user) {
      updatedUser = db.updateUser(req.user.id, {
        subscriptionTier: targetTier,
        subscriptionValidUntil: validUntilDate.toISOString().split('T')[0],
      });
    }

    res.json({
      success: true,
      message: 'Payment verified and subscription activated successfully!',
      payment: savedPayment,
      user: updatedUser,
    });
  } catch (err) {
    console.error('Verify payment error:', err);
    res.status(500).json({ success: false, message: 'Server error during payment verification.' });
  }
});

// GET /api/payments/history
router.get('/history', authenticateJwt, (req: AuthRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  const payments = db.findPaymentsByUserId(req.user.id);
  res.json({
    success: true,
    payments,
  });
});

// POST /api/payments/webhook
router.post('/webhook', (req: Request, res: Response): void => {
  const secret = config.razorpay.keySecret;
  const signature = req.headers['x-razorpay-signature'] as string;

  if (signature && isRazorpayLiveConfigured()) {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (expectedSignature !== signature) {
      res.status(400).json({ status: 'failure', message: 'Invalid webhook signature' });
      return;
    }
  }

  const event = req.body.event;
  console.log('[Razorpay Webhook] Received Event:', event);

  res.json({ status: 'ok' });
});

export default router;
