import React from 'react';
import { Flame, Send, Award, Users, AlertTriangle, PlusCircle, CheckCircle2, Clock, Sparkles, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  totalVotes: number;
  activeHotspotsCount: number;
  resolvedCount: number;
  onJumpToLifecycle: (layer?: 1 | 2 | 3) => void;
  onJumpToGenerator: () => void;
  onOpenReportModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalVotes,
  activeHotspotsCount,
  resolvedCount,
  onJumpToLifecycle,
  onJumpToGenerator,
  onOpenReportModal
}) => {
  return (
    <section className="relative overflow-hidden bg-[#0B0F17] text-white pt-10 sm:pt-14 pb-16 sm:pb-20 border-b border-slate-800/80">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 -right-20 w-[400px] h-[300px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Badge requested */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg shadow-emerald-500/10">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Designed &amp; Developed by <strong>Ketrapal Konar</strong></span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-slate-400 font-normal">H/West Ward Civic Innovation</span>
          </div>

          {/* Main Title requested */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight mb-4">
            Aamchi Khar West
            <span className="block text-2xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 mt-2">
              Civic Spot-Fix &amp; Escalation Portal
            </span>
          </h1>

          {/* Subtitle requested */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-7">
            Suno BMC! Live Neighborhood Issue Tracking &amp; MCGM Grievance Status Portal for H/West Ward.
          </p>

          {/* Mumbaikar Slang & Protocol Pill Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-9 text-xs font-medium">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-rose-500/30 text-slate-200 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span><strong>Fix The Lafda:</strong> Upvote Hotspots</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-amber-500/30 text-slate-200 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span><strong>SLA Countdown:</strong> Live Contractor Clock</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-emerald-500/30 text-slate-200 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span><strong>Dual-Verified:</strong> BMC Closed + Citizen Proof</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span><strong>Ward Desk:</strong> 2nd Hasnabad Lane (400052)</span>
            </span>
          </div>

          {/* Prominent CTA Buttons including "+ Report Spot-Fix" */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <button
              onClick={onOpenReportModal}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>+ Report Spot-Fix</span>
            </button>
            <button
              onClick={() => onJumpToLifecycle(1)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 hover:border-emerald-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Explore 3-Layer Dashboard</span>
            </button>
            <button
              onClick={onJumpToGenerator}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-white font-bold text-sm border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Draft Letter to AMC</span>
            </button>
          </div>

          {/* Live Stats Row (3 Glass Cards requested) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {/* Card 1: Total Community Upvotes */}
            <div 
              onClick={() => onJumpToLifecycle(1)}
              className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl p-5 text-left transition-all duration-300 shadow-xl cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                  Citizen Power
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                {totalVotes.toLocaleString()}
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                Total Community Upvotes
              </p>
              <div className="mt-3 text-[11px] text-emerald-400/90 flex items-center gap-1 font-medium">
                <Sparkles className="w-3 h-3" />
                <span>Live H/West Citizen Demands</span>
              </div>
            </div>

            {/* Card 2: Active Hotspots */}
            <div 
              onClick={() => onJumpToLifecycle(2)}
              className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 hover:border-amber-500/40 rounded-2xl p-5 text-left transition-all duration-300 shadow-xl cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                  Under Tracking
                </span>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                {activeHotspotsCount}
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                Active Hotspots
              </p>
              <div className="mt-3 text-[11px] text-amber-400/90 flex items-center gap-1 font-medium">
                <AlertTriangle className="w-3 h-3" />
                <span>Subway, Madhu Park &amp; Roads</span>
              </div>
            </div>

            {/* Card 3: Resolved BMC Spot-Fixes */}
            <div 
              onClick={() => onJumpToLifecycle(3)}
              className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl p-5 text-left transition-all duration-300 shadow-xl cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-bold text-teal-400 tracking-wider">
                  Verified Closed
                </span>
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                {resolvedCount}
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                Resolved BMC Spot-Fixes
              </p>
              <div className="mt-3 text-[11px] text-emerald-400/90 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                <span>Dual-Verified on Ground</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
