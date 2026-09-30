import React, { useState } from 'react';
import { ArrowUpRight, Box, Eye, ExternalLink, Sparkles } from 'lucide-react';
import TiltCard from './projects/TiltCard';
import ThreeProjectCanvas from './projects/ThreeProjectCanvas';
import CaseStudyModal from './projects/CaseStudyModal';

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  // Active view mode for each project: '3d' (Three.js interactive 3D WebGL) or 'overview'
  const [viewModes, setViewModes] = useState({
    'rag-docuchat': '3d',
    'tripagent': '3d',
    'billscan': '3d',
    'evallab': '3d',
    'ai-chatbot': '3d',
    'ecommerce-platform': '3d',
    'task-management': '3d',
    'n8n-outreach-bot': '3d',
  });

  const toggleViewMode = (projectId) => {
    setViewModes((prev) => ({
      ...prev,
      [projectId]: prev[projectId] === '3d' ? 'overview' : '3d',
    }));
  };

  const projects = [
    {
      id: 'rag-docuchat',
      category: 'AI & AUTOMATION',
      type: 'RAG / LLM APP',
      title: 'DocuChat: Chat with your PDFs',
      link: 'https://docuchat-jasim.vercel.app',
      linkLabel: 'Live Demo',
      bullets: [
        'Built a retrieval-augmented generation (RAG) app: upload PDFs and ask questions, with every answer citing the exact file and page it came from.',
        'Extracts text page by page in the browser with pdf.js, so documents are never uploaded or stored on a server.',
        'Splits pages into overlapping chunks and ranks them with a BM25 search index; only the top 6 chunks are sent to the model.',
        'Gemini answers from the retrieved chunks only; the UI validates every [n] citation against the context the model was given and hides invented ones.',
        'Production guardrails: per-IP rate limiting, input size caps, and automatic fallback across models when one is overloaded.',
      ],
      architecture:
        'Next.js 16 app on Vercel. The browser parses PDFs with pdf.js, chunks pages (900 chars, 150 overlap) and runs BM25 retrieval locally. A streaming route handler sends the top chunks as numbered sources to the Gemini API and streams the answer back as NDJSON; the client renders validated inline citations with the quoted source text.',
      metric: 'PAGE-LEVEL CITATIONS',
      tags: ['RAG', 'Next.js', 'TypeScript', 'Gemini API', 'pdf.js', 'BM25', 'Vercel'],
      threeType: 'rag-docuchat',
    },
    {
      id: 'tripagent',
      category: 'AI & AUTOMATION',
      type: 'AI AGENT / FUNCTION CALLING',
      title: 'TripAgent: an AI agent that knows when to stop',
      link: 'https://tripagent-jasim.vercel.app',
      linkLabel: 'Live Demo',
      bullets: [
        'Built an autonomous UAE trip-planning agent: give it a goal and a budget, and it searches, schedules and costs a trip using 10 tools through Gemini function calling.',
        'Tools enforce real-world rules: opening hours, closed days, seasonal venues, overlapping bookings and travel time between emirates. A mistake comes back as a tool error the agent must recover from.',
        'Stop conditions are enforced in code, not left to the model: a 14-turn limit, a 95-second time limit, a loop detector, a finish validator that rejects "success" when over budget, and a hand-off to the user for real trade-offs.',
        'A live trace, itinerary board and budget monitor stream every thought and tool call. Runs are resumable, and replays of real recorded runs keep the demo working when the free AI quota runs out.',
      ],
      architecture:
        'Next.js route handler runs the agent loop on Gemini function calling and streams NDJSON events (thought, tool call, result, plan, stop) to the browser. The full model history is returned to the client so a run can resume statelessly after a question, a limit or a refinement request.',
      metric: 'CODE-ENFORCED STOPS',
      tags: ['AI Agents', 'Function Calling', 'Gemini API', 'Next.js', 'TypeScript', 'Streaming'],
      threeType: 'tripagent',
    },
    {
      id: 'billscan',
      category: 'AI & AUTOMATION',
      type: 'STRUCTURED OUTPUT',
      title: 'BillScan: Bill Photo to Clean Table',
      link: 'https://billscan-jasim.vercel.app',
      linkLabel: 'Live Demo',
      bullets: [
        'Turns a photo of a receipt, bill or invoice into a validated, editable table with CSV and JSON export.',
        'Gemini returns schema-constrained JSON (merchant, TRN/GSTIN, date, currency, line items, discount, service charge, tax, total), which is validated again with Zod on the server.',
        'Arithmetic cross-checks recompute quantity × price, subtotal, VAT (inclusive and exclusive) and the grand total, and flag a receipt whose printed total is wrong.',
        'Every cell is editable and the checks re-run instantly; photos are downsized in the browser before upload, with fallback across free AI models.',
      ],
      architecture:
        'The browser downsizes the image to a JPEG and posts it to a Next.js route that calls Gemini with a JSON schema at temperature 0. The response is Zod-validated; a shared checker module recomputes the maths on the server output and again on every edit in the UI.',
      metric: 'MATH-VERIFIED OUTPUT',
      tags: ['Structured Output', 'Gemini API', 'Zod', 'Next.js', 'TypeScript', 'Vercel'],
      threeType: 'billscan',
    },
    {
      id: 'evallab',
      category: 'AI & AUTOMATION',
      type: 'LLM EVALUATION',
      title: 'EvalLab: an exam for my AI apps',
      link: 'https://evallab-jasim.vercel.app',
      linkLabel: 'Live Scorecard',
      bullets: [
        'Built an evaluation suite and public scorecard for DocuChat, BillScan and TripAgent: 57 test cases in 4 suites, 129 of 137 checks passing (94%).',
        'Deterministic graders (ground-truth fields, fact patterns, citation pages, tool outcomes) instead of an LLM judge; live suites call the deployed apps end to end.',
        'Found real issues: keyword retrieval misses paraphrased questions, and BillScan raised a false VAT alarm when VAT is charged on the service charge, which I then fixed.',
        'Run history, per-case drill-down and quota-aware re-runs that only re-grade failed cases.',
      ],
      architecture:
        'A Node.js (TypeScript) runner executes offline suites against the production modules and live suites against the deployed APIs, writes a JSON report and history, and the Next.js scorecard renders it statically, so the site needs no API key.',
      metric: '94% · 129/137 CHECKS',
      tags: ['LLM Evals', 'Test Design', 'TypeScript', 'Node.js', 'Next.js'],
      threeType: 'evallab',
    },
    {
      id: 'n8n-outreach-bot',
      category: 'AI & AUTOMATION',
      type: 'N8N AGENTIC WORKFLOW',
      title: 'Influencer Pitch Bot on n8n',
      link: 'https://github.com/jasim-ala/influnecer-pitch-bot',
      linkLabel: 'View Workflow',
      bullets: [
        'Built a 36-node Telegram bot on n8n Cloud that manages an influencer roster and drafts paid collaboration pitches to cafes and restaurants.',
        'Classifies every incoming message into add, edit, lookup or pitch, then routes it through Switch nodes so one chat handles the whole workflow.',
        'Stores the roster and each chat\'s pending state in n8n Data Tables, so free-text replies work reliably without a blocking wait node.',
        'An AI Agent node backed by the Claude API writes the pitch from the matched influencer\'s handle, reach and package pricing.',
        'Every draft returns to Telegram for review: reply send to email it, new for a fresh version, or type a change and the agent revises it.',
      ],
      architecture:
        'A Telegram trigger checks Data Table state for a pending draft or intake before classifying the message. Code and Switch nodes route add, edit, lookup and pitch paths; the pitch path matches the influencer, calls an AI Agent node on the Claude API, and holds the draft as pending until a Telegram confirmation releases the Gmail send and marks the row sent.',
      metric: 'HUMAN-IN-THE-LOOP',
      tags: ['n8n', 'Telegram Bot API', 'Claude API', 'Gmail API', 'Data Tables', 'AI Agent'],
      threeType: 'n8n-outreach-bot',
    },
    {
      id: 'ai-chatbot',
      category: 'AI & AUTOMATION',
      type: 'AI / AGENTIC WORKFLOW',
      title: 'AI Chatbot for Website',
      bullets: [
        'Created an AI-powered chatbot to automate customer support and increase user engagement.',
        'Developed and integrated the chatbot using JavaScript, HTML, CSS, and Node.js.',
        'Utilized Dialogflow and API integrations to enable intelligent query handling and real-time responses.',
        'Improved customer engagement by 40% through 24/7 automated assistance with optimized response times.',
      ],
      architecture:
        'Client Frontend connects via WebSockets & REST APIs to a Node.js webhook orchestrator, querying Google Dialogflow intent processors to return sub-500ms responses.',
      metric: '+40% ENGAGEMENT',
      tags: ['JavaScript', 'HTML/CSS', 'Node.js', 'Dialogflow API', 'REST Webhooks'],
      threeType: 'ai-chatbot',
    },
    {
      id: 'ecommerce-platform',
      category: 'WEB APPS',
      type: 'FULL-STACK PLATFORM',
      title: 'E-Commerce Website',
      bullets: [
        'Developed a fully functional e-commerce platform supporting product browsing and online purchases.',
        'Programmed the site using HTML, CSS, JavaScript, and PHP, ensuring full-stack functionality.',
        'Implemented shopping cart and order processing features, improving transaction efficiency by 25%.',
      ],
      architecture:
        'Modular PHP MVC backend with relational MySQL order schema, transactional cart session handling, and optimized DOM client rendering.',
      metric: '+25% EFFICIENCY',
      tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Full-Stack'],
      threeType: 'ecommerce-platform',
    },
    {
      id: 'task-management',
      category: 'WEB APPS',
      type: 'RESPONSIVE WEB APP',
      title: 'Web-Based Task Management System',
      bullets: [
        'Developed a web-based platform to simplify task creation, tracking, and management.',
        'Designed and implemented a responsive front end using HTML, CSS, and JavaScript, improving user interaction efficiency by 30%.',
        'Built secure user authentication and task management features, enhancing workflow reliability.',
      ],
      architecture:
        'Event-driven JavaScript client architecture with real-time localStorage persistence, secure session state guards, and responsive layout primitives.',
      metric: '+30% EFFICIENCY',
      tags: ['HTML', 'CSS', 'JavaScript', 'Authentication', 'State Management'],
      threeType: 'task-management',
    },
  ];

  const filteredProjects =
    activeTab === 'ALL'
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="py-28 bg-black text-white relative border-t border-white/10">
      <div className="container mx-auto px-6">
        
        {/* Header Matching Reference */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-2 block">
            SELECTED WORK • AI, AUTOMATION & WEB
          </span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
            FEATURED PROJECTS
          </h2>
        </div>

        {/* Pill Category Tabs Matching Reference Design */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-16 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            {['ALL', 'AI & AUTOMATION', 'WEB APPS'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-[11px] font-mono tracking-widest uppercase font-bold rounded-full transition-all ${
                  activeTab === tab
                    ? 'bg-white text-black shadow-lg'
                    : 'text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Sparkles className="w-4 h-4 text-brand-cyan animate-pulse" />
            <span>Interactive WebGL 3D Models Active</span>
          </div>
        </div>

        {/* Project Cards Grid with Interactive 3D WebGL Canvases */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const is3D = viewModes[project.id] === '3d';

            return (
              <TiltCard
                key={project.id}
                className="bg-white/5 border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-white/30 transition-all duration-300 min-h-[580px]"
              >
                {/* Top Row: Tag, 3D Toggle, and Case Study Modal Trigger */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-brand-cyan bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    {project.type}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* External Workflow / Live Link */}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 text-[10px] font-mono uppercase font-bold rounded-full border border-brand-cyan/50 text-brand-cyan bg-brand-cyan/10 hover:bg-brand-cyan hover:text-black transition-all flex items-center gap-1.5"
                        title={project.linkLabel || 'Open link'}
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>{project.linkLabel || 'Open'}</span>
                      </a>
                    )}

                    {/* 3D vs Overview Switcher */}
                    <button
                      onClick={() => toggleViewMode(project.id)}
                      className={`px-3 py-1 text-[10px] font-mono uppercase font-bold rounded-full border transition-all flex items-center gap-1.5 ${
                        is3D
                          ? 'bg-white text-black border-white shadow-md'
                          : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white hover:bg-white/10'
                      }`}
                      title={is3D ? 'View text overview' : 'View 3D model'}
                    >
                      {is3D ? <Eye className="w-3 h-3" /> : <Box className="w-3 h-3" />}
                      <span>{is3D ? 'Overview' : '3D View'}</span>
                    </button>

                    {/* Case Study Modal Trigger */}
                    <button
                      onClick={() => setSelectedCaseStudy(project)}
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                      title="View Full Case Study"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-2">
                  {project.title}
                </h3>

                {/* Body: Either Live 3D WebGL Model OR Text Overview */}
                <div className="flex-1 my-2">
                  {is3D ? (
                    <div className="animate-fade-in bg-black/40 rounded-2xl border border-white/10 overflow-hidden">
                      <ThreeProjectCanvas type={project.threeType} />
                    </div>
                  ) : (
                    <div className="animate-fade-in space-y-4 bg-black/40 p-4 rounded-2xl border border-white/10">
                      <ul className="space-y-2">
                        {project.bullets.map((b, bIdx) => (
                          <li
                            key={bIdx}
                            className="text-xs text-zinc-300 font-mono leading-relaxed list-disc list-inside"
                          >
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                          Architecture
                        </span>
                        <p className="text-xs text-zinc-300 font-mono leading-tight">
                          {project.architecture}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Row: Tags & Outcome Metric */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.slice(0, 4).map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">
                      PROVEN IMPACT
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {project.metric}
                    </span>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Case Study Modal */}
        <CaseStudyModal
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />

      </div>
    </section>
  );
}
