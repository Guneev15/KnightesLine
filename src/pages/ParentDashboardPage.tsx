import React from 'react';
import {
  Shield,
  Heart,
  Calendar,
  CheckCircle2,
  Award,
  CreditCard,
  MessageSquare,
  TrendingUp,
  User,
  Clock,
  ChevronRight
} from 'lucide-react';
import { shatranjStore, MOCK_USERS } from '../services/store';

interface ParentDashboardProps {
  onNavigate: (path: string, param?: string) => void;
  onOpenTrialModal: () => void;
}
export const ParentDashboardPage: React.FC<ParentDashboardProps> = ({ onNavigate }) => {
  const isLoggedIn = shatranjStore.isLoggedIn();
  const child = shatranjStore.getUser();

  if (!isLoggedIn || !child) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
          🛡
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white font-serif-classic">Parent Portal</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Please log in with your parent credentials to monitor your child's lessons, attendance, and coach feedback reports.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('login')}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
          >
            Sign In to Parent Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif-classic">
              Parent Portal • Monitoring {child.name}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-serif-garamond text-base">
            Track your child's academic development, session attendance, and coach evaluations in clear, simple terms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Child Account Verified & Protected</span>
          </span>
        </div>
      </div>

      {/* Top 4 Child Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Rating Growth */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Skill Level</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">{child.rating}</span>
            <span className="text-xs font-bold text-emerald-400">+{child.monthlyRatingDelta} this month</span>
          </div>
          <span className="text-[11px] text-slate-400 block">Class Level: Intermediate Junior</span>
        </div>

        {/* Classes Attended */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Attendance</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-400 font-mono">100%</span>
            <span className="text-xs text-slate-400">(12 of 12 classes)</span>
          </div>
          <span className="text-[11px] text-emerald-400 block font-medium">Perfect attendance award</span>
        </div>

        {/* Learning Streak */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Daily Discipline</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-orange-400 font-mono">{child.streakDays} Days</span>
          </div>
          <span className="text-[11px] text-slate-400 block">Practices 15 mins daily</span>
        </div>

        {/* Membership */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Plan & Billing</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white uppercase">{child.subscriptionTier} Plan</span>
          </div>
          <span className="text-[11px] text-slate-400 block">Next auto-renewal: Oct 25</span>
        </div>

      </div>

      {/* Main Content: Coach Progress Report & Attendance Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Latest Coach Feedback Report */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>Monthly Teacher Evaluation Report</span>
          </h2>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Coach"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white">IM Vikramaditya Rao</div>
                  <div className="text-[10px] text-slate-400">Head Junior Coach • Reviewed Yesterday</div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                Grade: Exceptional (A+)
              </span>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed space-y-2">
              <p>
                "Aryan has shown remarkable concentration this month. During our rook endgame session, he demonstrated great patience instead of rushing his moves. His ability to calculate 3 moves ahead has noticeably sharpened."
              </p>
              <p>
                <strong>Focus Area for next 2 weeks:</strong> We are reinforcing king safety in the opening so he stops giving opponents unnecessary counter-play. Overall, on track for the inter-school tournament next month!"
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs flex items-center justify-between">
              <span className="text-slate-400">Have questions for the teacher?</span>
              <button
                onClick={() => onNavigate('contact')}
                className="font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                Send Message to Coach →
              </button>
            </div>
          </div>

          {/* Child's Earned Badges */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Aryan’s Trophies & Milestones
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {child.badges.map((b) => (
                <div key={b.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
                  <span className="text-2xl">{b.icon}</span>
                  <div className="text-xs font-bold text-white">{b.name}</div>
                  <div className="text-[10px] text-slate-400">{b.unlockedAt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Upcoming Classes & Payments Overview */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Class Schedule & Attendance</span>
          </h2>

          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div>
                <div className="font-bold text-white">Upcoming: Tactical Vision Masterclass</div>
                <div className="text-slate-400 mt-0.5">Today at 5:00 PM IST (with IM Vikram)</div>
              </div>
              <button
                onClick={() => onNavigate('classroom')}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Join with Child
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
              <div>
                <div className="font-bold text-slate-200">Completed: King & Pawn Endgames</div>
                <div className="text-slate-500 mt-0.5">Attended on Sep 22 • 45 mins</div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
              <div>
                <div className="font-bold text-slate-200">Completed: Scholar’s Mate Defense</div>
                <div className="text-slate-500 mt-0.5">Attended on Sep 15 • 45 mins</div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* Quick Billing & Plan Card */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Active Subscription</span>
              <span className="font-mono text-amber-400 font-bold">₹1,499/mo (Pro)</span>
            </div>
            <p className="text-slate-400">
              Includes weekly live coaching, personalized assignments, and recorded lessons.
            </p>
            <div className="pt-1 flex gap-2">
              <button
                onClick={() => onNavigate('payments')}
                className="flex-1 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 hover:text-white font-semibold text-center"
              >
                View Invoices & Receipts
              </button>
              <button
                onClick={() => onNavigate('subscription')}
                className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-center"
              >
                Manage Plan
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
