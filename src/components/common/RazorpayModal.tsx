import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, QrCode, CreditCard, Building, Smartphone, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { shatranjStore } from '../../services/store';
import { audioService } from '../../services/audioService';
import { SubscriptionPlan, PaymentRecord } from '../../types';
import { RazorpayLogo, UpiLogo, VisaLogo, MastercardLogo, RupayLogo } from './PaymentLogos';

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
  const [method, setMethod] = useState<'UPI' | 'Credit/Debit Card' | 'Net Banking'>('UPI');
  const [vpa, setVpa] = useState('player@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedPayment, setCompletedPayment] = useState<PaymentRecord | null>(null);

  if (!isOpen || !plan) return null;

  const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    audioService.playMove();

    setTimeout(() => {
      setIsProcessing(false);
      const payment = shatranjStore.addPayment(
        price,
        `${plan.name} Academy Membership (${billingCycle})`,
        method
      );
      setCompletedPayment(payment);
      audioService.playVictory();

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#f59e0b', '#10b981', '#3b82f6']
        });
      } catch {}

      if (onPaymentSuccess) {
        onPaymentSuccess(payment);
      }
    }, 1600);
  };

  const handleClose = () => {
    setCompletedPayment(null);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-[#0d111a] border border-slate-700/80 shadow-2xl overflow-hidden text-slate-200">
        
        {/* Razorpay Brand Header */}
        <div className="px-6 py-4 bg-[#0a1a36] border-b border-blue-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
              R
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Razorpay Checkout</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-[10px] text-blue-200">
                Merchant: Knightesline Academy Pvt Ltd
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-blue-200 hover:text-white hover:bg-blue-900/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Summary */}
        <div className="px-6 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="font-semibold text-white">{plan.name} Membership</span>
            <span className="text-slate-400 ml-1.5">({billingCycle})</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-amber-400">
              ₹{price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Payment Content */}
        <div className="p-6">
          {!completedPayment ? (
            <form onSubmit={handlePay} className="space-y-4">
              
              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('UPI')}
                  className={`
                    p-2.5 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-1 transition-all
                    ${method === 'UPI'
                      ? 'border-blue-500 bg-blue-500/15 text-blue-300'
                      : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                    }
                  `}
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>UPI / QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('Credit/Debit Card')}
                  className={`
                    p-2.5 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-1 transition-all
                    ${method === 'Credit/Debit Card'
                      ? 'border-blue-500 bg-blue-500/15 text-blue-300'
                      : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                    }
                  `}
                >
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>Cards (Visa, MC)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('Net Banking')}
                  className={`
                    p-2.5 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-1 transition-all
                    ${method === 'Net Banking'
                      ? 'border-blue-500 bg-blue-500/15 text-blue-300'
                      : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                    }
                  `}
                >
                  <Building className="w-4 h-4 text-purple-400" />
                  <span>NetBanking</span>
                </button>
              </div>

              {/* Method Detail View */}
              {method === 'UPI' && (
                <div className="space-y-3 p-3.5 rounded-xl border border-slate-800 bg-slate-900/50">
                  <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                    <span className="flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-emerald-400" />
                      <span>Instant UPI Auto-Pay</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      0% Fee
                    </span>
                  </div>

                  {/* UPI Apps Row */}
                  <div className="grid grid-cols-4 gap-2 text-[10px] font-bold text-center">
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">GPay</div>
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">PhonePe</div>
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">Paytm</div>
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">BHIM</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] font-semibold text-slate-400">
                        Or enter UPI ID / VPA
                      </label>
                      <UpiLogo className="h-2.5" containerClassName="h-5 px-1.5 rounded bg-white border border-slate-200/80 flex items-center justify-center" />
                    </div>
                    <input
                      type="text"
                      value={vpa}
                      onChange={(e) => setVpa(e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>
              )}

              {method === 'Credit/Debit Card' && (
                <div className="space-y-3 p-3.5 rounded-xl border border-slate-800 bg-slate-900/50 text-xs">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] font-semibold text-slate-400">Card Number</label>
                      <div className="flex items-center gap-1.5">
                        <VisaLogo className="h-2.5" containerClassName="h-5 px-1.5 rounded bg-white border border-slate-200/80 flex items-center justify-center" />
                        <MastercardLogo className="h-3" containerClassName="h-5 px-1.5 rounded bg-white border border-slate-200/80 flex items-center justify-center" />
                        <RupayLogo className="h-2.5" containerClassName="h-5 px-1.5 rounded bg-white border border-slate-200/80 flex items-center justify-center" />
                      </div>
                    </div>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-400 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Valid Thru</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-400 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">CVV</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-400 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {method === 'Net Banking' && (
                <div className="space-y-2 p-3.5 rounded-xl border border-slate-800 bg-slate-900/50 text-xs">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Select Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-400"
                  >
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India (SBI)</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing with Razorpay...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay ₹{price.toLocaleString('en-IN')} Securely</span>
                  </>
                )}
              </button>

              <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit SSL Encrypted • PCI-DSS Compliant</span>
              </div>

              <div className="pt-1 flex items-center justify-center gap-1.5 flex-wrap">
                <RazorpayLogo className="h-3" />
                <UpiLogo className="h-3" />
                <VisaLogo className="h-3" />
                <MastercardLogo className="h-3.5" />
                <RupayLogo className="h-3" />
              </div>
            </form>
          ) : (
            // Success Screen
            <div className="text-center space-y-4 py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-lg font-black text-white">Payment Successful!</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Your {plan.name} Academy Membership is now activated.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-700 bg-slate-900 text-left text-xs space-y-1.5 max-w-xs mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-400">Invoice No:</span>
                  <span className="font-mono text-amber-400">{completedPayment.invoiceNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Amount Paid:</span>
                  <span className="font-bold text-white">₹{completedPayment.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment Mode:</span>
                  <span className="font-medium text-slate-200">{completedPayment.paymentMethod}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
                >
                  Access Your Member Dashboard ♟
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
