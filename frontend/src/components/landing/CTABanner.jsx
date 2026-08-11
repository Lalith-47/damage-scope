import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Sparkles } from 'lucide-react';

export default function CTABanner({ onLaunchConsole }) {
  return (
    <section className="py-20 relative overflow-hidden font-mono">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-2xl p-10 sm:p-16 border border-primary/30 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Top Scanner Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent radar-scanner" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant/30 text-primary text-xs font-mono font-medium uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Deploy in Seconds • Real-Time AI Tensor Engine</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-5xl font-bold text-on-surface tracking-tight leading-tight mb-6">
            Ready to Automate Structural <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-fixed-dim to-secondary">
              Damage Detection?
            </span>
          </h2>

          <p className="font-body text-on-surface-variant text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Experience real-time UNet neural segmentation, structural repair recommendations, and automated PDF report generation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLaunchConsole}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white dark:bg-primary-container dark:text-on-primary-container font-mono text-sm font-semibold glow-cyan transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer shadow-md"
            >
              <Terminal className="w-5 h-5" />
              <span>Launch Free Assessment Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onLaunchConsole}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-transparent border border-primary text-primary font-mono text-sm font-semibold hover:bg-primary/10 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Schedule Enterprise Demo</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
