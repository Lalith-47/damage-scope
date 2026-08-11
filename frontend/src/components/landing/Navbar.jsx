import React, { useState, useEffect } from 'react';
import { Shield, ArrowRight, Terminal, Sun, Moon } from 'lucide-react';
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
          ? 'bg-surface/85 backdrop-blur-md border-b border-outline-variant/30 shadow-lg py-3'
          : 'bg-surface/60 backdrop-blur-md border-b border-outline-variant/20 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-9 h-9 rounded-lg bg-primary-container/20 border border-primary/40 flex items-center justify-center glow-cyan transition-transform group-hover:scale-105">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tighter text-primary font-headline">
                  DamageScope
                </span>
                <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary border border-primary/30 text-[10px] font-mono font-medium uppercase tracking-widest">
                  HUD
                </span>
              </div>
            </div>
          </div>

          {/* Nav Anchors */}
          <nav className="hidden md:flex items-center gap-8 font-body text-sm text-on-surface-variant">
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-primary transition-colors py-1 relative group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-primary transition-colors py-1 relative group"
            >
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => scrollToSection('preview')}
              className="hover:text-primary transition-colors py-1 relative group"
            >
              Dashboard Preview
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => scrollToSection('stats')}
              className="hover:text-primary transition-colors py-1 relative group"
            >
              Analytics
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-on-surface-variant bg-surface-container/60 px-3 py-1.5 rounded border border-outline-variant/30">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>Tensor Processing Active</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface-variant hover:text-primary transition-all flex items-center justify-center cursor-pointer shadow-sm"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-primary hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-600 hover:scale-110 transition-transform" />
              )}
            </button>

            <button
              onClick={onLaunchConsole}
              className="bg-cyan-600 hover:bg-cyan-700 text-white dark:bg-primary-container dark:text-on-primary-container font-mono text-xs font-semibold px-4 py-2 rounded glow-cyan-hover transition-all active:scale-95 duration-100 flex items-center gap-2 shadow-sm"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Assessment Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
