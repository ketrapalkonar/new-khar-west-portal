import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Send, 
  FileText, 
  Sparkles, 
  AlertCircle, 
  Building2, 
  Mail, 
  Download, 
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { CivicIssue, ComplaintFormData } from '../types';
import { KHAR_ROADS } from '../data/civicData';

interface LetterGeneratorProps {
  issues: CivicIssue[];
  selectedIssueId: string;
  onSelectIssue: (issueId: string) => void;
}

export const LetterGenerator: React.FC<LetterGeneratorProps> = ({
  issues,
  selectedIssueId,
  onSelectIssue
}) => {
  const [formData, setFormData] = useState<ComplaintFormData>({
    issueType: selectedIssueId,
    customIssueTitle: '',
    residentName: '',
    roadLocality: KHAR_ROADS[0],
    landmark: '',
    contactNumber: '',
    societyName: '',
    urgency: 'Immediate Action Required (24-48 Hour SLA)'
  });

  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const currentSelectedIssue = issues.find(i => i.id === selectedIssueId);

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.residentName.trim()) {
      errs.residentName = 'Resident Name is required for official sign-off';
    }
    if (!formData.roadLocality.trim()) {
      errs.roadLocality = 'Khar West Road/Locality is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const issue = currentSelectedIssue || issues[0];
    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const draft = `TO:
Assistant Municipal Commissioner,
Brihanmumbai Municipal Corporation (BMC), H/West Ward,
Ward Office Building, 2nd Hasnabad Lane,
Khar West, Mumbai, Maharashtra - 400052
Email: assistantcommissioner.hwest@mcgm.gov.in
Ward Contact: 022-26422311 / 022-26422315

DATE: ${dateStr}

SUBJECT: URGENT CIVIC SPOT-FIX ESCALATION: ${issue.title.toUpperCase()} (WARD H/WEST - 400052)
REFERENCE: MCGM Grievance Tracking Ticket: ${issue.mcgmTicketId}

Respected Assistant Municipal Commissioner Sir / Madam,

I am writing to your office in my capacity as a resident of Khar West (BMC H/West Ward) to formally escalate a critical, recurring civic grievance that poses an acute risk to public health, commuter safety, and local neighborhood sanitation.

1. LOCATION & JURISDICTION DETAILS:
   - Primary Location: ${issue.location}
   - Specific Cross-Road / Lane: ${formData.roadLocality}
   ${formData.landmark ? `- Landmark / Near: ${formData.landmark}` : ''}
   ${formData.societyName ? `- Housing Society / Building: ${formData.societyName}` : ''}
   - Pincode: 400052 (Khar West)
   - Concerned BMC Department: ${issue.department}

2. NATURE OF CIVIC HAZARD & GROUND REALITY:
   ${issue.description}

   Citizen Community Observation:
   "${issue.mumbaiSlangQuote}"

3. COMMUNITY ENDORSEMENT & CITIZEN CHARTER SLA:
   This spot-fix has officially garnered ${issue.votes} verified community upvotes on the Aamchi Khar West Civic Resolution Portal. Under the MCGM Citizens' Charter, urgent hazards of this classification mandate site inspection and contractor mobilization within 24 to 48 hours.

4. SPECIFIC TIME-BOUND RELIEF REQUESTED:
   a) Depute the Junior Engineer / Executive Engineer (${issue.department}) for an immediate on-site joint inspection.
   b) Deploy necessary municipal machinery (suction pumps / mastic asphalt crew / SWM compactor / M&E line squad).
   c) Update ticket ${issue.mcgmTicketId} with an official Work Order status and estimated completion timestamp.

Kindly acknowledge receipt of this official resident communication and notify us of the designated field overseer assigned to this site.

Yours sincerely,

[SIGNATURE]
${formData.residentName}
Resident, Khar West (BMC H/West Ward - 400052)
${formData.societyName ? `${formData.societyName}, ` : ''}${formData.roadLocality}
${formData.contactNumber ? `Contact Phone: ${formData.contactNumber}` : ''}
CC:
1. Executive Engineer (Roads & Maintenance / SWD), H/West Ward
2. Solid Waste Management (SWM) Overseer, H/West Ward
3. Khar Residents & Advanced Locality Management (ALM) Forum`;

    setGeneratedLetter(draft);
  };

  const handleCopy = () => {
    if (!generatedLetter) return;
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    if (!generatedLetter) return;
    const blob = new Blob([generatedLetter], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BMC_HWest_Complaint_${currentSelectedIssue?.mcgmTicketId || 'Grievance'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleOpenMailClient = () => {
    if (!generatedLetter) return;
    const subject = encodeURIComponent(`URGENT: ${currentSelectedIssue?.title || 'Civic Grievance'} [${currentSelectedIssue?.mcgmTicketId || 'H/West'}]`);
    const body = encodeURIComponent(generatedLetter);
    window.location.href = `mailto:assistantcommissioner.hwest@mcgm.gov.in?subject=${subject}&body=${body}`;
  };

  return (
    <section id="generator-section" className="py-14 sm:py-20 bg-[#0B0F17] text-white border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>On-Demand Executive Escalation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Formal BMC Complaint Email Generator
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Generate an official, legally structured email addressed to the Assistant Municipal Commissioner of BMC H/West Ward citing MCGM Citizen Charter turnaround times.
          </p>
        </div>

        {/* Two-Column SaaS Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-slate-800/90 p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Grievance Parameters</span>
              </h3>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                H/West Ward 400052
              </span>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4 text-xs">
              {/* Select Issue Dropdown requested */}
              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1.5">
                  Select Target Issue <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedIssueId}
                    onChange={(e) => {
                      onSelectIssue(e.target.value);
                      setFormData(prev => ({ ...prev, issueType: e.target.value }));
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 appearance-none font-medium"
                  >
                    {issues.map(issue => (
                      <option key={issue.id} value={issue.id} className="bg-slate-900 text-white">
                        [{issue.mcgmTicketId}] {issue.title} ({issue.votes} Votes)
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-3 pointer-events-none text-slate-400">
                    ▼
                  </div>
                </div>
              </div>

              {/* Resident Name (Required) requested */}
              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1.5">
                  Resident Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.residentName}
                  onChange={(e) => setFormData({ ...formData, residentName: e.target.value })}
                  placeholder="e.g. Rajesh Khurana / Ketrapal Konar"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border ${
                    errors.residentName ? 'border-rose-500' : 'border-slate-700 focus:border-emerald-500'
                  } text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500`}
                />
                {errors.residentName && (
                  <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.residentName}
                  </p>
                )}
              </div>

              {/* Khar Road/Locality (Required) requested */}
              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1.5">
                  Khar West Road / Locality <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.roadLocality}
                    onChange={(e) => setFormData({ ...formData, roadLocality: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 appearance-none font-medium"
                  >
                    {KHAR_ROADS.map(road => (
                      <option key={road} value={road} className="bg-slate-900 text-white">
                        {road}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-3 pointer-events-none text-slate-400">
                    ▼
                  </div>
                </div>
              </div>

              {/* Landmark requested */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1.5">
                    Landmark / Spot
                  </label>
                  <input
                    type="text"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    placeholder="e.g. Near Madhu Park gate"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1.5">
                    Society / Building
                  </label>
                  <input
                    type="text"
                    value={formData.societyName}
                    onChange={(e) => setFormData({ ...formData, societyName: e.target.value })}
                    placeholder="e.g. Silver Cascade CHS"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Urgency Level requested */}
              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1.5">
                  Urgency Level &amp; SLA
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Immediate Action Required (24-48 Hour SLA)">
                    Critical Emergency: 24-48 Hour SLA (Subway Flooding / Open Drain)
                  </option>
                  <option value="Priority Action Required (72-Hour SLA)">
                    High Priority: 72-Hour SLA (Garbage Dumping / Potholes)
                  </option>
                  <option value="Routine Citizen Charter (7-Day SLA)">
                    Medium Priority: 7-Day SLA (Streetlights / Noise Decibels)
                  </option>
                </select>
              </div>

              {/* Resident Phone (Optional) */}
              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1.5">
                  Contact Phone (Optional)
                </label>
                <input
                  type="text"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  placeholder="e.g. +91 98200 XXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* "Generate Official Letter" CTA button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 mt-4"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Generate Official Letter</span>
              </button>
            </form>
          </div>

          {/* Right Column: Output Preview Box (7 cols) - BLANK PLACEHOLDER INITIALLY */}
          <div className="lg:col-span-7 flex flex-col h-full">
            {!generatedLetter ? (
              /* Initial State: Displays an elegant empty-state card requested */
              <div className="rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[440px]">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-500 mb-4 shadow-inner">
                  <FileText className="w-8 h-8 text-slate-400" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                  Complaint Draft Preview
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
                  Enter your resident details on the left and click &apos;Generate Official Letter&apos; to create your formal draft.
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>Auto-routed to: assistantcommissioner.hwest@mcgm.gov.in</span>
                </div>
              </div>
            ) : (
              /* Triggered State: Complete formal email with glowing Copy button */
              <div className="rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 shadow-2xl flex flex-col justify-between animate-fadeIn">
                
                {/* Draft Actions Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                      <Check className="w-3.5 h-3.5" />
                      Formal Grievance Draft Ready
                    </span>
                    <span className="text-[11px] text-slate-400 ml-2 font-mono">
                      Ref: {currentSelectedIssue?.mcgmTicketId}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Copy Complaint Email Button with glowing feedback requested */}
                    <button
                      onClick={handleCopy}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                        copied
                          ? 'bg-emerald-400 text-slate-950 ring-4 ring-emerald-500/30 shadow-lg shadow-emerald-500/40'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Complaint Email</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleOpenMailClient}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      title="Open in your default email app"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                      <span className="hidden sm:inline">Open Mail</span>
                    </button>

                    <button
                      onClick={handleDownload}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                      title="Download as .txt"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </div>

                {/* Preformatted Letter Output Box */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 font-mono text-[11px] leading-relaxed text-slate-300 max-h-[460px] overflow-y-auto whitespace-pre-wrap select-all">
                  {generatedLetter}
                </div>

                {/* Bottom guidance */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 flex-wrap gap-2">
                  <span>
                    Recipient: <strong className="text-slate-200">assistantcommissioner.hwest@mcgm.gov.in</strong>
                  </span>
                  <span className="text-emerald-400 font-semibold">
                    Tip: Paste directly into your email &amp; attach photos!
                  </span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
