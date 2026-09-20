import { CivicIssue, WardOfficial, StepGuide } from '../types';

export const INITIAL_ISSUES: CivicIssue[] = [
  // ==========================================
  // LAYER 1: ACTIVE COMMUNITY HOTSPOTS
  // ==========================================
  {
    id: 'khar-subway',
    title: 'Khar Subway Monsoon Waterlogging',
    badge: 'Monsoon Special Lafda',
    badgeColor: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    location: 'Khar Subway & S.V. Road Junction',
    votes: 88,
    voteTarget: 100,
    urgency: 'Critical Lafda',
    mumbaiSlangQuote: 'Ek jhatke mein swimming pool bann jata hai boss! Rickshaws stuck, entire S.V. Road choked!',
    department: 'Storm Water Drains (SWD) & Roads',
    description: 'Severe rainwater flooding during monsoon downpours turns the low-lying subway impassable. Inadequate dewatering pumps trigger 3+ hour gridlock cutting Khar West from Western Express Highway.',
    lastUpdated: 'Updated 15 mins ago',
    resolutionStatus: 'Needs 12 more upvotes for Priority Ward Escalation',
    mcgmTicketId: 'HW/2026/04812',
    layer: 1,
    category: 'Waterlogging',
    citizenConfirmations: 0,
    citizenDisputes: 0,
    opinions: [
      {
        id: 'op-1',
        author: 'Ramesh Kulkarni',
        roadOrSociety: 'S.V. Road Merchant',
        text: 'Every monsoon our shop shutters get flooded because the culvert under the railway line is choked with debris. Dewatering pump capacity must be doubled immediately!',
        time: '25 mins ago',
        likes: 19
      },
      {
        id: 'op-2',
        author: 'Pooja Varma',
        roadOrSociety: '14th Road Resident',
        text: 'Waterlogging stalls S.V. Road traffic every morning. Autos refuse fares, commuters miss flights and trains. This subway is Khar West’s biggest lifeline and biggest headache.',
        time: '1 hour ago',
        likes: 14
      },
      {
        id: 'op-3',
        author: 'Farhan Merchant',
        roadOrSociety: 'Khar Subway Motorist',
        text: 'Electronic water-depth signage and auto-barricading sensors needed so motorists don’t drive into 4-feet deep water blindly!',
        time: '3 hours ago',
        likes: 8
      }
    ]
  },
  {
    id: 'garbage-madhu-park',
    title: 'Garbage Dumping near Madhu Park',
    badge: 'Kachra Alert',
    badgeColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    location: '15th Road, Madhu Park Perimeter',
    votes: 76,
    voteTarget: 100,
    urgency: 'Critical Lafda',
    mumbaiSlangQuote: 'Kachra Free Zone banana tha, yaha dumping ground bana diya! Need daily compactor round.',
    department: 'Solid Waste Management (SWM)',
    description: 'Chronic open garbage dumping and overflowing municipal bins opposite Madhu Park children’s playground. Attracts stray animals, flies, and poses severe dengue & malaria risk for morning joggers and elderly residents.',
    lastUpdated: 'Updated 45 mins ago',
    resolutionStatus: 'Active community voting in progress',
    mcgmTicketId: 'HW/2026/03941',
    layer: 1,
    category: 'Sanitation',
    citizenConfirmations: 0,
    citizenDisputes: 0,
    opinions: [
      {
        id: 'op-4',
        author: 'Devika Singhania',
        roadOrSociety: '15th Road ALM Volunteer',
        text: 'We take morning walks at Madhu Park and the stench is nauseating. Commercial kitchens from 14th road restaurants are illegally dumping black garbage sacks after midnight!',
        time: '30 mins ago',
        likes: 22
      },
      {
        id: 'op-5',
        author: 'Anil Parekh',
        roadOrSociety: 'Silver Park CHS',
        text: 'BMC compactor needs a fixed twice-daily schedule at 6:30 AM and 7:30 PM, plus CCTV fine cameras.',
        time: '2 hours ago',
        likes: 11
      }
    ]
  },
  {
    id: 'footpath-linking-road',
    title: 'Footpath Encroachment on Linking Road',
    badge: 'Where to Walk?',
    badgeColor: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    location: 'Linking Road (Khar Telephone Exch stretch)',
    votes: 62,
    voteTarget: 100,
    urgency: 'High Urgency',
    mumbaiSlangQuote: 'Pedestrians walking on main road between speeding BEST buses! Footpath pe dukaan, road pe public!',
    department: 'Encroachment & License Department',
    description: 'Unauthorized commercial stall extensions, flex boards, and parked two-wheelers taking over 80% of paved footpaths from 14th Road junction to Telephone Exchange.',
    lastUpdated: 'Updated 2 hours ago',
    resolutionStatus: 'Gaining traction towards 100 community votes',
    mcgmTicketId: 'HW/2026/05129',
    layer: 1,
    category: 'Road Damage',
    citizenConfirmations: 0,
    citizenDisputes: 0,
    opinions: [
      {
        id: 'op-6',
        author: 'Sunita Mehra',
        roadOrSociety: 'Senior Citizen Forum',
        text: 'Senior citizens cannot walk safely without tripping over parked delivery bikes and illegal shop display racks on Linking Road.',
        time: '1 hour ago',
        likes: 15
      }
    ]
  },
  {
    id: 'pub-noise-residential',
    title: 'Late Night Pub Noise in Residential Lanes',
    badge: 'Shanti Chahiye',
    badgeColor: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    location: '14th to 18th Roads Residential Belt',
    votes: 48,
    voteTarget: 100,
    urgency: 'High Urgency',
    mumbaiSlangQuote: 'Raat ko 2 baje tak heavy bass vibrations! Senior citizens and school kids can’t sleep. No more jhol!',
    department: 'Health/License Dept & Khar Police',
    description: 'Rooftop lounges and resto-pubs playing high-decibel music with open-air terrace speakers beyond official 10:00 PM quiet zone deadlines, plus valet cars double-parking across residential gates.',
    lastUpdated: 'Updated 4 hours ago',
    resolutionStatus: 'Community Gathering Opinions',
    mcgmTicketId: 'HW/2026/06283',
    layer: 1,
    category: 'Noise',
    citizenConfirmations: 0,
    citizenDisputes: 0,
    opinions: [
      {
        id: 'op-7',
        author: 'Cyrus Batliwala',
        roadOrSociety: '17th Road Resident',
        text: '10 PM decibel rules are openly flaunted on weekends. We need H/West Ward health officer surprise inspections with sound decibel meters.',
        time: '3 hours ago',
        likes: 18
      }
    ]
  },

  // ==========================================
  // LAYER 2: UNDER WARD ACTION (LIVE BMC + DUAL VERIFICATION)
  // ==========================================
  {
    id: 'manhole-14th-road',
    title: '14th Road Open Manhole & Caved Paver Blocks',
    badge: 'BMC SLA Countdown Active',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    location: '14th Road, Opp. Silver Cascade CHS',
    votes: 114,
    voteTarget: 100,
    urgency: 'Critical Lafda',
    mumbaiSlangQuote: 'Contractor bhai log aagaye hain! Paver blocks ka jhol bandh, pakka concrete chahiye!',
    department: 'Executive Engineer (Roads & Maintenance)',
    description: 'Deep cave-in around heavy storm manhole frame causing dangerous 2-wheeler skids. Promoted to Ward Action track after crossing 100 citizen votes.',
    lastUpdated: 'Site inspected 2 hours ago',
    resolutionStatus: 'Work in Progress: Mastic asphalt recasting',
    mcgmTicketId: 'HW/2026/02194',
    layer: 2,
    category: 'Road Damage',
    bmcStatus: 'Contractor Deployed on Site',
    assignedContractor: 'M/s Western Infra Projects (BMC Empanelled)',
    slaRemainingSeconds: 48600, // ~13.5 hours remaining on SLA clock
    citizenConfirmations: 9,
    citizenDisputes: 1,
    opinions: [
      {
        id: 'op-8',
        author: 'Capt. Vivian D’Souza',
        roadOrSociety: 'Silver Cascade CHS',
        text: 'Saw the BMC engineer marking the perimeter with red cones at 9:00 AM today. Good to see this portal pushed them into motion!',
        time: '2 hours ago',
        likes: 16
      }
    ]
  },
  {
    id: 'station-approach-lights',
    title: 'Khar Station West Dark Spots / Broken Poles',
    badge: 'Dual Verification Track',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    location: 'Khar Station West Approach Lane',
    votes: 96,
    voteTarget: 100,
    urgency: 'Moderate',
    mumbaiSlangQuote: 'Station road after 9 PM feels like Gotham City! Women safety risk. Jaldi tube lagao!',
    department: 'Mechanical & Electrical (M&E) Division',
    description: 'Cabling rupture between poles #14 and #19 on railway colony wall lane. BMC M&E team assigned replacement of 5 LED fixtures.',
    lastUpdated: 'Crew on site 30 mins ago',
    resolutionStatus: 'Contractor deployed for overhead line rewiring',
    mcgmTicketId: 'HW/2026/01872',
    layer: 2,
    category: 'Streetlights',
    bmcStatus: 'LED Luminaire Replacement Scheduled',
    assignedContractor: 'BMC M&E Squad & Adani Utility Liaison',
    slaRemainingSeconds: 25200, // ~7 hours left on SLA
    citizenConfirmations: 7,
    citizenDisputes: 2,
    opinions: [
      {
        id: 'op-9',
        author: 'Kunal Merchant',
        roadOrSociety: 'Daily Train Commuter',
        text: 'New fixtures have arrived in the utility truck near the station auto stand. Let’s verify tonight if all 5 are lit up.',
        time: '45 mins ago',
        likes: 12
      }
    ]
  },

  // ==========================================
  // LAYER 3: RESOLVED & VERIFIED HALL OF FAME
  // ==========================================
  {
    id: 'resolved-18th-road-lights',
    title: '18th Road Streetlights Complete Overhaul',
    badge: 'Dual-Verified: BMC Closed + Citizen Confirmed',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
    location: '18th Road, Khar West',
    votes: 148,
    voteTarget: 100,
    urgency: 'Moderate',
    mumbaiSlangQuote: 'Full chaka-chak lighting abhi! No more dark corner tension for late night ladies.',
    department: 'Mechanical & Electrical (M&E)',
    description: 'All 6 high-output LED streetlight fixtures rewired and tree foliage obstructing dispersion trimmed. Lux test verified on ground by resident ALM members.',
    lastUpdated: 'Closed Yesterday',
    resolutionStatus: 'Fully Resolved & Citizen Verified',
    mcgmTicketId: 'HW/2026/00914',
    layer: 3,
    category: 'Streetlights',
    bmcStatus: 'Dual-Verified & Closed',
    assignedContractor: 'M&E Dept Sub-Division III',
    citizenConfirmations: 34,
    citizenDisputes: 0,
    resolvedAt: 'Yesterday at 6:45 PM',
    afterPhotoUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    opinions: [
      {
        id: 'op-10',
        author: 'Dr. Neha Shenoy',
        roadOrSociety: '18th Road Resident',
        text: 'Verified on ground! All 6 LED streetlights are glowing bright. Tremendous relief for residents walking back from station after 10 PM.',
        time: 'Yesterday',
        likes: 29
      }
    ]
  },
  {
    id: 'resolved-14th-road-gutter',
    title: '14th Road Nullah Silt Removal & Desilting',
    badge: 'Dual-Verified: BMC Closed + Citizen Confirmed',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
    location: '14th Road Culvert Junction',
    votes: 182,
    voteTarget: 100,
    urgency: 'Critical Lafda',
    mumbaiSlangQuote: 'Pura kachra nikaal diya! Paani smoothly bahega iss monsoon.',
    department: 'Storm Water Drains (SWD)',
    description: 'Super-sucker suction machine and dumper team cleared 12 metric tonnes of silt, plastic bottles, and construction debris blocking underground drainage passage.',
    lastUpdated: 'Closed 3 days ago',
    resolutionStatus: 'Fully Resolved & Citizen Verified',
    mcgmTicketId: 'HW/2026/00431',
    layer: 3,
    category: 'Waterlogging',
    bmcStatus: 'Dual-Verified & Closed',
    assignedContractor: 'SWD Monsoon Desilting Unit',
    citizenConfirmations: 42,
    citizenDisputes: 1,
    resolvedAt: '3 days ago',
    afterPhotoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=600&q=80',
    opinions: [
      {
        id: 'op-11',
        author: 'Rishi Agarwal',
        roadOrSociety: 'Citizen Environmentalist',
        text: 'Inspected with the junior engineer. Culvert intake is completely free of plastic and the mesh barrier is bolted in place.',
        time: '2 days ago',
        likes: 31
      }
    ]
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
