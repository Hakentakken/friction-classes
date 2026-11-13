// The single source of truth for business details and unknown values.
// PLACEHOLDER: set SITE_URL and BASE_PATH here, or use deployment environment overrides.
export const site = {
  name: 'Friction Classes',
  tagline: 'A little grip. A world of possibility.',
  phone: '+91 80768 70866',
  whatsapp: '918076870866',
  EMAIL: '', // PLACEHOLDER: email is unknown; all email links stay hidden until supplied.
  siteUrl: process.env.SITE_URL || '', // PLACEHOLDER: final domain is undecided.
  basePath: process.env.BASE_PATH || '/',
  socialLinks: [], // PLACEHOLDER: add { label: 'Instagram', url: 'https://...' } when known.
  demoMessage: "Hi Friction Classes, I'd like to book a demo class for my child (Class __).",
  generalMessage: "Hi Friction Classes, I'd like to know more about one-on-one classes for my child (Class __).",
  subjects: [
    { name: 'Maths', symbol: '∑', line: 'From “I’m stuck” to “I see it.”', description: 'Build number sense, connect ideas and work through problems with a mentor who makes room for every question.', topics: ['Number sense & arithmetic', 'Fractions, geometry & algebra', 'Reasoning & problem solving'] },
    { name: 'Science', symbol: '✳', line: 'Make room for the big why.', description: 'Connect classroom concepts to everyday observations. Explore how things work, then practise explaining the thinking behind them.', topics: ['Everyday scientific ideas', 'Concepts & clear explanations', 'Observation & scientific reasoning'] },
    { name: 'English', symbol: 'Aa', line: 'Find the words. Find your voice.', description: 'Read with understanding, write with clarity and grow more comfortable sharing ideas, one conversation at a time.', topics: ['Reading comprehension', 'Grammar & vocabulary', 'Writing & communication'] },
    { name: 'Coding and Logical Thinking', symbol: '</>', line: 'Small steps. Clever possibilities.', description: 'Learn to break a challenge into manageable parts, spot patterns and turn an idea into a sequence that works.', topics: ['Patterns & logical thinking', 'Age-appropriate coding foundations', 'Creative problem solving'] },
  ],
  gradeBands: [
    { label: 'Classes 1–3', title: 'Little discoveries. Strong roots.', description: 'A gentle start with numbers, words and the joy of asking why.', focus: 'Foundations & curiosity', details: 'We use familiar examples and guided practice to help early learners build understanding. A parent can help their child settle into the online routine.' },
    { label: 'Classes 4–6', title: 'Connect the dots.', description: 'Turn growing curiosity into clear concepts and independent thinking.', focus: 'Understanding & exploration', details: 'We revisit gaps, connect new ideas to what your child knows and encourage them to explain their reasoning in their own words.' },
    { label: 'Classes 7–9', title: 'Ready for what’s next.', description: 'Make complex ideas feel manageable, with space to go deeper.', focus: 'Depth & independence', details: 'We work through challenging concepts, thoughtful practice and study habits that help your child approach schoolwork with greater independence.' },
  ],
  curricula: ['CBSE', 'ICSE', 'IB', 'IGCSE'],
  timeZones: [
    { country: 'USA', zone: 'America/New_York', city: 'New York' },
    { country: 'UK', zone: 'Europe/London', city: 'London' },
    { country: 'UAE', zone: 'Asia/Dubai', city: 'Dubai' },
    { country: 'Canada', zone: 'America/Toronto', city: 'Toronto' },
    { country: 'Australia', zone: 'Australia/Sydney', city: 'Sydney' },
    { country: 'Singapore', zone: 'Asia/Singapore', city: 'Singapore' },
  ],
  team: [
    { name: 'Vivek', slug: 'vivek', role: 'Founder and Mentor', institution: 'NSUT', discipline: 'Instrumentation Engineering', bio: 'Making space for the question your child hasn’t asked yet.' },
    { name: 'Tamanna', slug: 'tamanna', role: 'Mentor', institution: 'NSUT', discipline: 'Electronics and Communication Engineering', bio: 'Bringing a curious mind to each new learning conversation.' },
    { name: 'Utsav', slug: 'utsav', role: 'Mentor', institution: 'Amity University Gurgaon', discipline: 'Computer Science Engineering', bio: 'Finding the small, clear steps inside a bigger challenge.' },
    { name: 'Manoranjan', slug: 'manoranjan', role: 'Mentor', institution: 'IIT Madras', discipline: 'Data Science', bio: 'Exploring the patterns that help an idea make sense.' },
    { name: 'Utkarsh', slug: 'utkarsh', role: 'Mentor', institution: 'IPU', discipline: 'Computer Science Engineering', bio: 'Encouraging questions, experiments and another try.' },
  ],
};

export const link = (path = '') => `${site.basePath.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const whatsapp = (message = site.demoMessage) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
export const navigation = [ ['About', 'about/'], ['Programs', 'programs/'], ['Subjects', 'subjects/'], ['Our Mentors', 'mentors/'], ['For NRI Families', 'nri-families/'] ];
export const steps = [
  { title: 'Start with a message', text: 'Tell us your child’s class, subjects and what’s on your mind.' },
  { title: 'Let’s understand your child', text: 'A conversation and a gentle level check, without pressure or labels.' },
  { title: 'Meet a matched mentor', text: 'We discuss a mentor, learning plan and timing around your child’s needs.' },
  { title: 'Stay part of the journey', text: 'Regular parent updates keep you close to the learning and the next steps.' },
];
export const faqs = [
  { q: 'My child is shy. Will one-on-one classes help?', a: 'A one-on-one setting gives your child room to pause, ask again and think aloud without an audience. We start gently and let their comfort guide the conversation. Confidence matters as much as getting an answer right.' },
  { q: 'Can you work with our school curriculum?', a: 'Lessons are aligned to your child’s curriculum. Share their school topics and learning goals so we can discuss the right fit. We work around curricula such as CBSE, ICSE, IB and IGCSE; we do not claim board affiliation.' },
  { q: 'We live outside the country. How do timings work?', a: 'Tell us your city, time zone and preferred windows. We discuss a mutually suitable slot, including any daylight-saving changes. A specific slot is confirmed with you before classes begin.' },
  { q: 'Who will teach my child?', a: 'Our team includes engineering students and mentors from top institutions such as IIT Madras and NSUT. We discuss a mentor match based on the subject, your child’s needs and availability.' },
  { q: 'What happens in a demo class?', a: 'It is a chance to meet, explore a topic and discuss how your child learns. We confirm the format, timing and any applicable terms with you before the demo. There is no pressure to continue.' },
  { q: 'What do classes cost?', a: 'Message us for a personalized plan. We discuss your child’s subjects, class and schedule before sharing the plan and its terms.' },
  { q: 'What will we need for an online class?', a: 'A reliable internet connection, a device with a microphone and a quiet place to learn are a useful start. A larger screen helps with shared work. We will confirm the classroom link and any materials beforehand.' },
  { q: 'How will I know what my child is learning?', a: 'Regular parent updates cover the ideas practised, where your child needs support and what comes next. You can also share school feedback or concerns to help shape the learning plan.' },
  { q: 'What if we need to reschedule?', a: 'Message us as soon as your plans change. Availability and any rescheduling or cancellation terms are discussed and agreed with you before classes begin.' },
];
