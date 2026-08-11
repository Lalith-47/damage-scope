import React from 'react';
import { motion } from 'framer-motion';
import { Award, Quote, CheckCircle2 } from 'lucide-react';

const STATS = [
  { value: "1024²", label: "Input Resolution", detail: "High-resolution pre/post PNG pairs", color: "text-primary" },
  { value: "4-Tier", label: "xBD Taxonomy", detail: "Standardized damage severity scale", color: "text-on-surface" },
  { value: "UNet", label: "Neural Architecture", detail: "Dual-stage localization & classification", color: "text-primary" },
  { value: "ONNX", label: "Inference Engine", detail: "Self-hosted local runtime ready", color: "text-secondary" }
];

const TESTIMONIALS = [
  {
    name: "Emergency Geospatial Workflow",
    role: "Rapid Field Assessment (Demo)",
    org: "Disaster Response Simulation",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    quote: "Simulated workflow for rapid post-disaster evaluation: Ingesting temporal satellite image pairs to instantly pinpoint damaged structural clusters and route emergency response teams.",
    tag: "DEMO SCENARIO: GEOSPATIAL"
  },
  {
    name: "Structural Inspection Workflow",
    role: "Civil Safety Audit (Demo)",
    org: "Hazard Assessment Simulation",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    quote: "Simulated workflow for civil engineers: Automatically extracting building contours and overlaying xBD 4-tier damage probability masks for rapid structural health logging.",
    tag: "DEMO SCENARIO: CIVIL SAFETY"
  },
  {
    name: "Municipal Deployment Workflow",
    role: "Field Recovery Planning (Demo)",
    org: "Urban Disaster Relief Simulation",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    quote: "Simulated workflow for local agencies: Compiling automated PDF inspection directives and exporting GeoJSON damage layers directly into enterprise GIS mapping suites.",
    tag: "DEMO SCENARIO: MUNICIPAL"
  }
];

export default function SocialProofStats() {
  return (
    <section id="stats" className="py-24 relative overflow-hidden font-mono bg-surface-container-lowest border-t border-outline-variant/20">
      {/* Background Mesh Gradient Orbs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 glow-orb-cyan pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Technical Specifications Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel rounded-xl p-6 border border-white/10 text-center relative group overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`font-headline text-3xl sm:text-4xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs font-mono font-semibold text-on-surface mb-1 uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="text-[10px] text-on-surface-variant/70">
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Header for Target Workflows */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 font-sans">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-secondary text-xs font-mono font-medium uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>Target Deployment Scenarios (Demo)</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-5xl font-bold text-on-surface tracking-tight">
            Architected for Field Operations <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">& Disaster Response Workflows.</span>
          </h2>

          <div className="flex items-center justify-center gap-2 text-primary pt-2 font-mono text-xs">
            <CheckCircle2 className="w-4 h-4 text-secondary" />
            <span className="text-on-surface-variant font-medium">Demonstration Scenarios & Simulated Pipeline Use Cases</span>
          </div>
        </div>

        {/* Workflow Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel rounded-xl p-6 border border-white/10 flex flex-col justify-between relative group hover:border-primary/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4 font-mono">
                  <span className="px-2.5 py-0.5 rounded bg-primary-container/20 text-primary border border-primary/30 text-[10px] font-medium uppercase">
                    {t.tag}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-outline-variant/40 mb-3 opacity-60" />

                <p className="font-body text-on-surface-variant text-xs leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10 font-mono">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-primary/50"
                />
                <div>
                  <h4 className="font-headline text-xs font-bold text-on-surface">{t.name}</h4>
                  <p className="text-[10px] text-primary">{t.role}</p>
                  <p className="text-[10px] text-on-surface-variant/70">{t.org}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
