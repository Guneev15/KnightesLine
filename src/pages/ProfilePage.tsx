import React from 'react';
import { User, Award, Flame, Trophy, Calendar, ShieldCheck, Edit3 } from 'lucide-react';
import { shatranjStore, MOCK_USERS } from '../services/store';

export const ProfilePage: React.FC = () => {
  const user = shatranjStore.getUser() || MOCK_USERS.student;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Profile Header */}
      <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-3xl object-cover ring-4 ring-amber-500/30 shadow-2xl"
        />

        <div className="space-y-2 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                {user.role} Member
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {user.name}
              </h1>
            </div>

            <div className="flex items-center gap-2 self-center sm:self-auto">
              <span className="text-xs px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-mono">
                {user.email}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 italic">
            "{user.learningGoal || 'Ambitious chess player aiming for tournament master titles.'}"
          </p>
        </div>
      </div>

      {/* 3 Metric Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-1 text-center">
          <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">Current Elo</span>
          <div className="text-3xl font-black text-amber-400 font-mono">{user.rating}</div>
          <span className="text-[11px] text-emerald-400 font-semibold">+{user.monthlyRatingDelta} rating this month</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-1 text-center">
          <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">Daily Training Streak</span>
          <div className="text-3xl font-black text-orange-400 font-mono flex items-center justify-center gap-1.5">
            <Flame className="w-6 h-6 fill-orange-500 text-orange-500" />
            <span>{user.streakDays} Days</span>
          </div>
          <span className="text-[11px] text-slate-400">All-time record: 24 days</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-1 text-center">
          <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">Academy Experience</span>
          <div className="text-3xl font-black text-purple-400 font-mono">{user.xp} XP</div>
          <span className="text-[11px] text-slate-400">Level {user.level} Grandmaster Candidate</span>
        </div>
      </div>

      {/* Trophy & Badges Showcase */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Unlocked Badges & Achievements</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {user.badges.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-2 text-center hover:border-amber-500/40 transition-colors"
            >
              <div className="text-3xl">{b.icon}</div>
              <h3 className="text-xs font-bold text-white">{b.name}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">{b.description}</p>
              <span className="text-[10px] text-amber-400/80 font-mono block pt-1">
                Unlocked {b.unlockedAt}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
