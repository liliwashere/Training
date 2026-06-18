import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { cn } from '../lib/utils';

export function InteractiveProbabilitySandbox() {
  const [selectedPhrase, setSelectedPhrase] = useState<'greet' | 'review'>('greet');

  const presets = {
    greet: {
      text: "How are ",
      standard: [
        { word: "you", prob: "52%" },
        { word: "you doing", prob: "24%" },
        { word: "things", prob: "12%" },
        { word: "your day", prob: "8%" },
      ],
      gemini: {
        thought: "Based on the client's business profile, we want to address customer support immediately instead of a generic greetings template.",
        output: "addressed with absolute speed and warm hospitality, as per our premium hospitality catalog."
      }
    },
    review: {
      text: "Based on the guest's 5-star review, we should ",
      standard: [
        { word: "say", prob: "45%" },
        { word: "thank you", prob: "28%" },
        { word: "be happy", prob: "15%" },
        { word: "celebrate", prob: "8%" },
      ],
      gemini: {
        thought: "Analyse customer feedback. Sarah was highlighted for her service. The business playbook recommends routing to rewards + auto-generating an response.",
        output: "flag this account for high-priority rewards, draft an instant personal response to thank Sarah, and send an anniversary champagne voucher."
      }
    }
  };

  const choice = presets[selectedPhrase];

  return (
    <div className="glass-card bg-slate-50 border-slate-200 shadow-sm p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-4 text-left">
        <div>
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider font-google">
            <Brain className="w-5 h-5 text-google-red" />
            Probabilistic Autocomplete Simulator (Statistical vs. Logical)
          </h4>
          <p className="text-slate-500 text-xs mt-0.5">Click a starting phrase to test human standard prediction vs. Gemini context-reasoning.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedPhrase('greet')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer",
              selectedPhrase === 'greet'
                ? "bg-google-blue text-white border-google-blue"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            )}
          >
            "How are..."
          </button>
          <button
            onClick={() => setSelectedPhrase('review')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer",
              selectedPhrase === 'review'
                ? "bg-google-blue text-white border-google-blue"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
            )}
          >
            "Based on review..."
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {/* Simple phone predictor */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            Standard Word Predictor (Keyboard Style)
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500 italic">Starting: </span>
            <span className="text-xs font-semibold text-slate-800">"{choice.text}"</span>
          </div>
          <div className="space-y-2">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Next-word probabilities:</div>
            <div className="grid grid-cols-2 gap-2">
              {choice.standard.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-mono">
                  <span className="text-slate-700 font-bold">... {item.word}</span>
                  <span className="text-slate-400 text-[10px]">{item.prob}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-normal font-sans">
            Uses raw frequency score of the last 1-2 words. No logical awareness, zero comprehension of context.
          </p>
        </div>

        {/* Gemini Content predictor */}
        <div className="p-4 bg-google-blue/5 rounded-2xl border border-google-blue/10 space-y-4 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold text-google-blue uppercase tracking-widest flex items-center gap-1.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-google-blue animate-pulse" />
              Patterns & Logic Processor (Gemini)
            </div>
            <div className="mb-3">
              <span className="text-xs font-medium text-slate-500 italic">Starting: </span>
              <span className="text-xs font-semibold text-slate-800">"{choice.text}"</span>
            </div>
            <div className="p-3 bg-white border border-google-blue/10 rounded-xl space-y-1">
              <span className="text-[9px] text-google-blue font-bold uppercase tracking-wider block">🧠 Context Reasoning Phase:</span>
              <p className="text-[11px] text-slate-600 italic leading-relaxed">
                "{choice.gemini.thought}"
              </p>
            </div>
          </div>

          <div className="p-3 bg-google-blue text-white rounded-xl space-y-1 shadow-sm mt-3">
            <div className="text-[9px] text-google-yellow font-bold uppercase tracking-widest">Coherent Continuation:</div>
            <p className="text-xs font-medium leading-relaxed font-sans">
              {choice.gemini.output}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
