import { useState } from 'react';
import { Layers, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { GEMS_GALLERY } from '../data';
import { GemItem } from '../types';

export default function GemsGallery() {
  const [activeGem, setActiveGem] = useState<GemItem>(GEMS_GALLERY[0]);

  return (
    <div id="gems-gallery-card" className="glass-card bg-white border-slate-200 shadow-xl overflow-hidden !p-0 h-full flex flex-col">
      <div className="bg-gradient-to-r from-google-blue to-blue-600 p-6 text-white">
        <h4 className="text-xl font-bold flex items-center gap-2">
          <Layers className="w-5 h-5 text-google-yellow" />
          Gems: The AI Expert Gallery
        </h4>
        <p className="text-blue-100 text-xs mt-1">
          Select a Gem to see its specialized system instructions.
        </p>
      </div>

      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 bg-slate-50 border-r border-slate-100 p-4 space-y-2">
          {GEMS_GALLERY.map((gem) => (
            <button
              key={gem.name}
              onClick={() => setActiveGem(gem)}
              className={`w-full text-left p-3 rounded-xl transition-all border group flex justify-between items-center ${
                activeGem.name === gem.name
                  ? 'bg-white border-google-blue shadow-sm'
                  : 'bg-transparent border-transparent hover:bg-white/50 hover:border-slate-200'
              }`}
            >
              <div>
                <div className={`font-bold text-sm transition-colors ${
                  activeGem.name === gem.name ? 'text-google-blue' : 'text-slate-600 group-hover:text-slate-800'
                }`}>
                  {gem.name}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {gem.role}
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${
                activeGem.name === gem.name ? 'text-google-blue translate-x-1' : 'opacity-0 group-hover:opacity-100'
              }`} />
            </button>
          ))}
        </div>

        {/* content Panel */}
        <div className="flex-grow p-6 space-y-6 flex flex-col justify-center">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
              System Instructions
            </label>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-sm font-mono text-google-green leading-relaxed">
              <span className="text-slate-500">// {activeGem.role} config</span>
              <br />
              {activeGem.instructions}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
              Behavior Preview
            </label>
            <div className="p-4 bg-google-blue/5 rounded-2xl border border-google-blue/10 text-sm italic text-slate-700">
              "{activeGem.preview}"
            </div>
          </div>

          <div className="pt-4 mt-auto">
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-google-blue" />
              <span>Gems provide <strong>persistent context</strong>. You don't need to re-prompt these rules every time.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
