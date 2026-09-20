import React from 'react';
import { Heart, ShieldAlert, GraduationCap, MapPin, Phone, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070A0F] text-slate-400 border-t border-slate-800/80 pt-12 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-8 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-sm">
                KW
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                Aamchi Khar West
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A community-driven civic spot-fix and escalation portal for Brihanmumbai Municipal Corporation (BMC) H/West Ward. Powered by a 3-Layer Civic Lifecycle and Dual Verification Engine.
            </p>
            {/* Student Lead Credit Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 font-semibold text-xs">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Lead Researcher &amp; Developer: <strong>Ketrapal Konar</strong></span>
            </div>
          </div>

          {/* Ward Jurisdictions */}
          <div className="space-y-2.5">
            <span className="font-bold uppercase tracking-wider text-white text-[11px] block">
              Jurisdiction &amp; Desk
            </span>
            <ul className="space-y-1.5 text-slate-400 text-xs">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>BMC H/West Ward (Pincode: 400052)</span>
              </li>
              <li>2nd Hasnabad Lane, Khar West</li>
              <li>S.V. Road &amp; Linking Road Corridors</li>
              <li>1st to 21st Road Residential Belts</li>
              <li>Khar Station Approach &amp; Subway</li>
            </ul>
          </div>

          {/* Emergency Helplines */}
          <div className="space-y-2.5">
            <span className="font-bold uppercase tracking-wider text-white text-[11px] block">
              Emergency Hotlines
            </span>
            <ul className="space-y-1.5 text-slate-400 text-xs">
              <li className="text-rose-400 font-bold flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>BMC Disaster Helpline: 1916 (24x7)</span>
              </li>
              <li>Khar Traffic Police: 022-26006444</li>
              <li>H/West Ward Control: 022-26422311</li>
              <li>MyBMC Mobile App Portal: 24x7</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with exact required text */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p className="text-center sm:text-left text-slate-400">
            Aamchi Khar West Civic Portal — Designed &amp; Developed by <strong>Ketrapal Konar</strong> | Academic Field Research Project for BMC H/West Ward.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer font-bold px-3 py-1 rounded-lg bg-slate-900 border border-slate-800"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};
