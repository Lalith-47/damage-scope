import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldAlert, Zap, Layers, Play, CheckCircle2, ArrowRight, Eye, Sparkles, Activity } from 'lucide-react';

export default function HeroSection({ onLaunchConsole, onRunSample }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeTab, setActiveTab] = useState('overlay'); // 'overlay' | 'pre' | 'post'

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 120]);
  const cardY = useTransform(scrollY, [0, 500], [0, -60]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0.2]);

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center justify-center">
      {/* Background Mesh Gradient Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 glow-orb-cyan pointer-events-none opacity-60" />
      <div className="absolute top-40 right-1/4 w-96 h-96 glow-orb-amber pointer-events-none opacity-50" />
      <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />

      {/* Parallax Blueprint Grid & Scanner Rays */}
      <motion.div 
        style={{ y: bgY, opacity: opacityFade }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/3 left-10 w-72 h-72 rounded-full border border-cyan-500/20 animate-ping opacity-20" />
        <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full border border-amber-500/20 animate-pulse opacity-20" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-950/40">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span className="font-mono text-xs font-bold text-cyan-300 tracking-wider uppercase">
                PRODUCTION ONNX NEURAL INFERENCE ENGINE
              </span>
            </div>

            {/* Main Confident Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Instant AI Satellite <br />
              <span className="text-gradient-amber">Building Damage</span> <br />
              Assessment System.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Detects, tracks, and scores structural disaster impact across satellite imagery. 
              Powered by dual-stage UNet neural segmentation models, xBD 4-tier damage classification, 
              and automated disaster PDF report generation.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onLaunchConsole}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-amber-500 text-white font-mono text-sm font-bold shadow-xl shadow-cyan-950/60 hover:shadow-cyan-500/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group cursor-pointer"
              >
                <Zap className="w-5 h-5 text-amber-300 group-hover:animate-bounce" />
                <span>LAUNCH AI CONSOLE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onRunSample}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-850 text-slate-200 border border-slate-700 hover:border-cyan-500/50 font-mono text-sm font-bold transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Play className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>RUN DEMO SATELLITE PAIR</span>
              </button>
            </div>

            {/* Metric Highlights Pills */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 font-mono">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">1024x1024</div>
                <div className="text-[11px] text-slate-400">Tensor Resolution</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-cyan-400">85.2%</div>
                <div className="text-[11px] text-slate-400">Classification Acc</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-amber-400">&lt; 1.2s</div>
                <div className="text-[11px] text-slate-400">CPU Latency</div>
              </div>
            </div>
          </motion.div>

          {/* Right Parallax Interactive Mockup Card */}
          <motion.div 
            style={{ y: cardY }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Glowing Backdrop Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition duration-1000" />

            <div className="relative glass-card rounded-2xl p-4 border border-slate-700/80 shadow-2xl overflow-hidden font-mono">
              {/* Card Window Top Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-[11px] text-slate-400 ml-2 font-bold">DAMAGESCOPE HUD v1.0</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  <Activity className="w-3 h-3 animate-spin" />
                  <span>UNET INFERENCE ACTIVE</span>
                </div>
              </div>

              {/* View Mode Switcher */}
              <div className="grid grid-cols-3 gap-1 mb-3 text-[11px] bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setActiveTab('overlay')}
                  className={`py-1 rounded text-center font-bold transition-all ${
                    activeTab === 'overlay' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  AI OVERLAY
                </button>
                <button
                  onClick={() => setActiveTab('pre')}
                  className={`py-1 rounded text-center font-bold transition-all ${
                    activeTab === 'pre' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  PRE DISASTER
                </button>
                <button
                  onClick={() => setActiveTab('post')}
                  className={`py-1 rounded text-center font-bold transition-all ${
                    activeTab === 'post' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  POST DISASTER
                </button>
              </div>

              {/* Interactive Viewport Stage */}
              <div className="relative aspect-square rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center group">
                {/* Synthetic Satellite View Mockup */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center">
                  
                  {/* Grid Lines */}
                  <div className="absolute inset-0 blueprint-grid opacity-30" />

                  {/* Satellite Simulated Grid Buildings */}
                  <svg viewBox="0 0 1024 1024" className="w-full h-full">
                    {/* Road Network */}
                    <rect x="0" y="480" width="1024" height="64" fill="#334155" opacity="0.6" />
                    <rect x="480" y="0" width="64" height="1024" fill="#334155" opacity="0.6" />

                    {/* Building 1: No Damage (Green) */}
                    <g className="cursor-pointer">
                      <rect x="160" y="220" width="160" height="140" fill={activeTab !== 'pre' ? '#22c55e' : '#64748b'} fillOpacity={activeTab === 'overlay' ? '0.45' : '0.9'} stroke="#22c55e" strokeWidth="3" />
                      <text x="240" y="290" fill="#ffffff" fontSize="24" fontWeight="bold" textAnchor="middle" dominantBaseline="central">#1 NO DAMAGE</text>
                    </g>

                    {/* Building 2: Minor Damage (Yellow) */}
                    <g className="cursor-pointer">
                      <rect x="680" y="220" width="160" height="140" fill={activeTab !== 'pre' ? '#eab308' : '#64748b'} fillOpacity={activeTab === 'overlay' ? '0.45' : '0.9'} stroke="#eab308" strokeWidth="3" />
                      <text x="760" y="290" fill="#ffffff" fontSize="24" fontWeight="bold" textAnchor="middle" dominantBaseline="central">#2 MINOR</text>
                    </g>

                    {/* Building 3: Major Damage (Orange) */}
                    <g className="cursor-pointer">
                      <rect x="160" y="660" width="160" height="140" fill={activeTab !== 'pre' ? '#f97316' : '#64748b'} fillOpacity={activeTab === 'overlay' ? '0.45' : '0.9'} stroke="#f97316" strokeWidth="3" />
                      <text x="240" y="730" fill="#ffffff" fontSize="24" fontWeight="bold" textAnchor="middle" dominantBaseline="central">#3 MAJOR</text>
                    </g>

                    {/* Building 4: Destroyed (Red) */}
                    <g className="cursor-pointer">
                      <rect x="680" y="660" width="160" height="140" fill={activeTab !== 'pre' ? '#ef4444' : '#64748b'} fillOpacity={activeTab === 'overlay' ? '0.45' : '0.9'} stroke="#ef4444" strokeWidth="3" />
                      <text x="760" y="730" fill="#ffffff" fontSize="24" fontWeight="bold" textAnchor="middle" dominantBaseline="central">#4 DESTROYED</text>
                    </g>
                  </svg>

                  {/* Scanning Radar Line */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent radar-scanner shadow-glow-cyan" />
                </div>

                {/* Floating Inspection Tooltip */}
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-950/90 backdrop-blur-md rounded-lg border border-slate-800 text-[11px] flex items-center justify-between shadow-xl">
                  <div>
                    <span className="text-slate-400 block">SELECTED STRUCTURE:</span>
                    <span className="text-emerald-400 font-bold">#1 RESIDENTIAL BLOCK - NO DAMAGE (89.9%)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                    SAFE
                  </span>
                </div>
              </div>

              {/* Bottom Telemetry Card Bar */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-500">BUILDINGS:</span>
                  <span className="text-cyan-400 font-bold">13 DETECTED</span>
                </div>
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-500">RISK LEVEL:</span>
                  <span className="text-emerald-400 font-bold">GREEN ZONE</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
