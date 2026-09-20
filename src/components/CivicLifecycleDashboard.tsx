import React, { useState, useEffect } from 'react';
import { CivicIssue } from '../types';
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
  Share2
} from 'lucide-react';

interface CivicLifecycleDashboardProps {
  issues: CivicIssue[];
  activeLayer: 1 | 2 | 3;
  onSelectLayer: (layer: 1 | 2 | 3) => void;
  upvotedIds: Set<string>;
  onUpvote: (issueId: string) => void;
  onSelectForLetter: (issueId: string) => void;
  onOpenOpinionDrawer: (issue: CivicIssue) => void;
  onConfirmGroundFix: (issueId: string, isFixed: boolean) => void;
  onUploadAfterPhoto: (issueId: string, photoUrl: string) => void;
  onPromoteToWardAction: (issueId: string) => void;
  onOpenReportModal: () => void;
}

export const CivicLifecycleDashboard: React.FC<CivicLifecycleDashboardProps> = ({
  issues,
  activeLayer,
  onSelectLayer,
  upvotedIds,
  onUpvote,
  onSelectForLetter,
  onOpenOpinionDrawer,
  onConfirmGroundFix,
  onUploadAfterPhoto,
  onPromoteToWardAction,
  onOpenReportModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
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
        issue.department.toLowerCase().includes(q) ||
        issue.mcgmTicketId.toLowerCase().includes(q)
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3-Layer Civic Lifecycle &amp; Dual Verification</span>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {currentLayerIssues.map((issue) => {
                const isUpvoted = upvotedIds.has(issue.id);
                const progressPercent = Math.min(100, Math.round((issue.votes / issue.voteTarget) * 100));
                const canPromote = issue.votes >= 50;

                return (
                  <div
                    key={issue.id}
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
                        {/* Upvote Button (+1) */}
                        <button
                          onClick={() => handleVoteClick(issue.id)}
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
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            LAYER 2 VIEW: Under Ward Action (Live BMC + Dual Verification Track)
           ========================================================================= */}
        {activeLayer === 2 && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2.5 text-xs text-emerald-300">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  <strong>Dual Verification Engine:</strong> Official MCGM work order is running against a live SLA. When residents verify the on-ground resolution, the ticket transitions to <strong>Layer 3: Resolved Hall of Fame</strong>.
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {currentLayerIssues.length} Active Work Orders
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentLayerIssues.map((issue) => {
                return (
                  <div
                    key={issue.id}
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
                            {issue.bmcStatus || 'Contractor Deployed'}
                          </span>
                        </div>

                        {/* Live SLA Countdown Clock requested */}
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-amber-500/40 text-amber-400 font-mono text-xs font-bold shadow-inner">
                          <Clock className="w-3.5 h-3.5 animate-pulse" />
                          <span>SLA Clock: {formatSlaClock(issue.slaRemainingSeconds)}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-black text-white">{issue.title}</h3>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mt-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{issue.location}</span>
                      </div>
                    </div>

                    {/* Dual Verification Tracks Container */}
                    <div className="p-6 space-y-5">
                      
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

                        <p className="text-xs text-slate-300">
                          Has BMC fixed this issue on the ground? Cast your vote to verify or dispute:
                        </p>

                        {/* Interactive Verification Buttons requested */}
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <button
                            onClick={() => onConfirmGroundFix(issue.id, true)}
                            className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer active:scale-95"
                          >
                            <Check className="w-4 h-4" />
                            <span>Yes, Fixed! ({issue.citizenConfirmations})</span>
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
                              <span>Upload After Photo</span>
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
                            <MessageSquare className="w-3 h-3" />
                            <span>View Comments ({issue.opinions.length})</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Footer note */}
                    <div className="p-3 bg-slate-950 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between px-6">
                      <span>MCGM Auto-Escalation SLA: 24-48 Hours</span>
                      <button
                        onClick={() => onSelectForLetter(issue.id)}
                        className="text-emerald-400 hover:underline font-semibold"
                      >
                        Send AMC Follow-up Letter &rarr;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentLayerIssues.map((issue) => {
                return (
                  <div
                    key={issue.id}
                    className="flex flex-col justify-between rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300 shadow-xl overflow-hidden"
                  >
                    <div className="p-6">
                      {/* Dual-Verified Glowing Badge requested */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-extrabold shadow-sm shadow-emerald-500/10">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Dual-Verified: BMC Closed + Citizen Confirmed</span>
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {issue.resolvedAt || 'Verified Closed'}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-white">{issue.title}</h3>
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
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
