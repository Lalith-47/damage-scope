import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Terminal, Layers, ShieldCheck, Download, RefreshCw, BarChart3, ArrowRight } from 'lucide-react';

export default function LiveDashboardPreview({ onLaunchConsole }) {
  const [activeTab, setActiveTab] = useState('vector'); // 'vector' | 'stats' | 'pdf'

  return (
    <section id="preview" className="py-24 relative overflow-hidden font-mono">
      {/* Background Mesh Gradient */}
      <div className="absolute top-0 right-1/3 w-96 h-96 glow-orb-cyan pointer-events-none opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <Monitor className="w-3.5 h-3.5" />
            <span>INTERACTIVE DASHBOARD PREVIEW</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Tactical Inspection Suite <br />
            <span className="text-gradient-cyan">In Real Time.</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-sans leading-relaxed">
            Explore the live interface featuring building contours, classification probability breakdowns, 
            analytics charts, and automated PDF exports.
          </p>
        </div>

        {/* Floating Browser Frame Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative glass-card rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden"
        >
          {/* Top Browser Bar */}
          <div className="px-6 py-4 bg-slate-900/95 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-slate-400 font-bold ml-2">
                http://localhost/api/assess/damagescope-console
              </span>
            </div>

            {/* Preview Tabs */}
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setActiveTab('vector')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'vector' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                VECTOR OVERVIEW
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'stats' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                ANALYTICS CHARTS
              </button>
              <button
                onClick={() => setActiveTab('pdf')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'pdf' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                PDF DIRECTIVES
              </button>
            </div>
          </div>

          {/* Browser Content Viewport */}
          <div className="p-8 bg-slate-950 min-h-[480px]">
            {activeTab === 'vector' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 aspect-video rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 blueprint-grid opacity-30" />
                  <svg viewBox="0 0 1024 1024" className="w-full h-full">
                    <rect x="200" y="200" width="180" height="150" fill="#22c55e" fillOpacity="0.4" stroke="#22c55e" strokeWidth="4" />
                    <text x="290" y="275" fill="#ffffff" fontSize="24" fontWeight="bold" textAnchor="middle">#1 NO DAMAGE (89.9%)</text>

                    <rect x="640" y="200" width="180" height="150" fill="#eab308" fillOpacity="0.4" stroke="#eab308" strokeWidth="4" />
                    <text x="730" y="275" fill="#ffffff" fontSize="24" fontWeight="bold" textAnchor="middle">#2 MINOR DAMAGE (76.4%)</text>

                    <rect x="200" y="600" width="180" height="150" fill="#f97316" fillOpacity="0.4" stroke="#f97316" strokeWidth="4" />
                    <text x="290" y="675" fill="#ffffff" fontSize="24" fontWeight="bold" textAnchor="middle">#3 MAJOR DAMAGE (82.1%)</text>

                    <rect x="640" y="600" width="180" height="150" fill="#ef4444" fillOpacity="0.4" stroke="#ef4444" strokeWidth="4" />
                    <text x="730" y="675" fill="#ffffff" fontSize="24" fontWeight="bold" textAnchor="middle">#4 DESTROYED (94.2%)</text>
                  </svg>
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-950/90 rounded-lg border border-slate-800 text-xs flex justify-between">
                    <span className="text-slate-300 font-bold">13 STRUCTURES DETECTED IN SATELLITE TENSOR</span>
                    <span className="text-cyan-400 font-bold">LOW RISK GREEN ZONE</span>
                  </div>
                </div>

                <div className="lg:col-span-4 p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold text-cyan-400 border-b border-slate-800 pb-2">STRUCTURE INSPECTOR</h4>
                  <div className="p-3 rounded bg-slate-950 border border-emerald-800/80">
                    <div className="text-[10px] text-slate-400">PREDICTED SEVERITY</div>
                    <div className="text-lg font-bold text-emerald-400">NO DAMAGE</div>
                    <div className="text-xs text-white mt-1">CONFIDENCE: 89.9%</div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span>No Damage:</span><span className="font-bold text-emerald-400">89.9%</span></div>
                    <div className="flex justify-between"><span>Minor Damage:</span><span className="font-bold text-yellow-400">7.7%</span></div>
                    <div className="flex justify-between"><span>Major Damage:</span><span className="font-bold text-orange-400">5.2%</span></div>
                    <div className="flex justify-between"><span>Destroyed:</span><span className="font-bold text-red-400">0.3%</span></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-xs mb-1">TOTAL STRUCTURES</div>
                  <div className="text-3xl font-black text-white">13</div>
                </div>
                <div className="p-6 rounded-xl bg-slate-900 border border-emerald-900/60">
                  <div className="text-emerald-400 text-xs mb-1">NO DAMAGE</div>
                  <div className="text-3xl font-black text-emerald-400">13 (100%)</div>
                </div>
                <div className="p-6 rounded-xl bg-slate-900 border border-orange-900/60">
                  <div className="text-orange-400 text-xs mb-1">MAJOR DAMAGE</div>
                  <div className="text-3xl font-black text-orange-400">0 (0%)</div>
                </div>
                <div className="p-6 rounded-xl bg-slate-900 border border-red-900/60">
                  <div className="text-red-400 text-xs mb-1">DESTROYED</div>
                  <div className="text-3xl font-black text-red-400">0 (0%)</div>
                </div>
              </div>
            )}

            {activeTab === 'pdf' && (
              <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-white">AUTOMATED DISASTER RECOVERY DIRECTIVES</h4>
                    <p className="text-xs text-slate-400">Tactical Priority: Standard Recovery & Documentation</p>
                  </div>
                  <button className="px-3 py-1.5 bg-cyan-600 text-white rounded text-xs font-bold flex items-center gap-2">
                    <Download className="w-4 h-4" /> EXPORT PDF REPORT
                  </button>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-3 rounded bg-slate-950 border border-slate-800">1. Conduct localized structural checks on flagged minor-damage buildings.</div>
                  <div className="p-3 rounded bg-slate-950 border border-slate-800">2. Allow resident re-entry under general caution.</div>
                  <div className="p-3 rounded bg-slate-950 border border-slate-800">3. Begin insurance claims processing and municipal assessment logging.</div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Callout Banner inside Frame */}
          <div className="px-8 py-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-300 font-bold">
              READY TO RUN INFERENCE ON YOUR OWN SATELLITE PNG PAIRS?
            </span>
            <button
              onClick={onLaunchConsole}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-amber-500 text-white text-xs font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
            >
              <Terminal className="w-4 h-4" />
              <span>TEST LIVE CONSOLE NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
