import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Building2, Quote } from 'lucide-react';

export default function ExperienceSection() {
  const experiences = [
    {
      period: 'April 2025 – Present',
      role: 'Facility Management Helpdesk',
      company: 'Al Mariah Facility Management, SKMC Ajman',
      location: 'Ajman, UAE',
      highlights: [
        'Provided technical support and customer assistance by resolving user issues via phone, email, and in-person, maintaining a 95% first-call resolution rate.',
        'Managed help desk operations, including ticket logging, prioritization, and escalation, ensuring timely issue resolution within SLA standards.',
        'Recorded and maintained daily reports on technical incidents, downtime, and resolutions to support data-driven performance tracking.',
        'Generated and analyzed help desk performance reports, identifying trends to optimize support efficiency and response times.',
      ],
      current: true,
      badge: 'Current role',
    },
    {
      period: 'October 2025',
      role: 'Deloitte – Cyber Job Simulation',
      company: 'Deloitte (Forage)',
      location: 'Virtual Simulation',
      highlights: [
        'Completed a virtual job simulation focused on cybersecurity analysis and incident response for a Deloitte client scenario.',
        'Analysed web activity logs to identify patterns and detect potential security threats.',
        'Supported a simulated client during a cybersecurity breach, assessing impact and recommending response actions.',
        'Investigated suspicious user activity to determine possible data compromise or unauthorized access.',
      ],
      current: false,
      badge: 'Cybersecurity',
    },
    {
      period: 'October 2025',
      role: 'Tata Group – Data Analytics Job Simulation',
      company: 'Tata Group / Tata iQ (Forage)',
      location: 'Virtual Simulation',
      highlights: [
        'Completed a virtual job simulation focused on AI-powered data analytics and strategic problem-solving for the Financial Services team at Tata iQ.',
        'Conducted exploratory data analysis (EDA) using GenAI tools to assess data quality, identify risk indicators, and prepare insights for predictive modelling.',
        'Developed and proposed a no-code predictive modelling framework to evaluate customer delinquency risk, enhancing decision-making accuracy and efficiency.',
        'Designed an AI-driven collections strategy leveraging agentic AI and automation, ensuring compliance with ethical AI standards and regulatory frameworks.',
      ],
      current: false,
      badge: 'Data & AI',
    },
    {
      period: 'March 2024',
      role: 'IT Support Intern',
      company: 'IT Infrastructure Team',
      location: 'UAE',
      highlights: [
        'Assisted IT team in maintaining and troubleshooting internal systems and network infrastructure.',
        'Provided technical support and troubleshooting for hardware, software, and internal systems, ensuring minimal downtime.',
        'Assisted in network setup and configuration, improving connectivity and system performance.',
        'Documented technical issues and resolutions to support knowledge sharing and faster future problem-solving.',
        'Collaborated with team members to deliver efficient IT support services and enhance overall operational reliability.',
      ],
      current: false,
      badge: 'IT support',
    },
  ];

  const trackRef = useRef(null);
  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('article');
    const step = card ? card.offsetWidth + 20 : track.clientWidth;
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section id="experience" className="glass px-6 py-10 sm:px-12 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Experience</span>
          <h2 className="section-title mt-3">Where I&apos;ve Worked</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={() => scrollByCard(-1)} className="icon-btn h-9 w-9" aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => scrollByCard(1)} className="icon-btn h-9 w-9" aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar -mx-2 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 pb-4 pt-1"
      >
        {experiences.map((exp) => (
          <article
            key={`${exp.role}-${exp.period}`}
            className="glass-card flex w-[88%] shrink-0 snap-start flex-col p-6 sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  exp.current ? 'bg-accent-soft text-accent' : 'border border-white bg-white/80 text-ink-muted'
                }`}
              >
                {exp.current && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                {exp.badge}
              </span>
              <Quote className="h-5 w-5 shrink-0 fill-accent-ring text-accent-ring" />
            </div>

            <ul className="mt-5 flex-1 space-y-2.5">
              {exp.highlights.map((item) => (
                <li key={item} className="text-[13px] leading-relaxed text-ink-soft">
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-3 border-t border-white/80 pt-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white bg-white text-ink-soft shadow-card">
                <Building2 className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-snug text-ink">{exp.role}</div>
                <div className="text-xs text-ink-muted">
                  {exp.company} · {exp.location} · {exp.period}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
