import React, { useState } from 'react';
import { Award, CheckCircle2, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { shatranjStore, MOCK_USERS } from '../services/store';
import { RazorpayModal } from '../components/common/RazorpayModal';
import { SubscriptionPlan } from '../types';

interface SubscriptionPageProps {
  onNavigate: (path: string) => void;
}
export const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onNavigate }) => {
  const user = shatranjStore.getUser() || MOCK_USERS.student;
  const plans = shatranjStore.getPlans();
  const [selectedPlanForChange, setSelectedPlanForChange] = useState<SubscriptionPlan | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const currentPlan = plans.find(p => p.id === user.subscriptionTier) || plans[1];

  const handleCancel = () => {
    setIsCancelled(true);
    setShowCancelModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Membership Status
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Subscription & Academy Plan
          </h1>
        </div>

        <button
          onClick={() => onNavigate('payments')}
          className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs font-bold text-slate-200 hover:text-white"
        >
          View Past Invoices →
        </button>
      </div>

      {/* Active Subscription Banner */}
      <div className="p-8 rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 uppercase tracking-wider border border-amber-500/40">
                Active Academy Tier
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                {currentPlan.name} Academy Membership
              </h2>
              <span className="text-xs text-slate-400">
                ₹{currentPlan.monthlyPrice.toLocaleString('en-IN')}/month • Next renewal: {user.subscriptionValidUntil || 'Oct 25, 2026'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isCancelled ? (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
                ● Auto-Renewal Active
              </span>
            ) : (
              <span className="text-xs font-bold text-red-400 bg-red-500/15 px-3 py-1 rounded-full border border-red-500/30">
                ● Cancels at end of billing cycle
              </span>
            )}
          </div>
        </div>

        {/* Features Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-4 border-t border-slate-800 text-slate-300">
          {currentPlan.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Switching Options */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">Switch or Upgrade Tier</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((p) => {
            const isCurrent = p.id === currentPlan.id;
            return (
              <div
                key={p.id}
                className={`p-5 rounded-2xl border text-xs space-y-3 ${isCurrent ? 'border-amber-500/50 bg-slate-900/90' : 'border-slate-800 bg-slate-900/40'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">{p.name}</span>
                  {isCurrent && <span className="text-[10px] text-amber-400 font-bold">Current</span>}
                </div>
                <div className="text-lg font-bold text-white font-mono">
                  ₹{p.monthlyPrice.toLocaleString('en-IN')}<span className="text-xs text-slate-400 font-normal">/mo</span>
                </div>
                <p className="text-slate-400 text-[11px]">{p.tagline}</p>
                <button
                  disabled={isCurrent}
                  onClick={() => setSelectedPlanForChange(p)}
                  className={`w-full py-2 rounded-xl font-bold transition-colors ${isCurrent ? 'bg-slate-800 text-slate-500 cursor-default' : 'bg-amber-500 hover:bg-amber-400 text-slate-950'}`}
                >
                  {isCurrent ? 'Active Plan' : `Switch to ${p.name}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cancellation Link */}
      {!isCancelled && (
        <div className="pt-6 border-t border-slate-800/80 text-xs text-slate-500 flex justify-between items-center">
          <span>Need to pause or cancel your subscription?</span>
          <button
            onClick={() => setShowCancelModal(true)}
            className="text-red-400 hover:text-red-300 font-semibold"
          >
            Cancel Subscription
          </button>
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700 max-w-sm w-full space-y-4 text-xs text-slate-300">
            <h4 className="text-base font-bold text-white">Are you sure you want to cancel?</h4>
            <p>
              Your child will lose access to weekly live coaching with FIDE Masters at the end of this billing cycle on Oct 25.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-800 text-white font-bold"
              >
                Keep My Membership
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 font-bold"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout modal if changing tier */}
      {selectedPlanForChange && (
        <RazorpayModal
          isOpen={true}
          plan={selectedPlanForChange}
          billingCycle="monthly"
          onClose={() => setSelectedPlanForChange(null)}
          onPaymentSuccess={() => setSelectedPlanForChange(null)}
        />
      )}

    </div>
  );
};
