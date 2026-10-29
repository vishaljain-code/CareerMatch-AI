import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileCheck2,
  Sparkles,
  History,
  HelpCircle,
  Settings,
  PlusCircle,
  Menu,
  X,
  Target,
  ExternalLink,
} from 'lucide-react';
import StatusBanner from '../components/StatusBanner';

export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
    { name: 'Analyze Resume', path: '/app/analyze', icon: FileCheck2 },
    { name: 'Bullet Assistant', path: '/app/assistant', icon: Sparkles },
    { name: 'Analysis History', path: '/app/history', icon: History },
    { name: 'How It Works', path: '/how-it-works', icon: HelpCircle },
    { name: 'Settings & Privacy', path: '/app/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row text-slate-800">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-slate-900 border-r border-slate-800 text-slate-300 shrink-0">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/30">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base text-white tracking-tight">CareerMatch</span>
              <span className="text-indigo-400 font-semibold text-xs ml-1">AI</span>
            </div>
          </Link>
        </div>

        {/* Start New Analysis button in sidebar */}
        <div className="p-4">
          <Link
            to="/app/analyze"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.01]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Analysis</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === '/app'
                ? location.pathname === '/app'
                : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-800/90 text-white font-semibold'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Local Storage & Non-ATS Advisory Notice */}
        <div className="p-4 m-3 rounded-xl bg-slate-800/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <p className="font-semibold text-slate-300">Privacy Notice</p>
          <p className="leading-relaxed">
            Resumes are processed in memory and never stored on the server. Past analyses stay in your local browser storage.
          </p>
        </div>

        <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>CareerMatch AI v1.0</span>
          <Link to="/" className="text-indigo-400 hover:underline">
            Landing Page
          </Link>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
            <Target className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-tight">CareerMatch AI</span>
        </Link>

        <div className="flex items-center gap-3">
          <StatusBanner />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-xs flex flex-col p-6 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <span className="font-bold text-white text-lg">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <Link
            to="/app/analyze"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Start New Analysis</span>
          </Link>

          <div className="space-y-1 pt-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800"
                >
                  <Icon className="w-5 h-5 text-indigo-400" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Desktop Top Bar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <h1 className="text-base font-semibold text-slate-900 capitalize">
              {location.pathname === '/app'
                ? 'Overview Dashboard'
                : location.pathname.split('/')[2]?.replace('-', ' ') || 'CareerMatch AI'}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <StatusBanner />
            <Link
              to="/app/analyze"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Analysis</span>
            </Link>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Global Footer & Disclaimer */}
        <footer className="px-6 py-4 bg-white border-t border-slate-200 text-center text-xs text-slate-400 no-print">
          <p>
            CareerMatch AI evaluates alignment based on defined criteria and does not claim to be an official ATS scoring system or guarantee interviews.
          </p>
        </footer>
      </div>
    </div>
  );
}
