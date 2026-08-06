import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, ArrowRight, Terminal, Sparkles } from 'lucide-react';

export default function CTABanner({ onLaunchConsole }) {
  return (
    <section className="py-20 relative overflow-hidden font-mono">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-amber-500/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-3xl p-10 sm:p-16 border border-cyan-500/30 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Top Scanner Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent radar-scanner" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DEPLOY IN SECONDS • LOCAL ONNX RUNTIME</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Ready to Automate Building <br />
            <span className="text-gradient-amber">Damage Telemetry?</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-sans max-w-2xl mx-auto mb-8 leading-relaxed">
            Experience real-time UNet neural segmentation and xBD 4-tier damage classification. 
            No cloud API tokens required — fully self-hosted.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLaunchConsole}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-amber-500 text-white font-mono text-sm font-bold shadow-xl shadow-cyan-950/80 hover:scale-105 transition-transform flex items-center justify-center gap-3 cursor-pointer"
            >
              <Terminal className="w-5 h-5 text-amber-300" />
              <span>LAUNCH AI ASSESSMENT CONSOLE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
