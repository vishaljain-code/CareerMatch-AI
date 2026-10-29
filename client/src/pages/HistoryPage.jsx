import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  getSavedAnalyses,
  deleteAnalysis,
  clearAllAnalyses,
  exportAnalysesAsJSON,
} from '../utils/storage';
import {
  FileText,
  Calendar,
  Building2,
  Trash2,
  Download,
  PlusCircle,
  Search,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setAnalyses(getSavedAnalyses());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Delete this saved report from your browser storage?')) {
      deleteAnalysis(id);
      setAnalyses(getSavedAnalyses());
    }
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        'Are you sure you want to delete all saved analyses? This cannot be undone.'
      )
    ) {
      clearAllAnalyses();
      setAnalyses([]);
    }
  };

  const filteredAnalyses = analyses.filter((item) => {
    const role = (item.metadata?.targetRole || item.targetRoleIdentified || '').toLowerCase();
    const company = (item.metadata?.companyName || '').toLowerCase();
    const term = searchTerm.toLowerCase();
    return role.includes(term) || company.includes(term);
  });

  const getScoreBadge = (score) => {
    if (score >= 85) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (score >= 70) return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    if (score >= 50) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-rose-50 text-rose-700 border-rose-200';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Analysis History
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Past resume compatibility assessments saved locally in your browser.
          </p>
        </div>

        {analyses.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={exportAnalysesAsJSON}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-2xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>

      {/* Local-Only Privacy Guarantee Callout */}
      <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-900 block font-semibold">Local-First Storage Notice</strong>
          <p className="mt-0.5 leading-relaxed text-slate-600">
            All analysis history is stored solely inside your browser's <code className="bg-white px-1 py-0.5 rounded border border-slate-200 text-slate-800">localStorage</code>. No account registration is required, and your data is never uploaded to public databases or shared across devices.
          </p>
        </div>
      </div>

      {/* Search Filter */}
      {analyses.length > 0 && (
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter by job title or company name..."
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
          />
        </div>
      )}

      {/* List / Empty State */}
      {analyses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mx-auto">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No Saved Analyses Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Run an alignment analysis between your resume and a target job to review and track past reports here.
          </p>
          <div className="pt-2">
            <Link
              to="/app/analyze"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Start an Analysis</span>
            </Link>
          </div>
        </div>
      ) : filteredAnalyses.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 text-xs text-slate-500">
          No analyses matched your search term "{searchTerm}".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAnalyses.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/app/results/${item.id}`)}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-indigo-200 cursor-pointer transition-all space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">
                    {item.metadata?.targetRole || item.targetRoleIdentified || 'Role Alignment'}
                  </h4>
                  {item.metadata?.companyName && (
                    <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {item.metadata.companyName}
                    </p>
                  )}
                </div>

                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getScoreBadge(
                    item.matchScore
                  )}`}
                >
                  {item.matchScore} / 100
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {item.executiveSummary}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(item.savedAt || item.analyzedAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-3">
                  <span className="text-indigo-600 font-semibold hover:underline flex items-center gap-1">
                    <span>View Report</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    title="Delete record"
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
