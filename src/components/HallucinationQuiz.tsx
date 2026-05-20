import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { HallucinationQuizItem } from '../types';
import { HALLUCINATION_QUIZ_DATA } from '../data';

interface QuizItemProps {
  item: HallucinationQuizItem;
  key?: number;
}

function QuizItem({ item }: QuizItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      onClick={() => setIsOpen(!isOpen)}
      className="p-5 rounded-2xl border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-all select-none"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-grow">
          <span className="text-[10px] font-bold text-google-blue-light uppercase tracking-wider block mb-1">
            {item.title}
          </span>
          <p className="text-sm font-medium leading-relaxed text-slate-100">
            {item.statement}
          </p>
        </div>
        <div className="text-google-blue shrink-0 flex items-center gap-2">
          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          <Info className="w-5 h-5 text-google-blue-light opacity-80" />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
                item.isHallucination 
                  ? 'bg-google-red/20 text-google-red' 
                  : 'bg-google-green/20 text-google-green'
              }`}>
                {item.isHallucination ? (
                  <>
                    <AlertCircle className="w-3 h-3" />
                    Hallucination
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    Fact Object Checked
                  </>
                )}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed pl-1">
                {item.explanation}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HallucinationQuiz() {
  return (
    <div className="space-y-4">
      {HALLUCINATION_QUIZ_DATA.map((item, index) => (
        <QuizItem key={index} item={item} />
      ))}
    </div>
  );
}
