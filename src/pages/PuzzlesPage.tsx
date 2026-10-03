import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Lightbulb, RotateCcw, ArrowRight, Flame, Trophy, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChessBoard } from '../components/chess/ChessBoard';
import { shatranjStore } from '../services/store';
import { audioService } from '../services/audioService';
import { Puzzle } from '../types';

export const PuzzlesPage: React.FC = () => {
  const puzzles = shatranjStore.getPuzzles();
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentPuzzle: Puzzle = puzzles[currentIdx] || puzzles[0];

  const [game, setGame] = useState(() => new Chess(currentPuzzle.fen));
  const [moveStep, setMoveStep] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [hintShown, setHintShown] = useState(false);
  const [streak, setStreak] = useState(7);
  const [playerRating, setPlayerRating] = useState(1320);
  const [ratingDelta, setRatingDelta] = useState<number | null>(null);

  useEffect(() => {
    setGame(new Chess(currentPuzzle.fen));
    setMoveStep(0);
    setIsSolved(false);
    setIsFailed(false);
    setHintShown(false);
    setRatingDelta(null);
  }, [currentIdx, currentPuzzle]);

  const handleMove = (_from: string, _to: string, san: string) => {
    if (isSolved || isFailed) return;

    const expectedMove = currentPuzzle.solutionMoves[moveStep];

    if (san === expectedMove) {
      const nextStep = moveStep + 1;
      setMoveStep(nextStep);

      // Check if puzzle is fully completed or needs opponent auto-response
      if (nextStep >= currentPuzzle.solutionMoves.length) {
        setIsSolved(true);
        setRatingDelta(12);
        setPlayerRating(prev => prev + 12);
        setStreak(prev => prev + 1);
        audioService.playVictory();

        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      } else {
        // Opponent automatic response move in multi-move puzzle
        const opponentReply = currentPuzzle.solutionMoves[nextStep];
        setTimeout(() => {
          try {
            game.move(opponentReply);
            setGame(new Chess(game.fen()));
            audioService.playMove();
            setMoveStep(nextStep + 1);
          } catch {}
        }, 500);
      }
    } else {
      // Wrong move
      audioService.playError();
      setIsFailed(true);
      setRatingDelta(-8);
      setPlayerRating(prev => Math.max(800, prev - 8));
    }
  };

  const resetCurrentPuzzle = () => {
    setGame(new Chess(currentPuzzle.fen));
    setMoveStep(0);
    setIsSolved(false);
    setIsFailed(false);
    setHintShown(false);
    setRatingDelta(null);
  };

  const nextPuzzle = () => {
    setCurrentIdx((prev) => (prev + 1) % puzzles.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header and Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
        <div>
          <div className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5 font-serif-classic">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tactical Calculation Gym</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-0.5 font-serif-classic">
            {currentPuzzle.title}
          </h1>
        </div>

        {/* Gamified counters: Streak & Puzzle Rating */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="text-xs font-bold text-white font-mono">{streak} Days Streak</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-white font-mono">
              Rating: {playerRating}
              {ratingDelta !== null && (
                <span className={`ml-1 text-[11px] font-bold ${ratingDelta > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  ({ratingDelta > 0 ? `+${ratingDelta}` : ratingDelta})
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Main Area: Board on Left, Tactical Panel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Large Chessboard */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-[540px] p-2.5 sm:p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-3 text-xs text-slate-400 border-b border-slate-800">
              <span className="font-semibold text-slate-200 capitalize">
                {currentPuzzle.playerColor} to move
              </span>
              <span className="text-amber-400 font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800">
                Difficulty: {currentPuzzle.rating} Elo
              </span>
            </div>

            <div className="pt-3">
              <ChessBoard
                game={game}
                onMove={handleMove}
                orientation={currentPuzzle.playerColor}
                boardTheme="emerald"
                interactive={!isSolved}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="italic text-[11px]">
                {isSolved ? 'Puzzle solved!' : (isFailed ? 'Incorrect attempt' : 'Drag or click the best move')}
              </span>
              <button
                onClick={resetCurrentPuzzle}
                className="hover:text-white flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Tactical Analysis and Explanation Panel */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Main Status Prompt */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Objective
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30">
                {currentPuzzle.theme}
              </span>
            </div>

            <h2 className="text-xl font-bold text-white">
              {!isSolved && !isFailed && 'Find the best move.'}
              {isSolved && '🎉 Excellent Tactical Vision!'}
              {isFailed && '❌ Not quite. That allows a counter-attack.'}
            </h2>

            {/* Hint Box */}
            {!isSolved && (
              <div>
                {!hintShown ? (
                  <button
                    onClick={() => setHintShown(true)}
                    className="px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold hover:bg-amber-500/20 transition-colors flex items-center gap-1.5"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Need a hint?</span>
                  </button>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                    💡 <strong>Hint:</strong> {currentPuzzle.hint}
                  </div>
                )}
              </div>
            )}

            {/* Crucial requirement: Detailed WHY it works explanation */}
            {isSolved && (
              <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-200 space-y-2 animate-fade-in">
                <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Why this move works:</span>
                </div>
                <p className="leading-relaxed">
                  {currentPuzzle.tacticalExplanation}
                </p>
              </div>
            )}

            {isFailed && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 space-y-2">
                <div className="font-bold flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  <span>Tactical Error</span>
                </div>
                <p>
                  That move misses the tactical motif. Reset the board and look for checks, captures, and unprotected pieces!
                </p>
                <button
                  onClick={resetCurrentPuzzle}
                  className="px-3 py-1.5 rounded-lg bg-red-500 text-white font-bold text-xs"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>

          {/* Next Puzzle Action */}
          <button
            onClick={nextPuzzle}
            className={`
              w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
              ${isSolved
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 shadow-lg shadow-amber-500/25'
                : 'border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }
            `}
          >
            <span>Next Tactical Challenge</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Tactical theme list */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/30 text-xs space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Popular Tactical Themes in Gym
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Pins & Skewers', 'Knight Forks', 'Back-Rank Mate', 'Greek Gift Sacrifice', 'Deflection', 'Overloading'].map((theme, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-[11px]">
                  {theme}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
