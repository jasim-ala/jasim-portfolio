import React from 'react';
import { ArrowUpRight, Headset, Rocket, GraduationCap } from 'lucide-react';

const STATS = [
  { icon: Headset, number: '95%', label: 'First-call resolution' },
  { icon: Rocket, number: '5', label: 'AI apps live' },
  { icon: GraduationCap, number: 'MSc', label: 'Cybersecurity' },
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
            AI and automation engineer with a BSc in Computer Science and an MSc in Cybersecurity. I
            build agentic workflows, RAG apps and chatbots with the Gemini and Claude APIs and n8n,
            backed by hands-on enterprise IT support.
          </p>
          <p className="mt-4 max-w-md text-[13px] leading-relaxed text-ink-muted">
            University of West London · MSc Cybersecurity &amp; BSc Computer Science (2021 – 2024),
            with a focus on incident response, cryptography and network defense.
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
