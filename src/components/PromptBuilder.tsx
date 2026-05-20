import { useState } from 'react';
import { WandSparkles, CheckCircle, Copy } from 'lucide-react';
import { PROMPT_CONFIG } from '../data';
import { PromptIngredient } from '../types';

export default function PromptBuilder() {
  const [activeRole, setActiveRole] = useState<PromptIngredient>(PROMPT_CONFIG.roles[0]);
  const [activeTask, setActiveTask] = useState<PromptIngredient>(PROMPT_CONFIG.tasks[0]);
  const [activeContext, setActiveContext] = useState<PromptIngredient>(PROMPT_CONFIG.contexts[0]);
  const [copied, setCopied] = useState(false);

  const masterPrompt = `Act as ${activeRole.value}. I want you to ${activeTask.value}, ${activeContext.value}.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(masterPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="prompt-builder-card" className="glass-card bg-slate-50 border-slate-200 shadow-xl overflow-hidden !p-0">
      <div className="bg-slate-900 p-6 text-white border-b border-white/10 flex justify-between items-center">
        <div>
          <h4 className="text-xl font-bold flex items-center gap-2">
            <WandSparkles className="w-5 h-5 text-google-yellow" />
            Interactive Prompt Builder
          </h4>
          <p className="text-slate-400 text-xs mt-1">
            Select your ingredients to generate a master prompt.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ingredient 1: Role */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-google-blue uppercase tracking-widest">
              1. Select Role
            </label>
            <div className="space-y-2">
              {PROMPT_CONFIG.roles.map((role) => (
                <button
                  key={role.label}
                  onClick={() => setActiveRole(role)}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-all border block ${
                    activeRole.label === role.label
                      ? 'bg-google-blue/10 border-google-blue text-google-blue'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold">{role.label}</div>
                  <div className="text-[10px] opacity-60 mt-0.5 line-clamp-1">
                    {role.example}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Ingredient 2: Task */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-google-green uppercase tracking-widest">
              2. Select Task
            </label>
            <div className="space-y-2">
              {PROMPT_CONFIG.tasks.map((task) => (
                <button
                  key={task.label}
                  onClick={() => setActiveTask(task)}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-all border block ${
                    activeTask.label === task.label
                      ? 'bg-google-green/10 border-google-green text-google-green'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold">{task.label}</div>
                  <div className="text-[10px] opacity-60 mt-0.5 line-clamp-1">
                    {task.example}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Ingredient 3: Context */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-google-yellow uppercase tracking-widest">
              3. Select Context
            </label>
            <div className="space-y-2">
              {PROMPT_CONFIG.contexts.map((context) => (
                <button
                  key={context.label}
                  onClick={() => setActiveContext(context)}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-all border block ${
                    activeContext.label === context.label
                      ? 'bg-google-yellow/10 border-google-yellow text-google-yellow/80 font-medium'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold">{context.label}</div>
                  <div className="text-[10px] opacity-60 mt-0.5 line-clamp-1">
                    {context.example}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Master Output Block */}
        <div className="bg-slate-900 rounded-2xl p-6 relative group border border-white/5">
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-2 ${
                copied ? 'bg-google-green text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
          </div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
            Generated Master Prompt
          </div>
          <div className="font-mono text-sm leading-relaxed min-h-[60px] pr-24 text-slate-300">
            <span className="text-google-blue font-bold">Act as {activeRole.value}.</span>{' '}
            <span className="text-google-green font-bold">I want you to {activeTask.value},</span>{' '}
            <span className="text-google-yellow font-bold italic">{activeContext.value}.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
