import React, { useState } from 'react';
import { ShieldAlert, Download, AlertTriangle, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { getPDFReportUrl } from '../api';

export default function RecommendationsCard({ recommendations = {}, jobId = '', riskLevel = 'LOW' }) {
  const [downloading, setDownloading] = useState(false);

  const level = riskLevel.toUpperCase();
  
  const isCritical = level === 'CRITICAL';
  const isModerate = level === 'MODERATE';

  const badgeColor = isCritical
    ? 'bg-red-950/80 text-red-400 border-red-800'
    : isModerate
    ? 'bg-orange-950/80 text-orange-400 border-orange-800'
    : 'bg-emerald-950/80 text-emerald-400 border-emerald-800';

  const cardBorder = isCritical
    ? 'border-red-800/80 shadow-red-950/30'
    : isModerate
    ? 'border-orange-800/80 shadow-orange-950/30'
    : 'border-emerald-800/80 shadow-emerald-950/30';

  const handleDownloadPDF = () => {
    if (!jobId) return;
    setDownloading(true);
    const pdfUrl = getPDFReportUrl(jobId);
    
    // Trigger direct file download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', `DamageScope_Report_${jobId.slice(0, 8)}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloading(false), 1500);
  };

  return (
    <div className={`tactical-card rounded-xl p-6 mb-8 border shadow-xl ${cardBorder}`}>
      {/* Title & PDF Export Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg border ${badgeColor}`}>
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase border ${badgeColor}`}>
                {recommendations.zone_level || level} RISK ZONE
              </span>
              <span className="text-xs text-slate-500 font-mono">AUTOMATED RULE ENGINE</span>
            </div>
            <h3 className="text-base font-extrabold text-white font-mono mt-1">
              {recommendations.title || `${level} Structural Impact Assessment`}
            </h3>
          </div>
        </div>

        <button
          onClick={handleDownloadPDF}
          disabled={downloading || !jobId}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-750 hover:from-slate-750 hover:to-slate-700 text-white font-mono text-xs font-bold rounded-lg border border-slate-600 hover:border-slate-400 transition-all shadow-md"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          {downloading ? 'GENERATING PDF...' : 'EXPORT DISASTER PDF REPORT'}
        </button>
      </div>

      {/* Primary Action Priority Directive */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 font-mono">
        <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold mb-1">
          TACTICAL PRIORITY FOCUS DIRECTIVE:
        </span>
        <p className="text-sm font-bold text-cyan-300">
          {recommendations.priority || 'Standard Recovery Operations'}
        </p>
      </div>

      {/* Recommended Recovery Steps List */}
      <div>
        <h4 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider mb-3">
          ACTIONABLE RECOVERY RECOMMENDATIONS:
        </h4>
        <div className="space-y-3">
          {(recommendations.recommendations || []).map((recText, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-200"
            >
              <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-400 flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="leading-relaxed">{recText}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
