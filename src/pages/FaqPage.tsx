import React, { useState } from 'react';
import { ChevronDown, Search, Sparkles } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Do I need to know how to play chess before joining?',
    a: 'Not at all! Over 40% of our new junior students join with zero chess knowledge. Our "Chess Fundamentals: Zero to 1000" course and beginner coaches start from square one: how the board works, piece movements, and friendly basic checkmates.',
    category: 'Beginners & Kids'
  },
  {
    q: 'What age groups do you teach?',
    a: 'We have specialized pedagogical streams for kids aged 5 to 14, teenagers (14–18), and adult improvers. Junior classes are conducted with gamified graphics, puzzles, and patience, while competitive classes focus on tournament calculation.',
    category: 'Beginners & Kids'
  },
  {
    q: 'Are the coaching sessions live or pre-recorded?',
    a: 'Both! You get live interactive coaching sessions with titled FIDE masters on our synchronized virtual board, combined with unlimited on-demand video courses, puzzle workouts, and AI game review available 24/7.',
    category: 'Coaching'
  },
  {
    q: 'How does the Free Trial work?',
    a: 'Your free trial is a full 45-minute live 1-on-1 session with a FIDE master. No credit card or payment is required. We evaluate your current playing strength, demonstrate our interactive classroom, and give you an actionable improvement plan.',
    category: 'Free Trial'
  },
  {
    q: 'Can I change my coach if the learning style doesn’t match?',
    a: 'Yes, 100%. We understand that chemistry between student and mentor is vital. You can request a coach change anytime from your dashboard or WhatsApp counselor with zero hassle.',
    category: 'Coaching'
  },
  {
    q: 'Can parents monitor attendance and teacher feedback?',
    a: 'Yes! Every enrolled student account includes a dedicated Parent Dashboard. Parents receive plain-English post-session evaluations, homework completion logs, and monthly rating growth charts.',
    category: 'Parent Portal'
  },
  {
    q: 'Which payment methods are supported?',
    a: 'We support all major Indian payment methods through Razorpay: UPI (GPay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay), and NetBanking across 50+ Indian banks.',
    category: 'Billing'
  },
  {
    q: 'Can I cancel or pause my subscription anytime?',
    a: 'Yes. There are no lock-in periods or hidden cancellation fees. You can cancel your subscription with one click from your Subscription Settings page before the next renewal cycle.',
    category: 'Billing'
  },
  {
    q: 'Do you help prepare for official FIDE rating tournaments?',
    a: 'Yes. Our Pro and Elite plans include specific opening preparation, opponent scouting, time management under clock pressure, and official AICF / FIDE tournament registration guidance.',
    category: 'Coaching'
  }
];

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Beginners & Kids', 'Coaching', 'Free Trial', 'Parent Portal', 'Billing'];

  const filtered = FAQS.filter(item => {
    const matchesCat = filter === 'All' || item.category === filter;
    const matchesSearch = item.q.toLowerCase().includes(search.toLowerCase()) ||
                          item.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Clear Answers, Zero Jargon</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-300 max-w-lg mx-auto">
          Everything you need to know about our classes, trial process, coaching faculty, and parent portal.
        </p>
      </div>

      {/* Category Filter Pills & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`
                px-3 py-1.5 rounded-xl text-xs font-semibold transition-all
                ${filter === c
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
                }
              `}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filtered.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all overflow-hidden ${isOpen ? 'border-amber-500/50 bg-slate-900/90' : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'}`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4"
              >
                <span className="text-sm font-bold text-white leading-relaxed">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 animate-fade-in">
                  <p>{item.a}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      Category: {item.category}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
