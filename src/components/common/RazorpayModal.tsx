import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  KeyRound,
  Loader2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { shatranjStore } from '../../services/store';
import { audioService } from '../../services/audioService';
import { SubscriptionPlan, PaymentRecord } from '../../types';
import { RazorpayLogo, UpiLogo, VisaLogo, MastercardLogo, RupayLogo } from './PaymentLogos';
import { api } from '../../services/api';
import { openOfficialRazorpay } from '../../services/razorpayService';

interface RazorpayModalProps {
  isOpen: boolean;
  plan: SubscriptionPlan | null;
  billingCycle: 'monthly' | 'yearly';
  onClose: () => void;
  onPaymentSuccess?: (payment: PaymentRecord) => void;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  plan,
  billingCycle,
  onClose,
  onPaymentSuccess,
}) => {
  const [gatewayStatus, setGatewayStatus] = useState<{
    isConfigured: boolean;
    keyId: string;
    mode: 'live' | 'test';
    merchantName: string;
  } | null>(null);

  const [isLoadingStatus, setIsLoadingStatus] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedPayment, setCompletedPayment] = useState<PaymentRecord | null>(null);

  // Key Configuration form
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [inputKeyId, setInputKeyId] = useState('');
  const [inputKeySecret, setInputKeySecret] = useState('');
  const [isSavingKeys, setIsSavingKeys] = useState(false);
  const [keySuccessMessage, setKeySuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      checkGatewayStatus();
      setErrorMessage(null);
      setCompletedPayment(null);
    }
  }, [isOpen]);

  const checkGatewayStatus = async () => {
    setIsLoadingStatus(true);
    const storedKey =
      typeof window !== 'undefined' ? localStorage.getItem('shatranj_razorpay_key_id') : null;

    try {
      const res = await api.payments.getGatewayStatus();
      if (
        res &&
        res.keyId &&
        !res.keyId.includes('knightesline') &&
        !res.keyId.includes('setup_required')
      ) {
        setGatewayStatus({
          isConfigured: res.isConfigured,
          keyId: res.keyId,
          mode: res.mode,
          merchantName: res.merchantName,
        });
        setInputKeyId(res.keyId);
        setIsLoadingStatus(false);
        return;
      }
    } catch {
      // Standalone Cloudflare Worker hosting mode
    }

    if (storedKey && (storedKey.startsWith('rzp_test_') || storedKey.startsWith('rzp_live_'))) {
      setGatewayStatus({
        isConfigured: true,
        keyId: storedKey,
        mode: storedKey.startsWith('rzp_live_') ? 'live' : 'test',
        merchantName: 'Knightesline Academy Pvt. Ltd.',
      });
      setInputKeyId(storedKey);
    } else {
      setGatewayStatus({
        isConfigured: false,
        keyId: 'rzp_setup_required',
        mode: 'test',
        merchantName: 'Knightesline Academy Pvt. Ltd.',
      });
    }
    setIsLoadingStatus(false);
  };

  if (!isOpen || !plan) return null;

  const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
  const currentUser = shatranjStore.getUser();

  const handleSaveKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKeyId.trim()) {
      setErrorMessage('Please enter your Razorpay Key ID.');
      return;
    }

    const cleanKeyId = inputKeyId.trim();
    const cleanKeySecret = inputKeySecret.trim();

    if (!cleanKeyId.startsWith('rzp_test_') && !cleanKeyId.startsWith('rzp_live_')) {
      setErrorMessage('Razorpay Key ID must start with rzp_test_ or rzp_live_.');
      return;
    }

    setIsSavingKeys(true);
    setErrorMessage(null);
    setKeySuccessMessage(null);

    // Save to browser localStorage so it works on Cloudflare domain
    if (typeof window !== 'undefined') {
      localStorage.setItem('shatranj_razorpay_key_id', cleanKeyId);
      if (cleanKeySecret) {
        localStorage.setItem('shatranj_razorpay_key_secret', cleanKeySecret);
      }
    }

    // Also attempt saving to backend if available
    try {
      await api.payments.configureGateway({
        keyId: cleanKeyId,
        keySecret: cleanKeySecret || 'client_stored',
      });
    } catch {
      // Runs in standalone client mode if backend is not hosted on same worker
    }

    setKeySuccessMessage('Razorpay API Key saved and activated successfully!');
    setGatewayStatus({
      isConfigured: true,
      keyId: cleanKeyId,
      mode: cleanKeyId.startsWith('rzp_live_') ? 'live' : 'test',
      merchantName: 'Knightesline Academy Pvt. Ltd.',
    });
    setShowKeyConfig(false);
    setIsSavingKeys(false);
  };

  const handleLaunchRazorpay = async () => {
    setIsProcessing(true);
    setErrorMessage(null);
    audioService.playMove();

    // Trigger genuine Razorpay Checkout SDK
    await openOfficialRazorpay({
      plan,
      billingCycle,
      user: {
        id: currentUser?.id,
        name: currentUser?.name,
        email: currentUser?.email,
        phone: currentUser?.phone,
      },
      onSuccess: (payment) => {
        setIsProcessing(false);
        setCompletedPayment(payment);
        audioService.playVictory();

        try {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#f59e0b', '#10b981', '#3b82f6', '#d4af37'],
          });
        } catch {}

        if (onPaymentSuccess) {
          onPaymentSuccess(payment);
        }
      },
      onError: (err) => {
        setIsProcessing(false);
        setErrorMessage(err);
        if (
          err.includes('Credentials required') ||
          err.includes('API Credentials') ||
          err.includes('Authentication failed')
        ) {
          setShowKeyConfig(true);
        }
      },
      onDismiss: () => {
        setIsProcessing(false);
      },
    });
  };

  const handleClose = () => {
    setCompletedPayment(null);
    setIsProcessing(false);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#090d16] border border-slate-700/80 shadow-2xl overflow-hidden text-slate-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#07132b] via-[#091b3b] to-[#07132b] border-b border-blue-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-base shadow-lg shadow-blue-500/25">
              R
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Official Razorpay Payment Gateway</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-[11px] text-blue-300 flex items-center gap-1">
                <span>Merchant:</span>
                <span className="font-semibold text-white">Knightesline Academy Pvt. Ltd.</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Summary */}
        <div className="px-6 py-4 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between text-xs">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-sm">{plan.name} Membership</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                {billingCycle}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Full Grandmaster Curriculum + Live FIDE Training
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Total Payable</span>
            <span className="text-xl font-black text-amber-400 font-mono">
              ₹{price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {!completedPayment ? (
            <div className="space-y-5">
              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-xs text-red-200 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-bold">Payment Error</div>
                    <div className="text-[11px] mt-0.5 text-red-300">{errorMessage}</div>
                  </div>
                </div>
              )}

              {/* Success Alert for keys */}
              {keySuccessMessage && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{keySuccessMessage}</span>
                </div>
              )}

              {/* Gateway Status Badge */}
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Gateway Status:</span>
                  </span>

                  {isLoadingStatus ? (
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Loader2 className="w-3 h-3 animate-spin" /> Checking...
                    </span>
                  ) : gatewayStatus?.isConfigured ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Razorpay Active ({gatewayStatus.mode === 'live' ? 'Live Production' : 'Test Mode'})
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Razorpay Keys Needed
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {gatewayStatus?.isConfigured
                    ? 'Official Razorpay Checkout popup will open. Complete payment using UPI QR, Google Pay, PhonePe, Cards, or NetBanking.'
                    : 'To process real UPI QR and Card payments, enter your Razorpay Key ID and Secret below or configure in .env.'}
                </p>

                {/* Toggle Key Configuration */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowKeyConfig(!showKeyConfig)}
                    className="text-[11px] text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
                  >
                    <KeyRound className="w-3 h-3" />
                    <span>{showKeyConfig ? 'Hide Gateway Settings' : 'Configure Razorpay API Keys'}</span>
                    {showKeyConfig ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              {/* Collapsible Key Configuration Form */}
              {showKeyConfig && (
                <form
                  onSubmit={handleSaveKeys}
                  className="p-4 rounded-xl border border-blue-900/50 bg-[#071329] space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-blue-400" />
                      Razorpay Credentials Setup
                    </span>
                    <a
                      href="https://dashboard.razorpay.com/app/keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-blue-400 hover:text-blue-300 underline flex items-center gap-0.5"
                    >
                      Get Free Keys <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Razorpay Key ID
                    </label>
                    <input
                      type="text"
                      value={inputKeyId}
                      onChange={(e) => setInputKeyId(e.target.value)}
                      placeholder="rzp_test_... or rzp_live_..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Razorpay Key Secret
                    </label>
                    <input
                      type="password"
                      value={inputKeySecret}
                      onChange={(e) => setInputKeySecret(e.target.value)}
                      placeholder="Enter Razorpay Secret"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-400 font-mono"
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="submit"
                      disabled={isSavingKeys}
                      className="flex-1 py-2 rounded-lg font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                    >
                      {isSavingKeys ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" /> Saving...
                        </>
                      ) : (
                        'Save & Activate Gateway'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowKeyConfig(false)}
                      className="px-3 py-2 rounded-lg text-xs bg-slate-800 text-slate-300 hover:bg-slate-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Supported Payment Channels */}
              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-slate-400">
                  Accepted Payment Methods via Official Gateway:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl border border-slate-800/80 bg-slate-900/40 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                      UPI
                    </div>
                    <div>
                      <div className="font-semibold text-white text-[11px]">Instant UPI & QR</div>
                      <div className="text-[10px] text-slate-400">GPay, PhonePe, Paytm, CRED</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl border border-slate-800/80 bg-slate-900/40 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
                      💳
                    </div>
                    <div>
                      <div className="font-semibold text-white text-[11px]">Cards (3D Secure)</div>
                      <div className="text-[10px] text-slate-400">Visa, Mastercard, RuPay</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl border border-slate-800/80 bg-slate-900/40 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-xs">
                      🏦
                    </div>
                    <div>
                      <div className="font-semibold text-white text-[11px]">NetBanking</div>
                      <div className="text-[10px] text-slate-400">HDFC, SBI, ICICI, Axis +50</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl border border-slate-800/80 bg-slate-900/40 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
                      ⚡
                    </div>
                    <div>
                      <div className="font-semibold text-white text-[11px]">Instant Activation</div>
                      <div className="text-[10px] text-slate-400">Automated Webhook Sync</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Gateway Trigger Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleLaunchRazorpay}
                  disabled={isProcessing}
                  className="w-full py-4 rounded-xl font-black text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Launching Razorpay Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Pay ₹{price.toLocaleString('en-IN')} with Razorpay</span>
                    </>
                  )}
                </button>
              </div>

              {/* Security & Verification Badges */}
              <div className="pt-1 flex flex-col items-center gap-2">
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>256-Bit SSL Encrypted • PCI-DSS Level 1 Compliant</span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap justify-center">
                  <RazorpayLogo className="h-3" />
                  <UpiLogo className="h-3" />
                  <VisaLogo className="h-3" />
                  <MastercardLogo className="h-3.5" />
                  <RupayLogo className="h-3" />
                </div>
              </div>
            </div>
          ) : (
            /* Verified Payment Success Screen */
            <div className="text-center space-y-4 py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-black text-white">Payment Verified & Activated!</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Congratulations! Your {plan.name} Academy Membership is now officially active.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-700 bg-slate-900 text-left text-xs space-y-2 max-w-sm mx-auto font-sans">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Payment Status</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    VERIFIED & COMPLETED
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Invoice Number:</span>
                  <span className="font-mono text-amber-400 font-bold">
                    {completedPayment.invoiceNo}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Amount Paid:</span>
                  <span className="font-bold text-white font-mono text-sm">
                    ₹{completedPayment.amount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Gateway:</span>
                  <span className="font-medium text-blue-300">Razorpay India</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Payment Method:</span>
                  <span className="font-medium text-slate-200">
                    {completedPayment.paymentMethod}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="w-full py-3 rounded-xl font-black text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-lg shadow-amber-500/25"
                >
                  Enter Your Grandmaster Dashboard ♟
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
