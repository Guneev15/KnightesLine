import React, { useState } from 'react';
import { Chess } from 'chess.js';
import {
  ArrowRight,
  Shield,
  Star,
  Trophy,
  Users,
  Brain,
  Zap,
  CheckCircle2,
  RotateCcw,
  Flame,
  ChevronRight,
  Swords,
  Target,
  BookOpen,
  Crown,
  Video,
  Clock,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';
import { ChessBoard } from '../components/chess/ChessBoard';
import { shatranjStore } from '../services/store';
import { audioService } from '../services/audioService';

const PLATFORM_CAPABILITIES = [
  {
    title: 'Interactive Arena',
    subtitle: 'Legal Move Validation',
    desc: 'Play vs graded Minimax bots or test custom tactics',
    titleColor: 'text-amber-400',
    icon: Swords,
    path: 'play',
    tag: 'Real-Time Arena',
  },
  {
    title: 'Minimax Engine',
    subtitle: 'Real-Time Evaluation',
    desc: 'Deep positional scoring & instant blunder alerts',
    titleColor: 'text-slate-100',
    icon: Brain,
    path: 'analysis',
    tag: 'Deep Calculation',
  },
  {
    title: 'Tactical Gym',
    subtitle: 'Curated Puzzles',
    desc: 'Step-by-step master calculation & tactical reasoning',
    titleColor: 'text-amber-300',
    icon: Target,
    path: 'puzzles',
    tag: 'Pattern Training',
  },
  {
    title: 'Master Syllabus',
    subtitle: 'FIDE-Aligned Modules',
    desc: 'From foundational pawn play to grandmaster endgames',
    titleColor: 'text-emerald-400',
    icon: BookOpen,
    path: 'courses',
    tag: 'FIDE Curriculum',
  },
  {
    title: 'Grandmaster Faculty',
    subtitle: '1-on-1 Mentorship',
    desc: 'Certified FIDE titled trainers & personalized roadmaps',
    titleColor: 'text-amber-400',
    icon: Crown,
    path: 'coaches',
    tag: 'Elite Coaching',
  },
  {
    title: 'Virtual Classroom',
    subtitle: 'Live Interactive Board',
    desc: 'Integrated voice, video & digital master whiteboard',
    titleColor: 'text-sky-400',
    icon: Video,
    path: 'classroom',
    tag: 'Live Sessions',
  },
  {
    title: 'Parent Observatory',
    subtitle: 'Transparent Progress',
    desc: 'Plain-English performance reports & attendance logs',
    titleColor: 'text-emerald-300',
    icon: Shield,
    path: 'about',
    tag: 'Full Transparency',
  },
  {
    title: 'Sparring Bots',
    subtitle: 'Adaptive Elo Opponents',
    desc: 'Calibrated AI opponents from 600 beginner to 2400 master',
    titleColor: 'text-amber-200',
    icon: Zap,
    path: 'play',
    tag: '24/7 Practice',
  },
];

interface HomePageProps {
  onNavigate: (path: string, param?: string) => void;
  onOpenTrialModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenTrialModal }) => {
  // Hero demo mini game
  const [heroGame, setHeroGame] = useState(() => new Chess());
  const [heroMoveLog, setHeroMoveLog] = useState<string[]>([]);
  const courses = shatranjStore.getCourses().slice(0, 3);
  const plans = shatranjStore.getPlans();

  const handleHeroMove = (_from: string, _to: string, san: string) => {
    setHeroMoveLog(prev => [...prev, san]);
  };

  const resetHeroGame = () => {
    audioService.playMove();
    setHeroGame(new Chess());
    setHeroMoveLog([]);
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 md:pt-14">
        
        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[520px] bg-gradient-to-tr from-amber-500/10 via-sky-600/5 to-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-slate-100 leading-[1.06] font-serif-classic">
                Master the <br />
                <span className="bg-gradient-to-r from-[#faecd0] via-[#eed187] to-[#d4af37] bg-clip-text text-transparent">
                  Royal Game.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl sm:text-2xl text-slate-200 max-w-xl mx-auto lg:mx-0 font-serif-garamond italic">
                Classical mastery meets modern calculation. <span className="text-amber-400 not-italic font-sans font-bold text-lg">Stop blundering queens.</span>
              </p>

              <p className="text-sm text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed font-serif-garamond text-base sm:text-lg">
                Knightesline transforms chess from tedious memorization into an exhilarating intellectual journey. Tailored for ambitious juniors, competitive scholastic prodigies, and determined adult improvers.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => {
                    audioService.playMove();
                    onOpenTrialModal();
                  }}
                  className="w-full sm:w-auto btn-classic-gold px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-2xl flex items-center justify-center gap-3 group cursor-pointer"
                >
                  <span>Book Free Trial Session</span>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">♞</span>
                </button>

                <button
                  onClick={() => {
                    audioService.playMove();
                    onNavigate('courses');
                  }}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider border border-amber-500/30 hover:border-amber-400 bg-slate-900/80 hover:bg-slate-800 text-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Curriculum</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No payment required for trial</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>1-on-1 private Grandmaster board</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Tuition from ₹799/month</span>
                </div>
              </div>

              {/* Social Proof Metric Counters Grid */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto lg:mx-0 border-t border-slate-800/80">
                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300">2,400+</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-serif-classic mt-0.5">Prodigies Coached</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">+240</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-serif-classic mt-0.5">Avg Elo Surge</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300">100%</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-serif-classic mt-0.5">FIDE Titled Faculty</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-slate-100 flex items-center gap-1">
                    <span>4.98</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-serif-classic mt-0.5">Parent Rating</div>
                </div>
              </div>

            </div>

            {/* Right Hero Column: Grandmaster Arena Card */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full max-w-[500px] p-3.5 sm:p-4 rounded-3xl bg-[#0f131c]/90 border border-amber-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl space-y-3">
                
                {/* Top Player Card (Grandmaster Opponent) */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/90 text-xs">
                  <div className="flex items-center gap-2.5">
                    {/* GM Avatar */}
                    <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-md flex-shrink-0">
                      <div className="w-full h-full rounded-[10px] bg-slate-900 flex items-center justify-center font-bold text-amber-400 text-sm">
                        AM
                      </div>
                      <span className="absolute -bottom-1 -right-1 px-1 rounded bg-amber-500 text-slate-950 font-bold text-[8px] leading-tight shadow">
                        GM
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-100 text-sm">Aditya Mittal</span>
                        <span className="text-[10px] text-slate-400">🇮🇳</span>
                      </div>
                      <div className="text-[10px] text-amber-400/90 font-mono flex items-center gap-1">
                        <span>FIDE 2615</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400 font-sans">Head Mentor</span>
                      </div>
                    </div>
                  </div>

                  {/* Digital Chess Clock Display */}
                  <div className="chess-clock-bezel px-3 py-1.5 rounded-lg flex items-center gap-2 font-mono text-slate-200">
                    <span className="w-2 h-2 rounded-full bg-slate-600" />
                    <span className="text-sm font-bold tracking-wider">05:00</span>
                  </div>
                </div>

                {/* Tournament Chessboard */}
                <div className="relative">
                  <ChessBoard
                    game={heroGame}
                    onMove={handleHeroMove}
                    boardTheme="emerald"
                    interactive={true}
                  />
                </div>

                {/* Bottom Player Card (The Student Challenger) */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/90 text-xs">
                  <div className="flex items-center gap-2.5">
                    {/* User Avatar */}
                    <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 shadow-md flex-shrink-0">
                      <div className="w-full h-full rounded-[10px] bg-slate-900 flex items-center justify-center font-bold text-emerald-400 text-sm">
                        ♟
                      </div>
                      <span className="absolute -bottom-1 -right-1 px-1 rounded bg-emerald-500 text-slate-950 font-bold text-[8px] leading-tight shadow">
                        YOU
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-100 text-sm">Student Challenger</span>
                        <span className="text-[10px] text-slate-400">🇮🇳</span>
                      </div>
                      <div className="text-[10px] text-emerald-400/90 font-mono flex items-center gap-1">
                        <span>1500 Elo</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400 font-sans">White to Move</span>
                      </div>
                    </div>
                  </div>

                  {/* Digital Chess Clock Display (Active) */}
                  <div className="chess-clock-bezel px-3 py-1.5 rounded-lg flex items-center gap-2 font-mono text-emerald-300 border-emerald-500/40">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-bold tracking-wider">04:58</span>
                  </div>
                </div>

                {/* Match Evaluation & Interactive Controls Bar */}
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate max-w-[280px]">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono font-bold">
                      +0.2
                    </span>
                    <div className="text-slate-400 text-[11px] truncate">
                      {heroMoveLog.length > 0 ? (
                        <span>Moves: <strong className="text-amber-400 font-mono">{heroMoveLog.join(' ')}</strong></span>
                      ) : (
                        <span className="italic text-slate-400">Drag or click any white piece to play</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={resetHeroGame}
                      title="Reset Position"
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onNavigate('play')}
                      className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 font-serif-classic"
                    >
                      <span>Full Arena</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PLATFORM CAPABILITIES SLIDING MARQUEE */}
      <section className="border-y border-amber-500/20 bg-slate-950/80 py-7 relative overflow-hidden backdrop-blur-md">
        {/* Soft Vignette Edge Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#090b10] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#090b10] to-transparent z-10" />

        {/* Sliding Infinite Track */}
        <div className="overflow-hidden">
          <div className="animate-smooth-slide-track flex gap-4 sm:gap-6 pl-4">
            {[...PLATFORM_CAPABILITIES, ...PLATFORM_CAPABILITIES].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => onNavigate(item.path)}
                  className="w-[280px] sm:w-[320px] shrink-0 p-4 sm:p-5 rounded-2xl bg-[#111520]/80 hover:bg-[#161c2a] border border-slate-800/90 hover:border-amber-400/50 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.16)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group space-y-3 backdrop-blur-md relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700/80 uppercase tracking-widest font-serif-classic">
                      {item.tag}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className={`text-base font-bold font-serif-classic tracking-wide ${item.titleColor}`}>
                      {item.title}
                    </div>
                    <div className="text-xs font-semibold text-slate-200">
                      {item.subtitle}
                    </div>
                    <div className="text-[11px] text-slate-400 font-serif-garamond line-clamp-1">
                      {item.desc}
                    </div>
                  </div>

                  <div className="pt-1 flex items-center gap-1 text-[11px] font-bold text-amber-400/80 group-hover:text-amber-300 transition-colors">
                    <span>Explore Platform</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (4 Step Master Pathway) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest font-serif-classic">
            The Royal Path to Mastery
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif-classic tracking-tight">
            How Knightesline Works
          </h2>
          <p className="text-sm text-slate-300 font-serif-garamond text-base sm:text-lg">
            No confusion, no dry lectures. A dignified, structured, and exhilarating progression from introductory pawn strategy to official tournament victory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl classic-card group space-y-3 relative">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-lg font-serif-classic group-hover:scale-110 transition-transform shadow-md">
                I
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Phase 1 • Complimentary
              </span>
            </div>
            <h3 className="text-lg font-bold text-white font-serif-classic">Diagnosis & Leveling</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-serif-garamond text-sm">
              Whether you’re taking your first moves or an experienced 1400-rated tactician, our master assessment isolates your tactical strengths and blind spots.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl classic-card group space-y-3 relative">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-lg font-serif-classic group-hover:scale-110 transition-transform shadow-md">
                II
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Phase 2 • Custom Blueprint
              </span>
            </div>
            <h3 className="text-lg font-bold text-white font-serif-classic">Mastery Instruction</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-serif-garamond text-sm">
              Follow curated opening repertoires, master endgame conversion techniques, and deep calculation methods created for ambitious competitors.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl classic-card group space-y-3 relative">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-lg font-serif-classic group-hover:scale-110 transition-transform shadow-md">
                III
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30">
                Phase 3 • Active Sparring
              </span>
            </div>
            <h3 className="text-lg font-bold text-white font-serif-classic">Classical Sparring</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-serif-garamond text-sm">
              Live interactive masterclasses, curated tactical puzzle gyms, custom master homework, and automated AI game analysis for instant blunder detection.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl classic-card group space-y-3 relative">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-lg font-serif-classic group-hover:scale-110 transition-transform shadow-md">
                IV
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Phase 4 • FIDE Surge
              </span>
            </div>
            <h3 className="text-lg font-bold text-white font-serif-classic">Tournament Ascendance</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-serif-garamond text-sm">
              Watch your rating surge (+150 to +300 Elo), earn noble academy crests, and step into official rated competitions with calm tactical clarity.
            </p>
          </div>

        </div>
      </section>

      {/* 4. FEATURED COURSES (Royal Academy Syllabus) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest font-serif-classic">Royal Academy Syllabus</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 font-serif-classic">Structured Master Curriculum</h2>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 self-start sm:self-auto font-serif-classic tracking-wider cursor-pointer"
          >
            <span>View All Courses</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => onNavigate('course-detail', course.slug)}
              className="rounded-2xl classic-card overflow-hidden cursor-pointer group flex flex-col"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-[10px] font-bold text-amber-400 border border-amber-500/30">
                  {course.level}
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-slate-950/85 text-[10px] font-mono text-slate-200">
                  {course.totalDurationHours} hrs
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-serif-garamond text-sm">
                    {course.tagline}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Instructor: <strong className="text-slate-200">{course.instructorName}</strong></span>
                  <div className="flex items-center gap-1 text-amber-400 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TACTICAL GYM DAILY PUZZLE TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-[#10141f] to-[#0c0e14] flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl backdrop-blur-xl">
          <div className="space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 font-serif-classic">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Daily Tactical Challenge • 14-Day Streak</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif-classic">
              "Find the move that makes your opponent resign."
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg font-serif-garamond text-base sm:text-lg">
              Test your calculation in our interactive tactical gym. Every puzzle explains WHY the move works so you remember it in your real tournament games.
            </p>
            <div>
              <button
                onClick={() => {
                  audioService.playMove();
                  onNavigate('puzzles');
                }}
                className="btn-classic-gold px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 mx-auto lg:mx-0 cursor-pointer"
              >
                <span>Launch Tactical Gym</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="w-full max-w-xs p-4 rounded-2xl bg-slate-950/85 border border-slate-800 text-center space-y-3 shadow-xl">
            <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Today’s Rating: 1320</span>
              <span className="text-emerald-400">White to Move</span>
            </div>
            <div className="aspect-square rounded-xl bg-slate-900 flex items-center justify-center p-3 border border-slate-800 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=400&auto=format&fit=crop&q=80"
                alt="Tactical chess position"
                className="w-full h-full object-cover rounded-lg opacity-85 hover:scale-105 transition-transform"
              />
            </div>
            <button
              onClick={() => onNavigate('puzzles')}
              className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-300 border border-slate-700 transition-colors cursor-pointer"
            >
              Solve This Puzzle (3 moves)
            </button>
          </div>
        </div>
      </section>

      {/* 6. PRICING TEASER (Starting at ₹799/mo) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest font-serif-classic">Noble Membership Tiers</div>
          <h2 className="text-3xl font-bold text-white font-serif-classic">Entry Commences at Just ₹799/month</h2>
          <p className="text-xs text-slate-400 font-serif-garamond text-base">
            Transparent investment in intellect. Zero admission fees. Your inaugural evaluation class is 100% complimentary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`
                p-6 rounded-2xl classic-card flex flex-col justify-between
                ${plan.popular
                  ? 'border-amber-500/80 bg-gradient-to-b from-amber-500/10 via-slate-900/70 to-slate-900 shadow-xl shadow-amber-500/10 relative gold-filament'
                  : ''
                }
              `}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] tracking-wider uppercase shadow-md font-serif-classic whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white font-serif-classic">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 font-serif-garamond text-sm">{plan.tagline}</p>
                </div>

                <div className="py-2 border-y border-amber-500/20">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white font-mono">₹{plan.monthlyPrice.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-medium font-serif-classic tracking-wider">Billed monthly or save 20% yearly</span>
                </div>

                <ul className="space-y-2 text-xs">
                  {plan.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => {
                    audioService.playMove();
                    onOpenTrialModal();
                  }}
                  className={`
                    w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer
                    ${plan.popular
                      ? 'btn-classic-gold'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-amber-500/20 hover:border-amber-400'
                    }
                  `}
                >
                  Book Free Trial First ♞
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BOTTOM CONVERSION SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="p-10 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-500/15 via-[#12151c] to-[#0c0e12] shadow-2xl space-y-5 classic-card gold-filament">
          <span className="text-4xl inline-block">♞</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif-classic">
            Ready to Master the Royal Game?
          </h2>
          <p className="text-slate-300 text-sm max-w-lg mx-auto font-serif-garamond text-base sm:text-lg">
            Reserve your complimentary private evaluation session today. No credit card required. Experience 45 minutes of structured chess insight, tactical analysis, and a personalized improvement roadmap.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => {
                audioService.playMove();
                onOpenTrialModal();
              }}
              className="btn-classic-gold px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-2xl inline-flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Book Your Free Trial Session ♞</span>
            </button>
            <button
              onClick={() => {
                audioService.playMove();
                onNavigate('pricing');
              }}
              className="px-8 py-3.5 rounded-xl font-serif-classic font-bold text-xs text-amber-300 hover:text-white border border-amber-500/40 hover:border-amber-400 bg-slate-900/80 hover:bg-slate-800 transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Explore Tuition & Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="text-[11px] text-amber-300/80 font-serif-classic tracking-wider">
            Complimentary 45-minute private evaluation • Interactive analysis • Flexible scheduling
          </div>
        </div>
      </section>

    </div>
  );
};
