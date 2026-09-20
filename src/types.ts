export interface CivicIssue {
  id: string;
  title: string;
  location: string;
  votes: number;
  targetVotes: number;
  category: string;
  description: string;
  layer: 1 | 2 | 3;
  mcgmTicketId?: string;
  slaHoursRemaining?: number;
  department?: string;
  badge: string;
  badgeColor: string;
  groundVerified?: boolean;
}

export const INITIAL_ISSUES: CivicIssue[] = [
  {
    id: 'khar-subway',
    title: 'Khar Subway Waterlogging',
    location: 'Khar Subway',
    votes: 12, // Low starting baseline
    targetVotes: 100,
    category: 'Waterlogging',
    description: 'Severe rainwater logging during peak monsoon causing major traffic gridlock on S.V. Road.',
    layer: 1,
    department: 'Storm Water Drains (SWD)',
    badge: 'Critical Monsoon Hotspot',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
  },
  {
    id: 'madhu-park-garbage',
    title: 'Garbage Dumping near Madhu Park',
    location: '15th Road',
    votes: 8, // Low starting baseline
    targetVotes: 100,
    category: 'Sanitation',
    description: 'Persistent open trash accumulation opposite Madhu Park perimeter walkway.',
    layer: 1,
    department: 'Solid Waste Management (SWM)',
    badge: 'Sanitation Alert',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
  },
  {
    id: 'linking-road-footpath',
    title: 'Footpath Encroachment & Hawker Obstruction',
    location: 'Linking Road',
    votes: 52, // Over 50 -> Moves to Layer 2
    targetVotes: 100,
    category: 'Encroachment',
    description: 'Pedestrian pathway completely blocked forcing residents to walk on active vehicle lanes.',
    layer: 2,
    mcgmTicketId: 'HW/2026/04812',
    slaHoursRemaining: 18,
    department: 'Removal of Encroachment (RE)',
    badge: 'Layer 2: Ward Action',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40'
  },
  {
    id: '18th-road-lights',
    title: 'Broken Streetlights & Dark Spots Restored',
    location: '18th Road',
    votes: 100,
    targetVotes: 100,
    category: 'Streetlights',
    description: 'Functional LED fixtures replaced along the entire stretch from SV Road junction.',
    layer: 3,
    mcgmTicketId: 'HW/2026/02109',
    department: 'Electrical Department',
    badge: 'Dual-Verified Resolved',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    groundVerified: true
  }
];
