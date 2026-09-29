import React, { useState } from 'react';
import { Search, Star, Award, GraduationCap, Clock, MessageSquare, ChevronRight } from 'lucide-react';
import { shatranjStore } from '../services/store';
import { Coach } from '../types';

interface CoachesPageProps {
  onNavigate: (path: string, param?: string) => void;
  onOpenTrialModal: () => void;
}

export const CoachesPage: React.FC<CoachesPageProps> = ({ onNavigate, onOpenTrialModal }) => {
  const coaches = shatranjStore.getCoaches();
  const [selectedTitle, setSelectedTitle] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = coaches.filter(c => {
    const matchesTitle = selectedTitle === 'All' || c.title.toLowerCase().includes(selectedTitle.toLowerCase());
    const matchesQuery = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         c.languages.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTitle && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
          Elite Faculty
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Meet Our Titled Chess Mentors
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Learn from Grandmasters, International Masters, and Certified Youth Specialists with proven records in developing state and national champions.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {['All', 'Grandmaster', 'International Master', 'FIDE Master', 'Senior FIDE Instructor'].map((title) => (
            <button
              key={title}
              onClick={() => setSelectedTitle(title)}
              className={`
                px-3 py-1.5 rounded-xl text-xs font-semibold transition-all
                ${selectedTitle === title
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }
              `}
            >
              {title}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search coach, tactics, language..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Coaches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((coach: Coach) => (
          <div
            key={coach.id}
            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={coach.avatar}
                  alt={coach.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-slate-800 group-hover:ring-amber-500/50 transition-all shrink-0"
                />
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-bold">
                    {coach.title}
                  </div>
                  <h3 className="text-base font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                    {coach.name}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    FIDE Rating: <strong className="text-slate-200">{coach.fideRating}</strong>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{coach.rating}</span>
                    <span className="text-slate-500 font-normal">({coach.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {coach.bio}
              </p>

              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Core Specialties
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {coach.specialties.map((s, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-400 flex items-center justify-between pt-1">
                <span>Languages: <strong className="text-slate-300">{coach.languages.join(', ')}</strong></span>
                <span>Exp: <strong className="text-slate-300">{coach.experienceYears}+ yrs</strong></span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Coaching Rate</span>
                <span className="text-sm font-bold text-white">₹{coach.hourlyRate}/session</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('coach-profile', coach.id)}
                  className="px-3 py-1.5 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                >
                  Bio
                </button>
                <button
                  onClick={onOpenTrialModal}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20"
                >
                  Book Trial ♟
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
