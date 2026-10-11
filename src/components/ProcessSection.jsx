import React from 'react';
import { Search, FlaskConical, Hammer, ClipboardCheck, Rocket, ChevronRight } from 'lucide-react';

// How the projects on this site were built (stop rules, schema checks, evals, fallbacks)
const STEPS = [
  { icon: Search, title: 'Discover', desc: 'Pin down the real problem, who will use it and what data it runs on.' },
  { icon: FlaskConical, title: 'Prototype', desc: 'Build a thin working version fast, on real documents, receipts or tickets.' },
  { icon: Hammer, title: 'Build', desc: 'Add guardrails in code: schemas, validation, rate limits and stop rules.' },
  { icon: ClipboardCheck, title: 'Evaluate', desc: 'Test it like an exam with deterministic checks, then fix what fails.' },
  { icon: Rocket, title: 'Ship & Monitor', desc: 'Deploy, watch real use and keep a fallback for when the AI is down.' },
];

export default function ProcessSection() {
  return (
    <section id="process" className="glass px-6 py-10 sm:px-12 sm:py-12">
      <span className="eyebrow">My process</span>
      <h2 className="section-title mt-3">Build Process I Follow</h2>

      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        {STEPS.map(({ icon: Icon, title, desc }, index) => (
          <li key={title} className="relative">
            <div className="glass-card lift h-full p-5">
              <div className="flex items-start justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent-bright">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-xl font-light text-ink-faint">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-ink">{title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">{desc}</p>
            </div>

            {/* Connector to the next step (desktop row only) */}
            {index < STEPS.length - 1 && (
              <span aria-hidden="true" className="absolute -right-[18px] top-1/2 z-10 hidden -translate-y-1/2 text-accent-bright/60 lg:block">
                <ChevronRight className="h-4 w-4" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
