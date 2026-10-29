import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, CircleDot } from 'lucide-react';

const stages = [
  { id: 1, label: 'Reading and extracting text from PDF...' },
  { id: 2, label: 'Comparing resume against job requirements...' },
  { id: 3, label: 'Evaluating core skills and keyword coverage...' },
  { id: 4, label: 'Formulating actionable suggestions and bullet rewrites...' },
];

export default function ProgressModal({ isOpen }) {
  const [currentStage, setCurrentStage] = useState(1);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStage(1);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev < stages.length ? prev + 1 : prev));
    }, 2800);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-100 flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900">Analyzing Your Alignment</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Our AI recruiter engine is running an evidence-based comparison. This usually takes 10–20 seconds.
        </p>

        <div className="w-full mt-6 space-y-3 text-left">
          {stages.map((stage) => {
            const isCompleted = currentStage > stage.id;
            const isCurrent = currentStage === stage.id;

            return (
              <div
                key={stage.id}
                className={`flex items-center space-x-3 p-2.5 rounded-xl text-xs transition-all ${
                  isCurrent
                    ? 'bg-indigo-50/80 text-indigo-900 font-medium border border-indigo-200'
                    : isCompleted
                    ? 'text-slate-600'
                    : 'text-slate-400 opacity-60'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
                ) : (
                  <CircleDot className="w-4 h-4 text-slate-300 shrink-0" />
                )}
                <span>{stage.label}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 w-full text-center">
          <p className="text-[11px] text-slate-400">
            Please keep this tab open while analysis completes
          </p>
        </div>
      </div>
    </div>
  );
}
