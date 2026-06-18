import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Play } from 'lucide-react';
import { cn } from '../lib/utils';

export function InteractiveSpeedVsReasoning() {
  const [selectedMode, setSelectedMode] = useState<'flash' | 'thinking'>('flash');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [simSteps, setSimSteps] = useState<string[]>([]);
  const [simOutput, setSimOutput] = useState('');

  const runSimulation = () => {
    setIsPlaying(true);
    setProgress(0);
    setSimSteps([]);
    setSimOutput('');

    if (selectedMode === 'flash') {
      const steps = [
        "⚡ Prompt entered directly to Gemini 2.5 Flash",
        "🌐 Sub-second pattern compilation has completed..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < steps.length) {
          setSimSteps(prev => [...prev, steps[i]]);
          setProgress((i + 1) * 50);
          i++;
        } else {
          clearInterval(interval);
          setSimOutput("👉 Recommendation: Standard late check-out is approved for Room 104 with a 15% discount voucher to preserve brand satisfaction.");
          setIsPlaying(false);
        }
      }, 550);
    } else {
      const steps = [
        "🔍 Fetching active instructions: Checking client refund boundary rules...",
        "🤔 Verifying core Operations manual: Guest check-in automated errors guidelines override rules",
        "⚠️ Error Correction: Wait, raw cash refund is prohibited without general manager token. Must convert to complementary dining privileges to preserve standard margins.",
        "✍️ Constructing precise response adhering to 100% of Brand Color Tone guide..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < steps.length) {
          setSimSteps(prev => [...prev, steps[i]]);
          setProgress((i + 1) * 25);
          i++;
        } else {
          clearInterval(interval);
          setSimOutput("👉 Compliance Validated Prompt: Offer check-out extension to 3 PM, grant 'complimentary dining privileges' worth €100 under our standard satisfaction guidelines.");
          setIsPlaying(false);
        }
      }, 750);
    }
  };

  return (
    <div className="glass-card bg-slate-50 border-slate-200 shadow-sm p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-4 text-left">
        <div>
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider font-google">
            <Cpu className="w-5 h-5 text-google-yellow" />
            Interactive Toggles: Speed vs. Logic Play
          </h4>
          <p className="text-slate-500 text-xs mt-0.5">Toggle between sheer speed (Flash) and deep reasoning (Thinking) to see how logic flows.</p>
        </div>
        <div className="flex bg-slate-200 p-1 rounded-xl">
          <button
            onClick={() => { setSelectedMode('flash'); setSimSteps([]); setSimOutput(''); setProgress(0); }}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
              selectedMode === 'flash'
                ? "bg-google-blue text-white shadow-xs"
                : "text-slate-600 hover:text-slate-800"
            )}
          >
            ⚡ Speed (Gemini Flash)
          </button>
          <button
            onClick={() => { setSelectedMode('thinking'); setSimSteps([]); setSimOutput(''); setProgress(0); }}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
              selectedMode === 'thinking'
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-800"
            )}
          >
            🧠 Logic (Thinking Mode)
          </button>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 text-left">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500 font-bold">Scenario Prompt:</span>
          <span className="text-google-blue font-bold uppercase tracking-wider text-[10px]">Hospitality Dispute Rule 104</span>
        </div>
        <p className="text-xs italic bg-slate-50 border border-slate-100 p-3 rounded-xl text-slate-600 leading-relaxed font-sans">
          "A guest missed their anniversary breakfast because our automated check-in failed to prompt them. They want a refund. Help."
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={runSimulation}
            disabled={isPlaying}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shrink-0 transition-transform active:scale-95 cursor-pointer animate-none"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Launch Simulation
          </button>
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-300", 
                selectedMode === 'flash' ? "bg-google-blue" : "bg-emerald-500"
              )} 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>

        {/* Streaming Steps */}
        {simSteps.length > 0 && (
          <div className="space-y-2 bg-slate-950 text-slate-300 p-4 rounded-xl font-mono text-xs border border-white/5">
            <div className="text-[10px] text-slate-500 border-b border-slate-800 pb-1.5 mb-2 font-bold uppercase tracking-widest flex justify-between">
              <span>{selectedMode === 'flash' ? "⚡ Flash Pathway Logs" : "🧠 Thinking Chains (Self-Correcting)"}</span>
              <span className="animate-pulse text-google-green">● Active</span>
            </div>
            {simSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "leading-relaxed",
                  step.startsWith("⚠️") ? "text-amber-400 font-semibold" : 
                  step.startsWith("⚡") || step.startsWith("🔍") ? "text-google-blue" : "text-slate-300"
                )}
              >
                {step}
              </motion.div>
            ))}
          </div>
        )}

        {/* Final output */}
        {simOutput && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5"
          >
            <div className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">✔ Simulated Actionable Output:</div>
            <p className="text-xs font-semibold text-slate-800 leading-relaxed font-sans">{simOutput}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
