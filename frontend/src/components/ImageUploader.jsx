import React, { useState } from 'react';
import { Upload, FileImage, Zap, AlertTriangle, ShieldCheck, Check } from 'lucide-react';

export default function ImageUploader({ onStartAssessment, onStartSample, isProcessing }) {
  const [preFile, setPreFile] = useState(null);
  const [postFile, setPostFile] = useState(null);
  const [prePreview, setPrePreview] = useState(null);
  const [postPreview, setPostPreview] = useState(null);
  const [dragOverPre, setDragOverPre] = useState(false);
  const [dragOverPost, setDragOverPost] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileSelect = (file, type) => {
    if (!file || !file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (PNG/JPG).');
      return;
    }
    setErrorMsg('');
    const previewUrl = URL.createObjectURL(file);
    if (type === 'pre') {
      setPreFile(file);
      setPrePreview(previewUrl);
    } else {
      setPostFile(file);
      setPostPreview(previewUrl);
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    if (type === 'pre') setDragOverPre(false);
    else setDragOverPost(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0], type);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!preFile || !postFile) {
      setErrorMsg('Both Pre-Disaster and Post-Disaster satellite images are required.');
      return;
    }
    setErrorMsg('');
    onStartAssessment(preFile, postFile);
  };

  return (
    <div className="tactical-card rounded-xl p-6 mb-8 border border-slate-700/60 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2 font-mono">
            <Upload className="w-5 h-5 text-cyan-400" />
            SATELLITE IMAGE UPLOAD CONSOLE
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Select or drag 1024x1024 Pre & Post disaster satellite images for neural building segmentation and damage classification.
          </p>
        </div>

        <button
          type="button"
          onClick={onStartSample}
          disabled={isProcessing}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium rounded-lg bg-slate-800 hover:bg-slate-750 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 transition-all disabled:opacity-50"
        >
          <Zap className="w-4 h-4 text-cyan-400" />
          LOAD DEMO TEST PAIR
        </button>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-red-300 text-xs font-mono flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Pre-Disaster Dropzone */}
          <div>
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
              1. PRE-DISASTER SATELLITE IMAGE
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOverPre(true); }}
              onDragLeave={() => setDragOverPre(false)}
              onDrop={(e) => handleDrop(e, 'pre')}
              className={`relative h-64 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 cursor-pointer overflow-hidden ${
                dragOverPre
                  ? 'border-cyan-400 bg-cyan-950/20'
                  : prePreview
                  ? 'border-emerald-500/60 bg-slate-900/90'
                  : 'border-slate-700 bg-slate-900/50 hover:border-slate-500'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0], 'pre')}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />

              {prePreview ? (
                <div className="relative w-full h-full group">
                  <img
                    src={prePreview}
                    alt="Pre-disaster preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <FileImage className="w-8 h-8 text-emerald-400" />
                    <span className="text-xs font-mono text-emerald-300">Click to change pre-image</span>
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-1 bg-emerald-950/90 border border-emerald-500/80 rounded text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> PRE READY
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <FileImage className="w-10 h-10 text-slate-500 mx-auto mb-2" />
                  <p className="text-xs font-mono font-medium text-slate-300">
                    Drop Pre-Disaster PNG or <span className="text-cyan-400 underline">Browse</span>
                  </p>
                  <p className="text-[10px] font-mono text-slate-500 mt-1">xBD format (1024x1024)</p>
                </div>
              )}
            </div>
          </div>

          {/* Post-Disaster Dropzone */}
          <div>
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
              2. POST-DISASTER SATELLITE IMAGE
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOverPost(true); }}
              onDragLeave={() => setDragOverPost(false)}
              onDrop={(e) => handleDrop(e, 'post')}
              className={`relative h-64 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 cursor-pointer overflow-hidden ${
                dragOverPost
                  ? 'border-cyan-400 bg-cyan-950/20'
                  : postPreview
                  ? 'border-orange-500/60 bg-slate-900/90'
                  : 'border-slate-700 bg-slate-900/50 hover:border-slate-500'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0], 'post')}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />

              {postPreview ? (
                <div className="relative w-full h-full group">
                  <img
                    src={postPreview}
                    alt="Post-disaster preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <FileImage className="w-8 h-8 text-orange-400" />
                    <span className="text-xs font-mono text-orange-300">Click to change post-image</span>
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-1 bg-orange-950/90 border border-orange-500/80 rounded text-[10px] font-mono text-orange-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> POST READY
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <FileImage className="w-10 h-10 text-slate-500 mx-auto mb-2" />
                  <p className="text-xs font-mono font-medium text-slate-300">
                    Drop Post-Disaster PNG or <span className="text-orange-400 underline">Browse</span>
                  </p>
                  <p className="text-[10px] font-mono text-slate-500 mt-1">xBD format (1024x1024)</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isProcessing || !preFile || !postFile}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-bold rounded-lg tracking-wider shadow-lg shadow-cyan-950/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            {isProcessing ? 'PROCESSING ASSESSMENT...' : 'RUN SATELLITE DAMAGE ASSESSMENT'}
          </button>
        </div>
      </form>
    </div>
  );
}
