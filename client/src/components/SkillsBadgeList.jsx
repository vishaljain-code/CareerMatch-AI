import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function SkillsBadgeList({ matchingSkills = [], missingOrInsufficientSkills = [] }) {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const showMatching = activeTab === 'all' || activeTab === 'matching';
  const showGaps = activeTab === 'all' || activeTab === 'gaps';

  return (
    <div className="space-y-6">
      {/* Sub-filter tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Skills ({matchingSkills.length + missingOrInsufficientSkills.length})
        </button>
        <button
          onClick={() => setActiveTab('matching')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'matching'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Matching ({matchingSkills.length})
        </button>
        <button
          onClick={() => setActiveTab('gaps')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'gaps'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Skill Gaps ({missingOrInsufficientSkills.length})
        </button>
      </div>

      {/* Matching Skills */}
      {showMatching && matchingSkills.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h4 className="text-sm font-semibold text-slate-900">
              Demonstrated Matching Skills ({matchingSkills.length})
            </h4>
          </div>
          <p className="text-xs text-slate-500">
            Skills identified in the job description that have concrete evidence in your resume.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            {matchingSkills.map((skill, i) => (
              <div
                key={`match-${i}`}
                className="bg-emerald-50/40 border border-emerald-200/80 rounded-xl p-3.5 space-y-2 hover:bg-emerald-50/70 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-emerald-950 text-sm">{skill.name}</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      [Matched]
                    </span>
                  </div>
                </div>

                {skill.evidence && (
                  <p className="text-xs text-slate-700 bg-white/80 p-2 rounded-lg border border-emerald-100 italic">
                    <span className="font-semibold not-italic text-slate-500 text-[11px] block">
                      Resume Evidence:
                    </span>
                    "{skill.evidence}"
                  </p>
                )}

                {skill.relevance && (
                  <p className="text-[11px] text-emerald-800">
                    <strong className="font-medium text-emerald-900">Relevance:</strong> {skill.relevance}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missing / Insufficient Skills */}
      {showGaps && missingOrInsufficientSkills.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <h4 className="text-sm font-semibold text-slate-900">
              Missing or Insufficiently Demonstrated Skills ({missingOrInsufficientSkills.length})
            </h4>
          </div>
          <p className="text-xs text-slate-500">
            Skills requested by the employer that were either omitted or need clearer evidence in your resume.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            {missingOrInsufficientSkills.map((skill, i) => {
              const isMissing = skill.status?.toLowerCase() === 'missing';

              return (
                <div
                  key={`gap-${i}`}
                  className={`border rounded-xl p-3.5 space-y-2 ${
                    isMissing
                      ? 'bg-rose-50/30 border-rose-200 hover:bg-rose-50/60'
                      : 'bg-amber-50/40 border-amber-200 hover:bg-amber-50/70'
                  } transition-colors`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-semibold text-slate-900 text-sm">{skill.name}</span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        isMissing
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isMissing ? '[Missing in Resume]' : '[Needs Clearer Evidence]'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {skill.reason || 'This skill is emphasized in the job description but not clearly evidenced in your resume text.'}
                  </p>

                  <div className="text-[11px] text-slate-500 pt-1">
                    <span className="font-medium text-slate-700">Tip:</span> If you have experience with {skill.name}, describe a specific project where you applied it. If not, consider learning or building a portfolio project.
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
