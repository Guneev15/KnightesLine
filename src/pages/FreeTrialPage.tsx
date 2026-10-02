import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Sparkles,
  Shield,
  Award,
  Download,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { shatranjStore } from '../services/store';
import { audioService } from '../services/audioService';
import { notificationService, ACADEMY_CONFIG } from '../services/notificationService';
import { FreeTrialBooking } from '../types';

interface FreeTrialPageProps {
  onNavigate: (path: string) => void;
}

export const FreeTrialPage: React.FC<FreeTrialPageProps> = ({ onNavigate }) => {
  const [level, setLevel] = useState<FreeTrialBooking['playerLevel']>('Complete Beginner');
  const [learningGoal, setLearningGoal] = useState('Build strong fundamentals and master tactical vision');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('5:00 PM IST');
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ageGrade, setAgeGrade] = useState('Age 11 (Grade 6)');
  const [coachPreference, setCoachPreference] = useState('Senior Academy Instructor');
  const [confirmedBooking, setConfirmedBooking] = useState<FreeTrialBooking | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !email || !phone) return;

    const newBooking = shatranjStore.addTrialBooking({
      studentName,
      email,
      phone,
      ageGrade,
      playerLevel: level,
      preferredDate: date,
      preferredTime: time,
      learningGoal,
      coachPreference,
    });

    // Send real-time email notification to krish50023@gmail.com and auto-response to student
    notificationService.sendTrialBookingNotification({
      studentName,
      email,
      phone,
      ageGrade,
      playerLevel: level,
      preferredDate: date,
      preferredTime: time,
      learningGoal,
      coachPreference,
    });

    setConfirmedBooking(newBooking);
    audioService.playVictory();

    try {
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30 font-serif-classic tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Zero Tuition • Complimentary Master Evaluation Class</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-white font-serif-classic">
          Book a Free 1-on-1 Chess Evaluation Class ♞
        </h1>
        <p className="text-sm text-slate-300 max-w-xl mx-auto font-serif-garamond text-base">
          Experience our virtual interactive classroom with a titled master. We'll diagnose your chess level and give you a personal roadmap.
        </p>
      </div>

      {!confirmedBooking ? (
        <form onSubmit={handleSubmit} className="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl space-y-8">
          
          {/* Section 1: Level */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
              1. What is your current chess level?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {([
                'Complete Beginner',
                'Club Player (800-1200)',
                'Intermediate (1200-1600)',
                'Competitive (1600+)'
              ] as const).map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`
                    p-3.5 rounded-xl border text-left font-medium transition-all
                    ${level === lvl
                      ? 'border-amber-500 bg-amber-500/15 text-amber-300 font-bold'
                      : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                    }
                  `}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Date & Slot */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
              2. Select Preferred Date & Time
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Class Date</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Time Slot</span>
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                >
                  <option>4:00 PM IST</option>
                  <option>5:00 PM IST</option>
                  <option>6:30 PM IST</option>
                  <option>7:30 PM IST</option>
                  <option>11:00 AM IST (Weekend)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Student Info */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
              3. Student & Parent Contact Details
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Student / Player Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kabir Verma"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Age / School Grade</label>
                <input
                  type="text"
                  placeholder="e.g. Age 11 (Grade 6)"
                  value={ageGrade}
                  onChange={(e) => setAgeGrade(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="parent@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">WhatsApp Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div className="sm:col-span-2 text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Classroom access link &amp; evaluation schedule will be dispatched to this number.</span>
              </div>
            </div>
          </div>

          {/* Section 4: Learning Goal */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
              4. Primary Goal
            </label>
            <select
              value={learningGoal}
              onChange={(e) => setLearningGoal(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
            >
              <option>Build strong fundamentals and stop giving away pieces</option>
              <option>Learn opening traps and proper piece development</option>
              <option>Sharpen calculation and master tactical patterns</option>
              <option>Tournament preparation & FIDE rating improvement</option>
              <option>Have fun, boost focus, and beat friends & family</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full btn-classic-gold py-4 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xl inline-flex items-center justify-center gap-2"
          >
            <span>Confirm Free Trial Reservation ♞</span>
          </button>
        </form>
      ) : (
        /* Confirmed State */
        <div className="p-8 rounded-3xl border border-amber-500/40 bg-slate-900/90 shadow-2xl text-center space-y-6 max-w-lg mx-auto classic-card gold-filament">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto animate-pulse-gentle">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white font-serif-classic">Your Evaluation Class is Confirmed!</h2>
            <p className="text-xs text-slate-300 mt-1 font-serif-garamond text-sm">
              We look forward to meeting you on the virtual interactive chessboard.
            </p>
          </div>

          {/* Delivery Channel Status */}
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Confirmation email sent to <strong className="text-white">{confirmedBooking.email}</strong></span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Admissions alert recorded for <strong className="text-white">{confirmedBooking.phone}</strong></span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/20 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Student:</span>
              <span className="font-bold text-white">{confirmedBooking.studentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Date & Slot:</span>
              <span className="font-bold text-amber-400">{confirmedBooking.preferredDate} at {confirmedBooking.preferredTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">WhatsApp Contact:</span>
              <span className="text-slate-200">{confirmedBooking.phone}</span>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => onNavigate('home')}
              className="w-full btn-classic-gold py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              Return to Academy Home ♞
            </button>

            <a
              href={notificationService.getWhatsAppTrialLink(confirmedBooking)}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Optional: Chat with Coach on WhatsApp ({ACADEMY_CONFIG.OWNER_PHONE_FORMATTED})</span>
            </a>
          </div>

          <p className="text-[11px] text-slate-400">
            A confirmation copy has been emailed directly to our admissions board (<span className="text-amber-300 font-mono">{ACADEMY_CONFIG.OWNER_EMAIL}</span>).
          </p>
        </div>
      )}

    </div>
  );
};
