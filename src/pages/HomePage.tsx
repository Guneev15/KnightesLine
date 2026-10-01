import React, { useState } from 'react';
import { Chess } from 'chess.js';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Star,
  Trophy,
  Users,
  Brain,
  Zap,
  CheckCircle2,
  Play,
  RotateCcw,
  Flame,
  ChevronRight,
  Swords,
  Target,
  BookOpen,
  Crown,
  Video
} from 'lucide-react';
import { ChessBoard } from '../components/chess/ChessBoard';
import { shatranjStore } from '../services/store';
import { audioService } from '../services/audioService';

const PLATFORM_CAPABILITIES = [
  {
    title: 'Interactive Arena',
    subtitle: 'Legal Move Validation',
    desc: 'Play vs Minimax AI or test custom setups',
    titleColor: 'text-amber-400',
    icon: Swords,
    path: 'play',
    tag: 'Real-Time Arena',
  },
  {
    title: 'Minimax Engine',
    subtitle: 'Real-Time Evaluation',
    desc: 'Blunder detection & positional scoring',
    titleColor: 'text-slate-100',
    icon: Brain,
    path: 'analysis',
    tag: 'Deep Calculation',
  },
  {
    title: 'Tactical Gym',
    subtitle: 'Curated Puzzles',
    desc: 'Detailed calculation reasoning for each move',
    titleColor: 'text-amber-300',
    icon: Target,
    path: 'puzzles',
    tag: 'Pattern Training',
  },
  {
    title: 'Master Syllabus',
    subtitle: 'FIDE-Aligned Modules',
    desc: 'From foundational tactics to master endgames',
    titleColor: 'text-emerald-400',
    icon: BookOpen,
    path: 'courses',
    tag: 'FIDE Curriculum',
  },
  {
    title: 'Grandmaster Faculty',
    subtitle: '1-on-1 Mentorship',
    desc: 'Certified FIDE titled trainers & customized roadmaps',
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
    desc: 'Plain-English attendance logs & coach evaluations',
    titleColor: 'text-emerald-300',
    icon: Shield,
    path: 'about',
    tag: 'Full Transparency',
  },
  {
    title: 'Sparring Bots',
    subtitle: 'Adaptive Elo Opponents',
    desc: 'Calibrated bot ratings from 600 beginner to 2400 master',
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
    setHeroGame(new Chess());
    setHeroMoveLog([]);
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        
        {/* Subtle background ambient lights & glowing digital particles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-amber-500/10 via-purple-600/10 to-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-slate-100 leading-[1.08] font-serif-classic">
                Master the <br />
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                  Royal Game.
                </span>
              </h1>

              {/* Subheadline & Subtle witty microcopy */}
              <p className="text-xl sm:text-2xl text-slate-200 max-w-xl mx-auto lg:mx-0 font-serif-garamond italic">
                Classical mastery meets modern calculation. <span className="text-amber-400 not-italic font-sans font-bold text-lg">Stop blundering queens.</span>
              </p>

              <p className="text-sm text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed font-serif-garamond text-base">
                Knightesline transforms chess from tedious memorization into an exhilarating intellectual journey. Tailored for ambitious juniors, competitive scholastic players, and determined adult learners.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={onOpenTrialModal}
                  className="w-full sm:w-auto btn-classic-gold px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xl flex items-center justify-center gap-3 group"
                >
                  <span>Book Free Trial Session</span>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">♞</span>
                </button>

                <button
                  onClick={() => onNavigate('courses')}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider border border-amber-500/30 hover:border-amber-400 bg-slate-900/80 hover:bg-slate-850 text-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Curriculum</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No payment required for trial</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Interactive 1-on-1 live board</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>From ₹799/month</span>
                </div>
              </div>
            </div>

            {/* Right Hero Interactive Board Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[460px] p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md">
                
                {/* Board header */}
                <div className="flex items-center justify-between pb-3 text-xs border-b border-slate-800 text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold text-slate-200">Interactive Arena</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={resetHeroGame}
                      title="Reset Position"
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 font-mono text-amber-400">
                      Try a move!
                    </span>
                  </div>
                </div>

                {/* Real Chessboard */}
                <div className="pt-3">
                  <ChessBoard
                    game={heroGame}
                    onMove={handleHeroMove}
                    boardTheme="emerald"
                    interactive={true}
                  />
                </div>

                {/* Move Notation Ticker */}
                <div className="mt-3 p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs flex items-center justify-between">
                  <div className="text-slate-400 text-[11px] truncate max-w-[260px]">
                    {heroMoveLog.length > 0 ? (
                      <span>Moves: <strong className="text-amber-400 font-mono">{heroMoveLog.join(' ')}</strong></span>
                    ) : (
                      <span className="italic text-slate-500">Drag or click any piece to play legally</span>
                    )}
                  </div>
                  <button
                    onClick={() => onNavigate('play')}
                    className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>Full Arena</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PLATFORM CAPABILITIES SLIDING MARQUEE */}
      <section className="border-y border-amber-500/20 bg-slate-950/70 py-7 relative overflow-hidden backdrop-blur-md">
        {/* Soft Vignette Edge Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#090b10] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#090b10] to-transparent z-10" />

        {/* Sliding Infinite Track */}
        <div className="overflow-hidden">
          <div className="animate-smooth-slide-track flex gap-4 sm:gap-6 pl-4">
            {[...PLATFORM_CAPABILITIES, ...PLATFORM_CAPABILITIES].map((item, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate(item.path)}
                className="w-[280px] sm:w-[320px] shrink-0 p-4 sm:p-5 rounded-2xl bg-slate-900/50 hover:bg-slate-900/90 border border-slate-800/80 hover:border-amber-400/50 shadow-md hover:shadow-[0_10px_30px_rgba(212,175,55,0.14)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group text-center space-y-1.5 backdrop-blur-md relative"
              >
                <div className="space-y-1">
                  <div className={`text-base sm:text-lg font-bold font-serif-classic tracking-wide ${item.titleColor}`}>
                    {item.title}
                  </div>
                  <div className="text-xs font-semibold text-slate-200">
                    {item.subtitle}
                  </div>
                  <div className="text-[11px] text-slate-400 font-serif-garamond line-clamp-1">
                    {item.desc}
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-center gap-1 text-[10px] font-bold text-amber-400/70 group-hover:text-amber-300 transition-colors">
                  <span>Explore Feature</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (4 Interactive Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="text-xs font-bold text-amber-500 uppercase tracking-widest font-serif-classic">
            The Royal Path to Mastery
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif-classic tracking-tight">
            How Knightesline Works
          </h2>
          <p className="text-sm text-slate-400 font-serif-garamond text-base">
            No confusion, no dry lectures. A dignified, structured, and exhilarating progression from introductory pawn strategy to official tournament victory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl classic-card group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg mb-4 font-serif-classic group-hover:scale-110 transition-transform">
              I
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif-classic">Diagnosis & Leveling</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-serif-garamond text-sm">
              Whether you’re taking your first moves or an experienced 1400-rated tactician, our master assessment isolates your tactical strengths and blind spots.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl classic-card group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg mb-4 font-serif-classic group-hover:scale-110 transition-transform">
              II
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif-classic">Mastery Instruction</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-serif-garamond text-sm">
              Follow curated opening repertoires, master endgame techniques, and deep calculation methods created for ambitious competitors.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl classic-card group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg mb-4 font-serif-classic group-hover:scale-110 transition-transform">
              III
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif-classic">Classical Sparring</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-serif-garamond text-sm">
              Live interactive masterclasses, curated tactical puzzle gyms, custom master homework, and automated AI game analysis for instant blunder detection.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl classic-card group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg mb-4 font-serif-classic group-hover:scale-110 transition-transform">
              IV
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif-classic">Tournament Ascendance</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-serif-garamond text-sm">
              Watch your rating surge (+150 to +300 Elo), earn noble academy crests, and step into official rated competitions with calm tactical clarity.
            </p>
          </div>

        </div>
      </section>

      {/* 4. FEATURED COURSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-amber-500 uppercase tracking-widest font-serif-classic">Royal Academy Syllabus</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 font-serif-classic">Structured Master Curriculum</h2>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 self-start sm:self-auto font-serif-classic tracking-wider"
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
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-amber-400 border border-amber-500/30">
                  {course.level}
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono text-slate-200">
                  {course.totalDurationHours} hrs
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
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

      {/* 5. PUZZLE OF THE DAY TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900/90 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Daily Tactical Challenge</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              "Find the move that makes your opponent resign."
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Test your calculation in our interactive tactical gym. Every puzzle explains WHY the move works so you remember it in your real tournament games.
            </p>
            <div>
              <button
                onClick={() => onNavigate('puzzles')}
                className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all flex items-center gap-2 mx-auto lg:mx-0"
              >
                <span>Launch Tactical Gym</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="w-full max-w-xs p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-3">
            <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Today’s Rating: 1320</span>
              <span className="text-emerald-400">White to Move</span>
            </div>
            <div className="aspect-square rounded-xl bg-slate-900 flex items-center justify-center p-3 border border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=300&auto=format&fit=crop&q=80"
                alt="Tactical position"
                className="w-full h-full object-cover rounded-lg opacity-85"
              />
            </div>
            <button
              onClick={() => onNavigate('puzzles')}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
            >
              Solve This Puzzle (3 moves)
            </button>
          </div>
        </div>
      </section>

      {/* 7. PRICING TEASER (Starting at ₹799/mo) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="text-xs font-bold text-amber-500 uppercase tracking-widest font-serif-classic">Noble Membership Tiers</div>
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
                  onClick={onOpenTrialModal}
                  className={`
                    w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all
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
          <span className="text-4xl inline-block animate-pulse-gentle">♞</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif-classic">
            Ready to Master the Royal Game?
          </h2>
          <p className="text-slate-300 text-sm max-w-lg mx-auto font-serif-garamond text-base">
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
