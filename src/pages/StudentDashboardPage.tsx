import React from 'react';
import {
  Flame,
  Trophy,
  TrendingUp,
  Clock,
  Play,
  BookOpen,
  Award,
  Video,
  ChevronRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { shatranjStore, MOCK_USERS } from '../services/store';

interface StudentDashboardProps {
  onNavigate: (path: string, param?: string) => void;
  onOpenTrialModal: () => void;
}

export const StudentDashboardPage: React.FC<StudentDashboardProps> = ({
  onNavigate,
  onOpenTrialModal,
}) => {
  const isLoggedIn = shatranjStore.isLoggedIn();
  const user = shatranjStore.getUser();
  const courses = shatranjStore.getCourses();

  if (!isLoggedIn || !user) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-2xl">
          ♞
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white font-serif-classic">Student Dashboard</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Please log in with your student credentials to view your active courses, rating metrics, and tactical progress.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('login')}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            Log In
          </button>
          <button
            onClick={() => onNavigate('courses')}
            className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-500/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">♞</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif-classic">
              Welcome, {user.name.split(' ')[0]}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-serif-garamond text-base">
            Your queen called. She requests noble backup. Let's sharpen your tactical vision today!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('classroom')}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 hover:from-amber-400 transition-all flex items-center justify-center gap-2"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Join Live Class</span>
          </button>
          <button
            onClick={() => onNavigate('puzzles')}
            className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Daily Puzzles</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Rating */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Rating</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">{user.rating}</span>
            <span className="text-xs font-bold text-emerald-400">+{user.monthlyRatingDelta} this month</span>
          </div>
          <span className="text-[11px] text-slate-500 block">Personal Best: 1260</span>
        </div>

        {/* Streak */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Daily Streak</span>
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
            <span className="text-3xl font-black text-white font-mono">{user.streakDays} Days</span>
          </div>
          <span className="text-[11px] text-slate-500 block">Flame alive! Train today to maintain</span>
        </div>

        {/* XP & Level */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Academy Level</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-400 font-mono">Lvl {user.level}</span>
            <span className="text-xs text-slate-400 font-mono">({user.xp} XP)</span>
          </div>
          <span className="text-[11px] text-emerald-400 block font-medium">160 XP to Level 15</span>
        </div>

        {/* Plan Status */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Membership</span>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            <span className="text-xl font-black text-white uppercase">{user.subscriptionTier} Plan</span>
          </div>
          <span className="text-[11px] text-slate-400 block">Valid until Oct 25, 2026</span>
        </div>

      </div>

      {/* AI Recommendation Banner */}
      <div className="p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Personalized AI Training Insight
            </div>
            <p className="text-sm font-semibold text-white mt-0.5">
              "You’ve been hanging pieces in move 8–12 of the Italian Game. Let's do 5 defense puzzles today."
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('puzzles')}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 transition-colors"
        >
          Fix This Weakness →
        </button>
      </div>

      {/* Two Column Section: Upcoming Class & Enrolled Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Upcoming Live Session */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Video className="w-4 h-4 text-amber-400" />
            <span>Next Live Coaching Class</span>
          </h2>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-5">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Coach"
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-500/40"
              />
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  International Master
                </span>
                <h3 className="text-base font-bold text-white mt-1">IM Vikramaditya Rao</h3>
                <span className="text-xs text-slate-400">1-on-1 Tactical Mastery Session</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Scheduled Time:</span>
                <span className="font-bold text-amber-400">Today at 5:00 PM IST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Topic:</span>
                <span className="font-medium text-slate-200">Piece Coordination & Greek Gift</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Room Status:</span>
                <span className="font-semibold text-emerald-400">● Ready to join</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('classroom')}
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4" />
              <span>Enter Virtual Classroom ♟</span>
            </button>
          </div>
        </div>

        {/* Right: Active Courses & Progress */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>My Active Courses</span>
            </h2>
            <button
              onClick={() => onNavigate('courses')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
            >
              Browse All →
            </button>
          </div>

          <div className="space-y-3">
            {courses.slice(0, 3).map((course) => (
              <div
                key={course.id}
                onClick={() => onNavigate('lesson-player', course.id)}
                className="p-4 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      {course.title}
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      Instructor: {course.instructorName}
                    </span>
                  </div>
                </div>

                <div className="w-full sm:w-44 space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>Progress</span>
                    <span className="text-amber-400 font-mono">{course.progressPercent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
                      style={{ width: `${course.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Badges Cabinet */}
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              Unlocked Skill Badges
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {user.badges.map((b) => (
                <div key={b.id} className="p-3 rounded-xl border border-slate-800 bg-slate-900/40 text-center space-y-1">
                  <span className="text-xl block">{b.icon}</span>
                  <div className="text-xs font-bold text-white">{b.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{b.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
