import React, { useEffect } from 'react';
import { X, Layers, Cpu, TrendingUp, ArrowUpRight } from 'lucide-react';

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
    <div
      className="animate-fade-in fixed inset-0 z-[60] flex items-center justify-center bg-ink/20 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white p-6 shadow-float sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full bg-surface-subtle p-2 text-ink-muted transition-colors duration-300 hover:bg-surface-muted hover:text-ink"
          aria-label="Close case study"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 pr-10">
          <span className="eyebrow">{project.type}</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {project.title}
          </h2>
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-accent transition-colors duration-300 hover:bg-accent-hover"
          >
            {project.linkLabel || 'Open link'}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}

        <div className="panel mb-8 flex items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-3 text-sm text-ink-soft">
            <TrendingUp className="h-4 w-4 text-accent" />
            Measured outcome
          </div>
          <span className="font-mono text-sm font-medium text-accent">{project.metric}</span>
        </div>

        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <Layers className="h-4 w-4 text-ink-muted" />
            <h3 className="text-sm font-semibold text-ink">Architecture &amp; system design</h3>
          </div>
          <p className="panel p-5 text-sm leading-relaxed text-ink-soft">{project.architecture}</p>
        </div>

        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-ink-muted" />
            <h3 className="text-sm font-semibold text-ink">Engineering highlights</h3>
          </div>
          <ul className="space-y-3">
            {project.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-surface-line pt-6">
          <span className="eyebrow">Technologies &amp; APIs</span>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
