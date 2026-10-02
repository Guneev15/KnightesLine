import React from 'react';
import { Home, Compass, BookOpen, Swords, Target } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string, param?: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center space-y-8 p-8 rounded-3xl border border-amber-500/20 bg-slate-900/60 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Large Decorative Knight Emblem */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif text-5xl font-black shadow-xl shadow-amber-500/10 transform hover:rotate-6 transition-transform">
            ♞
          </div>
          <span className="inline-block mt-4 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono tracking-widest uppercase">
            Error 404 • Square Off the Board
          </span>
        </div>

        {/* Title & Microcopy */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black font-serif-classic text-white tracking-tight">
            Invalid Square Coordinates
          </h1>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-serif-garamond text-base">
            Even grandmasters occasionally calculate an impossible square. The chess diagonal or masterclass file you requested does not exist on our board.
          </p>
        </div>

        {/* Quick Recovery Navigation Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            onClick={() => onNavigate('home')}
            className="p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Academy Home</span>
          </button>

          <button
            onClick={() => onNavigate('courses')}
            className="p-3.5 rounded-2xl border border-slate-800 bg-slate-800/80 hover:bg-slate-750 text-slate-200 font-semibold text-xs transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Explore Courses</span>
          </button>

          <button
            onClick={() => onNavigate('puzzles')}
            className="p-3.5 rounded-2xl border border-slate-800 bg-slate-800/80 hover:bg-slate-750 text-slate-200 font-semibold text-xs transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer"
          >
            <Target className="w-4 h-4 text-emerald-400" />
            <span>Solve Daily Puzzles</span>
          </button>
        </div>

        <div className="pt-2 text-xs text-slate-500 flex items-center justify-center gap-2">
          <Compass className="w-3.5 h-3.5" />
          <span>Coordinates: a1 through h8 • Stay on the 64 squares</span>
        </div>

      </div>
    </div>
  );
};
