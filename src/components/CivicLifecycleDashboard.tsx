import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CivicIssue, WorkStage } from '../types';
import { WORK_STAGES } from '../data/civicData';
import { 
  Flame, 
  Clock, 
  CheckCircle2, 
  ArrowUp, 
  MapPin, 
  MessageSquare, 
  FileText, 
  Camera, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  Search, 
  Filter, 
  Building2, 
  ChevronRight, 
  Upload, 
  Check, 
  XCircle,
  ThumbsUp,
  Share2,
  Plus,
  FileQuestion,
  Inbox,
  ArrowRight,
  SlidersHorizontal,
  Trash2,
  ShieldAlert
} from 'lucide-react';

interface CivicLifecycleDashboardProps {
  issues: CivicIssue[];
  activeLayer: 1 | 2 | 3;
  isAdminMode?: boolean;
  onSelectLayer: (layer: 1 | 2 | 3) => void;
  upvotedIds: Set<string>;
  onUpvote: (issueId: string) => void;
  onDeleteIssue?: (issueId: string) => void;
  onSelectForLetter: (issueId: string) => void;
  onOpenOpinionDrawer: (issue: CivicIssue) => void;
  onConfirmGroundFix: (issueId: string, isFixed: boolean) => void;
  onUploadAfterPhoto: (issueId: string, photoUrl: string) => void;
  onPromoteToWardAction: (issueId: string) => void;
  onOpenReportModal: () => void;
  onUpdateStage: (issueId: string, stage: WorkStage) => void;
  onOpenTicketLookup: (query?: string) => void;
}

export const CivicLifecycleDashboard: React.FC<CivicLifecycleDashboardProps> = ({
  issues,
  activeLayer,
  isAdminMode = false,
  onSelectLayer,
  upvotedIds,
  onUpvote,
  onDeleteIssue,
  onSelectForLetter,
  onOpenOpinionDrawer,
  onConfirmGroundFix,
  onUploadAfterPhoto,
  onPromoteToWardAction,
  onOpenReportModal,
  onUpdateStage,
  onOpenTicketLookup
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ticketSearchInput, setTicketSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [justVotedId, setJustVotedId] = useState<string | null>(null);

  // Live ticking countdown for Layer 2 SLA clock
  const [currentTime, setCurrentTime] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format SLA countdown in hh:mm:ss
  const formatSlaClock = (secondsLeft?: number) => {
    if (!secondsLeft) return '14h 30m 00s';
    // Offset slightly by current seconds for live ticking visual effect
    const currentSecondsMod = Math.floor(currentTime / 1000) % 60;
    const adjusted = Math.max(0, secondsLeft - currentSecondsMod);
    const hrs = Math.floor(adjusted / 3600);
    const mins = Math.floor((adjusted % 3600) / 60);
    const secs = adjusted % 60;
    return `${hrs.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  const handleVoteClick = (id: string) => {
    onUpvote(id);
    setJustVotedId(id);
    setTimeout(() => setJustVotedId(null), 1000);
  };

  // Filter issues by activeLayer, search, and category
  const layer1Issues = issues.filter(i => i.layer === 1);
  const layer2Issues = issues.filter(i => i.layer === 2);
  const layer3Issues = issues.filter(i => i.layer === 3);

  const currentLayerIssues = issues.filter(issue => {
    if (issue.layer !== activeLayer) return false;
    if (selectedCategory !== 'All' && issue.category !== selectedCategory) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        issue.title.toLowerCase().includes(q) ||
        issue.location.toLowerCase().includes(q) ||
        (issue.department && issue.department.toLowerCase().includes(q)) ||
        (issue.mcgmTicketId && issue.mcgmTicketId.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const categories = ['All', 'Waterlogging', 'Sanitation', 'Road Damage', 'Noise', 'Streetlights'];

  return (
    <section id="lifecycle-section" className="py-14 sm:py-20 bg-[#0B0F17] text-white border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3-Layer Civic Lifecycle &amp; Dual Verification</span>
              </div>
              {isAdminMode && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-black uppercase tracking-wider animate-pulse">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>🛡️ Admin Mode Active</span>
                </div>
              )}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Khar West Civic Issue Lifecycle
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
              Track neighborhood issues from grassroots community upvoting to municipal contractor deployment, dual-verified citizen sign-off, and permanent closure.
            </p>
          </div>

          {/* Quick "+ Report Spot-Fix" & Search on top */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ticket, road, or issue..."
                className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <button
              onClick={onOpenReportModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              + Report New Spot-Fix
            </button>
          </div>
        </div>

        {/* 3 Dynamic Status Tabs / Layers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-1.5 rounded-2xl bg-slate-900/70 border border-slate-800/90 mb-8 backdrop-blur-xl">
          {/* Layer 1 Tab */}
          <button
            onClick={() => onSelectLayer(1)}
            className={`p-4 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
              activeLayer === 1
                ? 'bg-slate-800 border border-amber-500/50 shadow-lg shadow-amber-500/10'
                : 'hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                activeLayer === 1 ? 'text-amber-400' : 'text-slate-400'
              }`}>
                <Flame className="w-4 h-4 text-amber-400" />
                LAYER 1: Active Hotspots
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {layer1Issues.length}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Needs Community Upvotes to cross 50+ threshold for Ward Action.
            </p>
          </button>

          {/* Layer 2 Tab */}
          <button
            onClick={() => onSelectLayer(2)}
            className={`p-4 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
              activeLayer === 2
                ? 'bg-slate-800 border border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                : 'hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                activeLayer === 2 ? 'text-emerald-400' : 'text-slate-400'
              }`}>
                <Clock className="w-4 h-4 text-emerald-400" />
                LAYER 2: Under Ward Action
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {layer2Issues.length}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Live BMC Ticket + Dual Verification Ground Track &amp; SLA Clock.
            </p>
          </button>

          {/* Layer 3 Tab */}
          <button
            onClick={() => onSelectLayer(3)}
            className={`p-4 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
              activeLayer === 3
                ? 'bg-slate-800 border border-teal-500/50 shadow-lg shadow-teal-500/10'
                : 'hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                activeLayer === 3 ? 'text-teal-400' : 'text-slate-400'
              }`}>
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                LAYER 3: Hall of Fame
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {layer3Issues.length}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Dual-Verified Closed: BMC Official Sign-off + Citizen Confirmed.
            </p>
          </button>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 text-xs scrollbar-none">
          <span className="text-slate-500 font-semibold flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            Filter Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* =========================================================================
            LAYER 1 VIEW: Active Community Hotspots (Needs Upvotes)
           ========================================================================= */}
        {activeLayer === 1 && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2.5 text-xs text-amber-300">
                <Flame className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  <strong>Grassroots Upvote Target:</strong> Hotspots that hit 50+ votes are escalated into <strong>Layer 2: Under Ward Action</strong> with a registered MCGM Ticket ID and SLA timer.
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400">
                Showing {currentLayerIssues.length} Hotspots
              </span>
            </div>

            {currentLayerIssues.length === 0 ? (
              <div className="rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-10 sm:p-14 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none"></div>
                
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5 text-emerald-400 shadow-lg shadow-emerald-500/10 group-hover:scale-105 group-hover:border-emerald-500/50 transition-all">
                  <Inbox className="w-8 h-8" />
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                  No active spot-fixes reported yet.
                </h3>
                
                <p className="text-sm text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
                  Click '+ Report Spot-Fix' to log the first issue.
                </p>

                <button
                  onClick={onOpenReportModal}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center gap-2.5 cursor-pointer ring-2 ring-emerald-400/20"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>+ Report Spot-Fix</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {currentLayerIssues.map((issue) => {
                  const isUpvoted = upvotedIds.has(issue.id);
                  const progressPercent = Math.min(100, Math.round((issue.votes / issue.voteTarget) * 100));
                  const canPromote = issue.votes >= 50;

                  return (
                    <motion.div
                      key={issue.id}
                      initial={{ opacity: 0, y: 20, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="flex flex-col justify-between rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-slate-800/90 hover:border-emerald-500/40 transition-all duration-300 shadow-xl overflow-hidden group"
                    >
                      {/* Card Header */}
                      <div className="p-6 pb-4">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-800 text-emerald-400 border border-slate-700">
                              {issue.mcgmTicketId}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${issue.badgeColor}`}>
                              {issue.badge}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3" />
                            {issue.lastUpdated}
                          </span>
                        </div>

                        <h3 className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors">
                          {issue.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mt-2">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span>{issue.location}</span>
                        </div>

                        {/* Mumbai Slang Voice */}
                        <div className="mt-3.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 italic relative">
                          <span className="font-semibold not-italic text-amber-400 mr-1">
                            Mumbaikar Voice:
                          </span>
                          &ldquo;{issue.mumbaiSlangQuote}&rdquo;
                        </div>

                        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                          {issue.description}
                        </p>

                        <div className="mt-3 text-[11px] text-slate-500 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-blue-400" />
                          <span>Dept: {issue.department}</span>
                        </div>

                        {/* Emerald Progress Bar towards 100 votes */}
                        <div className="mt-5 space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-300 flex items-center gap-1">
                              <span>Civic Support:</span>
                              <strong className="text-emerald-400 font-mono">{issue.votes}</strong>
                              <span className="text-slate-500">/ {issue.voteTarget} Target</span>
                            </span>
                            <span className="font-mono font-black text-emerald-400">
                              {progressPercent}%
                            </span>
                          </div>
                          <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700/60">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 shadow-sm shadow-emerald-500/50"
                              style={{ width: `${progressPercent}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Card Actions Footer */}
                      <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2">
                          {/* Upvote Button (+1 / -1 toggle) */}
                          <button
                            onClick={() => handleVoteClick(issue.id)}
                            title={isUpvoted ? 'Click to remove vote (-1)' : 'Click to upvote (+1)'}
                            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
                              isUpvoted
                                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                                : 'bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white'
                            } ${justVotedId === issue.id ? 'scale-105 ring-2 ring-emerald-400' : ''}`}
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                            <span>{isUpvoted ? 'Upvoted (+1)' : 'Upvote (+1)'}</span>
                            <span className="font-mono bg-black/20 px-1.5 py-0.5 rounded text-[11px]">
                              {issue.votes}
                            </span>
                          </button>

                          {/* Resident Opinion Button */}
                          <button
                            onClick={() => onOpenOpinionDrawer(issue)}
                            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Opinions ({issue.opinions.length})</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* CONDITIONAL ADMIN DELETE BUTTON */}
                          {isAdminMode && onDeleteIssue && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm(`[ADMIN ACTION] Are you sure you want to delete "${issue.title}"?`)) {
                                  onDeleteIssue(issue.id);
                                }
                              }}
                              className="px-3 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500 text-rose-400 hover:text-slate-950 border border-rose-500/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-md shadow-rose-500/10"
                              title="Admin Delete Issue"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          )}

                          {canPromote && (
                            <button
                              onClick={() => onPromoteToWardAction(issue.id)}
                              className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 transition-all flex items-center gap-1 cursor-pointer"
                              title="Promote this 50+ upvoted issue to Layer 2 Ward Action"
                            >
                              <Clock className="w-3 h-3" />
                              <span>Escalate to Layer 2</span>
                            </button>
                          )}

                          <button
                            onClick={() => onSelectForLetter(issue.id)}
                            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Draft Email</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            LAYER 2 VIEW: Under Ward Action (Live BMC + Dual Verification Track)
           ========================================================================= */}
        {activeLayer === 2 && (
          <div className="space-y-6">
            {/* Header info banner */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2.5 text-xs text-emerald-300">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  <strong>Dual Verification Engine:</strong> Official MCGM work orders running against live SLAs. When residents verify on-ground completion (75%+), tickets transfer to <strong>Layer 3: Resolved Hall of Fame</strong>.
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {currentLayerIssues.length} Active Work Orders
              </span>
            </div>

            {/* DYNAMIC TICKET ID SEARCH & LOOKUP BAR (Layer 2) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-emerald-500/30 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg shadow-emerald-500/10">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    Track BMC Ticket Status
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      Live MCGM Lookup
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Lookup official MCGM Grievance ticket progress across all 4 municipal resolution stages
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={ticketSearchInput}
                    onChange={(e) => setTicketSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && ticketSearchInput.trim()) {
                        onOpenTicketLookup(ticketSearchInput.trim());
                      }
                    }}
                    placeholder="Enter Ticket ID (e.g. HW/2026/04812)..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>
                <button
                  onClick={() => onOpenTicketLookup(ticketSearchInput.trim())}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap active:scale-95"
                >
                  Track Ticket
                </button>
              </div>
            </div>

            {currentLayerIssues.length === 0 ? (
              <div className="rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-10 sm:p-14 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-amber-500/30 flex items-center justify-center mx-auto mb-5 text-amber-400 shadow-lg shadow-amber-500/10">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                  No complaints currently under Ward action.
                </h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
                  When Layer 1 community complaints reach 50+ upvotes, they are automatically escalated here with an active BMC SLA countdown timer, contractor deployment, and 4-stage progress tracker.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <button
                    onClick={() => onSelectLayer(1)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>View Layer 1 Hotspots &rarr;</span>
                  </button>
                  <button
                    onClick={onOpenReportModal}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-slate-950 text-xs font-black shadow-md shadow-emerald-500/20 transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Report Spot-Fix</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {currentLayerIssues.map((issue) => {
                  const currentStage = (issue.workStage || 3) as WorkStage;
                  const stageInfo = WORK_STAGES.find(s => s.stage === currentStage) || WORK_STAGES[2];
                  const canVerify = currentStage >= 3 || issue.bmcStatus?.toLowerCase().includes('resolved');

                  return (
                    <motion.div
                      key={issue.id}
                      id={`issue-card-${issue.id}`}
                      initial={{ opacity: 0, y: 20, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 hover:border-emerald-500/50 shadow-2xl overflow-hidden transition-all duration-300"
                    >
                      {/* Top Status Header */}
                      <div className="p-6 pb-4 bg-gradient-to-r from-slate-900 to-slate-900/60 border-b border-slate-800">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                              {issue.mcgmTicketId}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              {issue.bmcStatus || stageInfo.label}
                            </span>
                          </div>

                          {/* Live SLA Countdown Clock */}
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-amber-500/40 text-amber-400 font-mono text-xs font-bold shadow-inner">
                            <Clock className="w-3.5 h-3.5 animate-pulse" />
                            <span>SLA Clock: {formatSlaClock(issue.slaRemainingSeconds)}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-xl font-black text-white">{issue.title}</h3>
                          
                          {/* CONDITIONAL ADMIN DELETE BUTTON */}
                          {isAdminMode && onDeleteIssue && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm(`[ADMIN ACTION] Are you sure you want to delete "${issue.title}"?`)) {
                                  onDeleteIssue(issue.id);
                                }
                              }}
                              className="px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500 text-rose-400 hover:text-slate-950 border border-rose-500/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                              title="Admin Delete Issue"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mt-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{issue.location}</span>
                        </div>
                      </div>

                      <div className="p-6 space-y-5">
                        {/* 3. LIVE WORK PROGRESS VISUALIZER (4-Stage Progress Stepper & Percentage Bar) */}
                        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3.5">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                                Municipal Work Progress
                              </span>
                              <span className="text-xs font-black text-white">
                                Stage {currentStage} of 4: {stageInfo.label}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-lg font-black font-mono text-emerald-400">
                                {stageInfo.percent}%
                              </span>
                              <span className="block text-[9px] text-slate-500 uppercase tracking-wider font-semibold">
                                Complete
                              </span>
                            </div>
                          </div>

                          {/* Stepper Progress Bar */}
                          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden relative">
                            <div 
                              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 transition-all duration-500 rounded-full"
                              style={{ width: `${stageInfo.percent}%` }}
                            ></div>
                          </div>

                          {/* 4 Stepper Nodes */}
                          <div className="grid grid-cols-4 gap-1 pt-1 text-center">
                            {WORK_STAGES.map((s) => {
                              const isPassed = currentStage >= s.stage;
                              const isCurrent = currentStage === s.stage;

                              return (
                                <div key={s.stage} className="flex flex-col items-center">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono transition-all ${
                                    isCurrent
                                      ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-500/40 shadow-sm'
                                      : isPassed
                                      ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
                                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                                  }`}>
                                    {isPassed ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : s.stage}
                                  </div>
                                  <span className={`text-[9px] font-bold mt-1 line-clamp-1 ${
                                    isCurrent ? 'text-emerald-400' : isPassed ? 'text-slate-300' : 'text-slate-600'
                                  }`}>
                                    {s.label.split(' ')[0]}
                                  </span>
                                  <span className="text-[8px] font-mono text-slate-500">
                                    {s.percent}%
                                  </span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Stage description callout */}
                          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="text-slate-200">{stageInfo.description}</span>
                              <span className="block text-[10px] text-slate-500 mt-0.5">
                                Target SLA Window: <strong>{stageInfo.slaWindow}</strong>
                              </span>
                            </div>
                          </div>

                          {/* INTERACTIVE SIMULATION CONTROLS FOR TESTING/VIVA */}
                          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                              <SlidersHorizontal className="w-3 h-3 text-emerald-400" />
                              <span>Advance Ward Status:</span>
                            </span>
                            <div className="flex items-center gap-1 flex-wrap">
                              {WORK_STAGES.map((s) => (
                                <button
                                  key={s.stage}
                                  onClick={() => onUpdateStage(issue.id, s.stage)}
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                                    currentStage === s.stage
                                      ? 'bg-emerald-500 text-slate-950 font-black'
                                      : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                                  }`}
                                  title={`Advance to Stage ${s.stage}: ${s.label}`}
                                >
                                  {s.percent}% {s.label.split(' ')[0]}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* TRACK A: BMC Official Track */}
                        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-300 flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-blue-400" />
                              <span>Official BMC Track (H/West Ward)</span>
                            </span>
                            <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                              {issue.resolutionStatus}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                            <div>
                              <span className="text-slate-500 block">Assigned Dept:</span>
                              <span className="font-medium text-slate-300">{issue.department}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block">Contractor Agency:</span>
                              <span className="font-medium text-slate-300">{issue.assignedContractor || 'BMC Empanelled Field Unit'}</span>
                            </div>
                          </div>
                        </div>

                        {/* TRACK B: Citizen Ground Check Track */}
                        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                              <ShieldCheck className="w-4 h-4 text-emerald-400" />
                              <span>Citizen Ground Check Track</span>
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {issue.citizenConfirmations} Confirmed • {issue.citizenDisputes} Disputed
                            </span>
                          </div>

                          {/* 4. GROUND VERIFICATION TRIGGER FOR 100% */}
                          {!canVerify ? (
                            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                              <span>
                                Citizen Ground Verification unlocks once BMC reaches <strong>Stage 3 (75% Contractor Deployed)</strong> or BMC marks it resolved. Use the Viva controls above to advance status.
                              </span>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <p className="text-xs text-slate-300">
                                Contractor deployed on site! Has BMC completed this fix on ground? Confirm to trigger 100% closure &amp; transfer to Layer 3:
                              </p>

                              <div className="grid grid-cols-2 gap-3 pt-1">
                                <button
                                  onClick={() => onConfirmGroundFix(issue.id, true)}
                                  className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer active:scale-95"
                                >
                                  <Check className="w-4 h-4 stroke-[3]" />
                                  <span>Yes, Ground Fix Verified</span>
                                </button>

                                <button
                                  onClick={() => onConfirmGroundFix(issue.id, false)}
                                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                                >
                                  <XCircle className="w-4 h-4" />
                                  <span>No, Still Pending ({issue.citizenDisputes})</span>
                                </button>
                              </div>

                              {/* Upload After Photo Trigger */}
                              <div className="pt-2 border-t border-emerald-500/10 flex items-center justify-between flex-wrap gap-2">
                                <div className="flex items-center gap-2">
                                  <label className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-700">
                                    <Camera className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Upload After Photo Proof</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                          const mockUrl = URL.createObjectURL(e.target.files[0]);
                                          onUploadAfterPhoto(issue.id, mockUrl);
                                        }
                                      }}
                                    />
                                  </label>
                                  {issue.afterPhotoUrl && (
                                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" />
                                      Proof Attached!
                                    </span>
                                  )}
                                </div>

                                <button
                                  onClick={() => onOpenOpinionDrawer(issue)}
                                  className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 cursor-pointer"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span>Comments ({issue.opinions.length})</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Footer note */}
                      <div className="p-3 bg-slate-950 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between px-6">
                        <span>MCGM Auto-Escalation SLA: 24-48 Hours</span>
                        <button
                          onClick={() => onSelectForLetter(issue.id)}
                          className="text-emerald-400 hover:underline font-semibold cursor-pointer"
                        >
                          Send AMC Follow-up Letter &rarr;
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            LAYER 3 VIEW: Resolved & Verified Hall of Fame (Fully Closed Tickets)
           ========================================================================= */}
        {activeLayer === 3 && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2.5 text-xs text-teal-300">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-teal-400" />
                <span>
                  <strong>Hall of Fame:</strong> Verified spot-fixes successfully resolved by BMC H/West Ward and cross-verified on the ground by Khar West residents.
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-teal-400">
                {currentLayerIssues.length} Closed Fixes
              </span>
            </div>

            {currentLayerIssues.length === 0 ? (
              <div className="rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-10 sm:p-14 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-teal-500/30 flex items-center justify-center mx-auto mb-5 text-teal-400 shadow-lg shadow-teal-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                  0 Verified Spot-Fixes.
                </h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
                  Resolved complaints will appear here after citizen ground check.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <button
                    onClick={() => onSelectLayer(1)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>View Active Hotspots &rarr;</span>
                  </button>
                  <button
                    onClick={() => onSelectLayer(2)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 text-xs font-bold border border-slate-700 transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Check Ward Action &rarr;</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentLayerIssues.map((issue) => {
                  return (
                    <motion.div
                      key={issue.id}
                      id={`issue-card-${issue.id}`}
                      initial={{ opacity: 0, y: 20, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="flex flex-col justify-between rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300 shadow-xl overflow-hidden"
                    >
                      <div className="p-6">
                        {/* Dual-Verified Glowing Badge */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-extrabold shadow-sm shadow-emerald-500/10">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Dual-Verified: BMC Closed + Citizen Confirmed</span>
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            {issue.resolvedAt || 'Verified Closed'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-xl font-black text-white">{issue.title}</h3>

                          {/* CONDITIONAL ADMIN DELETE BUTTON */}
                          {isAdminMode && onDeleteIssue && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm(`[ADMIN ACTION] Are you sure you want to delete "${issue.title}"?`)) {
                                  onDeleteIssue(issue.id);
                                }
                              }}
                              className="px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500 text-rose-400 hover:text-slate-950 border border-rose-500/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                              title="Admin Delete Issue"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mt-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{issue.location}</span>
                        </div>

                        <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                          {issue.description}
                        </p>

                        {/* Proof photo if available */}
                        {issue.afterPhotoUrl && (
                          <div className="mt-4 rounded-xl overflow-hidden border border-slate-700 relative group max-h-48">
                            <img
                              src={issue.afterPhotoUrl}
                              alt="After Photo Ground Proof"
                              className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur text-[10px] font-bold text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-400" />
                              <span>Ground Verification After-Photo</span>
                            </div>
                          </div>
                        )}

                        {/* Slang Quote of Relief */}
                        <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 italic">
                          <span className="font-semibold not-italic text-emerald-400 mr-1">
                            Resident Relief:
                          </span>
                          &ldquo;{issue.mumbaiSlangQuote}&rdquo;
                        </div>
                      </div>

                      {/* Card Footer with verification stats */}
                      <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-emerald-400">
                            {issue.citizenConfirmations} Resident Confirmations
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="font-mono text-slate-400">{issue.mcgmTicketId}</span>
                        </div>

                        <button
                          onClick={() => onOpenOpinionDrawer(issue)}
                          className="text-xs text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Read Feed ({issue.opinions.length})</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
