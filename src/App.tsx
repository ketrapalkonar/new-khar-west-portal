import React, { useState, useMemo } from 'react';
import { INITIAL_ISSUES, WORK_STAGES } from './data/civicData';
import { CivicIssue, NewIssueFormData, ResidentOpinion, WorkStage } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CivicLifecycleDashboard } from './components/CivicLifecycleDashboard';
import { ResidentOpinionDrawer } from './components/ResidentOpinionDrawer';
import { WardDirectory } from './components/WardDirectory';
import { ComplaintGuide } from './components/ComplaintGuide';
import { LetterGenerator } from './components/LetterGenerator';
import { Footer } from './components/Footer';
import { ReportIssueModal } from './components/ReportIssueModal';
import { TicketTrackerModal } from './components/TicketTrackerModal';
import { Lock, X, KeyRound } from 'lucide-react';

const STORAGE_KEY_ISSUES = 'aamchi_khar_west_civic_issues_v3';
const STORAGE_KEY_VOTES = 'aamchi_khar_west_user_upvoted_ids_v3';

export default function App() {
  const [issues, setIssues] = useState<CivicIssue[]>(() => {
    try {
      localStorage.removeItem('aamchi_khar_west_civic_issues');
      localStorage.removeItem('aamchi_khar_west_civic_issues_v2');
      const saved = localStorage.getItem(STORAGE_KEY_ISSUES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return [...INITIAL_ISSUES];
  });

  const [activeLayer, setActiveLayer] = useState<1 | 2 | 3>(1);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [adminPinInput, setAdminPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);

  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VOTES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return new Set(parsed);
        }
      }
    } catch {
      // fallback
    }
    return new Set<string>();
  });

  const [selectedIssueId, setSelectedIssueId] = useState<string>(() => {
    return INITIAL_ISSUES[0]?.id || '';
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & Drawers state
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [opinionIssue, setOpinionIssue] = useState<CivicIssue | null>(null);
  const [isTicketTrackerOpen, setIsTicketTrackerOpen] = useState<boolean>(false);
  const [ticketTrackerQuery, setTicketTrackerQuery] = useState<string>('');

  // Persist issues
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ISSUES, JSON.stringify(issues));
    } catch (e) {
      console.error(e);
    }
  }, [issues]);

  // Persist upvotes
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_VOTES, JSON.stringify(Array.from(upvotedIds)));
    } catch (e) {
      console.error(e);
    }
  }, [upvotedIds]);

  const totalVotes = useMemo(() => issues.reduce((acc, issue) => acc + issue.votes, 0), [issues]);
  const activeHotspotsCount = useMemo(() => issues.filter(i => i.layer === 1).length, [issues]);
  const underWardActionCount = useMemo(() => issues.filter(i => i.layer === 2).length, [issues]);
  const resolvedCount = useMemo(() => issues.filter(i => i.layer === 3).length, [issues]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Toggle Admin Mode Handler
  const handleToggleAdminMode = () => {
    if (!isAdminMode) {
      setAdminPinInput('');
      setPinError(null);
      setIsAdminModalOpen(true);
    } else {
      setIsAdminMode(false);
      showToast('Admin Mode Deactivated.');
    }
  };

  // Authenticate Passcode securely
  const handleVerifyAdminPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPinInput === '1234' || adminPinInput === '400052') {
      setIsAdminMode(true);
      setIsAdminModalOpen(false);
      setAdminPinInput('');
      setPinError(null);
      showToast('🛡️ Admin Mode Authenticated!');
    } else {
      setPinError('Invalid Admin Passcode. Access Denied.');
    }
  };

  const handleDeleteIssue = (issueId: string) => {
    setIssues(prevIssues => {
      const target = prevIssues.find(i => i.id === issueId);
      const updated = prevIssues.filter(issue => issue.id !== issueId);
      showToast(`Removed "${target?.title || 'Reported Issue'}"`);
      return updated;
    });
  };

  const handleUpvote = (issueId: string) => {
    const isCurrentlyUpvoted = upvotedIds.has(issueId);

    setUpvotedIds(prev => {
      const next = new Set(prev);
      if (isCurrentlyUpvoted) {
        next.delete(issueId);
      } else {
        next.add(issueId);
      }
      return next;
    });

    setIssues(prevIssues => {
      let escalatedTitle: string | null = null;

      const updated = prevIssues.map(issue => {
        if (issue.id === issueId) {
          const delta = isCurrentlyUpvoted ? -1 : 1;
          const newVotes = Math.max(0, issue.votes + delta);

          if (issue.layer === 1 && newVotes >= 50) {
            escalatedTitle = issue.title;
            const randomTicketNumber = Math.floor(10000 + Math.random() * 90000);
            const ticketId = issue.mcgmTicketId || `HW/2026/${randomTicketNumber}`;

            return {
              ...issue,
              votes: newVotes,
              layer: 2 as const,
              mcgmTicketId: ticketId,
              workStage: 1 as WorkStage,
              bmcStatus: 'Registered with H/West Ward',
              assignedContractor: 'M/s Western Infra Projects (BMC Empanelled)',
              slaRemainingSeconds: 48 * 3600,
              slaHoursRemaining: 48,
              badge: 'Layer 2: Ward Action',
              badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
              lastUpdated: 'Escalated to Layer 2 (50+ Votes Reached)'
            };
          }

          return {
            ...issue,
            votes: newVotes,
            lastUpdated: 'Just now'
          };
        }
        return issue;
      });

      if (escalatedTitle) {
        showToast(`🔥 Auto-Escalated to Layer 2! "${escalatedTitle}" reached 50+ upvotes!`);
      } else {
        const target = prevIssues.find(i => i.id === issueId);
        if (isCurrentlyUpvoted) {
          showToast(`Vote removed for "${target?.title || 'Issue'}" (-1)`);
        } else {
          showToast(`+1 Upvote registered for "${target?.title || 'Issue'}"!`);
        }
      }

      return updated.sort((a, b) => {
        if (a.layer === b.layer) {
          return b.votes - a.votes;
        }
        return a.layer - b.layer;
      });
    });
  };

  const handleUpdateStage = (issueId: string, stage: WorkStage) => {
    setIssues(prevIssues => prevIssues.map(issue => {
      if (issue.id === issueId) {
        const stageInfo = WORK_STAGES.find(s => s.stage === stage);
        let newLayer = issue.layer;
        let newBmcStatus = stageInfo?.label || issue.bmcStatus;
        let resolvedAt = issue.resolvedAt;

        if (stage === 4) {
          newLayer = 3;
          newBmcStatus = 'Dual-Verified & Closed';
          resolvedAt = 'Just now (100% Citizen Verified)';
          showToast(`🎉 Fix Completed & Verified! "${issue.title}" moved to Layer 3!`);
        } else {
          showToast(`Advanced "${issue.title}" to Stage ${stage}: ${stageInfo?.label}`);
        }

        return {
          ...issue,
          workStage: stage,
          layer: newLayer,
          bmcStatus: newBmcStatus,
          resolvedAt,
          lastUpdated: `Stage ${stage} updated just now`
        };
      }
      return issue;
    }));
  };

  const handleConfirmGroundFix = (issueId: string, isFixed: boolean) => {
    setIssues(prevIssues => {
      return prevIssues.map(issue => {
        if (issue.id === issueId) {
          if (isFixed) {
            const nextConfirmations = (issue.citizenConfirmations || 0) + 1;
            showToast(`🎉 Dual-Verification Complete! "${issue.title}" moved to Layer 3!`);
            return {
              ...issue,
              citizenConfirmations: nextConfirmations,
              workStage: 4 as WorkStage,
              layer: 3,
              bmcStatus: 'Dual-Verified & Closed',
              resolvedAt: 'Just now by Citizen Ground Check',
              lastUpdated: 'Closed Just Now'
            };
          } else {
            const nextDisputes = (issue.citizenDisputes || 0) + 1;
            showToast(`Citizen dispute logged! Ticket flagged for BMC re-inspection.`);
            return {
              ...issue,
              citizenDisputes: nextDisputes
            };
          }
        }
        return issue;
      });
    });
  };

  const handleUploadAfterPhoto = (issueId: string, photoUrl: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        return {
          ...issue,
          afterPhotoUrl: photoUrl
        };
      }
      return issue;
    }));
    showToast('Citizen After Photo proof attached!');
  };

  const handlePromoteToWardAction = (issueId: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        return {
          ...issue,
          layer: 2,
          workStage: 1 as WorkStage,
          bmcStatus: 'Registered with H/West Ward',
          assignedContractor: 'M/s Western Infra Projects (BMC Empanelled)',
          slaRemainingSeconds: 50400,
          lastUpdated: 'Promoted to Ward Action Desk'
        };
      }
      return issue;
    }));
    setActiveLayer(2);
    showToast('Hotspot escalated to Layer 2: Under Ward Action!');
    const el = document.getElementById('lifecycle-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenTicketTracker = (query?: string) => {
    if (query !== undefined) {
      setTicketTrackerQuery(query);
    }
    setIsTicketTrackerOpen(true);
  };

  const handleCreateNewIssue = (data: NewIssueFormData) => {
    const randomTicketNumber = Math.floor(10000 + Math.random() * 90000);
    const newTicketId = `HW/2026/${randomTicketNumber}`;
    const newId = `spotfix-${Date.now()}`;

    let dept = 'H/West Ward Engineering Desk';
    let badgeColor = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    let badgeText = 'Community Reported';

    if (data.category === 'Road Damage') {
      dept = 'Executive Engineer (Roads & Maintenance)';
      badgeColor = 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      badgeText = 'Pothole Alert';
    } else if (data.category === 'Sanitation') {
      dept = 'Solid Waste Management (SWM)';
      badgeColor = 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      badgeText = 'Kachra Alert';
    } else if (data.category === 'Waterlogging') {
      dept = 'Storm Water Drains (SWD)';
      badgeColor = 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
      badgeText = 'Waterlogging Lafda';
    } else if (data.category === 'Streetlights') {
      dept = 'Mechanical & Electrical (M&E)';
      badgeColor = 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30';
      badgeText = 'Light Lagao';
    }

    const newIssue: CivicIssue = {
      id: newId,
      title: data.title.trim(),
      badge: badgeText,
      badgeColor,
      location: data.roadLocality,
      votes: 1,
      voteTarget: 100,
      urgency: 'High Urgency',
      mumbaiSlangQuote: data.mumbaiSlangQuote?.trim() || 'Boss, BMC ko bolo turant inspection kare!',
      department: dept,
      description: data.description.trim(),
      lastUpdated: 'Reported just now',
      resolutionStatus: 'Active community voting',
      mcgmTicketId: newTicketId,
      layer: 1,
      category: data.category,
      isCommunitySubmission: true,
      citizenConfirmations: 0,
      citizenDisputes: 0,
      opinions: [
        {
          id: `op-init-${Date.now()}`,
          author: 'Reporting Citizen',
          roadOrSociety: data.roadLocality,
          text: `Logged as a high-priority neighborhood issue. Needs urgent BMC attention.`,
          time: 'Just now',
          likes: 1
        }
      ]
    };

    setIssues(prev => [newIssue, ...prev]);
    setUpvotedIds(prev => new Set(prev).add(newId));
    setIsReportModalOpen(false);
    setActiveLayer(1);

    showToast(`"${newIssue.title}" reported with Ticket ${newTicketId}!`);

    setTimeout(() => {
      const el = document.getElementById('lifecycle-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const handleAddOpinion = (
    issueId: string, 
    opinionData: { author: string; roadOrSociety: string; text: string }
  ) => {
    const newOp: ResidentOpinion = {
      id: `op-${Date.now()}`,
      author: opinionData.author,
      roadOrSociety: opinionData.roadOrSociety,
      text: opinionData.text,
      time: 'Just now',
      likes: 1
    };

    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        return {
          ...issue,
          opinions: [newOp, ...issue.opinions]
        };
      }
      return issue;
    }));

    if (opinionIssue && opinionIssue.id === issueId) {
      setOpinionIssue(prev => prev ? {
        ...prev,
        opinions: [newOp, ...prev.opinions]
      } : null);
    }

    showToast('Your resident feedback has been posted!');
  };

  const handleLikeOpinion = (issueId: string, opinionId: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        return {
          ...issue,
          opinions: issue.opinions.map(op => op.id === opinionId ? { ...op, likes: op.likes + 1 } : op)
        };
      }
      return issue;
    }));

    if (opinionIssue && opinionIssue.id === issueId) {
      setOpinionIssue(prev => prev ? {
        ...prev,
        opinions: prev.opinions.map(op => op.id === opinionId ? { ...op, likes: op.likes + 1 } : op)
      } : null);
    }
  };

  const handleSelectForLetter = (issueId: string) => {
    setSelectedIssueId(issueId);
    const target = issues.find(i => i.id === issueId);
    showToast(`Loaded "${target?.title}" into Generator!`);
    const el = document.getElementById('generator-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-emerald-400 border border-emerald-500/50 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-bold backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navbar */}
      <Navbar
        totalVotes={totalVotes}
        activeLayer={activeLayer}
        isAdminMode={isAdminMode}
        onToggleAdminMode={handleToggleAdminMode}
        onSelectLayer={(layer) => {
          setActiveLayer(layer);
          scrollToSection('lifecycle-section');
        }}
        onNavigate={scrollToSection}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenTicketLookup={() => handleOpenTicketTracker()}
      />

      <main>
        <HeroSection
          totalVotes={totalVotes}
          activeHotspotsCount={activeHotspotsCount}
          underWardActionCount={underWardActionCount}
          resolvedCount={resolvedCount}
          onJumpToLifecycle={(layer) => {
            if (layer) setActiveLayer(layer);
            scrollToSection('lifecycle-section');
          }}
          onJumpToGenerator={() => scrollToSection('generator-section')}
          onOpenReportModal={() => setIsReportModalOpen(true)}
        />

        <CivicLifecycleDashboard
          issues={issues}
          activeLayer={activeLayer}
          isAdminMode={isAdminMode}
          onSelectLayer={setActiveLayer}
          upvotedIds={upvotedIds}
          onUpvote={handleUpvote}
          onDeleteIssue={handleDeleteIssue}
          onSelectForLetter={handleSelectForLetter}
          onOpenOpinionDrawer={(issue) => setOpinionIssue(issue)}
          onConfirmGroundFix={handleConfirmGroundFix}
          onUploadAfterPhoto={handleUploadAfterPhoto}
          onPromoteToWardAction={handlePromoteToWardAction}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          onUpdateStage={handleUpdateStage}
          onOpenTicketLookup={handleOpenTicketTracker}
        />

        <WardDirectory />

        <ComplaintGuide
          onScrollToGenerator={() => scrollToSection('generator-section')}
        />

        <LetterGenerator
          issues={issues}
          selectedIssueId={selectedIssueId}
          onSelectIssue={setSelectedIssueId}
        />
      </main>

      <Footer />

      {/* Secure Masked Admin Authentication Modal */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <KeyRound className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-black text-white mb-1">
              BMC Ward Admin Authentication
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Enter your administrative passcode to unlock issue deletion & moderation tools.
            </p>

            <form onSubmit={handleVerifyAdminPin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Admin Passcode
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={adminPinInput}
                    onChange={(e) => setAdminPinInput(e.target.value)}
                    placeholder="••••••••"
                    autoFocus
                    required
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-600 font-mono tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                  <Lock className="w-5 h-5 absolute right-3.5 top-3.5 text-slate-600" />
                </div>
              </div>

              {pinError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold">
                  {pinError}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all"
                >
                  Authenticate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Modal */}
      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleCreateNewIssue}
      />

      {/* Ticket Tracker Modal */}
      <TicketTrackerModal
        isOpen={isTicketTrackerOpen}
        onClose={() => setIsTicketTrackerOpen(false)}
        issues={issues}
        initialTicketQuery={ticketTrackerQuery}
        onSelectLayer={(layer) => {
          setActiveLayer(layer);
          scrollToSection('lifecycle-section');
        }}
        onUpdateStage={handleUpdateStage}
        onConfirmGroundFix={handleConfirmGroundFix}
        onOpenReportModal={() => {
          setIsTicketTrackerOpen(false);
          setIsReportModalOpen(true);
        }}
        onUploadAfterPhoto={handleUploadAfterPhoto}
      />

      {/* Resident Opinion Drawer */}
      <ResidentOpinionDrawer
        issue={opinionIssue}
        isOpen={opinionIssue !== null}
        onClose={() => setOpinionIssue(null)}
        onAddOpinion={handleAddOpinion}
        onLikeOpinion={handleLikeOpinion}
      />
    </div>
  );
}
