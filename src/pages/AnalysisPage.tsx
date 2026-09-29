import React, { useState } from 'react';
import { Chess } from 'chess.js';
import {
  Upload,
  Sparkles,
  Award,
  AlertTriangle,
  Zap,
  CheckCircle2,
  XCircle,
  ChevronRight,
  TrendingDown,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { ChessBoard } from '../components/chess/ChessBoard';
import { shatranjStore } from '../services/store';
import { GameAnalysis, CriticalMoment } from '../types';

export const AnalysisPage: React.FC = () => {
  const analysis: GameAnalysis = shatranjStore.getGameAnalysis();
  const [selectedMoment, setSelectedMoment] = useState<CriticalMoment>(analysis.criticalMoments[1]); // default to the turning point blunder
  const [activeBoardFen, setActiveBoardFen] = useState<string>(selectedMoment.fen);
  const [customPgnInput, setCustomPgnInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const displayGame = new Chess(activeBoardFen);

  const handleSelectMoment = (m: CriticalMoment) => {
    setSelectedMoment(m);
    setActiveBoardFen(m.fen);
  };

  const handlePasteAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPgnInput) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      // Analyzed successfully
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Game Review Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
            Deep Tactical Analysis
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">{analysis.playerWhite} ({analysis.whiteElo}) vs {analysis.playerBlack} ({analysis.blackElo})</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            {analysis.result}
          </span>
        </div>
      </div>

      {/* Accuracy Cards & Turning Point Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Overall Accuracy */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Overall Accuracy</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-400 font-mono">{analysis.accuracyWhite}%</span>
            <span className="text-xs text-slate-400">White</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${analysis.accuracyWhite}%` }} />
          </div>
        </div>

        {/* Opening Accuracy */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Opening Phase</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-400 font-mono">{analysis.openingAccuracy}%</span>
            <span className="text-xs text-slate-400">{analysis.openingName.split(':')[0]}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${analysis.openingAccuracy}%` }} />
          </div>
        </div>

        {/* Middlegame Accuracy */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Middlegame Phase</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-400 font-mono">{analysis.middlegameAccuracy}%</span>
            <span className="text-xs text-slate-400">Tactics</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-400 rounded-full" style={{ width: `${analysis.middlegameAccuracy}%` }} />
          </div>
        </div>

        {/* Endgame Accuracy */}
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Endgame Conversion</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-400 font-mono">{analysis.endgameAccuracy}%</span>
            <span className="text-xs text-slate-400">Conversion</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-purple-400 rounded-full" style={{ width: `${analysis.endgameAccuracy}%` }} />
          </div>
        </div>

      </div>

      {/* Critical Turning Point Banner */}
      <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 shadow-md">
            !
          </div>
          <div>
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Critical Turning Point • Move {analysis.turningPointMove}
            </div>
            <p className="text-sm font-semibold text-white mt-0.5">
              {analysis.turningPointSummary}
            </p>
          </div>
        </div>

        <button
          onClick={() => handleSelectMoment(analysis.criticalMoments[1])}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 transition-colors"
        >
          View Position on Board
        </button>
      </div>

      {/* Interactive Board & Move Moments Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Board View */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-[540px] p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-3 text-xs text-slate-400 border-b border-slate-800">
              <span className="font-semibold text-slate-200">
                Move {selectedMoment.moveNumber}: {selectedMoment.move} ({selectedMoment.classification.toUpperCase()})
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${selectedMoment.classification === 'blunder' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                Eval: {selectedMoment.evalBefore} → {selectedMoment.evalAfter}
              </span>
            </div>

            <div className="pt-3">
              <ChessBoard
                game={displayGame}
                boardTheme="emerald"
                interactive={false}
              />
            </div>

            <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                {selectedMoment.classification === 'blunder' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                {selectedMoment.classification === 'best' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {selectedMoment.classification === 'brilliant' && <Zap className="w-4 h-4 text-amber-400" />}
                <span>Coach Engine Commentary:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {selectedMoment.explanation}
              </p>
              {selectedMoment.betterMove && (
                <div className="text-amber-400 font-mono text-[11px] pt-1">
                  💡 Better Continuation: <strong>{selectedMoment.betterMove}</strong>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Moments List & PGN Import */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Critical Moments List */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Key Moments in this Game
            </span>

            <div className="space-y-2">
              {analysis.criticalMoments.map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectMoment(m)}
                  className={`
                    p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between
                    ${selectedMoment === m
                      ? 'border-amber-500 bg-amber-500/15 text-white'
                      : 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${m.classification === 'blunder' ? 'bg-red-400' : (m.classification === 'brilliant' ? 'bg-amber-400' : 'bg-emerald-400')}`} />
                    <div>
                      <span className="font-bold font-mono">Move {m.moveNumber}. {m.move}</span>
                      <span className="text-[11px] text-slate-400 block truncate max-w-[200px]">{m.explanation}</span>
                    </div>
                  </div>

                  <span className={`capitalize text-[10px] font-bold px-2 py-0.5 rounded ${m.classification === 'blunder' ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                    {m.classification}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Paste / Import Game Box */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Analyze Another Game
            </span>

            <form onSubmit={handlePasteAnalyze} className="space-y-3">
              <textarea
                rows={3}
                value={customPgnInput}
                onChange={(e) => setCustomPgnInput(e.target.value)}
                placeholder="Paste PGN or Chess.com / Lichess game URL here..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center justify-center gap-2"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isAnalyzing ? 'Analyzing with Engine...' : 'Run Deep Game Analysis'}</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
