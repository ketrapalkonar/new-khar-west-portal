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

export const INITIAL_ISSUES: CivicIssue[] = [];
