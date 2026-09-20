import React from 'react';
import { ShieldAlert, MapPin, Flame, FileText, PlusCircle, CheckCircle2, Clock, GraduationCap } from 'lucide-react';

interface NavbarProps {
  totalVotes: number;
  activeLayer: 1 | 2 | 3;
  onSelectLayer: (layer: 1 | 2 | 3) => void;
  onNavigate: (sectionId: string) => void;
  onOpenReportModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalVotes,
  activeLayer,
  onSelectLayer,
  onNavigate,
  onOpenReportModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0B0F17]/90 backdrop-blur-xl border-b border-slate-800/80 text-white shadow-xl shadow-black/40">
      {/* Top micro-banner with Academic Student Lead Attribution */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border-b border-emerald-500/20 text-slate-300 px-4 py-1.5 text-xs font-medium flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
            BMC H/West Ward 400052
          </span>
          <span className="hidden md:inline text-slate-400">
            Khar West Civic Spot-Fix &amp; Escalation Engine
          </span>
        </div>

        {/* Student Lead Attribution Badge requested */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800/90 text-emerald-300 border border-emerald-500/30 font-semibold text-[11px] shadow-sm">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Project Lead: <strong>Ketrapal Konar</strong></span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline font-normal">Academic Field Project Submission</span>
          </span>
          <span className="hidden lg:inline text-slate-500">|</span>
          <span className="hidden lg:inline text-amber-400 font-mono text-[11px]">Emergency: 1916 (24x7)</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 text-lg group-hover:scale-105 transition-transform">
            KW
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                Aamchi Khar West
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Dual-Verification Engine Active"></span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
              Civic Spot-Fix &amp; Escalation Portal (BMC H/West Ward 400052)
            </p>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-slate-300">
          <button
            onClick={() => {
              onSelectLayer(1);
              onNavigate('lifecycle-section');
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeLayer === 1 
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30' 
                : 'hover:bg-slate-800/80 hover:text-emerald-400'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Hotspots</span>
          </button>

          <button
            onClick={() => {
              onSelectLayer(2);
              onNavigate('lifecycle-section');
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeLayer === 2 
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30' 
                : 'hover:bg-slate-800/80 hover:text-emerald-400'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Ward Action &amp; SLA</span>
          </button>

          <button
            onClick={() => {
              onSelectLayer(3);
              onNavigate('lifecycle-section');
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeLayer === 3 
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30' 
                : 'hover:bg-slate-800/80 hover:text-emerald-400'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Hall of Fame</span>
          </button>

          <button
            onClick={() => onNavigate('directory-section')}
            className="px-3 py-1.5 rounded-lg hover:bg-slate-800 hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
            <span>Directory</span>
          </button>

          <button
            onClick={() => onNavigate('guide-section')}
            className="px-3 py-1.5 rounded-lg hover:bg-slate-800 hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Playbook</span>
          </button>

          <button
            onClick={() => onNavigate('generator-section')}
            className="px-3 py-1.5 rounded-lg hover:bg-slate-800 hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Letter Generator</span>
          </button>
        </nav>

        {/* Right CTA Area: + Report Spot-Fix and Total Votes Counter */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Glowing CTA button: "+ Report Spot-Fix" */}
          <button
            onClick={onOpenReportModal}
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-slate-950" />
            <span>+ Report Spot-Fix</span>
          </button>

          {/* Live Total Community Votes Pill */}
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-full px-3 py-1.5 text-right flex items-center gap-2 shrink-0 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">Community Votes:</span>
            <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono tracking-wide">
              {totalVotes.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
