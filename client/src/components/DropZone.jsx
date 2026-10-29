import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, X, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function DropZone({ file, onFileSelect, onFileRemove, maxMb = 5 }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const validateFile = (selected) => {
    setError(null);
    if (!selected) return false;

    // Check PDF extension or MIME type
    const isPdf =
      selected.type === 'application/pdf' ||
      selected.name.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      setError('Please select a valid PDF file. Other file formats are not supported.');
      return false;
    }

    const maxBytes = maxMb * 1024 * 1024;
    if (selected.size > maxBytes) {
      setError(`File size exceeds ${maxMb}MB. Please select a smaller PDF.`);
      return false;
    }

    if (selected.size === 0) {
      setError('The selected file is empty.');
      return false;
    }

    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const dropped = e.dataTransfer.files[0];
      if (validateFile(dropped)) {
        onFileSelect(dropped);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      if (validateFile(selected)) {
        onFileSelect(selected);
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleInputChange}
      />

      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragOver
              ? 'border-indigo-500 bg-indigo-50/50 scale-[1.005]'
              : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50/50 bg-white'
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                <span className="text-indigo-600 hover:underline">Click to browse</span> or drag and drop your resume
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Text-based PDF only • Maximum file size {maxMb}MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <span>{formatFileSize(file.size)}</span>
                  <span>•</span>
                  <span className="inline-flex items-center text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Ready for parsing
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2.5 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={onFileRemove}
                title="Remove file"
                className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 text-xs rounded-xl bg-rose-50 border border-rose-200 text-rose-700">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
