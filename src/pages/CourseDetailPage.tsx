import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, BookOpen, CheckCircle2, Play, Users, Award, Shield, Share2 } from 'lucide-react';
import { shatranjStore } from '../services/store';

interface CourseDetailPageProps {
  courseSlug?: string;
  onNavigate: (path: string, param?: string) => void;
  onOpenTrialModal: () => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  courseSlug = 'chess-fundamentals-zero-to-hero',
  onNavigate,
  onOpenTrialModal,
}) => {
  const course = shatranjStore.getCourseById(courseSlug) || shatranjStore.getCourses()[0];
  const isLoggedIn = shatranjStore.isLoggedIn();
  const [copied, setCopied] = useState(false);

  const allLessons = course.modules.flatMap(m => m.lessons);
  const completedCount = allLessons.filter(l => l.isCompleted).length;

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: `Check out ${course.title} by ${course.instructorName} at Knightesline Chess Academy!`,
        url,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back button */}
      <button
        onClick={() => onNavigate('courses')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Courses</span>
      </button>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-bold">
              {course.level} Level
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-300 font-medium">{course.totalDurationHours} Hours On-Demand</span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-300 font-medium">{allLessons.length} Interactive Lessons</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {course.title}
          </h1>

          <p className="text-base text-slate-300 leading-relaxed">
            {course.description}
          </p>

          <div className="flex items-center gap-6 pt-2 text-xs text-slate-400 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-200">Instructor:</span>
              <span className="text-amber-400 font-bold">{course.instructorName} ({course.instructorTitle})</span>
            </div>
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{course.rating} Rating</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>{course.enrolledCount.toLocaleString()} Students</span>
            </div>
          </div>
        </div>

        {/* Floating Enrollment / Action Card */}
        <div className="lg:col-span-4 p-6 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl space-y-5 backdrop-blur-md">
          <div className="relative h-44 rounded-xl overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
              <button
                onClick={() => onNavigate('lesson-player', course.id)}
                className="w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/30 transform hover:scale-110 transition-transform"
              >
                <Play className="w-6 h-6 fill-slate-950 ml-1" />
              </button>
            </div>
          </div>

          {isLoggedIn ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Course Progress</span>
                <span className="font-mono text-amber-400">{completedCount} of {allLessons.length} completed ({course.progressPercent}%)</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all"
                  style={{ width: `${course.progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Curriculum Overview</span>
                <span className="font-mono text-amber-400">{allLessons.length} Lessons • {course.totalDurationHours} hrs</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Sign in to track your learning progress and earn a graduation certificate.
              </p>
            </div>
          )}

          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => onNavigate('lesson-player', course.id)}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{isLoggedIn && course.progressPercent > 0 ? 'Continue Lesson' : 'Start First Lesson'}</span>
            </button>

            <button
              onClick={onOpenTrialModal}
              className="w-full py-2.5 rounded-xl font-semibold text-xs border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-200 transition-colors"
            >
              Book 1-on-1 Session with Coach ♟
            </button>

            <button
              onClick={handleShare}
              className="w-full py-2 rounded-xl font-semibold text-xs border border-slate-700/60 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{copied ? 'Link Copied to Clipboard! ✓' : 'Share Course'}</span>
            </button>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 space-y-1.5 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Includes interactive challenge board</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Certificate of completion upon finishing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full lifetime access with Starter/Pro plan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Syllabus Modules */}
      <div className="space-y-6 pt-4">
        <h2 className="text-2xl font-bold text-white">Course Curriculum</h2>

        {course.modules.length > 0 ? (
          <div className="space-y-4">
            {course.modules.map((mod, modIdx) => (
              <div key={mod.id} className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
                <div className="px-6 py-4 bg-slate-800/40 border-b border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center justify-center">
                      {modIdx + 1}
                    </span>
                    <h3 className="font-bold text-sm text-white">{mod.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400">{mod.lessons.length} Lessons</span>
                </div>

                <div className="divide-y divide-slate-800/60">
                  {mod.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      onClick={() => onNavigate('lesson-player', course.id)}
                      className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-800/40 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        {isLoggedIn && lesson.isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Play className="w-4 h-4 text-slate-500 group-hover:text-amber-400 shrink-0" />
                        )}
                        <div>
                          <div className={`text-xs font-semibold ${isLoggedIn && lesson.isCompleted ? 'text-slate-300' : 'text-white group-hover:text-amber-300'}`}>
                            {lesson.title}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                            {lesson.summary}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="font-mono">{lesson.durationMinutes}m</span>
                        <button className="text-[11px] font-bold text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          Start →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/30 text-center text-slate-400 text-sm">
            Curriculum modules are expanding for this masterclass. Check back or jump straight to the lesson gym.
          </div>
        )}
      </div>

    </div>
  );
};
