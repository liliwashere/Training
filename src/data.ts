import { 
  PromptIngredient, 
  GemItem, 
  HallucinationQuizItem, 
  WorkspaceAppInfo, 
  DeepResearchItem 
} from './types';

export const INGREDIENT_CATEGORIES = [
  {
    label: "Role",
    description: "Who should Gemini be?",
    example: "Act as a Customer Success Manager..."
  },
  {
    label: "Task",
    description: "What exactly needs to happen?",
    example: "...draft a 3-paragraph email response to a customer complaint about a delayed order."
  },
  {
    label: "Context/Constraints",
    description: "Tone, length, reference data, or exclusions.",
    example: "Use a professional but empathetic tone. Mention our brand values. Keep it under 200 words."
  }
];

export const PROMPT_CONFIG = {
  roles: [
    {
      label: "Customer Success Manager",
      value: "a Senior Customer Success Manager",
      example: "Professional & empathetic expert in customer satisfaction."
    },
    {
      label: "Marketing Lead",
      value: "a Creative Marketing Lead",
      example: "Expert in brand voice and social media engagement."
    },
    {
      label: "Technical Support",
      value: "a Technical Support Engineer",
      example: "Specialist in troubleshooting and clear documentation."
    },
    {
      label: "Executive Assistant",
      value: "a highly organized Executive Assistant",
      example: "Expert in scheduling and administrative efficiency."
    }
  ] as PromptIngredient[],
  tasks: [
    {
      label: "Draft Event Agenda",
      value: "draft a 2-day event agenda",
      example: "Great for planning conferences or retreats."
    },
    {
      label: "Summarize Feedback",
      value: "summarize these customer feedback points into 3 bullets",
      example: "Turns raw data into insights."
    },
    {
      label: "Create Onboarding Guide",
      value: "write a client onboarding guide",
      example: "Helpful getting-started information."
    }
  ] as PromptIngredient[],
  contexts: [
    {
      label: "Professional & Empathetic",
      value: "using a professional but empathetic tone",
      example: "Ideal for customer relations."
    },
    {
      label: "High Energy & Fun",
      value: "using a high-energy and celebratory tone",
      example: "Perfect for events and successes."
    },
    {
      label: "Strictly Concise",
      value: "keep the response under 100 words total",
      example: "For quick updates and alerts."
    },
    {
      label: "Brand Values",
      value: "make sure to mention our core values of friction-free service",
      example: "Aligns with company values."
    }
  ] as PromptIngredient[]
};

export const GEMS_GUIDE_DATA = {
  instructions: "1. Click 'Gems' in the sidebar. 2. Name it 'Brand Guardian'. 3. Instruction: 'Act as the official brand voice. Always use the Customer First framework. Tone is professional, speed-oriented, and friction-free.'",
  demoPrompt: "How would the Brand Guardian respond to this?"
};

export const GEMS_GALLERY: GemItem[] = [
  {
    name: "Response Butler",
    role: "Expert Customer Relations Manager",
    instructions: "Always respond to customer reviews with empathy. Structure: 1. Acknowledgment, 2. Gratitude, 3. Specific Action Point. Keep it under 100 words.",
    preview: "Thank you for sharing your experience. We are sorry the AC was loud. Our maintenance team is checking it right now..."
  },
  {
    name: "Marketing Whisperer",
    role: "Creative Content Strategist",
    instructions: "Internal tone is punchy and high-energy. Use emojis and bullet points. Focus on monthly goals and industry trends.",
    preview: "🚀 Wellness Week is here! Check out the new team updates. Let's make this the best month yet! ✨"
  },
  {
    name: "Experience Guru",
    role: "Customer Experience Expert",
    instructions: "Always personalize recommendations. Tone is welcoming and knowledgeable. Focus on the customer's context and specific needs.",
    preview: "Welcome! Based on your previous interactions, I'd suggest starting with our onboarding guide — it covers exactly what you need..."
  }
];

export const MESSY_DRAFT_DATA = {
  messyDraft: "Wellness week ideas. yoga maybe? Bob wants healthy snacks. budget is tight (~500). launch in July. need a flyer. Sarah will talk to the cafe. yoga teacher is 100/hr.",
  prompt: "Act as a Senior Project Coordinator. I have some disorganized notes from a 'Wellness Week' brainstorm: '[MESSY_NOTES]'. Create a structured project plan. Group items into 'Logistics', 'Marketing', and 'Budget'. Identify Sarah as the lead for cafe coordination and assign flyer design as a pending task. Tone: Organized and professional."
};

export const HALLUCINATION_QUIZ_DATA: HallucinationQuizItem[] = [
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
    title: "AI Capabilities",
    statement: "Some AI platforms can process customer requests in over 100 languages.",
    isHallucination: false,
    explanation: "This is true — but always verify specific stats with your vendor's product sheet!"
  },
  {
    title: "The Identity Test",
    statement: "Gemini can predict a customer's private address if you give it their full name and account ID.",
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

export const WORKSPACE_APPS: WorkspaceAppInfo[] = [
  {
    app: "Gmail",
    icon: "Mail",
    useCase: "Drafting personalized replies",
    link: "https://mail.google.com",
    demoData: `Subject: Urgent: AC leaking in Room 202 - Wedding Anniversary Guest\n\nHi team, we are celebrating our 10th anniversary in room 202. The AC is dripping on the carpet. It is 11pm and we are very thirsty as the mini-bar is empty. Can you help?`,
    demoPrompt: "Act as a Customer Relations Manager. Draft a 150-word empathetic response offering a meaningful gesture to make up for the poor experience."
  },
  {
    app: "Docs",
    icon: "FileText",
    useCase: "Drafting Process Guides",
    link: "https://docs.new",
    demoData: "Onboarding Steps: 1. Welcome call. 2. Verify account details. 3. Collect payment info. 4. Send access credentials. 5. Schedule kickoff (first 7 days). 6. Assign account manager.",
    demoPrompt: "Rewrite these raw onboarding steps into a polished Client Welcome Guide. Use warm, professional language and include a section about our 'Customer First' commitment."
  },
  {
    app: "Sheets",
    icon: "Table",
    useCase: "Analyzing feedback trends",
    link: "https://sheets.new",
    demoData: "Customer Feedback: 1. Onboarding slow. 2. Support team great. 3. Dashboard confusing. 4. Pricing unclear. 5. Best tool ever. 6. Notifications too frequent. 7. Love the reports.",
    demoPrompt: "Classify this feedback into three columns: 'Sentiment' (Positive/Negative), 'Department' (F&B/Rooms/Facilities), and 'Action Required' (Yes/No)."
  },
  {
    app: "Slides",
    icon: "Presentation",
    useCase: "Pitching a product initiative",
    link: "https://slides.new",
    demoData: "Project: Self-Serve Portal v2. Goal: Reduce support ticket volume by 30%. Features: Knowledge base, live chat widget, onboarding checklists. Budget: 80k. Expected ROI: 20% in Year 1.",
    demoPrompt: "Act as a Product Marketing Lead. Design a 5-slide outline for a presentation to stakeholders about the Self-Serve Portal upgrade. Include slide titles and bullet points for what to show on each."
  }
];

export const DEEP_RESEARCH_SAMPLES: DeepResearchItem[] = [
  {
    label: "Competitor Audit",
    query: "Analyze the pricing and features of the top 5 AI productivity tools for customer-facing teams in 2026.",
    benefit: "Synthesizes 25+ sources into a single table with citations."
  },
  {
    label: "Market Trends",
    query: "What are the emerging AI adoption trends for customer support teams in Europe for 2026?",
    benefit: "Browses the live web to find the most recent updates."
  },
  {
    label: "Fact-Check",
    query: "Verify if the proposed EU AI Act regulations will affect companies using LLMs for internal automation.",
    benefit: "Executes multi-step reasoning to clarify complex legal text."
  }
];
