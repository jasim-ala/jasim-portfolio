import React, { useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(2); // Service 3 active by default matching reference

  const services = [
    {
      id: 1,
      num: '1',
      title: 'IT SUPPORT & HELPDESK OPERATIONS',
      desc: 'Delivering tier-1/2 hardware, software, and network support with a 95% first-call resolution rate, ticket logging, prioritization, and SLA compliance.',
    },
    {
      id: 2,
      num: '2',
      title: 'FULL-STACK WEB & SOFTWARE ENGINEERING',
      desc: 'Developing responsive web platforms, secure auth systems, and full-stack solutions using Python, Java, PHP, JavaScript, Node.js, and MySQL.',
    },
    {
      id: 3,
      num: '3',
      title: 'CYBERSECURITY & INCIDENT RESPONSE',
      desc: 'Investigating web activity logs, detecting potential security threats, mitigating compromise risks, and recommending rapid response actions.',
    },
    {
      id: 4,
      num: '4',
      title: 'AI TOOLS & AGENTIC AI WORKFLOWS',
      desc: 'Leveraging GenAI tools, prompt engineering, agentic AI workflows, and API integrations for automated customer support and predictive analytics.',
    },
  ];

  return (
    <section id="services" className="py-28 bg-black text-white relative border-t border-white/10">
      <div className="container mx-auto px-6">
        
        {/* Section Header Matching Reference Design */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 mb-4">
            THE SERVICES WE PROVIDE
          </h2>
          <p className="text-xs sm:text-sm font-mono tracking-widest text-zinc-400 uppercase leading-relaxed">
            CREATING VISUALLY APPEALING AND FUNCTIONAL IT SOLUTIONS TAILORED TO CLIENT NEEDS PROVIDING A CONSISTENT EXPERIENCE ACROSS PLATFORMS.
          </p>
        </div>

        {/* Numbered Pill Rows Matching Reference Design */}
        <div className="max-w-3xl mx-auto space-y-4">
          {services.map((service, index) => {
            const isActive = activeService === index;

            return (
              <div
                key={service.id}
                onClick={() => setActiveService(index)}
                className={`cursor-pointer group flex items-center justify-between p-4 sm:p-5 rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-black border-white shadow-xl scale-[1.02]'
                    : 'bg-white/5 border-white/10 hover:border-white/30 text-white'
                }`}
              >
                {/* Number Badge */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold border ${
                    isActive
                      ? 'bg-black text-white border-black'
                      : 'bg-white/10 text-white border-white/20'
                  }`}
                >
                  {service.num}
                </div>

                {/* Title */}
                <h3
                  className={`font-display text-sm sm:text-base font-bold uppercase tracking-widest text-center px-4 ${
                    isActive ? 'text-black' : 'text-white'
                  }`}
                >
                  {service.title}
                </h3>

                {/* Arrow Action Button */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                    isActive
                      ? 'bg-black text-white border-black'
                      : 'bg-white/10 text-white border-white/20 group-hover:bg-white group-hover:text-black'
                  }`}
                >
                  {isActive ? <ArrowRight className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Service Detail Box */}
        <div className="max-w-3xl mx-auto mt-8 p-6 rounded-3xl bg-white/5 border border-white/10 text-center">
          <p className="text-xs sm:text-sm font-mono text-zinc-300 uppercase tracking-wide leading-relaxed">
            {services[activeService].desc}
          </p>
        </div>

      </div>
    </section>
  );
}
