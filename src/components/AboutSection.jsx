import React from 'react';
import { ArrowUpRight, Headset, Rocket, Briefcase } from 'lucide-react';

const STATS = [
  { icon: Briefcase, number: '3+ yrs', label: 'UAE IT experience' },
  { icon: Headset, number: '95%', label: 'First-call resolution' },
  { icon: Rocket, number: '5', label: 'AI apps live' },
];

export default function AboutSection() {
  return (
    <section id="about" className="glass px-6 py-10 sm:px-12 sm:py-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="eyebrow">About me</span>
          <h2 className="section-title mt-3 leading-snug">
            IT Support Roots,
            <br />
            AI on Top
          </h2>

          <div className="glass-card mt-8 grid grid-cols-3 divide-x divide-white/80 py-5">
            {STATS.map(({ icon: Icon, number, label }) => (
              <div key={label} className="px-4 sm:px-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white bg-white/80 text-ink-soft shadow-card">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="mt-3 text-xl font-semibold tracking-tight text-ink">{number}</div>
                <div className="text-[11px] text-ink-muted">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="max-w-md text-[15px] leading-relaxed text-ink-muted">
            Hands-on IT Specialist with over three years of UAE experience across IT support, system
            administration, networking and AI-powered automation. I use AI tools every day to research
            problems, write scripts and build automations end to end, and I test every output before
            go-live. I build n8n workflows, API integrations, RAG apps and chatbots that remove
            repetitive manual work.
          </p>
          <p className="mt-4 max-w-md text-[13px] leading-relaxed text-ink-muted">
            MSc Cybersecurity, Paris American University (2025 – 2026) · BSc Computer Science,
            University of West London (2021 – 2024).
          </p>
          <a href="#experience" className="btn-glass mt-7 px-5 py-2.5 text-[13px]">
            More About Me
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
