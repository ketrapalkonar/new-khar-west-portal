import React, { useState } from 'react';
import { X, MessageSquare, ThumbsUp, Send, User, MapPin, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';
import { CivicIssue, ResidentOpinion } from '../types';

interface ResidentOpinionDrawerProps {
  issue: CivicIssue | null;
  isOpen: boolean;
  onClose: () => void;
  onAddOpinion: (issueId: string, opinion: { author: string; roadOrSociety: string; text: string }) => void;
  onLikeOpinion?: (issueId: string, opinionId: string) => void;
}

export const ResidentOpinionDrawer: React.FC<ResidentOpinionDrawerProps> = ({
  issue,
  isOpen,
  onClose,
  onAddOpinion,
  onLikeOpinion
}) => {
  const [author, setAuthor] = useState('');
  const [roadOrSociety, setRoadOrSociety] = useState('');
  const [opinionText, setOpinionText] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !issue) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim()) {
      setError('Please enter your name or resident alias');
      return;
    }
    if (!opinionText.trim()) {
      setError('Please write your ground feedback or opinion');
      return;
    }
    if (opinionText.trim().length < 10) {
      setError('Feedback should be at least 10 characters to provide civic context');
      return;
    }

    setError(null);
    onAddOpinion(issue.id, {
      author: author.trim(),
      roadOrSociety: roadOrSociety.trim() || 'Khar West Resident',
      text: opinionText.trim()
    });

    setOpinionText('');
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end transition-opacity animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-[#0B0F17] border-l border-slate-800 text-slate-100 flex flex-col h-full shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800/80 bg-slate-900/80 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {issue.mcgmTicketId}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                {issue.location}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
              {issue.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Resident Opinion Hub • {issue.opinions.length} Community Comments</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Existing Opinions List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {/* Issue Context Callout */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
            <span className="font-bold text-amber-400 block mb-1">Ground Reality Context:</span>
            <p className="text-slate-300 leading-relaxed">{issue.description}</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Neighborhood Voices ({issue.opinions.length})
            </h4>
            <span className="text-[11px] text-emerald-400 font-medium">
              Verified Khar West Citizens
            </span>
          </div>

          {issue.opinions.length === 0 ? (
            <div className="text-center py-10 bg-slate-900/30 rounded-xl border border-dashed border-slate-800 p-6">
              <MessageSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-400">No opinions posted yet.</p>
              <p className="text-xs text-slate-500 mt-1">Be the first to share your ground experience for this spot!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {issue.opinions.map((op) => (
                <div 
                  key={op.id}
                  className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center font-black text-[10px]">
                        {op.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white">{op.author}</span>
                        <span className="text-[10px] text-slate-400 ml-2 font-medium">
                          {op.roadOrSociety}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{op.time}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pl-8">
                    &ldquo;{op.text}&rdquo;
                  </p>

                  <div className="mt-2.5 pl-8 flex items-center justify-between text-[11px]">
                    <button
                      onClick={() => onLikeOpinion && onLikeOpinion(issue.id, op.id)}
                      className="text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{op.likes} Helpful</span>
                    </button>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      Ground Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Opinion Form (Sticky at bottom) */}
        <div className="p-5 border-t border-slate-800 bg-slate-900/90">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Add Your Voice / Ground Update
              </span>
              {error && <span className="text-rose-400 text-xs font-medium">{error}</span>}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <User className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Your Name / Alias *"
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="relative">
                <MapPin className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={roadOrSociety}
                  onChange={(e) => setRoadOrSociety(e.target.value)}
                  placeholder="Road or CHS (e.g. 14th Rd)"
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="relative">
              <textarea
                rows={2}
                value={opinionText}
                onChange={(e) => setOpinionText(e.target.value)}
                placeholder="Share your ground observation, e.g., 'Waterlogging stalls S.V. Road traffic every morning'..."
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Resident Opinion</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
