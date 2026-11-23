import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Building2, Quote } from 'lucide-react';

export default function ExperienceSection() {
  // From the CV (November 2026); the two Forage simulations follow the jobs
  const experiences = [
    {
      period: 'April 2025 – Present',
      role: 'IT Support Engineer – Facility Management Helpdesk',
      company: 'Al Mariah Facility Management, SKMC Ajman',
      location: 'Ajman, UAE',
      highlights: [
        'Deliver first- and second-line technical support by phone, email and in person, maintaining a 95% first-call resolution rate.',
        'Log, prioritise and escalate incidents and service requests through the helpdesk ticketing system in line with SLA requirements.',
        'Record and analyse incident and downtime data to identify recurring faults and support root-cause resolution.',
        'Produce performance reports tracking response times, resolution efficiency and service trends for management review.',
        'Communicate technical updates and resolutions clearly to non-technical end users and stakeholders.',
      ],
      current: true,
      badge: 'Current role',
    },
    {
      period: 'May 2024 – April 2025',
      role: 'Senior IT Specialist & Web Developer',
      company: 'La Rose Gallery Perfumes',
      location: 'Umm Al Quwain, UAE',
      groups: [
        {
          title: 'AI & Automation',
          items: [
            'Used AI tools (Claude, ChatGPT, Gemini) daily to research technical problems, write and debug scripts, and build automations end to end, reviewing and testing every AI-generated output before deployment.',
            'Designed and deployed AI-powered and low-code automations (n8n) for website and business workflows, cutting repetitive manual tasks such as data entry, notifications, form handling and routine reporting.',
            'Connected the website, email and business platforms through API and webhook integrations, and integrated LLM APIs (Gemini) into workflows for content drafting, data extraction and query handling.',
            'Monitored scheduled automations, traced failures to the root cause and delivered permanent fixes; documented each workflow with its configuration, run steps and rollback.',
            'Identified further opportunities to automate routine IT and business operations, and trained staff to use AI productivity tools for drafting, research and reporting.',
          ],
        },
        {
          title: 'IT Support, Systems & Web',
          items: [
            'Implemented and administered an IT ticketing system to log, prioritise, track and resolve employee support requests.',
            'Provided technical support to staff, diagnosing and resolving hardware, software, network and system issues.',
            'Handled system configuration, software installation, upgrades and maintenance, and managed user accounts, access permissions and IT equipment setup.',
            'Monitored and maintained IT infrastructure, analysing recurring problems and implementing lasting fixes to minimise disruption to daily operations.',
            "Managed, developed and maintained the company's websites, overseeing functionality, performance, security and reliability, and delivered front-end and back-end enhancements and third-party integrations.",
          ],
        },
      ],
      current: false,
      badge: 'AI & IT',
    },
    {
      period: 'February 2023 – April 2024',
      role: 'IT Support',
      company: 'Al Taqwa Electric Wire Trading',
      location: 'Ajman, UAE',
      highlights: [
        'Provided first- and second-line IT support, diagnosing and resolving hardware, software, operating system and network connectivity issues.',
        'Troubleshot LAN, Wi-Fi and internet connectivity problems and supported basic network infrastructure.',
        'Installed, configured and maintained desktops, laptops, printers, peripherals and business software.',
        'Managed user accounts and system access, applying basic IT security and access control practices.',
        'Performed routine system maintenance and software updates, and maintained IT equipment to support day-to-day operations.',
        'Resolved support requests promptly and documented issues, troubleshooting procedures and resolutions in a shared knowledge base.',
      ],
      current: false,
      badge: 'IT support',
    },
    {
      period: 'Forage simulation',
      role: 'Deloitte – Cybersecurity & Incident Response',
      company: 'Deloitte (Forage)',
      location: 'Virtual',
      highlights: [
        'Web activity log analysis, breach impact assessment and suspicious activity investigation.',
      ],
      current: false,
      badge: 'Cybersecurity',
    },
    {
      period: 'Forage simulation',
      role: 'Tata Group – AI-Powered Data Analytics',
      company: 'Tata Group (Forage)',
      location: 'Virtual',
      highlights: [
        'Exploratory data analysis with GenAI tools, predictive modelling and ethical AI compliance.',
      ],
      current: false,
      badge: 'Data & AI',
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

            <div className="mt-5 flex-1 space-y-4">
              {(exp.groups || [{ items: exp.highlights }]).map((group) => (
                <div key={group.title || 'highlights'}>
                  {group.title && <h4 className="mb-2 text-xs font-semibold text-accent-bright">{group.title}</h4>}
                  <ul className="space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="text-[13px] leading-relaxed text-ink-soft">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

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
