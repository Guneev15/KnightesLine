import React, { useState, useEffect } from 'react';
import { Chess, Square } from 'chess.js';
import { ChessPiece } from './ChessPieces';
import { audioService } from '../../services/audioService';

export interface BoardDrawing {
  type: 'arrow' | 'highlight';
  from: string;
  to?: string;
  color?: string; // 'emerald' | 'amber' | 'crimson' | 'blue'
}

interface ChessBoardProps {
  game: Chess;
  onMove?: (from: string, to: string, san: string) => void;
  orientation?: 'white' | 'black';
  interactive?: boolean;
  boardTheme?: 'wood' | 'emerald' | 'obsidian' | 'ice';
  showCoordinates?: boolean;
  drawings?: BoardDrawing[];
  lastMove?: { from: string; to: string } | null;
  className?: string;
}

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

/**
 * Tournament-Grade Grandmaster Chessboard
 * Features:
 * - Chess.com & Lichess signature themes (Tournament Emerald, Classical Walnut Wood, Dark Obsidian)
 * - Corner-anchored dynamic coordinate typography
 * - Tactile piece drag-and-drop & click-to-move
 * - Authentic move & capture highlights with quiet move dots and capture rings
 * - Checked King glowing red beacon
 * - Luxury beveled border casing
 */
export const ChessBoard: React.FC<ChessBoardProps> = ({
  game,
  onMove,
  orientation = 'white',
  interactive = true,
  boardTheme = 'emerald',
  showCoordinates = true,
  drawings = [],
  lastMove: propLastMove,
  className = '',
}) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  const [internalLastMove, setInternalLastMove] = useState<{ from: string; to: string } | null>(null);
  const [draggedSquare, setDraggedSquare] = useState<Square | null>(null);

  // Sync propLastMove
  const lastMove = propLastMove !== undefined ? propLastMove : internalLastMove;

  // Clear selections when game board changes externally
  useEffect(() => {
    setSelectedSquare(null);
    setLegalMoves([]);
  }, [game]);

  const isFlipped = orientation === 'black';
  const displayFiles = isFlipped ? [...FILES].reverse() : FILES;
  const displayRanks = isFlipped ? [...RANKS].reverse() : RANKS;

  // Tournament-accurate board themes
  const themeStyles = {
    emerald: {
      light: 'bg-[#eeeed2]',
      dark: 'bg-[#769656]',
      coordLight: 'text-[#769656]',
      coordDark: 'text-[#eeeed2]',
      selected: '!bg-[#baca44] ring-2 ring-[#769656]/80',
      lastMove: '!bg-[#f7ec74]/75 ring-1 ring-[#c7b832]/50',
    },
    wood: {
      light: 'bg-[#f0d9b5]',
      dark: 'bg-[#b58863]',
      coordLight: 'text-[#b58863]',
      coordDark: 'text-[#f0d9b5]',
      selected: '!bg-[#d8c365] ring-2 ring-[#8b6e4b]/80',
      lastMove: '!bg-[#ced26b]/75 ring-1 ring-[#9a9e3e]/50',
    },
    obsidian: {
      light: 'bg-[#2b3245]',
      dark: 'bg-[#151a26]',
      coordLight: 'text-[#7e8ba3]',
      coordDark: 'text-[#505c75]',
      selected: '!bg-[#3b82f6]/40 ring-2 ring-blue-500/80',
      lastMove: '!bg-[#38bdf8]/25 ring-1 ring-cyan-400/40',
    },
    ice: {
      light: 'bg-[#e0f2fe]',
      dark: 'bg-[#0284c7]',
      coordLight: 'text-[#0284c7]',
      coordDark: 'text-[#e0f2fe]',
      selected: '!bg-[#38bdf8]/45 ring-2 ring-cyan-500/80',
      lastMove: '!bg-[#bae6fd]/60 ring-1 ring-sky-400/50',
    }
  }[boardTheme];

  const handleSquareClick = (square: Square) => {
    if (!interactive) return;

    // If a square is already selected
    if (selectedSquare) {
      // If clicking same square, deselect
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setLegalMoves([]);
        return;
      }

      // Check if clicked square is a legal destination
      if (legalMoves.includes(square)) {
        makeMove(selectedSquare, square);
        return;
      }

      // If clicking another piece of our turn, reselect
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        selectPiece(square);
        return;
      }

      // Invalid click, deselect
      setSelectedSquare(null);
      setLegalMoves([]);
    } else {
      // Nothing selected: try selecting piece
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        selectPiece(square);
      }
    }
  };

  const selectPiece = (square: Square) => {
    setSelectedSquare(square);
    try {
      const moves = game.moves({ square, verbose: true });
      setLegalMoves(moves.map(m => m.to));
    } catch {
      setLegalMoves([]);
    }
  };

  const makeMove = (from: Square, to: Square) => {
    try {
      // Detect pawn promotion automatically to Queen
      const piece = game.get(from);
      let promotion: 'q' | undefined = undefined;
      if (piece?.type === 'p') {
        if ((piece.color === 'w' && to[1] === '8') || (piece.color === 'b' && to[1] === '1')) {
          promotion = 'q';
        }
      }

      const moveObj = game.move({ from, to, promotion });
      if (moveObj) {
        // Sound effects
        if (moveObj.captured) {
          audioService.playCapture();
        } else {
          audioService.playMove();
        }

        if (game.isCheck()) {
          audioService.playCheck();
        }

        setInternalLastMove({ from, to });
        setSelectedSquare(null);
        setLegalMoves([]);

        if (onMove) {
          onMove(from, to, moveObj.san);
        }
      } else {
        audioService.playError();
      }
    } catch {
      audioService.playError();
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, square: Square) => {
    if (!interactive) return;
    const piece = game.get(square);
    if (!piece || piece.color !== game.turn()) {
      e.preventDefault();
      return;
    }
    setDraggedSquare(square);
    selectPiece(square);
    e.dataTransfer.setData('text/plain', square);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetSquare: Square) => {
    e.preventDefault();
    if (draggedSquare && draggedSquare !== targetSquare) {
      if (legalMoves.includes(targetSquare)) {
        makeMove(draggedSquare, targetSquare);
      } else {
        audioService.playError();
      }
    }
    setDraggedSquare(null);
  };

  // Check if king is in check
  let checkSquare: string | null = null;
  if (game.isCheck()) {
    const board = game.board();
    const turn = game.turn();
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (p && p.type === 'k' && p.color === turn) {
          checkSquare = `${FILES[c]}${8 - r}`;
        }
      }
    }
  }

  // Helper for arrow coordinate mapping (0-7 col, 0-7 row)
  const getSquareCoordinates = (sq: string) => {
    const file = sq[0];
    const rank = sq[1];
    const fileIdx = displayFiles.indexOf(file);
    const rankIdx = displayRanks.indexOf(rank);
    return {
      x: (fileIdx + 0.5) * 12.5,
      y: (rankIdx + 0.5) * 12.5,
    };
  };

  return (
    <div className={`relative select-none ${className}`}>
      {/* Luxury Tournament Board Bezel Casing */}
      <div className="relative aspect-square w-full max-w-[560px] mx-auto p-1.5 sm:p-2.5 rounded-2xl bg-gradient-to-b from-[#1e2330] via-[#141822] to-[#0c0e14] border border-[#d4af37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
        {/* Inner Board Surface with Bevel Inset Shadow */}
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.65)]">
          <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
            {displayRanks.map((rank) =>
              displayFiles.map((file) => {
                const square = `${file}${rank}` as Square;
                const isLight = (FILES.indexOf(file) + RANKS.indexOf(rank)) % 2 === 0;
                const piece = game.get(square);
                const isSelected = selectedSquare === square;
                const isLegalDest = legalMoves.includes(square);
                const isLastMoveSquare = lastMove?.from === square || lastMove?.to === square;
                const isCheckKing = checkSquare === square;

                // Drawing highlight
                const squareDrawing = drawings.find(d => d.type === 'highlight' && d.from === square);

                // Chess.com style coordinate rules:
                // Rank label: show on the leftmost column
                const showRank = showCoordinates && file === (isFlipped ? 'h' : 'a');
                // File label: show on the bottommost row
                const showFile = showCoordinates && rank === (isFlipped ? '8' : '1');
                const coordColor = isLight ? themeStyles.coordLight : themeStyles.coordDark;

                return (
                  <div
                    key={square}
                    onClick={() => handleSquareClick(square)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, square)}
                    className={`
                      relative flex items-center justify-center cursor-pointer transition-colors duration-100
                      ${isLight ? themeStyles.light : themeStyles.dark}
                      ${isLastMoveSquare ? themeStyles.lastMove : ''}
                      ${isSelected ? themeStyles.selected : ''}
                      ${isCheckKing ? '!bg-red-500/80 shadow-[inset_0_0_15px_rgba(239,68,68,0.9)] animate-pulse' : ''}
                    `}
                  >
                    {/* Drawing Highlight Overlay */}
                    {squareDrawing && (
                      <div className="absolute inset-0 bg-emerald-500/35 border-2 border-emerald-400 pointer-events-none z-10" />
                    )}

                    {/* Staunton Piece */}
                    {piece && (
                      <div
                        draggable={interactive && piece.color === game.turn()}
                        onDragStart={(e) => handleDragStart(e, square)}
                        className={`
                          w-[88%] h-[88%] z-10 flex items-center justify-center transition-transform duration-100
                          ${interactive && piece.color === game.turn()
                            ? 'hover:scale-[1.08] active:scale-95 cursor-grab active:cursor-grabbing'
                            : ''
                          }
                        `}
                      >
                        <ChessPiece type={piece.type} color={piece.color} />
                      </div>
                    )}

                    {/* Legal move destination indicator */}
                    {isLegalDest && (
                      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        {piece ? (
                          // Target capture ring (Chess.com signature)
                          <div className="w-full h-full rounded-full border-[5px] border-black/30 dark:border-black/35 scale-95" />
                        ) : (
                          // Quiet move dot
                          <div className="w-3.5 h-3.5 rounded-full bg-black/25 dark:bg-black/30 backdrop-blur-[1px] shadow-sm" />
                        )}
                      </div>
                    )}

                    {/* Chess.com-style coordinates: Rank on top-left of first file */}
                    {showRank && (
                      <span className={`absolute top-0.5 left-1 text-[10px] sm:text-[11px] font-bold font-mono select-none pointer-events-none opacity-90 leading-none ${coordColor}`}>
                        {rank}
                      </span>
                    )}

                    {/* Chess.com-style coordinates: File on bottom-right of bottom rank */}
                    {showFile && (
                      <span className={`absolute bottom-0.5 right-1 text-[10px] sm:text-[11px] font-bold font-mono select-none pointer-events-none opacity-90 leading-none ${coordColor}`}>
                        {file}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Coach Strategy Drawings (Arrows / Tactical Highlights) */}
          {drawings.some(d => d.type === 'arrow' && d.to) && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-30" viewBox="0 0 100 100">
              <defs>
                <marker
                  id="arrowhead-emerald"
                  markerWidth="6"
                  markerHeight="6"
                  refX="4.5"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 6 3, 0 6" fill="#10b981" opacity="0.9" />
                </marker>
                <marker
                  id="arrowhead-amber"
                  markerWidth="6"
                  markerHeight="6"
                  refX="4.5"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 6 3, 0 6" fill="#f59e0b" opacity="0.9" />
                </marker>
              </defs>
              {drawings.map((d, i) => {
                if (d.type !== 'arrow' || !d.to) return null;
                const start = getSquareCoordinates(d.from);
                const end = getSquareCoordinates(d.to);
                const markerId = d.color === 'amber' ? 'arrowhead-amber' : 'arrowhead-emerald';
                const strokeColor = d.color === 'amber' ? '#f59e0b' : '#10b981';

                return (
                  <line
                    key={i}
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={strokeColor}
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    opacity="0.9"
                    markerEnd={`url(#${markerId})`}
                  />
                );
              })}
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};
