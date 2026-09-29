import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { audioService } from '../services/audioService';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Parent / Enrollment Query');
  const [message, setMessage] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setTicketSent(true);
    audioService.playVictory();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 font-serif-classic">
          We're Here to Assist
        </h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto font-serif-garamond text-base">
          Have questions about our classical curriculum, grandmaster matching, or parent oversight? Our admissions team is on standby.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Support Options Cards (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          
          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/?text=Hi%20Knightesline%20Academy!%20I%20have%20a%20question%20about%20chess%20coaching."
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/15 transition-all block space-y-2 group classic-card"
          >
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <MessageSquare className="w-4 h-4" />
              <span>Instant WhatsApp Concierge</span>
            </div>
            <p className="text-xs text-slate-300">
              Chat directly with our academic counselor on WhatsApp. Average reply in 5 minutes.
            </p>
            <span className="text-xs font-semibold text-emerald-300 group-hover:underline block pt-1">
              Start WhatsApp Chat →
            </span>
          </a>

          {/* Email Support */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2 text-xs classic-card">
            <div className="flex items-center gap-2 text-white font-bold text-sm font-serif-classic">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Academic Inquiries</span>
            </div>
            <p className="text-slate-300 font-mono text-[11px]">
              support@knightesline.com • admissions@knightesline.com
            </p>
            <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
              <Clock className="w-3 h-3" />
              <span>Replies within 4 working hours</span>
            </div>
          </div>

          {/* Child Safety Badge */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-white font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Safe Environment Promise</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Every coach is identity and background checked. All classroom sessions and chats are audited for junior student safety.
            </p>
          </div>

        </div>

        {/* Contact Form (7 cols) */}
        <div className="md:col-span-7">
          <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl">
            {!ticketSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-base font-bold text-white mb-2">Send an Academic Inquiry</h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Parent or student name"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Inquiry Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  >
                    <option>Parent / Enrollment Query</option>
                    <option>Free Trial Assistance</option>
                    <option>Coach Matching Advice</option>
                    <option>Billing & Payment Query</option>
                    <option>Technical / Classroom Board Issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you or your child?"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4 py-8">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white font-serif-classic">Inquiry Received!</h3>
                <p className="text-xs text-slate-300 max-w-xs mx-auto">
                  Thanks {name}. Ticket #KNIGHTESLINE-882 has been registered. An academy dean will contact you shortly via email.
                </p>
                <button
                  onClick={() => setTicketSent(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Send another inquiry
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
