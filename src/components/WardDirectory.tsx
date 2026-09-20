import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldAlert, 
  Check, 
  Copy, 
  Search,
  ExternalLink,
  Users
} from 'lucide-react';
import { WARD_OFFICIALS } from '../data/civicData';

export const WardDirectory: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const filteredOfficials = WARD_OFFICIALS.filter(off => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      off.role.toLowerCase().includes(q) ||
      off.department.toLowerCase().includes(q) ||
      off.slangRole.toLowerCase().includes(q) ||
      off.jurisdiction.toLowerCase().includes(q)
    );
  });

  return (
    <section id="directory-section" className="py-14 sm:py-20 bg-[#0B0F17] text-white border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Official Escalation Directory</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Whom to Approach in H/West Ward
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
              Official municipal escalation hierarchy for BMC H/West Ward Office (2nd Hasnabad Lane, Khar West - 400052).
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search AMC, Roads, SWM, Traffic..."
              className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Officials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOfficials.map((official) => (
            <div
              key={official.id}
              className="flex flex-col justify-between rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 hover:border-emerald-500/40 p-6 transition-all duration-300 shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {official.badgeText}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    H/West Desk
                  </span>
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
                  {official.role}
                </h3>
                <p className="text-xs font-semibold text-emerald-400 mt-0.5">
                  {official.title}
                </p>

                {/* Slang Tag */}
                <div className="mt-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-amber-300 font-medium">
                  Local Khar Tag: &ldquo;{official.slangRole}&rdquo;
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span><strong>Dept:</strong> {official.department}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Office:</strong> {official.location}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <a
                  href={`tel:${official.phone.split('/')[0].trim().replace(/[^0-9]/g, '')}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call</span>
                </a>

                <button
                  onClick={() => handleCopyEmail(official.email)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    copiedEmail === official.email
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/30'
                  }`}
                >
                  {copiedEmail === official.email ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Ward Office Physical Address Footer Banner */}
        <div className="mt-10 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white block">Physical H/West Ward Headquarters:</span>
              <span className="text-slate-400">BMC H/West Ward Office, 2nd Hasnabad Lane, Near Khar Police Station, Khar West, Mumbai - 400052</span>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=BMC+H+West+Ward+Office+Khar+West"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold border border-slate-700 flex items-center gap-1.5 shrink-0"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  );
};
