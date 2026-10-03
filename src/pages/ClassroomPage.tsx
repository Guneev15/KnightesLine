import React, { useState } from 'react';
import { Chess } from 'chess.js';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  RotateCcw,
  Sparkles,
  MessageSquare,
  FileText,
  Send,
  ArrowRight,
  Maximize2,
  PenTool,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { ChessBoard, BoardDrawing } from '../components/chess/ChessBoard';
import { audioService } from '../services/audioService';

interface ChatMessage {
  id: string;
  sender: string;
  isCoach: boolean;
  text: string;
  time: string;
}

export const ClassroomPage: React.FC = () => {
  const [game, setGame] = useState(() => new Chess('r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3'));
  const [drawings, setDrawings] = useState<BoardDrawing[]>([
    { type: 'arrow', from: 'c4', to: 'f7', color: 'amber' },
    { type: 'highlight', from: 'f7', color: 'emerald' },
  ]);
  const [activeTab, setActiveTab] = useState<'chat' | 'notes'>('chat');
  const [micMuted, setMicMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [lessonActive, setLessonActive] = useState(true);
  const [drawingMode, setDrawingMode] = useState<boolean>(true);

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'IM Vikramaditya Rao', isCoach: true, text: 'Welcome Aryan! Today we are looking at piece coordination against the Italian game.', time: '5:02 PM' },
    { id: '2', sender: 'Aryan Sharma', isCoach: false, text: 'Hello Sir! Ready. Why is White eyeing f7 so early?', time: '5:03 PM' },
    { id: '3', sender: 'IM Vikramaditya Rao', isCoach: true, text: 'Notice how f7 is only defended by the Black King. Look at the arrow on the board from c4 to f7!', time: '5:04 PM' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Lesson notes state
  const [notes, setNotes] = useState<string[]>([
    'Key Rule: f7/f2 is the weakest square in the opening because only the King defends it.',
    'Prophylaxis: If White threatens Ng5 and Bc4, prevent it with ...h6 or develop actively with ...Nf6 and castle early.',
    'Tactics Drill assigned: 5 puzzles on Greek Gift sacrifice.'
  ]);
  const [newNote, setNewNote] = useState('');

  const handleMove = () => {
    // board moves
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const msg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'Aryan Sharma',
      isCoach: false,
      text: inputMsg,
      time: 'Just now',
    };
    setChatMessages((prev) => [...prev, msg]);
    setInputMsg('');
    audioService.playNotification();

    // Simulated coach reply
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'IM Vikramaditya Rao',
          isCoach: true,
          text: 'Exactly! Make the move on the board and see how the bishop pair exerts pressure.',
          time: 'Just now'
        }
      ]);
      audioService.playNotification();
    }, 1500);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes(prev => [...prev, newNote]);
    setNewNote('');
  };

  const toggleDrawingArrow = () => {
    if (drawings.length > 0) {
      setDrawings([]);
    } else {
      setDrawings([
        { type: 'arrow', from: 'c4', to: 'f7', color: 'amber' },
        { type: 'highlight', from: 'f7', color: 'emerald' },
      ]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Classroom Status Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Live Session Active • Italian Game Strategy
            </div>
            <h1 className="text-base font-bold text-white">
              Private 1-on-1 Class with IM Vikramaditya Rao
            </h1>
          </div>
        </div>

        {/* Video & Media Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setMicMuted(!micMuted)}
            className={`p-2.5 rounded-xl border transition-colors ${micMuted ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-slate-800 border-slate-700 text-slate-200'}`}
            title={micMuted ? 'Unmute' : 'Mute'}
          >
            {micMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setCamOff(!camOff)}
            className={`p-2.5 rounded-xl border transition-colors ${camOff ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-slate-800 border-slate-700 text-slate-200'}`}
            title={camOff ? 'Start Video' : 'Stop Video'}
          >
            {camOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleDrawingArrow}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 ${drawings.length > 0 ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>{drawings.length > 0 ? 'Clear Coach Arrows' : 'Draw Attack Arrows'}</span>
          </button>
          <button
            onClick={() => { setGame(new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')); setDrawings([]); }}
            className="p-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
            title="Reset Board"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Live Board in Center, Sidepanel with Video + Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Live Board (8 cols) */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className="w-full max-w-[560px] p-2.5 sm:p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-3 text-xs text-slate-400 border-b border-slate-800">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Coach Synchronized Board</span>
              </span>
              <span className="text-[11px] font-mono text-amber-400">
                Move 3: Bc4 (White)
              </span>
            </div>

            <div className="pt-3">
              <ChessBoard
                game={game}
                onMove={handleMove}
                boardTheme="emerald"
                interactive={true}
                drawings={drawings}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Both student and coach have full cursor and move rights</span>
              <span className="text-emerald-400 font-semibold text-[11px]">Synced via WebRTC</span>
            </div>
          </div>
        </div>

        {/* Sidepanel: Videos + Chat / Notes (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Dual Video Stream Tiles */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Coach Video Stream */}
            <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
                alt="Coach Stream"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-bold text-white backdrop-blur-md">
                IM Vikram (Coach)
              </div>
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400" />
            </div>

            {/* Student Video Stream */}
            <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
              {!camOff ? (
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                  alt="Student Stream"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">
                  Camera Off
                </div>
              )}
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-bold text-white backdrop-blur-md">
                Aryan (Student)
              </div>
            </div>

          </div>

          {/* Interactive Chat & Notes Tabs */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden flex flex-col h-[380px]">
            
            {/* Tab Header */}
            <div className="flex border-b border-slate-800 bg-slate-950/60 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2.5 text-center transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'chat' ? 'text-amber-400 border-b-2 border-amber-400 bg-slate-900' : 'text-slate-400 hover:text-white'}`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Class Chat</span>
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-2.5 text-center transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'notes' ? 'text-amber-400 border-b-2 border-amber-400 bg-slate-900' : 'text-slate-400 hover:text-white'}`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Coach Notes</span>
              </button>
            </div>

            {/* Chat Content */}
            {activeTab === 'chat' ? (
              <div className="flex-1 flex flex-col justify-between p-3 overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                  {chatMessages.map((m) => (
                    <div
                      key={m.id}
                      className={`p-2.5 rounded-xl text-xs space-y-1 ${m.isCoach ? 'bg-amber-500/10 border border-amber-500/20 text-amber-200' : 'bg-slate-800/80 text-slate-200 ml-4'}`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                        <span className="font-bold">{m.sender}</span>
                        <span>{m.time}</span>
                      </div>
                      <p className="leading-relaxed">{m.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="pt-2 flex gap-1.5">
                  <input
                    type="text"
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    placeholder="Ask coach a question..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            ) : (
              /* Notes Content */
              <div className="flex-1 flex flex-col justify-between p-3 overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
                  {notes.map((note, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-300 flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddNote} className="pt-2 flex gap-1.5">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add takeaway note..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
                  >
                    Add
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
