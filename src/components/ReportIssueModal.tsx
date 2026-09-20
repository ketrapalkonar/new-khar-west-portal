import React, { useState } from 'react';
import { X, PlusCircle, AlertCircle, MapPin, Tag, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import { NewIssueFormData, IssueCategory } from '../types';
import { KHAR_ROADS } from '../data/civicData';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewIssueFormData) => void;
}

const CATEGORIES: IssueCategory[] = [
  'Sanitation',
  'Road Damage',
  'Waterlogging',
  'Noise',
  'Streetlights',
  'Other'
];

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [title, setTitle] = useState('');
  const [roadLocality, setRoadLocality] = useState(KHAR_ROADS[0]);
  const [category, setCategory] = useState<IssueCategory>('Road Damage');
  const [description, setDescription] = useState('');
  const [mumbaiSlangQuote, setMumbaiSlangQuote] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!title.trim()) {
      errs.title = 'Issue Title is required';
    } else if (title.trim().length < 5) {
      errs.title = 'Title must be at least 5 characters';
    }

    if (!roadLocality.trim()) {
      errs.roadLocality = 'Please select the Khar West road or locality';
    }

    if (!description.trim()) {
      errs.description = 'Ground description is required';
    } else if (description.trim().length < 15) {
      errs.description = 'Please provide at least 15 characters of detail';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: title.trim(),
      roadLocality: roadLocality.trim(),
      category,
      description: description.trim(),
      mumbaiSlangQuote: mumbaiSlangQuote.trim()
    });

    // Reset form
    setTitle('');
    setDescription('');
    setMumbaiSlangQuote('');
    setErrors({});
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-[#0B0F17] rounded-3xl border border-slate-800 shadow-2xl text-slate-100 overflow-hidden relative animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-900/80 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Layer 1 Grassroots Submission</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Report Khar West Spot-Fix
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Post an issue directly to the Khar West Civic Leaderboard to collect citizen upvotes.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
          {/* Issue Title */}
          <div>
            <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1.5">
              Issue Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Deep Pothole Cluster outside Madhu Park gate"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border ${
                errors.title ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
              } text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500`}
            />
            {errors.title && (
              <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Road / Locality Dropdown requested */}
          <div>
            <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1.5">
              Khar West Road / Locality <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <select
                value={roadLocality}
                onChange={(e) => setRoadLocality(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 appearance-none"
              >
                {KHAR_ROADS.map((rd) => (
                  <option key={rd} value={rd} className="bg-slate-900 text-white">
                    {rd}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-3 pointer-events-none text-slate-400">
                ▼
              </div>
            </div>
          </div>

          {/* Category Selector requested */}
          <div>
            <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1.5">
              Category Selector <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`py-2 px-3 rounded-xl border text-center font-bold text-[11px] transition-all cursor-pointer ${
                    category === cat
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1.5">
              Ground Description <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the severity, duration, hazards for motorists or pedestrians, and landmark details..."
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border ${
                errors.description ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
              } text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none`}
            />
            {errors.description && (
              <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Optional Mumbai Slang Quote */}
          <div>
            <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1.5 flex items-center justify-between">
              <span>Mumbai Slang Quote (Optional)</span>
              <span className="text-slate-500 font-normal">Authentic Mumbaikar Punch</span>
            </label>
            <input
              type="text"
              value={mumbaiSlangQuote}
              onChange={(e) => setMumbaiSlangQuote(e.target.value)}
              placeholder="e.g. Boss, BMC ko bolo turant inspection kare, public pareshan hai!"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Note on Auto-Generation */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400">
            <span className="text-emerald-400 font-bold">Auto-assigned:</span> An official MCGM Grievance Tracking ID (<code className="text-white font-mono">HW/2026/XXXXX</code>) and initial community upvote will be issued automatically upon submission.
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit to Hotspots Leaderboard</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
