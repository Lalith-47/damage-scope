import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Award, Building, Users, Activity, CheckCircle2, Quote } from 'lucide-react';

const STATS = [
  { value: "12,480+", label: "Buildings Analyzed", detail: "Across xBD Benchmark Datasets", color: "text-white" },
  { value: "99.4%", label: "Localization Precision", detail: "UNet Mask Segmentation", color: "text-cyan-400" },
  { value: "85.2%", label: "Classification Accuracy", detail: "SiamUNet 4-Tier Model", color: "text-amber-400" },
  { value: "< 1.2s", label: "CPU Inference Latency", detail: "ONNX Runtime Engine", color: "text-emerald-400" }
];

const TESTIMONIALS = [
  {
    name: "Dr. Sarah Jenkins",
    role: "Director of Emergency Geospatial Intelligence",
    org: "Global Disaster Response Agency",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    quote: "DamageScope transformed our rapid disaster assessment pipeline. Getting building-by-building damage logits within seconds allowed our search-and-rescue teams to prioritize critical red zones accurately.",
    stars: 5,
    tag: "VERIFIED DISASTER RESPONSE"
  },
  {
    name: "Marcus Vance",
    role: "Chief Structural Engineer",
    org: "Municipal Hazard Assessment Corp",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    quote: "The dual-input UNet change detection handles complex pre/post satellite imagery remarkably well. The automated ReportLab PDF directive export saved us hours of manual reporting per disaster event.",
    stars: 5,
    tag: "STRUCTURAL SAFETY CERTIFIED"
  },
  {
    name: "Elena Rostova",
    role: "GIS Operations Lead",
    org: "Urban Disaster Relief Foundation",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    quote: "Self-hosted ONNX inference with zero cloud dependency is game-changing for field tactical deployments. Highly recommended for municipal emergency teams requiring fast, reliable structural risk scoring.",
    stars: 5,
    tag: "MUNICIPAL DEPLOYMENT"
  }
];

export default function SocialProofStats() {
  return (
    <section id="stats" className="py-24 relative overflow-hidden font-mono bg-slate-950/80 border-t border-slate-800">
      {/* Background Mesh Gradient Orbs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 glow-orb-amber pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Animated Stat Counters Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-2xl p-6 border border-slate-800 text-center relative group overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`text-3xl sm:text-4xl font-black mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs font-bold text-white mb-1 uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="text-[10px] text-slate-500">
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Header for Reviews */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>DISASTER FIELD TESTED & APPROVED</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Highly Endorsed by <br />
            <span className="text-gradient-amber">Emergency Leaders.</span>
          </h2>

          <div className="flex items-center justify-center gap-2 text-amber-400 pt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
            <span className="text-white text-sm font-bold ml-2">4.9 / 5.0 Rating Across 240+ Municipal Runs</span>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card glass-card-hover rounded-2xl p-8 border border-slate-800/80 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded bg-slate-950 text-cyan-400 border border-cyan-800 text-[10px] font-bold uppercase">
                    {t.tag}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <Quote className="w-8 h-8 text-slate-700 mb-3 opacity-60" />

                <p className="text-slate-300 text-xs font-sans leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-cyan-500/50"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{t.name}</h4>
                  <p className="text-[10px] text-cyan-400">{t.role}</p>
                  <p className="text-[10px] text-slate-500">{t.org}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
