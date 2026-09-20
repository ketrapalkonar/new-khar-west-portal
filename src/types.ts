export type UrgencyLevel = 'Critical Lafda' | 'High Urgency' | 'Moderate';

export type IssueCategory = 
  | 'Sanitation' 
  | 'Road Damage' 
  | 'Waterlogging' 
  | 'Noise' 
  | 'Streetlights' 
  | 'Encroachment'
  | 'Other';

export interface ResidentOpinion {
  id: string;
  author: string;
  roadOrSociety: string;
  text: string;
  time: string;
  likes: number;
}

export type WorkStage = 1 | 2 | 3 | 4;

export interface WorkStageInfo {
  stage: WorkStage;
  label: string;
  percent: number;
  description: string;
  slaWindow: string;
}

export interface CivicIssue {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  location: string;
  votes: number;
  voteTarget: number;
  targetVotes?: number;
  urgency?: UrgencyLevel;
  mumbaiSlangQuote?: string;
  department: string;
  description: string;
  lastUpdated?: string;
  resolutionStatus?: string;
  mcgmTicketId?: string;
  layer: 1 | 2 | 3;
  category: IssueCategory | string;
  isCommunitySubmission?: boolean;
  groundVerified?: boolean;
  slaHoursRemaining?: number;

  // Dual Verification Engine fields
  bmcStatus?: string;
  assignedContractor?: string;
  assignedEngineer?: string;
  slaRemainingSeconds?: number;
  citizenConfirmations: number;
  citizenDisputes: number;
  afterPhotoUrl?: string;
  resolvedAt?: string;
  opinions: ResidentOpinion[];

  // Live Work Progress Visualizer fields (Stage 1 to 4)
  workStage?: WorkStage;
  workStageNotes?: string;
}

export interface WardOfficial {
  id: string;
  role: string;
  title: string;
  department: string;
  jurisdiction: string;
  email: string;
  phone: string;
  location: string;
  slangRole: string;
  badgeText: string;
}

export interface StepGuide {
  stepNumber: string;
  title: string;
  mumbaiSlang: string;
  badge: string;
  description: string;
  actionLabel: string;
  actionUrl?: string;
  actionType: 'link' | 'phone' | 'scroll';
  bulletPoints: string[];
  proTip: string;
}

export interface ComplaintFormData {
  issueType: string;
  customIssueTitle: string;
  residentName: string;
  roadLocality: string;
  landmark: string;
  contactNumber: string;
  societyName: string;
  urgency: string;
}

export interface NewIssueFormData {
  title: string;
  roadLocality: string;
  category: IssueCategory;
  description: string;
  mumbaiSlangQuote?: string;
}

export const INITIAL_ISSUES: CivicIssue[] = [
  {
    id: 'khar-subway',
    title: 'Khar Subway Waterlogging',
    location: 'Khar Subway',
    votes: 12,
    targetVotes: 100,
    voteTarget: 100,
    urgency: 'Critical Lafda',
    category: 'Waterlogging',
    description: 'Severe rainwater logging during peak monsoon causing major traffic gridlock on S.V. Road.',
    layer: 1,
    department: 'Storm Water Drains (SWD)',
    badge: 'Critical Monsoon Hotspot',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    mumbaiSlangQuote: 'Subway ya swimming pool? Har baar paani bhar jaata hai boss!',
    lastUpdated: 'Reported recently',
    resolutionStatus: 'Voting Open in Ward',
    citizenConfirmations: 0,
    citizenDisputes: 0,
    opinions: []
  },
  {
    id: 'madhu-park-garbage',
    title: 'Garbage Dumping near Madhu Park',
    location: '15th Road',
    votes: 8,
    targetVotes: 100,
    voteTarget: 100,
    urgency: 'High Urgency',
    category: 'Sanitation',
    description: 'Persistent open trash accumulation opposite Madhu Park perimeter walkway.',
    layer: 1,
    department: 'Solid Waste Management (SWM)',
    badge: 'Sanitation Alert',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    mumbaiSlangQuote: 'Park ke saamne kachra daal ke rakha hai, Morning walk mushkil ho gaya!',
    lastUpdated: 'Reported recently',
    resolutionStatus: 'Voting Open in Ward',
    citizenConfirmations: 0,
    citizenDisputes: 0,
    opinions: []
  },
  {
    id: 'linking-road-footpath',
    title: 'Footpath Encroachment & Hawker Obstruction',
    location: 'Linking Road',
    votes: 52,
    targetVotes: 100,
    voteTarget: 100,
    urgency: 'High Urgency',
    category: 'Encroachment',
    description: 'Pedestrian pathway completely blocked forcing residents to walk on active vehicle lanes.',
    layer: 2,
    mcgmTicketId: 'HW/2026/04812',
    slaHoursRemaining: 18,
    slaRemainingSeconds: 18 * 3600,
    department: 'Removal of Encroachment (RE)',
    badge: 'Layer 2: Ward Action',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    mumbaiSlangQuote: 'Footpath pe chalne ko jagah nahi bachi, road pe gaadiyon ke beech chalna padta hai!',
    lastUpdated: 'Escalated to Ward Action',
    resolutionStatus: 'Contractor Deployed on Site',
    assignedContractor: 'M/s Western Infra Projects (BMC Empanelled)',
    assignedEngineer: 'Er. R. K. Sawant (Sub-Eng Maintenance)',
    workStage: 3,
    citizenConfirmations: 4,
    citizenDisputes: 1,
    opinions: []
  },
  {
    id: '18th-road-lights',
    title: 'Broken Streetlights & Dark Spots Restored',
    location: '18th Road',
    votes: 100,
    targetVotes: 100,
    voteTarget: 100,
    urgency: 'Moderate',
    category: 'Streetlights',
    description: 'Functional LED fixtures replaced along the entire stretch from SV Road junction.',
    layer: 3,
    mcgmTicketId: 'HW/2026/02109',
    department: 'Electrical Department',
    badge: 'Dual-Verified Resolved',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    groundVerified: true,
    mumbaiSlangQuote: 'Ekdum chakachak lights lag gaya boss, ab raat ko safe lagta hai!',
    lastUpdated: 'Verified Closed by Residents',
    resolvedAt: 'Yesterday (Citizen Ground Checked)',
    resolutionStatus: 'Dual-Verified & Closed',
    citizenConfirmations: 24,
    citizenDisputes: 0,
    opinions: []
  }
];
