import React, { useState } from 'react';
import { improveBullet } from '../services/api';
import { sampleBulletsToImprove } from '../utils/sampleData';
import {
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  FileText,
} from 'lucide-react';

export default function ImproveAssistantPage() {
  const [bulletText, setBulletText] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [jobContext, setJobContext] = useState('');
  const [improvementType, setImprovementType] = useState('action-verbs');

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSelectSample = (sample) => {
    setBulletText(sample.text);
    setTargetRole(sample.role);
    setJobContext(sample.jobContext);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bulletText || bulletText.trim().length < 8) {
      setError({ message: 'Please enter a bullet point with at least 8 characters.' });
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await improveBullet({
        originalBullet: bulletText.trim(),
        targetRole: targetRole.trim(),
        jobDescriptionSnippet: jobContext.trim(),
        improvementType,
      });

      if (response && response.success && response.data) {
        setResult(response.data);
      } else {
        throw new Error('Received invalid response from bullet assistant.');
      }
    } catch (err) {
      const errObj = err.error || { message: err.message || 'Failed to rewrite bullet point.' };
      setError(errObj);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.suggested) return;
    navigator.clipboard.writeText(result.suggested);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Factual Resume Enhancement</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Resume Bullet Improvement Assistant
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Strengthen individual resume bullet points with stronger verbs and crisper phrasing while strictly preserving factual accuracy.
        </p>
      </div>

      {/* Strict Anti-Hallucination Guardrail Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-start gap-3 text-xs text-slate-600">
        <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold text-slate-900 block">Strict Factual Integrity Rule</strong>
          <p className="mt-0.5 leading-relaxed">
            This assistant preserves the original meaning and factual claims. It is explicitly programmed not to invent numbers, percentages, tools, or responsibilities. You retain complete control over your resume content.
          </p>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-2">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">{error.code || 'Request Failed'}</strong>
              <p className="mt-0.5 text-rose-700">{error.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Sample selector */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Input Resume Bullet
          </span>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px]">Load example:</span>
            {sampleBulletsToImprove.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(s)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-[11px] font-medium text-slate-700 transition-colors"
              >
                Example {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Bullet Input */}
        <div className="space-y-1.5">
          <textarea
            rows={3}
            value={bulletText}
            onChange={(e) => setBulletText(e.target.value)}
            placeholder="Paste a single bullet point from your resume (e.g., 'Worked on web app using React and created components')..."
            className="w-full text-xs sm:text-sm p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-sans leading-relaxed text-slate-800 placeholder:text-slate-400 bg-slate-50/50"
          />
        </div>

        {/* Improvement Objective Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
            Select Improvement Goal
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                id: 'action-verbs',
                label: 'Stronger Action Verbs',
                desc: 'Replace weak verbs with clear, active technical leadership words.',
              },
              {
                id: 'concise',
                label: 'Make It More Concise',
                desc: 'Remove fluff and tighten wording while keeping all accomplishments.',
              },
              {
                id: 'skills-emphasis',
                label: 'Emphasize Skills',
                desc: 'Highlight concrete tools & frameworks mentioned in the work.',
              },
              {
                id: 'job-alignment',
                label: 'Align with Role / JD',
                desc: 'Adopt industry terminology relevant to your target position.',
              },
            ].map((option) => (
              <div
                key={option.id}
                onClick={() => setImprovementType(option.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  improvementType === option.id
                    ? 'border-indigo-600 bg-indigo-50/60 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{option.label}</span>
                  <div
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      improvementType === option.id
                        ? 'border-indigo-600 bg-indigo-600'
                        : 'border-slate-300'
                    }`}
                  >
                    {improvementType === option.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">{option.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Optional Context */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">Target Role Context (Optional)</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Frontend Engineer"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">Job Description Snippet (Optional)</label>
            <input
              type="text"
              value={jobContext}
              onChange={(e) => setJobContext(e.target.value)}
              placeholder="e.g. Must have strong React and state management skills"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isLoading || !bulletText.trim()}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-xs shadow-md transition-all ${
              !isLoading && bulletText.trim()
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 hover:scale-[1.01] cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? 'Improving Bullet...' : 'Improve Bullet Point'}</span>
          </button>
        </div>
      </form>

      {/* Result Display */}
      {result && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">Improved Version</h3>
            </div>
            <span className="text-[11px] font-medium bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-100">
              Draft Suggestion
            </span>
          </div>

          {/* Side by Side Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Original */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Original Input
              </span>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{result.original}"
              </p>
            </div>

            {/* Suggested */}
            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block">
                  Enhanced Draft
                </span>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 shadow-2xs transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Bullet</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                "{result.suggested}"
              </p>
            </div>
          </div>

          {/* Explanation & Key Changes */}
          {result.explanation && (
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 text-xs text-slate-600 space-y-2">
              <strong className="text-slate-900 font-semibold block">Rationale & Enhancements:</strong>
              <p className="leading-relaxed">{result.explanation}</p>

              {result.keyChanges && result.keyChanges.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {result.keyChanges.map((change, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-700"
                    >
                      • {change}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
