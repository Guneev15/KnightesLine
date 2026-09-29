import React, { useState } from 'react';
import { Crown, Sparkles, CheckCircle2, ArrowRight, Target, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { shatranjStore } from '../services/store';
import { audioService } from '../services/audioService';
import { api } from '../services/api';

interface SignupPageProps {
  onNavigate: (path: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Onboarding questionnaire answers
  const [level, setLevel] = useState('Beginner (Learning Rules / Fundamentals)');
  const [rating, setRating] = useState('800 - 1200 Elo');
  const [goal, setGoal] = useState('Just stop blundering my queen in the opening');
  const [frequency, setFrequency] = useState('3-4 times a week');
  const [coachingStyle, setCoachingStyle] = useState('Hybrid: Live Group + 1-on-1 Mentorship');

  const handleNextToOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setStep(2);
    audioService.playMove();
  };

  const handleFinishOnboarding = async () => {
    try {
      const res = await api.auth.register({
        name,
        email,
        password: password || 'password123',
        role: 'student',
      });
      if (res.user) {
        shatranjStore.loginWithUser({
          ...res.user,
          learningGoal: goal,
        });
      } else {
        shatranjStore.updateUser({
          name,
          email,
          learningGoal: goal,
        });
      }
    } catch {
      shatranjStore.updateUser({
        name,
        email,
        learningGoal: goal,
      });
    }

    audioService.playVictory();

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    onNavigate('student-dashboard');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-8">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20 border border-amber-300/40">
          <Crown className="w-6 h-6 fill-slate-950" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-serif-classic tracking-wide">
          {step === 1 ? 'Join Knightesline Academy' : 'Personalize Your Journey'}
        </h1>
        <p className="text-xs text-slate-400 font-serif-garamond text-base">
          {step === 1
            ? 'Create your free account to access daily puzzles and trial sessions.'
            : 'Answer 4 quick questions so we can calibrate your learning roadmap.'
          }
        </p>
      </div>

      {step === 1 ? (
        <form onSubmit={handleNextToOnboarding} className="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aryan Sharma"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Create Password</label>
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
            <span>Continue to Onboarding</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 text-center text-xs text-slate-400">
            <span>Already have an account? </span>
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="font-bold text-amber-400 hover:underline"
            >
              Log In
            </button>
          </div>
        </form>
      ) : (
        /* STEP 2: Onboarding Questionnaire */
        <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl space-y-6">
          
          <div className="space-y-2">
            <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
              1. What's your current approximate rating?
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
            >
              <option>Under 800 (Just starting out)</option>
              <option>800 - 1200 Elo (Know rules, regular casual play)</option>
              <option>1200 - 1600 Elo (Intermediate club player)</option>
              <option>1600+ Elo (Tournament / Competitive)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
              2. What is your primary chess goal?
            </label>
            <div className="grid grid-cols-1 gap-2 text-xs">
              {[
                'Just stop blundering my queen in the opening',
                'Break through my rating plateau (+200 Elo)',
                'Prepare for official FIDE rated tournaments',
                'Learn chess from scratch for fun & mental focus',
                'Beat my friends, school rivals & chess bots'
              ].map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`
                    p-3 rounded-xl border text-left font-medium transition-all
                    ${goal === g
                      ? 'border-amber-500 bg-amber-500/15 text-amber-300 font-bold'
                      : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                    }
                  `}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
              3. How often do you want to train?
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {['Daily 15m', '3-4 times/wk', 'Weekends only'].map((f) => (
                <button
                  type="button"
                  key={f}
                  onClick={() => setFrequency(f)}
                  className={`
                    p-2.5 rounded-xl border text-center font-medium
                    ${frequency === f
                      ? 'border-amber-500 bg-amber-500/15 text-amber-300 font-bold'
                      : 'border-slate-800 bg-slate-950 text-slate-300'
                    }
                  `}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleFinishOnboarding}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Complete Setup & Enter Dashboard ♟</span>
          </button>
        </div>
      )}

    </div>
  );
};
