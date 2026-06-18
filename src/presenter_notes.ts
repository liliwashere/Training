export interface PresenterNote {
  id: string;
  title: string;
  hook: string;
  script: string;
  demoActions: string[];
  engagementQuestions: string[];
  proTips: string[];
}

export const SESSION1_PRESENTER_NOTES: PresenterNote[] = [
  {
    id: "llm_intro",
    title: "🧠 Core Concept: What is an LLM?",
    hook: "How many of you actually trust AI to do your work without checkups? Let's understand why it behaves the way it does.",
    script: "Welcome students to the session. Explain that a Large Language Model is NOT a database or a conscious entity. Use the 'World's Most Powerful Auto-complete' analogy. It does not look up facts; it predicts characters. When it writes custom brand replies, it acts on pattern probability. It builds credibility because we can steer it using context. Point out the interactive predicted sequence on the screen.",
    demoActions: [
      "Hover over the predicted sequence on the slide to show the prediction model.",
      "Explain the comparison between a normal phone keyboard (simple) vs Gemini (deep context)."
    ],
    engagementQuestions: [
      "Ask: 'Has anyone seen AI autocomplete something so accurately it felt like magic?'",
      "Ask: 'What's the worst autocomplete fail you've experienced on your phone?'"
    ],
    proTips: [
      "Explain: LLMs don't hold databases. They represent statistical records of human language, meaning we must explicitly provide context for business facts."
    ]
  },
  {
    id: "prompt_definition",
    title: "✉️ The Definition of a Prompt",
    hook: "If you ask a vague question, expect a generic answer. This is the Golden Rule of AI.",
    script: "Introduce the prompt as a steering wheel. If you hold it loosely, you drift. If you guide it precisely, you reach your destination. The prompt defines the boundary of the AI's generation. Highlight 'Garbage In, Garbage Out'. The key distinction between amateur users and prompt engineers is word precision.",
    demoActions: [
      "Point to the 'Golden Rule' text card on screen.",
      "Emphasize that we are training ourselves to write with purpose and explicit direction."
    ],
    engagementQuestions: [
      "Ask: 'Do you write prompts like search queries (e.g. 'padel tournament email') or like a delegation instruction?'"
    ],
    proTips: [
      "Vagueness is the number one cause of boring generative content. Always specify the format, target audience, and constraints up front."
    ]
  },
  {
    id: "prompting_lab",
    title: "🧪 The 3-Ingredient Framework & Interactive Builder",
    hook: "Let's look at the difference between a lazy prompt and a professional command that actually saves time.",
    script: "Run through the three core ingredients: Role (who is the AI), Task (what exactly are we doing), and Context (the background data or tone requirements). Walk through the bad 'lethargic' padel prompt vs. the high-performing comms manager prompt. Demonstrate how separating these ingredients completely changes the quality in the Interactive Prompt Builder.",
    demoActions: [
      "Compare the bad prompt ('Write tournament email') to the professional HiJiffy prompt on screen.",
      "Open the Interactive Prompt Builder directly under the comparison.",
      "Click different Roles (e.g. Support Specialist vs Creative Optimizer) and notice how the draft adjusts.",
      "Generate a customized prompt live to show how ingredients slot together."
    ],
    engagementQuestions: [
      "Ask: 'By adding 'Act as a senior hospitality coordinator,' how do you think the tone changes compared to 'write an email'?'"
    ],
    proTips: [
      "Always put the Role at the absolute beginning of the prompt. It forces the model to pre-select and prioritize its vocabulary parameters immediately."
    ]
  },
  {
    id: "thinking_model",
    title: "⚡ The Thinking vs. Flash Models",
    hook: "Did you know there are two different 'modes' of AI reasoning? One is fast and cheap, the other slow and mathematical.",
    script: "Explain standard language generation versus advanced reasoning. A classic model (Flash) thinks out loud as it types, making split-second semantic guesses. A 'thinking' model uses an internal chain of thought step-by-step before printing a single character. It's like double-checking math before speaking.",
    demoActions: [
      "Showcase the visual thinking-loop widget on the screen.",
      "Explain that for coding, complex corporate strategy, and deep analysis, thinking models are mandatory. For quick drafts and text summarizing, Flash is better."
    ],
    engagementQuestions: [
      "Ask: 'In your daily desk tasks, which assignments require quiet calculation versus quick reflexes?'"
    ],
    proTips: [
      "Thinking models can solve complex mathematical logic, but they consume more tokens and time. Don't use them to write single-sentence greeting emails."
    ]
  },
  {
    id: "hallucination_quiz",
    title: "🔮 Understanding & Beating Hallucinations",
    hook: "AI doesn't lie; it auto-completes with high confidence even when it lacks the information. Let's test ourselves.",
    script: "Address the elephant in the room: Hallucinations. Explain that because LLMs are trained to keep the conversation flowing, they will elegantly invent plausible-sounding details if they don't have factual context. Standard security filters and grounding facts are the only cure.",
    demoActions: [
      "Start the interactive 'Hallucination Quiz' on the screen with the students.",
      "Go through the hypothetical scenarios and ask the students to vote (A, B, or C) on which response is a hallucination.",
      "Explain the solution keys immediately after they answer."
    ],
    engagementQuestions: [
      "Ask: 'Who has caught ChatGPT or Gemini confidently making up a source, name, or citation?'"
    ],
    proTips: [
      "Never ask an AI for facts about a highly niche topic without feeding it the source text first! Feeding context reduces hallucination rates to nearly 0%."
    ]
  },
  {
    id: "integrated_vs_standalone",
    title: "🏢 Standalone Workspace vs. Custom Apps",
    hook: "Should you use standard ChatGPT/Gemini webs portals, or do you need custom integrations?",
    script: "Contrast standalone portals (generic, copy-paste-heavy, non-secure) with integrated AI systems (built-in, template-locked, continuous context). Integrated systems automatically pull context so you don't have to keep pasting PDF files.",
    demoActions: [
      "Show standard workspace drawbacks vs custom applet utilities on the capability matrix."
    ],
    engagementQuestions: [
      "Ask: 'How much of your day is spent copy-pasting text from one window into another to feed an AI?'"
    ],
    proTips: [
      "If you copy-paste the exact same guidelines more than three times a day, you need a custom system template or an AI Gem."
    ]
  },
  {
    id: "choice_guide",
    title: "🧭 Decision Guide: Which Tool for Which Task?",
    hook: "We have Gemini, NotebookLM, AI Studio, and Sheets. Which one do you actually open first thing in the morning?",
    script: "Analyze the tools matrix. Gemini Pro is your general brainstorm partner. NotebookLM is your closed-book secure research librarian. AI Studio is your prototype development sandbox where you calibrate custom behaviors. Google Workspace embeds are for in-sheet bulk data automation.",
    demoActions: [
      "Walk through the Decision Matrix and highlighting 'Personal Assistant' vs 'Knowledge Hub'."
    ],
    engagementQuestions: [
      "Ask: 'For analyzing 10 legal contracts, which tool wins: ChatGPT, NotebookLM or Gemini Workspace in Gmail?'"
    ],
    proTips: [
      "Always use NotebookLM for bulk document question-and-answering because it pins citations directly to source pages, removing hallucinations entirely."
    ]
  },
  {
    id: "safety_first",
    title: "🔒 AI Safety & Data Security",
    hook: "Is your company's secret customer ledger currently being used to train some public AI model?",
    script: "Discuss safety immediately. Explain that public consumer grade portals may store history for training purposes unless opted out. Emphasize that API connections (like inside this custom built portal) and official corporate environments (Enterprise Workspace) guarantee absolute data privacy.",
    demoActions: [
      "Point to 'What NOT to share' lists on slide.",
      "Demonstrate where safety options live in standard tools."
    ],
    engagementQuestions: [
      "Ask: 'Do you know if your browser's extension is reading your screen data?'"
    ],
    proTips: [
      "Standard Rule: If it shouldn't be printed in a public newspaper, don't paste it into a consumer-grade public chatbot window."
    ]
  }
];

export const SESSION2_PRESENTER_NOTES: PresenterNote[] = [
  {
    id: "workflows_slide",
    title: "⚡ Slide 1: AI-Powered Workflows & Desk Automation",
    hook: "Who wants to reclaim 2 hours of copy-pasting every single day? Let's talk about smart workflows.",
    script: "Review Slide 1 of the Core AI Suite. Introduce the workflow concept: smart automated triage. Describe how an incoming email is captured, categorized via SPICED metrics immediately, matched with custom company playbook instructions, and auto-drafted.",
    demoActions: [
      "Select a scenario in the Interactive Workflow Simulator (e.g. VIP Booking Issue).",
      "Click 'Start Live Automation Sim' and observe the progress bar.",
      "Point out the logs scrolling in real-time as the AI reads, applies custom rules, and drafts a ready-to-use email.",
      "Ensure the students notice how clean and context-aware the generated reply is."
    ],
    engagementQuestions: [
      "Ask: 'How many bookings or coordination emails do you manually review and reply to every week?'"
    ],
    proTips: [
      "Show how structured output helps avoid missing details like critical dates or allergy requirements by forcing the AI to extract them into specific folders."
    ]
  },
  {
    id: "notebook_slide",
    title: "📂 Slide 2: Grounded Corporate Research (NotebookLM)",
    hook: "The classic AI hallucination problem is solved. Rent a secure librarian to search your actual drive documents.",
    script: "Present Slide 2. Explain 'Grounding' in plain language: restricting the AI to ONLY build answers using verified documents you provided, completely blocking general web assumptions. Introduce NotebookLM as an absolute game-changer for student policies, company handbooks, and operational guidelines.",
    demoActions: [
      "Pick a data source on the simulated NotebookLM widget (e.g., Brand Voice Guidelines).",
      "Ask a query or select a preset question like 'What is our check-out policy?'",
      "Click 'Search & Generate Grounded Answer'.",
      "Point to the highlighted green citation tag. Explain that this acts as direct truth-check proof."
    ],
    engagementQuestions: [
      "Ask: 'How much easier would your exams be if you had an assistant that instantly found the slide page containing the answer?'"
    ],
    proTips: [
      "Adding a source PDF directly into NotebookLM builds an custom interactive podcast/audio overview of your textbook automatically! Use this to study during your commute."
    ]
  },
  {
    id: "studio_slide",
    title: "🧪 Slide 3: Behavior Calibration in AI Studio",
    hook: "Let's open the hood and see how developers tweak the temperature and structure of custom assistants.",
    script: "Introduce Slide 3. Demystify technical AI terms. Temperature is 'Creativity Level' (0.0 is robotic/consistent, 1.0 is creative/volatile). System Instructions represent 'Core Rules' that override general chats.",
    demoActions: [
      "Slide the Temperature bar back and forth to show how strictness varies.",
      "Choose a specialized System Rule (e.g. Lead Validation vs Tone Coach) on the simulator.",
      "Click 'Optimize Behavior & Calibrate' to view the immediate differences in system outputs."
    ],
    engagementQuestions: [
      "Ask: 'If you want to validate booking codes, do you set the temperature to 0.0 or 1.0? Why?'"
    ],
    proTips: [
      "For financial reporting, data categorization, and format compliance, always use Temperature 0.0. For brainstorming marketing subject-lines, use 0.9."
    ]
  },
  {
    id: "spiced_origin",
    title: "🎓 Theoretical Deep-Dive: SPICED Framework",
    hook: "SPICED wasn't born in AI; it was created for elite sales teams to capture real human value.",
    script: "Explain the origins of SPICED. Invented by Jacco van der Kooij in 2018 for high-ticket SaaS sales. Walk through the acronym: Situation, Pain, Impact, Critical Event, and Decision. Explain how SPICED differs from general Role/Task/Context: RTC shapes the butler, SPICED shapes the report.",
    demoActions: [
      "Expand the Core Theory block to show the Origin and Comparison.",
      "Emphasize: 'SPICED is an analytical lens. AI uses this lens to highlight what truly matters to a customer.'"
    ],
    engagementQuestions: [
      "Ask: 'Why is understanding a customer\\'s Critical Event (like a product launch) more powerful than just knowing their Pain?'"
    ],
    proTips: [
      "Always prompt Gemini to look for 'Critical Events.' This forces the AI to output time-sensitive urgencies that trigger actions."
    ]
  },
  {
    id: "slides_challenge",
    title: "📊 Google Slides: The Single-Slide Challenge",
    hook: "The worst slides have 10 paragraphs of text. Let's build slides that tell stories with impact.",
    script: "Introduce the Single-Slide design principles: high-contrast layout, whitespace, stark typography, zero clutter, and strong visual hierarchy. Demonstrate how a messy, text-heavy input email is transformed into a gorgeous, presentation-ready single slide using structured extraction.",
    demoActions: [
      "In the Slide Challenge simulator, click on 'Scenario 2: The ROI Proposition'.",
      "Click 'Generate Presentation Layout' and observe the progress states.",
      "Walk the students through the final slide layout on screen. Point out the clear separation, bold typography, and visual pacing."
    ],
    engagementQuestions: [
      "Ask: 'When you watch presentations, how quickly do you tune out when you see a bullet list of 10 long lines?'"
    ],
    proTips: [
      "Rule of thumb: A slide should contain less than 40 words. If you have more, speak them aloud—don't write them down."
    ]
  }
];

export const DEMOLAB_PRESENTER_NOTES: PresenterNote[] = [
  {
    id: "demolab_intro",
    title: "🛠️ Hands-on Practice Lab: Facilitation Guide",
    hook: "Now it's your turn. No more listening—you are in the driver's seat.",
    script: "Instruct students to click on different lab tasks. Explain that this sandbox uses live simulated Gemini prompts and parameters. Their goal is to complete the tasks, adjust temperature controls, and copy refined prompts to their clipboards to test in their own workspaces.",
    demoActions: [
      "Select an active challenge card in the directory.",
      "Demonstrate how to adjust the three core prompt ingredients to pass criteria checks.",
      "Encourage students to tweak input variables live to experience how small prompt changes immediately alter results."
    ],
    engagementQuestions: [
      "Ask: 'Who got their script to output a perfect JSON object on their first run?'"
    ],
    proTips: [
      "Provide walking-around support. Help students who encounter empty outputs by checking if they omitted the 'Context' ingredient from their active drafts."
    ]
  }
];
