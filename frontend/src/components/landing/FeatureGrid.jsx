import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, FileCheck, ShieldAlert, Sparkles, MapPin, Wrench } from 'lucide-react';

const FEATURES = [
  {
    icon: Layers,
    tag: "SUB-PIXEL REGISTRATION",
    title: "Pre/Post Image Alignment",
    description: "Sub-pixel computer vision registration aligns temporal satellite and drone image pairs automatically before neural processing.",
    stat: "Sub-Pixel Acc",
    badge: "OpenCV Alignment"
  },
  {
    icon: Cpu,
    tag: "UNET SEGMENTATION",
    title: "Precision AI Damage Masking",
    stat: "Pixel Masking",
    badge: "Tensor AI Engine"
  },
  {
    icon: ShieldAlert,
    tag: "xBD TAXONOMY",
    title: "Automated Severity Classification",
    description: "Categorizes affected structural areas into 4-tier standardized xBD levels: No Damage, Minor, Major, and Completely Destroyed.",
    stat: "4-Tier Taxonomy",
    badge: "Risk Classifier"
  },
  {
    icon: Wrench,
    tag: "ENGINEERING ADVISORY",
    title: "Structural Repair Recommendations",
    description: "Generates priority repair directives, emergency shoring guidance, and cost/severity estimates for civil engineers and recovery teams.",
    stat: "Automated Directives",
    badge: "Civil Advisory"
  },
  {
    icon: FileCheck,
    tag: "REPORTLAB ENGINE",
    title: "Audit-Ready PDF Reports",
    description: "Compiles structural damage statistics, bounding box overlays, and historical logs into instant downloadable PDF disaster reports.",
    stat: "Instant Export",
    badge: "Audit Ready"
  },
  {
    icon: MapPin,
    tag: "GIS & CAD PIPELINE",
    title: "GeoJSON & CAD Vector Export",
    description: "Exports geo-referenced damage polygons to GeoJSON, DXF, and enterprise GIS mapping suites for municipal disaster management.",
    stat: "GIS Standard",
    badge: "Vector Pipeline"
  }
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-24 relative overflow-hidden font-mono">
      {/* Mesh Background Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 glow-orb-cyan pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 font-sans">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-primary text-xs font-mono font-medium uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Capabilities</span>
          </div>
          
          <h2 className="font-headline text-3xl sm:text-5xl font-bold text-on-surface tracking-tight">
            Engineered for High-Precision <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Structural Intelligence.</span>
          </h2>
          
          <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
            DamageScope provides an end-to-end self-hosted structural assessment pipeline, 
            from raw imagery ingestion to pixel-level damage masks and audit-ready reports.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel rounded-xl p-6 border border-white/10 relative group hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-5">
                    {/* Icon Container */}
                    <div className="w-12 h-12 rounded-lg bg-surface-container border border-outline-variant/40 flex items-center justify-center group-hover:border-primary group-hover:scale-105 transition-all">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    <span className="px-2.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant border border-outline-variant/30 text-[10px] font-mono font-medium">
                      {feat.badge}
                    </span>
                  </div>

                  <div className="text-[10px] text-primary font-mono font-medium uppercase tracking-widest mb-1.5">
                    {feat.tag}
                  </div>

                  <h3 className="font-headline text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                    {feat.title}
                  </h3>

                  <p className="font-body text-on-surface-variant text-xs leading-relaxed mb-6">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-on-surface-variant/70 text-[11px]">SPEC:</span>
                  <span className="text-on-surface font-semibold">{feat.stat}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
