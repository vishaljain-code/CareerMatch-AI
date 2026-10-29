import React from 'react';

export default function ScoreGauge({ score = 0, scoreBand = 'Moderate Match' }) {
  // SVG circular gauge geometry
  const radius = 64;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let color = '#f59e0b'; // amber
  let badgeBg = 'bg-amber-50 text-amber-700 border-amber-200';

  if (score >= 85) {
    color = '#10b981'; // emerald
    badgeBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (score >= 70) {
    color = '#6366f1'; // indigo
    badgeBg = 'bg-indigo-50 text-indigo-700 border-indigo-200';
  } else if (score < 50) {
    color = '#f43f5e'; // rose
    badgeBg = 'bg-rose-50 text-rose-700 border-rose-200';
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
      <div className="relative flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            stroke="#f1f5f9"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{
              strokeDashoffset,
              transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{score}</span>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Out of 100</span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${badgeBg}`}
        >
          {scoreBand}
        </span>
        <p className="mt-2 text-xs text-slate-500 max-w-[200px]">
          Estimated role compatibility based on resume evidence
        </p>
      </div>
    </div>
  );
}
