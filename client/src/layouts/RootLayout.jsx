import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Target, ArrowRight } from 'lucide-react';
import StatusBanner from '../components/StatusBanner';

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Public Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/25">
              <Target className="w-5 h-5" />
            </div>
            <div className="flex items-center">
              <span className="font-bold text-lg text-slate-900 tracking-tight">CareerMatch</span>
              <span className="text-indigo-600 font-bold text-sm ml-1">AI</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <Link to="/#features" className="hover:text-indigo-600 transition-colors">
              Features
            </Link>
            <Link to="/how-it-works" className="hover:text-indigo-600 transition-colors">
              How It Works
            </Link>
            <Link to="/#privacy" className="hover:text-indigo-600 transition-colors">
              Privacy
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <StatusBanner />
            <Link
              to="/app/analyze"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all hover:scale-[1.02]"
            >
              <span>Analyze Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              <Target className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800">CareerMatch AI</span>
            <span className="text-slate-400">| Evidence-Based Resume & Job Matcher</span>
          </div>

          <div className="flex items-center space-x-6 text-slate-500">
            <Link to="/how-it-works" className="hover:text-indigo-600">
              Methodology
            </Link>
            <Link to="/app" className="hover:text-indigo-600">
              Dashboard
            </Link>
            <Link to="/app/settings" className="hover:text-indigo-600">
              Settings
            </Link>
          </div>

          <p className="text-center md:text-right max-w-sm text-slate-400">
            Notice: Compatibility score is an advisory estimate based on defined criteria. It is not an official ATS result or a guarantee of employment.
          </p>
        </div>
      </footer>
    </div>
  );
}
