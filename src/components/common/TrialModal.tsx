import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Clock, User, Phone, Mail, Award, Sparkles, Download, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { shatranjStore } from '../../services/store';
import { audioService } from '../../services/audioService';
import { FreeTrialBooking } from '../../types';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess?: (booking: FreeTrialBooking) => void;
}

export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose, onBookingSuccess }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
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
  const [ageGrade, setAgeGrade] = useState('Age 10 (Grade 5)');
  const [coachPreference, setCoachPreference] = useState('Senior Academy Instructor');
  const [confirmedBooking, setConfirmedBooking] = useState<FreeTrialBooking | null>(null);

  if (!isOpen) return null;

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    audioService.playMove();
    setStep(2);
  };

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

    setConfirmedBooking(newBooking);
    setStep(3);
    audioService.playVictory();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#6366f1', '#ec4899']
      });
    } catch {}

    if (onBookingSuccess) {
      onBookingSuccess(newBooking);
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0f131d] border border-slate-700/80 shadow-2xl overflow-hidden">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2">
            <span className="text-xl">♟</span>
            <h2 className="text-lg font-bold text-white">
              {step === 3 ? 'Trial Confirmed!' : 'Book Your Free Live Chess Class'}
            </h2>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step !== 3 && (
          <div className="px-6 pt-4 pb-2 flex items-center justify-between text-xs text-slate-400">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-amber-400 font-semibold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800'}`}>1</span>
              <span>Level & Slot</span>
            </div>
            <div className="h-0.5 flex-1 mx-3 bg-slate-800">
              <div className={`h-full bg-amber-500 transition-all duration-300 ${step === 2 ? 'w-full' : 'w-0'}`} />
            </div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-amber-400 font-semibold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800'}`}>2</span>
              <span>Student Details</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          {/* STEP 1: Level, Goals, Date & Time */}
          {step === 1 && (
            <form onSubmit={handleNextStep1} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  1. Current Chess Level
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
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
                        p-2.5 rounded-xl border text-left font-medium transition-all
                        ${level === lvl
                          ? 'border-amber-500 bg-amber-500/15 text-amber-300 shadow-sm'
                          : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                        }
                      `}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  2. Primary Learning Goal
                </label>
                <select
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option>Build strong fundamentals and stop giving away pieces</option>
                  <option>Learn opening traps and proper piece development</option>
                  <option>Sharpen calculation and master tactical patterns</option>
                  <option>Tournament preparation & FIDE rating improvement</option>
                  <option>Have fun, boost focus, and beat friends & family</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Preferred Slot</span>
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>4:00 PM IST</option>
                    <option>5:00 PM IST</option>
                    <option>6:30 PM IST</option>
                    <option>7:30 PM IST</option>
                    <option>11:00 AM IST (Weekend)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Continue to Step 2</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Student & Contact Details */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Student / Player Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Age / Grade</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Age 11 (Grade 6)"
                    value={ageGrade}
                    onChange={(e) => setAgeGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Email Address (For Calendar Invite)</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="parent.or.student@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>WhatsApp Mobile Number</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  We'll send the live classroom link and reminder on WhatsApp.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Coach Preference
                </label>
                <select
                  value={coachPreference}
                  onChange={(e) => setCoachPreference(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option>Any Titled Coach (IM/GM)</option>
                  <option>IM Vikramaditya Rao (Tactics Specialist)</option>
                  <option>WGM Ananya Sen (Positional & Junior Mentor)</option>
                  <option>Sneha Kulkarni (Kids Specialist Ages 5-12)</option>
                  <option>GM Rohan Joshi (Competitive 1600+)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Free Booking ♟</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Confirmation Screen */}
          {step === 3 && confirmedBooking && (
            <div className="text-center space-y-4 py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-black text-white">You're All Set, {confirmedBooking.studentName}!</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Your free 45-minute interactive chess trial has been reserved.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="p-4 rounded-xl border border-slate-700 bg-slate-900/80 text-left text-xs space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Slot:</span>
                  <span className="font-bold text-amber-400">{confirmedBooking.preferredDate} at {confirmedBooking.preferredTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Student Level:</span>
                  <span className="font-semibold text-slate-200">{confirmedBooking.playerLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Coach:</span>
                  <span className="font-semibold text-slate-200">{confirmedBooking.coachPreference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">WhatsApp Alert to:</span>
                  <span className="font-semibold text-slate-200">{confirmedBooking.phone}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2 justify-center">
                <a
                  href={`https://wa.me/?text=Hi!%20I%20just%20booked%20my%20free%20chess%20trial%20class%20on%20Knightesline%20Academy%20for%20${encodeURIComponent(confirmedBooking.preferredDate)}!`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-bold hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Reminder Preview</span>
                </a>

                <button
                  onClick={() => {
                    const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nSUMMARY:Knightesline Chess Trial Class with ${confirmedBooking.coachPreference}\nDESCRIPTION:Interactive live chess session\nSTATUS:CONFIRMED\nEND:VCALENDAR`;
                    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'knightesline_chess_trial.ics');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Add to Google / iCal</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetAndClose}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
                >
                  Done & Return to Academy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
