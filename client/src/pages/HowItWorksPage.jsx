import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Search,
} from 'lucide-react';

export default function HowItWorksPage() {
  const pipeline = [
    {
      step: '01',
      title: 'PDF Text Extraction & Sanitization',
      icon: FileText,
      desc: 'When you upload your resume, our backend processes the PDF stream directly in volatile memory. It strips binary wrappers, extracts raw textual content, cleans up carriage returns, and checks that readable text is present without writing any file to disk.',
      detail: 'Scanned image-only PDFs without an OCR text layer are identified and rejected with helpful guidance, ensuring zero erroneous empty evaluations.',
    },
    {
      step: '02',
      title: 'Prompt Injection Defense & Data Isolation',
      icon: ShieldCheck,
      desc: 'The extracted resume text and pasted job posting are wrapped inside secure XML tags and strictly flagged as untrusted input data. The system instructs the AI model never to execute commands or override system instructions embedded in the documents.',
      detail: 'This guarantees your evaluation remains objective, robust against prompt injections, and focused purely on professional career matching.',
    },
    {
      step: '03',
      title: 'Semantic Alignment vs. Exact Keyword Matching',
      icon: Search,
      desc: 'Legacy ATS parsers perform blunt, literal substring matching (e.g. failing a candidate who writes "React.js" if the job asked for "ReactJS"). CareerMatch AI uses Generative AI to understand semantic equivalence, transferable experience, and conceptual depth.',
      detail: 'We evaluate not just whether a keyword exists, but whether the resume provides authentic evidence of production application.',
    },
    {
      step: '04',
      title: 'Structured 5-Pillar Scoring',
      icon: BarChart3,
      desc: 'The model calculates an estimated compatibility score from 0 to 100 based on five weighted dimensions: Core Required Skills (40%), Experience & Projects (25%), Education & Qualifications (15%), Terminology (10%), and Measurable Achievements (10%).',
      detail: 'Every point awarded requires citation of actual evidence from your resume.',
    },
    {
      step: '05',
      title: 'Fact-Preserving Recommendations & Rewrites',
      icon: Sparkles,
      desc: 'The final report identifies matching skills, highlights specific competency gaps, notes keywords found vs missing, and drafts bullet rewrites.',
      detail: 'Crucially, rewrites are strictly constrained to your existing facts: the model is forbidden from inventing metrics, percentages, tools, or responsibilities.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      {/* Page Heading */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
          <Layers className="w-3.5 h-3.5" />
          <span>Evaluation Methodology</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How CareerMatch AI Works
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          A transparent look at the parsing, evaluation, scoring, and anti-hallucination guardrails behind every report.
        </p>
      </div>

      {/* 5-Step Pipeline */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900">The 5-Stage Analysis Pipeline</h3>

        <div className="space-y-4">
          {pipeline.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase">
                        Stage {item.step}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item.detail}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Semantic Matching vs Keyword Stuffing Comparison */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="text-lg font-bold text-slate-900">
          Keyword Stuffing vs. Semantic Demonstration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
            <span className="font-bold text-rose-900 text-sm block">Legacy Keyword Matching</span>
            <ul className="space-y-2 text-rose-800">
              <li>• Treats resumes as flat strings of text.</li>
              <li>• Susceptible to "keyword stuffing" where terms are listed without context.</li>
              <li>• Misses genuine qualifications if wording differs slightly from the job description.</li>
              <li>• Gives false positives when a candidate mentions a keyword once in an irrelevant way.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
            <span className="font-bold text-emerald-900 text-sm block">CareerMatch AI Semantic Analysis</span>
            <ul className="space-y-2 text-emerald-800">
              <li>• Parses context, actions taken, and project outcomes.</li>
              <li>• Differentiates between core skills and passing mentions.</li>
              <li>• Distinguishes between completely missing competencies and those simply needing clearer demonstration.</li>
              <li>• Strictly prevents inventing experience, certifications, or metrics.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Important Disclaimer Card */}
      <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h4 className="text-sm font-bold">Important System Limitations</h4>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed">
          The compatibility score produced by CareerMatch AI is an algorithmic estimate based on defined recruitment criteria. It is designed to help students, freshers, and job seekers improve resume clarity and spot gaps.
        </p>
        <p className="text-xs text-amber-900 leading-relaxed font-semibold">
          It does not guarantee employment, interviews, or represent an official score from any commercial Applicant Tracking System (ATS).
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <Link
          to="/app/analyze"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
        >
          <span>Run an Alignment Analysis</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
