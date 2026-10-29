import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropZone from '../components/DropZone';
import ProgressModal from '../components/ProgressModal';
import { analyzeResume } from '../services/api';
import { saveAnalysis } from '../utils/storage';
import { sampleJobDescriptions } from '../utils/sampleData';
import {
  FileCheck2,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  Briefcase,
  Building2,
  GraduationCap,
  Info,
} from 'lucide-react';

export default function AnalyzePage() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Auto Detect');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSelectSample = (sample) => {
    setJobDescription(sample.text);
    setTargetRole(sample.title);
    setCompanyName(sample.company);
    setExperienceLevel(sample.experienceLevel);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError({
        message: 'Please select a text-based resume in PDF format before submitting.',
      });
      return;
    }

    if (!jobDescription || jobDescription.trim().length < 30) {
      setError({
        message: 'Please paste a complete job description (at least 30 characters) so the AI can evaluate requirements.',
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobDescription', jobDescription.trim());
      if (targetRole.trim()) formData.append('targetRole', targetRole.trim());
      if (companyName.trim()) formData.append('companyName', companyName.trim());
      if (experienceLevel) formData.append('experienceLevel', experienceLevel);

      const response = await analyzeResume(formData);

      if (response && response.success && response.data) {
        // Save to browser history
        const saved = saveAnalysis(response.data);
        setIsLoading(false);
        // Navigate to results page with saved ID
        navigate(`/app/results/${saved ? saved.id : 'latest'}`, {
          state: { analysis: response.data },
        });
      } else {
        throw new Error('Analysis response was incomplete or malformed.');
      }
    } catch (err) {
      setIsLoading(false);
      const errorObj = err.error || { message: err.message || 'An unexpected error occurred during analysis.' };
      setError(errorObj);
    }
  };

  const isFormValid = file && jobDescription.trim().length >= 30;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Title & Intro */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Analyze Resume Alignment
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Upload your resume and provide a target job posting to receive a structured compatibility evaluation.
        </p>
      </div>

      {/* Error Banner with Retry */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-2 animate-fade-in">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong className="font-semibold block text-rose-950">
                {error.code ? `Error: ${error.code}` : 'Analysis Failed'}
              </strong>
              <p className="mt-0.5 text-rose-700 leading-relaxed">{error.message}</p>

              {error.hint && (
                <div className="mt-2 p-2 bg-white/70 rounded-lg border border-rose-200 text-rose-900 font-mono text-[11px]">
                  {error.hint}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={() => setError(null)}
              className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-rose-100 text-rose-800 rounded-lg font-medium border border-rose-200 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Dismiss & Try Again</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Analysis Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Resume Upload */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="text-sm font-bold text-slate-900">Upload Resume (PDF Only)</h3>
            </div>
            <span className="text-[11px] text-slate-400">Max size 5 MB</span>
          </div>

          <DropZone
            file={file}
            onFileSelect={(selected) => setFile(selected)}
            onFileRemove={() => setFile(null)}
            maxMb={5}
          />
        </div>

        {/* Step 2: Job Description Input */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="text-sm font-bold text-slate-900">Paste Job Description</h3>
            </div>

            {/* Quick Sample Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 text-[11px]">Try sample:</span>
              {sampleJobDescriptions.map((sample, idx) => (
                <button
                  key={sample.title}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  className="px-2 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-[11px] font-medium text-slate-600 transition-colors"
                >
                  {sample.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <textarea
              rows={9}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job posting here, including required technologies, responsibilities, and preferred qualifications..."
              className="w-full text-xs sm:text-sm p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-sans leading-relaxed text-slate-800 placeholder:text-slate-400 bg-slate-50/40"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1.5">
              <span>Minimum 30 characters required</span>
              <span className="font-mono">
                {jobDescription.length} characters
              </span>
            </div>
          </div>

          {/* Optional Role & Company Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                <span>Target Role (Optional)</span>
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Frontend Engineer"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Company Name (Optional)</span>
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Stripe, Acme Corp"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                <span>Experience Level</span>
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white text-slate-700"
              >
                <option value="Auto Detect">Auto Detect from JD</option>
                <option value="Fresher / Student">Fresher / College Student</option>
                <option value="Entry Level (0-2 yrs)">Entry Level (0-2 years)</option>
                <option value="Intermediate (2-5 yrs)">Intermediate (2-5 years)</option>
                <option value="Senior (5+ yrs)">Senior (5+ years)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Advisory Callout */}
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-indigo-950 text-xs">
          <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            The generated score represents estimated resume compatibility across 5 weighted criteria. CareerMatch AI does not provide an official ATS guarantee or guarantee employment interviews.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-sm shadow-md transition-all ${
              isFormValid && !isLoading
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25 hover:scale-[1.01] cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Analyze My Resume</span>
          </button>
        </div>
      </form>

      {/* Progress Stages Modal */}
      <ProgressModal isOpen={isLoading} />
    </div>
  );
}
