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

  // Board themes
  const themeStyles = {
    emerald: {
      light: 'bg-[#eeeed2] text-[#779952]',
      dark: 'bg-[#779952] text-[#eeeed2]',
      selected: 'bg-[#baca44] ring-2 ring-[#779952]',
      lastMove: 'bg-[#f5f682]/80',
    },
    wood: {
      light: 'bg-[#f0d9b5] text-[#b58863]',
      dark: 'bg-[#b58863] text-[#f0d9b5]',
      selected: 'bg-[#d8c365] ring-2 ring-[#8b6e4b]',
      lastMove: 'bg-[#ced26b]/80',
    },
    obsidian: {
      light: 'bg-[#2a3040] text-[#64748b]',
      dark: 'bg-[#181d2a] text-[#475569]',
      selected: 'bg-[#3b82f6]/40 ring-2 ring-blue-500',
      lastMove: 'bg-[#38bdf8]/20',
    },
    ice: {
      light: 'bg-[#e0f2fe] text-[#0284c7]',
      dark: 'bg-[#0284c7] text-[#e0f2fe]',
      selected: 'bg-[#38bdf8]/40 ring-2 ring-cyan-500',
      lastMove: 'bg-[#bae6fd]/50',
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
    // Percentage center of square
    return {
      x: (fileIdx + 0.5) * 12.5,
      y: (rankIdx + 0.5) * 12.5,
    };
  };

  return (
    <div className={`relative select-none ${className}`}>
      {/* 8x8 Board Container */}
      <div className="relative aspect-square w-full max-w-[560px] mx-auto rounded-xl overflow-hidden shadow-2xl border-4 border-slate-800/80 bg-slate-900">
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

              return (
                <div
                  key={square}
                  onClick={() => handleSquareClick(square)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, square)}
                  className={`
                    relative flex items-center justify-center cursor-pointer transition-colors duration-150
                    ${isLight ? themeStyles.light : themeStyles.dark}
                    ${isLastMoveSquare ? themeStyles.lastMove : ''}
                    ${isSelected ? themeStyles.selected : ''}
                    ${isCheckKing ? '!bg-red-500/80 animate-pulse' : ''}
                  `}
                >
                  {/* Drawing Highlight Overlay */}
                  {squareDrawing && (
                    <div className="absolute inset-0 bg-emerald-500/35 border-2 border-emerald-400 pointer-events-none" />
                  )}

                  {/* Piece */}
                  {piece && (
                    <div
                      draggable={interactive && piece.color === game.turn()}
                      onDragStart={(e) => handleDragStart(e, square)}
                      className={`
                        w-[82%] h-[82%] z-10 flex items-center justify-center transition-transform
                        ${interactive && piece.color === game.turn() ? 'hover:scale-105 active:scale-95 cursor-grab active:cursor-grabbing' : ''}
                      `}
                    >
                      <ChessPiece type={piece.type} color={piece.color} />
                    </div>
                  )}

                  {/* Legal move destination indicator */}
                  {isLegalDest && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      {piece ? (
                        // Target capture ring
                        <div className="w-full h-full rounded-full border-4 border-slate-900/40 bg-emerald-500/20" />
                      ) : (
                        // Dot for quiet move
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-900/35" />
                      )}
                    </div>
                  )}

                  {/* Coordinates: File on bottom rank */}
                  {showCoordinates && rank === (isFlipped ? '8' : '1') && (
                    <span className="absolute bottom-0.5 right-1 text-[10px] font-bold opacity-60 pointer-events-none">
                      {file}
                    </span>
                  )}

                  {/* Coordinates: Rank on left file */}
                  {showCoordinates && file === (isFlipped ? 'h' : 'a') && (
                    <span className="absolute top-0.5 left-1 text-[10px] font-bold opacity-60 pointer-events-none">
                      {rank}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* SVG Overlay for arrows / coach drawings */}
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
                <polygon points="0 0, 6 3, 0 6" fill="#10b981" opacity="0.85" />
              </marker>
              <marker
                id="arrowhead-amber"
                markerWidth="6"
                markerHeight="6"
                refX="4.5"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 6 3, 0 6" fill="#f59e0b" opacity="0.85" />
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
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.85"
                  markerEnd={`url(#${markerId})`}
                />
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
};
