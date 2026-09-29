import React from 'react';
import { Crown, Heart, Shield, Award, Sparkles, CheckCircle2, Users, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenTrialModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenTrialModal }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Visual Storytelling */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-bold font-serif-classic tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Our Noble Origin & Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 leading-tight font-serif-classic">
          "Chess is a royal art. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 font-serif-garamond italic">
            Mastering it should inspire noble intuition."
          </span>
        </h1>
        <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-serif-garamond text-lg">
          We founded Knightesline because we were frustrated watching enthusiastic young minds get bored by dry 400-page notation textbooks and impersonal mass coaching centers.
        </p>
      </div>

      {/* The Problem vs Our Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* The Old Way */}
        <div className="p-8 rounded-3xl border border-red-500/20 bg-red-500/5 space-y-4 classic-card">
          <div className="text-xs font-bold text-red-400 uppercase tracking-wider font-serif-classic">The Traditional Problem</div>
          <h2 className="text-xl font-bold text-white font-serif-classic">How Chess Has Been Taught for Decades</h2>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">✕</span>
              <span>Memorizing opening lines like homework without understanding pawn ideas.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">✕</span>
              <span>Parents left in the dark with zero measurable progress metrics or reports.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">✕</span>
              <span>Dry, boring lectures with no real-time interactive piece movement.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">✕</span>
              <span>Young students quitting after plateauing at 900 Elo rating.</span>
            </li>
          </ul>
        </div>

        {/* The Knightesline Academy Way */}
        <div className="p-8 rounded-3xl border border-amber-500/30 bg-amber-500/5 space-y-4 classic-card">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider font-serif-classic">The Knightesline Way</div>
          <h2 className="text-xl font-bold text-white font-serif-classic">Active, Regal & Measurable Mastery</h2>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Interactive dual-cursor boards where you try every single move yourself.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>FIDE Titled Mentors who treat you like a future grandmaster, not an invoice.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Dedicated Parent Dashboard with plain-English attendance and progress logs.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Gamified streaks, daily puzzle gym, and AI engine blunder alerts.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Core Methodology Pillars */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white text-center font-serif-classic">Our 3 Classical Pillars of Mastery</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl classic-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold flex items-center justify-center font-serif-classic">
              I
            </div>
            <h3 className="text-base font-bold text-white font-serif-classic">Pattern Recognition First</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-serif-garamond text-sm">
              We train your eyes to spot forks, pins, and undefended squares in under 2 seconds. Calculation becomes effortless once the patterns are subconscious.
            </p>
          </div>

          <div className="p-6 rounded-2xl classic-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold flex items-center justify-center font-serif-classic">
              II
            </div>
            <h3 className="text-base font-bold text-white font-serif-classic">Understand, Don't Memorize</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-serif-garamond text-sm">
              Why do Grandmasters push the c-pawn in the Queen's Gambit? We teach the tactical story behind every opening so you know what to do even when your opponent plays an unusual move.
            </p>
          </div>

          <div className="p-6 rounded-2xl classic-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold flex items-center justify-center font-serif-classic">
              III
            </div>
            <h3 className="text-base font-bold text-white font-serif-classic">Noble Resilience & Composure</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-serif-garamond text-sm">
              Chess teaches patience, emotional composure under time pressure, and sportsmanship. We help young players handle losses as valuable learning data, not discouragement.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-10 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 via-slate-900 to-[#0e1218] text-center space-y-4 classic-card gold-filament">
        <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif-classic">Experience Knightesline Academy for Free</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-serif-garamond text-base">
          Book a 45-minute live trial session with an International Master. See how our classical pedagogy transforms your tactical vision.
        </p>
        <button
          onClick={onOpenTrialModal}
          className="btn-classic-gold px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2"
        >
          <span>Book Your Free Trial ♞</span>
        </button>
      </div>

    </div>
  );
};
