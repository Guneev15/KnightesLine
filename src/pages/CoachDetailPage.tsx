import React, { useState } from 'react';
import { ArrowLeft, Star, Award, Shield, CheckCircle2, Clock, Calendar, Users, Video, MessageSquare } from 'lucide-react';
import { shatranjStore } from '../services/store';
import { Coach } from '../types';

interface CoachDetailPageProps {
  coachId?: string;
  onNavigate: (path: string, param?: string) => void;
  onOpenTrialModal: () => void;
}

export const CoachDetailPage: React.FC<CoachDetailPageProps> = ({
  coachId = 'c1',
  onNavigate,
  onOpenTrialModal,
}) => {
  const coach: Coach = shatranjStore.getCoachById(coachId) || shatranjStore.getCoaches()[0];
  const [selectedSlot, setSelectedSlot] = useState(coach.availableSlots[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back button */}
      <button
        onClick={() => onNavigate('coaches')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Coaches</span>
      </button>

      {/* Main Coach Header Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Bio Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src={coach.avatar}
              alt={coach.name}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-slate-800 shadow-2xl"
            />
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold">
                {coach.title}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white">
                {coach.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{coach.rating} ({coach.reviewCount} student reviews)</span>
                </span>
                <span>•</span>
                <span>FIDE Elo: <strong className="text-white">{coach.fideRating}</strong></span>
                <span>•</span>
                <span>{coach.experienceYears} Years Coaching</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">About the Mentor</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {coach.bio}
            </p>
          </div>

          {/* Specialties */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Coaching Specializations
            </h2>
            <div className="flex flex-wrap gap-2">
              {coach.specialties.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-semibold text-amber-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Major Achievements */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Competitive Career Highlights
            </h2>
            <div className="space-y-2">
              {coach.achievements.map((ach, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Reviews Preview */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-lg font-bold text-white">Student & Parent Feedback</h2>
            
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white">Aarav M. (12 yrs, Rating: 1380)</div>
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-300 italic">
                  "Classes with {coach.name} are never boring. He shows real tournament master games and gives homework puzzles that directly came up in my weekend tournament!"
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white">Sunita Rao (Parent of Kabir)</div>
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-300 italic">
                  "Extremely patient and punctual. My son used to get demoralized after losses, but {coach.name} taught him to analyze games without frustration."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Booking Sidebar */}
        <div className="lg:col-span-4 p-6 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs text-slate-400">Standard Coaching Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white font-mono">₹{coach.hourlyRate}</span>
              <span className="text-xs text-slate-400">/ 50-min live session</span>
            </div>
          </div>

          {/* Available Slots */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Available Weekly Slots</span>
            </label>
            <div className="space-y-2">
              {coach.availableSlots.map((slot, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSlot(slot)}
                  className={`
                    w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-all
                    ${selectedSlot === slot
                      ? 'border-amber-500 bg-amber-500/15 text-amber-300 font-bold'
                      : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                    }
                  `}
                >
                  <span>{slot}</span>
                  {selectedSlot === slot && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={onOpenTrialModal}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all text-center block"
            >
              Book Free Trial with {coach.name.split(' ')[0]} ♟
            </button>

            <button
              onClick={() => onNavigate('classroom')}
              className="w-full py-2.5 rounded-xl font-semibold text-xs border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              <Video className="w-3.5 h-3.5 text-blue-400" />
              <span>Preview Online Classroom</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300">Teaching Languages:</div>
            <div>{coach.languages.join(' • ')}</div>
          </div>
        </div>

      </div>
    </div>
  );
};
