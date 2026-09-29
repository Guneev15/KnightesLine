import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import {
  RotateCcw,
  Swords,
  Timer,
  Flag,
  Share2,
  Copy,
  Check,
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { ChessBoard } from '../components/chess/ChessBoard';
import { ChessEngine } from '../services/chessEngine';
import { audioService } from '../services/audioService';

interface BotLevel {
  level: number;
  name: string;
  rating: number;
  avatar: string;
  tagline: string;
}

const BOTS: BotLevel[] = [
  { level: 1, name: 'Pawn Hopper', rating: 800, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80', tagline: 'Friendly beginner bot. Occasionally overlooks hanging pieces.' },
  { level: 2, name: 'Tactics Cadet', rating: 1200, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80', tagline: 'Solid intermediate bot. Punishes one-move tactical mistakes.' },
  { level: 3, name: 'Positional Pete', rating: 1600, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', tagline: 'Strategic club player. Understands outposts and pawn chains.' },
  { level: 4, name: 'Master Mind', rating: 2000, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', tagline: 'Deep tactical calculator. Rarely misses an endgame conversion.' },
];

export const PlayPage: React.FC = () => {
  const [selectedBot, setSelectedBot] = useState<BotLevel>(BOTS[1]);
  const [game, setGame] = useState(() => new Chess());
  const [orientation, setOrientation] = useState<'white' | 'black'>('white');
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [evalScore, setEvalScore] = useState<number>(0);
  const [copiedPgn, setCopiedPgn] = useState(false);
  const [gameOverResult, setGameOverResult] = useState<string | null>(null);

  // Time controls
  const [whiteTime, setWhiteTime] = useState(600); // 10 mins in seconds
  const [blackTime, setBlackTime] = useState(600);
  const [clockRunning, setClockRunning] = useState(false);

  useEffect(() => {
    if (!clockRunning || gameOverResult) return;
    const interval = setInterval(() => {
      if (game.turn() === 'w') {
        setWhiteTime((prev) => Math.max(0, prev - 1));
      } else {
        setBlackTime((prev) => Math.max(0, prev - 1));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [clockRunning, game, gameOverResult]);

  const handlePlayerMove = (_from: string, _to: string, san: string) => {
    setMoveHistory((prev) => [...prev, san]);
    setClockRunning(true);
    const newEval = ChessEngine.getEvaluationInPawns(game);
    setEvalScore(newEval);

    // Check game over
    if (game.isGameOver()) {
      handleGameOver();
      return;
    }

    // Bot move turn
    if (game.turn() === 'b') {
      setIsBotThinking(true);
      setTimeout(() => {
        const botMove = ChessEngine.getBestMove(game, selectedBot.level);
        if (botMove) {
          try {
            const moveObj = game.move(botMove);
            setGame(new Chess(game.fen()));
            if (moveObj.captured) audioService.playCapture();
            else audioService.playMove();

            if (game.isCheck()) audioService.playCheck();

            setMoveHistory((prev) => [...prev, moveObj.san]);
            setEvalScore(ChessEngine.getEvaluationInPawns(game));

            if (game.isGameOver()) {
              handleGameOver();
            }
          } catch {}
        }
        setIsBotThinking(false);
      }, 500);
    }
  };

  const handleGameOver = () => {
    setClockRunning(false);
    if (game.isCheckmate()) {
      const winner = game.turn() === 'w' ? 'Black (Bot)' : 'White (You)';
      setGameOverResult(`Checkmate! ${winner} wins!`);
      audioService.playVictory();
    } else if (game.isDraw()) {
      setGameOverResult('Game drawn by stalemate / repetition.');
    }
  };

  const restartGame = () => {
    const newG = new Chess();
    setGame(newG);
    setMoveHistory([]);
    setEvalScore(0);
    setGameOverResult(null);
    setWhiteTime(600);
    setBlackTime(600);
    setClockRunning(false);
  };

  const copyPgn = () => {
    navigator.clipboard.writeText(game.pgn());
    setCopiedPgn(true);
    setTimeout(() => setCopiedPgn(false), 2000);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
        <div>
          <div className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5 font-serif-classic">
            <Swords className="w-3.5 h-3.5" />
            <span>Classical Sparring Arena</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-0.5 font-serif-classic">
            Sparring vs Automated Masters
          </h1>
        </div>

        {/* Bot selector pills */}
        <div className="flex flex-wrap gap-2">
          {BOTS.map((bot) => (
            <button
              key={bot.level}
              onClick={() => { setSelectedBot(bot); restartGame(); }}
              className={`
                px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all
                ${selectedBot.level === bot.level
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                }
              `}
            >
              <span>{bot.name}</span>
              <span className="text-[10px] opacity-75 font-mono">({bot.rating})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Play Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Chessboard & Clocks & Evaluation Bar */}
        <div className="lg:col-span-8 flex flex-col items-center">
          
          <div className="w-full max-w-[560px] space-y-3">
            
            {/* Top Opponent Card (Black) */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div className="flex items-center gap-2.5">
                <img src={selectedBot.avatar} alt={selectedBot.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>{selectedBot.name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-amber-400 font-mono">
                      {selectedBot.rating} Elo
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {isBotThinking ? 'Thinking...' : 'Ready'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono text-sm font-bold bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-200">
                <Timer className="w-3.5 h-3.5 text-slate-400" />
                <span>{formatTime(blackTime)}</span>
              </div>
            </div>

            {/* Chessboard with Evaluation Bar */}
            <div className="flex gap-3">
              
              {/* Dynamic Engine Eval Bar */}
              <div className="w-4 rounded-lg bg-slate-800 overflow-hidden flex flex-col justify-end border border-slate-700 relative">
                {/* White advantage fills from bottom */}
                <div
                  className="w-full bg-white transition-all duration-300"
                  style={{
                    height: `${Math.min(95, Math.max(5, 50 + evalScore * 8))}%`
                  }}
                />
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-mono font-bold text-slate-950 rotate-90">
                  {evalScore > 0 ? `+${evalScore}` : evalScore}
                </span>
              </div>

              {/* Main Board */}
              <div className="flex-1">
                <ChessBoard
                  game={game}
                  onMove={handlePlayerMove}
                  orientation={orientation}
                  interactive={!gameOverResult && !isBotThinking}
                />
              </div>
            </div>

            {/* Bottom Player Card (White) */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="You"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>You (White)</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-400 font-mono">
                      1248 Elo
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {game.turn() === 'w' ? 'Your turn to move' : 'Waiting for opponent'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono text-sm font-bold bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-amber-400">
                <Timer className="w-3.5 h-3.5" />
                <span>{formatTime(whiteTime)}</span>
              </div>
            </div>

            {/* Game Over Banner */}
            {gameOverResult && (
              <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/40 text-center space-y-2 animate-fade-in">
                <h3 className="text-base font-bold text-amber-300">{gameOverResult}</h3>
                <button
                  onClick={restartGame}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Play Rematch ♟
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Right: Controls & Move History */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Quick Actions Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Game Controls
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                onClick={restartGame}
                className="p-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white flex flex-col items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>New Game</span>
              </button>
              <button
                onClick={() => setOrientation(prev => prev === 'white' ? 'black' : 'white')}
                className="p-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white flex flex-col items-center gap-1 transition-colors"
              >
                <Swords className="w-4 h-4 text-blue-400" />
                <span>Flip Board</span>
              </button>
              <button
                onClick={() => {
                  setGameOverResult('You resigned. Game over.');
                  setClockRunning(false);
                }}
                className="p-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-red-400 flex flex-col items-center gap-1 transition-colors"
              >
                <Flag className="w-4 h-4 text-red-400" />
                <span>Resign</span>
              </button>
            </div>
          </div>

          {/* Move History Log */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider">Move History</span>
              <button
                onClick={copyPgn}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                {copiedPgn ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPgn ? 'Copied PGN' : 'Export PGN'}</span>
              </button>
            </div>

            <div className="h-48 overflow-y-auto p-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
              {moveHistory.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {moveHistory.reduce<string[][]>((acc, cur, idx) => {
                    if (idx % 2 === 0) acc.push([cur]);
                    else acc[acc.length - 1].push(cur);
                    return acc;
                  }, []).map((pair, turnIdx) => (
                    <React.Fragment key={turnIdx}>
                      <span className="text-slate-500">{turnIdx + 1}. <strong className="text-white">{pair[0]}</strong></span>
                      <span className="text-slate-400">{pair[1] || ''}</span>
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-600 italic">
                  Game in progress...
                </div>
              )}
            </div>
          </div>

          {/* Bot details note */}
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/30 text-xs text-slate-400 space-y-1.5">
            <div className="font-semibold text-slate-200">{selectedBot.name} Overview</div>
            <p className="leading-relaxed">{selectedBot.tagline}</p>
          </div>

        </div>
      </div>
    </div>
  );
};
