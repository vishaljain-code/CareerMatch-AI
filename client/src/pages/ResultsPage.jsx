import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import ScoreGauge from '../components/ScoreGauge';
import ScoreBreakdownChart from '../components/ScoreBreakdownChart';
import SkillsBadgeList from '../components/SkillsBadgeList';
import RewritesList from '../components/RewritesList';
import { getAnalysisById } from '../utils/storage';
import {
  FileText,
  Calendar,
  Building2,
  Printer,
  PlusCircle,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  CheckSquare,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function ResultsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(location.state?.analysis || null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!analysis && id) {
      const saved = getAnalysisById(id);
      if (saved) {
        setAnalysis(saved);
      }
    }
  }, [id, analysis]);

  if (!analysis) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mx-auto">
          <FileText className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Analysis Report Not Found</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          We could not locate this analysis. It may have been cleared from local storage.
        </p>
        <Link
          to="/app/analyze"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Start New Analysis</span>
        </Link>
      </div>
    );
  }

  const metadata = analysis.metadata || {};
  const score = analysis.matchScore || 0;
  const scoreBand = analysis.scoreBand || 'Moderate Match';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 print:p-0">
      {/* Top Header Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 print:border-none print:shadow-none">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 font-medium text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
              <Sparkles className="w-3 h-3" /> Alignment Report
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(metadata.analyzedAt || analysis.analyzedAt || Date.now()).toLocaleDateString(
                undefined,
                { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
              )}
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {metadata.targetRole || analysis.targetRoleIdentified || 'Role Alignment Analysis'}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
            {metadata.companyName && (
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {metadata.companyName}
              </span>
            )}
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              {metadata.filename || 'Uploaded Resume'}
            </span>
            {metadata.resumePages && <span>({metadata.resumePages} pages parsed)</span>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 no-print">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-2xs transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print / Export</span>
          </button>
          <Link
            to="/app/analyze"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Analysis</span>
          </Link>
        </div>
      </div>

      {/* Score Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Overall Score Gauge */}
        <div className="space-y-4">
          <ScoreGauge score={score} scoreBand={scoreBand} />

          {/* Advisory Box */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 text-[11px] text-slate-500 space-y-1">
            <span className="font-semibold text-slate-700 block">Scoring Disclaimer:</span>
            <p className="leading-relaxed">
              This score indicates estimated alignment with the provided job description across 5 weighted dimensions. It is an advisory career tool and not an official ATS score or guarantee of interview selection.
            </p>
          </div>
        </div>

        {/* Right: 5-Pillar Score Breakdown */}
        <div className="lg:col-span-2">
          <ScoreBreakdownChart breakdown={analysis.scoreBreakdown} />
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-1.5 shadow-xs flex flex-wrap gap-1 no-print">
        {[
          { id: 'overview', label: 'Executive Overview' },
          { id: 'skills', label: `Skills (${(analysis.matchingSkills || []).length} Match / ${(analysis.missingOrInsufficientSkills || []).length} Gaps)` },
          { id: 'keywords', label: `Keyword Analysis` },
          { id: 'experience', label: `Experience & Qualifications` },
          { id: 'rewrites', label: `Bullet Rewrites & Actions` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Executive Summary */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900">Executive Assessment</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {analysis.executiveSummary}
            </p>
          </div>

          {/* Strengths & Weak Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h4 className="text-sm font-bold text-slate-900">Resume Competitive Strengths</h4>
              </div>
              <ul className="space-y-2.5">
                {(analysis.resumeStrengths || []).map((str, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weak Areas */}
            <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600" />
                <h4 className="text-sm font-bold text-slate-900">Highest-Priority Gaps</h4>
              </div>
              <ul className="space-y-2.5">
                {(analysis.weakAreas || []).map((weak, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Prioritized Action Plan */}
          {analysis.actionPlan && analysis.actionPlan.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">Prioritized Action Plan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {analysis.actionPlan.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2"
                  >
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                      {item.step || idx + 1}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.action}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Skills Comparison */}
      {activeTab === 'skills' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <SkillsBadgeList
            matchingSkills={analysis.matchingSkills}
            missingOrInsufficientSkills={analysis.missingOrInsufficientSkills}
          />
        </div>
      )}

      {/* Tab 3: Keyword Analysis */}
      {activeTab === 'keywords' && (
        <div className="space-y-6">
          {/* Integrity Note */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-indigo-950 text-xs flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">Responsible Keyword Optimization</strong>
              <p className="mt-0.5 text-indigo-800 leading-relaxed">
                Keywords missing from your resume indicate areas the hiring manager emphasizes. Only incorporate these terms into your resume if you have authentic project or educational experience with them.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Keywords Found */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Important Keywords Found ({(analysis.keywordAnalysis?.keywordsFound || []).length})
                  </h4>
                </div>
              </div>

              <div className="space-y-3">
                {(analysis.keywordAnalysis?.keywordsFound || []).map((kw, i) => (
                  <div
                    key={i}
                    className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100 space-y-1"
                  >
                    <span className="font-semibold text-xs text-emerald-950 font-mono">
                      {kw.keyword}
                    </span>
                    <p className="text-[11px] text-slate-600 italic">"{kw.context}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Keywords Missing */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Keywords Not Found in Resume ({(analysis.keywordAnalysis?.keywordsMissing || []).length})
                  </h4>
                </div>
              </div>

              <div className="space-y-3">
                {(analysis.keywordAnalysis?.keywordsMissing || []).map((kw, i) => (
                  <div
                    key={i}
                    className="p-3 bg-amber-50/40 rounded-xl border border-amber-100 space-y-1"
                  >
                    <span className="font-semibold text-xs text-amber-950 font-mono">
                      {kw.keyword}
                    </span>
                    <p className="text-[11px] text-slate-600">
                      <strong className="text-slate-700">Role in Job Posting:</strong> {kw.relevanceExplanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Experience & Qualifications */}
      {activeTab === 'experience' && (
        <div className="space-y-6">
          {/* Required Qualifications Check */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Required Job Qualifications Checklist
            </h3>
            <p className="text-xs text-slate-500">
              Evaluates hard requirements from the job description against concrete evidence in your resume.
            </p>

            <div className="space-y-3 mt-4">
              {(analysis.requiredQualifications || []).map((req, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                    req.matched
                      ? 'bg-emerald-50/30 border-emerald-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {req.matched ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-900">{req.requirement}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          req.matched
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {req.matched ? 'Evidence Found' : 'No Clear Evidence'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 italic">
                      <strong className="not-italic text-slate-500 text-[11px]">Evidence: </strong>
                      {req.evidence}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Relevant Experience & Projects Alignment */}
          {analysis.experienceAlignment && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Experience & Project Alignment
              </h3>

              <div className="space-y-4">
                {(analysis.experienceAlignment.relevantProjects || []).map((proj, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                  >
                    <h5 className="text-xs font-bold text-slate-900">{proj.title}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{proj.alignmentNotes}</p>
                    {proj.skillsDemonstrated && proj.skillsDemonstrated.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.skillsDemonstrated.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-medium text-slate-600"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Rewrites & Recommendations */}
      {activeTab === 'rewrites' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <RewritesList
            bulletRewrites={analysis.bulletRewrites}
            suggestions={analysis.improvementSuggestions}
          />
        </div>
      )}
    </div>
  );
}
