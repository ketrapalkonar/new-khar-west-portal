import { ComplaintFormData } from '../types';

export interface GeneratedEmailDraft {
  toEmail: string;
  ccEmail: string;
  subject: string;
  body: string;
  previewSummary: string;
}

export function generateComplaintEmail(data: ComplaintFormData): GeneratedEmailDraft {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const residentName = data.residentName.trim() || '[Resident / Concerned Citizen Name]';
  const roadLocality = data.roadLocality.trim() || '14th Road, Khar West';
  const society = data.societyName.trim() ? `, ${data.societyName.trim()}` : '';
  const landmark = data.landmark.trim() ? ` (Near / Landmark: ${data.landmark.trim()})` : '';
  const contact = data.contactNumber.trim() ? `\nContact Phone: ${data.contactNumber.trim()}` : '';
  
  let issueTitle = 'Civic Infrastructure Deficiency';
  let issueCategory = 'General Ward Maintenance';
  let specificDemands = '';
  let ccDepartment = 'ee.roads.hwest@mcgm.gov.in, swm.hwest@mcgm.gov.in';

  switch (data.issueType) {
    case 'khar-subway':
      issueTitle = 'Chronic Monsoon Waterlogging & Submerged Traffic Transit at Khar Subway';
      issueCategory = 'Storm Water Drains (SWD) & Road Safety';
      ccDepartment = 'ee.roads.hwest@mcgm.gov.in, disaster@mcgm.gov.in, traffic.khar@mahapolice.gov.in';
      specificDemands = 
`- Immediate deployment of high-capacity dewatering pumps with standby diesel generators at Khar Subway.
- Desilting and thorough unclogging of culverts and connecting drainage pipelines leading towards the nullah.
- Coordination with Mumbai Traffic Police for real-time barricading and electronic alert signage during heavy showers.`;
      break;

    case 'garbage-madhu-park':
      issueTitle = 'Uncontrolled Open Garbage Dumping and Overflowing Bins near Madhu Park (15th Road)';
      issueCategory = 'Solid Waste Management (SWM) & Public Health';
      ccDepartment = 'swm.hwest@mcgm.gov.in, moh.hwest@mcgm.gov.in';
      specificDemands = 
`- Immediate clearing and pressure sanitization / bleaching powder treatment of the dumping stretch along 15th Road.
- Scheduling a dedicated twice-daily SWM compactor vehicle run during early morning (6:30 AM) and evening (7:00 PM).
- Installation of CCTV surveillance / prominent 'Kachra Free Zone' penalty warning signboards under BMC bylaws.`;
      break;

    case 'footpath-linking-road':
      issueTitle = 'Unlawful Commercial Encroachments & Complete Obstruction of Pedestrian Footpaths on Linking Road';
      issueCategory = 'Encroachment Removal & Pedestrian Safety';
      ccDepartment = 'license.hwest@mcgm.gov.in, traffic.khar@mahapolice.gov.in';
      specificDemands = 
`- Swift inspection and removal of unauthorized hawker extensions, flex banners, and shop display setups occupying the footpath.
- Installation of pedestrian bollards to prohibit two-wheeler parking on paved footpaths.
- Ensuring safe, barrier-free walking space for elderly citizens, school students, and patrons.`;
      break;

    case 'pub-noise-residential':
      issueTitle = 'Severe Noise Pollution & Midnight Residential Disturbance by Resto-Pubs / Lounges';
      issueCategory = 'Public Health, Noise Pollution Regulation & Police Coordination';
      ccDepartment = 'moh.hwest@mcgm.gov.in, traffic.khar@mahapolice.gov.in';
      specificDemands = 
`- Strict enforcement of Noise Pollution (Regulation and Control) Rules and ambient decibel caps (55 dB daytime / 45 dB night).
- Verification of rooftop soundproofing and outdoor terrace speaker permits under BMC Health/Shops & Establishments license.
- Regular nocturnal patrolling by H/West Ward vigilance squad and Khar Police to curtail valet double-parking chaos.`;
      break;

    case 'broken-streetlights-station':
      issueTitle = 'Defunct Streetlights & Hazardous Dark Spots on Khar Station West Approach Road';
      issueCategory = 'Mechanical & Electrical (M&E) Infrastructure';
      ccDepartment = 'me.hwest@mcgm.gov.in, traffic.khar@mahapolice.gov.in';
      specificDemands = 
`- Urgent replacement / repair of defunct sodium and LED streetlight fixtures along the railway boundary approach road.
- Trimming of overgrown tree foliage obstructing luminary dispersion on pedestrian paths.
- Restoration of illuminated surroundings to safeguard female commuters, seniors, and daily late-night suburban train travelers.`;
      break;

    default:
      issueTitle = data.customIssueTitle.trim() || 'Urgent Civic Maintenance and Public Safety Issue';
      issueCategory = 'General Ward Civic Grievance';
      ccDepartment = 'ee.roads.hwest@mcgm.gov.in, swm.hwest@mcgm.gov.in';
      specificDemands = 
`- Immediate on-site civic inspection by the designated Junior Engineer / Overseer of H/West Ward.
- Prompt corrective repair work in accordance with the MCGM Citizen's Charter standards.
- Issuance of an official Grievance Complaint ID and tracking update to the resident.`;
      break;
  }

  const subject = `[URGENT CIVIC GRIEVANCE - H/WEST WARD] ${issueTitle} at ${roadLocality}`;

  const body = `To:
The Assistant Municipal Commissioner,
Brihanmumbai Municipal Corporation (BMC) - H/West Ward,
H/West Ward Office Building, 2nd Hasnabad Lane,
Khar (West), Mumbai - 400 052.
Email: assistantcommissioner.hwest@mcgm.gov.in

Date: ${currentDate}

SUBJECT: URGENT CITIZEN GRIEVANCE - ${issueTitle.toUpperCase()} AT ${roadLocality.toUpperCase()}, KHAR WEST (H/WEST WARD)

Respected Assistant Municipal Commissioner,

I am writing to you as a conscientious resident of Khar West (${roadLocality}${society}${landmark}), to bring to your urgent personal attention a severe civic issue that is significantly undermining public safety, cleanliness, and the daily quality of life in our neighborhood.

1. NATURE AND LOCATION OF THE GRIEVANCE:
- Area Affected: ${roadLocality}, Khar West, Mumbai - 400052${landmark}
- Core Civic Concern: ${issueTitle}
- Category: ${issueCategory}
- Urgency Level: ${data.urgency || 'High Priority Escalation'}

2. GROUND REALITY & NEIGHBORHOOD IMPACT:
The prolonged persistence of this issue has caused immense hardship to local residents, especially senior citizens, school-going children, and daily office commuters. Despite previous verbal representations, the situation on the ground remains unrectified and poses imminent risks to public health and urban mobility.

3. IMMEDIATE ACTION REQUESTED FROM BMC H/WEST WARD:
Under the MCGM Citizen Charter and public safety mandates, we earnestly request the following targeted interventions:
${specificDemands}

4. REQUEST FOR TICKET REGISTRATION:
We kindly request your esteemed office to:
a) Formally log this grievance in the MCGM Central Complaint System and provide a unique Grievance Tracking Number.
b) Depute a field inspection officer from the relevant department to survey the site.
c) Advise the scheduled timeline for complete spot-fix resolution.

Thank you for your proactive civic leadership and unwavering commitment to making H/West Ward a safer, cleaner, and model civic territory for all Mumbaikars.

Yours sincerely,

${residentName}
Resident, ${roadLocality}${society}, Khar West, Mumbai - 400052${contact}
Citizen Initiative: Aamchi Khar West Civic Spot-Fix Portal`;

  return {
    toEmail: 'assistantcommissioner.hwest@mcgm.gov.in',
    ccEmail: ccDepartment,
    subject,
    body,
    previewSummary: `${issueTitle} at ${roadLocality}`
  };
}
