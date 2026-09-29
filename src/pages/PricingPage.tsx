import React, { useState } from 'react';
import { CheckCircle2, Star, ShieldCheck, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { shatranjStore } from '../services/store';
import { RazorpayModal } from '../components/common/RazorpayModal';
import { SubscriptionPlan } from '../types';

interface PricingPageProps {
  onOpenTrialModal: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenTrialModal }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [checkoutPlan, setCheckoutPlan] = useState<SubscriptionPlan | null>(null);
  const plans = shatranjStore.getPlans();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Pricing Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold text-white font-serif-classic leading-tight">
          Invest in Your Royal Chess Growth. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 font-serif-garamond italic">Commencing at ₹799/month.</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 font-serif-garamond text-lg">
          Every membership includes our interactive puzzle gym, structured master courses, and AI game review. First live evaluation session is always 100% complimentary.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-8 rounded-full bg-slate-800 p-1 border border-slate-700 transition-colors relative"
          >
            <div
              className={`w-6 h-6 rounded-full bg-amber-500 transition-transform duration-200 ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-semibold ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-400'}`}>
              Yearly Billing
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
              Save 20%
            </span>
          </div>
        </div>
      </div>

      {/* 3 Main Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => {
          const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
          const monthlyEquivalent = billingCycle === 'yearly' ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              className={`
                p-8 rounded-3xl border transition-all flex flex-col justify-between
                ${plan.popular
                  ? 'border-amber-500 bg-gradient-to-b from-amber-500/10 via-slate-900/80 to-slate-900 shadow-2xl shadow-amber-500/10 relative scale-105 z-10'
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                }
              `}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{plan.tagline}</p>
                </div>

                <div className="py-4 border-y border-slate-800">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-black text-white font-mono">
                      ₹{monthlyEquivalent.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                      Billed annually at ₹{price.toLocaleString('en-IN')} (2 months free)
                    </div>
                  )}
                  <div className="text-[10px] text-slate-400 mt-1">
                    Ideal for: <strong className="text-slate-200">{plan.suitableFor}</strong>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    What's Included:
                  </span>
                  <ul className="space-y-2.5 text-xs">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 space-y-2">
                <button
                  onClick={() => setCheckoutPlan(plan)}
                  className={`
                    w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
                    ${plan.popular
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 shadow-lg shadow-amber-500/25'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }
                  `}
                >
                  <span>Subscribe to {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenTrialModal}
                  className="w-full py-2 text-center text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Or Book Free Trial First →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Box */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-300">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
          <div>
            <div className="font-bold text-white text-sm">100% Satisfaction Guarantee</div>
            <p className="text-slate-400 mt-0.5">
              If you or your child are not completely delighted after your first month, cancel anytime with one click. No cancellation fees.
            </p>
          </div>
        </div>
        <div className="text-center sm:text-right shrink-0">
          <span className="text-[10px] text-slate-500 block">Accepted Payment Modes</span>
          <span className="font-semibold text-white">UPI • Google Pay • PhonePe • Cards • NetBanking</span>
        </div>
      </div>

      {/* Razorpay Checkout Modal */}
      {checkoutPlan && (
        <RazorpayModal
          isOpen={true}
          plan={checkoutPlan}
          billingCycle={billingCycle}
          onClose={() => setCheckoutPlan(null)}
        />
      )}

    </div>
  );
};
