import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export default function ScoreBreakdownChart({ breakdown }) {
  if (!breakdown) return null;

  const data = [
    {
      category: 'Core Skills',
      score: breakdown.requiredSkills || 0,
      max: 40,
      description: 'Technical and domain competencies',
      color: '#4f46e5', // indigo
    },
    {
      category: 'Experience & Projects',
      score: breakdown.experienceAndProjects || 0,
      max: 25,
      description: 'Hands-on practical work and complexity',
      color: '#6366f1',
    },
    {
      category: 'Education & Qualls',
      score: breakdown.educationAndQualifications || 0,
      max: 15,
      description: 'Degree requirements & certifications',
      color: '#818cf8',
    },
    {
      category: 'Terminology & Keywords',
      score: breakdown.keywordsAndTerminology || 0,
      max: 10,
      description: 'Domain-specific language alignment',
      color: '#06b6d4',
    },
    {
      category: 'Achievement Evidence',
      score: breakdown.achievementsEvidence || 0,
      max: 10,
      description: 'Measurable outcomes & ownership',
      color: '#10b981',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Scoring Model Breakdown</h3>
          <p className="text-xs text-slate-500">
            5 weighted pillars evaluated against the job description criteria
          </p>
        </div>
        <span className="text-xs text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
          Max: 100 Points
        </span>
      </div>

      <div className="space-y-4">
        {data.map((item) => {
          const percentage = Math.round((item.score / item.max) * 100);
          return (
            <div key={item.category} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-700">{item.category}</span>
                <span className="text-slate-500 font-mono">
                  <strong className="text-slate-900 font-bold">{item.score}</strong> / {item.max} pts ({percentage}%)
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${Math.min(100, percentage)}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
              <p className="text-[11px] text-slate-400">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
