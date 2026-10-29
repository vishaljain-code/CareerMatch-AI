import React, { useState } from 'react';
import { Copy, Check, Sparkles, ArrowRight, AlertTriangle } from 'lucide-react';

export default function RewritesList({ bulletRewrites = [], suggestions = [] }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Draft Disclaimer Notice */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-950">Draft Suggestions — User Verification Required</p>
          <p className="mt-0.5 text-amber-800">
            Suggested rewrites are grounded strictly in your existing resume points using clearer action verbs and structure. Never accept numbers, responsibilities, or tools that do not truthfully reflect your actual experience.
          </p>
        </div>
      </div>

      {/* Bullet Rewrites */}
      {bulletRewrites.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h4 className="text-sm font-semibold text-slate-900">
              Targeted Resume Bullet Rewrites ({bulletRewrites.length})
            </h4>
          </div>

          <div className="space-y-4">
            {bulletRewrites.map((item, idx) => (
              <div
                key={`rewrite-${idx}`}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Original Bullet */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1">
                      Original in Resume
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed italic">
                      "{item.original}"
                    </p>
                  </div>

                  {/* Suggested Rewrite */}
                  <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-200 relative">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-700 block">
                        Suggested Draft
                      </span>
                      <button
                        onClick={() => handleCopy(item.suggested, idx)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 transition-colors shadow-2xs"
                        title="Copy rewritten text"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-semibold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                      "{item.suggested}"
                    </p>
                  </div>
                </div>

                {item.explanation && (
                  <div className="text-xs text-slate-500 pt-1 border-t border-slate-100 flex items-start gap-1.5">
                    <span className="font-semibold text-slate-700 shrink-0">Why this helps:</span>
                    <span>{item.explanation}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prioritized Actionable Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-4 pt-2">
          <h4 className="text-sm font-semibold text-slate-900">
            Actionable Optimization Recommendations ({suggestions.length})
          </h4>

          <div className="space-y-3">
            {suggestions.map((sug, i) => {
              const priorityColors = {
                high: 'bg-rose-50 text-rose-700 border-rose-200',
                medium: 'bg-amber-50 text-amber-700 border-amber-200',
                low: 'bg-blue-50 text-blue-700 border-blue-200',
              };
              const pKey = sug.priority?.toLowerCase() || 'medium';
              const pClass = priorityColors[pKey] || priorityColors.medium;

              return (
                <div
                  key={`sug-${i}`}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 text-xs">
                        {sug.area || `Priority Item ${i + 1}`}
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${pClass}`}>
                      {sug.priority || 'Action'} Priority
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{sug.suggestion}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
