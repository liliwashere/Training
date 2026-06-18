import React, { useState } from 'react';
import { 
  Mail, 
  FileText, 
  Table, 
  Presentation, 
  Check, 
  Copy, 
  Sparkles 
} from 'lucide-react';
import { cn } from '../lib/utils';

export function InteractiveWorkspaceArena() {
  const [activeTab, setActiveTab] = useState<'gmail' | 'docs' | 'sheets' | 'slides'>('gmail');
  const [isCopied, setIsCopied] = useState(false);

  const workflowScenarios = {
    gmail: {
      title: "Tactical Email Reply (Gmail Side Panel)",
      tool: "Gmail Extension (Context-Aware)",
      scenario: "Subject: Urgent: AC leaking in Room 202 - Anniversary Guest stay issue",
      prompt: "Act as a Guest Experience Manager. Draft a 150-word empathetic response offering a room upgrade and complimentary champagne to fix the anniversary stay.",
      previewText: "Dear Anniversary Guest,\n\nI am deeply sorry to hear about the water inconvenience in Room 202 on your 10th anniversary. \n\nWe have automatically processed a luxury suite upgrade and a bottle of champagne is on its way to your current room.\n\nWarmly,\nGuest Experience Manager",
      icon: Mail,
      color: "blue",
      why: [
        "Read context of current email inside the Gmail client directly",
        "Inserts response draft into the compose box with one simple click",
        "Empathetic tone matches client relations operational standards"
      ]
    },
    docs: {
      title: "Content Generation (Docs Side Panel)",
      tool: "Docs Side Panel Extension",
      scenario: "Raw notes: 'Check-in: 1. greet, 2. check ID, 3. breakfast is 7-10am.'",
      prompt: "Rewrite these raw check-in steps into a beautiful Guest Welcome Guide. Use welcoming, inviting language and describe our core philosophy.",
      previewText: "✨ WELCOME TO THE HIGHEST LEVEL OF HOSPITALITY ✨\n\nWe are absolutely delighted to host you.\n\n1. Check-in & Comfort: Your check-in begins with a personal greeting. Please provide your identification.\n2. Breakfast Hours: Join us for a curated breakfast between 7:00 AM and 10:00 AM.",
      icon: FileText,
      color: "green",
      why: [
        "Allows highlight-to-rewrite functions directly on the page",
        "Formats document headers and paragraph styles seamlessly",
        "Excellent for guides, operational write-ups, and email templates"
      ]
    },
    sheets: {
      title: "Data Classification (Sheets Side Panel)",
      tool: "Sheets Extension / Data Helper",
      scenario: "Feedback logs: '1. Eggs cold. 2. Staff nice. 3. Pool dirty.'",
      prompt: "Classify this feedback list into: 'Sentiment' (Positive/Negative), 'Department' (F&B/Rooms), 'Action Required' (Yes/No). Format as tabular data.",
      previewText: "| Feedback | Sentiment | Department | Action Required |\n|---|---|---|---|\n| Eggs cold | Negative | F&B | Yes |\n| Staff nice | Positive | Personnel | No |\n| Pool dirty | Negative | Facilities | Yes |",
      icon: Table,
      color: "yellow",
      why: [
        "Processes structured columns without manual calculations",
        "Allows bulk text sentiment tagging and categorization",
        "Great for hospitality feedback analytics and customer satisfaction metrics"
      ]
    },
    slides: {
      title: "Strategy Pitch (Gemini Standalone Chat)",
      tool: "Gemini Chat (gemini.google.com)",
      scenario: "Proposal: 'Rooftop Bar renovation. Goal: 15% ROI. Budget: €200k.'",
      prompt: "Act as a Commercial Marketing Lead. Design a 5-slide outline for a presentation to stakeholders about the Rooftop Bar upgrade. Include titles and visual ideas.",
      previewText: "Slide 1: Executive Summary - Revitalized Rooftop Pool Bar\nSlide 2: Market Analysis - 25% increase in evening premium drink searches\nSlide 3: Financial ROI - Projected €200k budget breakeven in Year 1\nSlide 4: Feature Deck - Firepits and 360 views\nSlide 5: Implementation Timeline",
      icon: Presentation,
      color: "purple",
      why: [
        "Provides unlimited conversation context for brainstorming",
        "Excellent for deep creative strategizing and slide outliners",
        "Enables interactive follow-up questions to customize the output"
      ]
    }
  };

  const choice = workflowScenarios[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(choice.prompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const IconComponent = choice.icon;

  return (
    <div className="glass-card bg-slate-50 border-slate-200 shadow-xl overflow-hidden !p-0">
      {/* Selector Tabs */}
      <div className="grid grid-cols-4 bg-slate-100 border-b border-slate-200">
        {(['gmail', 'docs', 'sheets', 'slides'] as const).map((tab) => {
          const tabChoice = workflowScenarios[tab];
          const TabIcon = tabChoice.icon;
          return (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setIsCopied(false); }}
              className={cn(
                "p-4 text-xs font-bold transition-all border-b-2 flex flex-col sm:flex-row items-center justify-center gap-2 cursor-pointer",
                activeTab === tab
                  ? "bg-white border-b-google-blue text-google-blue font-black"
                  : "border-b-transparent text-slate-500 hover:text-slate-700"
              )}
            >
              <TabIcon className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline capitalize">{tab} Tool</span>
            </button>
          );
        })}
      </div>

      <div className="p-6 space-y-6 text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
            <h4 className="font-bold text-slate-800 text-xs flex items-center gap-2 font-google uppercase tracking-wider">
              <IconComponent className="w-4 h-4 text-slate-700" />
              {choice.title}
            </h4>
            <span className="inline-block px-2.5 py-0.5 bg-slate-200 text-slate-600 text-[9px] font-bold uppercase rounded-md tracking-wider">
              Optimal Choice: {choice.tool}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shrink-0 transition-transform active:scale-95 cursor-pointer self-start md:self-center"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-google-green" /> : <Copy className="w-3.5 h-3.5 text-google-yellow" />}
            Copy Optimized Prompt
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Mockup Simulator */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-inner flex flex-col justify-between min-h-[300px]">
            {/* Header Vibe */}
            <div className="bg-slate-100 px-4 py-2 text-xs border-b border-slate-200/60 flex justify-between items-center font-mono">
              <span className="flex items-center gap-1.5 text-slate-500 font-bold">
                <span className="w-2 h-2 rounded-full bg-google-red" />
                <span className="w-2 h-2 rounded-full bg-google-yellow" />
                <span className="w-2 h-2 rounded-full bg-google-green" />
                Simulated Workspace Mockup UI
              </span>
              <span className="text-[10px] text-slate-400">workspace.google.com</span>
            </div>

            {/* Content Mock */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Workspace Content:</div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs italic text-amber-950">
                  {choice.scenario}
                </div>
              </div>

              <div className="space-y-2 bg-slate-50 border border-slate-200 p-3 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold text-google-blue uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-google-yellow fill-current" />
                    Gemini Workspace Panel Output:
                  </span>
                  <span className="text-[8px] bg-google-blue/10 text-google-blue px-1.5 py-0.5 rounded font-bold uppercase">Insert ready</span>
                </div>
                <pre className="text-xs text-slate-700 leading-relaxed font-sans font-medium whitespace-pre-wrap block overflow-y-auto max-h-[140px]">
                  {choice.previewText}
                </pre>
              </div>
            </div>
          </div>

          {/* Core Why details */}
          <div className="lg:col-span-5 bg-slate-100 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Why this fits best:</h5>
              <div className="space-y-4">
                {choice.why.map((reason, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <div className="p-1 bg-google-green/10 text-google-green rounded-lg mt-0.5 shrink-0">
                      <Check className="w-3 h-3 font-semibold" />
                    </div>
                    <span className="text-xs text-slate-600 leading-relaxed font-sans font-normal">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-400 italic leading-snug">
               Always select the Workspace Side Panel for rapid context, and Standalone Chat for multi-turn brainstorming.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
