import React, { useState } from 'react';
import { Crown, Heart, Shield, CheckCircle2, Send, Lock } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { PaymentSecurityBadges } from './PaymentLogos';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenTrialModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTrialModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    audioService.playVictory();
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="border-t border-slate-800 bg-[#07090e] text-slate-400 text-sm">
      {/* Pre-footer Callout Banner */}
      <div className="border-b border-slate-800/80 bg-gradient-to-r from-amber-500/10 via-purple-500/5 to-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-serif-classic font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <span>Ascend to Mastery with Knightesline.</span>
              <span className="text-[#d4af37]">♞</span>
            </h3>
            <p className="text-slate-300 text-sm font-serif-garamond text-base">
              Classical discipline. Grandmaster mentorship. Your inaugural evaluation class is complimentary.
            </p>
          </div>
          <button
            onClick={onOpenTrialModal}
            className="px-6 py-3 rounded-xl font-serif-classic font-bold btn-classic-gold text-slate-950 text-sm flex items-center gap-2"
          >
            <span>Book Your Free Trial</span>
            <span>→</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e5c158] via-[#d4af37] to-[#9a7b38] flex items-center justify-center text-slate-950 shadow-md border border-[#f0cf6a]/60">
                <svg viewBox="0 0 45 45" className="w-5 h-5 fill-slate-950 stroke-slate-950">
                  <path d="m 22,10 c 10.5,1 16.5,8 16,29 l -23,0 c 0,-9 10,-6.5 8,-21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="m 24,18 c 0.38,2.91 -5.55,7.37 -8,9 -3,2 -2.82,4.34 -5,4 -1.042,-0.94 1.41,-4.04 3,-6 2.05,-2.53 3.13,-5.74 3,-9 0.69,0.36 1.94,0.36 2.5,-0.5 0.56,-0.86 0.19,-1.86 -0.5,-2.5 -0.69,-0.64 -1.5,-0.64 -2.5,-0.5 -1.03,0.14 -1.97,0.78 -2.5,1.5 -1.25,1.72 -1.25,4.72 -1,6.5 -0.83,0.33 -1.67,0.67 -2.5,1 -0.5,0.2 -1,0.4 -1.5,0.6 C 4,23 3.5,21.5 4,19 4.5,16.5 7,14 10,12 c 3,-2 7,-3 12,-2 z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-serif-classic font-black tracking-wider text-white">
                KNIGHTESLINE <span className="text-[#d4af37] text-sm font-serif-classic font-bold">ACADEMY</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              The premier interactive chess academy designed for young champions, ambitious beginners, and parents who value genuine, measurable intellectual growth.
            </p>

            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 max-w-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Parent-Approved & Child-Safe</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Background-checked certified instructors, recorded classrooms, transparent progress reports, and zero unmonitored chat.
              </p>
            </div>
          </div>

          {/* Column 1: Learn */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Academics</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-amber-400 transition-colors">
                  Structured Curriculum
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-amber-400 transition-colors">
                  Openings & Endgames
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('puzzles')} className="hover:text-amber-400 transition-colors">
                  Tactical Puzzle Gym
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('play')} className="hover:text-amber-400 transition-colors">
                  Spar with Bot Levels
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('analysis')} className="hover:text-amber-400 transition-colors">
                  Deep Game Analysis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('classroom')} className="hover:text-amber-400 transition-colors">
                  Virtual Live Classroom
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Dashboards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('student-dashboard')} className="hover:text-amber-400 transition-colors">
                  Student Learning Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('parent-dashboard')} className="hover:text-amber-400 transition-colors">
                  Parent Monitoring Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('coach-dashboard')} className="hover:text-amber-400 transition-colors">
                  Coach Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin-dashboard')} className="hover:text-amber-400 transition-colors">
                  Admin & CMS Console
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-amber-400 transition-colors">
                  Plans (from ₹799/mo)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('community')} className="hover:text-amber-400 transition-colors">
                  Community Chess Club
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Grandmaster Insights</h4>
            <p className="text-xs text-slate-400">
              Weekly tactical puzzles, opening secrets, and tournament announcements.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter parent or student email"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center justify-center transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Welcome aboard! Check your inbox.</span>
                </div>
              )}
            </form>

            <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" />
              <span>No spam. One-click unsubscribe anytime.</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Payment Badges */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-400">
            <span>© 2026 Knightesline Academy Pvt. Ltd.</span>
            <button onClick={() => onNavigate('about')} className="hover:text-white">About Us</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white">Contact & Support</button>
            <button onClick={() => onNavigate('faq')} className="hover:text-white">FAQ</button>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500 italic">"Your queen called. She wants better backup."</span>
          </div>

          <PaymentSecurityBadges />
        </div>
      </div>
    </footer>
  );
};
