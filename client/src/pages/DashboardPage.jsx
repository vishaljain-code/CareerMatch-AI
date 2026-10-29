import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  HelpCircle,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { getSavedAnalyses, deleteAnalysis } from '../utils/storage';

export default function DashboardPage() {
  const [analyses, setAnalyses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setAnalyses(getSavedAnalyses());
  }, []);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this saved analysis?')) {
      deleteAnalysis(id);
      setAnalyses(getSavedAnalyses());
    }
  };

  const getScoreBadge = (score) => {
    if (score >= 85) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (score >= 70) return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    if (score >= 50) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-rose-50 text-rose-700 border-rose-200';
  };

  const averageScore =
    analyses.length > 0
      ? Math.round(analyses.reduce((acc, curr) => acc + (curr.matchScore || 0), 0) / analyses.length)
      : null;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Career Intelligence</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome to CareerMatch AI
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Evaluate how closely your resume aligns with any job posting. Get an estimated compatibility score, identify demonstrated versus missing skills, spot keyword gaps, and receive actionable suggestions.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-3">
          <Link
            to="/app/analyze"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Start New Analysis</span>
          </Link>
          <Link
            to="/app/assistant"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 shadow-xs transition-colors"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Bullet Assistant</span>
          </Link>
        </div>
      </div>

      {/* Real Metrics Cards (only if analyses exist) */}
      {analyses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Saved Analyses</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{analyses.length}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Stored in local browser</p>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Average Match Score</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{averageScore} / 100</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Across your reports</p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Most Recent Analysis</p>
              <h3 className="text-sm font-bold text-slate-900 mt-1 truncate max-w-[150px]">
                {analyses[0].metadata?.targetRole || analyses[0].targetRoleIdentified || 'Analysis'}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {new Date(analyses[0].savedAt || analyses[0].analyzedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="p-3 bg-slate-100 text-slate-600 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>
      )}

      {/* Step-by-Step Guide for First Time Users */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">How to Use CareerMatch AI</h3>
            <p className="text-xs text-slate-500">Follow these simple steps for the most accurate match</p>
          </div>
          <Link
            to="/how-it-works"
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1"
          >
            <span>Learn Methodology</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h4 className="text-xs font-semibold text-slate-900">Upload Text-Based PDF</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Ensure your PDF has selectable text. Scanned photo PDFs without OCR cannot be read by the parser.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              2
            </span>
            <h4 className="text-xs font-semibold text-slate-900">Paste Full Job Description</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Include the responsibilities, requirements, and tech stack. More detail yields a much better evaluation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              3
            </span>
            <h4 className="text-xs font-semibold text-slate-900">Inspect Evidence & Suggestions</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Check demonstrated skills against gaps, verify proposed bullet drafts, and copy tailored rewrites.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Analyses Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Alignment Analyses</h3>
            <p className="text-xs text-slate-500">Saved securely in your browser's local storage</p>
          </div>

          {analyses.length > 0 && (
            <Link
              to="/app/history"
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1"
            >
              <span>View All ({analyses.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {analyses.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 space-y-3">
            <div className="p-3 bg-white text-indigo-600 rounded-xl w-fit mx-auto shadow-xs border border-slate-200">
              <FileText className="w-8 h-8" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900">No Past Analyses Found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven't run any resume evaluations yet. Upload your resume and paste a job posting to generate your first match report.
            </p>
            <div className="pt-2">
              <Link
                to="/app/analyze"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Start Your First Analysis</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {analyses.slice(0, 5).map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/app/results/${item.id}`)}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 p-3 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                      {item.metadata?.targetRole || item.targetRoleIdentified || 'Analysis Report'}
                    </h4>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-0.5">
                      <span>{item.metadata?.companyName || 'Target Company'}</span>
                      <span>•</span>
                      <span>{item.metadata?.filename || 'Resume.pdf'}</span>
                      <span>•</span>
                      <span>{new Date(item.savedAt || item.analyzedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 self-end sm:self-auto">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getScoreBadge(
                        item.matchScore
                      )}`}
                    >
                      {item.matchScore} / 100
                    </span>
                    <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                      {item.scoreBand}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleDelete(item.id, e)}
                    title="Delete saved report"
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
