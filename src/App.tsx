import React, { useState, useMemo } from 'react';
import { INITIAL_ISSUES } from './data/civicData';
import { CivicIssue, NewIssueFormData, ResidentOpinion } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CivicLifecycleDashboard } from './components/CivicLifecycleDashboard';
import { ResidentOpinionDrawer } from './components/ResidentOpinionDrawer';
import { WardDirectory } from './components/WardDirectory';
import { ComplaintGuide } from './components/ComplaintGuide';
import { LetterGenerator } from './components/LetterGenerator';
import { Footer } from './components/Footer';
import { ReportIssueModal } from './components/ReportIssueModal';

export default function App() {
  const [issues, setIssues] = useState<CivicIssue[]>(() => {
    return [...INITIAL_ISSUES];
  });

  const [activeLayer, setActiveLayer] = useState<1 | 2 | 3>(1);
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(() => new Set());
  const [selectedIssueId, setSelectedIssueId] = useState<string>('khar-subway');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & Drawers state
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [opinionIssue, setOpinionIssue] = useState<CivicIssue | null>(null);

  // Live stats computation
  const totalVotes = useMemo(() => {
    return issues.reduce((acc, issue) => acc + issue.votes, 0);
  }, [issues]);

  const activeHotspotsCount = useMemo(() => {
    return issues.filter(i => i.layer === 1 || i.layer === 2).length;
  }, [issues]);

  const resolvedCount = useMemo(() => {
    return issues.filter(i => i.layer === 3).length;
  }, [issues]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Upvoting handler with dynamic re-sorting
  const handleUpvote = (issueId: string) => {
    setIssues(prevIssues => {
      const updated = prevIssues.map(issue => {
        if (issue.id === issueId) {
          const newVotes = issue.votes + 1;
          return {
            ...issue,
            votes: newVotes,
            lastUpdated: 'Just now'
          };
        }
        return issue;
      });

      // Sort Layer 1 issues dynamically by votes (highest first)
      return updated.sort((a, b) => {
        if (a.layer === b.layer) {
          return b.votes - a.votes;
        }
        return a.layer - b.layer;
      });
    });

    setUpvotedIds(prev => {
      const next = new Set(prev);
      next.add(issueId);
      return next;
    });

    const target = issues.find(i => i.id === issueId);
    showToast(`+1 Vote Registered for "${target?.title || 'Issue'}"! Progress bar updated.`);
  };

  // Dual Verification: Citizen Ground Check Track
  const handleConfirmGroundFix = (issueId: string, isFixed: boolean) => {
    setIssues(prevIssues => {
      return prevIssues.map(issue => {
        if (issue.id === issueId) {
          if (isFixed) {
            const nextConfirmations = issue.citizenConfirmations + 1;
            // When confirmations reach 10+ or user explicitly confirms, promote to Layer 3!
            if (nextConfirmations >= 10 || issue.citizenConfirmations >= 8) {
              showToast(`🎉 Dual-Verification Complete! "${issue.title}" transitioned to Layer 3: Hall of Fame!`);
              return {
                ...issue,
                citizenConfirmations: nextConfirmations,
                layer: 3,
                bmcStatus: 'Dual-Verified & Closed',
                resolvedAt: 'Just now by Citizen Ground Check',
                lastUpdated: 'Closed Just Now'
              };
            }
            showToast(`Ground fix confirmed! (${nextConfirmations} citizens verified)`);
            return {
              ...issue,
              citizenConfirmations: nextConfirmations
            };
          } else {
            const nextDisputes = issue.citizenDisputes + 1;
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

  // Upload after-photo ground proof
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
    showToast('Citizen After Photo proof attached to MCGM Ticket!');
  };

  // Promote Layer 1 Hotspot to Layer 2 Ward Action
  const handlePromoteToWardAction = (issueId: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        return {
          ...issue,
          layer: 2,
          bmcStatus: 'Contractor Deployed on Site',
          assignedContractor: 'M/s Western Infra Projects (BMC Empanelled)',
          slaRemainingSeconds: 50400,
          lastUpdated: 'Promoted to Ward Action Desk'
        };
      }
      return issue;
    }));
    setActiveLayer(2);
    showToast('Hotspot escalated to Layer 2: Under Ward Action with active SLA clock!');
    const el = document.getElementById('lifecycle-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Create new issue via Report Spot-Fix Modal
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
      votes: 1, // starting at 1 vote as requested
      voteTarget: 100,
      urgency: 'High Urgency',
      mumbaiSlangQuote: data.mumbaiSlangQuote?.trim() || 'Boss, BMC ko bolo turant inspection kare, public pareshan hai!',
      department: dept,
      description: data.description.trim(),
      lastUpdated: 'Reported just now',
      resolutionStatus: 'Active community voting towards 100 votes',
      mcgmTicketId: newTicketId,
      layer: 1, // creates card in Layer 1 as requested
      category: data.category,
      isCommunitySubmission: true,
      citizenConfirmations: 0,
      citizenDisputes: 0,
      opinions: [
        {
          id: `op-init-${Date.now()}`,
          author: 'Reporting Citizen',
          roadOrSociety: data.roadLocality,
          text: `Logged as a high-priority neighborhood issue. Needs urgent attention from BMC H/West Ward.`,
          time: 'Just now',
          likes: 1
        }
      ]
    };

    setIssues(prev => [newIssue, ...prev]);
    setUpvotedIds(prev => new Set(prev).add(newId));
    setIsReportModalOpen(false);
    setActiveLayer(1);

    showToast(`"${newIssue.title}" reported with Ticket ${newTicketId}! Added to Layer 1 Hotspots.`);

    setTimeout(() => {
      const el = document.getElementById('lifecycle-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  // Add resident opinion feedback
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

    // Update the currently open drawer issue reference
    if (opinionIssue && opinionIssue.id === issueId) {
      setOpinionIssue(prev => prev ? {
        ...prev,
        opinions: [newOp, ...prev.opinions]
      } : null);
    }

    showToast('Your resident feedback has been posted to the Community Feed!');
  };

  const handleLikeOpinion = (issueId: string, opinionId: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        return {
          ...issue,
          opinions: issue.opinions.map(op => {
            if (op.id === opinionId) {
              return { ...op, likes: op.likes + 1 };
            }
            return op;
          })
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
    showToast(`Loaded "${target?.title}" into Complaint Generator!`);
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
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-emerald-400 border border-emerald-500/50 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-bold animate-slide-up backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navbar */}
      <Navbar
        totalVotes={totalVotes}
        activeLayer={activeLayer}
        onSelectLayer={(layer) => {
          setActiveLayer(layer);
          scrollToSection('lifecycle-section');
        }}
        onNavigate={scrollToSection}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      <main>
        {/* Section 2: Header, Hero & Student Attribution */}
        <HeroSection
          totalVotes={totalVotes}
          activeHotspotsCount={activeHotspotsCount}
          resolvedCount={resolvedCount}
          onJumpToLifecycle={(layer) => {
            if (layer) setActiveLayer(layer);
            scrollToSection('lifecycle-section');
          }}
          onJumpToGenerator={() => scrollToSection('generator-section')}
          onOpenReportModal={() => setIsReportModalOpen(true)}
        />

        {/* Section 3: 3-Layer Civic Lifecycle & Dual Verification Engine */}
        <CivicLifecycleDashboard
          issues={issues}
          activeLayer={activeLayer}
          onSelectLayer={setActiveLayer}
          upvotedIds={upvotedIds}
          onUpvote={handleUpvote}
          onSelectForLetter={handleSelectForLetter}
          onOpenOpinionDrawer={(issue) => setOpinionIssue(issue)}
          onConfirmGroundFix={handleConfirmGroundFix}
          onUploadAfterPhoto={handleUploadAfterPhoto}
          onPromoteToWardAction={handlePromoteToWardAction}
          onOpenReportModal={() => setIsReportModalOpen(true)}
        />

        {/* Section 6: Official Ward Directory ("Whom to Approach") */}
        <WardDirectory />

        {/* Section 6: Playbook ("Complaint Like a Pro") */}
        <ComplaintGuide
          onScrollToGenerator={() => scrollToSection('generator-section')}
        />

        {/* Section 5: On-Demand Complaint Letter Generator */}
        <LetterGenerator
          issues={issues}
          selectedIssueId={selectedIssueId}
          onSelectIssue={setSelectedIssueId}
        />
      </main>

      {/* Section 7: Footer Credits with Student Attribution */}
      <Footer />

      {/* Section 4: User Problem Submission Modal */}
      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleCreateNewIssue}
      />

      {/* Resident Opinion Side Drawer */}
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
