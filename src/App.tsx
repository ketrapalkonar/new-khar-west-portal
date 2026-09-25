import React, { useState } from 'react';
import { CivicIssue } from '../types';

interface LetterGeneratorProps {
  issues: CivicIssue[];
  selectedIssueId: string;
  onSelectIssue: (id: string) => void;
}

export const LetterGenerator: React.FC<LetterGeneratorProps> = ({
  issues,
  selectedIssueId,
  onSelectIssue,
}) => {
  // Form fields state
  const [customIssueText, setCustomIssueText] = useState('');
  const [residentName, setResidentName] = useState('');
  const [residentRoad, setResidentRoad] = useState('1st Road, Khar West');
  const [landmark, setLandmark] = useState('');
  const [building, setBuilding] = useState('');
  const [urgency, setUrgency] = useState('Critical Emergency: 24-48 Hour SLA');
  const [contactPhone, setContactPhone] = useState('');

  // Generation & Copy Feedback states
  const [isGenerated, setIsGenerated] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Active issue resolution
  const isOtherSelected = selectedIssueId === 'OTHER_CUSTOM_ISSUE';
  const activeIssue = issues.find((i) => i.id === selectedIssueId);

  // Determine active title & locality for the draft
  const targetTitle = isOtherSelected
    ? customIssueText.trim() || 'Custom Civic Grievance'
    : activeIssue?.title || 'Civic Infrastructure Spot-Fix';

  const targetLocation = isOtherSelected
    ? residentRoad
    : activeIssue?.location || residentRoad;

  const targetDept = activeIssue?.department || 'H/West Ward Administrative Desk';
  const targetTicket = activeIssue?.mcgmTicketId || 'PENDING-REGISTRATION';

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
  };

  const handleCopyLetter = () => {
    const letterText = `To,\nThe Assistant Municipal Commissioner,\nBMC H/West Ward Office,\n2nd Hasnabad Lane, Khar West, Mumbai - 400052.\n\nSubject: URGENT ESCALATION: ${targetTitle} at ${targetLocation}\n\nDear Sir/Madam,\n\nI am writing as a resident of ${residentRoad} (${landmark ? `Near ${landmark}` : ''} ${building ? `, ${building}` : ''}) to formally escalate an unresolved civic issue under MCGM Citizen Charter SLAs.\n\nDETAILS OF CIVIC GRIEVANCE:\n- Issue Title: ${targetTitle}\n- Locality / Road: ${targetLocation}\n- Responsible Department: ${targetDept}\n- Tracking Ticket Ref: ${targetTicket}\n- Urgency Level: ${urgency}\n- Resident Contact: ${residentName} (${contactPhone || 'Phone on file'})\n\nThis issue significantly affects daily commuter safety and residential hygiene in Khar West. We request immediate site inspection and contractor mobilization from H/West Ward.\n\nYours faithfully,\n${residentName || 'Concerned Khar West Resident'}`;

    navigator.clipboard.writeText(letterText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <section id="generator-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 text-center sm:text-left">
        <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full mb-3">
          ON-DEMAND EXECUTIVE ESCALATION
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Formal BMC Complaint Email Generator
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Generate an official, legally structured email addressed to the Assistant Municipal Commissioner of BMC H/West Ward citing MCGM Citizen Charter turnaround times.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <h3 className="font-bold text-slate-200 text-base">Grievance Parameters</h3>
            <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md font-mono border border-slate-700">
              H/West Ward 400052
            </span>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            {/* SELECT TARGET ISSUE DROPDOWN */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                SELECT TARGET ISSUE *
              </label>
              <select
                value={selectedIssueId}
                onChange={(e) => {
                  onSelectIssue(e.target.value);
                  setIsGenerated(false);
                }}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              >
                <option value="" disabled>-- Select Reported Issue --</option>
                
                {/* Dynamically list issues from active state */}
                {issues.map((issue) => (
                  <option key={issue.id} value={issue.id}>
                    {issue.title} ({issue.location})
                  </option>
                ))}

                {/* Preset Hotspots */}
                <optgroup label="Preset Khar West Hotspots">
                  <option value="preset-subway">Khar Subway Waterlogging</option>
                  <option value="preset-madhu-park">Garbage Dumping near Madhu Park</option>
                  <option value="preset-potholes">14th Road Potholes</option>
                  <option value="preset-linking-road">Linking Road Footpath Encroachment</option>
                </optgroup>

                {/* Other Custom Option */}
                <option value="OTHER_CUSTOM_ISSUE">Other (Write Custom Issue)</option>
              </select>

              {/* Custom Input Box if "Other" is selected */}
              {isOtherSelected && (
                <div className="mt-3 animate-fade-in">
                  <label className="block text-xs font-semibold text-emerald-400 mb-1">
                    Describe Custom Issue:
                  </label>
                  <input
                    type="text"
                    required
                    value={customIssueText}
                    onChange={(e) => setCustomIssueText(e.target.value)}
                    placeholder="e.g. Open Manhole near Khar Station West"
                    className="w-full bg-slate-950 border border-emerald-500/50 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              )}
            </div>

            {/* Resident Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                RESIDENT FULL NAME *
              </label>
              <input
                type="text"
                required
                value={residentName}
                onChange={(e) => setResidentName(e.target.value)}
                placeholder="e.g. Rajesh Khurana / Ketrapal Konar"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Khar Road / Locality */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                KHAR WEST ROAD / LOCALITY *
              </label>
              <select
                value={residentRoad}
                onChange={(e) => setResidentRoad(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="1st Road, Khar West">1st Road, Khar West</option>
                <option value="15th Road, Khar West">15th Road, Khar West</option>
                <option value="18th Road, Khar West">18th Road, Khar West</option>
                <option value="S.V. Road, Khar West">S.V. Road, Khar West</option>
                <option value="Linking Road, Khar West">Linking Road, Khar West</option>
                <option value="Khar Subway Approach">Khar Subway Approach</option>
                <option value="Hasnabad Lane, Khar West">Hasnabad Lane, Khar West</option>
              </select>
            </div>

            {/* Landmark & Building Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  LANDMARK / SPOT
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near Madhu Park gate"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  SOCIETY / BUILDING
                </label>
                <input
                  type="text"
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  placeholder="e.g. Silver Cascade CHS"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Urgency Level */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                URGENCY LEVEL & SLA
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Critical Emergency: 24-48 Hour SLA">
                  Critical Emergency: 24-48 Hour SLA (Subway Flooding / Open Drain)
                </option>
                <option value="High Priority: 72 Hour SLA">High Priority: 72 Hour SLA (Garbage Accumulation)</option>
                <option value="Standard Priority: 7 Day SLA">Standard Priority: 7 Day SLA (Streetlight / Pothole Fix)</option>
              </select>
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                CONTACT PHONE (OPTIONAL)
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="e.g. +91 98200 XXXXX"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Submit CTA Button */}
            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <span>⚡ Generate Official Letter</span>
            </button>
          </form>
        </div>

        {/* Right Column: Complaint Draft Preview */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md min-h-[480px] flex flex-col justify-between shadow-xl">
          {!isGenerated ? (
            /* Blank Placeholder State */
            <div className="my-auto text-center py-12 px-4">
              <div className="w-16 h-16 bg-slate-800/80 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-700/50">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-slate-200">Complaint Draft Preview</h4>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-sm mx-auto">
                Enter your resident details on the left and click 'Generate Official Letter' to create your formal draft.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-xs text-slate-500 bg-slate-950/60 px-3 py-1.5 rounded-full border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Auto-routed to: assistantcommissioner.hwest@mcgm.gov.in</span>
              </div>
            </div>
          ) : (
            /* Generated Letter Output State */
            <div className="flex flex-col h-full justify-between animate-fade-in">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-md">
                    OFFICIAL MCGM LEGAL ESCALATION DRAFT
                  </span>
                  <button
                    onClick={handleCopyLetter}
                    className="px-3 py-1.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow-md"
                  >
                    {isCopied ? '✓ Copied to Clipboard!' : '📋 Copy Complaint Email'}
                  </button>
                </div>

                <div className="bg-slate-950 border border-slate-800/90 rounded-xl p-5 text-xs sm:text-sm text-slate-300 font-mono leading-relaxed space-y-3 overflow-y-auto max-h-[380px]">
                  <p><strong>To,</strong></p>
                  <p>The Assistant Municipal Commissioner,<br />BMC H/West Ward Office,<br />2nd Hasnabad Lane, Khar West, Mumbai - 400052.</p>
                  <p><strong>Subject:</strong> URGENT ESCALATION: {targetTitle} at {targetLocation}</p>
                  <p>Dear Sir/Madam,</p>
                  <p>I am writing as a resident of <strong>{residentRoad}</strong> {landmark && `(Near ${landmark})`} {building && `, ${building}`} to formally escalate an unresolved civic issue under MCGM Citizen Charter SLAs.</p>
                  <p><strong>DETAILS OF CIVIC GRIEVANCE:</strong><br />
                  • Issue Title: {targetTitle}<br />
                  • Locality / Road: {targetLocation}<br />
                  • Responsible Department: {targetDept}<br />
                  • Tracking Ticket Ref: {targetTicket}<br />
                  • Urgency Level: {urgency}<br />
                  • Resident Contact: {residentName} ({contactPhone || 'Phone on file'})</p>
                  <p>This issue significantly affects daily commuter safety and residential hygiene in Khar West. We request immediate site inspection and contractor mobilization from H/West Ward.</p>
                  <p>Yours faithfully,<br /><strong>{residentName || 'Concerned Khar West Resident'}</strong></p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Destination: <strong>BMC H/West Ward (Hasnabad Lane)</strong></span>
                <span className="text-emerald-400">Status: Ready to Send</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
