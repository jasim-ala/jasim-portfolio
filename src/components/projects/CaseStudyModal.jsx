import React, { useEffect } from 'react';
import { X, CheckCircle2, Layers, Cpu, TrendingUp, ShieldCheck, ExternalLink } from 'lucide-react';

export default function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in font-sans">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-dark-900/95 border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all"
          aria-label="Close Case Study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-8">
          <span className="text-[10px] font-mono tracking-widest uppercase text-brand-cyan bg-white/5 px-3 py-1 rounded-full border border-white/10 mb-3 inline-block">
            {project.type}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            {project.title}
          </h2>
        </div>

        {/* Live / Workflow Link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-cyan text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-white transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            {project.linkLabel || 'Open Link'}
          </a>
        )}

        {/* Impact Highlight */}
        <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-mono uppercase text-zinc-300">Measured Outcome</span>
          </div>
          <span className="text-sm font-mono font-bold text-emerald-400">
            {project.metric}
          </span>
        </div>

        {/* Technical Architecture Overview */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-brand-cyan" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Architecture & System Design
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/10">
            {project.architecture}
          </p>
        </div>

        {/* Key Engineering Highlights */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-4 h-4 text-brand-violet" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Engineering Highlights
            </h3>
          </div>
          <ul className="space-y-2.5">
            {project.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Pills */}
        <div className="pt-6 border-t border-white/10">
          <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-3">
            Technologies & APIs Used
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 border border-white/20 text-zinc-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
