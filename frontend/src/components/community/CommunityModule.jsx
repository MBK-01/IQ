import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  ThumbsUp,
  MessageCircle,
  Pin,
  CheckCircle2,
  Send,
  Plus,
  Search,
  Filter,
  User
} from 'lucide-react';

export const CommunityModule = () => {
  const { forumThreads, createThread, addComment, user } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedThread, setSelectedThread] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Technical');
  const [newContent, setNewContent] = useState('');

  const categories = ['All', 'General', 'Technical', 'Career', 'Events', 'Research', 'Leadership'];

  const filteredThreads = forumThreads.filter(
    (t) => selectedCategory === 'All' || t.category === selectedCategory
  );

  const handleCreateThread = (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;
    createThread(newTitle, newCategory, newContent);
    setShowNewThreadModal(false);
    setNewTitle('');
    setNewContent('');
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!newCommentText || !selectedThread) return;
    addComment(selectedThread.id, newCommentText);
    setNewCommentText('');
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-emerald-400" /> Community Forum & Technical Q&A System
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Connect with peers, ask technical questions, participate in CSS/GRE study discussions, and get verified answers.
          </p>
        </div>

        <button
          onClick={() => setShowNewThreadModal(true)}
          className="gradient-button px-5 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Start Discussion Thread
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Threads List or Selected Thread View */}
      {selectedThread ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedThread(null)}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
          >
            ← Back to All Forum Threads
          </button>

          {/* Active Thread Detail Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border border-emerald-500/40">
                {selectedThread.category}
              </span>
              <span className="text-xs text-slate-400">Posted by <strong>{selectedThread.author}</strong> ({selectedThread.authorRole})</span>
            </div>

            <h2 className="text-xl font-bold text-white leading-tight">{selectedThread.title}</h2>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              {selectedThread.content}
            </p>

            {/* Comments List */}
            <div className="pt-4 space-y-4">
              <h3 className="text-sm font-bold text-white">Replies ({selectedThread.comments.length})</h3>
              {selectedThread.comments.map((c) => (
                <div
                  key={c.id}
                  className={`p-4 rounded-2xl border space-y-2 text-xs ${
                    c.isBestAnswer
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-slate-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> {c.author} ({c.authorRole})
                    </span>
                    {c.isBestAnswer && (
                      <span className="bg-emerald-500 text-slate-950 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Best Answer
                      </span>
                    )}
                  </div>
                  <p className="leading-relaxed">{c.text}</p>
                </div>
              ))}

              {/* Add Comment Input */}
              <form onSubmit={handlePostComment} className="flex gap-3 pt-2">
                <input
                  type="text"
                  placeholder="Write a helpful answer or reply..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="flex-1 p-3 rounded-xl glass-input text-xs"
                />
                <button type="submit" className="gradient-button px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5" /> Post Reply
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredThreads.map((thr) => (
            <div
              key={thr.id}
              onClick={() => setSelectedThread(thr)}
              className="glass-panel-interactive p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  {thr.isPinned && (
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Pin className="w-3 h-3" /> PINNED
                    </span>
                  )}
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border border-emerald-500/30">
                    {thr.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white hover:text-emerald-300 transition-colors">
                  {thr.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-1">{thr.content}</p>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400 shrink-0">
                <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4 text-emerald-400" /> {thr.repliesCount} Replies</span>
                <span>{thr.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* NEW THREAD MODAL */}
      {showNewThreadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel max-w-lg w-full p-6 rounded-3xl border border-slate-700 space-y-4">
            <h3 className="text-lg font-bold text-white">Create New Discussion Thread</h3>
            <form onSubmit={handleCreateThread} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Thread Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. How to get started with WebGL 3D graphics in React?"
                  className="w-full p-3 rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-3 rounded-xl glass-input bg-slate-900 text-white"
                >
                  {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Question / Content</label>
                <textarea
                  rows={5}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Describe your question or discussion point in detail..."
                  className="w-full p-3 rounded-xl glass-input"
                />
              </div>

              <div className="flex gap-3">
                <button type="submit" className="flex-1 gradient-button py-3 rounded-xl font-bold">
                  Publish Thread
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewThreadModal(false)}
                  className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
