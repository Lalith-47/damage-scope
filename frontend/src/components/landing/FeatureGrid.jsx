import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, FileCheck, ShieldAlert, Zap, Sparkles, Activity, Crosshair } from 'lucide-react';

const FEATURES = [
  {
    icon: Layers,
    tag: "UNET LOCALIZATION",
    title: "1024x1024 Neural Building Segmentation",
    description: "Extracts precise building footprint contours and polygon bounding boxes from high-resolution satellite imagery using deep UNet convolution layers.",
    color: "cyan",
    stat: "1024² Input Res",
    badge: "PyTorch ONNX"
  },
  {
    icon: Cpu,
    tag: "SIAMUNET CLASSIFICATION",
    title: "85%+ Dual-Image Change Detection",
    description: "Evaluates pre and post-disaster satellite image pairs simultaneously across 5 feature channels to assign 4-tier xBD severity classes.",
    color: "amber",
    stat: "85.2% Accuracy",
    badge: "xBD Taxonomy"
  },
  {
    icon: FileCheck,
    tag: "REPORTLAB PDF PIPELINE",
    title: "Automated Inspection PDF Generation",
    description: "Compiles building damage severity statistics, satellite thumbnails, and tactical action directives into instant downloadable PDF disaster reports.",
    color: "emerald",
    stat: "Instant PDF",
    badge: "ReportLab Engine"
  },
  {
    icon: ShieldAlert,
    tag: "RECOVERY DIRECTIVES",
    title: "xBD Disaster Risk Rule Engine",
    description: "Evaluates destroyed & major-damage structure ratios to assign Red, Orange, or Green zone risk levels with actionable emergency recovery directives.",
    color: "red",
    stat: "Automated Rules",
    badge: "Risk Engine"
  }
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-24 relative overflow-hidden font-mono">
      {/* Mesh Background Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 glow-orb-cyan pointer-events-none opacity-30" />
      <div className="absolute bottom-10 right-0 w-96 h-96 glow-orb-amber pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CORE ARCHITECTURE & CAPABILITIES</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Engineered for High-Precision <br />
            <span className="text-gradient-cyan">Disaster Intelligence.</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base font-sans leading-relaxed">
            DamageScope provides an end-to-end self-hosted satellite inference stack. 
            From raw PNG ingestion to vector polygon overlays and automated PDF reports.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card glass-card-hover rounded-2xl p-8 border border-slate-800 relative group overflow-hidden"
              >
                {/* Background Shimmer Gradient */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                <div className="flex items-start justify-between mb-6">
                  {/* Icon Badge */}
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shadow-lg group-hover:border-cyan-500/80 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-cyan-400 group-hover:text-amber-400 transition-colors" />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800 text-xs font-bold">
                    {feat.badge}
                  </span>
                </div>

                <div className="text-[11px] text-cyan-400 font-bold uppercase tracking-widest mb-2">
                  {feat.tag}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h3>

                <p className="text-slate-400 text-xs font-sans leading-relaxed mb-6">
                  {feat.description}
                </p>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500">SPECIFICATION:</span>
                  <span className="text-white font-bold">{feat.stat}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
