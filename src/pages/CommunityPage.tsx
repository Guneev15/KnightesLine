import React, { useState } from 'react';
import { MessageSquare, Heart, Share2, Plus, Sparkles, Send } from 'lucide-react';
import { shatranjStore } from '../services/store';
import { audioService } from '../services/audioService';
import { CommunityPost } from '../types';

export const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(shatranjStore.getCommunityPosts());
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [replyInput, setReplyInput] = useState<Record<string, string>>({});

  const handleLike = (postId: string) => {
    shatranjStore.toggleLikePost(postId);
    setPosts(shatranjStore.getCommunityPosts());
    audioService.playMove();
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const user = shatranjStore.getUser();
    const newP: CommunityPost = {
      id: `cp_${Date.now()}`,
      authorName: user ? user.name : 'Chess Enthusiast',
      authorAvatar: user ? user.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      authorTitle: user ? `${user.rating} Elo Player` : 'Community Member',
      timestamp: 'Just now',
      title: newPostTitle,
      content: newPostContent,
      likes: 1,
      isLiked: true,
      repliesCount: 0,
      tags: ['Discussion', 'Strategy'],
      replies: []
    };

    shatranjStore.getCommunityPosts().unshift(newP);
    setPosts([...shatranjStore.getCommunityPosts()]);
    setNewPostTitle('');
    setNewPostContent('');
    setShowNewPostForm(false);
    audioService.playVictory();
  };

  const handleAddReply = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const content = replyInput[postId];
    if (!content || !content.trim()) return;

    shatranjStore.addPostReply(postId, content.trim());
    setPosts([...shatranjStore.getCommunityPosts()]);
    setReplyInput(prev => ({ ...prev, [postId]: '' }));
    audioService.playNotification();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 font-serif-classic">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Knightesline Guild Room</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 font-serif-classic tracking-tight mt-1">
            Noble Chess Discussions & Guild Lore
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-serif-garamond text-sm">
            Share tactical breakthroughs, discuss master games, and ask international titled mentors for guidance.
          </p>
        </div>

        <button
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="btn-classic-gold px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Discussion</span>
        </button>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <form onSubmit={handleCreatePost} className="p-6 rounded-2xl border border-amber-500/30 bg-slate-900/80 shadow-2xl space-y-4 animate-fade-in">
          <h3 className="text-sm font-bold text-white">Start a Chess Discussion</h3>
          <input
            type="text"
            required
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            placeholder="Topic title e.g. 'How do you counter the London System with Black?'"
            className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
          />
          <textarea
            rows={3}
            required
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Describe the position or question in detail..."
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowNewPostForm(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400"
            >
              Publish Post ♟
            </button>
          </div>
        </form>
      )}

      {/* Discussions Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-4 hover:border-slate-700 transition-colors"
          >
            {/* Author bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>{post.authorName}</span>
                    {post.authorTitle && (
                      <span className="text-[10px] px-2 py-0.2 rounded bg-slate-800 text-amber-400 font-mono">
                        {post.authorTitle}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">{post.timestamp}</span>
                </div>
              </div>

              <div className="flex gap-1.5">
                {post.tags.map((t, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Post Content */}
            <div className="space-y-1.5">
              <h2 className="text-base font-bold text-white">{post.title}</h2>
              <p className="text-xs text-slate-300 leading-relaxed">{post.content}</p>
            </div>

            {/* Like and Reply Bar */}
            <div className="pt-2 border-t border-slate-800 flex items-center gap-4 text-xs">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1.5 transition-colors ${post.isLiked ? 'text-red-400 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-400' : ''}`} />
                <span>{post.likes}</span>
              </button>

              <div className="flex items-center gap-1.5 text-slate-400">
                <MessageSquare className="w-4 h-4" />
                <span>{post.repliesCount} Replies</span>
              </div>
            </div>

            {/* Replies List */}
            {post.replies.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                {post.replies.map((r) => (
                  <div key={r.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-amber-300">{r.authorName}</span>
                      <span className="text-slate-500">{r.timestamp}</span>
                    </div>
                    <p className="text-slate-300">{r.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Input Box */}
            <form onSubmit={(e) => handleAddReply(post.id, e)} className="flex gap-2 pt-1">
              <input
                type="text"
                value={replyInput[post.id] || ''}
                onChange={(e) => setReplyInput({ ...replyInput, [post.id]: e.target.value })}
                placeholder="Write a helpful chess reply..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-xs text-slate-200"
              >
                Reply
              </button>
            </form>
          </div>
        ))}
      </div>

    </div>
  );
};
