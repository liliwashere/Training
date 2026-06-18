import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Brain, 
  Search, 
  Wand2, 
  ArrowUp,
  Lock,
  CheckCircle2, 
  XCircle, 
  Zap, 
  Cpu, 
  MessageSquare, 
  Workflow, 
  ArrowRight,
  ChevronDown,
  Info,
  ExternalLink,
  Mail,
  FileText,
  Table,
  Presentation,
  BookOpen,
  Layout,
  Mic,
  Copy,
  Terminal,
  Star,
  Send,
  X,
  Image as ImageIcon,
  Video,
  Layers,
  FlaskConical,
  Play,
  Pause,
  RefreshCw,
  Volume2
} from 'lucide-react';
import { cn } from './lib/utils';
import { InteractiveProbabilitySandbox } from './components/InteractiveProbabilitySandbox';
import { InteractiveSpeedVsReasoning } from './components/InteractiveSpeedVsReasoning';
import { InteractiveWorkspaceArena } from './components/InteractiveWorkspaceArena';
import { 
  PROMPT_INGREDIENTS, 
  PROMPT_GENERATOR_OPTIONS,
  GEMS_DEMO,
  GEMS_EXAMPLES,
  SESSION1_DEMO, 
  HALLUCINATION_QUIZ, 
  WORKSPACE_DEMOS 
} from './constants';
import { SessionType } from './types';
import { 
  SESSION1_PRESENTER_NOTES, 
  SESSION2_PRESENTER_NOTES, 
  DEMOLAB_PRESENTER_NOTES,
  PresenterNote
} from './presenter_notes';

export default function App() {
  const [isPresenter, setIsPresenter] = useState(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const isPresenterQuery = searchParams.get('presenter') === 'true' || searchParams.has('presentor');
      const isPresenterHash = window.location.hash.includes('presenter');
      const isStoredPresenter = localStorage.getItem('bootcamp_presenter') === 'true';
      return isPresenterQuery || isPresenterHash || isStoredPresenter;
    }
    return false;
  });

  const [session, setSession] = useState<SessionType>('session1');
  const [showPresenterNotes, setShowPresenterNotes] = useState(false);
  const [showPresenterPanel, setShowPresenterPanel] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Sync session and notes visibility if presenter state changes
  React.useEffect(() => {
    if (!isPresenter) {
      setShowPresenterNotes(false);
      if (session === 'demolab') {
        setSession('session1');
      }
    }
  }, [isPresenter, session]);

  // Scroll to top visibility handler
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30">
      {/* Dynamic Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-material-outline px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer select-none group"
            onDoubleClick={() => {
              const nextVal = !isPresenter;
              setIsPresenter(nextVal);
              localStorage.setItem('bootcamp_presenter', String(nextVal));
            }}
            title="Double-click to toggle Presenter Console"
          >
            <div className="p-2 bg-google-blue rounded-xl cursor-pointer select-none group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 leading-tight flex items-center gap-2">
                Google AI Bootcamp <span className="text-google-blue font-medium">2026</span>
                {isPresenter && (
                  <span className="text-[9px] bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider scale-90 animate-pulse">
                    Host
                  </span>
                )}
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                {session === 'session1' && "BY LILIT ARUTYUNYAN • SESSION 1: 20TH OF MAY"}
                {session === 'session2' && "BY LILIT ARUTYUNYAN • SESSION 2: 18TH OF JUNE"}
                {session === 'demolab' && "BY LILIT ARUTYUNYAN • HANDS-ON DEMO LAB"}
              </p>
            </div>
          </div>
               <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-2xl border border-material-outline">
              <button
                onClick={() => setSession('session1')}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer",
                  session === 'session1' ? "bg-white text-google-blue shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                Session 1: Fundamentals
              </button>
              <button
                onClick={() => setSession('session2')}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer",
                  session === 'session2' ? "bg-white text-google-blue shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                Session 2: Advanced
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow flex flex-col lg:flex-row relative overflow-x-hidden">
        <main className={cn(
          "flex-grow transition-all duration-300 w-full min-h-screen",
          showPresenterNotes ? "lg:mr-[400px]" : ""
        )}>
          <AnimatePresence mode="wait">
            {session === 'session1' && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-6 py-12"
              >
                <SessionOneContent />
              </motion.div>
            )}
            {session === 'session2' && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-6 py-12"
              >
                <SessionTwoContent />
              </motion.div>
            )}
            {session === 'demolab' && (
              <motion.div
                key="demolab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-6 py-12"
              >
                <DemoLabContent />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Presenter Sidebar */}
        <AnimatePresence>
          {showPresenterNotes && (
            <PresenterNotesSidePanel session={session} onClose={() => setShowPresenterNotes(false)} />
          )}
        </AnimatePresence>
      </div>

      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-google mb-4">Training Support</h4>
            <p className="text-sm">Need help? Send an email to <a href="mailto:hello@lilitarutyunyan.com" className="text-google-blue font-bold">hello@lilitarutyunyan.com</a> or message me on GChat.</p>
          </div>
          <div>
            <h4 className="text-white font-google mb-4">Tools</h4>
            <ul className="text-sm space-y-2">
              <li><a href="https://gemini.google.com" className="hover:text-google-blue">Gemini Pro</a></li>
              <li><a href="https://notebooklm.google.com" className="hover:text-google-blue">NotebookLM</a></li>
              <li><a href="https://aistudio.google.com" className="hover:text-google-blue">Google AI Studio</a></li>
            </ul>
          </div>
          <div className="text-right flex flex-col items-end">
            <button 
              onClick={() => setIsFeedbackOpen(true)}
              className="mb-4 flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all uppercase tracking-widest"
            >
              <MessageSquare className="w-3 h-3 text-google-blue" />
              Share Feedback
            </button>
            <p className="text-xs">© 2026 Interactive Workshop</p>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[60] p-4 bg-google-blue text-white rounded-full shadow-2xl hover:bg-blue-600 transition-colors group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
            <motion.div 
              className="absolute -top-12 right-0 bg-slate-800 text-white text-[10px] py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
              layout
            >
              Back to Top
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Feedback Modal */}
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />

      {/* Sleek, Separate Floating Host Hub (Only for Presenter Mode) */}
      {isPresenter && (
        <div className="fixed bottom-8 left-8 z-[70] flex flex-col items-start gap-3 select-none">
          <AnimatePresence>
            {showPresenterPanel && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                className="bg-slate-900 border border-slate-800 text-white p-5 rounded-2xl shadow-2xl space-y-4 w-72 text-left"
              >
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    Host Controls
                  </span>
                  <button 
                    onClick={() => setShowPresenterPanel(false)}
                    className="text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setShowPresenterNotes(!showPresenterNotes);
                    }}
                    className={cn(
                      "w-full px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-between border cursor-pointer",
                      showPresenterNotes 
                        ? "bg-amber-500 text-slate-950 border-amber-500 font-extrabold" 
                        : "bg-slate-800 text-slate-350 border-slate-700 hover:bg-slate-700"
                    )}
                  >
                    <span className="font-sans">Presenter Side Notes</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/10 font-mono">{showPresenterNotes ? "ON" : "OFF"}</span>
                  </button>

                  <button
                    onClick={() => {
                      setSession(session === 'demolab' ? 'session1' : 'demolab');
                    }}
                    className={cn(
                      "w-full px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-between border cursor-pointer",
                      session === 'demolab'
                        ? "bg-google-green text-slate-950 border-google-green font-extrabold"
                        : "bg-slate-800 text-slate-350 border-slate-700 hover:bg-slate-700"
                    )}
                  >
                    <span className="font-sans">🛠 Demo Practice Lab</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/10 font-mono">{session === 'demolab' ? "LAB ACTIVE" : "OFF"}</span>
                  </button>
                </div>
                <div className="text-[10px] text-slate-400 leading-normal font-sans pt-1">
                  These toggles are completely hidden from standard participants. Use double-click on the main header logo to completely toggle Host status.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setShowPresenterPanel(!showPresenterPanel)}
            className="p-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-amber-400 hover:text-amber-300 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-transform active:scale-95 duration-200"
            title="Sleek Host Center"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

function SessionOneContent() {
  return (
    <div className="space-y-16">
      {/* Intro Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto relative">
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="inline-block px-4 py-1.5 rounded-full bg-google-blue/10 text-google-blue text-sm font-bold"
        >
          SESSION 1: THE FOUNDATION • 20TH OF MAY
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-google-blue to-google-green">
          Unlocking the AI Toolbelt
        </h2>
        <p className="text-base text-slate-600">
          From non-tech to AI-Powered. Today we demystify Large Language Models 
          and master the art of the perfect prompt.
        </p>
      </section>

      {/* What is LLM Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-card lg:col-span-1 border-slate-200/60 shadow-xs">
          <div className="secondary-header bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block">Core Concept</div>
          <h3 className="text-2xl font-bold mb-4 mt-2 flex items-center gap-2 text-slate-800">
            <Brain className="w-6 h-6 text-google-red shrink-0" />
            What is an LLM?
          </h3>
          <p className="text-base text-slate-600 mb-4 leading-relaxed font-sans">
            A Large Language Model is the **World's Most Powerful Auto-Complete**. It maps patterns, not facts.
          </p>
          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-150">
               <p className="text-xs text-slate-500 leading-relaxed font-medium">✨ <strong>How it acts:</strong> Predicts the next most likely word based on patterns seen during training, rather than human conscious memory.</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-150 font-mono text-xs">
              <div className="text-slate-400 mb-1.5">// Probability Model</div>
              <div className="flex flex-wrap gap-1.5 text-slate-700">
                <span className="opacity-40">"The</span>
                <span className="text-google-blue font-bold">next</span>
                <span className="opacity-40">word</span>
                <span className="opacity-40">is</span>
                <span className="bg-google-green text-white px-1.5 py-0.5 rounded text-[11px]">predicted</span>
                <span className="opacity-40">using</span>
                <span className="opacity-40">context."</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card lg:col-span-2">
          <div className="secondary-header">Comparison</div>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-google-yellow" />
            Word Predictors vs. Thinking Machines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-sm font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-300 rounded-full"></span> 
                Standard Predictor (Phone Keyboard)
              </div>
              <p className="text-sm font-medium mb-4">"How are..."</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-sm">you</span>
                <span className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-sm">things</span>
                <span className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-sm">the kids</span>
                <span className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-sm">your day</span>
                <span className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-sm">we doing</span>
                <span className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-sm">you today</span>
                <span className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-sm">your plans</span>
              </div>
              <p className="text-xs text-slate-400 mt-4 leading-normal">
                Uses raw frequency of the last 1-2 words. Zero deep understanding.
              </p>
            </div>
            
            <div className="p-5 bg-google-blue/5 rounded-2xl border border-google-blue/20">
              <div className="text-sm font-bold text-google-blue uppercase mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-google-blue rounded-full animate-pulse"></span> 
                Thinking Machine (Gemini)
              </div>
              <p className="text-sm font-medium mb-4 italic">"Based on the guest's 5-star review, we should..."</p>
              <div className="flex flex-wrap gap-2">
                <div className="relative group/highlight">
                  <span className="px-3 py-1 bg-google-blue text-white rounded-lg text-sm font-bold shadow-md flex items-center gap-1">
                    highlight the staff
                    <Sparkles className="w-3 h-3 text-google-yellow" />
                  </span>
                  <div className="absolute -top-10 left-0 bg-slate-800 text-white text-[10px] p-2 rounded-lg whitespace-nowrap opacity-0 group-hover/highlight:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                    Reasoning: Context shows guest praised "Sarah's service".
                  </div>
                </div>
                <span className="px-3 py-1 bg-white border border-google-blue/10 rounded-lg text-sm font-medium text-slate-600">offer a loyalty discount</span>
                <span className="px-3 py-1 bg-white border border-google-blue/10 rounded-lg text-sm font-medium text-slate-500">personalize their next visit</span>
                <span className="px-3 py-1 bg-white border border-google-blue/10 rounded-lg text-sm font-medium text-slate-500">draft a personalized thank you</span>
              </div>
              <p className="text-xs text-google-blue/60 mt-4 leading-normal">
                Analyzes the full context. Logically connects the review sentiment with corporate response playbooks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What is a Prompt Section */}
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold font-google">But wait... What is a Prompt?</h3>
          <p className="text-slate-500 mt-2">Before we dive into the lab, let's define the core language of AI.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card bg-white border-l-4 border-l-google-blue">
            <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-google-blue">
              <MessageSquare className="w-5 h-5" />
              The Definition
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              A **Prompt** is the instruction or input you give to an AI model to get a specific output. 
              Think of it as the steering wheel of the LLM. 
              Small turns in your wording lead to completely different destinations.
            </p>
          </div>
          
          <div className="glass-card-dark text-white">
             <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-google-yellow">
              <Wand2 className="w-5 h-5" />
              The Golden Rule
            </h4>
            <p className="text-base text-slate-300 leading-relaxed italic">
              "Garbage In, Garbage Out."
            </p>
            <p className="text-sm text-slate-400 mt-2">
              If your prompt is vague, the AI's response will be generic. 
              Precision is your superpower.
            </p>
          </div>
        </div>
      </section>

      {/* Prompting Lab */}
      <section className="space-y-12">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold font-google">The Prompting Lab</h3>
          <p className="text-slate-500 mt-2">Better input = Better output. Follow the 3-Ingredient Framework.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROMPT_INGREDIENTS.map((ing, i) => (
            <motion.div 
              key={ing.label}
              whileHover={{ y: -5 }}
              className="glass-card flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-google-blue font-bold">
                  {i + 1}
                </div>
                <h4 className="text-xl font-bold mb-2">{ing.label}</h4>
                <p className="text-sm text-slate-500 mb-4">{ing.description}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl text-sm italic text-slate-700">
                "{ing.example}"
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bad vs Good Comparison */}
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center font-bold text-slate-400 text-sm uppercase tracking-widest">Interactive Transformation</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* The Bad Prompt */}
            <div className="glass-card bg-white border-google-red/20 opacity-80 hover:opacity-100">
              <div className="flex items-center gap-2 mb-4 text-google-red">
                <XCircle className="w-5 h-5" />
                <span className="font-bold uppercase text-xs tracking-tighter">The "Lethargic" Prompt</span>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 font-mono italic">
                "Write a newsletter about the padel tournament for the team."
              </div>
              <div className="mt-6 space-y-2">
                <div className="text-xs font-bold text-slate-500">Why it fails:</div>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-google-red rounded-full" /> No specific role defined</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-google-red rounded-full" /> Vague task: How long? What tone?</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-google-red rounded-full" /> Zero context: When is it? Who are winners?</li>
                </ul>
              </div>
            </div>

            {/* The Good Prompt */}
            <div className="glass-card-dark text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                <Sparkles className="w-6 h-6 text-google-yellow group-hover:scale-125 transition-transform" />
              </div>
              <div className="flex items-center gap-2 mb-4 text-google-green">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-bold uppercase text-xs tracking-tighter">The HiJiffy "Pro" Prompt</span>
              </div>
              
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 font-mono text-xs leading-relaxed space-y-2">
                <span className="text-google-blue font-bold">Act as a Senior Internal Comms Manager.</span><br/>
                <span className="text-google-green font-bold">Draft a 300-word newsletter for the HiJiffy Hospitality team about our June Padel Tournament.</span><br/>
                <span className="text-google-yellow font-bold italic">Include the final scores, name-check the winners (Sales Team), and mention the 15% discount at the bar for attendees. Tone: High-energy and celebratory.</span>
              </div>

              <div className="mt-6 flex gap-3">
                <div className="flex-1 p-2 bg-white/5 rounded-lg border border-white/5 text-[10px] text-center">
                  <div className="text-google-blue font-bold">ROLE</div>
                  <div className="text-white/40">Expert Persona</div>
                </div>
                <div className="flex-1 p-2 bg-white/5 rounded-lg border border-white/5 text-[10px] text-center">
                  <div className="text-google-green font-bold">TASK</div>
                  <div className="text-white/40">Clear Output</div>
                </div>
                <div className="flex-1 p-2 bg-white/5 rounded-lg border border-white/5 text-[10px] text-center">
                  <div className="text-google-yellow font-bold">CONTEXT</div>
                  <div className="text-white/40">Specific Data</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Prompt Builder */}
        <div className="max-w-5xl mx-auto pt-8">
           <PromptBuilder />
        </div>
      </section>

      {/* Advanced Prompting & Thinking Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card border-l-4 border-l-google-blue">
          <h3 className="text-2xl font-bold mb-4">Prompting Prompts (Pro Tip)</h3>
          <p className="text-slate-600 mb-6">
            Meta-prompting is the secret of senior users. Ask Gemini to help you write better prompts.
          </p>
          <div className="space-y-2">
            <div className="p-3 bg-white border border-slate-200 rounded-xl text-sm italic text-slate-700">
              "Help me improve my prompt. I want to draft a newsletter for our Padel tournament. 
              Ask me 3 clarifying questions first."
            </div>
          </div>
        </div>
        
        <div className="glass-card border-l-4 border-l-google-yellow">
          <h3 className="text-2xl font-bold mb-4">The "Thinking" Model</h3>
          <p className="text-slate-600 mb-6 font-medium">
            When logic matters more than speed. Use Gemini 2.0 Thinking in AI Studio for complex strategy.
          </p>
          <ul className="text-sm space-y-2 text-slate-500">
            <li className="flex items-center gap-2 font-medium text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-google-green" /> Corrects its own errors
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-google-green" /> Shows the "Chain of Thought"
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-google-green" /> Ideal for mapping messy hospitality data
            </li>
          </ul>
        </div>
      </div>

      {/* Hallucinations Section */}
      <section className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-google-red font-bold tracking-widest text-sm uppercase">Safety & Risks</span>
            <h3 className="text-2xl md:text-3xl font-bold font-google">Understanding Hallucinations</h3>
            <p className="text-slate-400">
              Because LLMs predict the "next most likely character," they can sometimes generate 
              confident falsehoods. This is called a **Hallucination**.
            </p>
            <div className="space-y-4">
               <div className="flex gap-4 items-start">
                  <div className="p-2 bg-google-red/20 rounded-lg text-google-red mt-1">
                    <XCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold">The Pattern Matcher Error</h5>
                    <p className="text-xs text-slate-400">The AI finds a pattern that doesn't exist in reality, but sounds plausible.</p>
                  </div>
               </div>
               <div className="flex gap-4 items-start">
                  <div className="p-2 bg-google-green/20 rounded-lg text-google-green mt-1">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold">The Solution: Thinking & Grounding</h5>
                    <p className="text-xs text-slate-400">Use models that show their "Chain of Thought" or use "Search Grounding" to verify facts.</p>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Click to Test your Intuition:</div>
            {HALLUCINATION_QUIZ.map((item, idx) => (
              <HallucinationCard key={idx} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Standalone vs Integrated Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold font-google">Gemini: Standalone vs. Integrated</h3>
          <p className="text-slate-500 mt-2">Where you work dictates how you prompt. Use the side-panel for context-aware help.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card bg-white border-l-4 border-l-google-blue">
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-google-blue/10 rounded-lg">
                  <ExternalLink className="w-5 h-5 text-google-blue" />
               </div>
               <h4 className="text-xl font-bold">Gemini Standalone</h4>
            </div>
            <p className="text-base text-slate-500 mb-6">
              Best for broad brainstorming, deep research, and complex multi-step reasoning. 
              The "unlimited" sandbox for your creativity. 
              <span className="block mt-2 font-bold text-google-blue">Pro Tip: Use 'Thinking Mode' here for strategy!</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <DemoButton label="Open gemini.google.com" href="https://gemini.google.com" color="blue" />
            </div>
          </div>

          <div className="glass-card bg-slate-50 border-l-4 border-l-google-green">
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-google-green/10 rounded-lg">
                  <Layout className="w-5 h-5 text-google-green" />
               </div>
               <h4 className="text-xl font-bold">Integrated Workspace</h4>
            </div>
            <p className="text-sm text-slate-500 mb-6">
              Best for finishing tasks WHERE you work. The Side Panel sees your Doc/Sheet/Slide 
              and provides context-aware edits.
              <span className="block mt-2 font-bold text-google-green">Pro Tip: Highlight text and ask "Help me rewrite".</span>
            </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {WORKSPACE_DEMOS.slice(1).map((demo) => (
                <a 
                  key={demo.app}
                  href={demo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card bg-white border border-slate-200 p-4 rounded-xl flex flex-col items-center text-center transition-all hover:border-google-blue hover:shadow-md"
                >
                  <div className="p-3 bg-slate-50 rounded-full mb-3">
                    {demo.app === 'Docs' && <FileText className="w-6 h-6 text-google-blue" />}
                    {demo.app === 'Sheets' && <Table className="w-6 h-6 text-google-green" />}
                    {demo.app === 'Slides' && <Presentation className="w-6 h-6 text-google-red" />}
                  </div>
                  <h5 className="font-bold font-google text-sm mb-1">{demo.app} Demo</h5>
                  <p className="text-[10px] text-slate-400 mb-0 h-8 flex items-center justify-center">{demo.useCase}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tool Selection Guide Section */}
      <section className="space-y-8 max-w-5xl mx-auto">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold font-google">Choosing the Right Gemini</h3>
          <p className="text-slate-500 mt-2">Multiple tools, one brain. Here is how to decide which version to open.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50">
            <h4 className="font-bold text-google-blue mb-4 flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Gemini Standalone (gemini.google.com)
            </h4>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-2xl border border-blue-100">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-1">Pick this when:</span>
                <p className="text-sm text-slate-700 leading-relaxed">
                  You are starting from zero. You need to brainstorm a strategy, research a complex market trend, or have a long conversation where the AI remembers everything you've said.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-600 font-medium">
                <CheckCircle2 className="w-4 h-4" /> Strategic & Deep Creative Work
              </div>
            </div>
          </div>

          <div className="p-6 bg-green-50/50 rounded-3xl border border-green-100/50">
            <h4 className="font-bold text-google-green mb-4 flex items-center gap-2">
              <Layout className="w-5 h-5" />
              Integrated Workspace (Side Panel)
            </h4>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-2xl border border-green-100">
                <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest block mb-1">Pick this when:</span>
                <p className="text-sm text-slate-700 leading-relaxed">
                  You are already "in the flow" of a document or spreadsheet. You need to rewrite a specific paragraph, analyze data in your current sheet, or draft an email based on a calendar meeting.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
                <CheckCircle2 className="w-4 h-4" /> Tactical & Context-Aware Editing
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card-dark text-white border-none p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center cursor-default">
            <div>
              <h4 className="text-xl font-bold text-google-yellow mb-2">The Efficiency Ratio</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                We've found that top-performing teams split their time between <strong>Tactical Execution</strong> (using AI inside your tools) and <strong>Strategic Deep-Work</strong> (using the full chat interface).
              </p>
              <div className="mt-4 p-4.5 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-1.5 shadow-sm">
                <div className="text-[10px] text-google-yellow font-extrabold uppercase tracking-widest">
                  Study Insight
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                  Developing a hybrid workflow of 60% in-app execution and 40% dedicated chat prevents "Context Switching Fatigue." This keeps you in a flow state for daily drafts while reserving deep focus for complex planning.
                </p>
                <div className="text-[9px] text-slate-500 italic mt-1 font-medium">
                  Source: Google Workspace Productivity Lab & Harvard Business Review on Cognitive Load
                </div>
              </div>
            </div>
            <div className="flex bg-white/10 p-2 rounded-2xl gap-2">
              <div className="flex-1 text-center p-3">
                <div className="text-2xl font-bold mb-1 text-google-blue">60%</div>
                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">In-App Extension</div>
              </div>
              <div className="w-px bg-white/10 self-stretch" />
              <div className="flex-1 text-center p-3">
                <div className="text-2xl font-bold mb-1 text-google-yellow">40%</div>
                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Main Chat Hub</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Selection Deep Dive */}
      <section className="space-y-8 max-w-5xl mx-auto">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold font-google">Decision Guide: Which Tool When?</h3>
          <p className="text-slate-500 mt-2">Sometimes two tools feel the same. Here's how to break the tie.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card bg-white border-b-4 border-b-google-blue">
            <div className="flex items-center gap-2 mb-4">
               <MessageSquare className="w-5 h-5 text-google-blue" />
               <h4 className="font-bold">Gemini Chat</h4>
            </div>
            <p className="text-xs text-slate-500 mb-4 font-medium uppercase tracking-widest">The "Conversationalist"</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Best for <strong>unstructured exploration</strong>. Use this when you have a messy problem and need to talk it through like a mentor.
            </p>
            <div className="p-3 bg-blue-50 rounded-xl text-[10px] text-blue-700 font-bold">
               Choose this for: Brainstorming, drafting, and general inquiries.
            </div>
          </div>

          <div className="glass-card bg-white border-b-4 border-b-google-yellow relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <span className="bg-google-yellow/20 text-google-yellow text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">Covered in Session 2</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
               <FlaskConical className="w-5 h-5 text-google-yellow" />
               <h4 className="font-bold">Google AI Studio</h4>
            </div>
            <p className="text-xs text-slate-500 mb-4 font-medium uppercase tracking-widest">The "Precision Lab"</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Best for <strong>repeatable quality</strong>. Use this when you need to pin down exact system instructions or test long files (2M tokens).
            </p>
            <div className="p-3 bg-yellow-50 rounded-xl text-[10px] text-yellow-700 font-bold">
               Choose this for: Rapid prototyping, testing "Zero-Shot" accuracy, and heavy lifting.
            </div>
          </div>

          <div className="glass-card bg-white border-b-4 border-b-google-green relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <span className="bg-google-green/20 text-google-green text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">Covered in Session 2</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
               <BookOpen className="w-5 h-5 text-google-green" />
               <h4 className="font-bold">NotebookLM</h4>
            </div>
            <p className="text-xs text-slate-500 mb-4 font-medium uppercase tracking-widest">The "Internal Expert"</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Best for <strong>grounded facts</strong>. Use this when you want the AI to ONLY answer from your specific PDFs and links.
            </p>
            <div className="p-3 bg-green-50 rounded-xl text-[10px] text-green-700 font-bold">
               Choose this for: Researching company manuals, legal texts, and creating "Deep Dive" podcasts.
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-6 lg:p-10">
           <h4 className="text-base md:text-lg font-bold text-center mb-4 flex items-center justify-center gap-2 font-google text-slate-800">
             <Zap className="w-4 h-4 text-google-blue" />
             The "Tie-Breaker" Logic
           </h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500">Gemini Pro vs. AI Studio?</div>
                <p className="text-sm text-slate-600">If you want to save a prompt for later reuse with "System Instructions," go to <strong>AI Studio</strong>. If you just want a quick answer, stay in <strong>Gemini Chat</strong>.</p>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500">Gemini Pro vs. NotebookLM?</div>
                <p className="text-sm text-slate-600">If the answer is in the news or the public web, use <strong>Gemini Pro</strong>. If the answer is in a private 100-page PDF handbook, use <strong>NotebookLM</strong>.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Toolbox: Quick Reference */}
      <section className="glass-card border-slate-200 shadow-sm bg-white">
        <div className="mb-6">
          <h4 className="font-bold text-slate-400 text-[9px] uppercase tracking-[0.2em] mb-1">Comparison Guide</h4>
          <h3 className="text-xl font-bold text-slate-800">Capability Matrix</h3>
        </div>
        
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-sm">
            <thead className="bg-slate-50/50">
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-4 text-slate-400 font-bold uppercase text-[9px] tracking-widest">Workflow</th>
                <th className="py-3 px-4 text-google-blue font-bold text-center">Gemini Chat</th>
                <th className="py-3 px-4 text-google-green font-bold text-center">NotebookLM</th>
                <th className="py-3 px-4 text-google-yellow font-bold text-center">AI Studio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-4 font-medium text-slate-600">Guest Support</td>
                <td className="py-4 px-4 text-center">✅</td>
                <td className="py-4 px-4 text-center text-slate-200">❌</td>
                <td className="py-4 px-4 text-center text-slate-400">Manual</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-4 font-medium text-slate-600">Manual Analysis</td>
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

      {/* Privacy & Safety Section */}
      <section className="glass-card bg-amber-50 border-amber-200">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="p-4 bg-white rounded-3xl shadow-sm">
            <XCircle className="w-12 h-12 text-google-red" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">AI Safety: What NOT to share</h3>
            <p className="text-slate-600 mb-4">
              AI models learn from your inputs (unless in Enterprise mode). Never share sensitive guest PII, 
              private passwords, or confidential HiJiffy source code.
            </p>
        <div className="flex flex-wrap gap-4">
          <span className="flex items-center gap-2 text-sm font-bold text-google-red">
            <XCircle className="w-5 h-5" /> Credit Cards
          </span>
          <span className="flex items-center gap-2 text-sm font-bold text-google-red">
            <XCircle className="w-5 h-5" /> Full Names & PII
          </span>
          <span className="flex items-center gap-2 text-sm font-bold text-google-red">
            <XCircle className="w-5 h-5" /> Private Passwords
          </span>
          <span className="flex items-center gap-2 text-sm font-bold text-google-red">
            <XCircle className="w-5 h-5" /> API Keys & Hub Secrets
          </span>
          <span className="flex items-center gap-2 text-sm font-bold text-google-red">
            <XCircle className="w-5 h-5" /> Internal Financial Data
          </span>
        </div>
          </div>
        </div>
      </section>

      {/* Gems Interactive & Deep Research Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold font-google">Gems & Deep Research</h3>
          <p className="text-slate-500 mt-2">Specialized experts and live web intelligence at your fingertips.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GemInteractive />
          </div>

          <div className="lg:col-span-1">
            <DeepResearchCard />
          </div>
        </div>
      </section>

      {/* Multimodality 2.0 */}
      <section className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold font-google">Multimodality 2.0</h3>
          <p className="text-slate-500 mt-2">Uploading eyes and ears to your AI model.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card text-center group">
            <div className="p-3 bg-red-100 text-red-600 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h5 className="font-bold mb-2">Image Gen & Analysis</h5>
            <p className="text-sm text-slate-500 mb-4">Generate stunning brand assets with Imagen 3 or upload high-res property photos for instant quality audits.</p>
          </div>

          <div className="glass-card text-center">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <h5 className="font-bold mb-2">Video Reasoning</h5>
            <p className="text-sm text-slate-500">Upload security footage or training videos. Ask: "At what time does the guest enter the lobby?"</p>
          </div>

          <div className="glass-card text-center">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Mic className="w-6 h-6" />
            </div>
            <h5 className="font-bold mb-2">Voice & Audio</h5>
            <p className="text-sm text-slate-500">Record a brainstorm and have Gemini clean it up, or transcribe a recording into actionable meeting minutes.</p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold font-google">Demo Prep: The Meeting Meltdown</h3>
            <p className="text-slate-500">Transforming disorganized brainstorm notes into a clear project plan.</p>
          </div>
          <div className="flex gap-2">
             <DemoButton label="Open Gemini" href="https://gemini.google.com" color="blue" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card md:col-span-1">
            <h4 className="font-bold text-google-red mb-2 uppercase text-xs tracking-widest">Input: Raw Notes</h4>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 font-sans italic text-sm md:text-base shadow-xs">
              "{SESSION1_DEMO.messyDraft}"
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-4">
            <div className="glass-card !p-0 overflow-hidden">
               <div className="bg-slate-100 px-6 py-4 border-b border-material-outline flex justify-between items-center">
                  <span className="font-bold text-sm flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-google-blue" />
                    Coordination Prompt
                  </span>
                  <button 
                    onClick={() => navigator.clipboard.writeText(SESSION1_DEMO.prompt)}
                    className="text-xs bg-white px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm active:scale-95"
                  >
                    Copy Prompt
                  </button>
               </div>
               <div className="p-6 bg-slate-50 font-mono text-sm leading-relaxed text-slate-800">
                  {SESSION1_DEMO.prompt}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Session 1 Outro */}
    </div>
  );
}

function SessionOneQASection() {
  const [activeQA, setActiveQA] = useState<'voice' | 'branding'>('voice');

  // Voice Sandbox State
  const [activeVoice, setActiveVoice] = useState<'executive' | 'sales' | 'support'>('executive');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Brand Campaign State
  const [assetType, setAssetType] = useState<'social' | 'header' | 'flyer' | 'product'>('social');
  const [brandStyle, setBrandStyle] = useState<'luxury' | 'tech' | 'organic' | 'energy'>('luxury');
  const [campaignFocus, setCampaignFocus] = useState<'wellness' | 'booking' | 'checkin' | 'dining'>('wellness');

  const [copiedText, setCopiedText] = useState<string | null>(null);

  const triggerCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Simulated Voice progress loop
  React.useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            return 100;
          }
          return prev + 2.5;
        });
      }, 150);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying]);

  React.useEffect(() => {
    if (audioProgress >= 100) {
      setIsPlaying(false);
    }
  }, [audioProgress]);

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (audioProgress >= 100) {
        setAudioProgress(0);
      }
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setAudioProgress(0);
  };

  // Voices configuration
  const voiceData = {
    executive: {
      name: "The Executive Guide",
      description: "Measured, elegant, deep register with steady cadence. Instills strong authority.",
      stability: 64,
      clarity: 88,
      style: 15,
      toolstack: "ElevenLabs Professional Voice Cloning + Descript",
      prompt: "A professional, authoritative female voice with deep, rich undertones, slow and deliberate pacing, crystal clear articulation, and an elegant, comforting British corporate tone."
    },
    sales: {
      name: "The Energetic Comms Coach",
      description: "High energy, enthusiastic, rising inflections, quick conversational tempo. Boosts sales drive.",
      stability: 45,
      clarity: 92,
      style: 40,
      toolstack: "ElevenLabs Instant Voice Cloning + HeyGen / Rask",
      prompt: "A lively, charismatic male voice with positive, upbeat intonation, high enthusiasm, @Comms Coach style guidelines, fast-paced rhythm, and a warm, approachable modern tone perfect for B2B product pitch."
    },
    support: {
      name: "The Empathetic Customer Advisor",
      description: "Gentle volume, compassionate tone, soft sibilant, reassuring and highly conversational pace.",
      stability: 75,
      clarity: 80,
      style: 10,
      toolstack: "Descript Overdub / ElevenLabs Reader App",
      prompt: "A soft, reassuring male voice, gentle speaking volume, highly caring and emotional tone, moderate-to-slow speed, natural breathing pauses, conveying deep empathy and trustworthiness."
    }
  };

  // Brand Material compilation helper
  const brandData = {
    luxury: {
      name: "Elite Obsidian & Gold",
      cssBg: "bg-slate-950 text-amber-500",
      accent: "text-amber-400 bg-amber-400",
      border: "border-amber-500/30",
      pillBg: "bg-amber-400/10 text-amber-400",
      badge: "ULTRA LUXURY RESERVE",
      font: "font-sans font-semibold",
      grid: "bg-zinc-900 border-amber-900/40 text-amber-100",
      palette: "Obsidian Slate (#0F0F0F), Satin Gold (#D4AF37), Warm Champagne (#F5E6CA)",
      promptStyle: "commercial photography, deep matte obsidian black background, gleaming satin gold reflective accents, volumetric golden glow lighting, ultra-luxury aesthetic, captured on Hasselblad 100c, 85mm lens"
    },
    tech: {
      name: "Midnight Azure & Emerald",
      cssBg: "bg-slate-900 text-emerald-400",
      accent: "text-emerald-400 bg-emerald-400",
      border: "border-emerald-500/30",
      pillBg: "bg-emerald-400/10 text-emerald-400",
      badge: "SMART NETWORK TECH",
      font: "font-mono",
      grid: "bg-slate-950 border-blue-900/40 text-blue-100",
      palette: "Midnight Blue (#0A192F), Neon Emerald (#10B981), Glacier Teal (#00FAC7)",
      promptStyle: "clean tech aesthetic, minimalist cool azure blue background, vibrant neon green laser tracing, sharp glass reflections, high-tech interface glows, captured on digital medium format, architectural geometry"
    },
    organic: {
      name: "Cozy Terracotta & Sage",
      cssBg: "bg-[#faf6f0] text-stone-800",
      accent: "text-emerald-700 bg-emerald-700",
      border: "border-stone-200",
      pillBg: "bg-emerald-800/10 text-emerald-800",
      badge: "ORGANIC & BIOPHILIC",
      font: "font-sans",
      grid: "bg-stone-50 border-stone-200 text-stone-850",
      palette: "Soft Terracotta Clay (#C86A4B), Calming Sage (#8F9779), Warm Ivory (#FAF6F0)",
      promptStyle: "warm biophilic organic styling, cozy terracotta earthenware textures, rich sage green foliage silhouettes, soft morning sunlight casting organic leaf shadows, luxury spa hotel, shot on 35mm film, hyper-realistic"
    },
    energy: {
      name: "Cyberpunk Rose & Violet",
      cssBg: "bg-slate-950 text-fuchsia-400",
      accent: "text-fuchsia-400 bg-fuchsia-400",
      border: "border-fuchsia-500/30",
      pillBg: "bg-fuchsia-400/10 text-fuchsia-400",
      badge: "DYNAMIC VELOCITY",
      font: "font-sans font-bold",
      grid: "bg-purple-950/40 border-fuchsia-900/40 text-fuchsia-100",
      palette: "Vibrant Fuchsia (#FF007F), Electric Violet (#8B2635), Neon Magenta (#EA00D9)",
      promptStyle: "cyberpunk vaporwave design concept, intense fuchsia neon glow, back-lit deep ultraviolet glass, hyper-saturated pinks and electric purples, dynamic volumetric fog, cinematic commercial studio photography"
    }
  };

  const assetData = {
    social: { name: "Social Ad Banner (1:1)", specs: "1080 x 1080 px", scale: "w-44 h-44", promptShape: "square ratio 1:1, centralized composition" },
    header: { name: "Email News Header (16:9)", specs: "1920 x 1080 px", scale: "w-56 h-32", promptShape: "landscape ratio 16:9, cinematic wide-angle framing" },
    flyer: { name: "Promo Flyer A4 (4:5)", specs: "800 x 1000 px", scale: "w-36 h-48", promptShape: "portrait ratio 4:5, editorial composition with copy-ready space" },
    product: { name: "Hero Showcase Banner (16:9)", specs: "1920 x 1080 px", scale: "w-56 h-32", promptShape: "product showcase layout, shallow depth of field --ar 16:9" }
  };

  const campaignFocusData = {
    wellness: {
      title: "Wellness Retreat Launch",
      heading: "Find Your Perfect Sanctuary",
      keywords: "serene luxury wellness spa pool, calming palm trees, relaxing atmosphere, healing vibes"
    },
    booking: {
      title: "Direct Booking Copilot",
      heading: "Frictionless Booking is Here",
      keywords: "sleek modern tablet device on a clean minimalist desk, warm chat interaction, conversational AI on screen, direct hotel reservations"
    },
    checkin: {
      title: "Keyless Checking-In",
      heading: "Unlock Your Room Instantly",
      keywords: "futuristic electronic keyless entry lock, warm night-time ambient lighting, hand holding smartphone displaying digital check-in complete"
    },
    dining: {
      title: "Gourmet Culinary Hall",
      heading: "A Symphony of Local Flavors",
      keywords: "exquisite fine-dining plating close-up, luxury restaurant table setting, candlelight, out-of-focus beautiful dining room background"
    }
  };

  // Compile prompt dynamically based on states
  const compiledImagePrompt = `A professional, high-fidelity ${assetData[assetType].promptShape} representing "${campaignFocusData[campaignFocus].title}". Subject: ${campaignFocusData[campaignFocus].keywords}. Styled in "${brandData[brandStyle].name}" visual palette featuring: ${brandData[brandStyle].promptStyle}. Absolutely no text on image. Clean and atmospheric, copy-ready empty negative space, high-end commercial branding photoshoot --q 2 --v 6.0`;

  const compiledCopyPrompt = `Act as an Elite Conversational Copywriter. Draft a high-converting ${assetData[assetType].name} marketing copy for our campaign about "${campaignFocusData[campaignFocus].title}". 
Target Audience: Discerning modern Travelers seeking high-speed friction-free experiences.
Core Message: "${campaignFocusData[campaignFocus].heading}".
Brand Vibe Palette matching "${brandData[brandStyle].name}": Utilize writing tones that evoke this visual mood.
Include a compelling Hook, 3 scannable bullet benefits of this service, and a single urgent CTA. Keep the length optimal.`;

  return (
    <section className="space-y-8 max-w-5xl mx-auto pt-10 border-t border-slate-200">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-google-blue/10 border border-google-blue/20 rounded-full text-google-blue text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" /> Session 1 Live Spotlights
        </div>
        <h3 className="text-3xl font-bold font-google text-slate-800">Answers & Interactive Sandboxes</h3>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
          Based on the most popular questions asked during our Session 1 discussions, we built interactive playgrounds to help you master these production workflows instantly.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 max-w-md mx-auto justify-center gap-6">
        <button
          onClick={() => setActiveQA('voice')}
          className={cn(
            "pb-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap",
            activeQA === 'voice' ? "border-google-blue text-google-blue font-bold" : "border-transparent text-slate-400 hover:text-slate-600"
          )}
        >
          <Video className="w-4 h-4 shrink-0" /> 1. Video Voice Dubbing
        </button>
        <button
          onClick={() => setActiveQA('branding')}
          className={cn(
            "pb-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap",
            activeQA === 'branding' ? "border-google-blue text-google-blue font-bold" : "border-transparent text-slate-400 hover:text-slate-600"
          )}
        >
          <Layers className="w-4 h-4 shrink-0" /> 2. Branded Material Creator
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeQA === 'voice' ? (
          <motion.div
            key="voice"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Context & Q&A part */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-3xl">
                <div className="flex gap-3 items-start">
                  <div className="p-2 bg-google-blue/10 rounded-xl text-google-blue shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Attendee Question:</h4>
                    <p className="text-slate-600 text-xs mt-1 italic font-sans leading-relaxed">
                      "I have some high-quality video recordings for training or marketing, but I don't love how my voice sounds, or I need to localize the track. Can I change my voice in a video recording?"
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200/60 space-y-3 text-xs text-slate-600 leading-relaxed">
                  <p>
                    <strong>The Professional Answer:</strong> Yes, absolutely! Modern AI uses advanced neural codecs to modify, clean up, or completely replace (clone) a voice while retaining genuine emotion and precise timing.
                  </p>
                  <p>
                    Rather than typing prompts to tell a generic LLM to "fix audio" (LLMs can't edit files), we use specialized voice dubbing engines.
                  </p>
                </div>
              </div>

              {/* Step by Step Workflow */}
              <div className="glass-card bg-white p-6 space-y-4 shadow-sm border-stone-200">
                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Perfect dubbing pipeline:</h5>
                <div className="space-y-3">
                  <div className="flex gap-3 text-xs leading-normal">
                    <span className="w-5 h-5 bg-google-blue/10 text-google-blue font-bold rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                    <p><strong className="text-slate-800 animate-pulse">Isolate Audio:</strong> Upload your video to <strong className="text-slate-700">ElevenLabs Voice Changer</strong> or Descript.</p>
                  </div>
                  <div className="flex gap-3 text-xs leading-normal">
                    <span className="w-5 h-5 bg-google-blue/10 text-google-blue font-bold rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                    <p><strong className="text-slate-800">Describe Voice Style:</strong> Feed the precise voice profile parameters (Stability, Similarity, Style Exaggeration) to get consistent tone.</p>
                  </div>
                  <div className="flex gap-3 text-xs leading-normal">
                    <span className="w-5 h-5 bg-google-blue/10 text-google-blue font-bold rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                    <p><strong className="text-slate-800">Export & Merge:</strong> Let the AI process, then Descript automatically replaces your original video track with the newly stylized voice.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Voice Sandbox */}
            <div className="lg:col-span-7 glass-card bg-white shadow-md border-stone-200 relative overflow-hidden p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">Interactive Voice Dubbing Simulator</h4>
                  <p className="text-slate-500 text-xs text-stone-400">Simulate target voice profiles & output actual prompt guidelines.</p>
                </div>
                <div className="p-2.5 bg-google-green/10 text-google-green rounded-xl"><Volume2 className="w-5 h-5 animate-pulse" /></div>
              </div>

              {/* Selector */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {(Object.keys(voiceData) as Array<keyof typeof voiceData>).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveVoice(key);
                      handleReset();
                    }}
                    className={cn(
                      "p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5",
                      activeVoice === key 
                        ? "border-google-blue bg-google-blue/5 text-google-blue shadow-xs"
                        : "border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                    )}
                  >
                    <Mic className={cn("w-4 h-4", activeVoice === key ? "text-google-blue" : "text-slate-400")} />
                    <span className="text-[10px] font-extrabold tracking-tight truncate max-w-full uppercase">
                      {key === 'executive' ? 'Executive' : key === 'sales' ? 'Sales Coach' : 'Empathetic'}
                    </span>
                  </button>
                ))}
              </div>

              {/* Inner Workings Grid */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-6 space-y-4">
                <div>
                  <h5 className="font-bold text-slate-800 text-sm">{voiceData[activeVoice].name}</h5>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">{voiceData[activeVoice].description}</p>
                </div>

                {/* Simulated Audio Waveform Progress */}
                <div className="bg-white border border-slate-200/60 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold tracking-wider uppercase">
                    <span>AUDIO COGNITIVE WAVEFORM</span>
                    <span className="text-google-blue">{isPlaying ? `PLAYING SIMULATED TRACK... ${Math.round(audioProgress)}%` : "READY TO HEAR"}</span>
                  </div>

                  {/* Simulated Waveform Bar */}
                  <div className="h-10 flex items-center justify-between gap-1 px-2 bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                    {[16, 28, 40, 24, 12, 35, 42, 28, 16, 32, 48, 36, 12, 18, 32, 24, 16, 44, 48, 32, 16, 22, 38, 28, 12, 30, 42, 20, 16, 35, 48, 24, 12].map((height, i) => {
                      const activeHeight = isPlaying 
                        ? Math.max(8, height * (0.8 + 0.4 * Math.sin((audioProgress * 0.5) + i))) 
                        : Math.max(6, height * 0.25);

                      return (
                        <div
                          key={i}
                          style={{ height: `${activeHeight}%` }}
                          className={cn(
                            "w-full rounded-full transition-all duration-300",
                            isPlaying
                              ? "bg-google-blue"
                              : "bg-slate-300"
                          )}
                        />
                      );
                    })}
                  </div>

                  {/* Audio Controls */}
                  <div className="flex justify-between items-center pt-1.5">
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={handlePlayToggle}
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-white shadow transition-all active:scale-95",
                          isPlaying ? "bg-google-red" : "bg-google-blue"
                        )}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                      </button>
                      <button
                        onClick={handleReset}
                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 shadow border border-slate-200 transition-all active:scale-95"
                        title="Reset Track"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right font-mono text-[10px] text-slate-400">
                      <span>{isPlaying ? `0:0${Math.floor(audioProgress / 12.5)}` : "0:00"}</span>
                      <span> / 0:08</span>
                    </div>
                  </div>
                </div>

                {/* Settings Matrix */}
                <div className="grid grid-cols-3 gap-4 pt-1 border-t border-slate-200/60 text-center">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Stability</div>
                    <div className="text-sm font-bold text-slate-700 mt-0.5">{voiceData[activeVoice].stability}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Clarity</div>
                    <div className="text-sm font-bold text-slate-700 mt-0.5">{voiceData[activeVoice].clarity}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Style Exagg.</div>
                    <div className="text-sm font-bold text-slate-700 mt-0.5">{voiceData[activeVoice].style}%</div>
                  </div>
                </div>
              </div>

              {/* Target Prompt Box to Copy */}
              <div className="bg-slate-900 rounded-2xl p-5 relative border border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Voice Description Model Prompt:</span>
                  <button
                    onClick={() => triggerCopy(voiceData[activeVoice].prompt, 'voice')}
                    className={cn(
                      "text-[10px] px-3 py-1 rounded-full font-bold uppercase transition-all flex items-center gap-1.5",
                      copiedText === 'voice' ? "bg-google-green text-white" : "bg-white/10 text-slate-300 hover:bg-white/20"
                    )}
                  >
                    {copiedText === 'voice' ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedText === 'voice' ? 'Copied' : 'Copy Prompt'}
                  </button>
                </div>
                <div className="font-mono text-xs text-slate-300 leading-relaxed pr-6 italic">
                  "{voiceData[activeVoice].prompt}"
                </div>
                <div className="text-[10px] text-slate-400 border-t border-white/5 pt-2.5 flex items-center gap-2 flex-wrap">
                  <span className="text-google-yellow font-extrabold uppercase text-[9px] tracking-wider">Recommended Stack:</span>
                  <span className="font-medium text-slate-300 text-[11px]">{voiceData[activeVoice].toolstack}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="branding"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left selector panel */}
            <div className="lg:col-span-5 space-y-6">
              {/* Core Question and Solution */}
              <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-3xl">
                <div className="flex gap-3 items-start">
                  <div className="p-2 bg-google-blue/10 rounded-xl text-google-blue shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Attendee Question:</h4>
                    <p className="text-slate-600 text-xs mt-1 italic font-sans leading-relaxed">
                      "I struggle with making graphics and on-brand promotional materials. Can I use AI to create branded marketing materials that actually match my brand colors and template styling?"
                    </p>
                  </div>
                </div>
                <p className="mt-4 pt-4 border-t border-slate-200/60 text-xs text-slate-600 leading-relaxed">
                  <strong>The Workflow Blueprint:</strong> Yes! True visual marketing begins in Gemini. You write high-precision image prompts specifying layout composition, color hexes, and style reference matrices. Then, you generate consistent background visuals via <strong className="text-slate-800">Imagen 3</strong> or <strong className="text-slate-800">Midjourney</strong>, and drop those templates into <strong className="text-slate-800">Canva Brand Kits</strong> for text overlay.
                </p>
              </div>

              {/* Controls Selector Card */}
              <div className="glass-card bg-white p-6 space-y-5 shadow-sm border-stone-200">
                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Configure campaign asset:</h5>
                
                {/* 1. Asset Typology */}
                <div className="space-y-2">
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">1. Asset Layout</div>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(assetData) as Array<keyof typeof assetData>).map((key) => (
                      <button
                        key={key}
                        onClick={() => setAssetType(key)}
                        className={cn(
                          "px-3 py-2 rounded-xl text-[10px] font-extrabold text-center uppercase border transition-all truncate",
                          assetType === key 
                            ? "border-google-blue bg-google-blue/5 text-google-blue shadow-xs" 
                            : "border-slate-200 text-slate-500 hover:bg-slate-50"
                        )}
                      >
                        {key === 'social' ? 'Social ad' : key === 'header' ? 'Email Header' : key === 'flyer' ? 'A4 Flyer' : 'Showcase'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Brand Style Vibe */}
                <div className="space-y-2">
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest overflow-hidden">2. Brand Style Vibe & Palette</div>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(brandData) as Array<keyof typeof brandData>).map((key) => (
                      <button
                        key={key}
                        onClick={() => setBrandStyle(key)}
                        className={cn(
                          "px-3 py-2 rounded-xl text-[10px] font-bold text-center border transition-all truncate",
                          brandStyle === key 
                            ? "border-google-blue bg-google-blue/5 text-google-blue shadow-xs" 
                            : "border-slate-200 text-slate-500 hover:bg-slate-50"
                        )}
                      >
                        {brandData[key].name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Campaign Topic */}
                <div className="space-y-2">
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">3. Campaign Topic Focus</div>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(campaignFocusData) as Array<keyof typeof campaignFocusData>).map((key) => (
                      <button
                        key={key}
                        onClick={() => setCampaignFocus(key)}
                        className={cn(
                          "px-3 py-2 rounded-xl text-[10px] font-bold text-center border transition-all truncate",
                          campaignFocus === key 
                            ? "border-google-blue bg-google-blue/5 text-google-blue shadow-xs" 
                            : "border-slate-200 text-slate-500 hover:bg-slate-50"
                        )}
                      >
                        {campaignFocusData[key].title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right generator canvas / output */}
            <div className="lg:col-span-7 glass-card bg-white shadow-md border-stone-200 space-y-6 p-6 md:p-8">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">Marketing Prompt & Blueprint Engine</h4>
                  <p className="text-slate-500 text-xs">Instantly generate prompts for visual generators and marketing copywriters.</p>
                </div>
                <div className="p-2.5 bg-google-yellow/10 text-google-yellow rounded-xl"><Layers className="w-5 h-5 animate-pulse" /></div>
              </div>

              {/* Dynamic Mockup Visual Preview */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dynamic Marketing Asset Layout Template (Interactive Simulation)</div>
                <div className="flex justify-center items-center p-6 bg-slate-50 border border-slate-100 rounded-2xl relative overflow-hidden min-h-[220px]">
                  
                  {/* Simulated Visual Poster Frame */}
                  <div className={cn(
                    "rounded-2xl border flex flex-col p-4 relative justify-between overflow-hidden shadow-lg transition-all duration-500",
                    brandStyle === 'organic' ? "bg-[#faf6f0] text-stone-800 border-zinc-300" : "bg-slate-950 text-white border-white/10",
                    brandData[brandStyle].border,
                    assetData[assetType].scale
                  )}>
                    {/* Glowing effect inside poster */}
                    <div className="absolute inset-0 bg-radial from-transparent to-black/10 mix-blend-multiply pointer-events-none" />
                    
                    {/* Mock badging */}
                    <div className="space-y-1 relative z-10">
                      <span className={cn("text-[6px] font-extrabold uppercase px-1.5 py-0.5 rounded-full inline-block tracking-widest", brandData[brandStyle].pillBg)}>
                        {brandData[brandStyle].badge}
                      </span>
                      <div className={cn(
                        "text-[9px] leading-tight font-extrabold uppercase tracking-tight line-clamp-1",
                        brandStyle === 'organic' ? "text-stone-700" : "text-white"
                      )}>
                        {campaignFocusData[campaignFocus].title}
                      </div>
                    </div>

                    {/* Abstract CSS graphic standing in for AI Art */}
                    <div className="relative w-full h-[35%] my-1.5 bg-black/10 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden">
                      <div className={cn("w-12 h-12 rounded-full absolute mix-blend-screen opacity-70 filter blur-sm", brandData[brandStyle].accent)} />
                      <div className="w-8 h-8 rounded-full border border-white/20 absolute rotate-45 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                      </div>
                      <span className="text-[6px] text-white/30 tracking-wider uppercase font-mono relative z-10">MOCK AI GRAPHIC</span>
                    </div>

                    {/* Footer text content */}
                    <div className="space-y-1 relative z-10">
                      <div className={cn(
                        "text-[8px] font-black leading-tight tracking-tight line-clamp-2",
                        brandData[brandStyle].font,
                        brandStyle === 'organic' ? "text-stone-800" : "text-slate-100"
                      )}>
                        {campaignFocusData[campaignFocus].heading}
                      </div>
                      <div className={cn(
                        "flex text-[5px] py-0.5 justify-center rounded-md font-extrabold uppercase cursor-default transition-all shadow-xs",
                        brandStyle === 'organic' ? "bg-emerald-800 text-white" : "bg-white text-slate-950"
                      )}>
                        RESERVE INSTANT
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 text-center italic">
                  {assetData[assetType].name} • Theme Colors: <span className="font-semibold text-slate-700">{brandData[brandStyle].palette}</span>
                </div>
              </div>

              {/* AI Image Generation Code block */}
              <div className="bg-slate-900 rounded-2xl p-5 relative border border-white/5 space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">🎨 Imagen 3 / Midjourney Prompt:</span>
                  <button
                    onClick={() => triggerCopy(compiledImagePrompt, 'image')}
                    className={cn(
                      "text-[10px] px-3 py-1 rounded-full font-bold uppercase transition-all flex items-center gap-1.5",
                      copiedText === 'image' ? "bg-google-green text-white border-transparent" : "bg-white/10 text-slate-300 hover:bg-white/20"
                    )}
                  >
                    {copiedText === 'image' ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedText === 'image' ? 'Copied prompt' : 'Copy Image Prompt'}
                  </button>
                </div>
                <div className="font-mono text-xs text-slate-300 leading-relaxed text-left pr-4">
                  {compiledImagePrompt}
                </div>
              </div>

              {/* Gemini Context copy prompt */}
              <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">📝 Gemini Ad Copywriter Prompt:</span>
                  <button
                    onClick={() => triggerCopy(compiledCopyPrompt, 'copy')}
                    className={cn(
                      "text-[10px] px-3 py-1 rounded-full font-bold uppercase transition-all flex items-center gap-1.5",
                      copiedText === 'copy' ? "bg-google-green text-white font-semibold border-none" : "bg-slate-200 text-slate-700 hover:bg-slate-300 border border-slate-300"
                    )}
                  >
                    {copiedText === 'copy' ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedText === 'copy' ? 'Copied' : 'Copy copywriter Prompt'}
                  </button>
                </div>
                <div className="font-mono text-xs text-slate-700 leading-relaxed italic bg-white p-4 justify-center border border-slate-200">
                  "{compiledCopyPrompt}"
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function SessionTwoCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className={cn(
        "px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-2 shadow-md shrink-0",
        copied ? "bg-google-green text-white" : "bg-slate-900 text-white hover:bg-slate-800"
      )}
    >
      {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-google-yellow" />}
      {copied ? "Copied!" : "Copy Prompt"}
    </button>
  );
}

function SessionTwoContent() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<number | null>(1);
  const [activeStepTab, setActiveStepTab] = useState<number>(1);
  const [activeDiagnostic, setActiveDiagnostic] = useState<number | null>(null);
  const [slidesChecklist, setSlidesChecklist] = useState<Record<string, boolean>>({});

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const CHATGPT_TO_GEMINI_PROMPT = `Rule Convert: Convert my existing conversational instructions, custom GPT guidelines, or custom instructions into a structured System Directive for Google Gemini.

Input Instructions to Convert:
[PASTE YOUR RAW CHATGPT RULES HERE]

Format the output strictly as:
# ROLE & CORE PURPOSE
[Define role clearly based on the provided instructions]

# CONTEXT & BRAND MATRIX
[Define background facts & customer values]

# METHODOLOGY / CONSTRAINTS
[Enforce step-by-step structures like SPICED or specific email constraints]

# TONE & STYLE
[Define tone settings, negative keywords, formatting limits, and brevity settings]`;

  const ASSET_A = `You are the Ultimate HiJiffy Sales Companion. Your job is to draft emails, proposals, and HubSpot notes.

ABOUT HIJIFFY: We provide an AI-powered Guest Communications Hub tailored specifically for the hospitality industry, centralizing communication channels (WhatsApp, Webchat, Social) and automating check-ins, FAQs, and upsells.

METHODOLOGY (SPICED):
Always structure complex client recaps or internal notes using:
- Situation: Current state of hotel tech stack.
- Pain: Manual tasks, lost revenue, bad guest reviews.
- Impact: Financial or operational consequences of the pain.
- Critical Event: Upcoming high season, system migration deadline.
- Decision Criteria: Budget constraints, IT approval process.

TONE & STYLE: Professional yet highly modern, consultative, concise, zero fluff. Never use generic corporate jargon.`;

  const ASSET_B = `### CUSTOM COMMANDS
You recognize and respond to the following text command:

1. Command: /Hubspot
   - Purpose: Analyze a sales interaction using the SPICED framework.
   - Requirement: The user will provide an [Email Received] and a [Response Proposed].
   - Execution: Analyze the input and strictly structure your output using the SPICED elements:
     * S - Situation: Current background and context of the prospect.
     * P - Pain: The core business problem they are trying to solve.
     * I - Impact: The business implications of not solving that pain (or solving it).
     * C - Critical Event: The deadline or compelling event driving their timeline.
     * E - Decision Criteria: How they will evaluate and select a solution.
     * D - Decision Process: The steps and people involved in making the final call.`;

  const HUBSPOT_EXAMPLE_PROMPT = `/Hubspot

Email Received: "Hey, our team is struggling to track leads manually in spreadsheets. We need an automated CRM system up and running before our Q3 sales kickoff on August 1st. Budget is approved up to $15k, but the VP of Sales needs to sign off on security compliance."

Response Proposed: "Hi Sarah, I can get you set up on HubSpot CRM by mid-July. Let's schedule a call with your VP next Tuesday to review our security protocols so we can hit your August deadline."`;

  const STANDALONE_GEMINI_OUTLINE_PROMPT = `Create a detailed 5-slide presentation outline summarizing our launch plan:
Slide 1: Cover Slide with Title & Subtitle.
Slide 2: Problem statement with 2 core user pain points.
Slide 3: Our Solution (3 key value pillars).
Slide 4: Implementation Timeline (Q1 to Q4 phases).
Slide 5: Expected Impact & Metrics.

Keep all slide copy concise, structured, and ready to be loaded by the Slides app side-panel.`;

  const SLIDES_APP_GEMINI_PROMPT = `Create a 5-slide presentation about our product launch plan based on this structure:
Slide 1: Cover: "Next-Gen Launch Plan". Subtitle: "Q3 Strategy".
Slide 2: Market Challenge. Bullets: "Manual operational workflows are slow", "High front desk overhead".
Slide 3: Our Solution. Bullets: "Auto-answering 85% of queries", "PMS real-time synchronization".
Slide 4: Growth Timeline. Bullets: "Q1 Pilot Study", "Q2 System Integration", "Q3 Global Deployment".
Slide 5: Expected Impact. Bullets: "Reduce work time by 20%", "Boost direct-booking click rates".`;

  const ASSET_C = `"A clean mockup of a smartphone displaying a sleek, clean chat interface inside a bright, luxury hotel lobby. In the background, a smiling receptionist interacts naturally with a guest. Minimalist aesthetic, soft cinematic lighting, tech-forward, corporate style optimized for a B2B presentation slide."`;

  const ASSET_D = `HIJIFFY TEAM ONBOARDING BRIEF 2026
1. CORE PRODUCTS: Our core engine is Aplysia, a proprietary hotel AI designed to handle up to 85% of standard customer guest queries instantly. 
2. KEY INTEGRATIONS: We seamlessly sync with Oracle Opera, Mews, and Cloudbeds Property Management Systems (PMS). This allows our AI to handle live check-ins, room availability lookups, and real-time upselling of hotel amenities.
3. SECURITY & COMPLIANCE: HiJiffy is entirely GDPR compliant. Guest data is encrypted at rest and in transit. We never pass sensitive credit card details through unencrypted chat nodes.
4. OUR CLIENT BASE: Over 2,000 hotels worldwide rely on HiJiffy to optimize operational workflows, boost direct bookings, and dramatically reduce front desk overhead.`;

  const toggleAccordion = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="space-y-8 font-sans max-w-5xl mx-auto text-left bg-transparent text-slate-800">
      {/* WORKSHOP APP HERO PANEL */}
      <div className="relative bg-white border border-slate-200 p-8 md:p-10 rounded-2xl overflow-hidden shadow-xs">
        <div className="absolute top-0 right-0 w-80 h-80 bg-google-blue/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-google-green/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <span className="bg-google-blue/10 text-google-blue px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-google-blue/10 inline-block mb-3">
          Session 2 • Build Laboratory
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800 mb-2">
          Deep Workflows & <span className="bg-clip-text text-transparent bg-gradient-to-r from-google-blue to-google-green">Long-Context Intelligence</span>
        </h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-3xl mb-6">
          Interactive workspace environment for the June 18th session. Toggle deployment modules, click code blocks to sync data to clipboards instantly, and simulate model behaviors below.
        </p>

        {/* CORE WORKSHOP THEORETICAL FRAMEWORK */}
        <div className="border-t border-slate-100 pt-6 mt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <span>🎓</span> Theoretical Foundations: The Architecture of Multi-Agent Workflows
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Modern enterprise AI has moved beyond conversational text boxes. Achieving hyper-productivity requires shifting from <span className="font-semibold text-google-blue">static zero-shot prompting</span> to <span className="font-semibold text-google-green">integrated software systems</span>. This session focuses on the mechanics of contextual scoping, secure grounding, and model calibration inside native workspace frameworks.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <span className="text-xs font-semibold text-google-blue block mb-1">I. Sidebar Orchestration</span>
              <p className="text-xs text-slate-500">Injecting specialized context anchors alongside active user canvas modules (Gmail, Slides, Meet) to reduce task switching latency.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <span className="text-xs font-semibold text-google-green block mb-1">II. Retrieval Grounding</span>
              <p className="text-xs text-slate-500">Replacing model hallucinations with trusted local source document anchors using localized index embeddings.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <span className="text-xs font-semibold text-purple-600 block mb-1">III. Parametric Control</span>
              <p className="text-xs text-slate-500">Calibrating model creativity levels using targeted configuration boundaries in development environments.</p>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE ACCORDION CONTAINER MATRIX */}
      <div className="space-y-4">
        {/* MODULE 1 BLOCK */}
        <div className={cn("bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300", openSection === 1 ? "border-google-blue/40 shadow-md shadow-google-blue/5" : "hover:border-slate-300 shadow-xs")}>
          <button 
            onClick={() => toggleAccordion(1)}
            className="w-full p-6 text-left flex justify-between items-center transition-colors hover:bg-slate-50/50"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl bg-google-blue/10 text-google-blue">
                ⚙️
              </div>
              <span className="font-bold text-base md:text-lg text-slate-800">
                1. The ChatGPT-to-Gemini Workspace Transition (Gems)
              </span>
            </div>
            <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform duration-300", openSection === 1 && "transform rotate-180 text-google-blue")} />
          </button>
          
          <AnimatePresence initial={false}>
            {openSection === 1 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden border-t border-slate-200/50 bg-slate-50/30"
              >
                <div className="p-6 space-y-6">
                  {/* HERO PARADIGM SHIFT */}
                  <div className="bg-gradient-to-r from-google-blue/5 via-transparent to-transparent p-6 rounded-2xl border border-google-blue/10 space-y-2">
                    <span className="bg-google-blue/10 text-google-blue text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase inline-block">
                      The Workflow Transition Paradigm
                    </span>
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                      You are moving from a siloed model (ChatGPT in a separate browser tab) to a context-aware model (Gemini inside Workspace). To maintain your precision and <strong>SPICED methodology</strong> without copy-paste overhead, you don't "train" or fine-tune models anymore—you <strong>"anchor"</strong> them natively using <strong>Gems</strong> and connected Workspace files.
                    </p>
                  </div>

                  {/* INTERACTIVE WORKSHOP PRESENTER TABS */}
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block px-1">
                        Select Presentation Slide / Step:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { id: 1, title: "💡 The Shift Cycle", icon: "🧠" },
                          { id: 2, title: "Step 1: ChatGPT Extract", icon: "🔌" },
                          { id: 3, title: "Step 2: Build the Gem", icon: "💎" },
                          { id: 4, title: "Step 3: Gmail Sidebar", icon: "📧" },
                          { id: 5, title: "Step 4: Gem Slash Commands", icon: "⌨️" },
                          { id: 6, title: "Step 5: Gem Upgrades", icon: "⚡" },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveStepTab(tab.id)}
                            className={cn(
                              "flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer border",
                              activeStepTab === tab.id
                                ? "bg-google-blue text-white border-google-blue shadow-sm shadow-google-blue/10"
                                : "bg-white text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900"
                            )}
                          >
                            <span>{tab.icon}</span>
                            {tab.title}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ACTIVE PRESENTATION CONTENT FRAME */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 min-h-[300px] shadow-xs">
                      {activeStepTab === 1 && (
                        <div className="space-y-6">
                          <div className="border-b border-slate-150 pb-3">
                            <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                              <span>🧠</span> Concept: The Gemini-Gmail-HubSpot Workflow Loop
                            </h3>
                            <p className="text-slate-500 text-xs mt-0.5">Explaining the automated, low-overhead cycle of integrated Workspace communication.</p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2 bg-slate-50 p-5 rounded-xl border border-slate-150 relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-1.5 h-full bg-google-blue" />
                              <span className="w-6 h-6 rounded-full bg-google-blue/10 text-google-blue flex items-center justify-center font-bold text-xs">1</span>
                              <h4 className="font-bold text-slate-800 text-sm">The Setup: Custom Gem</h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed">
                                Create a specialized sales assistant Gem in gemini.google.com. Paste your <strong>"Operational Bible"</strong> (HiJiffy voice guidelines, SPICED framework definitions, and tone rules) inside its instructions. It stays primed forever.
                              </p>
                            </div>

                            <div className="space-y-2 bg-slate-50 p-5 rounded-xl border border-slate-150 relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-1.5 h-full bg-google-green" />
                              <span className="w-6 h-6 rounded-full bg-google-green/10 text-google-green flex items-center justify-center font-bold text-xs">2</span>
                              <h4 className="font-bold text-slate-800 text-sm">The Execution: Gmail Sidebar</h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed">
                                Open active email threads directly inside Gmail. Select your Gem in the sidebar panel. Gemini dynamically digests thread context and crafts highly targeted responses instantly.
                              </p>
                            </div>

                            <div className="space-y-2 bg-slate-50 p-5 rounded-xl border border-slate-150 relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500" />
                              <span className="w-6 h-6 rounded-full bg-purple-50/50 text-purple-600 flex items-center justify-center font-bold text-xs">3</span>
                              <h4 className="font-bold text-slate-800 text-sm">The Sync: HubSpot CRM</h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed">
                                Direct Gemini to compile notes directly to your synced Google Docs tracker, then copy the formatted timeline data into HubSpot's active sidebar extension panel. No cross-app style crashes.
                              </p>
                            </div>
                          </div>

                        </div>
                      )}

                      {activeStepTab === 2 && (
                        <div className="space-y-6">
                          <div className="border-b border-slate-150 pb-3">
                            <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                              <span>🔌</span> Step 1: Extract Existing ChatGPT Rules & Convert Live
                            </h3>
                            <p className="text-slate-500 text-xs mt-0.5">How to easily migrate messy past configurations into Gemini's clean parametric system.</p>
                          </div>

                          <div className="space-y-4">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">How to extract ChatGPT custom instructions:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                                <span className="font-bold text-slate-800 block">Option A: Custom Instructions (General Profile)</span>
                                <p className="text-slate-600 leading-relaxed">
                                  1. Open ChatGPT, click on user profile (bottom-left) ➔ Select <strong>"Customize ChatGPT"</strong>.<br />
                                  2. Copy the contents of both conversational text boxes (how you want ChatGPT to respond).
                                </p>
                              </div>
                              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                                <span className="font-bold text-slate-800 block">Option B: Custom GPT (Specialized Assistant)</span>
                                <p className="text-slate-600 leading-relaxed">
                                  1. Open your custom GPT in ChatGPT edit mode ➔ Select <strong>"Configure"</strong>.<br />
                                  2. Highlight and copy the complete text inside the <strong>"Instructions"</strong> textbox container.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* REUSE DIRECTIVE TRANSLATOR BOX */}
                          <div className="space-y-3 pt-2">
                            <div className="flex justify-between items-center bg-[#0f172a] px-4 py-3 rounded-t-xl border-b border-[#1f2937]">
                              <span className="text-xs font-bold text-[#fbbf24] uppercase tracking-wide flex items-center gap-1.5">
                                <span>⚡</span> ChatGPT-to-Gemini System Prompt Transformer
                              </span>
                              <button
                                onClick={() => handleCopy(CHATGPT_TO_GEMINI_PROMPT, 'chatgptTransformer')}
                                className="bg-white/5 border border-white/10 hover:border-[#fbbf24] flex items-center gap-1.5 text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all active:scale-95 hover:bg-white/10"
                              >
                                {copiedId === 'chatgptTransformer' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-yellow-400" />}
                                {copiedId === 'chatgptTransformer' ? "Copied!" : "Copy Transformer Prompt"}
                              </button>
                            </div>
                            <pre className="p-4 font-mono text-[11px] text-[#34d399] leading-relaxed overflow-x-auto whitespace-pre-wrap select-all bg-[#030712] border border-[#1f2937] rounded-b-xl max-h-[160px]">
                              {CHATGPT_TO_GEMINI_PROMPT}
                            </pre>
                            <p className="text-[11px] text-slate-500 italic">
                              💡 Copy this prompt, paste any messy past directives into are bracket placeholder, and query ChatGPT/Gemini to translate them automatically into a clean directive.
                            </p>
                          </div>
                        </div>
                      )}

                      {activeStepTab === 3 && (
                        <div className="space-y-6">
                          <div className="border-b border-slate-150 pb-3">
                            <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                              <span>💎</span> Step 2: Creating your Personalized Live Gem
                            </h3>
                            <p className="text-slate-500 text-xs mt-0.5">Creating the permanent operational brain of your sales workflow.</p>
                          </div>

                          <div className="bg-emerald-500/[0.04] border border-emerald-500/20 bg-emerald-50/20 rounded-xl p-4 space-y-2 text-xs">
                            <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                              <span>✨</span> Pure Custom Directives
                            </div>
                            <p className="text-slate-600 leading-relaxed font-sans">
                              We aren't going to use a generic mock or pre-baked template. Your custom Gem should be powered <strong>directly by the translated system instructions you created in Step 1</strong>. This ensures your customized workflow voice and SPICED constraints are exactly what operates the Gem.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Live Walkthrough instructions:</span>
                            <ol className="text-xs text-slate-600 list-decimal pl-5 space-y-2 leading-relaxed">
                              <li>Go to <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="text-google-blue font-bold hover:underline inline-flex items-center gap-0.5">gemini.google.com 🔗</a> or trigger your Gemini sidebar workspace dashboard.</li>
                              <li>At the bottom of the left-hand navigation column, click on <strong>"Gems Manager"</strong> (or "Gems") ➔ Click <strong>"New Gem"</strong>.</li>
                              <li>Title your Gem: <strong className="text-slate-800 font-bold">"HiJiffy Sales Companion"</strong> (or your custom brand companion).</li>
                              <li>Paste your <strong>custom system instructions generated from Step 1</strong> into the <strong>"Instructions"</strong> panel.</li>
                              <li>Click <strong>"Save"</strong> on your new Gem. It is now instantly anchored, synchronized, and ready to trigger.</li>
                            </ol>
                          </div>
                        </div>
                      )}

                      {activeStepTab === 4 && (
                        <div className="space-y-6">
                          <div className="border-b border-slate-150 pb-3">
                            <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                              <span>📧</span> Step 3: Activating the Gmail Sidebar Loop (Live Exercise)
                            </h3>
                            <p className="text-slate-500 text-xs mt-0.5">Let's run a live test scenario using your newly created Gem.</p>
                          </div>

                          <div className="bg-blue-500/[0.04] border border-blue-500/20 bg-blue-50/20 rounded-xl p-4 space-y-2 text-xs">
                            <div className="flex items-center gap-1.5 text-blue-700 font-bold">
                              <span>📨</span> Presentation Tip: Live Interaction
                            </div>
                            <p className="text-slate-600 leading-relaxed font-sans">
                              Instead of using generic static templates, this demo is fully interactive. Simply open any real customer email (for this live demo, I will send you an email right now!) and draft the response natively side-by-side using Gemini.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Live Walkthrough instructions:</span>
                            <ol className="text-xs text-slate-600 list-decimal pl-5 space-y-2 leading-relaxed">
                              <li>Open Gmail, and <strong>open an email from a customer</strong> (for this demo I will send an email).</li>
                              <li>Launch the <strong>Gemini side panel</strong> in Gmail (the vertical sparkle icon on the right).</li>
                              <li>Select your brand-new <strong>"HiJiffy Sales Companion"</strong> Gem from the assistants list.</li>
                              <li>Command the Gem: <code className="text-slate-800 font-semibold bg-slate-100 px-1.5 py-0.5 rounded font-mono text-[11px] block mt-1.5 select-all border border-slate-200">"Read the details below, draft a SPICED response to this email. Focus on WhatsApp booking lag."</code></li>
                              <li>Watch the sidebar compile the structured reply in seconds using your anchored brand rules. Click <strong>"Insert"</strong> to drop the text directly.</li>
                            </ol>
                          </div>
                        </div>
                      )}

                      {activeStepTab === 5 && (
                        <div className="space-y-6">
                          <div className="border-b border-slate-150 pb-3">
                            <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                              <span>🔄</span> Step 4: Programmatic Gem "Slash Commands"
                            </h3>
                            <p className="text-slate-500 text-xs mt-0.5">Program your Gem to respond to custom triggers without custom developer code.</p>
                          </div>

                          <div className="space-y-4">
                            <div className="bg-blue-500/[0.04] border border-blue-500/10 bg-blue-50/10 rounded-xl p-4 text-xs space-y-2.5 text-slate-600 leading-relaxed font-sans">
                              <p>
                                While the standard web interface for Gemini Gems doesn't have a built-in macro engine that creates a clickable pop-up menu when you type a /, you can easily program any Gem to respond to text-based <strong>"slash commands"</strong> just like a software developer would!
                              </p>
                              <p>
                                By defining the command directly inside the Gem's core instructions, you teach it to watch for that specific trigger word and execute your structured framework instantly.
                              </p>
                            </div>

                            <div className="space-y-3">
                              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                                <span className="text-google-blue">⚙️</span> 1. The Instruction Setup:
                              </h4>
                              <p className="text-xs text-slate-600 leading-normal">
                                To make this work, click <strong>"Edit Gem"</strong> inside your Gemini dashboard and paste this exact logic blueprint at the bottom of your <strong>Instructions</strong> box:
                              </p>

                              {/* COMMAND SETUP CODE BOX */}
                              <div className="space-y-2">
                                <div className="flex justify-between items-center bg-[#090d16] px-4 py-2.5 rounded-t-xl border-b border-[#1f2937]">
                                  <span className="text-[10px] font-bold text-cyan-400 font-mono tracking-wider">
                                    /Hubspot Instruction Blueprint
                                  </span>
                                  <button
                                    onClick={() => handleCopy(ASSET_B, 'hubspotInstructions')}
                                    className="bg-white/5 border border-white/10 hover:border-[#22d3ee] flex items-center gap-1.5 text-white px-3 py-1 rounded-md text-[10px] font-bold cursor-pointer transition-all active:scale-95 hover:bg-white/10"
                                  >
                                    {copiedId === 'hubspotInstructions' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-450" />}
                                    {copiedId === 'hubspotInstructions' ? "Copied!" : "Copy Command Logic"}
                                  </button>
                                </div>
                                <pre className="p-4 bg-slate-900 border border-slate-800 rounded-b-xl font-mono text-xs text-[#34d399] leading-relaxed max-h-[180px] overflow-y-auto whitespace-pre-wrap select-all">
                                  {ASSET_B}
                                </pre>
                              </div>
                            </div>

                            <div className="space-y-3 pt-2">
                              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                                <span className="text-google-green">💬</span> 2. How You Use It in Chat:
                              </h4>
                              <p className="text-xs text-slate-600 leading-normal">
                                Once you save those instructions, you don't need to explain the SPICED framework to your Gem ever again. When you are ready to log notes, just type <code className="p-0.5 bg-slate-100 border border-slate-200 text-slate-800 rounded font-bold">/Hubspot</code> followed by your raw details:
                              </p>

                              {/* EXAMPLE PROMPT CODE BOX */}
                              <div className="space-y-2">
                                <div className="flex justify-between items-center bg-[#090d16] px-4 py-2.5 rounded-t-xl border-b border-[#1f2937]">
                                  <span className="text-[10px] font-bold text-emerald-400 font-mono tracking-wider">
                                    Example Interaction Prompt
                                  </span>
                                  <button
                                    onClick={() => handleCopy(HUBSPOT_EXAMPLE_PROMPT, 'hubspotPrompt')}
                                    className="bg-white/5 border border-white/10 hover:border-[#34d399] flex items-center gap-1.5 text-white px-3 py-1 rounded-md text-[10px] font-bold cursor-pointer transition-all active:scale-95 hover:bg-white/10"
                                  >
                                    {copiedId === 'hubspotPrompt' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-emerald-400" />}
                                    {copiedId === 'hubspotPrompt' ? "Copied!" : "Copy Example Prompt"}
                                  </button>
                                </div>
                                <pre className="p-4 bg-slate-900 border border-slate-800 rounded-b-xl font-mono text-xs text-slate-300 leading-relaxed max-h-[150px] overflow-y-auto whitespace-pre-wrap select-all">
                                  {HUBSPOT_EXAMPLE_PROMPT}
                                </pre>
                              </div>
                            </div>

                            <div className="space-y-3 pt-2">
                              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                🎯 What the Gem will output:
                              </h4>
                              <p className="text-xs text-slate-600 leading-normal">
                                The Gem will instantly skip all conversational pleasantries or typical preambles and output a pristine structured SPICED CRM log:
                              </p>

                              <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden font-sans text-xs">
                                <div className="bg-slate-100 hover:bg-slate-200 px-4 py-2 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px] flex items-center justify-between">
                                  <span>🚀 Gem Response Payload</span>
                                  <span className="text-[10px] text-google-green">Deterministic SPICED Output</span>
                                </div>
                                <div className="p-4 space-y-2 text-slate-700 leading-relaxed">
                                  <p className="font-sans">
                                    <strong>Situation:</strong> Moving from manual spreadsheets to an automated CRM.
                                  </p>
                                  <p className="font-sans">
                                    <strong>Pain:</strong> Inefficient lead tracking causing operational friction for the team.
                                  </p>
                                  <p className="font-sans">
                                    <strong>Impact:</strong> Lost sales revenue and disconnected pipeline visibility if manual workflows persist.
                                  </p>
                                  <p className="font-sans">
                                    <strong>Critical Event:</strong> Q3 Sales Kickoff on August 1st (requires system active before then).
                                  </p>
                                  <p className="font-sans">
                                    <strong>Decision Criteria:</strong> Core security compliance approval and budget matching under $15k.
                                  </p>
                                  <p className="font-sans">
                                    <strong>Decision Process:</strong> Sarah is the lead POC, but the VP of Sales holds final sign-off authority.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* PRO TIP ALERT */}
                            <div className="bg-emerald-500/[0.03] border border-emerald-500/15 p-4 rounded-xl text-xs space-y-1.5">
                              <span className="font-bold text-emerald-800 flex items-center gap-1">
                                <span>💡</span> Pro Tip: Stack Multiple Commands!
                              </span>
                              <p className="text-slate-600 leading-relaxed leading-normal">
                                You can stack multiple commands in the same Gem as your skills catalog expands! For example, you could add a <code className="p-0.5 bg-slate-100 text-slate-700 font-mono rounded font-bold">/Brief</code> command to quickly summarize long client threads, or a <code className="p-0.5 bg-slate-100 text-slate-700 font-mono rounded font-bold">/Draft</code> command to generate contextual responses automatically using your validated tone matrix profiles.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeStepTab === 6 && (
                        <div className="space-y-6">
                          <div className="border-b border-slate-150 pb-3">
                            <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                              <span>⚡</span> Step 5: Iterative Gem Upgrades & Workaround
                            </h3>
                            <p className="text-slate-500 text-xs mt-0.5">How to make your Gem build its own persistent instructions dynamically.</p>
                          </div>

                          <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-amber-500/[0.03] border border-amber-500/10 text-xs space-y-2 text-slate-600 leading-relaxed">
                              <span className="font-bold text-amber-700 flex items-center gap-1.5 text-sm">
                                <span>⚠️</span> The Core Limitation
                              </span>
                              <p>
                                Right now, Gems cannot automatically rewrite their own system instructions based on your chat corrections. They don't have <strong>"persistent learning"</strong> that updates their baseline settings across separate chats.
                              </p>
                              <p>
                                However, you can use a clever workaround: <strong>you can make the Gem generate its own instruction updates for you</strong>.
                              </p>
                              <p>
                                Instead of trying to figure out how to phrase a new rule for its settings, you can ask the Gem to write the exact text you need to copy and paste.
                              </p>
                            </div>

                            <div className="space-y-3">
                              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">How to make the Gem do the heavy lifting:</h4>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                When you successfully correct a Gem in an active chat session, leverage this pre-optimized prompt to get your permanent settings upgrade block:
                              </p>

                              {/* PROMPT COPY BOX */}
                              <div className="space-y-2">
                                <div className="flex justify-between items-center bg-[#090d16] px-4 py-2.5 rounded-t-xl border-b border-[#1f2937]">
                                  <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">
                                    🔌 Feedback Mirror Prompt
                                  </span>
                                  <button
                                    onClick={() => handleCopy(
                                      `Now that we have this working correctly, look back at our conversation. Write a clear, concise instruction block that I can copy and paste into your Gem settings so you always remember to do this in future chats.`,
                                      'gemUpgradeWorkaround'
                                    )}
                                    className="bg-white/5 border border-white/10 hover:border-[#fbbf24] flex items-center gap-1.5 text-white px-3 py-1 rounded-md text-[10px] font-bold cursor-pointer transition-all active:scale-95 hover:bg-white/10"
                                  >
                                    {copiedId === 'gemUpgradeWorkaround' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-yellow-400" />}
                                    {copiedId === 'gemUpgradeWorkaround' ? "Copied Prompt!" : "Copy Prompt"}
                                  </button>
                                </div>
                                <div className="p-4 bg-slate-900 border border-slate-800 rounded-b-xl font-mono text-xs text-[#34d399] leading-relaxed whitespace-pre-wrap">
                                  "Now that we have this working correctly, look back at our conversation. Write a clear, concise instruction block that I can copy and paste into your Gem settings so you always remember to do this in future chats."
                                </div>
                              </div>

                              <p className="text-xs text-slate-600 leading-relaxed">
                                The Gem will analyze the active context, output a pristine set of parameters based on what it just learned, and then all you have to do is:
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                                <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-xl space-y-1">
                                  <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                                    <span className="bg-slate-200 text-slate-700 text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">1</span>
                                    Copy instructions
                                  </span>
                                  <p className="text-[10px] text-slate-500 leading-normal">
                                    Highlight and copy the finalized block generated by the feedback mirror prompt.
                                  </p>
                                </div>
                                <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-xl space-y-1">
                                  <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                                    <span className="bg-slate-200 text-slate-700 text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">2</span>
                                    Edit Gem settings
                                  </span>
                                  <p className="text-[10px] text-slate-500 leading-normal">
                                    Head back to your Gems dashboard configuration and hit "Edit Gem" for your active companion.
                                  </p>
                                </div>
                                <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-xl space-y-1">
                                  <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                                    <span className="bg-slate-200 text-slate-700 text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">3</span>
                                    Paste code rule
                                  </span>
                                  <p className="text-[10px] text-slate-500 leading-normal">
                                    Paste it right into the Instructions box to lock in that strategic behavior forever.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>


                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MODULE 2 BLOCK */}
        <div className={cn("bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300", openSection === 2 ? "border-purple-500/40 shadow-md shadow-purple-500/5" : "hover:border-slate-300 shadow-xs")}>
          <button 
            onClick={() => toggleAccordion(2)}
            className="w-full p-6 text-left flex justify-between items-center transition-colors hover:bg-slate-50/50"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl bg-purple-500/10 text-purple-600">
                🎨
              </div>
              <span className="font-bold text-base md:text-lg text-slate-800">
                2. Brand-Safe Google Slides & Presentations Workflow
              </span>
            </div>
            <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform duration-300", openSection === 2 && "transform rotate-180 text-purple-600")} />
          </button>
          
          <AnimatePresence initial={false}>
            {openSection === 2 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden border-t border-slate-200/50 bg-slate-50/30"
              >
                <div className="p-6 space-y-8 text-slate-700">
                  {/* 1. DEVELOPING PRECISE OUTLINES IN STANDALONE GEMINI */}
                  <div className="space-y-4 font-sans">
                    <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                      <span className="text-purple-600">🧠</span> 1. Draft Content in Standalone Gemini
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Draft the detailed, slide-by-slide copy in standalone Gemini (<a href="https://gemini.google.com" target="_blank" rel="noreferrer" className="text-google-blue font-semibold hover:underline">gemini.google.com</a>) first. It has a larger context window and handles detailed source grounding much better:
                    </p>

                    {/* Standalone Prompt Box */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center bg-[#090d16] px-4 py-2.5 rounded-t-xl border-b border-[#1f2937]">
                        <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-wider uppercase">
                          📋 Step 1: Standalone Gemini Content Outline Blueprint
                        </span>
                        <button
                          onClick={() => handleCopy(STANDALONE_GEMINI_OUTLINE_PROMPT, 'standaloneOutlinePrompt')}
                          className="bg-white/5 border border-white/10 hover:border-emerald-400 flex items-center gap-1.5 text-white px-3 py-1 rounded-md text-[10px] font-bold cursor-pointer transition-all active:scale-95 hover:bg-white/10"
                        >
                          {copiedId === 'standaloneOutlinePrompt' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-emerald-400" />}
                          {copiedId === 'standaloneOutlinePrompt' ? "Copied!" : "Copy Prompt"}
                        </button>
                      </div>
                      <pre className="p-4 bg-slate-900 border border-slate-800 rounded-b-xl font-mono text-xs text-[#cbd5e1] leading-relaxed max-h-[180px] overflow-y-auto whitespace-pre-wrap select-all">
                        {STANDALONE_GEMINI_OUTLINE_PROMPT}
                      </pre>
                    </div>
                  </div>

                  {/* 2. GENERATING MULTIPLE PAGES SLIDES NATIVELY */}
                  <div className="space-y-4 pt-4 border-t border-slate-100 font-sans">
                    <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                      <span className="text-purple-600">🪄</span> 2. Generate Multi-Page Slides in Slides App
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Use the Gemini side-panel right inside your Google Slides file to build the pages organically:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
                      <div className="bg-white border border-slate-150 p-5 rounded-2xl relative space-y-3 shadow-xs">
                        <div className="text-[9px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md font-mono w-max">
                          SLIDES STEP 1
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-800 text-xs">Open Ask Gemini</h4>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-sans font-normal">
                            Click the <strong>Ask Gemini</strong> star button in the top-right toolbar within your Google Slides project.
                          </p>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-150 p-5 rounded-2xl relative space-y-3 shadow-xs">
                        <div className="text-[9px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md font-mono w-max">
                          SLIDES STEP 2
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-800 text-xs">Formulate Slide Command</h4>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-sans font-normal">
                            Ask Gemini to create the multi-page structure. Input your Slide Command combining copy parameters and structural rules.
                          </p>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-150 p-5 rounded-2xl relative space-y-3 shadow-xs">
                        <div className="text-[9px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md font-mono w-max">
                          SLIDES STEP 3
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-800 text-xs">Build slides natively</h4>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-sans font-normal">
                            Gemini inserts the slides into your current deck, preserving the master elements, formatting, and fonts setup.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Slides App Command Box */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center bg-[#090d16] px-4 py-2.5 rounded-t-xl border-b border-[#1f2937]">
                        <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-wider uppercase">
                          📋 Step 2: Google Slides Side-Panel Command
                        </span>
                        <button
                          onClick={() => handleCopy(SLIDES_APP_GEMINI_PROMPT, 'slidesAppPrompt')}
                          className="bg-white/5 border border-white/10 hover:border-emerald-400 flex items-center gap-1.5 text-white px-3 py-1 rounded-md text-[10px] font-bold cursor-pointer transition-all active:scale-95 hover:bg-white/10"
                        >
                          {copiedId === 'slidesAppPrompt' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-emerald-400" />}
                          {copiedId === 'slidesAppPrompt' ? "Copied!" : "Copy Prompt"}
                        </button>
                      </div>
                      <pre className="p-4 bg-slate-900 border border-slate-800 rounded-b-xl font-mono text-xs text-[#cbd5e1] leading-relaxed max-h-[180px] overflow-y-auto whitespace-pre-wrap select-all">
                        {SLIDES_APP_GEMINI_PROMPT}
                      </pre>
                    </div>
                  </div>

                  {/* 3. MANUAL POLISH & LAYOUT MATCH */}
                  <div className="space-y-4 pt-4 border-t border-slate-100 font-sans">
                    <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                      <span className="text-purple-600">✍️</span> 3. Adjust and Polish the Style Manually
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Because AI automated layouts can sometimes place basic shape elements simply, use these quick manual adjustments to match premium slide layouts perfectly:
                    </p>

                    <ul className="text-xs text-slate-600 pl-5 list-disc space-y-2.5 font-normal">
                      <li className="leading-relaxed"><strong>Rearrange layout:</strong> If elements feel congested, select the slide, click <strong>Layout</strong> in the main Google Slides toolbar, and swap the styling block to an approved corporate master pattern.</li>
                      <li className="leading-relaxed"><strong>Sync Accent Shapes:</strong> Convert standard white container boxes or shapes into Approved Theme Colors by clicking the shape and selecting official palette presets.</li>
                      <li className="leading-relaxed"><strong>Typography Refinement:</strong> Highlight headings or labels and change size, bold weights, or spacing values manually using your loaded Google-approved brand fonts.</li>
                    </ul>

                    <div className="bg-[#fcf8ff] border border-purple-100 rounded-2xl p-5 space-y-1.5 shadow-xs">
                      <span className="font-extrabold text-purple-900 flex items-center gap-1.5 text-xs">
                        💡 Key Takeaway: The Hybrid Human-in-the-Loop Workflow
                      </span>
                      <p className="text-slate-600 leading-relaxed text-xs font-normal">
                        Leveraging Gemini to write precision layouts, outline slide flow, and insert initial structures saves hours of builder time. Handing off slide details for quick manual stylistic adjustments keeps your brand perfectly preserved and safe.
                      </p>
                    </div>
                  </div>

                  {/* 4. OPTION TO TRANSFORM SLIDES TO VIDS WITH AI VOICE & AVATAR */}
                  <div className="space-y-4 pt-4 border-t border-slate-100 font-sans">
                    <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                      <span className="text-purple-600">🎥</span> 4. Transform Slides into Google Vids with AI Voiceover & Avatar
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Ready to scale up your static slides? Convert your corporate master deck into a highly professional video presentation natively in Google Workspace:
                    </p>

                    <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white border border-purple-150 p-5 rounded-2xl space-y-4 shadow-xs">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="space-y-1">
                          <span className="bg-purple-100 text-purple-700 text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase font-sans">
                            WORKSPACE NATIVE INTEGRATION
                          </span>
                          <h4 className="font-extrabold text-slate-800 text-xs text-slate-800">
                            Instant Slide-to-Video Engine (Google Vids)
                          </h4>
                        </div>
                        <button
                          onClick={() => {
                            setOpenSection(4);
                            setTimeout(() => {
                              const el = document.getElementById("google-vids-section");
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                          }}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                        >
                          Launch Vids Demo Builder 🎙️
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                          <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-wider block">🗣️ Text-to-Speech Engine</span>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                            No mic needed. Put bracketed emotional cues like <em>[pause]</em> or <em>[Read this with an enthusiastic tone]</em> directly inside the Google Vids script box to automatically direct the expressiveness of the premium AI voices.
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-wider block">👤 Realistic AI Avatars</span>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                            Spawn high-fidelity virtual presenters in one click. Place a digital talking head directly onto your slide layers to handle complex pitch deliveries seamlessly.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MODULE 3 BLOCK */}
        <div className={cn("bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300", openSection === 3 ? "border-emerald-500/40 shadow-md shadow-emerald-500/5" : "hover:border-slate-300 shadow-xs")}>
          <button 
            onClick={() => toggleAccordion(3)}
            className="w-full p-6 text-left flex justify-between items-center transition-colors hover:bg-slate-50/50"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl bg-emerald-500/10 text-emerald-600">
                📄
              </div>
              <span className="font-bold text-base md:text-lg text-slate-800">
                3. NotebookLM: Grounded Internal Document Systems
              </span>
            </div>
            <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform duration-300", openSection === 3 && "transform rotate-180 text-emerald-600")} />
          </button>
          
          <AnimatePresence initial={false}>
            {openSection === 3 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden border-t border-slate-200/50 bg-slate-50/30"
              >
                <div className="p-6 space-y-6">
                  <div className="space-y-3">
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                      Section Context & RAG Theory
                    </span>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Lock critical information frameworks into completely isolated computational spaces. Eliminate data leakage mechanics while automatically converting massive internal logs into verified check-in structures.
                    </p>
                  </div>

                  {/* KNOWLEDGE GROUNDING THEORY CARD */}
                  <div className="bg-emerald-50/40 border border-emerald-100 p-4 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                      ⚡ Conceptual Bridge: Grounded RAG vs. Parametric Hallucination
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Standard conversational LLMs rely on their *parametric memory*—data digested during training. This training data is frozen and susceptible to "creative filling" (hallucination). NotebookLM represents a <span className="font-medium text-emerald-700">source-grounded system</span>. By locking the model's focus to your uploaded text sources, the model operates strictly as a semantic synthesizer of *only* verified facts, rendering secure document analysis entirely error-free.
                    </p>
                  </div>
                  
                  {/* Interactive Sandbox Asset D */}
                  <div className="bg-[#090d16] border border-[#1f2937] rounded-xl overflow-hidden shadow-md">
                    <div className="bg-[#0f172a] px-4 py-3 flex justify-between items-center border-b border-[#1f2937] gap-2">
                       <span className="text-xs font-bold text-[#fbbf24] uppercase tracking-wider">
                        📂 Copy Asset D: Core Technical Ingestion Dossier
                      </span>
                      <button 
                        onClick={() => handleCopy(ASSET_D, 'assetD')}
                        className="bg-white/5 border border-white/10 hover:border-[#22d3ee] flex items-center gap-1.5 text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all active:scale-95 whitespace-nowrap hover:bg-white/10"
                      >
                        {copiedId === 'assetD' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                        {copiedId === 'assetD' ? "Copied!" : "Copy Dossier"}
                      </button>
                    </div>
                    <pre className="p-4 font-normal text-xs text-[#cbd5e1] leading-relaxed overflow-y-auto max-h-[160px] whitespace-pre-wrap select-all bg-[#030712]/40 font-sans">
                      {ASSET_D}
                    </pre>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 text-purple-800 p-5 rounded-xl text-xs md:text-sm">
                    <strong>🏃‍♂️ Operational Lab Assignment (25 Minutes):</strong> Access{' '}
                    <a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer" className="text-google-blue font-bold underline hover:text-blue-700">
                      notebooklm.google.com
                    </a>{' '}
                    , mount Asset D as an independent text anchor source, and leverage the structural guide parameters to extract interactive glossaries and validation systems.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MODULE 4: GOOGLE VIDS: AI VOICEOVERS & AVATARS */}
        <div id="google-vids-section" className={cn("bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300", openSection === 4 ? "border-google-blue/40 shadow-lg shadow-google-blue/5" : "hover:border-slate-300 shadow-xs")}>
          <button 
            onClick={() => toggleAccordion(4)}
            className="w-full p-6 text-left flex justify-between items-center transition-colors hover:bg-slate-50/50"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl bg-google-blue/10 text-google-blue">
                🎥
              </div>
              <span className="font-bold text-base md:text-lg text-slate-800">
                4. Google Vids: AI Voiceover & Avatar Creator
              </span>
            </div>
            <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform duration-300", openSection === 4 && "transform rotate-180 text-google-blue")} />
          </button>
          
          <AnimatePresence initial={false}>
            {openSection === 4 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden border-t border-slate-200/50 bg-slate-50/30 font-sans text-xs"
              >
                <div className="p-6 space-y-6">
                  <div className="space-y-3">
                    <span className="bg-google-blue/10 text-google-blue text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                      VOICEOVER WORKFLOW & TEXT-TO-SPEECH
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-800">
                      Vids — Is it possible to change the voiceover to another voice instead of mine?
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      Yes, absolutely! You do not have to use your own voice at all. Google Vids has a built-in text-to-speech feature powered by Gemini that lets you generate highly realistic, expressive AI voiceovers instead. You just type or paste your script, and Google Vids will read it out loud.
                    </p>
                  </div>

                  {/* HOW TO USE */}
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 font-sans">
                      🎬 How to use an AI Voiceover in Google Vids
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-sans text-xs">
                      <div className="bg-white border border-slate-150 p-4 rounded-xl space-y-1 relative">
                        <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                          <span className="bg-purple-100 text-purple-700 text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">1</span>
                          Open Panel
                        </span>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                          Open your video project and look at the right-hand panel.
                        </p>
                      </div>

                      <div className="bg-white border border-slate-150 p-4 rounded-xl space-y-1 relative">
                        <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                          <span className="bg-purple-100 text-purple-700 text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">2</span>
                          Voiceover Icon
                        </span>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                          Click on the <strong>Voiceover</strong> icon in the actions panel.
                        </p>
                      </div>

                      <div className="bg-white border border-slate-150 p-4 rounded-xl space-y-1 relative">
                        <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                          <span className="bg-purple-100 text-purple-700 text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">3</span>
                          Set Scope
                        </span>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                          Choose whether you want to apply it to the <strong>Current scene</strong> or <strong>All scenes</strong>.
                        </p>
                      </div>

                      <div className="bg-white border border-slate-150 p-4 rounded-xl space-y-1 relative">
                        <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5 font-sans">
                          <span className="bg-purple-100 text-purple-700 text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">4</span>
                          Script & Voice
                        </span>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                          Type or paste your text into the script box (up to 2,500 characters per scene) and choose your preferred AI voice under the script box.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* LIVE DEMO: THE SEAMLESS GUEST JOURNEY */}
                  <div className="space-y-4 pt-6 border-t border-slate-200">
                    <div className="bg-gradient-to-r from-google-blue/10 to-indigo-50 border border-google-blue/20 p-5 rounded-2xl space-y-3">
                      <span className="bg-google-blue text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                        Active Video Project Demo
                      </span>
                      <h4 className="font-extrabold text-slate-800 text-sm">
                        🎬 Video Concept: "The Seamless Guest Journey"
                      </h4>
                      <p className="text-slate-600 font-normal leading-relaxed text-xs">
                        <strong>Goal:</strong> Demonstrate how a guest interacts with the HiJiffy AI chatbot from pre-stay to check-out, and how it saves time for hotel staff.
                      </p>
                      <p className="text-slate-600 font-normal leading-relaxed text-xs">
                        <strong>Visual Style:</strong> Clean, modern, corporate tech. Split-screen animations showing a guest's smartphone on one side and the hotel's backend dashboard on the other.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-slate-500">
                        🎞️ Scene-by-Scene Storyboard & AI Voiceover Scripts
                      </h4>

                      <div className="space-y-4">
                        {[
                          {
                            scene: "Scene 1: The Problem",
                            timing: "0:00 - 0:05",
                            visuals: "A split screen. On the left, a frustrated traveler staring at a laptop. On the right, a hotel front desk receptionist overwhelmed with phone calls and paperwork.",
                            tone: "Explainer or Narrator (Professional, slightly concerned tone)",
                            script: "In the hospitality industry, communication bottlenecks cost time and revenue. Guests want instant answers, but your front desk team can only handle so many calls at once.",
                            id: "vidsScene1"
                          },
                          {
                            scene: "Scene 2: Introducing the Solution",
                            timing: "0:05 - 0:12",
                            visuals: "Smooth transition to a smartphone screen displaying a beautiful hotel website. A friendly HiJiffy chat widget pops up at the bottom right corner.",
                            tone: "Persuader (Upbeat, confident)",
                            script: "[Read this with an enthusiastic tone]: Meet HiJiffy. Our Conversational AI platform integrates seamlessly across your website, WhatsApp, and social media to provide instant, 24/7 guest support.",
                            id: "vidsScene2"
                          },
                          {
                            scene: "Scene 3: Pre-Stay & Direct Booking",
                            timing: "0:12 - 0:22",
                            visuals: "Close-up of the smartphone screen. The AI chatbot quickly answers a guest's question about parking availability and automatically sends a direct booking link. The user clicks it.",
                            tone: "Educator (Clear, instructional)",
                            script: "From answering FAQs about amenities to driving direct bookings, HiJiffy guides your guests through a personalized booking funnel [pause] without requiring human intervention.",
                            id: "vidsScene3"
                          },
                          {
                            scene: "Scene 4: In-Stay Automation",
                            timing: "0:22 - 0:32",
                            visuals: "The guest is now seen walking into a hotel lobby. They receive a WhatsApp notification powered by HiJiffy: \"Welcome! Tap here to complete your digital check-in or request extra towels.\" A click of a button instantly alerts the housekeeping backend dashboard.",
                            tone: "Coach / Motivator (Dynamic, forward-thinking)",
                            script: "Once they arrive, automate digital check-ins, up-sell room upgrades, and handle guest requests instantly. Your staff only steps in when a human touch is truly needed.",
                            id: "vidsScene4"
                          },
                          {
                            scene: "Scene 5: Call to Action",
                            timing: "0:32 - 0:40",
                            visuals: "The screens fade out to reveal the HiJiffy logo and a clean tagline: “Reinventing Hotel Communication.” A URL appears underneath: hijiffy.cme.",
                            tone: "Persuader (Warm and inviting)",
                            script: "Empower your staff. [pause] Delight your guests. [Read this like it's a final call to action]: Book your personalized demo today at hijiffy.cme.",
                            id: "vidsScene5"
                          }
                        ].map((item) => (
                          <div key={item.id} className="bg-white border border-slate-150 rounded-xl overflow-hidden shadow-xs">
                            <div className="bg-slate-50 border-b border-slate-150 px-4 py-2.5 flex justify-between items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <span className="bg-google-blue/10 text-google-blue text-[10px] px-2 py-0.5 rounded font-bold font-mono">
                                  {item.timing}
                                </span>
                                <span className="font-extrabold text-slate-800 text-xs">
                                  {item.scene}
                                </span>
                              </div>
                              <button
                                onClick={() => handleCopy(item.script, item.id)}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-black flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-bold cursor-pointer transition-all active:scale-95 border border-slate-200 shadow-xs"
                              >
                                {copiedId === item.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                                {copiedId === item.id ? "Copied Script!" : "Copy Script"}
                              </button>
                            </div>
                            <div className="p-4 space-y-3">
                              <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">Visual Scene Setup</span>
                                <p className="text-slate-600 text-[11px] leading-relaxed font-normal">{item.visuals}</p>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2.5 border-t border-slate-100">
                                <div>
                                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">Recommended AI Tone</span>
                                  <p className="text-indigo-600 text-[11px] font-bold leading-normal">{item.tone}</p>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">AI Voiceover Script</span>
                                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-[11px] font-mono italic text-slate-800 select-all leading-relaxed whitespace-pre-wrap">
                                    "{item.script}"
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>


                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function AssetBlock({ label, text }: { label: string, text: string }) {
  return (
    <div className="bg-white p-3 rounded-xl border border-slate-200">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{label}</span>
        <button onClick={() => navigator.clipboard.writeText(text)} className="text-[9px] text-google-blue font-bold hover:underline">Copy</button>
      </div>
      <p className="text-[10px] text-slate-600 font-mono line-clamp-2 italic">"{text}"</p>
    </div>
  );
}

function DemoLabContent() {
  const [activeLab, setActiveLab] = useState<'sheets' | 'slides' | 'notebook' | 'sites'>('sheets');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [stepStates, setStepStates] = useState<Record<string, boolean>>({});

  const triggerCopyLab = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleStep = (stepId: string) => {
    setStepStates(prev => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const resetSteps = () => {
    setStepStates({});
  };

  const labs = {
    sheets: {
      title: "Google Sheets & Docs",
      subtitle: "One-Click Guest Categorization & Support Drafting",
      icon: Table,
      color: "text-google-green bg-google-green/10",
      description: "Learn how to use the Gemini Side-Panel in Google Sheets & Docs. This demo takes unorganized review rows, processes sentiment, extracts categories, and translates them into an elegant on-brand recovery draft in seconds.",
      steps: [
        { id: "s-1", text: "Create a fresh Google Sheet by typing sheets.new into your browser search bar." },
        { id: "s-2", text: "Add four column headers in Row 1: Name, Room, Raw Feedback, and Gemini Sentiment Analysis." },
        { id: "s-3", text: "Copy the 'Sample Guest Feedback Rows' from the blueprint below and paste them into cells A2 through C5." },
        { id: "s-4", text: "On the top right of your Sheet, click the sparkly blue Ask Gemini icon to open the native Assistant Side-Panel." },
        { id: "s-5", text: "Copy the 'Sheets Automation Prompt Formula' below, paste it into the Gemini sidebar, and run it. Watch it analyze cells row-by-row with absolute precision!" },
        { id: "s-6", text: "Now open docs.new and click the 'Help me write' blue icon to auto-generate a custom 'Guest Recovery Blueprint' from your classified sheet findings." }
      ],
      blueprintHeader1: "📋 Blueprint A: Sample Guest Feedback Spreadsheet Rows",
      blueprintData1: `Marcus Vance,Room 304,"We had a wonderful 3-night stay. However, the early morning cleaning staff was very loud in the hallway at 7am on Sunday, waking us up before checkout. Front desk staff Sophia was helpful. But we missed breakfast because of the noise delay. Would love a slight recovery voucher."
Chloe Dupont,Room 102,"Extremely upset. The Wi-Fi did not work in our room at all. I had three Zoom calls for my B2B agency that failed. Sophia at check-in tried, but we did not receive any technical support. We want a full refund of our company travel stay."
Julian Sterling,Room 501 (VIP Suite),"Outstanding honeymoon arrival! The room was beautifully decorated with flowers, and the check-in queue was non-existent. We really enjoyed the complimentary spa access. Just wanted to say thank you to Sophia!"
Dr. Elena Rostova,Room 212,"The room thermostat is entirely broken. The heating was locked to 26 degrees Celsius the entire night. It felt like a sauna, making it impossible to sleep. This ruined our wellness weekend anniversary."`,
      blueprintHeader2: "✍️ Blueprint B: Sheets Sidebar Prompt Formula",
      blueprintData2: `Act as a Senior Guest Relations Auditor. Review the customer feedback in Column C.
1. Classify the Sentiment for each guest as: [Positive / Neutral / Highly Frustrated].
2. Map the Department responsible: [Housekeeping / Tech Support / Front Office / Facilities].
3. Suggest a specific on-brand compensation (e.g. complimentary room upgrade, gourmet dining voucher, or free spa access) matching our brand value of 'Friction-free Service'.
4. Output the results in a structured list referencing each guest's name.`
    },
    slides: {
      title: "In-App Sidebar Layout Playbook",
      subtitle: "Generate Structured Visual Decks Step-by-Step",
      icon: Presentation,
      color: "text-google-yellow bg-google-yellow/10",
      description: "Perfect for non-technical employees! Learn the absolute easiest zero-code method to prepare professional presentations: draft the full outline in the Gemini Web App first, then build and style slides page-by-page using the native Slides Sidebar.",
      steps: [
        { id: "sl-1", text: "Open a fresh Google Slides presentation in your browser by typing slides.new." },
        { id: "sl-2", text: "Open the Gemini Web App (gemini.google.com) to brainstorm layout structures." },
        { id: "sl-3", text: "Copy the 'Enterprise Slides Brainstorm Draft' from our blueprint library below." },
        { id: "sl-4", text: "Paste the draft prompt into the Gemini Web App and run it to produce a pristine slide outline." },
        { id: "sl-5", text: "Back in Google Slides, click the sparkle Ask Gemini icon in the top toolbar to open the Sidebar." },
        { id: "sl-6", text: "Copy the 'Sidebar Design Formula' blueprint, paste it into the Sidebar, and click on your favorite design suggestion." },
        { id: "sl-7", text: "Click the 'Insert Slide' button on the Sidebar to automatically compile the page onto your canvas—no code required!" }
      ],
      blueprintHeader1: "💡 Blueprint A: Gemini Web App Outline Brainstorm Prompt",
      blueprintData1: `Act as a B2B Sales Coach & Presentation Specialist. Design a highly focused, professional 4-slide presentation outline for an enterprise partner based on this client pain point: "Our front desk is slow; they waste hours on manual emails and check-ins."

Format your output structure slide-by-slide as follows:
- Slide 1: Welcome & Premium Presentation Title (Using terms like "Privilege Access")
- Slide 2: Situation & Friction Analysis (Using our B2B SPICED framework)
- Slide 3: Proposed Solution Blueprint (Detailing automated onboarding)
- Slide 4: Strategic ROI Impact (E.g. +34% reservation velocity)`,
      blueprintHeader2: "🎨 Blueprint B: Slides In-App Sidebar Layout Formula",
      blueprintData2: `Create a professional presentation slide introducing "Conversational AI Implementation".
Use the following bullet points:
- Zero Friction Onboarding: Seamless automated check-in pipeline
- Saved Effort: Eliminates 12 minutes of average manual staff delay per customer
- Brand Alignment: Maintains our luxury service standards

Provide a clean grid or column-based slide design.`
    },
    notebook: {
      title: "NotebookLM Deep Dive",
      subtitle: "Eliminating Hallucinations with Grounded Manuals",
      icon: BookOpen,
      color: "text-google-green bg-google-green/10",
      description: "Discover how to isolate a model's knowledge exclusively to corporate manuals. If the facts are not in the uploaded pages, the AI will refuse to synthesize them—guaranteeing 0% hallucinations. Follow up by generating a custom podcast overview.",
      steps: [
        { id: "nb-1", text: "Navigate to notebooklm.google.com and sign in with your Google Workspace credentials." },
        { id: "nb-2", text: "Create a new Sandbox notebook called 'HiJiffy Operations Knowledge Center'." },
        { id: "nb-3", text: "Under 'Add Sources', select 'Copied Text'. Copy the 'Brand Policy & VIP SOP' text below and paste it as a custom source." },
        { id: "nb-4", text: "In the central chat panel, test its factual isolation by running 'Probing Question 1' or '2'. Watch it pull the perfect quote with precise page references." },
        { id: "nb-5", text: "Now ask 'Probing Question 3' (which represents a typical ungrounded hallucination risk). Watch the system refuse to make up an answer, citing that it's outside the manual!" },
        { id: "nb-6", text: "On the right menu, open the 'Notebook guide' and click 'Generate Audio Overview'. Wait 1-2 minutes to download a high-fidelity conversational audio summary of your hotel policies!" }
      ],
      blueprintHeader1: "🏨 Blueprint A: Copied Source (SOP-2026 Manual)",
      blueprintData1: `======= HIJIFFY OFFICIAL HOSPITALITY STANDARD OPERATING PROCEDURES (SOP-2026) =======

[SECTION 1: ZERO-REFUSAL POLICY FOR ROOM UPGRADES]
Our company operates strictly under the 'Guest First' pledge. Staff are given 100% decision autonomy for on-the-spot customer recoveries. If a guest experiences an Operational Defect (defined below), front-desk technicians must immediately offer a complimentary room upgrade (subject to availability) or a private wellness spa pass. Managers do NOT need to be contacted for authorization.
* Operational Defects include: air conditioning breakdown, Wi-Fi outage lasting >1 hour, noise complaints due to building maintenance, or missed scheduled check-in window.

[SECTION 2: CUSTOM SALES RATE STRUCTURES & PRIVILEGES]
Negotiating with corporate reservation planners is subject to strict constraints:
- For groups booking less than 15 total room-nights, never offer direct percentage discounts off room rates. This preserves premium brand margins. Instead, offer Complimentary Wellness Amenities (valued at up to $150 per guest), which include luxury gym access or gourmet room dining passes.
- Groups booking 15+ room-nights may receive a maximum of 10% room discount, which must include a mandatory $50 resort fee per guest.

[SECTION 3: BRAND COLOR & WRITING WORDS TO AVOID]
To maintain a premium, consultative, and sophisticated brand positioning, certain transactional terms are strictly banned in all email correspondence:
- NEVER use words like: 'cheap stay', 'discount code', 'cheap rate', or 'budget room'.
- INSTEAD use high-end equivalents: 'exclusive rate privileges', 'special premium access', 'complimentary wellness retreat inclusion', or 'luxury sanctuary pricing'.

======= END OF SOP-2026 MANUAL =======`,
      blueprintHeader2: "🎯 Blueprint B: Probing Questions & Hallucination Solvers",
      blueprintData2: `Question 1 (Exact Retrieval):
"A guest in Room 202 suffered a major AC leak and missed breakfast. According to Section 1 of our SOP, what specific actions are staff authorized to take immediately?"

Question 2 (Strategic Guideline Negotiation):
"An event organizer wants to book a 10-night stay for their team. They want a 15% discount on room prices. Can we offer this? What is our alternative brand policy?"

Question 3 (The Hallucination Trap):
"What is our corporate refund policy if a guest's pet gets sick in our lobby cafe?"`
    },
    sites: {
      title: "Google Sites AI Hub",
      subtitle: "Build a Shared Prompt Library for your CS Team",
      icon: Layout,
      color: "text-google-blue bg-google-blue/10",
      description: "Harness the power of a centralized hub. Learn how to launch a joint resource center on Google Sites completely without code. Ask Gemini to structure the exact wireframe layout, create categorized sections, and compile a shared prompt handbook for the entire team to copy-paste.",
      steps: [
        { id: "st-1", text: "Go to sites.google.com/new and create a new blank site called 'HiJiffy AI Resource Center'." },
        { id: "st-2", text: "Open the Gemini Web App (gemini.google.com) or Side Panel in Docs." },
        { id: "st-3", text: "Copy the 'Internal AI Prompt Hub Wireframe' blueprint prompt below and run it to receive a structured grid blueprint." },
        { id: "st-4", text: "In Google Sites, use the 'Content Blocks' layout on the right menu to build 3 columns corresponding to your sections: Foundations, SPICED Library, and Operations SOP." },
        { id: "st-5", text: "Upload our prepared Copy-Paste Blueprints directly under each section as embedded notes so team members can copy them in 1 click!" }
      ],
      blueprintHeader1: "💡 Blueprint A: Google Sites Structure Layout Wireframe Prompt",
      blueprintData1: `Act as a UX/UI Intranet Specialist and Customer Success Director.
Design a cohesive wireframe and layout plan for a premium internal "AI Prompt Hub" hosted on Google Sites.
The portal must organize our team resources into three clear blocks:
1. BLOCK 1 (Foundations): Links to Sandbox tools, RTC prompt cheat sheets, and basic safety guides.
2. BLOCK 2 (SPICED Library): Pre-composed templates for classifying messy customer feedback.
3. BLOCK 3 (Operations SOP): Reference guidelines parsed from our SOP-2026 handbook.

Provide the visual arrangement plan, recommend exact header labels, and draft a welcoming description card.`,
      blueprintHeader2: "🎨 Blueprint B: Shared AI Team Prompts",
      blueprintData2: `Copy-paste greeting to embed on your Google Sites Home Banner:
"Welcome to the HiJiffy Customer Success AI Hub! 🚀
This centralized portal is designed to supercharge your daily operational workflows. Follow the interactive step guides, copy the calibrated blueprints, and load them directly into Sheets, Docs, or AI Studio.
Let's keep response velocity at 100% and friction at 0%!"`
    }
  };

  const currentLab = labs[activeLab];
  const LabIcon = currentLab.icon;

  return (
    <div className="space-y-12">
      {/* Intro block */}
      <section className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1 rounded-full bg-google-green/10 text-google-green text-xs font-black uppercase tracking-widest">
          🛠️ Interactive Sandbox & Hands-On Demo Lab
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight font-google">
          Real Tool Demonstration Center
        </h2>
        <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
          Skip the simulations and build in the actual professional toolkits. Copy the exact prompt guides, templates, playbooks, and manual segments optimized for <strong>Workspace Panels</strong>, <strong>Google Slides</strong>, <strong>NotebookLM</strong>, and <strong>Google Sites</strong>.
        </p>
      </section>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Selector */}
        <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-24">
          <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-3xl space-y-2">
            <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-2 mb-3">SELECT YOUR WORKFLOW LAB</h4>
            {(Object.keys(labs) as Array<keyof typeof labs>).map((labKey) => {
              const lab = labs[labKey];
              const Icon = lab.icon;
              return (
                <button
                  key={labKey}
                  onClick={() => { setActiveLab(labKey); }}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-3",
                    activeLab === labKey
                      ? "border-google-green bg-google-green/5 shadow-xs text-google-green font-bold"
                      : "border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  )}
                >
                  <div className={cn("p-2 rounded-xl shrink-0", activeLab === labKey ? "bg-google-green/15 text-google-green" : "bg-slate-250 text-slate-400")}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs uppercase font-extrabold tracking-wider">{lab.title}</h5>
                    <p className="text-[10px] text-slate-400 font-normal line-clamp-1 mt-0.5">{lab.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 space-y-3">
            <h5 className="font-bold text-emerald-600 text-xs uppercase tracking-wider flex items-center gap-2">
              <Presentation className="w-4 h-4" /> Active Screen-Share Lab Mode
            </h5>
            <p className="text-slate-600 text-[11px] leading-relaxed font-sans">
              <strong>💡 Facilitator Tip:</strong> To keep this session maximally interactive and hands-on, invite a participant to share their screen and construct the live outputs directly on their device. Coach them as they copy these debugged blueprint ingredients into Sheets or Docs live!
            </p>
            <div className="pt-2 flex justify-between items-center text-[10px] text-slate-400">
              <span>Prepared for Hello@lilitarutyunyan.com</span>
              <button onClick={resetSteps} className="text-google-blue hover:underline font-bold">Reset Checklists</button>
            </div>
          </div>
        </div>

        {/* Lab Workspace part */}
        <div className="lg:col-span-8 glass-card bg-white border-slate-200 p-6 md:p-8 space-y-8 shadow-md">
          {/* Lab Header block */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={cn("px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest", currentLab.color)}>
                  ACTIVE MODULE
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Booster Blueprint</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">{currentLab.title}</h3>
              <p className="text-slate-500 text-xs italic">{currentLab.subtitle}</p>
            </div>
            {/* Quick tool outbound link */}
            <a
              href={
                activeLab === 'sheets' ? "https://sheets.new" : 
                activeLab === 'slides' ? "https://slides.new" : 
                activeLab === 'notebook' ? "https://notebooklm.google.com" : 
                activeLab === 'sites' ? "https://sites.google.com/new" :
                "https://aistudio.google.com"
              }
              target="_blank"
              referrerPolicy="no-referrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase transition-all shadow hover:bg-slate-800 self-center"
            >
              Launch Actual Tool <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Description */}
          <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed">
            {currentLab.description}
          </div>

          {/* CHECKLIST */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
              💼 LIVE STEP-BY-STEP CHECKLIST (CLICK STEPS TO LOG PROGRESS)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentLab.steps.map((step, idx) => (
                <div 
                  key={step.id}
                  onClick={() => toggleStep(step.id)}
                  className={cn(
                    "flex gap-3 items-start p-3 rounded-xl border transition-all cursor-pointer select-none",
                    stepStates[step.id] ? "bg-google-green/5 border-google-green/30 text-slate-700" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  )}
                >
                  <button className="mt-0.5 shrink-0" aria-label="Toggle step completion">
                    {stepStates[step.id] ? (
                      <CheckCircle2 className="w-4 h-4 text-google-green fill-current bg-white rounded-full" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-slate-300 rounded-md bg-white hover:border-google-blue transition-colors" />
                    )}
                  </button>
                  <div className="text-[11px] leading-relaxed">
                    <span className="text-slate-400 font-bold mr-1">{idx + 1}.</span>
                    <span className={cn(stepStates[step.id] ? "line-through text-slate-400 font-medium" : "")}>
                      {step.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BLUEPRINTS & COPY BLOCKS */}
          <div className="space-y-6 pt-4 border-t border-slate-100">
            <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
              📂 COPYABLE TRAINING BLUEPRINTS
            </h4>

            {/* Block 1 */}
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                  {currentLab.blueprintHeader1}
                </span>
                <button 
                  onClick={() => triggerCopyLab(currentLab.blueprintData1, `${activeLab}-b1`)}
                  className="text-xs text-google-blue hover:underline font-bold flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  {copiedId === `${activeLab}-b1` ? "Copied Blueprint" : "Copy Payload"}
                </button>
              </div>
              <pre className="font-mono text-[10px] leading-relaxed text-slate-600 max-h-56 overflow-y-auto bg-white p-3.5 border border-slate-150 rounded-xl whitespace-pre-wrap">
                {currentLab.blueprintData1}
              </pre>
            </div>

            {/* Block 2 */}
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                  {currentLab.blueprintHeader2}
                </span>
                <button 
                  onClick={() => triggerCopyLab(currentLab.blueprintData2, `${activeLab}-b2`)}
                  className="text-xs text-google-blue hover:underline font-bold flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  {copiedId === `${activeLab}-b2` ? "Copied Formula" : "Copy Formula"}
                </button>
              </div>
              <pre className="font-mono text-[10px] leading-relaxed text-slate-600 max-h-56 overflow-y-auto bg-white p-3.5 border border-slate-150 rounded-xl whitespace-pre-wrap">
                {currentLab.blueprintData2}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PresenterNotesSidePanel({ session, onClose }: { session: SessionType, onClose: () => void }) {
  const notes = session === 'session1' 
    ? SESSION1_PRESENTER_NOTES 
    : session === 'session2' 
      ? SESSION2_PRESENTER_NOTES 
      : DEMOLAB_PRESENTER_NOTES;

  const [activeNoteId, setActiveNoteId] = useState<string | null>(notes[0]?.id || null);

  return (
    <motion.aside
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
      className="fixed lg:sticky top-[73px] right-0 bottom-0 w-full lg:w-[400px] bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col z-40 shadow-2xl h-[calc(100vh-73px)] overflow-hidden font-sans"
    >
      <div className="p-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-500 text-slate-900 rounded-lg">
            <Mic className="w-4 h-4 text-black" />
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-amber-500">Instructor Copilot</h3>
            <p className="text-xs text-slate-400 font-semibold">Session Scripts & Actions</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
        <div className="space-y-3">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-xs md:text-sm text-slate-200 leading-relaxed">
            💡 <strong>Monitor Setup:</strong> Keep this trainer companion opened on your secondary screen or presenter display. Slide pages dynamically to match your slide decks!
          </div>
          <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/10 text-xs md:text-sm text-emerald-300 leading-relaxed">
            🔥 <strong>Screen-Sharing Strategy:</strong> To make this session incredibly hands-on, invite students to share their screens! Ask them to build prompts live using the interactive builder or solve one of the challenge metrics themselves. It guarantees massive engagement and lets them learn by doing!
          </div>
        </div>

        <div className="space-y-3">
          {notes.map((note) => {
            const isActive = activeNoteId === note.id;
            return (
              <div 
                key={note.id}
                className={cn(
                  "border rounded-2xl transition-all overflow-hidden",
                  isActive 
                    ? "border-amber-500/50 bg-slate-950/40 shadow-md" 
                    : "border-slate-800 bg-slate-850 hover:bg-slate-800/50 cursor-pointer"
                )}
              >
                <div 
                  onClick={() => setActiveNoteId(isActive ? null : note.id)}
                  className="p-4 flex justify-between items-center gap-3 select-none"
                >
                  <span className="font-bold text-sm md:text-base text-slate-100">{note.title}</span>
                  <ChevronDown className={cn("w-5 h-5 text-slate-405 transition-all shrink-0", isActive && "rotate-180 text-amber-500")} />
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-800 bg-slate-950/20 p-4 space-y-4 text-sm leading-relaxed"
                    >
                      {/* Hook */}
                      <div className="p-3 bg-amber-500/10 border-l-2 border-amber-500 rounded-r-xl text-amber-300 font-semibold text-xs md:text-sm leading-relaxed">
                        <strong>🎤 Opening Hook:</strong> "{note.hook}"
                      </div>

                      {/* Speaking Script */}
                      <div className="space-y-1.5">
                        <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">🎙️ Reading / Talking Script:</span>
                        <p className="text-slate-100 text-xs md:text-sm bg-slate-900 p-3.5 rounded-xl border border-slate-850 whitespace-pre-line leading-relaxed font-normal">
                          {note.script}
                        </p>
                      </div>

                      {/* Demo Choreography */}
                      <div className="space-y-1.5">
                        <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">👉 Interactive Demo Actions:</span>
                        <ul className="space-y-2 list-none pl-0">
                          {note.demoActions.map((action, i) => (
                            <li key={i} className="flex gap-2 items-start text-slate-200 text-xs md:text-sm leading-relaxed">
                              <span className="text-amber-500 font-bold shrink-0">◇</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Engagement Questions */}
                      <div className="space-y-1.5">
                        <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">❓ Student Engagement Checks:</span>
                        <ul className="space-y-1.5 list-none pl-0">
                          {note.engagementQuestions.map((q, i) => (
                            <li key={i} className="flex gap-2 items-start text-slate-200 text-xs md:text-sm leading-relaxed">
                              <span className="text-slate-500 font-bold shrink-0">?</span>
                              <span className="italic">"{q}"</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pro Tips */}
                      {note.proTips && note.proTips.length > 0 && (
                        <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-500/20 text-sky-300 text-xs leading-relaxed">
                          <strong>💡 Pro Tip:</strong> {note.proTips[0]}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
}

// ==========================================
// COMPANION MODULE HELPERS
// ==========================================

function DemoButton({ label, href, color }: { label: string; href: string; color?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm cursor-pointer"
    >
      {label}
      <ExternalLink className="w-4 h-4" />
    </a>
  );
}

function HallucinationCard({ item }: { item: any; key?: any }) {
  const [selected, setSelected] = useState<boolean | null>(null);
  
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs text-left space-y-3">
      <h5 className="font-bold text-slate-800 text-sm">{item.title}</h5>
      <p className="text-xs text-slate-600 bg-slate-50/70 p-3 rounded-xl italic row">"{item.statement}"</p>
      
      <div className="flex gap-3">
        <button
          onClick={() => setSelected(true)}
          className={cn(
            "px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
            selected === true
              ? (item.isHallucination ? "bg-emerald-500 text-white" : "bg-red-500 text-white")
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          )}
        >
          Is Hallucination
        </button>
        <button
          onClick={() => setSelected(false)}
          className={cn(
            "px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
            selected === false
              ? (!item.isHallucination ? "bg-emerald-500 text-white" : "bg-red-500 text-white")
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          )}
        >
          Is Fact / Reliable
        </button>
      </div>

      {selected !== null && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={cn(
            "p-3 rounded-xl text-xs leading-relaxed border transition-colors",
            (selected === item.isHallucination)
              ? "bg-emerald-50 text-emerald-800 border-emerald-100"
              : "bg-rose-50 text-rose-800 border-rose-100"
          )}
        >
          <div className="font-bold mb-1">
            {selected === item.isHallucination ? "✨ Correct!" : "❌ Incorrect, but keep practicing!"}
          </div>
          {item.explanation}
        </motion.div>
      )}
    </div>
  );
}

function PromptBuilder() {
  const [role, setRole] = useState(PROMPT_GENERATOR_OPTIONS.roles[0]);
  const [task, setTask] = useState(PROMPT_GENERATOR_OPTIONS.tasks[0]);
  const [context, setContext] = useState(PROMPT_GENERATOR_OPTIONS.contexts[0]);
  const [copied, setCopied] = useState(false);

  const fullPrompt = `Act as ${role.value}. I need you to ${task.value}, and do so ${context.value}. Make sure to produce an ultra friction-free output.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/60 shadow-sm text-left space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
          <Wand2 className="w-5 h-5 flex shrink-0" />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 font-google text-lg">Interactive Prompt Constructor</h4>
          <p className="text-slate-500 text-xs mt-0.5 font-sans font-normal">Understand how the 3 key ingredients lock together to maximize prompt consistency.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ingredient 1: Role */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-blue-500 block">1. Role (Who?)</label>
          <select
            value={role.label}
            onChange={(e) => {
              const selected = PROMPT_GENERATOR_OPTIONS.roles.find(r => r.label === e.target.value);
              if (selected) setRole(selected);
            }}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer font-sans"
          >
            {PROMPT_GENERATOR_OPTIONS.roles.map((r, i) => (
              <option key={i} value={r.label}>{r.label}</option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400 italic">"{role.example}"</p>
        </div>

        {/* Ingredient 2: Task */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-amber-500 block">2. Task (What?)</label>
          <select
            value={task.label}
            onChange={(e) => {
              const selected = PROMPT_GENERATOR_OPTIONS.tasks.find(t => t.label === e.target.value);
              if (selected) setTask(selected);
            }}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer font-sans"
          >
            {PROMPT_GENERATOR_OPTIONS.tasks.map((t, i) => (
              <option key={i} value={t.label}>{t.label}</option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400 italic">"{task.example}"</p>
        </div>

        {/* Ingredient 3: Context */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-emerald-500 block">3. Context (How?)</label>
          <select
            value={context.label}
            onChange={(e) => {
              const selected = PROMPT_GENERATOR_OPTIONS.contexts.find(c => c.label === e.target.value);
              if (selected) setContext(selected);
            }}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer font-sans"
          >
            {PROMPT_GENERATOR_OPTIONS.contexts.map((c, i) => (
              <option key={i} value={c.label}>{c.label}</option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400 italic">"{context.example}"</p>
        </div>
      </div>

      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 relative space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Compiled 3-Ingredient Prompt:</span>
          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-white/10 hover:bg-white/15 text-white font-bold rounded-lg text-xs uppercase transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
            {copied ? "Copied!" : "Copy prompt"}
          </button>
        </div>
        <div className="text-emerald-400 font-mono text-xs md:text-sm leading-relaxed p-3.5 bg-slate-900 rounded-xl border border-slate-800 select-all">
          {fullPrompt}
        </div>
      </div>
    </div>
  );
}

function GemInteractive() {
  const [activeGem, setActiveGem] = useState(GEMS_EXAMPLES[0]);
  const [inputText, setInputText] = useState("Guest feedback: standard check-out was late. Sam at desk was normal.");
  const [simOutcome, setSimOutcome] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const triggerSim = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (activeGem.name === "Response Butler") {
        setSimOutcome(`[Response Butler Output]
Thank you for your valuable feedback. We sincerely apologize that your check-out transit fell short of premium standards.

Our Guest Relations Directors have scheduled a direct alignment session with Sam and the desk team to ensure seamless and polite transitions. To show our gratitude for your stay, we have processed a priority VIP pass on your account for your next visit.

Best regards,
Response Butler`);
      } else if (activeGem.name === "Marketing Whisperer") {
        setSimOutcome(`[Marketing Whisperer Output]
📢 Guest insight alert! 🚨

"Check-out delay feedback received." 

🔑 KEY TAKEAWAYS:
• Highlighting consistent staff courtesy (Sam was polite!).
• Opportunities to streamline our check-out pacing.

Let's maintain high momentum and make today friction-free! 🌟🚀`);
      } else {
        setSimOutcome(`[Experience Guru Output]
Hello traveler! 🌿

Thank you for sharing your checkout thoughts. Next time you visit us, make sure to ask Sam about our secret rooftop library cafe—it's a peaceful sanctuary that lets you unwind and escape the hustle while our priority concierge completes your room arrangements.

Safe journeys! ✨`);
      }
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/60 shadow-sm text-left space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
          <Brain className="w-5 h-5 text-blue-600 flex shrink-0" />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 font-google text-lg">Custom Gems Architect Simulator</h4>
          <p className="text-slate-500 text-xs mt-0.5 font-sans font-normal">Experience how preset instructions govern AI persona responses on the fly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans">
        {GEMS_EXAMPLES.map((g, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveGem(g);
              setSimOutcome("");
            }}
            className={cn(
              "p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between gap-2",
              activeGem.name === g.name
                ? "border-blue-500 bg-blue-50/40 shadow-xs"
                : "border-slate-200 hover:bg-slate-50"
            )}
          >
            <div>
              <span className="text-xs font-bold text-slate-800 block">{g.name}</span>
              <span className="text-[10px] text-slate-400 block font-normal">{g.role}</span>
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-2 italic font-normal font-sans">"{g.instructions}"</p>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block font-google">System Persona Active Instructions:</label>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs text-slate-650 font-mono italic">
            "{activeGem.instructions}"
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block font-google">User Message Inquiry Input:</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none font-sans"
            rows={2}
          />
        </div>

        <button
          onClick={triggerSim}
          disabled={isProcessing}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs md:text-sm shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 font-sans"
        >
          {isProcessing ? "Processing via Special Instruction..." : `Wake up and Query ${activeGem.name}`}
        </button>

        {simOutcome && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 whitespace-pre-wrap text-left leading-relaxed animate-fade-in"
          >
            {simOutcome}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function DeepResearchCard() {
  const [query, setQuery] = useState("Scan GDPR implications for third-party guest messaging nodes on hotel properties.");
  const [status, setStatus] = useState<'idle' | 'searching' | 'parsing' | 'done'>('idle');
  const [results, setResults] = useState("");

  const runResearch = () => {
    setStatus('searching');
    setTimeout(() => {
      setStatus('parsing');
      setTimeout(() => {
        setStatus('done');
        setResults(`🔍 Deep Research Search Grounding Audit:
1. Checked GDPR Art. 32 (Security of Processing).
2. Audited 14 hotel WhatsApp API integration portals.
3. Verified compliance logs.

Result: PASS with minor recommendations on endpoint encryption audits.`);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/60 shadow-sm text-left h-full flex flex-col justify-between space-y-4">
      <div className="space-y-4 font-sans">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
            <Search className="w-5 h-5 flex shrink-0" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 font-google text-lg">Deep Research Grounding Engine</h4>
            <p className="text-slate-500 text-xs font-sans font-normal">Simulate live compliance auditing and deep verification passes on hotel policies.</p>
          </div>
        </div>

        <div className="space-y-1.5 font-sans">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block font-google">Auditing Query:</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-sans"
          />
        </div>
      </div>

      <div className="space-y-3 font-sans">
        <button
          onClick={runResearch}
          disabled={status !== 'idle' && status !== 'done'}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs md:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 font-sans"
        >
          {status === 'searching' && "🔍 Grounding across GDPR database..."}
          {status === 'parsing' && "🧠 Synthesizing comparative compliance..."}
          {(status === 'idle' || status === 'done') && "Trigger Deep Research Pass"}
        </button>

        {results && status === 'done' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 text-left leading-relaxed animate-fade-in"
          >
            {results}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function FeedbackModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setRating(null);
      setMessage("");
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in animate-duration-200 font-sans">
      <div className="bg-white rounded-3xl border border-slate-200/60 max-w-md w-full p-6 md:p-8 shadow-2xl relative space-y-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
          <X className="w-5 h-5 flex shrink-0" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-slate-800 font-google">Continuous Bootcamp Feedback</h4>
              <p className="text-xs text-slate-500 font-sans font-normal">Your reviews directly modify our upcoming advanced training curricula.</p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block font-google">Rating:</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={cn(
                      "p-1 rounded-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer",
                      rating && rating >= star ? "text-amber-500" : "text-slate-300"
                    )}
                  >
                    <Star className="w-8 h-8 fill-current flex shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 font-sans">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block font-google">Your Review remarks:</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How did you find our prompting examples and workspace simulations?"
                rows={4}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!rating || !message}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 font-sans"
            >
              Submit Feedback
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-8 space-y-4"
          >
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 flex shrink-0" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 font-google text-lg">Thank You So Much!</h4>
              <p className="text-xs text-slate-500 font-sans font-normal">Your feedback has been successfully captured inline.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
