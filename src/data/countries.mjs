// Editorial guides, not regional translations or claims of a local office.
export const countries = [
  {
    slug: 'usa', name: 'USA', title: 'Online tuition for NRI families in the USA',
    description: 'Plan one-on-one tuition around US schoolwork, weekend mornings and daylight saving. Compare local class windows with time in India.',
    intro: 'An after-school lesson in New York and one in California are very different scheduling questions. Start with your city and your child’s school topics, rather than a single “US time” or a second full syllabus.',
    angle: 'Start with the school district, not a national label',
    paragraphs: [
      'School education in the USA is primarily a state and local responsibility. A grade number alone does not tell a mentor the methods, topic order or written explanations your child is expected to use. Bring a current topic list and an example of the teacher’s preferred working.',
      'If your child can calculate correctly but loses confidence when asked to explain a method, practise the explanation as well as the arithmetic. For example, ask them to draw how they grouped objects before writing the multiplication sentence. Use the language their school uses, including “math”, without making vocabulary differences feel like mistakes.',
      'For a possible move to a CBSE or ICSE school, separate keeping up with current schoolwork from preparing for the future. Map a few missing concepts first. Trying to finish two school programmes at once can make an already full week feel heavier.'
    ],
    scheduling: 'Weekend mornings are useful windows to discuss: they overlap with afternoon or evening in India. After-school hours on the US west coast can fall very early the next morning in India. We do not treat that as an automatically available or child-friendly routine.',
    clockNote: 'New York and Los Angeles change clocks seasonally. Phoenix does not follow that same pattern. These representative cities do not cover every US time zone; send your exact city when enquiring.',
    windows: [
      {city:'New York',zone:'America/New_York',start:9,end:11,label:'Weekend morning'},
      {city:'Los Angeles',zone:'America/Los_Angeles',start:8,end:10,label:'Weekend morning'},
      {city:'Phoenix',zone:'America/Phoenix',start:9,end:11,label:'Weekend morning'}
    ],
    questions: [
      {q:'Does US Grade 4 map exactly to Class 4?',a:'Do not assume a direct match. Share the grade, current unit and school expectations. We can identify concepts to support, while the school remains the authority on placement.'},
      {q:'Can my child keep using the method taught at school?',a:'Yes: show us an example before lessons begin. We discuss whether the mentor can support that method, and distinguish a useful alternative explanation from the method required for homework.'},
      {q:'Can we keep the same local time after clocks change?',a:'That is a scheduling preference to agree with the mentor, not an automatic promise. Confirm both the local time and the corresponding time in India when daylight saving changes.'}
    ],
    checklist: ['City and time zone, not just EST or PST', 'State or district topic list', 'A sample of expected written working', 'Whether the priority is current schoolwork or a future curriculum move'],
    sources: [
      {label:'US Department of Education: the federal role',url:'https://www.ed.gov/about/ed-overview/federal-role-in-education'},
      {label:'NIST: daylight saving rules and exceptions',url:'https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst'}
    ], related: ['choosing-an-online-tutor','switching-school-curricula']
  },
  {
    slug:'uk', name:'UK', title:'Online tuition for NRI families in the UK',
    description:'Understand UK year groups, curriculum changes and GMT/BST scheduling before choosing one-on-one online tuition for your child.',
    intro:'A UK year group is a starting point, not a complete description of what your child is learning. Build tuition around the school’s current work and a routine that still leaves room for the school day to end.',
    angle:'Check the nation, year group and actual syllabus',
    paragraphs:[
      'England’s national curriculum is organised into key stages. Scotland, Wales and Northern Ireland have their own education arrangements. Ask your school for the relevant topic sequence instead of treating “UK curriculum” as one programme.',
      'When switching from an Indian school, an unfamiliar year label can make a parent worry that their child has moved backwards or skipped content. Compare actual learning: which fractions have been covered, how reading responses are written and what the next science unit requires. Leave year-group placement decisions with the school.',
      'A lesson can focus on explaining a maths method, reading a passage closely or using evidence in a science answer. If a family mentions SATs or another assessment, clarify the current school task first; our general subject support is not a claim of specialist exam preparation.'
    ],
    scheduling:'An early after-school window can overlap with evening in India, especially during British Summer Time. Weekend mornings offer another option if the school run, clubs or tiredness make weekdays awkward. Confirm a slot rather than assuming all of the illustrative windows are available.',
    clockNote:'London moves between GMT and BST. India does not make the same seasonal adjustment, so a lesson fixed to UK local time changes its corresponding Indian time.',
    windows:[{city:'London',zone:'Europe/London',start:16,end:18,label:'Early after school'},{city:'London',zone:'Europe/London',start:9,end:11,label:'Weekend alternative'}],
    questions:[
      {q:'Should I send a key stage or a year group?',a:'Send both if your school uses them, plus the current subject topics. If your child attends school outside England or follows an international programme, name that programme explicitly.'},
      {q:'Will lessons follow British spelling and school terminology?',a:'Share the conventions your school expects, including examples of written work. We can discuss how to keep explanations and practice consistent with those expectations.'},
      {q:'What should we do during the GMT/BST change?',a:'Check the calendar invitation before the transition and confirm which local time remains fixed. Avoid copying a winter Indian-time conversion into a summer schedule.'}
    ],
    checklist:['UK nation and school year group','Key stage or named curriculum, where applicable','Reading or maths task your child finds difficult','A weekday and a weekend timing option'],
    sources:[{label:'GOV.UK: national curriculum in England',url:'https://www.gov.uk/government/publications/national-curriculum-in-england-framework-for-key-stages-1-to-4/the-national-curriculum-in-england-framework-for-key-stages-1-to-4'},{label:'GOV.UK: when the clocks change',url:'https://www.gov.uk/when-do-the-clocks-change'}],
    related:['building-maths-confidence','study-routines-across-time-zones']
  },
  {
    slug:'uae',name:'UAE',title:'Online tuition for NRI families in the UAE',
    description:'Compare UAE and India class times, plan around your school calendar and discuss CBSE, ICSE, IB or IGCSE topic support.',
    intro:'A short time difference can make scheduling easier, but school calendars and curriculum choices still need care. Tell us what your child’s school teaches and when their day actually leaves room to learn.',
    angle:'Use the school calendar as well as the curriculum name',
    paragraphs:[
      'Dubai’s private schools offer different curricula. KHDA’s parent guidance distinguishes April-start calendars for Indian, Pakistani and Japanese curriculum schools from the September-start pattern of other curricula. Check your own school’s calendar, especially before transferring or planning travel.',
      'A family moving between CBSE and a British or IB programme may meet familiar concepts in a different order. Start with a small topic comparison. For instance, a child who knows a calculation may need more practice explaining the reasoning in a written response, while another child may need to revisit the calculation itself.',
      'Maths, Science, English, and Coding and Logical Thinking are the subjects we discuss. Do not assume coverage of every subject required by a UAE school: share the specific need before choosing a plan. School admissions, equivalence and mandatory subject requirements remain questions for the school or relevant authority.'
    ],
    scheduling:'UAE late afternoons and early evenings overlap with evening in India. Leave a real break after the journey home, and flag changes to school hours or family commitments before fixing a weekly routine. Weekend mornings are another possibility to discuss.',
    clockNote:'Dubai and Abu Dhabi use the same time zone. India is one hour and thirty minutes ahead in these examples, with no seasonal clock change between the two locations.',
    windows:[{city:'Dubai / Abu Dhabi',zone:'Asia/Dubai',start:16,end:18,label:'After-school window'},{city:'Dubai / Abu Dhabi',zone:'Asia/Dubai',start:10,end:12,label:'Weekend alternative'}],
    questions:[
      {q:'Can we continue CBSE topics while living in the UAE?',a:'Share the class and current syllabus. We discuss lessons aligned to your child’s curriculum, with coverage confirmed before a plan starts. Living abroad does not by itself change the school topics they need.'},
      {q:'How do we handle an April-to-September school transfer?',a:'Ask the receiving school about placement and its topic sequence first. Then identify gaps and overlap so tuition supports the transition without repeating an entire year unnecessarily.'},
      {q:'Are you a local school or admissions service?',a:'No. Friction Classes offers one-on-one online subject support. We do not offer school placement, certificates, local premises or official curriculum equivalence decisions.'}
    ],
    checklist:['Emirate, school class and named curriculum','School year start and planned transfer date','Subjects where support is needed','School-hour changes and travel periods'],
    sources:[{label:'KHDA: guidance for parents',url:'https://web.khda.gov.ae/en/Guides/Parents/Common-Question-For-Parents'}],
    related:['staying-connected-to-curriculum','switching-school-curricula']
  },
  {
    slug:'canada',name:'Canada',title:'Online tuition for NRI families in Canada',
    description:'Plan tutoring around provincial schoolwork and Canadian time zones. Compare Toronto and Vancouver windows with India and prepare for a move.',
    intro:'A move between provinces can change school expectations as well as the clock. The useful starting point is your child’s province, school programme and current understanding—not a single “Canadian syllabus”.',
    angle:'A province-specific plan for a country of different systems',
    paragraphs:[
      'Education in Canada is organised by provinces and territories, with differences in curriculum and assessment. Ask the school for its current learning expectations. A report-card label may tell you less than a piece of work showing where your child needed help.',
      'Language context also matters. If your child studies in French immersion or another language setting, tell us which language is used in the subject and what kind of help you want. English-language concept practice is not the same as support with French terminology; we do not advertise French tuition.',
      'If you are preparing for a move back to an Indian school, keep a record of concepts covered rather than assuming a grade-to-class conversion. Agree the destination school’s priorities before adding extra material. A current school assignment can often show whether the difficulty is unfamiliar vocabulary, a new method or an underlying concept.'
    ],
    scheduling:'Weekend mornings can avoid a late-night lesson for the child. Toronto and Vancouver still need different calculations. Prefer a city-based calendar invitation over the abbreviation “Pacific”, especially when family members travel between Canada and the USA.',
    clockNote:'British Columbia moved most regions to permanent UTC−7 in 2026. Vancouver must not be treated as identical to Los Angeles in winter. Toronto still has a different seasonal pattern in the examples below; other provinces and local exceptions need their own city check.',
    windows:[{city:'Toronto',zone:'America/Toronto',start:9,end:11,label:'Weekend morning'},{city:'Vancouver',zone:'America/Vancouver',start:8,end:10,label:'Weekend morning'}],
    questions:[
      {q:'Can I ask for “Grade 6 Canadian maths”?',a:'Start there, then include the province and current unit. Curriculum expectations and the methods used at school need to be checked before we confirm an appropriate learning plan.'},
      {q:'Can tuition replace language support at school?',a:'No. Tell the school about language-related needs and ask what support is available. We can discuss the subjects we offer, but do not present general tuition as a replacement for school language services.'},
      {q:'Is Vancouver always on the same time as California?',a:'No. Vancouver’s 2026 time-policy change means a winter schedule should not borrow a Los Angeles conversion. Use the city and date in a current calendar and reconfirm the mentor’s corresponding time.'}
    ],
    checklist:['Province and city','School curriculum expectations or unit outline','Language used for the subject','Any upcoming interprovincial or international move'],
    sources:[{label:'CMEC: education in Canada',url:'https://www.cmec.ca/299/Education-in-Canada-An-Overview/index.html'},{label:'Government of British Columbia: permanent daylight time',url:'https://news.gov.bc.ca/releases/2026AG0013-000209'}],
    related:['switching-school-curricula','understanding-learning-progress']
  },
  {
    slug:'australia',name:'Australia',title:'Online tuition for NRI families in Australia',
    description:'Compare Australian after-school times with India, account for state time zones and build tuition around your child’s current school topics.',
    intro:'“After school in Australia” can mean very different times in Perth, Brisbane and Sydney. Choose the routine around your child’s state, schoolwork and energy—not a single national time conversion.',
    angle:'Keep state expectations and the school year in view',
    paragraphs:[
      'State and territory authorities decide how and when the Australian Curriculum is implemented. Ask for the actual year-level outline and recent classroom tasks rather than expecting a workbook labelled with the same year number to match perfectly.',
      'A move from an Indian school can also involve a different school-year rhythm. Before adding tuition, list the topics already covered and those coming next at the receiving school. Familiar content can be revisited briefly; unfamiliar ideas deserve more time without being treated as a sign that the child is behind in everything.',
      'For younger learners, discuss number sense, reading and clear explanations. For older learners, a science response or multi-step maths problem can reveal the kind of reasoning the school expects. If you mention NAPLAN, distinguish general subject support from specialist test preparation, which we do not claim.'
    ],
    scheduling:'After-school windows can line up with daytime in India. A later local window may work better than an immediate post-school lesson, particularly if your child needs a break or has sport. Mentor availability still needs to be confirmed; time-zone overlap alone is not a booking.',
    clockNote:'Sydney and Adelaide change clocks seasonally; Brisbane and Perth do not follow that same pattern. January and July also represent different seasons from those in the northern hemisphere.',
    windows:[{city:'Sydney',zone:'Australia/Sydney',start:17,end:19,label:'Later after school'},{city:'Brisbane',zone:'Australia/Brisbane',start:17,end:19,label:'Later after school'},{city:'Adelaide',zone:'Australia/Adelaide',start:17,end:19,label:'Later after school'},{city:'Perth',zone:'Australia/Perth',start:16,end:18,label:'After-school window'}],
    questions:[
      {q:'Should we match the Indian class number to the Australian year?',a:'Not automatically. Give us the school year, state and topics. The receiving school decides placement; tuition can then focus on the concepts your child actually needs.'},
      {q:'Why does my Sydney lesson shift relative to India?',a:'A slot kept at the same Sydney local time has a different Indian-time equivalent when Sydney’s seasonal clock setting changes. Confirm both times before the transition.'},
      {q:'Can we reduce the plan during sport or travel periods?',a:'Tell us about those commitments when discussing a plan. Agree on frequency and rescheduling terms in advance rather than assuming missed sessions can always be moved.'}
    ],
    checklist:['State, city and school year','Current unit or teacher feedback','Sport, travel and term-break commitments','Whether the aim is current school support or a curriculum transition'],
    sources:[{label:'ACARA: Foundation–Year 10 and state implementation',url:'https://acara.edu.au/curriculum/foundation-year-10'},{label:'NSW Government: time zones and daylight saving',url:'https://dcj.nsw.gov.au/about-us/daylight-saving/definitions-of-time-and-how-time-is-regulated.html'}],
    related:['study-routines-across-time-zones','understanding-learning-progress']
  },
  {
    slug:'singapore',name:'Singapore',title:'Online tuition for NRI families in Singapore',
    description:'Make space for one-on-one learning alongside Singapore schoolwork. Compare times with India and distinguish local and international curricula.',
    intro:'A manageable timetable matters as much as a convenient time difference. Start with your child’s actual programme and the one difficulty you want to make clearer, rather than adding another full set of assignments.',
    angle:'Distinguish the school programme before choosing extra work',
    paragraphs:[
      'A local MOE school and an international school may organise content differently. Singapore’s primary curriculum includes English, mathematics and science, among other areas; that does not make every local or international school’s topic sequence interchangeable. Share the programme and current unit.',
      'If your child uses bar models or another visual method in maths, bring an example. A helpful first task is to ask what each part of the picture represents, then connect it to the calculation. More worksheets are not automatically the right response to a method the child does not yet understand.',
      'For an NRI family considering a future move, Indian-curriculum continuity can be a separate, limited aim. Agree which concepts to revisit while keeping today’s schoolwork manageable. We do not claim specialist PSLE coaching or support for Mother Tongue subjects; ask about the subjects and learning needs within our stated scope.'
    ],
    scheduling:'Singapore’s afternoon and early evening overlap with afternoon in India. A later start can leave room for a snack, travel home and a break from schoolwork. If weekday activities fill the calendar, a weekend morning is a different option to discuss.',
    clockNote:'Singapore is two hours and thirty minutes ahead of India in these examples. Neither city changes clocks seasonally, so travel and changes in the school timetable are more likely reasons to revisit the routine.',
    windows:[{city:'Singapore',zone:'Asia/Singapore',start:17,end:19,label:'After-school window'},{city:'Singapore',zone:'Asia/Singapore',start:10,end:12,label:'Weekend alternative'}],
    questions:[
      {q:'Do you teach a fixed Singapore maths programme?',a:'We discuss personalized support aligned to the work your child brings. Share the method and syllabus so we can confirm fit; we do not present the service as an official or specialist branded programme.'},
      {q:'Can my child practise Indian curriculum topics as well?',a:'Possibly, if the scope is manageable and agreed in advance. Start with a clear reason for the extra topics, such as a planned move, and avoid duplicating an entire school timetable.'},
      {q:'How do we avoid overscheduling?',a:'Protect meals, sleep and a break after school first. Bring a realistic weekly timetable to the initial conversation, and choose a plan your child can sustain rather than filling every available window.'}
    ],
    checklist:['MOE or named international school programme','A sample of the maths or writing method used','Co-curricular commitments and travel time','The specific concept or confidence concern'],
    sources:[{label:'Singapore MOE: primary curriculum overview',url:'https://www.moe.gov.sg/-/media/files/about-us/moe-corporate-brochure.pdf'}],
    related:['why-one-on-one-tuition','building-maths-confidence']
  }
];
