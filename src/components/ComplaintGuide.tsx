import React from 'react';
import { Smartphone, PhoneCall, Mail, ArrowRight, Lightbulb, CheckCircle2, ShieldAlert } from 'lucide-react';
import { STEP_GUIDES } from '../data/civicData';

interface ComplaintGuideProps {
  onScrollToGenerator: () => void;
}

export const ComplaintGuide: React.FC<ComplaintGuideProps> = ({
  onScrollToGenerator
}) => {
  return (
    <section id="guide-section" className="py-14 sm:py-20 bg-[#0B0F17] text-white border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Civic Escalation Playbook</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            How to Complaint Like a Pro
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            The 3-Step municipal protocol to get real contractor mobilization in H/West Ward without running from pillar to post.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEP_GUIDES.map((step, idx) => {
            const icons = [
              <Smartphone key="1" className="w-6 h-6 text-emerald-400" />,
              <PhoneCall key="2" className="w-6 h-6 text-amber-400" />,
              <Mail key="3" className="w-6 h-6 text-cyan-400" />
            ];

            return (
              <div
                key={step.stepNumber}
                className="flex flex-col justify-between rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 hover:border-emerald-500/40 p-6 transition-all duration-300 shadow-xl relative group"
              >
                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-2xl font-black font-mono text-emerald-400/40 group-hover:text-emerald-400 transition-colors">
                      {step.stepNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {step.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-4">
                    {icons[idx]}
                  </div>

                  <h3 className="text-lg font-black text-white">{step.title}</h3>
                  <div className="mt-1 text-xs text-amber-400 font-bold">
                    &ldquo;{step.mumbaiSlang}&rdquo;
                  </div>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Bullet Points */}
                  <div className="mt-4 space-y-2 pt-3 border-t border-slate-800 text-xs text-slate-400">
                    {step.bulletPoints.map((bp, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pro Tip */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-amber-300/90 leading-relaxed flex items-start gap-2">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Pro-Tip:</strong> {step.proTip}</span>
                  </div>
                </div>

                {/* Step Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  {step.actionType === 'scroll' ? (
                    <button
                      onClick={onScrollToGenerator}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>{step.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : step.actionType === 'phone' ? (
                    <a
                      href={step.actionUrl}
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>{step.actionLabel}</span>
                      <PhoneCall className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <a
                      href={step.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                    >
                      <span>{step.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
