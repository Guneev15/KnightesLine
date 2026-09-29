import React, { useState } from 'react';
import { Settings, Volume2, VolumeX, Moon, Bell, Shield, CheckCircle2 } from 'lucide-react';
import { shatranjStore } from '../services/store';
import { audioService } from '../services/audioService';

export const SettingsPage: React.FC = () => {
  const [sound, setSound] = useState(audioService.isSoundEnabled());
  const [boardTheme, setBoardTheme] = useState<'emerald' | 'wood' | 'obsidian' | 'ice'>('emerald');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleToggleSound = () => {
    const next = !sound;
    setSound(next);
    audioService.setSoundEnabled(next);
    if (next) audioService.playVictory();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    audioService.playVictory();
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Customization
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Platform Settings & Preferences
          </h1>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Board Appearance */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Chessboard Aesthetics
          </h3>

          <div>
            <label className="block text-xs text-slate-400 mb-2">Preferred Board Theme</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {(['emerald', 'wood', 'obsidian', 'ice'] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setBoardTheme(t)}
                  className={`
                    p-3 rounded-xl border text-center capitalize font-semibold transition-all
                    ${boardTheme === t
                      ? 'border-amber-500 bg-amber-500/15 text-amber-300'
                      : 'border-slate-800 bg-slate-950 text-slate-300'
                    }
                  `}
                >
                  {t} Theme
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Audio & Sound Effects */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-sm font-bold text-white block">Chess Sound Effects</span>
            <span className="text-xs text-slate-400">
              Plays realistic piece move clicks, captures, check alerts, and victory sounds.
            </span>
          </div>

          <button
            type="button"
            onClick={handleToggleSound}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${sound ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
          >
            {sound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{sound ? 'Sound On' : 'Muted'}</span>
          </button>
        </div>

        {/* Theme Appearance (Dark Mode Only) */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-sm font-bold text-white block">Theme Appearance</span>
            <span className="text-xs text-slate-400">
              Knightesline Midnight Obsidian Dark Theme
            </span>
          </div>

          <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center gap-1.5">
            <Moon className="w-3.5 h-3.5 text-amber-400" />
            <span>Dark Mode</span>
          </span>
        </div>

        {/* Notifications & Reminders */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Class Reminders & Alerts
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={whatsappAlerts}
                onChange={(e) => setWhatsappAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-0 bg-slate-950 border-slate-700"
              />
              <span className="text-slate-300">Send WhatsApp class reminders 30 minutes before live coaching sessions</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-0 bg-slate-950 border-slate-700"
              />
              <span className="text-slate-300">Email post-session coach evaluations & homework assignments</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {saved && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Preferences saved successfully!</span>
            </div>
          )}
          <button
            type="submit"
            className="ml-auto px-6 py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </form>

    </div>
  );
};
