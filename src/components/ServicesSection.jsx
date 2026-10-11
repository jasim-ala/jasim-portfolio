import React from 'react';
import { ArrowUpRight, Workflow, Headset, Code2, ShieldCheck, BrainCircuit } from 'lucide-react';
import GlassObject from './GlassObject';

// Pastel icon tiles, one tint per service (as in the design)
const SERVICES = [
  {
    icon: Workflow,
    tint: 'bg-[#fff1e2] text-[#f08a24]',
    title: 'AI Automation & n8n Workflows',
    desc: 'Designing, building and maintaining agentic workflows in n8n: chatbots, AI agent nodes calling the Claude API, human-in-the-loop approvals, webhook triggers, error handling and Gmail, Telegram and CRM integrations.',
  },
  {
    icon: Headset,
    tint: 'bg-[#f0e8ff] text-[#8b5cf6]',
    title: 'IT Support & Helpdesk Operations',
    desc: 'Delivering tier-1/2 hardware, software and network support with a 95% first-call resolution rate, ticket logging, prioritization and SLA compliance.',
  },
  {
    icon: Code2,
    tint: 'bg-[#e6edff] text-[#4f7cff]',
    title: 'Full-Stack Web & Software Engineering',
    desc: 'Developing responsive web platforms, secure auth systems and full-stack solutions using Python, Java, PHP, JavaScript, Node.js and MySQL.',
  },
  {
    icon: ShieldCheck,
    tint: 'bg-[#dff5f2] text-[#13a89a]',
    title: 'Cybersecurity & Incident Response',
    desc: 'Investigating web activity logs, detecting potential security threats, mitigating compromise risks and recommending rapid response actions.',
  },
  {
    icon: BrainCircuit,
    tint: 'bg-[#fde7f1] text-[#e0468e]',
    title: 'AI Tools & Agentic AI Workflows',
    desc: 'Leveraging GenAI tools, prompt engineering, agentic AI workflows and API integrations for automated customer support and predictive analytics.',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="glass relative px-6 py-10 sm:px-12 sm:py-12">
      {/* Glass bubble resting on the panel's right edge */}
      <GlassObject shape="bubble" className="absolute -right-14 -top-10 hidden h-44 w-44 lg:block" />

      <span className="eyebrow">What I do</span>
      <h2 className="section-title mt-3">Services I Offer</h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {SERVICES.map(({ icon: Icon, tint, title, desc }) => (
          <article key={title} className="glass-card lift flex flex-col p-5">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tint}`}>
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-[15px] font-semibold leading-snug text-ink">{title}</h3>
            <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-muted">{desc}</p>
            <a href="#contact" className="icon-btn mt-5 self-end" aria-label={`Talk to me about ${title}`}>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
