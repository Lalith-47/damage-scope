import React from 'react';
import { Shield, Building2, Radio, Globe, Navigation, Award, Cpu } from 'lucide-react';

const AGENCIES = [
  { name: "FEMA EMERGENCY OPS", icon: Shield },
  { name: "UN OCHA DISASTER WATCH", icon: Globe },
  { name: "GLOBAL RELIEF NET", icon: Radio },
  { name: "MUNICIPAL RISK DEPT", icon: Building2 },
  { name: "RED CROSS TASKFORCE", icon: Award },
  { name: "SATELLITE GEO OPS", icon: Navigation },
  { name: "ONNX RUNTIME LABS", icon: Cpu }
];

export default function LogoMarquee() {
  return (
    <section className="py-10 border-y border-slate-800/80 bg-slate-950/80 backdrop-blur-md relative overflow-hidden font-mono">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
          TRUSTED BY GLOBAL DISASTER RESPONSE TEAMS & MUNICIPAL EMERGENCY AGENCIES
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex items-center group">
        {/* Gradient Fades on Edges */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex gap-12 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
          {[...AGENCIES, ...AGENCIES, ...AGENCIES].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-800 transition-all cursor-pointer"
              >
                <Icon className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-bold tracking-wider">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
