import React, { useState, useEffect } from 'react';
import { checkHealth } from '../services/api';
import {
  getSavedAnalyses,
  clearAllAnalyses,
  exportAnalysesAsJSON,
} from '../utils/storage';
import {
  Settings,
  ShieldCheck,
  Server,
  Key,
  HardDrive,
  Trash2,
  Download,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Cpu,
} from 'lucide-react';

export default function SettingsPage() {
  const [health, setHealth] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(true);
  const [storageCount, setStorageCount] = useState(0);

  const fetchStatus = () => {
    setLoadingHealth(true);
    checkHealth().then((data) => {
      setHealth(data);
      setLoadingHealth(false);
    });
    setStorageCount(getSavedAnalyses().length);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleClearHistory = () => {
    if (window.confirm('Delete all saved analyses from your browser storage?')) {
      clearAllAnalyses();
      setStorageCount(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          System Status & Privacy Settings
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Inspect backend connectivity, configured AI models, and local browser data controls.
        </p>
      </div>

      {/* Backend & AI Connection Status Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Backend & Generative AI Engine</h3>
              <p className="text-xs text-slate-500">Live operational diagnostics</p>
            </div>
          </div>

          <button
            onClick={fetchStatus}
            disabled={loadingHealth}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${loadingHealth ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Server status */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Backend REST API
            </span>
            <div className="flex items-center gap-2 mt-1">
              {health?.status === 'healthy' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-700">Online & Responding</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span className="text-xs font-bold text-rose-700">Offline / Unreachable</span>
                </>
              )}
            </div>
            <p className="text-[11px] text-slate-400">Endpoint: /api/health</p>
          </div>

          {/* AI Key Status */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Gemini API Key
            </span>
            <div className="flex items-center gap-2 mt-1">
              {health?.aiConfigured ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-700">Configured in .env</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-amber-700">Key Not Configured</span>
                </>
              )}
            </div>
            <p className="text-[11px] text-slate-400">Securely held on server</p>
          </div>

          {/* Active Model */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Active AI Model
            </span>
            <div className="flex items-center gap-2 mt-1">
              <Cpu className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-800">
                {health?.model || 'gemini-2.5-flash'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Configurable via server/.env</p>
          </div>
        </div>

        {/* Setup guide if not configured */}
        {!health?.aiConfigured && (
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              <Key className="w-4 h-4 text-amber-700" />
              <span>How to Configure Your Gemini API Key:</span>
            </div>
            <p className="leading-relaxed">
              1. Obtain a free API key from{' '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="font-bold underline text-indigo-700"
              >
                Google AI Studio
              </a>.
            </p>
            <p className="leading-relaxed">
              2. Open the file <code className="bg-white px-1.5 py-0.5 rounded border border-amber-200 font-mono text-indigo-700">server/.env</code> in this project.
            </p>
            <p className="leading-relaxed">
              3. Set your key: <code className="bg-white px-1.5 py-0.5 rounded border border-amber-200 font-mono text-slate-800">GEMINI_API_KEY=AIzaSy...</code>
            </p>
            <p className="leading-relaxed">
              4. Click the "Refresh" button above to verify connectivity.
            </p>
          </div>
        )}
      </div>

      {/* Local Storage & Browser Data Controls */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Local Browser Storage</h3>
              <p className="text-xs text-slate-500">
                You have {storageCount} saved analysis report{storageCount === 1 ? '' : 's'} on this device
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={exportAnalysesAsJSON}
            disabled={storageCount === 0}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors ${
              storageCount > 0
                ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs'
                : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export History as JSON</span>
          </button>

          <button
            onClick={handleClearHistory}
            disabled={storageCount === 0}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors ${
              storageCount > 0
                ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Saved Analyses</span>
          </button>
        </div>
      </div>

      {/* Privacy Commitment */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Data Protection Commitment</h3>
            <p className="text-xs text-slate-500">Security principles governing CareerMatch AI</p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
          <p>
            • <strong>No Server-Side File Storage:</strong> Uploaded resumes are read in memory by Multer and garbage-collected once the AI analysis finishes. Files are never written to permanent disk storage.
          </p>
          <p>
            • <strong>No Unsolicited Tracking:</strong> We do not log full resumes or sensitive personal identifying information in server access logs.
          </p>
          <p>
            • <strong>Direct Provider Transport:</strong> Resume text is transmitted directly to Google's Generative AI API via encrypted TLS. The data is handled according to Google Cloud's API terms of service.
          </p>
        </div>
      </div>
    </div>
  );
}
