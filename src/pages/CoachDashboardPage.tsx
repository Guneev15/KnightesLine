import React, { useState } from 'react';
import {
  Users,
  Calendar,
  DollarSign,
  Star,
  CheckCircle2,
  Clock,
  Video,
  Plus,
  TrendingUp,
  FileText,
  Upload
} from 'lucide-react';
import { shatranjStore } from '../services/store';

interface CoachDashboardProps {
  onNavigate: (path: string, param?: string) => void;
}

export const CoachDashboardPage: React.FC<CoachDashboardProps> = ({ onNavigate }) => {
  const isLoggedIn = shatranjStore.isLoggedIn();
  const coach = shatranjStore.getCoachById('c1') || shatranjStore.getCoaches()[0];
  const [slots, setSlots] = useState<string[]>(coach.availableSlots);
  const [newSlot, setNewSlot] = useState('');

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-2xl">
          ♟
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white font-serif-classic">Faculty Portal</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Please log in with your coach credentials to manage student rosters, schedule live sessions, and view earnings.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('login')}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            Coach Log In
          </button>
        </div>
      </div>
    );
  }

  const [students, setStudents] = useState([
    { id: '1', name: 'Aryan Sharma', rating: 1248, attendance: '100%', lastSeen: 'Today 5:00 PM', notes: 'Working on Italian Game prophylaxis' },
    { id: '2', name: 'Devansh Rao', rating: 1580, attendance: '95%', lastSeen: 'Yesterday', notes: 'Mastering King and Pawn opposition' },
    { id: '3', name: 'Kabir Verma', rating: 1120, attendance: '90%', lastSeen: '2 days ago', notes: 'Improving opening piece coordination' },
  ]);

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlot.trim()) return;
    setSlots(prev => [...prev, newSlot.trim()]);
    setNewSlot('');
  };

  const handleRemoveSlot = (slotToRemove: string) => {
    setSlots(prev => prev.filter(s => s !== slotToRemove));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-500/20">
        <div>
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-serif-classic">
            Faculty Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1 font-serif-classic">
            Faculty Dashboard • {coach.name} ({coach.title})
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-serif-garamond text-sm">
            Manage your student roster, today's live classes, assignments, and availability slots.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('classroom')}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2"
          >
            <Video className="w-4 h-4" />
            <span>Launch Live Classroom ♟</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Monthly Earnings */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Month Earnings</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-emerald-400 font-mono">₹48,500</span>
          </div>
          <span className="text-[11px] text-slate-400 block">32 sessions conducted</span>
        </div>

        {/* Active Students */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Mentees</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-white font-mono">24 Students</span>
          </div>
          <span className="text-[11px] text-emerald-400 block font-medium">+3 new trial conversions</span>
        </div>

        {/* Coach Rating */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Student Rating</span>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-amber-400 font-mono">{coach.rating}</span>
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
          <span className="text-[11px] text-slate-400 block">From {coach.reviewCount} parent reviews</span>
        </div>

        {/* Hours Coached */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Hours</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-white font-mono">340+ hrs</span>
          </div>
          <span className="text-[11px] text-slate-400 block">11 years coaching experience</span>
        </div>

      </div>

      {/* Main Grid: Student Roster & Availability Manager */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Student Roster & Homework */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Assigned Students & Progress</span>
            </h2>
            <span className="text-xs text-slate-400">{students.length} Total Students</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden divide-y divide-slate-800/80">
            {students.map((st) => (
              <div key={st.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{st.name}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400">
                      {st.rating} Elo
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-semibold">
                      Att: {st.attendance}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Coach Note: <span className="text-slate-200">{st.notes}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => onNavigate('analysis')}
                    className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                  >
                    Review Games
                  </button>
                  <button
                    onClick={() => onNavigate('classroom')}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
                  >
                    Open Board
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Assignment Uploader Form */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>Assign Practice Homework / PGN to Student</span>
            </span>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Assignment title e.g. '5 Puzzles on Greek Gift + Sicilian Defense Study'"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <button className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs">
                Upload & Notify Mentee
              </button>
            </div>
          </div>
        </div>

        {/* Right: Availability Slots Manager */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Manage Weekly Availability</span>
          </h2>

          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-4 text-xs">
            <p className="text-slate-400">
              Students and parents can only book trial classes during your configured open slots.
            </p>

            <div className="space-y-2">
              {slots.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="font-semibold text-slate-200">{s}</span>
                  <button
                    onClick={() => handleRemoveSlot(s)}
                    className="text-red-400 hover:text-red-300 text-[11px] font-bold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddSlot} className="pt-2 flex gap-2">
              <input
                type="text"
                value={newSlot}
                onChange={(e) => setNewSlot(e.target.value)}
                placeholder="e.g. Wed 5:30 PM"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-xs text-white"
              >
                Add Slot
              </button>
            </form>
          </div>

          {/* Quick Schedule Today */}
          <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-2 text-xs">
            <span className="font-bold text-amber-300 block">Today's Class Schedule</span>
            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span>Aryan Sharma (1-on-1):</span>
                <span className="font-bold text-white">5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Under-12 Group Tactics:</span>
                <span className="font-bold text-white">6:30 PM</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
