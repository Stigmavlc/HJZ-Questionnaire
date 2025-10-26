export type QuestionType =
  | 'text'
  | 'textarea'
  | 'checkbox'
  | 'radio'
  | 'checkbox-group'
  | 'checkbox-with-text';

export interface QuestionOption {
  label: string;
  hasTextField?: boolean; // For "Other: ___" style options
}

export interface Question {
  id: string;
  section: string;
  sectionEmoji: string;
  question: string;
  type: QuestionType;
  options?: QuestionOption[];
  placeholder?: string;
  note?: string; // WHY THIS MATTERS notes
  subQuestions?: Question[]; // For grouped questions
  priority?: number; // 1-5 for critical questions
}

export const questionnaireData: Question[] = [
  // Services Offered
  {
    id: '1.1',
    section: 'Services Offered',
    sectionEmoji: '🛠',
    question: 'What types of plumbing services do you offer?',
    type: 'textarea',
    placeholder: 'e.g., tap repairs, boiler servicing, bathroom installations, underfloor heating, etc.',
  },
  {
    id: '1.2',
    section: 'Services Offered',
    sectionEmoji: '🛠',
    question: 'Small Jobs (flexible £20 deposit) - Which services do you offer?',
    type: 'checkbox-group',
    note: 'WHY: Agents need to know exactly what you do/don\'t do',
    options: [
      { label: 'Tap repairs/replacements' },
      { label: 'Toilet unblocking' },
      { label: 'Minor leak repairs' },
      { label: 'Washer replacements' },
      { label: 'Valve repairs' },
      { label: 'Dripping taps' },
      { label: 'Slow drains' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '1.3',
    section: 'Services Offered',
    sectionEmoji: '🛠',
    question: 'Medium Jobs (£30 deposit) - Which services do you offer?',
    type: 'checkbox-group',
    options: [
      { label: 'Radiator repairs (not working)' },
      { label: 'Radiator replacements' },
      { label: 'Shower repairs' },
      { label: 'Toilet installations (replacement)' },
      { label: 'Sink installations' },
      { label: 'Pipe repairs' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '1.4',
    section: 'Services Offered',
    sectionEmoji: '🛠',
    question: 'Large Jobs (£85 assessment required) - Which services do you offer?',
    type: 'checkbox-group',
    options: [
      { label: 'Boiler servicing' },
      { label: 'Boiler repairs' },
      { label: 'Boiler installations' },
      { label: 'Full bathroom installations' },
      { label: 'Bathroom renovations' },
      { label: 'Central heating systems' },
      { label: 'Power flushing' },
      { label: 'Underfloor heating' },
      { label: 'Outside work (drains, outside taps, etc.)' },
      { label: 'Kitchen plumbing' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '1.5',
    section: 'Services Offered',
    sectionEmoji: '🛠',
    question: 'Services You DON\'T Offer - Which of these do you NOT do?',
    type: 'checkbox-group',
    note: 'WHY: Agents need to politely decline these',
    options: [
      { label: 'Major drainage/sewage work (beyond basic unblocking)' },
      { label: 'Septic tanks/cesspits' },
      { label: 'Commercial properties' },
      { label: 'Gas work (if not Gas Safe registered)' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '1.6',
    section: 'Services Offered',
    sectionEmoji: '🛠',
    question: 'Do you handle both residential and commercial work?',
    type: 'radio',
    options: [
      { label: 'Residential only' },
      { label: 'Commercial only' },
      { label: 'Both' },
    ],
  },
  {
    id: '1.7',
    section: 'Services Offered',
    sectionEmoji: '🛠',
    question: 'Do you offer emergency services outside of regular hours? If yes, what hours and pricing apply?',
    type: 'textarea',
    placeholder: 'Describe emergency service hours and pricing',
  },

  // Gas Safety & Qualifications
  {
    id: '2.1',
    section: 'Gas Safety & Qualifications',
    sectionEmoji: '🔐',
    question: 'Are you Gas Safe registered?',
    type: 'radio',
    note: 'WHY THIS MATTERS: Sarah must detect gas emergencies, and Tom/James need to know what gas work you can legally do',
    priority: 1,
    options: [
      { label: 'Yes - Registration Number', hasTextField: true },
      { label: 'No' },
    ],
  },
  {
    id: '2.2',
    section: 'Gas Safety & Qualifications',
    sectionEmoji: '🔐',
    question: 'If YES, what gas work are you qualified to do?',
    type: 'checkbox-group',
    options: [
      { label: 'Boiler servicing' },
      { label: 'Boiler repairs' },
      { label: 'Boiler installations (combi, system, regular)' },
      { label: 'Gas hob installations' },
      { label: 'Gas fire installations' },
      { label: 'Gas pipe work' },
      { label: 'Landlord gas safety certificates' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '2.3',
    section: 'Gas Safety & Qualifications',
    sectionEmoji: '🔐',
    question: 'If NO Gas Safe registration, what should agents tell customers asking about boilers/gas work?',
    type: 'textarea',
    placeholder: 'Example: "We can help with the plumbing side, but you\'ll need a Gas Safe engineer for the gas connections"',
  },

  // Service Areas
  {
    id: '3.1',
    section: 'Service Areas',
    sectionEmoji: '📍',
    question: 'Which postcodes or areas do you serve?',
    type: 'text',
    placeholder: 'Default is HU1–HU9 — please confirm or update',
  },
  {
    id: '3.2',
    section: 'Service Areas',
    sectionEmoji: '📍',
    question: 'Are there any areas you *do not* serve, even within Hull?',
    type: 'textarea',
    placeholder: 'List any excluded areas',
  },

  // Operating Hours
  {
    id: '4.1',
    section: 'Operating Hours',
    sectionEmoji: '🕒',
    question: 'What are your standard working hours? (Weekdays, Saturday, Sunday)',
    type: 'textarea',
    placeholder: 'e.g., Mon–Fri: 8 am–6 pm, Saturday: 9am-2pm, Sunday: Closed',
  },
  {
    id: '4.2',
    section: 'Operating Hours',
    sectionEmoji: '🕒',
    question: 'Do you ever accept appointments outside those hours (evenings/emergencies)? If yes, when and under what conditions?',
    type: 'textarea',
    placeholder: 'Describe after-hours policy',
  },

  // Job Duration & Scheduling
  {
    id: '5.1',
    section: 'Job Duration & Scheduling',
    sectionEmoji: '⏱️',
    question: 'How long does a typical SMALL job take? (e.g., tap repair, unblock, leak fix)',
    type: 'text',
    note: 'WHY THIS MATTERS: Tom and James need to book realistic time slots in ServiceM8',
    priority: 2,
    placeholder: 'e.g., 30-60 minutes',
  },
  {
    id: '5.2',
    section: 'Job Duration & Scheduling',
    sectionEmoji: '⏱️',
    question: 'How long does a typical MEDIUM job take? (e.g., radiator repair, toilet replacement)',
    type: 'text',
    priority: 2,
    placeholder: 'e.g., 1-2 hours',
  },
  {
    id: '5.3',
    section: 'Job Duration & Scheduling',
    sectionEmoji: '⏱️',
    question: 'How long does an ASSESSMENT visit take? (for large jobs like boilers, bathrooms)',
    type: 'text',
    priority: 2,
    placeholder: 'e.g., 30-60 minutes',
  },
  {
    id: '5.4',
    section: 'Job Duration & Scheduling',
    sectionEmoji: '⏱️',
    question: 'Do you need buffer time between appointments?',
    type: 'radio',
    options: [
      { label: 'Yes - specify minutes', hasTextField: true },
      { label: 'No, I can schedule back-to-back' },
    ],
  },
  {
    id: '5.5',
    section: 'Job Duration & Scheduling',
    sectionEmoji: '⏱️',
    question: 'What\'s the earliest appointment time you accept?',
    type: 'text',
    placeholder: 'e.g., 8:00 am',
  },
  {
    id: '5.6',
    section: 'Job Duration & Scheduling',
    sectionEmoji: '⏱️',
    question: 'What\'s the latest appointment start time you accept?',
    type: 'text',
    placeholder: 'e.g., 4:00 pm',
  },

  // Pricing & Deposits
  {
    id: '6.1',
    section: 'Pricing & Deposits',
    sectionEmoji: '💰',
    question: 'What is the pricing structure for common jobs?',
    type: 'textarea',
    placeholder: 'List typical services with estimated prices (e.g., tap replacement: £X, toilet unblock: £Y)',
  },
  {
    id: '6.2',
    section: 'Pricing & Deposits',
    sectionEmoji: '💰',
    question: 'What do you charge for emergency callouts (within hours and after hours)?',
    type: 'textarea',
    placeholder: 'Describe emergency pricing',
  },
  {
    id: '6.3',
    section: 'Pricing & Deposits',
    sectionEmoji: '💰',
    question: 'What deposits do you require for different job sizes? (Small, Medium, Installations/assessments)',
    type: 'textarea',
    placeholder: 'Small jobs: £___, Medium jobs: £___, Large jobs: £___',
  },
  {
    id: '6.4',
    section: 'Pricing & Deposits',
    sectionEmoji: '💰',
    question: 'When is the remaining balance due?',
    type: 'radio',
    options: [
      { label: 'On completion' },
      { label: 'In stages' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '6.5',
    section: 'Pricing & Deposits',
    sectionEmoji: '💰',
    question: 'Do you offer payment plans or financing options?',
    type: 'textarea',
    placeholder: 'Describe any payment plans',
  },

  // Payment Methods & Deposit Collection
  {
    id: '7.1',
    section: 'Payment Methods & Deposit Collection',
    sectionEmoji: '💳',
    question: 'What payment methods do you accept?',
    type: 'checkbox-group',
    note: 'WHY THIS MATTERS: Customers WILL ask "how do I pay the deposit?" during booking calls',
    priority: 3,
    options: [
      { label: 'Cash' },
      { label: 'Card on-site', hasTextField: true },
      { label: 'Bank transfer' },
      { label: 'Stripe/online payment link' },
      { label: 'Cheque' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '7.2',
    section: 'Payment Methods & Deposit Collection',
    sectionEmoji: '💳',
    question: 'HOW should customers pay deposits when booking over the phone?',
    type: 'radio',
    priority: 3,
    options: [
      { label: 'Stripe payment link sent via SMS immediately after booking' },
      { label: 'Bank transfer (Account Name, Sort Code, Account Number)', hasTextField: true },
      { label: 'Pay on arrival before work starts' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '7.3',
    section: 'Payment Methods & Deposit Collection',
    sectionEmoji: '💳',
    question: 'WHEN must the deposit be paid?',
    type: 'radio',
    priority: 3,
    options: [
      { label: 'Immediately after booking (within X minutes)', hasTextField: true },
      { label: 'Within 24 hours of booking' },
      { label: 'Before appointment date (by X hours before)', hasTextField: true },
      { label: 'On arrival before work begins' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '7.4',
    section: 'Payment Methods & Deposit Collection',
    sectionEmoji: '💳',
    question: 'Are deposits refundable if customer cancels?',
    type: 'radio',
    options: [
      { label: 'Yes, always fully refundable' },
      { label: 'Yes, if cancelled with X hours notice', hasTextField: true },
      { label: 'Partially refundable', hasTextField: true },
      { label: 'No, non-refundable (secures the slot)' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '7.5',
    section: 'Payment Methods & Deposit Collection',
    sectionEmoji: '💳',
    question: 'Can deposits be transferred to a different date if customer reschedules?',
    type: 'radio',
    options: [
      { label: 'Yes, always' },
      { label: 'Yes, once only' },
      { label: 'No' },
      { label: 'Other', hasTextField: true },
    ],
  },

  // Appointments & Scheduling
  {
    id: '8.1',
    section: 'Appointments & Scheduling',
    sectionEmoji: '📆',
    question: 'How far in advance can customers typically book?',
    type: 'text',
    placeholder: 'e.g., 2 weeks, 1 month',
  },
  {
    id: '8.2',
    section: 'Appointments & Scheduling',
    sectionEmoji: '📆',
    question: 'Do you allow same-day bookings? If so, under what conditions?',
    type: 'textarea',
    placeholder: 'Describe same-day booking policy',
  },
  {
    id: '8.3',
    section: 'Appointments & Scheduling',
    sectionEmoji: '📆',
    question: 'How do you handle cancellations? (Fee? Notice required?)',
    type: 'textarea',
    placeholder: 'Describe cancellation policy',
  },
  {
    id: '8.4',
    section: 'Appointments & Scheduling',
    sectionEmoji: '📆',
    question: 'Can customers reschedule bookings? What\'s the policy?',
    type: 'textarea',
    placeholder: 'Describe rescheduling policy',
  },

  // Emergency & Same-Day Work
  {
    id: '9.1',
    section: 'Emergency & Same-Day Work',
    sectionEmoji: '🚨',
    question: 'Do you offer same-day service?',
    type: 'radio',
    note: 'WHY THIS MATTERS: Urgent calls need different handling than routine bookings',
    options: [
      { label: 'Yes, always if I have availability' },
      { label: 'Yes, but with premium/emergency rate', hasTextField: true },
      { label: 'Only for genuine emergencies' },
      { label: 'No, earliest is next day' },
    ],
  },
  {
    id: '9.2',
    section: 'Emergency & Same-Day Work',
    sectionEmoji: '🚨',
    question: 'What do YOU consider a "genuine emergency"?',
    type: 'checkbox-group',
    options: [
      { label: 'Burst pipe actively flooding property' },
      { label: 'No water supply to property' },
      { label: 'Major leak causing damage' },
      { label: 'No heating in winter (vulnerable customer)' },
      { label: 'Sewage backup' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '9.3',
    section: 'Emergency & Same-Day Work',
    sectionEmoji: '🚨',
    question: 'What do you NOT consider an emergency?',
    type: 'checkbox-group',
    options: [
      { label: 'Dripping tap (can wait)' },
      { label: 'Slow drain (can wait)' },
      { label: 'Running toilet (can wait)' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '9.4',
    section: 'Emergency & Same-Day Work',
    sectionEmoji: '🚨',
    question: 'If you\'re fully booked for emergencies, do you recommend other plumbers?',
    type: 'radio',
    options: [
      { label: 'Yes, I keep a list', hasTextField: true },
      { label: 'No, I tell them to search online' },
      { label: 'Other', hasTextField: true },
    ],
  },

  // Assessments & Installations
  {
    id: '10.1',
    section: 'Assessments & Installations',
    sectionEmoji: '🧾',
    question: 'Do you charge for initial assessments? If yes, how much?',
    type: 'textarea',
    placeholder: 'e.g., £85 for large job assessments',
  },
  {
    id: '10.2',
    section: 'Assessments & Installations',
    sectionEmoji: '🧾',
    question: 'What is included in an assessment visit?',
    type: 'textarea',
    placeholder: 'Describe what happens during assessment',
  },
  {
    id: '10.3',
    section: 'Assessments & Installations',
    sectionEmoji: '🧾',
    question: 'Do customers need to be present for installations/assessments?',
    type: 'radio',
    options: [
      { label: 'Yes' },
      { label: 'No' },
      { label: 'Depends', hasTextField: true },
    ],
  },
  {
    id: '10.4',
    section: 'Assessments & Installations',
    sectionEmoji: '🧾',
    question: 'Do you supply materials, or do customers provide their own?',
    type: 'radio',
    options: [
      { label: 'You supply all' },
      { label: 'Customer can supply some' },
      { label: 'Depends', hasTextField: true },
    ],
  },
  {
    id: '10.5',
    section: 'Assessments & Installations',
    sectionEmoji: '🧾',
    question: 'Do you work with or coordinate other trades (e.g., electricians, tilers)?',
    type: 'textarea',
    placeholder: 'Describe coordination with other trades',
  },

  // Materials & Parts
  {
    id: '11.1',
    section: 'Materials & Parts',
    sectionEmoji: '🛠️',
    question: 'Do you carry common parts in your van?',
    type: 'radio',
    note: 'WHY THIS MATTERS: Customers will ask "do I need to buy anything first?"',
    options: [
      { label: 'Yes, I stock common items (list them)', hasTextField: true },
      { label: 'Some items only' },
      { label: 'No, parts need to be ordered/sourced' },
    ],
  },
  {
    id: '11.2',
    section: 'Materials & Parts',
    sectionEmoji: '🛠️',
    question: 'What common parts/materials do you typically have with you?',
    type: 'textarea',
    placeholder: 'List common parts you carry',
  },
  {
    id: '11.3',
    section: 'Materials & Parts',
    sectionEmoji: '🛠️',
    question: 'How do you charge for materials?',
    type: 'radio',
    options: [
      { label: 'Included in quoted job price' },
      { label: 'Cost price (show receipt)' },
      { label: 'Cost price + markup', hasTextField: true },
      { label: 'Trade price + VAT' },
      { label: 'Depends on job', hasTextField: true },
    ],
  },
  {
    id: '11.4',
    section: 'Materials & Parts',
    sectionEmoji: '🛠️',
    question: 'What happens if a part needs to be ordered and you don\'t have it?',
    type: 'radio',
    options: [
      { label: 'Book a return visit immediately, no additional call-out fee' },
      { label: 'Customer pays diagnostic/call-out fee', hasTextField: true },
      { label: 'No charge for diagnosis, only pay when work is completed' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '11.5',
    section: 'Materials & Parts',
    sectionEmoji: '🛠️',
    question: 'Can customers supply their own materials?',
    type: 'radio',
    options: [
      { label: 'Yes, but I don\'t guarantee parts I didn\'t supply' },
      { label: 'Yes, but prefer to supply myself' },
      { label: 'No, I only work with parts I source' },
      { label: 'Depends', hasTextField: true },
    ],
  },

  // Access & Property Requirements
  {
    id: '12.1',
    section: 'Access & Property Requirements',
    sectionEmoji: '🏠',
    question: 'Do customers NEED to be present during the work?',
    type: 'radio',
    note: 'WHY THIS MATTERS: Helps set customer expectations and avoid wasted visits',
    options: [
      { label: 'Yes, always (for security and decisions)' },
      { label: 'No, as long as I have access' },
      { label: 'Depends on job type', hasTextField: true },
    ],
  },
  {
    id: '12.2',
    section: 'Access & Property Requirements',
    sectionEmoji: '🏠',
    question: 'What access do you typically need?',
    type: 'checkbox-group',
    options: [
      { label: 'Loft/attic access' },
      { label: 'Under floor/crawlspace access' },
      { label: 'Outside access (stop tap, drains)' },
      { label: 'Boiler cupboard/utility room' },
      { label: 'Parking close to property', hasTextField: true },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '12.3',
    section: 'Access & Property Requirements',
    sectionEmoji: '🏠',
    question: 'What should customers prepare before you arrive?',
    type: 'checkbox-group',
    options: [
      { label: 'Clear area around work site' },
      { label: 'Move furniture/belongings away' },
      { label: 'Ensure pets are secured' },
      { label: 'Provide access to stop tap location' },
      { label: 'Have towels/buckets ready (for leaks)' },
      { label: 'Nothing specific - I\'ll advise when booking' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '12.4',
    section: 'Access & Property Requirements',
    sectionEmoji: '🏠',
    question: 'Are there any property types you WON\'T work on?',
    type: 'checkbox-group',
    options: [
      { label: 'Very old properties (specify year)', hasTextField: true },
      { label: 'Listed buildings (too restrictive)' },
      { label: 'Flats above X floor without lift', hasTextField: true },
      { label: 'Properties with no parking/difficult access' },
      { label: 'Mobile homes/caravans' },
      { label: 'No restrictions' },
      { label: 'Other', hasTextField: true },
    ],
  },

  // Policies & Legal
  {
    id: '13.1',
    section: 'Policies & Legal',
    sectionEmoji: '🔒',
    question: 'What warranties or guarantees do you offer on your work? (Length and what\'s covered?)',
    type: 'textarea',
    placeholder: 'Describe warranty/guarantee policy',
  },
  {
    id: '13.2',
    section: 'Policies & Legal',
    sectionEmoji: '🔒',
    question: 'Are you insured? What type of insurance do you carry?',
    type: 'checkbox-group',
    options: [
      { label: 'Yes, Public Liability Insurance', hasTextField: true },
      { label: 'Yes, Professional Indemnity Insurance' },
      { label: 'Yes, Employer\'s Liability' },
      { label: 'No / Working on getting it' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '13.3',
    section: 'Policies & Legal',
    sectionEmoji: '🔒',
    question: 'Do you offer written quotes/invoices? Are they itemised?',
    type: 'radio',
    options: [
      { label: 'Yes, all quotes in writing (email/SMS)' },
      { label: 'Yes, invoices are itemised (labour + materials breakdown)' },
      { label: 'Simple invoices only (total amount)' },
      { label: 'Other', hasTextField: true },
    ],
  },

  // Common Customer Questions
  {
    id: '14.1',
    section: 'Common Customer Questions',
    sectionEmoji: '💬',
    question: '"How much will this cost?" - Should agents give price estimates over the phone?',
    type: 'radio',
    note: 'WHY THIS MATTERS: These are the most common "script-breakers" on real calls',
    options: [
      { label: 'Yes, for simple jobs (list with prices)', hasTextField: true },
      { label: 'Give rough ranges only' },
      { label: 'No, always need to see the job first' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '14.2',
    section: 'Common Customer Questions',
    sectionEmoji: '💬',
    question: '"Do you have reviews I can see?" - Where can customers find your reviews?',
    type: 'checkbox-group',
    options: [
      { label: 'Yes, Google reviews', hasTextField: true },
      { label: 'Yes, Facebook page', hasTextField: true },
      { label: 'Yes, Checkatrade/Rated People', hasTextField: true },
      { label: 'Yes, Trustpilot', hasTextField: true },
      { label: 'Building our online presence (new business)' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '14.3',
    section: 'Common Customer Questions',
    sectionEmoji: '💬',
    question: '"Are you insured?" - What should agents say? (Copy from insurance answer above)',
    type: 'text',
    placeholder: 'e.g., "Yes, Henry carries £X million public liability insurance."',
  },
  {
    id: '14.4',
    section: 'Common Customer Questions',
    sectionEmoji: '💬',
    question: '"How many years\' experience do you have?"',
    type: 'text',
    placeholder: 'e.g., 15 years as a qualified plumber',
  },
  {
    id: '14.5',
    section: 'Common Customer Questions',
    sectionEmoji: '💬',
    question: '"Do you guarantee your work?" - What\'s your guarantee policy?',
    type: 'textarea',
    placeholder: 'e.g., X months guarantee on all labour, parts covered by manufacturer warranty',
  },
  {
    id: '14.6',
    section: 'Common Customer Questions',
    sectionEmoji: '💬',
    question: '"What if I\'m not happy with the work?" - What\'s your policy?',
    type: 'textarea',
    placeholder: 'Describe your complaint/resolution policy',
  },
  {
    id: '14.7',
    section: 'Common Customer Questions',
    sectionEmoji: '💬',
    question: '"Do you clean up after yourself?"',
    type: 'radio',
    options: [
      { label: 'Yes, always leave site clean and tidy' },
      { label: 'Yes, basic cleanup (no damage/debris left)' },
      { label: 'Depends on job size' },
      { label: 'Other', hasTextField: true },
    ],
  },

  // Special Situations
  {
    id: '15.1',
    section: 'Special Situations',
    sectionEmoji: '🚨',
    question: 'Do you give discounts or priority to certain customers? (e.g., elderly, NHS workers, repeat clients?)',
    type: 'textarea',
    placeholder: 'Describe any special discounts or priority policies',
  },
  {
    id: '15.2',
    section: 'Special Situations',
    sectionEmoji: '🚨',
    question: 'Do you take on insurance work? If so, what info should the customer provide?',
    type: 'textarea',
    placeholder: 'Describe insurance work policy',
  },
  {
    id: '15.3',
    section: 'Special Situations',
    sectionEmoji: '🚨',
    question: 'How do you handle customers who request multiple quotes or are price shopping?',
    type: 'textarea',
    placeholder: 'Describe your approach to price shoppers',
  },

  // Follow-Up & Communication
  {
    id: '16.1',
    section: 'Follow-Up & Communication',
    sectionEmoji: '📞',
    question: 'Do you follow up after a job is completed? If so, how?',
    type: 'textarea',
    placeholder: 'Describe follow-up process',
  },
  {
    id: '16.2',
    section: 'Follow-Up & Communication',
    sectionEmoji: '📞',
    question: 'How should customers contact you if they have questions after booking?',
    type: 'checkbox-group',
    options: [
      { label: 'Call business mobile: 07912 553954' },
      { label: 'Text/WhatsApp: 07912 553954' },
      { label: 'Email', hasTextField: true },
      { label: 'Through automated system' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '16.3',
    section: 'Follow-Up & Communication',
    sectionEmoji: '📞',
    question: 'Do you allow waitlists for busy periods?',
    type: 'radio',
    options: [
      { label: 'Yes, we\'ll call you if a slot opens up' },
      { label: 'No, customers need to call back' },
      { label: 'Other', hasTextField: true },
    ],
  },

  // System Failure & Backup Plans
  {
    id: '17.1',
    section: 'System Failure & Backup Plans',
    sectionEmoji: '📱',
    question: 'If the booking system fails mid-call, what should agents do?',
    type: 'radio',
    note: 'WHY THIS MATTERS: Technology fails - agents need a backup plan',
    priority: 5,
    options: [
      { label: 'Take customer details and say "Henry will call you back within X hours"', hasTextField: true },
      { label: 'Give customer your direct number to call', hasTextField: true },
      { label: 'Apologize and ask them to call back in X minutes', hasTextField: true },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '17.2',
    section: 'System Failure & Backup Plans',
    sectionEmoji: '📱',
    question: 'If ServiceM8 is down and agents can\'t check availability, what should they do?',
    type: 'radio',
    options: [
      { label: 'Still book the appointment and you\'ll confirm by text/call later' },
      { label: 'Take details for callback' },
      { label: 'Tell customer to try calling again in an hour' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '17.3',
    section: 'System Failure & Backup Plans',
    sectionEmoji: '📱',
    question: 'If you\'re completely unavailable (holiday, illness, fully booked for weeks):',
    type: 'radio',
    options: [
      { label: 'Take details for waiting list' },
      { label: 'Offer next available date even if weeks away' },
      { label: 'Recommend another plumber' },
      { label: 'Suggest customer calls back in X days/weeks', hasTextField: true },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '17.4',
    section: 'System Failure & Backup Plans',
    sectionEmoji: '📱',
    question: 'Should agents EVER give out your personal mobile number?',
    type: 'radio',
    options: [
      { label: 'Yes, for urgent issues: 07912 553954' },
      { label: 'No, only use business number' },
      { label: 'Only for emergencies' },
      { label: 'Other', hasTextField: true },
    ],
  },

  // Booking Confirmation Details
  {
    id: '18.1',
    section: 'Booking Confirmation Details',
    sectionEmoji: '🗓️',
    question: 'What name should appear in SMS messages to customers?',
    type: 'radio',
    note: 'WHY THIS MATTERS: The system sends automated SMS - we need to know what to say',
    options: [
      { label: '"Henry from HJZ Plumbing"' },
      { label: '"HJZ Plumbing"' },
      { label: 'Just "Henry"' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '18.2',
    section: 'Booking Confirmation Details',
    sectionEmoji: '🗓️',
    question: 'Do you text customers when you\'re on the way to their property?',
    type: 'radio',
    options: [
      { label: 'Yes, always (X minutes before arrival)', hasTextField: true },
      { label: 'Yes, if I remember' },
      { label: 'No, I just arrive at scheduled time' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '18.3',
    section: 'Booking Confirmation Details',
    sectionEmoji: '🗓️',
    question: 'Should agents mention the automated reminder system during the call?',
    type: 'radio',
    options: [
      { label: 'Yes, always mention it' },
      { label: 'No, let it be a nice surprise' },
      { label: 'Other', hasTextField: true },
    ],
  },
  {
    id: '18.4',
    section: 'Booking Confirmation Details',
    sectionEmoji: '🗓️',
    question: 'What should confirmation SMS include?',
    type: 'checkbox-group',
    options: [
      { label: 'Date and time window (e.g., "Tuesday 14th March between 10am-12pm")' },
      { label: 'Deposit status (paid/pay on day)' },
      { label: 'Your business phone number' },
      { label: 'What customer should prepare' },
      { label: 'Cancellation policy reminder' },
      { label: 'Other', hasTextField: true },
    ],
  },

  // Business Positioning
  {
    id: '19.1',
    section: 'Business Positioning',
    sectionEmoji: '🎯',
    question: 'What makes HJZ Plumbing different from other plumbers?',
    type: 'textarea',
    note: 'WHY THIS MATTERS: Helps agents "sell" your service if customer is price shopping',
    placeholder: 'e.g., Local and reliable, Fair pricing, No call-out fees, Fast response, Quality workmanship, Tidy work site',
  },
  {
    id: '19.2',
    section: 'Business Positioning',
    sectionEmoji: '🎯',
    question: 'Any specialties or things you\'re particularly good at? (What do customers praise you for?)',
    type: 'textarea',
    placeholder: 'Describe your specialties and strengths',
  },
  {
    id: '19.3',
    section: 'Business Positioning',
    sectionEmoji: '🎯',
    question: 'If a customer says "I\'m getting 3 quotes" or "I\'ll think about it", what should agents say?',
    type: 'radio',
    options: [
      { label: '"That\'s absolutely fine! We\'re confident our service and pricing is competitive. Give us a call when you\'re ready."' },
      { label: '"No problem - we\'d love to earn your business. Our reviews speak for themselves."' },
      { label: 'Other (your preferred response)', hasTextField: true },
    ],
  },
];

export const getTotalQuestions = () => questionnaireData.length;

export const getCriticalQuestions = () =>
  questionnaireData.filter(q => q.priority && q.priority <= 5).sort((a, b) => (a.priority || 99) - (b.priority || 99));

export const getSections = () => {
  const sections = new Set<string>();
  questionnaireData.forEach(q => sections.add(q.section));
  return Array.from(sections);
};
