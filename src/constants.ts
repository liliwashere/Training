import { PromptIngredient, DemoScenario, HallucinationCase } from './types';

export const PROMPT_INGREDIENTS: PromptIngredient[] = [
  {
    label: "Role",
    description: "Who should Gemini be?",
    example: "Act as a Guest Experience Manager at HiJiffy..."
  },
  {
    label: "Task",
    description: "What exactly needs to happen?",
    example: "...draft a 3-paragraph email response to a guest complain about late check-in."
  },
  {
    label: "Context/Constraints",
    description: "Tone, length, reference data, or exclusions.",
    example: "Use a professional but empathetic tone. Mention our 'HiJiffy Values'. Keep it under 200 words."
  }
];

export const PROMPT_GENERATOR_OPTIONS = {
  roles: [
    { label: "Guest Experience Manager", value: "a Senior Guest Experience Manager", example: "Professional & empathetic expert in guest satisfaction." },
    { label: "Marketing Lead", value: "a Creative Marketing Lead", example: "Expert in brand voice and social media engagement." },
    { label: "Technical Support", value: "a Technical Support Engineer", example: "Specialist in troubleshooting and clear documentation." },
    { label: "Executive Assistant", value: "a highly organized Executive Assistant", example: "Expert in scheduling and administrative efficiency." }
  ],
  tasks: [
    { label: "Draft Event Agenda", value: "draft a 2-day event agenda", example: "Great for planning conferences or retreats." },
    { label: "Summarize Feedback", value: "summarize these guest feedback points into 3 bullets", example: "Turns raw data into insights." },
    { label: "Create Property Guide", value: "write a guest welcome guide for a boutique hotel", example: "Helpful check-in information." }
  ],
  contexts: [
    { label: "Professional & Empathetic", value: "using a professional but empathetic tone", example: "Ideal for guest relations." },
    { label: "High Energy & Fun", value: "using a high-energy and celebratory tone", example: "Perfect for events and successes." },
    { label: "Strictly Concise", value: "keep the response under 100 words total", example: "For quick updates and alerts." },
    { label: "HiJiffy Values", value: "make sure to mention our core values of friction-free service", example: "Aligns with company values." }
  ]
};

export const GEMS_DEMO = {
  title: "The Brand Voice Gem",
  description: "Create a 'Mini-Me' version of yourself or a brand persona to handle all your customer correspondence.",
  instructions: "1. Click 'Gems' in the sidebar. 2. Name it 'HiJiffy Brand Guardian'. 3. Instruction: 'Act as the official voice of HiJiffy. Always use the Guest First framework. Tone is professional, speed-oriented, and friction-free.'",
  demoData: "Guest says: 'I hate that you don't allow dogs.'",
  demoPrompt: "How would the Brand Guardian respond to this?"
};

export const GEMS_EXAMPLES = [
  {
    name: "Response Butler",
    role: "Expert Guest Relations Manager",
    instructions: "Always respond to guest reviews with empathy. Structure: 1. Acknowledgment, 2. Gratitude, 3. Specific Action Point. Keep it under 100 words.",
    preview: "Thank you for sharing your experience. We are sorry the AC was loud. Our maintenance team is checking it right now..."
  },
  {
    name: "Marketing Whisperer",
    role: "Creative Content Strategist",
    instructions: "Internal tone is punchy and high-energy. Use emojis and bullet points. Focus on monthly goals and hospitality trends.",
    preview: "🚀 Wellness Week is here! Check out the new spa packages. Let's make this the best month yet! ✨"
  },
  {
    name: "Experience Guru",
    role: "Boutique Hospitality Expert",
    instructions: "Always suggest a local hidden gem. Tone is welcoming and knowledgeable. Focus on luxury details and personalized touches.",
    preview: "Welcome! For a quiet morning, I highly recommend the secret garden cafe just two blocks away. It's where the locals go..."
  }
];

export const SESSION1_DEMO: DemoScenario = {
  title: "The Meeting Meltdown",
  description: "You just finished a 1-hour brainstorming session for the new 'HiJiffy Wellness Week'. Your notes are a disaster. Turn them into a structured project plan.",
  messyDraft: "Wellness week ideas. yoga maybe? Bob wants healthy snacks. budget is tight (~500). launch in July. need a flyer. Sarah will talk to the cafe. yoga teacher is 100/hr.",
  targetOutcome: "A bulleted project plan with owners, categories, and estimated costs.",
  prompt: "Act as a Senior Project Coordinator. I have some disorganized notes from a 'Wellness Week' brainstorm: '[MESSY_NOTES]'. Create a structured project plan. Group items into 'Logistics', 'Marketing', and 'Budget'. Identify Sarah as the lead for cafe coordination and assign flyer design as a pending task. Tone: Organized and professional."
};

export const HALLUCINATION_QUIZ: HallucinationCase[] = [
  {
    title: "The Historical Fact",
    statement: "Abraham Lincoln invented the iPhone during his second term to communicate with generals.",
    isHallucination: true,
    explanation: "Obvious! AI can sometimes confidently state historical impossibilities if prompted weirdly or if it 'hallucinates' connections."
  },
  {
    title: "The Historical Myth",
    statement: "The Great Wall of China is the only man-made structure visible from the Moon with the naked eye.",
    isHallucination: true,
    explanation: "This is a common myth! From the moon, even continents are hard to see. AI often repeats this because it's so common in its training data."
  },
  {
    title: "HiJiffy Capabilities",
    statement: "HiJiffy's AI can process guest requests in over 100 languages.",
    isHallucination: false,
    explanation: "This is a fact about the HiJiffy platform, but always verify specific stats with your product sheet!"
  },
  {
    title: "The Identity Test",
    statement: "Gemini can predict a guest's private address if you give it their full name and booking ID.",
    isHallucination: true,
    explanation: "False! AI doesn't have a live connection to your private CRM unless explicitly integrated. If it gives you an address, it is hallucinating a realistic-looking fake."
  },
  {
    title: "The Content Limit",
    statement: "Gemini 1.5 Pro can process up to 2 million tokens (about 1 million words) in a single prompt.",
    isHallucination: false,
    explanation: "Fact! This massive 'context window' allows Gemini to read entire libraries or watch hours of video in one go."
  }
];

export const WORKSPACE_DEMOS = [
  {
    app: "Gmail",
    icon: "Mail",
    useCase: "Drafting personalized replies",
    link: "https://mail.google.com",
    demoData: "Subject: Urgent: AC leaking in Room 202 - Wedding Anniversary Guest\n\nHi team, we are celebrating our 10th anniversary in room 202. The AC is dripping on the carpet. It is 11pm and we are very thirsty as the mini-bar is empty. Can you help?",
    demoPrompt: "Act as a Guest Relations Manager. Draft a 150-word empathetic response offering a room upgrade and complimentary champagne to fix the anniversary stay."
  },
  {
    app: "Docs",
    icon: "FileText",
    useCase: "Drafting Property Guides",
    link: "https://docs.new",
    demoData: "Check-in Steps: 1. Greet at door. 2. Verify ID. 3. Ask for deposit ($50). 4. Give keycards. 5. Mention hotel breakfast hours (7am-10am). 6. Offer luggage help.",
    demoPrompt: "Rewrite these raw check-in steps into a beautiful Guest Welcome Guide. Use inviting language and include a section about the HiJiffy 'Guest First' philosophy."
  },
  {
    app: "Sheets",
    icon: "Table",
    useCase: "Analyzing feedback trends",
    link: "https://sheets.new",
    demoData: "Guest Feedback: 1. Eggs cold. 2. Staff nice. 3. Pool dirty. 4. Bed hard. 5. Best stay ever. 6. AC loud. 7. Coffee great.",
    demoPrompt: "Classify this feedback into three columns: 'Sentiment' (Positive/Negative), 'Department' (F&B/Rooms/Facilities), and 'Action Required' (Yes/No)."
  },
  {
    app: "Slides",
    icon: "Presentation",
    useCase: "Pitching property upgrades",
    link: "https://slides.new",
    demoData: "Project: Rooftop Bar v2. Goal: Increase evening revenue. Features: Infinity lounge, fire pits, 360 views of London. Budget: 200k. Expected ROI: 15% in Year 1.",
    demoPrompt: "Act as a Commercial Marketing Lead. Design a 5-slide outline for a presentation to stakeholders about the Rooftop Bar upgrade. Include slide titles and bullet points for what to show on each."
  }
];
