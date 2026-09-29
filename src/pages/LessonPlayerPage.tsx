import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { ArrowLeft, CheckCircle2, RotateCcw, Sparkles, Lightbulb, ChevronRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChessBoard } from '../components/chess/ChessBoard';
import { shatranjStore } from '../services/store';
import { audioService } from '../services/audioService';
import { Course, Lesson } from '../types';

interface LessonPlayerPageProps {
  courseId?: string;
  onNavigate: (path: string, param?: string) => void;
}

export const LessonPlayerPage: React.FC<LessonPlayerPageProps> = ({
  courseId = 'crs_1',
  onNavigate,
}) => {
  const course: Course = shatranjStore.getCourseById(courseId) || shatranjStore.getCourses()[0];
  const allLessons: Lesson[] = course.modules.flatMap(m => m.lessons);

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const currentLesson: Lesson = allLessons[activeLessonIndex] || allLessons[0];

  const [game, setGame] = useState(() => new Chess(currentLesson?.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'));
  const [challengeSolved, setChallengeSolved] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (currentLesson) {
      setGame(new Chess(currentLesson.fen));
      setChallengeSolved(false);
      setFeedback(null);
    }
  }, [currentLesson]);

  const handleMove = (_from: string, _to: string, san: string) => {
    if (!currentLesson.interactiveChallenge) return;

    const correctMoves = currentLesson.interactiveChallenge.correctMoves;
    // Check if move matches correct SAN
    if (correctMoves.includes(san)) {
      setChallengeSolved(true);
      setFeedback(`Brilliant move! ${currentLesson.interactiveChallenge.explanation}`);
      audioService.playVictory();
      shatranjStore.markLessonComplete(course.id, currentLesson.id);

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}
    } else {
      audioService.playError();
      setFeedback(`That move was legal, but not the strongest solution here. Try again!`);
    }
  };

  const resetBoard = () => {
    setGame(new Chess(currentLesson.fen));
    setChallengeSolved(false);
    setFeedback(null);
  };

  const nextLesson = () => {
    if (activeLessonIndex < allLessons.length - 1) {
      setActiveLessonIndex(prev => prev + 1);
    } else {
      onNavigate('course-detail', course.slug);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('course-detail', course.slug)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
              {course.title}
            </div>
            <h1 className="text-xl font-bold text-white">
              {currentLesson.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-slate-400 font-mono">
            Lesson {activeLessonIndex + 1} of {allLessons.length}
          </span>
          <button
            onClick={resetBoard}
            className="px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Position</span>
          </button>
        </div>
      </div>

      {/* Main Classroom Area: Left Board, Right Instruction Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Chess Board */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-[540px] p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
            <ChessBoard
              game={game}
              onMove={handleMove}
              boardTheme="emerald"
              interactive={true}
            />

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Turn: {game.turn() === 'w' ? 'White' : 'Black'} to move</span>
              </span>
              <span className="italic text-[11px] text-slate-500">
                Click or drag pieces directly on the board
              </span>
            </div>
          </div>
        </div>

        {/* Right: Lesson Notes & Interactive Challenge Panel */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Concept Overview Box */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>Key Concept</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentLesson.summary}
            </p>
          </div>

          {/* Interactive Challenge Section */}
          {currentLesson.interactiveChallenge && (
            <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Challenge Task</span>
                </div>
                {challengeSolved && (
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Solved!</span>
                  </span>
                )}
              </div>

              <p className="text-xs font-medium text-white">
                {currentLesson.interactiveChallenge.prompt}
              </p>

              {/* Feedback Alert */}
              {feedback && (
                <div className={`p-3 rounded-xl text-xs leading-relaxed ${challengeSolved ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border border-red-500/20 text-red-300'}`}>
                  {feedback}
                </div>
              )}
            </div>
          )}

          {/* Next Lesson / Continue Button */}
          <div className="pt-2">
            <button
              onClick={nextLesson}
              className={`
                w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
                ${challengeSolved
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                }
              `}
            >
              <span>{activeLessonIndex < allLessons.length - 1 ? 'Next Lesson' : 'Complete Course'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Micro Lesson Selector */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Lessons in this module
            </div>
            <div className="space-y-1.5">
              {allLessons.map((l, idx) => (
                <button
                  key={l.id}
                  onClick={() => setActiveLessonIndex(idx)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors
                    ${activeLessonIndex === idx
                      ? 'bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }
                  `}
                >
                  <span className="truncate">{l.title}</span>
                  {l.isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-2" />}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
