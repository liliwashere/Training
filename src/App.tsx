import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Brain, 
  WandSparkles, 
  MessageSquare, 
  ArrowUp, 
  Star, 
  Lock, 
  Search, 
  Terminal, 
  HelpCircle, 
  Globe, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Mail, 
  FileText, 
  Table, 
  Presentation, 
  Workflow, 
  ExternalLink,
  Image,
  Video,
  Mic
} from 'lucide-react';

import { INGREDIENT_CATEGORIES, WORKSPACE_APPS, MESSY_DRAFT_DATA } from './data';
import PromptBuilder from './components/PromptBuilder';
import GemsGallery from './components/GemsGallery';
import HallucinationQuiz from './components/HallucinationQuiz';
import DeepResearch from './components/DeepResearch';
import FeedbackModal from './components/FeedbackModal';

export default function App() {
  const [session, setSession] = useState<'session1' | 'session2'>('session1');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(() => localStorage.getItem('hub_unlocked') === 'true');
  const [accessCode, setAccessCode] = useState('');
  const [accessCodeError, setAccessCodeError] = useState(false);

  // Monitor scroll for 'Back to Top' trigger
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validateAccessCode = () => {
    if (accessCode.trim() === 'paperhouse2026') {
      localStorage.setItem('hub_unlocked', 'true');
      setIsUnlocked(true);
      setAccessCodeError(false);
    } else {
      setAccessCodeError(true);
      setAccessCode('');
    }
  };

  if (!isUnlocked) {
    return (
      <div id="bootcamp-lock-screen" className="min-h-screen flex items-center justify-center bg-slate-50 px-6 font-sans">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-sm flex flex-col items-center gap-6 border border-slate-200"
        >
          <div className="p-4 bg-google-blue rounded-2xl">
            <Lock className="w-7 h-7 text-white" />
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight font-google">
              Google AI Bootcamp
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Enter your access code to continue
            </p>
          </div>

          <div className="w-full flex flex-col gap-3">
            <input
              type="password"
              value={accessCode}
              onChange={(e) => {
                setAccessCode(e.target.value);
                setAccessCodeError(false);
              }}
              onKeyDown={(e) => e.key === 'Enter' && validateAccessCode()}
              placeholder="Access code"
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-google-blue transition ${
                accessCodeError ? 'border-red-400 bg-red-50' : 'border-slate-200'
              }`}
              autoFocus
            />
            {accessCodeError && (
              <p className="text-red-500 text-xs text-center font-medium">
                Incorrect code. Try again.
              </p>
            )}
            <button
              onClick={validateAccessCode}
              className="w-full py-3 bg-google-blue text-white rounded-xl font-semibold text-sm hover:bg-blue-600 transition cursor-pointer"
            >
              Enter
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 font-sans" id="bootcamp-hub-root">
      {/* Navigation Headers */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-google-blue rounded-xl cursor-default select-none">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 leading-tight">
                Google AI Bootcamp <span className="text-google-blue font-medium ml-1">2026</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                by Lilit Arutyunyan · Session 1: 20th of May
              </p>
            </div>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
            <button
              onClick={() => setSession('session1')}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                session === 'session1'
                  ? 'bg-white text-google-blue shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Session 1: Fundamentals
            </button>
            <button
              onClick={() => setSession('session2')}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                session === 'session2'
                  ? 'bg-white text-google-blue shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Next: 18th of June
            </button>
          </div>
        </div>
      </nav>

      {/* Main Core Content container */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {session === 'session1' ? (
              <motion.div
                key="session1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-6 py-12 space-y-16"
              >
                {/* Session Intro */}
                <section className="text-center space-y-6 max-w-4xl mx-auto relative">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="inline-block px-4 py-1.5 rounded-full bg-google-blue/10 text-google-blue text-sm font-bold"
                  >
                    SESSION 1: THE FOUNDATION • 20TH OF MAY
                  </motion.div>
                  <h2 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-google-blue to-google-green tracking-tight font-google">
                    Unlocking the AI Toolbelt
                  </h2>
                  <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
                    From non-tech to AI-Powered. Today we demystify Large Language Models and master the art of the perfect prompt.
                  </p>
                </section>

                {/* What is an LLM block card and comparison grids */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Core concept left card */}
                  <div className="glass-card lg:col-span-1">
                    <div className="secondary-header">Core Concept</div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2 text-slate-800">
                      <Brain className="w-6 h-6 text-google-red" />
                      What is an LLM?
                    </h3>
                    <p className="text-base text-slate-600 mb-6 leading-relaxed">
                      LLMs (Large Language Models) are complex algorithms trained on vast amounts of text. Think of it as <strong>The World's Most Powerful Auto-Complete</strong>.
                    </p>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <p className="text-sm text-slate-500 mb-2 leading-relaxed">
                          It doesn't "know" facts like a person. It predicts the next most likely character based on patterns it saw during training.
                        </p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-sm shadow-inner text-slate-800">
                        <div className="text-slate-400 mb-2">// How it thinks</div>
                        <div className="flex flex-wrap gap-2">
                          <span className="opacity-50">"The</span>
                          <span className="text-google-blue font-bold">next</span>
                          <span className="opacity-50">word</span>
                          <span className="opacity-50">is</span>
                          <span className="bg-google-green text-white px-1.5 py-0.5 rounded animate-pulse font-semibold">predicted</span>
                          <span className="opacity-50">based</span>
                          <span className="opacity-50">on</span>
                          <span className="opacity-50">context."</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right comparison grids */}
                  <div className="glass-card lg:col-span-2">
                    <div className="secondary-header">Comparison</div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                      <Sparkles className="w-6 h-6 text-google-yellow" />
                      Word Predictors vs. Thinking Machines
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left: Phone Keyboard prediction */}
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2 tracking-wide">
                            <span className="w-2 h-2 bg-slate-300 rounded-full" />
                            Standard Predictor (Phone Keyboard)
                          </div>
                          <p className="text-sm font-medium text-slate-600 mb-4">"How are..."</p>
                          <div className="flex flex-wrap gap-1.5">
                            {['you', 'things', 'the kids', 'your day', 'we doing', 'you today', 'your plans'].map((term) => (
                              <span key={term} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 shadow-sm">
                                {term}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-4 leading-relaxed border-t border-slate-200/50 pt-3">
                          Looks at the last 1-2 words. Simple statistics. It predicts the most likely literal word based on frequency, with zero context.
                        </p>
                      </div>

                      {/* Right: Gemini AI prediction */}
                      <div className="p-5 bg-google-blue/5 rounded-2xl border border-google-blue/20 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-bold text-google-blue uppercase mb-3 flex items-center gap-2 tracking-wide">
                            <span className="w-2 h-2 bg-google-blue rounded-full animate-pulse" />
                            Thinking Machine (Gemini)
                          </div>
                          <p className="text-sm font-medium mb-4 italic text-slate-700">
                            "Based on the customer's 5-star review, we should..."
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <div className="relative group/highlight">
                              <span className="px-3 py-1 bg-google-blue text-white rounded-lg text-xs font-bold shadow-md flex items-center gap-1 select-none">
                                highlight the staff
                                <Sparkles className="w-3 h-3 text-google-yellow" />
                              </span>
                              <div className="absolute -top-12 left-0 bg-slate-800 text-white text-[10px] p-2 rounded-lg whitespace-nowrap opacity-0 group-hover/highlight:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl border border-white/10">
                                Reasoning: Context shows customer praised "Sarah's service".
                              </div>
                            </div>
                            <span className="px-3 py-1 bg-white border border-google-blue/10 rounded-lg text-xs font-medium text-slate-600 shadow-sm">
                              offer a loyalty discount
                            </span>
                            <span className="px-3 py-1 bg-white border border-google-blue/10 rounded-lg text-xs font-medium text-slate-400 shadow-sm">
                              personalize their next visit
                            </span>
                            <span className="px-3 py-1 bg-white border border-google-blue/10 rounded-lg text-xs font-medium text-slate-400 shadow-sm">
                              draft a personalized thank you
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-google-blue/60 mt-4 leading-relaxed border-t border-google-blue/10 pt-3">
                          Considers the entire training set. It understands that "5-star" implies high satisfaction, and "staff recognition" is the most professional response to praise.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Definition callout block */}
                <section className="max-w-4xl mx-auto space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-bold font-google text-slate-800">
                      But wait... What is a Prompt?
                    </h3>
                    <p className="text-slate-500 mt-2">
                      Before we dive into the lab, let's define the core language of AI.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass-card bg-white border-l-4 border-l-google-blue">
                      <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-google-blue">
                        <MessageSquare className="w-5 h-5" />
                        The Definition
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        A <strong>Prompt</strong> is the instruction or input you give to an AI model to get a specific output. Think of it as the steering wheel of the LLM. Small turns in your wording lead to completely different destinations.
                      </p>
                    </div>

                    <div className="glass-card-dark text-white bg-slate-900 border-l-4 border-l-google-yellow">
                      <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-google-yellow">
                        <WandSparkles className="w-5 h-5" />
                        The Golden Rule
                      </h4>
                      <p className="text-lg text-slate-200 leading-relaxed font-semibold italic">
                        "Garbage In, Garbage Out."
                      </p>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        If your prompt is vague, the AI's response will be generic. Precision is your superpower.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Prompting Framework Instructions */}
                <section className="space-y-12">
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-bold font-google text-slate-800">
                      The Prompting Lab
                    </h3>
                    <p className="text-slate-500 mt-2">
                      Better input = Better output. Follow the 3-Ingredient Framework.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {INGREDIENT_CATEGORIES.map((cat, sIdx) => (
                      <motion.div
                        whileHover={{ y: -5 }}
                        key={cat.label}
                        className="glass-card bg-white flex flex-col justify-between border-slate-200"
                      >
                        <div>
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-google-blue font-bold shadow-sm">
                            {sIdx + 1}
                          </div>
                          <h4 className="text-xl font-bold mb-2 text-slate-800">{cat.label}</h4>
                          <p className="text-sm text-slate-500 mb-4 leading-relaxed">{cat.description}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl text-xs italic text-slate-600 border border-slate-200/50">
                          "{cat.example}"
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Lethargic vs Pro comparisons and prompt builder */}
                  <div className="max-w-5xl mx-auto space-y-6">
                    <div className="text-center font-bold text-slate-400 text-xs uppercase tracking-[0.2em] mb-4">
                      Interactive Transformation
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                      {/* Lethargic prompt visual container */}
                      <div className="glass-card bg-white border-google-red/20 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-2 mb-4 text-google-red">
                          <AlertTriangle className="w-5 h-5 animate-pulse" />
                          <span className="font-bold uppercase text-[10px] tracking-widest">
                            The "Lethargic" Prompt
                          </span>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 font-mono italic text-sm shadow-inner">
                          "Write a newsletter for the team about our event."
                        </div>
                        <div className="mt-6 space-y-2">
                          <div className="text-xs font-bold text-slate-500">Why it fails:</div>
                          <ul className="text-xs text-slate-400 space-y-2">
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-google-red rounded-full" />
                              No specific role defined
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-google-red rounded-full" />
                              Vague task: How long? What tone?
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-google-red rounded-full" />
                              Zero context: When is it? Who are winners?
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Pro prompt wrapper */}
                      <div className="glass-card-dark text-white bg-slate-900 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4">
                          <Sparkles className="w-7 h-7 text-google-yellow group-hover:scale-125 transition-transform" />
                        </div>
                        <div className="flex items-center gap-2 mb-4 text-google-green">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="font-bold uppercase text-[10px] tracking-widest">
                            The "Pro" Prompt
                          </span>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 font-mono text-xs leading-relaxed space-y-2 text-slate-200">
                          <span className="text-google-blue-light font-bold">Act as a Senior Internal Comms Manager.</span>
                          <br />
                          <span className="text-google-green font-bold">Draft a 300-word newsletter for the Marketing team about our June company event.</span>
                          <br />
                          <span className="text-google-yellow font-bold italic">Name-check the winners (Sales Team), and mention the 15% discount for attendees. Tone: High-energy and celebratory.</span>
                        </div>

                        <div className="mt-6 flex gap-3 text-slate-300">
                          <div className="flex-1 p-2.5 bg-white/5 rounded-lg border border-white/5 text-[10px] text-center">
                            <div className="text-google-blue-light font-bold">ROLE</div>
                            <div className="text-slate-400 opacity-80 mt-0.5">Persona</div>
                          </div>
                          <div className="flex-1 p-2.5 bg-white/5 rounded-lg border border-white/5 text-[10px] text-center">
                            <div className="text-google-green font-bold">TASK</div>
                            <div className="text-slate-400 opacity-80 mt-0.5">Clear Output</div>
                          </div>
                          <div className="flex-1 p-2.5 bg-white/5 rounded-lg border border-white/5 text-[10px] text-center">
                            <div className="text-google-yellow font-bold">CONTEXT</div>
                            <div className="text-slate-400 opacity-80 mt-0.5">Specific Data</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive builder block mount */}
                  <div className="max-w-5xl mx-auto pt-8">
                    <PromptBuilder />
                  </div>
                </section>

                {/* Tips row section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-card border-l-4 border-l-google-blue bg-white">
                    <h3 className="text-2xl font-bold mb-4 text-slate-800">Prompting Prompts (Pro Tip)</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                      Meta-prompting is the secret of senior users. Ask Gemini to help you write better prompts.
                    </p>
                    <div className="space-y-2">
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm italic text-slate-700 shadow-inner">
                        "Help me improve my prompt. I want to draft a newsletter for our upcoming team event. Ask me 3 clarifying questions first."
                      </div>
                    </div>
                  </div>

                  <div className="glass-card border-l-4 border-l-google-yellow bg-white">
                    <h3 className="text-2xl font-bold mb-4 text-slate-800">The "Thinking" Model</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                      When logic matters more than speed. Use Gemini 2.0 Thinking in AI Studio for complex strategy.
                    </p>
                    <ul className="text-sm space-y-3 text-slate-500">
                      <li className="flex items-center gap-2 font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-google-green shrink-0" />
                        Corrects its own errors
                      </li>
                      <li className="flex items-center gap-2 font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-google-green shrink-0" />
                        Shows the "Chain of Thought"
                      </li>
                      <li className="flex items-center gap-2 font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-google-green shrink-0" />
                        Ideal for mapping messy data
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Quiz section card */}
                <section className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white shadow-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <span className="text-google-red font-bold tracking-widest text-xs uppercase block">
                        Safety & Risks
                      </span>
                      <h3 className="text-3xl font-bold font-google tracking-tight text-white leading-tight">
                        Understanding Hallucinations
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Because LLMs predict the "next most likely character," they can sometimes generate confident falsehoods. This is called a <strong>Hallucination</strong>.
                      </p>
                      
                      <div className="space-y-5 border-t border-white/10 pt-6">
                        <div className="flex gap-4 items-start">
                          <div className="p-2 bg-google-red/20 rounded-lg text-google-red mt-1 shrink-0">
                            <AlertTriangle className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-bold text-white text-sm">The Pattern Matcher Error</h5>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                              The AI finds a pattern that doesn't exist in reality, but sounds plausible.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-start">
                          <div className="p-2 bg-google-green/20 rounded-lg text-google-green mt-1 shrink-0">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-bold text-white text-sm">The Solution: Thinking & Grounding</h5>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                              Use models that show their "Chain of Thought" or use "Search Grounding" to verify facts.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                        Click to Test your Intuition:
                      </div>
                      <HallucinationQuiz />
                    </div>
                  </div>
                </section>

                {/* Gemini Standalone vs Workspace modules */}
                <section className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-bold font-google text-slate-800">
                      Gemini: Standalone vs. Integrated
                    </h3>
                    <p className="text-slate-500 mt-2">
                      Where you work dictates how you prompt. Use the side-panel for context-aware help.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Standalone card block */}
                    <div className="glass-card bg-white border-l-4 border-l-google-blue">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-google-blue/10 rounded-lg">
                          <Sparkles className="w-5 h-5 text-google-blue" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-800">Gemini Standalone</h4>
                      </div>
                      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                        Best for broad brainstorming, deep research, and complex multi-step reasoning. The "unlimited" sandbox for your creativity.
                        <span className="block mt-2 font-bold text-google-blue">
                          Pro Tip: Use 'Thinking Mode' here for strategy!
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href="https://gemini.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-google-blue text-white shadow-google-blue/20 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Open gemini.google.com
                        </a>
                      </div>
                    </div>

                    {/* Integrated column block */}
                    <div className="glass-card bg-slate-50 border-l-4 border-l-google-green">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-google-green/10 rounded-lg">
                          <Layers className="w-5 h-5 text-google-green" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-800">Integrated Workspace</h4>
                      </div>
                      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                        Best for finishing tasks WHERE you work. The Side Panel sees your Doc/Sheet/Slide and provides context-aware edits.
                        <span className="block mt-2 font-bold text-google-green">
                          Pro Tip: Highlight text and ask "Help me rewrite".
                        </span>
                      </p>

                      {/* Mini links apps gallery widgets */}
                      <div className="grid grid-cols-3 gap-3">
                        {WORKSPACE_APPS.slice(1).map((appInfo) => (
                          <a
                            key={appInfo.app}
                            href={appInfo.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card bg-white border border-slate-200 p-4 rounded-xl flex flex-col items-center justify-center text-center transition-all hover:border-google-blue hover:shadow-md cursor-pointer group"
                          >
                            <div className="p-2.5 bg-slate-50 rounded-full mb-2 group-hover:scale-110 transition-transform">
                              {appInfo.app === 'Docs' && <FileText className="w-5 h-5 text-google-blue" />}
                              {appInfo.app === 'Sheets' && <Table className="w-5 h-5 text-google-green" />}
                              {appInfo.app === 'Slides' && <Presentation className="w-5 h-5 text-google-red" />}
                            </div>
                            <h5 className="font-bold font-google text-slate-800 text-[10.5px] leading-tight">
                              {appInfo.app} Demo
                            </h5>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Choosing the right Gemini comparison section cards */}
                <section className="space-y-8 max-w-5xl mx-auto">
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-bold font-google text-slate-800">
                      Choosing the Right Gemini
                    </h3>
                    <p className="text-slate-500 mt-2">
                      Multiple tools, one brain. Here is how to decide which version to open.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-google-blue mb-4 flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          Gemini Standalone (gemini.google.com)
                        </h4>
                        <div className="space-y-3">
                          <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm">
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-1">
                              Pick this when:
                            </span>
                            <p className="text-xs text-slate-700 leading-relaxed">
                              You are starting from zero. You need to brainstorm a strategy, research a complex market trend, or have a long conversation where the AI remembers everything you've said.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10.5px] text-blue-600 font-bold uppercase tracking-wider mt-4">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        Strategic & Deep Creative Work
                      </div>
                    </div>

                    <div className="p-6 bg-green-50/50 rounded-3xl border border-green-100 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-google-green mb-4 flex items-center gap-2">
                          <Layers className="w-5 h-5" />
                          Integrated Workspace (Side Panel)
                        </h4>
                        <div className="space-y-3">
                          <div className="bg-white p-4 rounded-2xl border border-green-100 shadow-sm">
                            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest block mb-1">
                              Pick this when:
                            </span>
                            <p className="text-xs text-slate-700 leading-relaxed">
                              You are already "in the flow" of a document or spreadsheet. You need to rewrite a specific paragraph, analyze data in your current sheet, or draft slides based on some text.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10.5px] text-green-600 font-bold uppercase tracking-wider mt-4">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        Frictionless Contextual Editing
                      </div>
                    </div>
                  </div>

                  {/* The Efficiency Ratio */}
                  <div className="glass-card-dark text-white bg-slate-900 border-none p-6 md:p-10 rounded-[2rem]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center cursor-default">
                      <div>
                        <h4 className="text-xl font-bold text-google-yellow mb-2 font-google">
                          The Efficiency Ratio
                        </h4>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          We've found that top-performing teams split their time between <strong>Tactical Execution</strong> (using AI inside your tools) and <strong>Strategic Deep-Work</strong> (using the full chat interface).
                        </p>
                        <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-xl">
                          <p className="text-[10px] text-slate-400 leading-tight">
                            <span className="text-google-yellow font-bold uppercase tracking-tighter mr-2">
                              Study Insight:
                            </span>
                            This 60/40 balance prevents "Context Switching Fatigue" by keeping 60% of tasks within your existing workflow, while reserving 40% for dedicated building and planning.
                          </p>
                        </div>
                      </div>
                      <div className="flex bg-white/10 p-2 rounded-2xl gap-2">
                        <div className="flex-1 text-center p-3">
                          <div className="text-2xl font-bold mb-1 text-google-blue-light">60%</div>
                          <div className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">
                            In-App Extension
                          </div>
                        </div>
                        <div className="w-px bg-white/10 self-stretch" />
                        <div className="flex-grow text-center p-3">
                          <div className="text-2xl font-bold mb-1 text-google-yellow">40%</div>
                          <div className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">
                            Main Chat Hub
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Decision Guide Component */}
                <section className="space-y-8 max-w-5xl mx-auto">
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-bold font-google text-slate-800">
                      Decision Guide: Which Tool When?
                    </h3>
                    <p className="text-slate-500 mt-2">
                      Sometimes two tools feel the same. Here's how to break the tie.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Gemini Chat */}
                    <div className="glass-card bg-white border-b-4 border-b-google-blue flex flex-col justify-between border-slate-200">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <MessageSquare className="w-5 h-5 text-google-blue" />
                          <h4 className="font-bold text-slate-800">Gemini Chat</h4>
                        </div>
                        <p className="text-xs text-slate-500 mb-4 font-medium uppercase tracking-widest">
                          The "Conversationalist"
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                          Best for <strong>unstructured exploration</strong>. Use this when you have a messy problem and need to talk it through like a mentor.
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-xl text-[10px] text-blue-700 font-bold border border-blue-100">
                        Choose this for: Brainstorming, drafting, and general inquiries.
                      </div>
                    </div>

                    {/* Google AI Studio */}
                    <div className="glass-card bg-white border-b-4 border-b-google-yellow relative overflow-hidden flex flex-col justify-between border-slate-200">
                      <div className="absolute top-2 right-2">
                        <span className="bg-google-yellow/20 text-google-yellow text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                          Session 2 Preview
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Terminal className="w-5 h-5 text-google-yellow" />
                          <h4 className="font-bold text-slate-800">Google AI Studio</h4>
                        </div>
                        <p className="text-xs text-slate-500 mb-4 font-medium uppercase tracking-widest">
                          The "Precision Lab"
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                          Best for <strong>repeatable quality</strong>. Use this when you need to pin down exact system instructions or test long files (2M tokens).
                        </p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-xl text-[10px] text-yellow-700 font-bold border border-yellow-100">
                        Choose this for: Rapid prototyping, testing "Zero-Shot" accuracy, and heavy lifting.
                      </div>
                    </div>

                    {/* NotebookLM */}
                    <div className="glass-card bg-white border-b-4 border-b-google-green relative overflow-hidden flex flex-col justify-between border-slate-200">
                      <div className="absolute top-2 right-2">
                        <span className="bg-google-green/20 text-google-green text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                          Session 2 Preview
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <HelpCircle className="w-5 h-5 text-google-green" />
                          <h4 className="font-bold text-slate-800">NotebookLM</h4>
                        </div>
                        <p className="text-xs text-slate-500 mb-4 font-medium uppercase tracking-widest">
                          The "Internal Expert"
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                          Best for <strong>grounded facts</strong>. Use this when you want the AI to ONLY answer from your specific PDFs and links.
                        </p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-xl text-[10px] text-green-700 font-bold border border-green-100">
                        Choose this for: Researching company manuals, legal texts, and creating "Deep Dive" podcasts.
                      </div>
                    </div>
                  </div>

                  {/* The "Tie-Breaker" Logic */}
                  <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-6 lg:p-10">
                    <h4 className="text-base md:text-lg font-bold text-center mb-4 flex items-center justify-center gap-2 font-google text-slate-800">
                      <Sparkles className="w-4 h-4 text-google-blue" />
                      The "Tie-Breaker" Logic
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gemini Pro vs. AI Studio?</div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          If you want to save a prompt for later reuse with "System Instructions," go to <strong>AI Studio</strong>. If you just want a quick answer, stay in <strong>Gemini Chat</strong>.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gemini Pro vs. NotebookLM?</div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          If the answer is in the news or the public web, use <strong>Gemini Pro</strong>. If the answer is in a private 100-page PDF handbook, use <strong>NotebookLM</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Capability Matrix Section */}
                <section className="glass-card border-slate-200 shadow-sm bg-white max-w-5xl mx-auto">
                  <div className="mb-6">
                    <h4 className="font-bold text-slate-400 text-[9px] uppercase tracking-[0.2em] mb-1">
                      Comparison Guide
                    </h4>
                    <h3 className="text-xl font-bold text-slate-800 font-google">
                      Capability Matrix
                    </h3>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-100">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50/50">
                        <tr className="border-b border-slate-200 animate-none">
                          <th className="text-left py-3 px-4 text-slate-400 font-bold uppercase text-[9px] tracking-widest font-sans">
                            Workflow
                          </th>
                          <th className="py-3 px-4 text-google-blue font-bold text-center text-[11px] uppercase tracking-wider font-sans">
                            Gemini Chat
                          </th>
                          <th className="py-3 px-4 text-google-green font-bold text-center text-[11px] uppercase tracking-wider font-sans">
                            NotebookLM
                          </th>
                          <th className="py-3 px-4 text-google-yellow font-bold text-center text-[11px] uppercase tracking-wider font-sans">
                            AI Studio
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4 font-medium text-slate-600">Chat & Drafting</td>
                          <td className="py-4 px-4 text-center">✅</td>
                          <td className="py-4 px-4 text-center text-slate-200">❌</td>
                          <td className="py-4 px-4 text-center text-slate-400">Manual</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4 font-medium text-slate-600">Document Analysis</td>
                          <td className="py-4 px-4 text-center text-slate-400">Limited</td>
                          <td className="py-4 px-4 text-center">✅</td>
                          <td className="py-4 px-4 text-center text-slate-400">Partial</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4 font-medium text-slate-600">Automations</td>
                          <td className="py-4 px-4 text-center text-slate-400">Limited</td>
                          <td className="py-4 px-4 text-center text-slate-200">❌</td>
                          <td className="py-4 px-4 text-center">✅</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4 font-medium text-slate-600">Agent Building</td>
                          <td className="py-4 px-4 text-center">✅</td>
                          <td className="py-4 px-4 text-center text-slate-400">Static</td>
                          <td className="py-4 px-4 text-center">✅</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200/40 text-center">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      Pro Tip: Use Gemini Chat for brainstorming, NotebookLM for research, and AI Studio for building.
                    </p>
                  </div>
                </section>

                {/* AI Safety: What NOT to share */}
                <section className="glass-card bg-amber-50/50 border-amber-200 max-w-5xl mx-auto">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="p-4 bg-white rounded-3xl shadow-sm border border-amber-100 shrink-0">
                      <AlertTriangle className="w-12 h-12 text-google-red" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-slate-800 font-google">
                        AI Safety: What NOT to share
                      </h3>
                      <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                        AI models learn from your inputs (unless in Enterprise mode). Never share sensitive customer PII, private passwords, or confidential company source code.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <span className="flex items-center gap-2 text-xs font-bold text-google-red bg-red-50 px-3 py-1.5 rounded-xl border border-red-100">
                          <AlertTriangle className="w-4 h-4" /> Credit Cards
                        </span>
                        <span className="flex items-center gap-2 text-xs font-bold text-google-red bg-red-50 px-3 py-1.5 rounded-xl border border-red-100">
                          <AlertTriangle className="w-4 h-4" /> Full Names & PII
                        </span>
                        <span className="flex items-center gap-2 text-xs font-bold text-google-red bg-red-50 px-3 py-1.5 rounded-xl border border-red-100">
                          <AlertTriangle className="w-4 h-4" /> Private Passwords
                        </span>
                        <span className="flex items-center gap-2 text-xs font-bold text-google-red bg-red-50 px-3 py-1.5 rounded-xl border border-red-100">
                          <AlertTriangle className="w-4 h-4" /> API Keys & Hub Secrets
                        </span>
                        <span className="flex items-center gap-2 text-xs font-bold text-google-red bg-red-50 px-3 py-1.5 rounded-xl border border-red-100">
                          <AlertTriangle className="w-4 h-4" /> Internal Financial Data
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Gems & Deep Research */}
                <section className="space-y-8 max-w-7xl mx-auto">
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-bold font-google text-slate-800">
                      Gems & Deep Research
                    </h3>
                    <p className="text-slate-500 mt-2">
                      Specialized experts and live web intelligence at your fingertips.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    <div className="lg:col-span-2 h-full">
                      <GemsGallery />
                    </div>
                    <div className="lg:col-span-1 h-full">
                      <DeepResearch />
                    </div>
                  </div>
                </section>

                {/* Multimodality 2.0 Section */}
                <section className="space-y-8 max-w-5xl mx-auto">
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-bold font-google text-slate-800">
                      Multimodality 2.0
                    </h3>
                    <p className="text-slate-500 mt-2">
                      Uploading eyes and ears to your AI model.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card text-center group bg-white border-slate-200">
                      <div className="p-3 bg-red-100 text-red-600 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Image className="w-6 h-6 text-google-red" />
                      </div>
                      <h5 className="font-bold mb-2 text-slate-800 font-google">Image Gen & Analysis</h5>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        Generate stunning brand assets with Imagen 3 or upload high-res property photos for instant quality audits.
                      </p>
                    </div>

                    <div className="glass-card text-center group bg-white border-slate-200">
                      <div className="p-3 bg-blue-100 text-blue-600 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Video className="w-6 h-6 text-google-blue" />
                      </div>
                      <h5 className="font-bold mb-2 text-slate-800 font-google">Video Reasoning</h5>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        Upload recordings or training videos. Ask: "Summarize the key moments in this video."
                      </p>
                    </div>

                    <div className="glass-card text-center group bg-white border-slate-200">
                      <div className="p-3 bg-purple-100 text-purple-600 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mic className="w-6 h-6 text-purple-600" />
                      </div>
                      <h5 className="font-bold mb-2 text-slate-800 font-google">Voice & Audio</h5>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        Record a brainstorm and have Gemini clean it up, or transcribe a recording into actionable meeting minutes.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Demo Prep Section */}
                <section className="space-y-8 max-w-5xl mx-auto pb-12">
                  <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold font-google text-slate-800">
                        Demo Prep: The Meeting Meltdown
                      </h3>
                      <p className="text-slate-500">
                        Transforming disorganized brainstorm notes into a clear project plan.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href="https://gemini.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-google-blue hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-white" />
                        Open Gemini
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="glass-card md:col-span-1 bg-white border-slate-200">
                      <h4 className="font-bold text-google-red mb-2 uppercase text-[10px] tracking-widest leading-none">
                        Input: Raw Notes
                      </h4>
                      <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 text-amber-900 font-serif italic text-sm shadow-inner leading-relaxed">
                        "{MESSY_DRAFT_DATA.messyDraft}"
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                      <div className="glass-card !p-0 overflow-hidden bg-white border-slate-200">
                        <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                          <span className="font-bold text-slate-800 text-xs flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-google-blue" />
                            Coordination Prompt
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(MESSY_DRAFT_DATA.prompt);
                            }}
                            className="text-[10px] bg-white text-slate-600 px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm active:scale-95 font-bold cursor-pointer"
                          >
                            Copy Prompt
                          </button>
                        </div>
                        <div className="p-6 bg-slate-50/50 font-mono text-xs leading-relaxed text-slate-700">
                          {MESSY_DRAFT_DATA.prompt}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </motion.div>
            ) : (
              /* Session 2 (Next / Recap View) */
              <motion.div
                key="session2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-6 py-12 space-y-16"
              >
                {/* Header overview */}
                <section className="text-center space-y-6 max-w-4xl mx-auto">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-google-blue/10 text-google-blue text-sm font-bold uppercase">
                    SESSION 1 RECAP: 20TH MAY
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight font-google">
                    The Journey So Far 🚀
                  </h2>
                  <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto animate-fade">
                    We've transitioned from being passive users to AI power-users. Here's a quick look at what we mastered in our first session.
                  </p>

                  {/* Summary grid list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 text-left">
                    <div className="glass-card bg-white flex gap-4 items-start shadow-sm border-slate-200">
                      <div className="p-3 bg-google-red/10 rounded-2xl shrink-0">
                        <Brain className="w-6 h-6 text-google-red" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-base mb-1">LLM Fundamentals</h4>
                        <p className="text-xs text-slate-500 italic leading-relaxed">
                          "The World's Most Powerful Auto-Complete"
                        </p>
                      </div>
                    </div>

                    <div className="glass-card bg-white flex gap-4 items-start shadow-sm border-slate-200">
                      <div className="p-3 bg-google-blue/10 rounded-2xl shrink-0">
                        <WandSparkles className="w-6 h-6 text-google-blue" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-base mb-1">Prompt Engineering</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Context, Persona, Task, and Constraints for reproducible quality.
                        </p>
                      </div>
                    </div>

                    <div className="glass-card bg-white flex gap-4 items-start shadow-sm border-slate-200">
                      <div className="p-3 bg-google-yellow/10 rounded-2xl shrink-0">
                        <Sparkles className="w-6 h-6 text-google-yellow" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-base mb-1">The Decision Guide</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Choosing between Gemini Chat, AI Studio, and NotebookLM.
                        </p>
                      </div>
                    </div>

                    <div className="glass-card bg-white flex gap-4 items-start shadow-sm border-slate-200">
                      <div className="p-3 bg-google-green/10 rounded-2xl shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-google-green" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-base mb-1">Hallucination Management</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Understanding limits and ensuring reliability via Grounding.
                        </p>
                      </div>
                    </div>

                    <div className="glass-card bg-white flex gap-4 items-start shadow-sm border-slate-200">
                      <div className="p-3 bg-google-blue/10 rounded-2xl shrink-0">
                        <Layers className="w-6 h-6 text-google-blue" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-base mb-1">Custom Gems</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Creating persistent "Gems" as specialist AI assistants for your team.
                        </p>
                      </div>
                    </div>

                    <div className="glass-card bg-white flex gap-4 items-start shadow-sm border-slate-200">
                      <div className="p-3 bg-google-red/10 rounded-2xl shrink-0">
                        <Terminal className="w-6 h-6 text-google-red" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-base mb-1">System Instructions</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Mastering the underlying rules that define AI behavior.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Future Teaser cards sections */}
                <section className="glass-card-dark text-white bg-slate-900 p-8 md:p-12 shadow-2xl relative overflow-hidden text-center rounded-[3rem]">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Sparkles className="w-32 h-32 text-google-blue" />
                  </div>
                  <div className="relative z-10 space-y-6">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-google-blue-light font-bold">
                      Coming Up Next
                    </div>
                    <h3 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                      Session 2: Hyper-Scale Research
                    </h3>
                    <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
                      In our next session, we focus on <strong>Long-Context Intelligence</strong>: How to upload 2,000+ pages of documentation or complex datasets and query them with 100% accuracy using <strong>NotebookLM</strong> and <strong>AI Studio</strong>.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-12">
                      <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                        <Workflow className="w-8 h-8 text-google-blue mb-4 animate-pulse" />
                        <h4 className="font-bold text-lg mb-2">Workflows & Automations</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Building multi-step support chains that connect Gemini to your internal data.
                        </p>
                      </div>

                      <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                        <HelpCircle className="w-8 h-8 text-google-green mb-4" />
                        <h4 className="font-bold text-lg mb-2">NotebookLM</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Turning large-scale documents and data sources into a private "Living Brain" for each team.
                        </p>
                      </div>

                      <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                        <Terminal className="w-8 h-8 text-google-yellow mb-4" />
                        <h4 className="font-bold text-lg mb-2">AI Studio</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Prototyping high-precision prompts using Google's raw developer environment.
                        </p>
                      </div>
                    </div>

                    <div className="pt-8 text-center">
                      <button
                        onClick={() => setIsFeedbackOpen(true)}
                        className="inline-flex items-center gap-2 bg-google-blue px-8 py-3 rounded-full font-bold text-base shadow-lg hover:bg-blue-600 transition-all group cursor-pointer text-white"
                      >
                        <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform text-white" />
                        Share Bootcamp Feedback
                      </button>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
      </main>

      {/* Support footer drawer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-google font-bold mb-4">Training Support</h4>
            <p className="text-xs leading-relaxed">
              Need help? Send an email to{' '}
              <a href="mailto:hello@lilitarutyunyan.com" className="text-google-blue font-bold hover:underline">
                hello@lilitarutyunyan.com
              </a>{' '}
              or message me on GChat.
            </p>
          </div>

          <div>
            <h4 className="text-white font-google font-bold mb-4">Tools</h4>
            <ul className="text-xs space-y-2">
              <li>
                <a href="https://gemini.google.com" target="_blank" rel="noreferrer" className="hover:text-google-blue transition-colors flex items-center gap-1">
                  Gemini Pro <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://notebooklm.google.com" target="_blank" rel="noreferrer" className="hover:text-google-blue transition-colors flex items-center gap-1">
                  NotebookLM <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="hover:text-google-blue transition-colors flex items-center gap-1">
                  Google AI Studio <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          <div className="text-right flex flex-col items-end justify-between">
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="mb-4 flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold rounded-xl border border-white/10 transition-all uppercase tracking-wider cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-google-blue" />
              Share Feedback
            </button>
            <p className="text-[10px] text-slate-500">
              © 2026 Interactive Workshop · All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Scroll To Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[60] p-4 bg-google-blue text-white rounded-full shadow-2xl hover:bg-blue-600 transition-all group cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mounting feedback modal overlay */}
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </div>
  );
}
