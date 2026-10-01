import React, { useState } from 'react';
import { Search, Star, BookOpen, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { shatranjStore } from '../services/store';
import { Course } from '../types';

interface CoursesPageProps {
  onNavigate: (path: string, param?: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onNavigate }) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const courses = shatranjStore.getCourses();
  const isLoggedIn = shatranjStore.isLoggedIn();

  const filtered = courses.filter((c) => {
    const matchesLevel = selectedLevel === 'All' || c.level === selectedLevel;
    const matchesQuery = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-amber-500 uppercase tracking-widest font-serif-classic">
          Knightesline Master Curriculum
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-100 font-serif-classic">
          Online Chess Courses &amp; FIDE Master Curriculum
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl font-serif-garamond text-base">
          From first pawn moves to master-level tournament opening systems. Every course includes interactive board exercises, tactical quizzes, and Grandmaster commentary.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
        
        {/* Level Filters */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {['All', 'Beginner', 'Intermediate', 'Advanced', 'Competitive'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`
                px-3 py-1.5 rounded-xl text-xs font-semibold transition-all
                ${selectedLevel === lvl
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }
              `}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search lessons, openings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course: Course) => (
          <div
            key={course.id}
            onClick={() => onNavigate('course-detail', course.slug)}
            className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden hover:border-amber-500/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-[10px] font-bold text-amber-400 border border-amber-500/30">
                  {course.level}
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono text-slate-200">
                  {course.totalDurationHours} hrs
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Instructor: <strong className="text-slate-200">{course.instructorName}</strong></span>
                  <div className="flex items-center gap-1 text-amber-400 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {course.title}
                </h2>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {course.tagline}
                </p>

                {/* Progress Bar (Only visible when logged in with active progress) */}
                {isLoggedIn && course.progressPercent > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-amber-400">Your Progress</span>
                      <span className="text-slate-300">{course.progressPercent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
                        style={{ width: `${course.progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">{course.enrolledCount.toLocaleString()} Students Enrolled</span>
                <span className="font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>{isLoggedIn && course.progressPercent > 0 ? 'Continue' : 'Explore Course'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
