import React, { useState } from 'react';
import { CivicIssue } from '../types';
import { 
  ArrowUp, 
  MapPin, 
  Flame, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Info, 
  Filter,
  PlusCircle,
  Users
} from 'lucide-react';

interface IssueLeaderboardProps {
  issues: CivicIssue[];
  upvotedIds: Set<string>;
  onUpvote: (issueId: string) => void;
  onSelectForLetter: (issueId: string) => void;
  onOpenReportModal?: () => void;
}

export const IssueLeaderboard: React.FC<IssueLeaderboardProps> = ({
  issues,
  upvotedIds,
  onUpvote,
  onSelectForLetter,
  onOpenReportModal
}) => {
  const [justUpvotedId, setJustUpvotedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const handleVote = (id: string) => {
    onUpvote(id);
    setJustUpvotedId(id);
    setTimeout(() => {
      setJustUpvotedId(null);
    }, 1200);
  };

  const filteredIssues = issues.filter(issue => {
    if (filterType === 'all') return true;
    if (filterType === 'critical') return issue.urgency === 'Critical Lafda';
    if (filterType === 'community') return !!issue.isCommunitySubmission;
    if (filterType === 'my-upvotes') return upvotedIds.has(issue.id);
    return true;
  });

  return (
    <section id="leaderboard-section" className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Mumbaikar Vibe */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5" />
              Dynamic Upvoting Dashboard
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Khar West Issue Leaderboard
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Upvote ground issues to escalate priority. Cards dynamically re-sort in real time by community urgency. <em>Awaaz uthao!</em>
            </p>
          </div>

          {/* Filters & Add Issue CTA */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              All Hotspots ({issues.length})
            </button>
            <button
              onClick={() => setFilterType('critical')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterType === 'critical'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              Critical Lafdas
            </button>
            <button
              onClick={() => setFilterType('community')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterType === 'community'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              Resident Reported
            </button>
            <button
              onClick={() => setFilterType('my-upvotes')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterType === 'my-upvotes'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              My Upvoted ({upvotedIds.size})
            </button>

            {onOpenReportModal && (
              <button
                onClick={onOpenReportModal}
                className="ml-auto sm:ml-2 px-3 py-1 rounded-lg text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1 shadow-sm transition-all cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Report Issue</span>
              </button>
            )}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((issue, index) => {
            const isUpvoted = upvotedIds.has(issue.id);
            const isJustVoted = justUpvotedId === issue.id;
            const rank = index + 1;

            return (
              <div
                key={issue.id}
                id={`card-${issue.id}`}
                className={`flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-800/90 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden ${
                  rank === 1
                    ? 'border-amber-400 dark:border-amber-500 ring-1 ring-amber-400/50 shadow-amber-500/5'
                    : 'border-slate-200 dark:border-slate-700/80 shadow-sm'
                }`}
              >
                {/* Rank Badge Header */}
                <div className="p-5 pb-3">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center justify-center font-black text-xs px-2.5 py-1 rounded-full ${
                        rank === 1 
                          ? 'bg-amber-500 text-slate-950 font-bold' 
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                      }`}>
                        #{rank} {rank === 1 ? 'Top Grievance' : 'Urgent'}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" />
                        {issue.lastUpdated}
                      </span>
                    </div>

                    {/* Badge requested: e.g. "Monsoon Special Lafda", "Kachra Alert", "Where to Walk?", "Shanti Chahiye", "Light Lagao" */}
                    <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full border ${issue.badgeColor}`}>
                      {issue.badge}
                    </span>
                  </div>

                  {/* Card Title requested */}
                  <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                    {issue.title}
                  </h3>

                  {/* Location requested */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 mt-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>Location: {issue.location}</span>
                  </div>

                  {/* Mumbai Slang Quote Callout */}
                  <div className="mt-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 italic relative">
                    <span className="font-semibold not-italic text-amber-600 dark:text-amber-400 mr-1">
                      Mumbaikar Voice:
                    </span>
                    &ldquo;{issue.mumbaiSlangQuote}&rdquo;
                  </div>

                  {/* Description & Department */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                    {issue.description}
                  </p>

                  <div className="mt-3 text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Info className="w-3 h-3 text-blue-500 shrink-0" />
                    <span>Dept: {issue.department}</span>
                  </div>
                </div>

                {/* Card Footer with Upvote (+1) Button & Escalation Trigger */}
                <div className="p-4 pt-3 bg-slate-50/70 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2 mt-auto">
                  {/* Upvote Button with (+1) */}
                  <button
                    onClick={() => handleVote(issue.id)}
                    className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all cursor-pointer ${
                      isUpvoted
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'bg-slate-900 dark:bg-slate-700 text-white hover:bg-amber-500 hover:text-slate-950'
                    } ${isJustVoted ? 'scale-105 ring-2 ring-amber-400' : ''}`}
                    title="Click to Upvote and raise urgency rank!"
                  >
                    <ArrowUp className={`w-4 h-4 ${isJustVoted ? 'animate-bounce' : ''}`} />
                    <span>{isUpvoted ? 'Upvoted (+1)' : 'Upvote (+1)'}</span>
                    <span className="font-mono bg-black/20 dark:bg-white/20 px-1.5 py-0.5 rounded text-[11px]">
                      {issue.votes}
                    </span>
                  </button>

                  {/* Pre-fill Letter Button */}
                  <button
                    onClick={() => onSelectForLetter(issue.id)}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Draft formal BMC grievance letter for this issue"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span>Escalate Email</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Tip at bottom of leaderboard */}
        <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              <strong>Civic Spot-Fix Tip:</strong> Top voted issues are sent directly in the weekly citizen dossier to the Assistant Municipal Commissioner at 2nd Hasnabad Lane.
            </span>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('generator-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Create Your Custom Grievance &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
