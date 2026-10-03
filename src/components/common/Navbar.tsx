import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Bell,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  User,
  LogOut,
  ShieldCheck,
  Award,
  Swords,
  Layers,
  Crown
} from 'lucide-react';
import { shatranjStore } from '../../services/store';
import { audioService } from '../../services/audioService';
import { UserRole } from '../../types';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string, param?: string) => void;
  onOpenTrialModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenTrialModal,
}) => {
  const [role, setRole] = useState<UserRole>(shatranjStore.getRole());
  const [user, setUser] = useState(shatranjStore.getUser());
  const [soundEnabled, setSoundEnabled] = useState(audioService.isSoundEnabled());
  const [unreadCount, setUnreadCount] = useState(shatranjStore.getUnreadNotificationCount());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [practiceMenuOpen, setPracticeMenuOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const unsub = shatranjStore.subscribe(() => {
      setRole(shatranjStore.getRole());
      setUser(shatranjStore.getUser());
      setUnreadCount(shatranjStore.getUnreadNotificationCount());
    });
    return unsub;
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setRoleMenuOpen(false);
        setProfileMenuOpen(false);
        setPracticeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleChange = (newRole: UserRole) => {
    shatranjStore.setRole(newRole);
    setRoleMenuOpen(false);
    if (newRole === 'student') onNavigate('student-dashboard');
    else if (newRole === 'parent') onNavigate('parent-dashboard');
    else if (newRole === 'coach') onNavigate('coach-dashboard');
    else if (newRole === 'admin') onNavigate('admin-dashboard');
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    audioService.setSoundEnabled(next);
    setSoundEnabled(next);
    if (next) audioService.playNotification();
  };

  const practiceItems = [
    { label: 'Tactical Gym', path: 'puzzles', icon: Layers, desc: 'Pattern calculation & streaks' },
    { label: 'Sparring Bots', path: 'play', icon: Swords, desc: 'Play vs graded AI masters' },
    { label: 'Live Classroom', path: 'classroom', icon: Sparkles, desc: 'Virtual interactive board' },
    { label: 'Game Analysis', path: 'analysis', icon: Award, desc: 'Full engine review & blunders' },
  ];

  const isPracticeActive = ['puzzles', 'play', 'classroom', 'analysis'].includes(currentPath);

  const getDashboardPath = () => {
    switch (role) {
      case 'parent': return 'parent-dashboard';
      case 'coach': return 'coach-dashboard';
      case 'admin': return 'admin-dashboard';
      default: return 'student-dashboard';
    }
  };

  return (
    <header ref={navRef} className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0b0e14]/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-18 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2.5 cursor-pointer group select-none flex-shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#e5c158] via-[#d4af37] to-[#9a7b38] flex items-center justify-center shadow-md shadow-[#d4af37]/20 group-hover:scale-105 transition-all duration-300 border border-[#f0cf6a]/60 flex-shrink-0">
            {/* Noble Knight Emblem */}
            <svg viewBox="0 0 45 45" className="w-6 h-6 fill-slate-950 stroke-slate-950">
              <path d="m 22,10 c 10.5,1 16.5,8 16,29 l -23,0 c 0,-9 10,-6.5 8,-21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="m 24,18 c 0.38,2.91 -5.55,7.37 -8,9 -3,2 -2.82,4.34 -5,4 -1.042,-0.94 1.41,-4.04 3,-6 2.05,-2.53 3.13,-5.74 3,-9 0.69,0.36 1.94,0.36 2.5,-0.5 0.56,-0.86 0.19,-1.86 -0.5,-2.5 -0.69,-0.64 -1.5,-0.64 -2.5,-0.5 -1.03,0.14 -1.97,0.78 -2.5,1.5 -1.25,1.72 -1.25,4.72 -1,6.5 -0.83,0.33 -1.67,0.67 -2.5,1 -0.5,0.2 -1,0.4 -1.5,0.6 C 4,23 3.5,21.5 4,19 4.5,16.5 7,14 10,12 c 3,-2 7,-3 12,-2 z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-serif-classic font-bold text-lg sm:text-xl tracking-[0.05em] bg-gradient-to-r from-[#faecd0] via-[#ffffff] to-[#d4af37] bg-clip-text text-transparent">
            KNIGHTESLINE
          </span>
        </div>

        {/* Desktop Navigation Links (Decluttered & streamlined) */}
        <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => onNavigate('courses')}
            className={`
              px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-150 font-serif-classic
              ${currentPath === 'courses'
                ? 'text-amber-400 bg-amber-500/10 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }
            `}
          >
            Learn
          </button>

          {/* Practice Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setPracticeMenuOpen(true)}
            onMouseLeave={() => setPracticeMenuOpen(false)}
          >
            <button
              onClick={() => setPracticeMenuOpen(!practiceMenuOpen)}
              className={`
                px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-150 flex items-center gap-1 font-serif-classic
                ${isPracticeActive
                  ? 'text-amber-400 bg-amber-500/10 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }
              `}
            >
              <span>Practice</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${practiceMenuOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'}`} />
            </button>

            {practiceMenuOpen && (
              <div className="absolute top-full left-0 pt-2 w-64 z-50 animate-fadeIn">
                <div className="p-2 rounded-2xl bg-[#0e121a]/95 border border-amber-500/30 shadow-2xl backdrop-blur-xl space-y-1">
                  <div className="px-3 py-1 text-[10px] font-bold text-amber-400/80 uppercase tracking-widest font-serif-classic">
                    Interactive Arena
                  </div>
                  {practiceItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.path;
                    return (
                      <button
                        key={item.path}
                        onClick={() => {
                          setPracticeMenuOpen(false);
                          onNavigate(item.path);
                        }}
                        className={`
                          w-full text-left p-2 rounded-xl transition-all flex items-start gap-2.5 group
                          ${isActive
                            ? 'bg-amber-500/15 border border-amber-500/30'
                            : 'hover:bg-slate-800/60'
                          }
                        `}
                      >
                        <div className={`p-1.5 rounded-lg ${isActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-amber-400 group-hover:bg-amber-500/20'}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className={`text-xs font-bold font-serif-classic ${isActive ? 'text-amber-300' : 'text-white group-hover:text-amber-300'}`}>
                            {item.label}
                          </div>
                          <div className="text-[10px] text-slate-400 leading-tight">
                            {item.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('pricing')}
            className={`
              px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-150 flex items-center gap-1.5 font-serif-classic
              ${currentPath === 'pricing'
                ? 'text-amber-400 bg-amber-500/10 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }
            `}
          >
            <span>Pricing</span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-sans">
              From ₹799
            </span>
          </button>

          <button
            onClick={() => onNavigate('community')}
            className={`
              px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-150 font-serif-classic
              ${currentPath === 'community'
                ? 'text-amber-400 bg-amber-500/10 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }
            `}
          >
            Community
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          
          {/* Logged Out / Guest Controls */}
          {!user ? (
            <>
              {/* Quick utility controls (Sound) */}
              <div className="flex items-center gap-0.5 p-0.5 rounded-lg border border-slate-800 bg-slate-900/60">
                <button
                  onClick={toggleSound}
                  aria-label="Toggle Chess Sounds"
                  className="p-1.5 rounded-md text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
                </button>
              </div>

              {/* Log In Button (Hidden on tiny screens to avoid header squish; available in mobile drawer) */}
              <button
                onClick={() => onNavigate('login')}
                className="hidden sm:inline-flex px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/80 transition-all font-serif-classic tracking-wider"
              >
                Log In
              </button>

              {/* Primary CTA: Book Free Trial */}
              <button
                onClick={onOpenTrialModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-serif-classic font-bold btn-classic-gold tracking-wide whitespace-nowrap shadow-md flex-shrink-0"
              >
                <span>Free Trial</span>
                <span className="text-xs">♞</span>
              </button>
            </>
          ) : (
            <>
              {/* Persona Switcher (Only when logged in) */}
              <div className="relative">
                <button
                  onClick={() => { setRoleMenuOpen(!roleMenuOpen); setProfileMenuOpen(false); setPracticeMenuOpen(false); }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-colors"
                  title="Switch user perspective"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span className="capitalize text-xs font-serif-classic hidden sm:inline">{user.role} View</span>
                  <ChevronDown className="w-3 h-3 text-amber-400/80" />
                </button>

                {roleMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 z-50 animate-fadeIn">
                    <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-serif-classic">
                      Switch Role
                    </div>
                    {(['student', 'parent', 'coach', 'admin'] as UserRole[]).map((r) => (
                      <button
                        key={r}
                        onClick={() => handleRoleChange(r)}
                        className={`
                          w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between
                          ${user.role === r ? 'bg-amber-500/15 text-amber-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'}
                        `}
                      >
                        <span className="capitalize">{r}</span>
                        {user.role === r && <span className="text-amber-400 text-xs">● Active</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick utility controls cluster (Sound, Theme, Bell) */}
              <div className="flex items-center gap-0.5 p-0.5 rounded-lg border border-slate-800 bg-slate-900/60">
                <button
                  onClick={toggleSound}
                  aria-label="Toggle Chess Sounds"
                  className="p-1.5 rounded-md text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
                </button>

                <button
                  onClick={() => onNavigate('notifications')}
                  className="relative p-1.5 rounded-md text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                >
                  <Bell className="w-3.5 h-3.5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  )}
                </button>
              </div>

              {/* Primary CTA: Book Free Trial */}
              <button
                onClick={onOpenTrialModal}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-serif-classic font-bold btn-classic-gold tracking-wide whitespace-nowrap shadow-md flex-shrink-0"
              >
                <span>Free Trial</span>
                <span className="text-xs">♞</span>
              </button>

              {/* User Profile Avatar */}
              <div className="relative">
                <button
                  onClick={() => { setProfileMenuOpen(!profileMenuOpen); setRoleMenuOpen(false); setPracticeMenuOpen(false); }}
                  className="flex items-center p-0.5 rounded-full border border-slate-700 bg-slate-800/40 hover:border-amber-400/50 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-amber-500/40"
                  />
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-fadeIn">
                    <div className="px-3 py-2 border-b border-slate-800">
                      <div className="text-xs font-bold text-white font-serif-classic">{user.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                      {user.rating > 0 && (
                        <div className="mt-1 flex items-center gap-1.5 text-[10px] text-amber-400 font-semibold font-mono">
                          <span>Rating: {user.rating} Elo</span>
                          <span className="text-emerald-400">(+{user.monthlyRatingDelta})</span>
                        </div>
                      )}
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => { setProfileMenuOpen(false); onNavigate(getDashboardPath()); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5 text-amber-400" />
                        <span>My Dashboard ({user.role})</span>
                      </button>
                      <button
                        onClick={() => { setProfileMenuOpen(false); onNavigate('subscription'); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>Subscription ({user.subscriptionTier?.toUpperCase() || 'FREE'})</span>
                      </button>
                      <button
                        onClick={() => { setProfileMenuOpen(false); onNavigate('profile'); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                        <span>Profile & Achievements</span>
                      </button>
                      <button
                        onClick={() => { setProfileMenuOpen(false); onNavigate('settings'); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                      >
                        <Crown className="w-3.5 h-3.5 text-purple-400" />
                        <span>Settings & Preferences</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-800">
                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          shatranjStore.logout();
                          onNavigate('home');
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0b0e14]/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <button
            onClick={() => { setMobileMenuOpen(false); onNavigate('courses'); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider font-serif-classic ${currentPath === 'courses' ? 'bg-amber-500/15 text-amber-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            Learn Courses
          </button>

          <div className="pt-1 pb-1 border-y border-slate-800/80 my-1">
            <div className="px-4 py-1 text-[10px] font-bold text-amber-500/70 uppercase tracking-widest font-serif-classic">
              Interactive Arena
            </div>
            {practiceItems.map((item) => (
              <button
                key={item.path}
                onClick={() => { setMobileMenuOpen(false); onNavigate(item.path); }}
                className={`w-full text-left px-4 py-2 rounded-xl text-xs font-medium flex items-center justify-between ${currentPath === item.path ? 'bg-amber-500/15 text-amber-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-slate-500">{item.desc}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => { setMobileMenuOpen(false); onNavigate('pricing'); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider font-serif-classic flex items-center justify-between ${currentPath === 'pricing' ? 'bg-amber-500/15 text-amber-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <span>Pricing</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-sans">
              From ₹799
            </span>
          </button>

          <button
            onClick={() => { setMobileMenuOpen(false); onNavigate('community'); }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider font-serif-classic ${currentPath === 'community' ? 'bg-amber-500/15 text-amber-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            Community Guild
          </button>

          <div className="pt-2 flex flex-col gap-2">
            {!user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('login');
                }}
                className="w-full py-2.5 rounded-xl text-center font-bold text-xs uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-serif-classic"
              >
                Log In
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  shatranjStore.logout();
                  onNavigate('home');
                }}
                className="w-full py-2.5 rounded-xl text-center font-bold text-xs uppercase tracking-wider bg-red-500/15 text-red-400 border border-red-500/30 font-serif-classic"
              >
                Log Out ({user.name})
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrialModal();
              }}
              className="w-full py-3 rounded-xl text-center font-bold text-xs uppercase tracking-wider btn-classic-gold font-serif-classic"
            >
              Book Your Free Trial ♞
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
