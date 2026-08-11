import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, Eye, FileText, CheckCircle2 } from 'lucide-react';

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
    <section id="how-it-works" className="py-24 relative overflow-hidden font-mono bg-surface-container-lowest/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 font-sans">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-primary text-xs font-mono font-medium uppercase tracking-widest">
            <span>Pipeline Sequence</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-5xl font-bold text-on-surface tracking-tight">
            How DamageScope Processes <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Disaster Telemetry.</span>
          </h2>

          <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
            Four seamless operational stages powered by custom neural weights and automated recovery rules.
          </p>
        </div>

        {/* 4-Step Interactive Sequence Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Step Selectors List */}
          <div className="lg:col-span-5 space-y-4">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isActive
                      ? 'glass-panel border-primary/80 glow-cyan bg-surface-container-high'
                      : 'bg-surface-container/40 border-outline-variant/20 hover:border-outline-variant/50 text-on-surface-variant'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors ${
                    isActive ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30'
                  }`}>
                    {step.num}
                  </div>

                  <div>
                    <h3 className={`font-headline text-base font-bold transition-colors ${isActive ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant/70 mt-1">{step.subtitle}</p>
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
              className="glass-panel rounded-xl p-8 border border-white/10 relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-surface-container border border-primary/40 flex items-center justify-center">
                    {React.createElement(STEPS[activeStep].icon, { className: "w-6 h-6 text-primary" })}
                  </div>
                  <div>
                    <span className="text-[10px] text-primary font-mono font-medium tracking-widest block">STAGE {STEPS[activeStep].num} OF 04</span>
                    <h3 className="font-headline text-xl font-bold text-on-surface">{STEPS[activeStep].title}</h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded bg-primary-container/20 text-primary border border-primary/30 text-xs font-mono font-medium">
                  ACTIVE
                </span>
              </div>

              <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
                {STEPS[activeStep].description}
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <span className="text-[11px] text-on-surface-variant/70 uppercase font-mono font-medium tracking-wider block">KEY TECHNICAL DELIVERABLES:</span>
                {STEPS[activeStep].details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-xs font-body text-on-surface">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
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
