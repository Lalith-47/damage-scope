import React from 'react';

export default function Footer({ onLaunchConsole }) {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/20 mt-24 py-16 font-mono text-xs text-on-surface-variant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-3">
            <span className="font-headline text-2xl font-bold text-primary">DamageScope</span>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              © 2026 DamageScope AI. Structural Intelligence for a Resilient World.
            </p>
          </div>

          {/* Col 2: Product */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs font-semibold text-on-surface uppercase tracking-wider">Product</span>
            <a href="#features" className="font-body text-xs text-on-surface-variant hover:text-primary transition-colors">Features</a>
            <button onClick={onLaunchConsole} className="font-body text-xs text-on-surface-variant hover:text-primary transition-colors text-left">Console</button>
            <a href="#preview" className="font-body text-xs text-on-surface-variant hover:text-primary transition-colors">Dashboard Preview</a>
          </div>

          {/* Col 3: Resources */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs font-semibold text-on-surface uppercase tracking-wider">Resources</span>
            <a href="#how-it-works" className="font-body text-xs text-on-surface-variant hover:text-primary transition-colors">Documentation</a>
            <a href="#stats" className="font-body text-xs text-on-surface-variant hover:text-primary transition-colors">Telemetry Benchmarks</a>
            <a href="#features" className="font-body text-xs text-on-surface-variant hover:text-primary transition-colors">API Reference</a>
          </div>

          {/* Col 4: Legal */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs font-semibold text-on-surface uppercase tracking-wider">Legal</span>
            <a href="#" className="font-body text-xs text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="font-body text-xs text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="font-body text-xs text-on-surface-variant hover:text-primary transition-colors">Status</a>
          </div>

        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-on-surface-variant/60">
          <div>
            DamageScope Structural Assessment Engine • High-Fidelity HUD Design
          </div>
          <div className="flex items-center gap-4">
            <span className="text-secondary font-mono">● SYSTEM ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
