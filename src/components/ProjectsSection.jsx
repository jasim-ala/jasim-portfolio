import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import ThreeProjectCanvas from './projects/ThreeProjectCanvas';
import CaseStudyModal from './projects/CaseStudyModal';

// Cards shown before "View All Projects" is pressed
const INITIAL_COUNT = 3;

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const projects = [
    {
      id: 'rag-docuchat',
      kind: 'RAG web app',
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
      image: '/images/work/docuchat.jpg',
    },
    {
      id: 'tripagent',
      kind: 'AI agent',
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
      image: '/images/work/tripagent.jpg',
    },
    {
      id: 'billscan',
      kind: 'Structured output app',
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
      image: '/images/work/billscan.jpg',
    },
    {
      id: 'evallab',
      kind: 'LLM evaluation dashboard',
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
      image: '/images/work/evallab.jpg',
    },
    {
      id: 'n8n-outreach-bot',
      kind: 'n8n workflow',
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
      kind: 'AI chatbot',
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
      kind: 'Full-stack web app',
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
      kind: 'Web app',
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

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <section id="work" className="glass px-6 py-10 sm:px-12 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Featured projects</span>
          <h2 className="section-title mt-3">Selected Work</h2>
        </div>
        <button
          onClick={() => setShowAll((v) => !v)}
          className="btn-glass px-5 py-2.5 text-[13px]"
          aria-expanded={showAll}
        >
          {showAll ? 'Show Fewer Projects' : `View All Projects (${projects.length})`}
          <ArrowUpRight className={`h-4 w-4 transition-transform duration-300 ${showAll ? 'rotate-90' : ''}`} />
        </button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <article key={project.id} className="glass-card lift group flex flex-col p-2">
            {/* Media: live screenshot, or the 3D model for projects without a public demo */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-gradient-to-br from-[#f6f3ff] via-[#eceaff] to-[#e1e8ff]">
              {project.image ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title}`}
                  className="absolute -bottom-6 -right-8 left-7 top-8 overflow-hidden rounded-[10px] border border-white/90 bg-ink shadow-float transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5"
                >
                  <span className="flex h-4 items-center gap-1 bg-white/90 px-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff6159]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ffbd2e]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#28c941]" />
                  </span>
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    className="h-full w-full object-cover object-left-top"
                  />
                </a>
              ) : (
                <ThreeProjectCanvas type={project.threeType} />
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white bg-white/85 px-2.5 py-1 text-[11px] font-medium text-ink shadow-card backdrop-blur transition-colors duration-300 hover:bg-accent hover:text-white"
                >
                  <ExternalLink className="h-3 w-3" />
                  {project.linkLabel || 'Open'}
                </a>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 px-3 pb-2 pt-4">
              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold leading-snug text-ink">{project.title}</h3>
                <p className="mt-0.5 text-xs text-ink-muted">{project.kind}</p>
              </div>
              <button
                onClick={() => setSelectedCaseStudy(project)}
                className="icon-btn"
                aria-label={`Case study: ${project.title}`}
                title="Case study"
              >
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>

      <CaseStudyModal project={selectedCaseStudy} onClose={() => setSelectedCaseStudy(null)} />
    </section>
  );
}
