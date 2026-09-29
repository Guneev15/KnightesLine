import { Chess } from 'chess.js';

// Piece-value weights in centipawns
const PIECE_VALUES: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

// Positional bonuses for center control
const PAWN_TABLE = [
  0,  0,  0,  0,  0,  0,  0,  0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
   5,  5, 10, 25, 25, 10,  5,  5,
   0,  0,  0, 20, 20,  0,  0,  0,
   5, -5,-10,  0,  0,-10, -5,  5,
   5, 10, 10,-20,-20, 10, 10,  5,
   0,  0,  0,  0,  0,  0,  0,  0
];

const KNIGHT_TABLE = [
  -50,-40,-30,-30,-30,-30,-40,-50,
  -40,-20,  0,  0,  0,  0,-20,-40,
  -30,  0, 10, 15, 15, 10,  0,-30,
  -30,  5, 15, 20, 20, 15,  5,-30,
  -30,  0, 15, 20, 20, 15,  0,-30,
  -30,  5, 10, 15, 15, 10,  5,-30,
  -40,-20,  0,  5,  5,  0,-20,-40,
  -50,-40,-30,-30,-30,-30,-40,-50,
];

export class ChessEngine {
  // Static evaluation of position in centipawns from White's perspective
  public static evaluatePosition(game: Chess): number {
    if (game.isCheckmate()) {
      return game.turn() === 'w' ? -20000 : 20000;
    }
    if (game.isDraw() || game.isStalemate() || game.isThreefoldRepetition()) {
      return 0;
    }

    let score = 0;
    const board = game.board();

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (!piece) continue;

        const val = PIECE_VALUES[piece.type] || 0;
        let positionalBonus = 0;
        const squareIdx = r * 8 + c;

        if (piece.type === 'p') {
          positionalBonus = piece.color === 'w' ? PAWN_TABLE[squareIdx] : PAWN_TABLE[63 - squareIdx];
        } else if (piece.type === 'n') {
          positionalBonus = piece.color === 'w' ? KNIGHT_TABLE[squareIdx] : KNIGHT_TABLE[63 - squareIdx];
        }

        if (piece.color === 'w') {
          score += val + positionalBonus;
        } else {
          score -= (val + positionalBonus);
        }
      }
    }

    return score;
  }

  // Minimax search with alpha-beta pruning
  private static minimax(
    game: Chess,
    depth: number,
    alpha: number,
    beta: number,
    isMaximizing: boolean
  ): { score: number; bestMove?: string } {
    if (depth === 0 || game.isGameOver()) {
      return { score: this.evaluatePosition(game) };
    }

    const legalMoves = game.moves();
    if (legalMoves.length === 0) {
      return { score: this.evaluatePosition(game) };
    }

    let bestMove: string | undefined = undefined;

    if (isMaximizing) {
      let maxScore = -Infinity;
      for (const move of legalMoves) {
        game.move(move);
        const { score } = this.minimax(game, depth - 1, alpha, beta, false);
        game.undo();

        if (score > maxScore) {
          maxScore = score;
          bestMove = move;
        }
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
      return { score: maxScore, bestMove };
    } else {
      let minScore = Infinity;
      for (const move of legalMoves) {
        game.move(move);
        const { score } = this.minimax(game, depth - 1, alpha, beta, true);
        game.undo();

        if (score < minScore) {
          minScore = score;
          bestMove = move;
        }
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
      return { score: minScore, bestMove };
    }
  }

  // Find best move based on bot difficulty level
  // level 1: 800 rating (random or depth 1)
  // level 2: 1200 rating (depth 2 with occasional suboptimal choice)
  // level 3: 1600 rating (depth 2-3 focused)
  // level 4: 2000 rating (depth 3 full alpha-beta)
  public static getBestMove(game: Chess, difficultyLevel: number = 2): string | null {
    const legalMoves = game.moves();
    if (legalMoves.length === 0) return null;

    // Beginner Bot: 35% chance to pick any random legal move
    if (difficultyLevel === 1 && Math.random() < 0.35) {
      return legalMoves[Math.floor(Math.random() * legalMoves.length)];
    }

    const isWhite = game.turn() === 'w';
    const depth = difficultyLevel >= 3 ? 3 : (difficultyLevel === 2 ? 2 : 1);

    const result = this.minimax(game, depth, -Infinity, Infinity, isWhite);
    return result.bestMove || legalMoves[0];
  }

  // Calculate evaluation in Pawns (+1.25 / -0.80)
  public static getEvaluationInPawns(game: Chess): number {
    const score = this.evaluatePosition(game);
    // Convert centipawns to pawns
    return Number((score / 100).toFixed(2));
  }

  // Classify a move for Game Analysis
  public static classifyMove(
    evalBefore: number,
    evalAfter: number,
    isWhite: boolean,
    isCapture: boolean
  ): {
    classification: 'brilliant' | 'best' | 'good' | 'inaccuracy' | 'mistake' | 'blunder';
    delta: number;
    explanation: string;
  } {
    // Delta from the player's perspective
    const delta = isWhite ? (evalAfter - evalBefore) : (evalBefore - evalAfter);

    if (delta >= 1.5 && isCapture) {
      return {
        classification: 'brilliant',
        delta,
        explanation: 'A brilliant tactical stroke that decisively turns the advantage!',
      };
    }

    if (delta >= -0.2) {
      return {
        classification: 'best',
        delta,
        explanation: 'The strongest move found by the engine.',
      };
    }

    if (delta >= -0.6) {
      return {
        classification: 'good',
        delta,
        explanation: 'A solid move maintaining positional equality.',
      };
    }

    if (delta >= -1.2) {
      return {
        classification: 'inaccuracy',
        delta,
        explanation: 'Slight inaccuracy. There was a more precise continuation available.',
      };
    }

    if (delta >= -2.2) {
      return {
        classification: 'mistake',
        delta,
        explanation: 'A clear mistake handing tactical initiative to the opponent.',
      };
    }

    return {
      classification: 'blunder',
      delta,
      explanation: 'A game-changing blunder that loses significant material or positional hold!',
    };
  }
}
