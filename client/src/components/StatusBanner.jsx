import React, { useState, useEffect } from 'react';
import { checkHealth } from '../services/api';
import { AlertCircle, CheckCircle2, Key, Server, X } from 'lucide-react';

export default function StatusBanner() {
  const [health, setHealth] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
    checkHealth().then((data) => {
      if (isMounted) setHealth(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!health) return null;

  const isConfigured = health.aiConfigured;
  const isHealthy = health.status === 'healthy';

  return (
    <>
      <div className="flex items-center space-x-2">
        {isHealthy && isConfigured ? (
          <div
            title="Google Gemini API is configured and operational"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Ready ({health.model || 'Gemini'})</span>
          </div>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 transition-colors shadow-xs"
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Setup AI Key</span>
          </button>
        )}
      </div>

      {/* Setup Guide Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Gemini API Key Configuration</h3>
                  <p className="text-xs text-slate-500">Live AI analysis requires a free Google Gemini key</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>To enable real-time resume analysis and bullet improvements:</p>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-700">
                <li>
                  Get a free API key from{' '}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 font-medium underline"
                  >
                    Google AI Studio
                  </a>.
                </li>
                <li>
                  Open the <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700">server/.env</code> file in this project.
                </li>
                <li>
                  Set your key:
                  <pre className="bg-slate-900 text-slate-100 p-2.5 rounded-lg mt-1 text-xs overflow-x-auto">
                    GEMINI_API_KEY=your_key_here
                  </pre>
                </li>
                <li>Save the file and restart or refresh the server.</li>
              </ol>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  checkHealth().then(setHealth);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm"
              >
                Done / Refresh Status
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
