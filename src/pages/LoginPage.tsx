import React, { useState } from 'react';
import { Crown, Mail, Lock, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { shatranjStore } from '../services/store';
import { audioService } from '../services/audioService';
import { UserRole } from '../types';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRoleQuickLogin = (role: UserRole) => {
    shatranjStore.setRole(role);
    audioService.playMove();

    if (role === 'student') onNavigate('student-dashboard');
    else if (role === 'parent') onNavigate('parent-dashboard');
    else if (role === 'coach') onNavigate('coach-dashboard');
    else if (role === 'admin') onNavigate('admin-dashboard');
  };

  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (email.includes('admin')) handleRoleQuickLogin('admin');
    else if (email.includes('coach')) handleRoleQuickLogin('coach');
    else if (email.includes('parent')) handleRoleQuickLogin('parent');
    else {
      const namePart = email.split('@')[0];
      const displayName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      shatranjStore.loginWithUser({
        id: 'usr_' + Date.now(),
        name: displayName,
        email,
        phone: '',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        rating: 1200,
        monthlyRatingDelta: 0,
        streakDays: 1,
        xp: 150,
        level: 1,
        subscriptionTier: 'starter',
        badges: [],
      });
      audioService.playMove();
      onNavigate('student-dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      
      {/* Brand Icon & Heading */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20 border border-amber-300/40">
          <Crown className="w-6 h-6 fill-slate-950" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-serif-classic tracking-wide">
          Welcome to Knightesline
        </h1>
        <p className="text-xs text-slate-400 font-serif-garamond text-sm">
          Log in to access your royal masterclasses, tactical sparring, and private mentor hub.
        </p>
      </div>

      {/* 1-Click Demo Logins (For Testing & Evaluating Dashboards) */}
      <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick 1-Click Demo Login</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-tight">
          Select any persona to immediately explore their personalized dashboard:
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => handleRoleQuickLogin('student')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-white flex items-center justify-between"
          >
            <span>🎓 Student Demo</span>
            <span className="text-amber-400">→</span>
          </button>
          <button
            onClick={() => handleRoleQuickLogin('parent')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-white flex items-center justify-between"
          >
            <span>👨‍👩‍👧 Parent Demo</span>
            <span className="text-amber-400">→</span>
          </button>
          <button
            onClick={() => handleRoleQuickLogin('coach')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-white flex items-center justify-between"
          >
            <span>🏆 Coach Demo</span>
            <span className="text-amber-400">→</span>
          </button>
          <button
            onClick={() => handleRoleQuickLogin('admin')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-white flex items-center justify-between"
          >
            <span>⚡ Admin Demo</span>
            <span className="text-amber-400">→</span>
          </button>
        </div>
      </div>

      {/* Standard Email / Password Form */}
      <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl space-y-4">
        <form onSubmit={handleStandardSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. aryan.chess@gmail.com"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In to Academy</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-400">
          <span>New to Knightesline? </span>
          <button
            onClick={() => onNavigate('signup')}
            className="font-bold text-amber-400 hover:underline"
          >
            Create an Account & Onboard
          </button>
        </div>
      </div>

    </div>
  );
};
