import React, { useState, useEffect } from 'react';
import { History, Eye, Download, Trash2, RefreshCw, ShieldAlert, FileText } from 'lucide-react';
import { listAssessments, deleteAssessment, getPDFReportUrl } from '../api';

export default function AssessmentHistory({ onLoadAssessment }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listAssessments();
      setHistory(data);
    } catch (err) {
      setError('Failed to fetch historical assessments from SQLite database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (jobId) => {
    if (!window.confirm(`Delete assessment record ${jobId.slice(0, 8)}?`)) return;
    setDeletingId(jobId);
    try {
      await deleteAssessment(jobId);
      setHistory(prev => prev.filter(item => item.job_id !== jobId));
    } catch (err) {
      alert('Failed to delete assessment.');
    } finally {
      setDeletingId(null);
    }
  };

  const getRiskBadge = (level) => {
    const l = (level || 'LOW').toUpperCase();
    if (l === 'CRITICAL') {
      return <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 text-[10px] font-bold">CRITICAL</span>;
    }
    if (l === 'MODERATE') {
      return <span className="px-2 py-0.5 rounded bg-orange-950 text-orange-400 border border-orange-800 text-[10px] font-bold">MODERATE</span>;
    }
    return <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">LOW RISK</span>;
  };

  return (
    <div className="tactical-card rounded-xl p-6 mb-8 border border-slate-700/60 shadow-xl">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 font-mono">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-400" />
            ASSESSMENT HISTORY
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Historical satellite assessment jobs persisted in database.
          </p>
        </div>

        <button
          onClick={fetchHistory}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded border border-slate-700 text-xs transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          REFRESH
        </button>
      </div>

      {error && (
        <div className="p-3 mb-4 rounded bg-red-950/60 border border-red-800 text-red-400 text-xs font-mono">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-slate-500 font-mono text-xs animate-pulse">
          Loading assessment log history from server...
        </div>
      ) : history.length === 0 ? (
        <div className="py-12 text-center text-slate-500 font-mono text-xs">
          No historical satellite assessment records found. Run a new assessment console job to log data.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-slate-900/90 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <th className="p-3">Job ID</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Risk Level</th>
                <th className="p-3 text-center">Structures</th>
                <th className="p-3">Breakdown (No/Min/Maj/Des)</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {history.map((job) => (
                <tr key={job.job_id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-3 font-bold text-cyan-400">
                    {job.job_id.slice(0, 8)}...
                  </td>
                  <td className="p-3 text-slate-300">
                    {new Date(job.created_at).toLocaleString()}
                  </td>
                  <td className="p-3">
                    {getRiskBadge(job.risk_level)}
                  </td>
                  <td className="p-3 text-center font-bold text-white">
                    {job.total_buildings}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <span className="text-emerald-400 font-bold">{job.no_damage_count}</span> /
                      <span className="text-yellow-400 font-bold">{job.minor_damage_count}</span> /
                      <span className="text-orange-400 font-bold">{job.major_damage_count}</span> /
                      <span className="text-red-400 font-bold">{job.destroyed_count}</span>
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onLoadAssessment(job.job_id)}
                        className="p-1.5 bg-slate-800 hover:bg-cyan-950 text-slate-300 hover:text-cyan-400 border border-slate-700 hover:border-cyan-500 rounded transition-all"
                        title="Load Assessment"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={getPDFReportUrl(job.job_id)}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded transition-all"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => handleDelete(job.job_id)}
                        disabled={deletingId === job.job_id}
                        className="p-1.5 bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-600 rounded transition-all"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
