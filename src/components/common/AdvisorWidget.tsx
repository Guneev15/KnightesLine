import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, CheckCircle2, ChevronUp } from 'lucide-react';

import { ACADEMY_CONFIG } from '../../services/notificationService';

interface AdvisorWidgetProps {
  onOpenTrialModal: () => void;
}

export const AdvisorWidget: React.FC<AdvisorWidgetProps> = ({ onOpenTrialModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      "Hi Knightesline Academy! I'm interested in finding the right chess coach and learning more about your courses."
    );
    window.open(`https://wa.me/${ACADEMY_CONFIG.OWNER_PHONE}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none font-sans">
      {/* Expanded Modal Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl border border-amber-500/30 bg-slate-900/95 backdrop-blur-xl shadow-2xl p-5 space-y-4 text-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif text-xl font-bold">
                  ♞
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-slate-900 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Academic Chess Advisor</span>
                  <span className="text-[10px] text-emerald-400 font-medium">Online</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Admissions &amp; Coach Matching
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close Advisor Widget"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Pitch */}
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="leading-relaxed">
              Wondering whether your child or you should start with <strong className="text-amber-300">Fundamentals</strong> or <strong className="text-amber-300">Tactical Vision</strong>?
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Free personalized skill rating evaluation</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Direct WhatsApp chat with an educator</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleWhatsApp}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp ({ACADEMY_CONFIG.OWNER_PHONE_FORMATTED})</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenTrialModal();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/15 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book 45-Min Free Evaluation Session</span>
            </button>
          </div>

          <div className="text-[10px] text-center text-slate-500 pt-1">
            Typically replies within 5 minutes • Available 7 days a week
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900/90 hover:bg-slate-850 border border-amber-500/40 hover:border-amber-400 text-slate-100 shadow-2xl backdrop-blur-md transition-all transform hover:scale-105 cursor-pointer ring-4 ring-amber-500/10"
          aria-label="Open Academic Chess Advisor"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="absolute w-4 h-4 rounded-full bg-emerald-400/30 animate-ping" />
          </div>
          <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
            Ask an Advisor
          </span>
          <span className="text-xs text-amber-400 font-serif font-bold">♞</span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
        </button>
      )}
    </div>
  );
};
