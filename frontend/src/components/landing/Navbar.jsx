import React, { useState, useEffect } from 'react';
import { Shield, Layers, Cpu, ArrowRight, Activity, Terminal, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ onLaunchConsole, activeView, setActiveView, theme = 'dark', onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (activeView !== 'landing') {
      setActiveView('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-amber-500 p-[1px] shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400 group-hover:text-amber-400 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-wider text-white font-mono">
                  DAMAGE<span className="text-cyan-400">SCOPE</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/80 text-[10px] font-mono font-bold uppercase tracking-widest">
                  CAPSTONE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
                Satellite Disaster Intelligence Platform
              </p>
            </div>
          </div>

          {/* Nav Anchors */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-slate-300">
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-cyan-400 transition-colors py-1 relative group"
            >
              CAPABILITIES
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-cyan-400 transition-colors py-1 relative group"
            >
              WORKFLOW
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => scrollToSection('preview')}
              className="hover:text-cyan-400 transition-colors py-1 relative group"
            >
              LIVE DEMO
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => scrollToSection('stats')}
              className="hover:text-cyan-400 transition-colors py-1 relative group"
            >
              BENCHMARKS
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Inference Engine Ready</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-400 transition-all flex items-center justify-center cursor-pointer shadow-md"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-600 hover:scale-110 transition-transform" />
              )}
            </button>

            <button
              onClick={onLaunchConsole}
              className="relative group overflow-hidden rounded-xl p-[1px] font-mono text-xs font-bold"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-amber-500 rounded-xl group-hover:opacity-90 transition-opacity" />
              <span className="relative px-4 py-2 bg-slate-950 rounded-[11px] flex items-center gap-2 text-white group-hover:bg-slate-900 transition-colors">
                <Terminal className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                <span>OPEN CONSOLE</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
