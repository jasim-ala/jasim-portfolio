import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass mt-4 flex flex-col items-center justify-between gap-3 rounded-[22px] px-5 py-4 text-xs text-ink-muted sm:flex-row">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white bg-white text-[11px] font-bold text-ink shadow-card">
          MJ
        </span>
        <span>© 2026 Mohamed Jasim · Ajman, UAE</span>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="inline-flex items-center gap-1.5 rounded-full border border-white bg-white/70 px-3.5 py-1.5 font-medium text-ink-soft shadow-card transition-colors duration-300 hover:bg-white hover:text-ink"
      >
        Back to top
        <ArrowUp className="h-3.5 w-3.5" />
      </button>
    </footer>
  );
}
