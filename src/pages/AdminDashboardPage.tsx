import React, { useState } from 'react';
import {
  Users,
  DollarSign,
  TrendingUp,
  BookOpen,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Edit3,
  Trash2,
  Plus,
  Search,
  Sparkles,
  Award
} from 'lucide-react';
import { shatranjStore } from '../services/store';
import { FreeTrialBooking, SubscriptionPlan, Coach, Course } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'bookings' | 'pricing' | 'courses' | 'coaches'>('analytics');
  
  // Data from persistent store
  const [bookings, setBookings] = useState<FreeTrialBooking[]>(shatranjStore.getTrialBookings());
  const [plans, setPlans] = useState<SubscriptionPlan[]>(shatranjStore.getPlans());
  const coaches = shatranjStore.getCoaches();
  const courses = shatranjStore.getCourses();

  // Price editor state
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [newMonthlyPrice, setNewMonthlyPrice] = useState<number>(799);

  const handleUpdatePrice = (plan: SubscriptionPlan) => {
    const updated = {
      ...plan,
      monthlyPrice: newMonthlyPrice,
      yearlyPrice: newMonthlyPrice * 10,
    };
    shatranjStore.updatePlan(updated);
    setPlans(shatranjStore.getPlans());
    setEditingPlanId(null);
  };

  const handleToggleBookingStatus = (bookingId: string) => {
    const updated = bookings.map(b => {
      if (b.id !== bookingId) return b;
      return {
        ...b,
        status: b.status === 'confirmed' ? 'completed' : 'confirmed'
      } as FreeTrialBooking;
    });
    setBookings(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-500/20">
        <div>
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5 font-serif-classic">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Executive Platform Operations</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1 font-serif-classic">
            Knightesline Admin Console
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-serif-garamond text-sm">
            Real-time academy performance, trial bookings pipeline, tuition CMS, and titled faculty roster.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
          {[
            { id: 'analytics', label: 'Analytics' },
            { id: 'bookings', label: `Trial Pipeline (${bookings.length})` },
            { id: 'pricing', label: 'Pricing CMS' },
            { id: 'courses', label: 'Courses' },
            { id: 'coaches', label: 'Faculty' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`
                px-3 py-1.5 rounded-lg font-semibold transition-all
                ${activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: Business Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          {/* 4 Core Business KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Monthly Recurring (MRR)</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-emerald-400 font-mono">₹4,82,000</span>
              </div>
              <span className="text-[11px] text-emerald-400 block font-medium">+18.4% growth vs last month</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Paid Students</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white font-mono">1,420</span>
              </div>
              <span className="text-[11px] text-slate-400 block">Churn rate: 2.1% (Low)</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Trial → Paid Conversion</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-amber-400 font-mono">82.4%</span>
              </div>
              <span className="text-[11px] text-amber-300 block font-medium">High conversion post-trial</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Coach Utilization</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-purple-400 font-mono">91.5%</span>
              </div>
              <span className="text-[11px] text-slate-400 block">50 Titled Coaches active</span>
            </div>

          </div>

          {/* Conversion Funnel Breakdown */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
            <h2 className="text-base font-bold text-white">Full Free-Trial Conversion Funnel (Past 30 Days)</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400">1. Website Visitors</span>
                <div className="text-2xl font-bold font-mono text-white">28,450</div>
                <span className="text-[10px] text-slate-500">Landing page hits</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400">2. Free Trial Booked</span>
                <div className="text-2xl font-bold font-mono text-amber-400">1,820</div>
                <span className="text-[10px] text-amber-400/80">6.4% click-to-book</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400">3. Attended Trial</span>
                <div className="text-2xl font-bold font-mono text-blue-400">1,610</div>
                <span className="text-[10px] text-blue-400/80">88.4% attendance rate</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400">4. Paid Subscription</span>
                <div className="text-2xl font-bold font-mono text-emerald-400">1,326</div>
                <span className="text-[10px] text-emerald-400/80">82.4% conversion to paid</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Free Trial Pipeline */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Prospective Student Free Trials</h2>
            <span className="text-xs text-slate-400">Total: {bookings.length} Bookings</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden divide-y divide-slate-800/80 text-xs">
            {bookings.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No trial bookings yet. Real-time bookings from visitors will appear here automatically.
              </div>
            ) : (
              bookings.map((b) => (
                <div key={b.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{b.studentName}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/30">
                        {b.playerLevel}
                      </span>
                      <span className="text-[10px] text-slate-400">{b.ageGrade}</span>
                    </div>
                    <div className="text-slate-300">
                      Phone: <strong className="text-white">{b.phone}</strong> | Email: <strong className="text-white">{b.email}</strong>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Preferred Slot: <span className="text-amber-300 font-semibold">{b.preferredDate} at {b.preferredTime}</span> • Coach: {b.coachPreference}
                    </div>
                    <div className="text-[11px] text-slate-400 italic">
                      Goal: "{b.learningGoal}"
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${b.status === 'confirmed' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}>
                      ● {b.status.toUpperCase()}
                    </span>
                    <button
                      onClick={() => handleToggleBookingStatus(b.id)}
                      className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                    >
                      Toggle Status
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Pricing CMS (Allows editing pricing without code changes!) */}
      {activeTab === 'pricing' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-amber-200">
            💡 <strong>CMS Architecture:</strong> Pricing and membership tiers can be modified directly from this dashboard. Changes persist automatically to localStorage and update throughout the website instantly.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div key={p.id} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  {p.popular && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950">Popular</span>}
                </div>

                {editingPlanId === p.id ? (
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400">Monthly Price (INR):</label>
                    <input
                      type="number"
                      value={newMonthlyPrice}
                      onChange={(e) => setNewMonthlyPrice(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleUpdatePrice(p)}
                        className="flex-1 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold"
                      >
                        Save Price
                      </button>
                      <button
                        onClick={() => setEditingPlanId(null)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-2xl font-black text-amber-400 font-mono">
                      ₹{p.monthlyPrice.toLocaleString('en-IN')}<span className="text-xs text-slate-400">/mo</span>
                    </div>
                    <div className="text-[10px] text-slate-500">Yearly: ₹{p.yearlyPrice.toLocaleString('en-IN')}</div>
                    <button
                      onClick={() => { setEditingPlanId(p.id); setNewMonthlyPrice(p.monthlyPrice); }}
                      className="mt-2 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Plan Pricing</span>
                    </button>
                  </div>
                )}

                <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-400">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Courses CMS */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Academy Curriculum Content</h2>
            <button className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Course</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden divide-y divide-slate-800/80 text-xs">
            {courses.map((c) => (
              <div key={c.id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">{c.title}</div>
                  <div className="text-slate-400 mt-0.5">
                    Level: {c.level} • Instructor: {c.instructorName} • {c.totalDurationHours} hrs
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-mono font-semibold">{c.enrolledCount} enrolled</span>
                  <button className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white">
                    Edit Modules
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Coaches Faculty Manager */}
      {activeTab === 'coaches' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Faculty Management</h2>
            <button className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Onboard New Coach</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden divide-y divide-slate-800/80 text-xs">
            {coaches.map((coach) => (
              <div key={coach.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={coach.avatar} alt={coach.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <div className="font-bold text-white text-sm">{coach.name} ({coach.title})</div>
                    <div className="text-slate-400">
                      FIDE Elo: {coach.fideRating} • Hourly: ₹{coach.hourlyRate} • Rating: {coach.rating} ({coach.reviewCount})
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Verified
                  </span>
                  <button className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white">
                    Edit Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
