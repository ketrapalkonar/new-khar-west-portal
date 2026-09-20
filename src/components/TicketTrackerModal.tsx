import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  CheckCircle2, 
  Clock, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  ExternalLink,
  Flame,
  AlertTriangle,
  Camera
} from 'lucide-react';
import { CivicIssue, WorkStage } from '../types';
import { WORK_STAGES } from '../data/civicData';

interface TicketTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  issues: CivicIssue[];
  initialTicketQuery?: string;
  onSelectLayer: (layer: 1 | 2 | 3) => void;
  onUpdateStage: (issueId: string, stage: WorkStage) => void;
  onConfirmGroundFix: (issueId: string, isFixed: boolean) => void;
  onOpenReportModal: () => void;
  onUploadAfterPhoto: (issueId: string, photoUrl: string) => void;
}

export const TicketTrackerModal: React.FC<TicketTrackerModalProps> = ({
  isOpen,
  onClose,
  issues,
  initialTicketQuery = '',
  onSelectLayer,
  onUpdateStage,
  onConfirmGroundFix,
  onOpenReportModal,
  onUploadAfterPhoto
}) => {
  const [searchQuery, setSearchQuery] = useState(initialTicketQuery);

  useEffect(() => {
    if (isOpen && initialTicketQuery !== undefined) {
      setSearchQuery(initialTicketQuery);
    }
  }, [isOpen, initialTicketQuery]);

  if (!isOpen) return null;

  const trimmedQuery = searchQuery.trim().toLowerCase();

  // Find matching issue
  const matchedIssue = trimmedQuery
    ? issues.find(i => 
        (i.mcgmTicketId && i.mcgmTicketId.toLowerCase().includes(trimmedQuery)) ||
        i.id.toLowerCase().includes(trimmedQuery)
      )
    : null;

  // Active stage helper (default to 3 if in layer 2, or 4 if in layer 3, or 1 if in layer 1)
  const currentStage: WorkStage = matchedIssue?.workStage || 
    (matchedIssue?.layer === 3 ? 4 : matchedIssue?.layer === 2 ? 3 : 1);

  const stageInfo = WORK_STAGES.find(s => s.stage === currentStage) || WORK_STAGES[0];

  const handleJumpToCard = (issue: CivicIssue) => {
    onSelectLayer(issue.layer);
    onClose();
    setTimeout(() => {
      const el = document.getElementById(`issue-card-${issue.id}`) || document.getElementById('lifecycle-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-4', 'ring-emerald-400');
        setTimeout(() => el.classList.remove('ring-4', 'ring-emerald-400'), 2500);
      }
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0F172A] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">Track BMC Ticket Status</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  MCGM SAP-PGR
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Live inspection, contractor deployment, and dual-verification progress
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar Input */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter MCGM Grievance Ticket ID (e.g. HW/2026/04812)..."
              className="w-full pl-10 pr-24 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tracking-wide"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 px-2 py-1 rounded-md text-[11px] font-semibold text-slate-400 hover:text-white hover:bg-slate-800"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Select of available tickets */}
          {issues.some(iss => !!iss.mcgmTicketId) && (
            <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
              <span className="text-slate-500 text-[11px]">Active System Tickets:</span>
              {issues.filter(iss => !!iss.mcgmTicketId).slice(0, 4).map(iss => (
                <button
                  key={iss.id}
                  onClick={() => setSearchQuery(iss.mcgmTicketId || '')}
                  className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-[11px] hover:border-emerald-500/50 cursor-pointer"
                >
                  {iss.mcgmTicketId}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body / Results */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {!trimmedQuery ? (
            <div className="py-10 text-center text-slate-400">
              <Clock className="w-10 h-10 mx-auto text-slate-600 mb-3" />
              <p className="text-sm font-semibold text-slate-300">Enter a Ticket ID to track its civic progress</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Every spot-fix logged via Aamchi Khar West receives an official MCGM format ID (e.g., HW/2026/XXXXX).
              </p>
            </div>
          ) : matchedIssue ? (
            <div className="space-y-6">
              {/* Ticket Overview Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {matchedIssue.mcgmTicketId}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      matchedIssue.layer === 3
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                        : matchedIssue.layer === 2
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    }`}>
                      {matchedIssue.layer === 3 
                        ? 'Layer 3: Resolved & Dual-Verified'
                        : matchedIssue.layer === 2
                        ? 'Layer 2: Under Ward Action'
                        : 'Layer 1: Active Hotspot (Upvoting)'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleJumpToCard(matchedIssue)}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View in Dashboard Feed</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="text-lg font-black text-white">{matchedIssue.title}</h4>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-amber-400 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    {matchedIssue.location}
                  </span>
                  <span>•</span>
                  <span>{matchedIssue.department}</span>
                  <span>•</span>
                  <span>{matchedIssue.votes} Citizen Votes</span>
                </div>
              </div>

              {/* 4-STAGE PROGRESS STEPPER & PERCENTAGE BAR */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Live Work Progress Visualizer
                    </h5>
                    <p className="text-sm font-black text-white mt-0.5">
                      Stage {currentStage} of 4: {stageInfo.label}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black font-mono text-emerald-400">
                      {stageInfo.percent}%
                    </span>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      Complete
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 transition-all duration-500 rounded-full"
                    style={{ width: `${stageInfo.percent}%` }}
                  ></div>
                </div>

                {/* 4 Steps visual dots */}
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {WORK_STAGES.map((s) => {
                    const isPassed = currentStage >= s.stage;
                    const isCurrent = currentStage === s.stage;

                    return (
                      <div key={s.stage} className="flex flex-col items-center text-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-black transition-all ${
                          isCurrent
                            ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/20 scale-110 shadow-lg shadow-emerald-500/30'
                            : isPassed
                            ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                        }`}>
                          {isPassed ? <CheckCircle2 className="w-4 h-4" /> : s.stage}
                        </div>
                        <span className={`text-[10px] font-bold mt-2 leading-tight ${
                          isCurrent ? 'text-emerald-400' : isPassed ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {s.label}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500 mt-0.5">
                          {s.percent}%
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">{stageInfo.description}</span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">
                      Expected SLA Resolution Window: <strong>{stageInfo.slaWindow}</strong>
                    </span>
                  </div>
                </div>

                {/* Viva / Demo interactive stage simulator */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[11px] font-semibold text-slate-400">
                    🔬 Viva Simulation Stage Control:
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {WORK_STAGES.map(s => (
                      <button
                        key={s.stage}
                        onClick={() => onUpdateStage(matchedIssue.id, s.stage)}
                        className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                          currentStage === s.stage
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700'
                        }`}
                      >
                        {s.percent}% {s.label.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Citizen Verification Track */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Citizen Ground Check Verification</span>
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {matchedIssue.citizenConfirmations} Verified • {matchedIssue.citizenDisputes} Disputed
                  </span>
                </div>

                {currentStage < 3 && matchedIssue.layer !== 3 ? (
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      Citizen Ground Verification unlocks once BMC Contractor is deployed on site (Stage 3 / 75%+).
                    </span>
                  </div>
                ) : matchedIssue.layer === 3 ? (
                  <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-xs text-teal-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>
                      Dual-Verification complete! This issue has been verified and permanently immortalized in Layer 3 (Hall of Fame).
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-300">
                      Contractor has been deployed! Khar West residents can now verify or dispute on-ground work:
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <button
                        onClick={() => onConfirmGroundFix(matchedIssue.id, true)}
                        className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Yes, Ground Fix Verified</span>
                      </button>

                      <button
                        onClick={() => onConfirmGroundFix(matchedIssue.id, false)}
                        className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-400 border border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                        <span>Dispute / Incomplete</span>
                      </button>
                    </div>

                    {/* Upload after photo */}
                    <div className="pt-2 flex items-center justify-between">
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
                              onUploadAfterPhoto(matchedIssue.id, mockUrl);
                            }
                          }}
                        />
                      </label>
                      {matchedIssue.afterPhotoUrl && (
                        <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Photo Proof Attached!
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Ticket Not Found State */
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-base font-black text-white">
                  No Record Found for "{searchQuery}"
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
                  This ticket ID isn't registered in our live H/West Ward community tracker yet.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 max-w-md mx-auto text-left space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <Flame className="w-4 h-4" />
                  <span>Report to Initiate Citizen Tracking</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Did you file this grievance with BMC 1916 or MyBMC? Log it as a spot-fix to gather 50+ neighbor upvotes, draft escalation letters to the AMC, and unlock dual citizen verification!
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenReportModal();
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                + Report Spot-Fix with this Ticket ID
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-500">
          <span>MCGM H/West Ward Citizen SLA Tracker</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
