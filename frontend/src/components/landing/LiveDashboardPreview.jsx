import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Terminal, ArrowRight } from 'lucide-react';

export default function LiveDashboardPreview({ onLaunchConsole }) {
  return (
    <section id="preview" className="py-24 relative overflow-hidden font-mono">
      {/* Background Mesh Gradient */}
      <div className="absolute top-0 right-1/3 w-96 h-96 glow-orb-cyan pointer-events-none opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 font-sans">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-primary text-xs font-mono font-medium uppercase tracking-widest">
            <Monitor className="w-3.5 h-3.5" />
            <span>Interactive Dashboard Preview</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-5xl font-bold text-on-surface tracking-tight">
            Tactical Inspection Suite <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">In Real Time.</span>
          </h2>

          <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
            Explore the live interface featuring pre/post-disaster image comparison, dynamic AI segmentation masks, 
            severity risk badges, and automated engineering reports.
          </p>
        </div>

        {/* HUD Frame Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative glass-panel rounded-xl p-3 md:p-6 scan-crosshair shadow-2xl overflow-hidden"
        >
          <div className="scan-crosshair-inner absolute inset-0"></div>

          {/* Top Console Bar */}
          <div className="flex items-center justify-between mb-4 border-b border-slate-300/60 dark:border-white/10 pb-3 px-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              <span className="font-mono text-sm font-semibold text-on-surface">Analysis Console</span>
            </div>
            <div className="flex gap-2">
              <span className="font-mono text-xs bg-cyan-500/10 text-cyan-600 dark:bg-primary-container/20 dark:text-primary border border-cyan-500/30 px-3 py-1 rounded font-medium">
                Demo Confidence: 98%
              </span>
              <span className="font-mono text-xs bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border border-red-500/30 px-3 py-1 rounded font-medium">
                Demo Status: High Risk
              </span>
            </div>
          </div>

          {/* Dual-Pane Inspection Viewport */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[440px]">
            {/* Pre-Disaster Image Pane */}
            <div className="relative bg-slate-200/80 dark:bg-surface-container-high rounded border border-slate-300/80 dark:border-white/10 overflow-hidden group">
              <img 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                alt="Pre-Disaster Satellite Baseline Structure"
                src="/pre_disaster_satellite.png"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80";
                }} 
              />
              <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur px-3 py-1 rounded font-mono text-xs text-white border border-white/20 shadow-md">
                Pre-Disaster Baseline (Satellite)
              </div>
            </div>

            {/* Post-Disaster Image Pane with AI Overlays */}
            <div className="relative bg-slate-200/80 dark:bg-surface-container-high rounded border border-slate-300/80 dark:border-white/10 overflow-hidden group">
              <img 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                alt="Post-Disaster AI Satellite Scan"
                src="/post_disaster_satellite.png"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80";
                }} 
              />
              <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur px-3 py-1 rounded font-mono text-xs text-white border border-white/20 shadow-md">
                Post-Disaster AI Scan (Satellite)
              </div>

              {/* Simulated Glowing AI Mask Contours over Damaged Roofs */}
              <div className="absolute top-[28%] left-[38%] w-[26%] h-[24%] border-2 border-red-500 bg-red-500/35 rounded backdrop-blur-xs flex items-center justify-center pointer-events-none">
                <span className="font-mono text-[10px] bg-slate-900/90 px-2 py-0.5 rounded text-red-400 font-bold border border-red-500 shadow-md">
                  ROOF COLLAPSE #1
                </span>
              </div>

              <div className="absolute top-[32%] left-[16%] w-[18%] h-[18%] border-2 border-amber-500 bg-amber-500/35 rounded backdrop-blur-xs flex items-center justify-center pointer-events-none">
                <span className="font-mono text-[10px] bg-slate-900/90 px-2 py-0.5 rounded text-amber-400 font-bold border border-amber-500 shadow-md">
                  STRUCTURAL RUBBLE
                </span>
              </div>

              <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur px-3 py-1 rounded font-mono text-xs text-red-400 border border-red-500/50 font-semibold shadow-md">
                Sample Damage Area: ~142 m²
              </div>
            </div>
          </div>

          {/* Bottom Action Footer inside Frame */}
          <div className="mt-4 pt-3 border-t border-slate-300/60 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            <span className="text-xs text-on-surface-variant font-mono">
              Tested on xBD satellite dataset • Dual-stage UNet tensor pipeline
            </span>
            <button
              onClick={onLaunchConsole}
              className="px-5 py-2 rounded bg-cyan-600 hover:bg-cyan-700 text-white dark:bg-primary-container dark:text-on-primary-container text-xs font-mono font-semibold glow-cyan-hover transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Assessment Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
