import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  Sparkles,
  ShieldCheck,
  Cpu,
  BarChart3,
  Layers,
  HelpCircle,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="pt-16 md:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Evidence-Based Career Alignment Engine</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          Make Your Resume Match the <span className="text-indigo-600">Opportunity</span>.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Upload your resume and paste any job description. Receive an estimated compatibility score, identify demonstrated versus missing skills, spot keyword gaps, and get actionable suggestions to optimize your application.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/app/analyze"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
          >
            <span>Analyze My Resume</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 shadow-xs transition-colors"
          >
            <span>How It Works</span>
            <HelpCircle className="w-4 h-4 text-slate-400" />
          </Link>
        </div>

        {/* Product Preview Card */}
        <div className="pt-10 max-w-4xl mx-auto text-left">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Header mockup */}
            <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400 font-mono ml-2">
                  Alignment Report — Full Stack Software Engineer
                </span>
              </div>
              <span className="text-xs bg-indigo-500/30 text-indigo-300 px-2.5 py-0.5 rounded-full font-medium">
                Sample Output Preview
              </span>
            </div>

            {/* Content mockup */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/50">
              {/* Score indicator */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center shadow-xs">
                <div className="w-24 h-24 rounded-full border-4 border-indigo-600 flex flex-col items-center justify-center bg-indigo-50/30">
                  <span className="text-3xl font-extrabold text-slate-900">82</span>
                  <span className="text-[10px] text-slate-500 font-medium">OUT OF 100</span>
                </div>
                <span className="mt-3 px-3 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Strong Match
                </span>
                <p className="text-[11px] text-slate-400 mt-2">
                  5-factor weighted evaluation
                </p>
              </div>

              {/* Skills breakdown */}
              <div className="md:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Demonstrated Competencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['React.js', 'Node.js', 'TypeScript', 'REST APIs', 'Docker', 'MongoDB'].map(
                      (skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Gaps & Areas to Clarify
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: 'GraphQL', status: 'insufficient' },
                      { name: 'CI/CD Pipelines', status: 'insufficient' },
                      { name: 'AWS Cloud', status: 'missing' },
                    ].map((item) => (
                      <span
                        key={item.name}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
                          item.status === 'missing'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        <AlertCircle className="w-3 h-3" />
                        {item.name} ({item.status === 'missing' ? 'Missing' : 'Insufficient'})
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step "How It Works" Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How CareerMatch AI Works
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            A three-step process built to give job seekers clear, factual feedback without gimmicks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="text-base font-semibold text-slate-900">Upload Your Resume</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload any text-based PDF resume. Text is extracted securely in memory without permanent disk storage.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="text-base font-semibold text-slate-900">Paste Job Requirements</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paste the complete job description. Choose target experience level or let the system automatically infer context.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="text-base font-semibold text-slate-900">Receive Actionable Insights</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Review your compatibility breakdown, identify missing skills, and get fact-checked bullet rewrites.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Engineered for Transparency & Integrity
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Unlike superficial keyword matchers, CareerMatch AI evaluates depth of evidence and provides grounded recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">5-Pillar Compatibility Score</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Weights required skills (40%), experience & projects (25%), qualifications (15%), terminology (10%), and achievements (10%).
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Nuanced Skill Gap Detection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Distinguishes between skills completely omitted versus those requiring clearer evidence of production use.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Fact-Preserving Bullet Rewrites</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Drafts stronger bullet phrasing based only on your actual work without inventing false metrics, tools, or claims.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Keyword Coverage Analysis</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Identifies high-priority terminology from the posting with clear guidance not to stuff terms without real experience.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Our Privacy Principles</h3>
              <p className="text-xs text-slate-500">Transparent handling of your professional documents</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 block font-semibold">In-Memory PDF Parsing</strong>
              <p>Uploaded resumes are processed directly in server memory. Files are not stored on our server hard drive.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 block font-semibold">Local-Only History</strong>
              <p>Previous analysis reports are stored only in your web browser's local storage and can be deleted at any time.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 block font-semibold">Server-Side API Security</strong>
              <p>Your Generative AI key resides strictly on the backend and is never exposed to the client or browser network logs.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 block font-semibold">No Fake Mock Substitution</strong>
              <p>Live analysis uses your configured Gemini model. If unconfigured, the application guides you rather than inventing fake data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to evaluate your resume against your target role?
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Get instant feedback on missing skills, keyword coverage, and actionable resume bullet rewrites.
          </p>
          <div className="pt-2">
            <Link
              to="/app/analyze"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md transition-all hover:scale-[1.02]"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
