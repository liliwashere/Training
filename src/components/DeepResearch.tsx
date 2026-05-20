import { useState } from 'react';
import { Search, Sparkles, ExternalLink } from 'lucide-react';
import { DEEP_RESEARCH_SAMPLES } from '../data';

export default function DeepResearch() {
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);

  return (
    <div id="deep-research-card" className="glass-card bg-slate-950 text-white border-l-4 border-l-google-yellow h-full flex flex-col relative overflow-hidden group !bg-slate-950">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
        <Search className="w-12 h-12 text-google-yellow scale-150 rotate-12" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-white/10 rounded-lg">
            <Search className="w-5 h-5 text-google-yellow" />
          </div>
          <h4 className="text-xl font-bold font-google">Deep Research</h4>
        </div>

        <div className="flex-grow space-y-4">
          <p className="text-sm text-slate-400 mb-6 font-medium leading-relaxed">
            Deep Research allows Gemini to perform multi-step analysis across the live web. It doesn't just search; it browses, reads, and synthesizes data accurately.
          </p>

          <div className="space-y-4">
            {/* Tabs Row */}
            <div className="flex bg-white/5 p-1 rounded-xl">
              {DEEP_RESEARCH_SAMPLES.map((sample, idx) => (
                <button
                  key={sample.label}
                  onClick={() => setActiveQueryIndex(idx)}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold uppercase transition-all select-none ${
                    activeQueryIndex === idx
                      ? 'bg-google-yellow text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-white'
                  }`}
                >
                  {sample.label}
                </button>
              ))}
            </div>

            {/* Display Box */}
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 min-h-[160px] flex flex-col justify-between bg-slate-900/50">
              <div>
                <div className="text-[10px] font-bold text-google-yellow uppercase tracking-widest mb-3">
                  Sample Deep Query:
                </div>
                <div className="text-base text-blue-50 font-mono leading-relaxed italic">
                  "{DEEP_RESEARCH_SAMPLES[activeQueryIndex].query}"
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-google-blue-light font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-google-yellow animate-pulse" />
                  <span>Benefit: {DEEP_RESEARCH_SAMPLES[activeQueryIndex].benefit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <a
            href="https://gemini.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-google-blue text-white shadow-google-blue/20 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 max-w-max"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Launch Deep Research
          </a>
        </div>
      </div>
    </div>
  );
}
