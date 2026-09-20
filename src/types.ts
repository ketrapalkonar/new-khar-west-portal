export type UrgencyLevel = 'Critical Lafda' | 'High Urgency' | 'Moderate';

export type IssueCategory = 
  | 'Sanitation' 
  | 'Road Damage' 
  | 'Waterlogging' 
  | 'Noise' 
  | 'Streetlights' 
  | 'Other';

export interface ResidentOpinion {
  id: string;
  author: string;
  roadOrSociety: string;
  text: string;
  time: string;
  likes: number;
}

export interface CivicIssue {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  location: string;
  votes: number;
  voteTarget: number;
  urgency: UrgencyLevel;
  mumbaiSlangQuote: string;
  department: string;
  description: string;
  lastUpdated: string;
  resolutionStatus: string;
  mcgmTicketId: string;
  layer: 1 | 2 | 3; // 1: Active Hotspots, 2: Under Ward Action, 3: Resolved Hall of Fame
  category: IssueCategory;
  isCommunitySubmission?: boolean;
  
  // Dual Verification Engine fields
  bmcStatus?: string;
  assignedContractor?: string;
  slaRemainingSeconds?: number;
  citizenConfirmations: number;
  citizenDisputes: number;
  afterPhotoUrl?: string;
  resolvedAt?: string;
  opinions: ResidentOpinion[];
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
