import { CivicIssue, WardOfficial, StepGuide, WorkStageInfo } from '../types';

export const INITIAL_ISSUES: CivicIssue[] = [];

export const WORK_STAGES: WorkStageInfo[] = [
  {
    stage: 1,
    label: 'Registered with H/West Ward',
    percent: 25,
    description: 'Complaint token logged into MCGM SAP/SAP-PGR system; docket routed to Ward Executive Desk.',
    slaWindow: 'Within 2-4 Hours'
  },
  {
    stage: 2,
    label: 'Site Inspected by Ward Engineer',
    percent: 50,
    description: 'Sub-Engineer completed on-site assessment; technical estimate, BOQ & work order generated.',
    slaWindow: 'Within 12-24 Hours'
  },
  {
    stage: 3,
    label: 'Contractor Deployed on Ground',
    percent: 75,
    description: 'Empanelled contractor machinery, materials, and ground crew deployed on location.',
    slaWindow: 'Within 24-48 Hours'
  },
  {
    stage: 4,
    label: 'Fix Completed & Citizen Verified',
    percent: 100,
    description: 'Repairs fully executed and verified on ground by Khar West residents with dual sign-off.',
    slaWindow: 'Closed & Archived'
  }
];

export const WARD_OFFICIALS: WardOfficial[] = [
  {
    id: 'amc',
    role: 'Assistant Municipal Commissioner (H/West)',
    title: 'Overall Ward Administrative Head',
    department: 'Executive Administration & Ward Command',
    jurisdiction: 'Khar West, Bandra West, Santacruz West',
    email: 'assistantcommissioner.hwest@mcgm.gov.in',
    phone: '022-26422311 / 022-26422315',
    location: '2nd Hasnabad Lane, Khar West, Mumbai - 400052',
    slangRole: 'Asli Ward Boss (Highest Escalation Desk)',
    badgeText: 'Executive Authority'
  },
  {
    id: 'ee-roads',
    role: 'Executive Engineer (Roads & Maintenance)',
    title: 'Pothole, Subway & Drainage Division',
    department: 'Roads, Storm Water Drains & Trenching',
    jurisdiction: 'H/West Ward Arterial & Internal Roads',
    email: 'ee.roads.hwest@mcgm.gov.in',
    phone: '022-26422311 (Ext. 204)',
    location: '2nd Hasnabad Lane, Khar West - 400052',
    slangRole: 'Rasta & Pothole Spot-Fixer',
    badgeText: 'Subway, Paver Blocks & Gutters'
  },
  {
    id: 'swm-overseer',
    role: 'SWM Overseer (Solid Waste Management)',
    title: 'Solid Waste & Street Hygiene Unit',
    department: 'Garbage Collection, Compactors & Sweeping',
    jurisdiction: 'All Khar West Sub-sectors (1st to 21st Road)',
    email: 'swm.hwest@mcgm.gov.in',
    phone: '022-26422311 (Ext. 312)',
    location: '2nd Hasnabad Lane, Khar West - 400052',
    slangRole: 'Kachra Mukt Mission Incharge',
    badgeText: 'Dumping Grounds & Daily Lifting'
  },
  {
    id: 'traffic-pi',
    role: 'Senior Traffic Inspector',
    title: 'Khar/Bandra Traffic Police Division',
    department: 'Mumbai Traffic Police (West Region)',
    jurisdiction: 'SV Road, Linking Road, Khar Subway & Lanes',
    email: 'traffic.khar@mahapolice.gov.in',
    phone: '022-26006444 / 8454999999',
    location: 'Khar Traffic Police Chowky, S.V. Road Junction',
    slangRole: 'Traffic Jam & No-Parking Warden',
    badgeText: 'Bottlenecks & Encroachments'
  },
  {
    id: 'disaster-helpline',
    role: 'Disaster Management Helpline',
    title: '24x7 Emergency Command Room',
    department: 'Brihanmumbai Municipal Corporation (BMC)',
    jurisdiction: 'Greater Mumbai & H/West Emergency Dispatch',
    email: 'disaster@mcgm.gov.in',
    phone: '1916 (Toll-Free 24x7)',
    location: 'BMC Disaster Control Room & H/West Ward',
    slangRole: 'Emergency Lifeline (24x7)',
    badgeText: 'Flooding, Tree Fall & Cave-ins'
  }
];

export const STEP_GUIDES: StepGuide[] = [
  {
    stepNumber: '01',
    title: 'Log on MyBMC 24x7 App',
    mumbaiSlang: 'Get Official Complaint ID - Pakka Proof!',
    badge: 'Step 1: Digital Registration',
    description: 'Download the official MyBMC smartphone application. Register your spot-fix complaint with GPS coordinates and photos to obtain an official MCGM Grievance Tracking Number.',
    actionLabel: 'Open MCGM Portal',
    actionUrl: 'https://portal.mcgm.gov.in',
    actionType: 'link',
    bulletPoints: [
      'Take 2 clear landscape photos with location timestamp enabled',
      'Select Ward: H/West (Khar / Bandra West)',
      'Save the 10-digit Grievance Ticket ID (e.g. HW/2026/XXXXX)'
    ],
    proTip: 'A Complaint Ticket ID is your legal RTI leverage. Without a ticket ID, verbal representations get lost in red tape!'
  },
  {
    stepNumber: '02',
    title: 'Dial 1916 Disaster Helpline',
    mumbaiSlang: 'Immediate Monsoon & Kachra Action!',
    badge: 'Step 2: Rapid Phone Escalation',
    description: 'For immediate waterlogging at Khar Subway, open manholes, fallen tree branches, or burning waste, dial 1916. Calls are officially recorded and routed straight to the H/West Ward Control Desk.',
    actionLabel: 'Call 1916 Helpline',
    actionUrl: 'tel:1916',
    actionType: 'phone',
    bulletPoints: [
      'Operates 24x7 across Marathi, Hindi, and English',
      'Quote exact Khar West crossroad (e.g. "Opposite Madhu Park, 15th Road")',
      'Ask the telephone operator for their dispatch log number'
    ],
    proTip: 'During monsoon cloudbursts, explicitly mention if emergency medical or school transit is blocked to trigger Priority 1 response.'
  },
  {
    stepNumber: '03',
    title: 'Email AMC with Built-In Generator',
    mumbaiSlang: 'Direct Legal Grievance to Ward Boss!',
    badge: 'Step 3: Executive Escalation',
    description: 'When routine complaints sit untouched for over 48 hours, escalate directly to the Assistant Municipal Commissioner of H/West using our tailored legal/civic draft generator below.',
    actionLabel: 'Launch Letter Generator',
    actionType: 'scroll',
    bulletPoints: [
      'Auto-addressed to assistantcommissioner.hwest@mcgm.gov.in',
      'Cites Citizen Charter turnaround deadlines & RTI precedents',
      'Pre-formatted with Khar landmarks, society name, and resident signature'
    ],
    proTip: 'CC your Advanced Locality Management (ALM) group or housing society committee for collective civic impact.'
  }
];

export const KHAR_ROADS = [
  '1st Road, Khar West',
  '3rd Road, near Khar Station',
  '5th Road, off S.V. Road',
  '11th Road, Khar West',
  '13th Road, near Hinduja Healthcare',
  '14th Road, Residential Belt',
  '15th Road, Madhu Park Area',
  '16th Road, Khar West',
  '17th Road, Khar West',
  '18th Road, Khar West',
  '21st Road, Khar Danda Link',
  'Khar Subway & Approach Road',
  'Linking Road (Near Khar Telephone Exchange)',
  'S.V. Road (Khar West stretch)',
  '2nd Hasnabad Lane (Ward Office)',
  'Dr. Ambedkar Road, Khar West',
  'Ahinsa Marg / Chitrakar Dhurandhar Marg'
];
