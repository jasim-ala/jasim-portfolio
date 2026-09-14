import React from 'react';
import { Calendar, Building2, CheckCircle2 } from 'lucide-react';

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
      badge: 'ACTIVE ROLE',
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
      badge: 'CYBERSECURITY',
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
      badge: 'DATA & AI',
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
      badge: 'IT SUPPORT',
    },
  ];

  return (
    <section id="experience" className="py-28 bg-black text-white relative border-t border-white/10">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2 block">
            WORK HISTORY & SIMULATIONS
          </span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
            PROFESSIONAL EXPERIENCE
          </h2>
        </div>

        {/* Timeline List */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 hover:border-white/30 transition-all duration-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <Calendar className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>{exp.period}</span>
                </div>

                <span className={`px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full border ${
                  exp.current
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-white/5 text-zinc-400 border-white/10'
                }`}>
                  {exp.badge}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-2">
                {exp.role}
              </h3>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-6 pb-4 border-b border-white/10">
                <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                <span>{exp.company}</span>
                <span>•</span>
                <span>{exp.location}</span>
              </div>

              <ul className="space-y-3">
                {exp.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
