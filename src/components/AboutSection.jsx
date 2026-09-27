import React from 'react';
import { ArrowUpRight, GraduationCap, CheckCircle2, Terminal, Cpu, Shield, Wrench } from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { number: '95%+', label: 'FIRST-CALL RESOLUTION SLA' },
    { number: '24/7', label: 'AUTOMATED AI SUPPORT DEPLOYED' },
    { number: 'MSc', label: 'CYBERSECURITY (COMPLETED)' },
  ];

  const skillCategories = [
    {
      title: 'Programming & Web',
      icon: <Terminal className="w-4 h-4 text-brand-cyan" />,
      skills: ['Python', 'Java', 'PHP', 'JavaScript', 'Node.js', 'HTML5', 'CSS3', 'SQL', 'MySQL'],
    },
    {
      title: 'AI Tools & Automation',
      icon: <Cpu className="w-4 h-4 text-brand-violet" />,
      skills: ['n8n', 'Claude API', 'Claude Code', 'ChatGPT', 'Cursor', 'Gemini', 'ElevenLabs', 'Apache Airflow', 'Dialogflow', 'AI Agent Nodes', 'Prompt Engineering', 'Agentic AI Workflows', 'Telegram Bot API', 'Gmail API', 'Webhooks & API Integrations'],
    },
    {
      title: 'Operating Systems & Tools',
      icon: <Wrench className="w-4 h-4 text-emerald-400" />,
      skills: ['Windows', 'Linux', 'Git', 'Network Config', 'Hardware Troubleshooting'],
    },
    {
      title: 'Professional Competencies',
      icon: <Shield className="w-4 h-4 text-amber-400" />,
      skills: ['IT Support', 'Troubleshooting', 'Incident Management', 'SLA Tracking', 'Teamwork', 'Problem-Solving'],
    },
  ];

  return (
    <section id="about" className="py-28 bg-black text-white relative border-t border-white/10">
      <div className="container mx-auto px-6">
        
        {/* Section Header Matching Reference: ABOUT ( ↗ ) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="flex items-center gap-4">
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase">
              ABOUT
            </h2>
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-white" />
            </div>
          </div>

          <p className="text-xs sm:text-sm font-mono text-zinc-300 uppercase tracking-widest max-w-xl leading-relaxed">
            AI SPECIALIST AND AUTOMATION ENGINEER WITH A BSC IN COMPUTER SCIENCE AND AN MSC IN CYBERSECURITY. I BUILD AGENTIC WORKFLOWS AND CHATBOTS IN N8N WITH THE CLAUDE API, BACKED BY JAVA, PYTHON AND MODERN AI-ASSISTED DEVELOPMENT.
          </p>
        </div>

        {/* 3-Column Boxed Stat Grid Matching Reference Design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-10 flex flex-col items-center justify-center text-center hover:border-white/30 transition-all duration-300 group"
            >
              <h3 className="font-display text-5xl sm:text-6xl font-black text-white mb-2 tracking-tight group-hover:scale-105 transition-transform">
                {stat.number}
              </h3>
              <p className="text-[11px] font-mono tracking-widest uppercase text-zinc-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Skills Categorized Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white">
              TECHNICAL SKILLS & COMPETENCIES
            </h3>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              CORE CAPABILITIES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-white/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-xl bg-white/10 border border-white/15">
                    {cat.icon}
                  </div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    {cat.title}
                  </h4>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-white/5 text-zinc-300 border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Background Banner */}
        <div className="bg-gradient-to-r from-white/5 via-white/10 to-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="p-4 rounded-2xl bg-white text-black shrink-0">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest">UNIVERSITY OF WEST LONDON</span>
              <h4 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                MSc in Cybersecurity (Completed) & BSc Computer Science (2021 – 2024)
              </h4>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                Postgraduate degree completed • Specialized in incident response, cryptography, and network defense
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="px-6 py-3 text-xs font-mono tracking-widest uppercase font-bold rounded-full bg-white text-black hover:bg-zinc-200 transition-all shrink-0"
          >
            GET IN TOUCH
          </a>
        </div>

      </div>
    </section>
  );
}
