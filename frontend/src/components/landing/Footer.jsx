import React from 'react';
import { Shield, Cpu, Terminal, Github, ExternalLink } from 'lucide-react';

export default function Footer({ onLaunchConsole }) {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/95 py-12 font-mono text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-amber-500 flex items-center justify-center shadow-md">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-black text-white tracking-wider">
                DAMAGESCOPE
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] font-bold">
                xBD v1.0
              </span>
            </div>
            <p className="text-slate-400 font-sans text-xs leading-relaxed max-w-md">
              Self-hosted satellite building damage assessment platform powered by ONNX Runtime, 
              UNet PyTorch neural weights, and ReportLab automated PDF disaster recovery logging.
            </p>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                SYSTEM ONLINE
              </span>
              <span>&bull;</span>
              <span>CPU INFERENCE READY</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">PLATFORM NAV</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#hero" className="hover:text-cyan-400 transition-colors">Hero Architecture</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">UNet Neural Features</a></li>
              <li><a href="#how-it-works" className="hover:text-cyan-400 transition-colors">4-Step Sequence</a></li>
              <li><a href="#preview" className="hover:text-cyan-400 transition-colors">Interactive Dashboard</a></li>
              <li><a href="#stats" className="hover:text-cyan-400 transition-colors">Telemetry & Reviews</a></li>
            </ul>
          </div>

          {/* Col 3: Actions & Tech Stack */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">TECH STACK</h4>
            <div className="space-y-2 text-[11px] text-slate-400">
              <div>Inference: <b className="text-cyan-400">ONNX Runtime CPU</b></div>
              <div>Segmentation: <b className="text-amber-400">PyTorch UNet & SiamUNet</b></div>
              <div>Backend: <b className="text-emerald-400">FastAPI & SQLite</b></div>
              <div>Frontend: <b className="text-cyan-400">React & TailwindCSS</b></div>
              <div>PDF Engine: <b className="text-slate-300">ReportLab Python</b></div>
            </div>

            <button
              onClick={onLaunchConsole}
              className="mt-4 w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-cyan-500 text-cyan-400 font-bold transition-all text-xs flex items-center justify-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>OPEN AI CONSOLE</span>
            </button>
          </div>

        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; 2026 DamageScope Building Damage Assessment System. xView2 xBD Taxonomy Compatible.
          </div>
          <div className="flex items-center gap-4">
            <span>LOCAL RUNTIME: ACTIVE</span>
            <span>PORT 80 / 8000</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
