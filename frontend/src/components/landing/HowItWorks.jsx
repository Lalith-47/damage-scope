import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, Eye, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    num: "01",
    icon: Upload,
    title: "Satellite Imagery Ingestion",
    subtitle: "Pre & Post Disaster Satellite Image Pair",
    description: "Upload high-resolution 1024x1024 Pre and Post-disaster satellite PNG pairs. The platform normalizes tensor arrays using ImageNet standard means and standard deviations.",
    details: ["1024x1024 RGB PNG Format", "ImageNet Mean Normalization", "Automatic Job Token Generation"]
  },
  {
    num: "02",
    icon: Cpu,
    title: "ONNX Neural Inference",
    subtitle: "Dual-Stage UNet Model Pipeline",
    description: "Executes UNet localization to isolate building polygons, followed by 5-channel SiamUNet classification to predict pixel-level damage probabilities.",
    details: ["Local CPU Execution Provider", "Sigmoid Logit Mask Thresholding", "Softmax Damage Severity Logits"]
  },
  {
    num: "03",
    icon: Eye,
    title: "Interactive Vector Polygon Inspection",
    subtitle: "Real-Time Polygon Viewport",
    description: "Inspect building damage predictions interactively in the vector overlay viewport. Toggle between Overlay, Split Dual View, and filter by xBD damage severity categories.",
    details: ["4 Damage Color Codes", "Structure Inspector Logits", "Centroid Building ID Labels"]
  },
  {
    num: "04",
    icon: FileText,
    title: "Tactical PDF Report Export",
    subtitle: "Automated ReportLab Engine",
    description: "Generates official PDF disaster assessment reports complete with building damage severity breakdowns, satellite thumbnails, and emergency action directives.",
    details: ["ReportLab PDF Compilation", "SQLite Job Persistence", "Direct One-Click Download"]
  }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden font-mono bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <span>PIPELINE SEQUENCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            How DamageScope Processes <br />
            <span className="text-gradient-amber">Disaster Telemetry.</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-sans leading-relaxed">
            Four seamless operational stages powered by custom ONNX neural weights and automated recovery rules.
          </p>
        </div>

        {/* 4-Step Interactive Sequence Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Step Selectors List */}
          <div className="lg:col-span-5 space-y-4">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isActive
                      ? 'glass-card border-cyan-500/80 shadow-glow-cyan bg-slate-900/90'
                      : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors ${
                    isActive ? 'bg-cyan-500 text-black' : 'bg-slate-950 text-slate-500 border border-slate-800'
                  }`}>
                    {step.num}
                  </div>

                  <div>
                    <h3 className={`text-base font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{step.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Active Step Detailed Viewport Card */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-2xl p-8 border border-slate-700/80 relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-700 flex items-center justify-center">
                    {React.createElement(STEPS[activeStep].icon, { className: "w-6 h-6 text-cyan-400" })}
                  </div>
                  <div>
                    <span className="text-[10px] text-cyan-400 font-bold tracking-widest block">STAGE {STEPS[activeStep].num} OF 04</span>
                    <h3 className="text-xl font-bold text-white">{STEPS[activeStep].title}</h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-bold">
                  ACTIVE
                </span>
              </div>

              <p className="text-slate-300 text-sm font-sans leading-relaxed mb-6">
                {STEPS[activeStep].description}
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">KEY TECHNICAL DELIVERABLES:</span>
                {STEPS[activeStep].details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
