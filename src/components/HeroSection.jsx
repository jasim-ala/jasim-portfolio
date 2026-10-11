import React from 'react';
import { ArrowUpRight, Download, Sparkles } from 'lucide-react';
import { siGooglegemini, siClaude, siN8n, siNextdotjs, siVercel } from 'simple-icons';
import BrandIcon from './BrandIcon';

const BUILDS_WITH = [
  { icon: siGooglegemini, name: 'Gemini' },
  { icon: siClaude, name: 'Claude' },
  { icon: siN8n, name: 'n8n' },
  { icon: siNextdotjs, name: 'Next.js' },
  { icon: siVercel, name: 'Vercel' },
];

// Small rising line for the "eval pass rate" card
function Sparkline() {
  return (
    <svg viewBox="0 0 120 36" className="h-9 w-full" aria-hidden="true">
      <defs>
        <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#8b6dff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#8b6dff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 30 L18 26 L34 28 L52 19 L70 21 L88 12 L104 9 L120 4 L120 36 L0 36 Z" fill="url(#spark-fill)" />
      <path d="M0 30 L18 26 L34 28 L52 19 L70 21 L88 12 L104 9 L120 4" fill="none" stroke="#8b6dff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section id="home" className="glass relative overflow-hidden px-6 pb-10 pt-12 sm:px-12 sm:pb-12 sm:pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <span className="eyebrow">Hello, I&apos;m</span>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-ink sm:text-6xl">Mohamed Jasim</h1>
          <p className="mt-2 bg-gradient-to-r from-[#b18cff] via-[#8b74ff] to-[#6f8dff] bg-clip-text text-3xl font-medium tracking-tight text-transparent sm:text-4xl">
            AI &amp; Automation Engineer
          </p>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-muted">
            I build practical AI: RAG apps, AI agents and n8n workflows, backed by hands-on IT
            support and an MSc in Cybersecurity.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn-dark">
              View My Work
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="/Mohammed_Jasim_CV.pdf" download className="btn-glass">
              Download CV
              <Download className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12">
            <span className="text-xs text-ink-muted">Builds with</span>
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
              {BUILDS_WITH.map(({ icon, name }) => (
                <span key={name} className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink-faint">
                  <BrandIcon icon={icon} size={18} color="#a3a8bb" />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Portrait in a glass frame; the cutout rises above the frame's top edge */}
        <div className="relative mx-auto mt-24 w-full max-w-[380px] sm:mt-28 lg:mr-10">
          <div className="relative aspect-square">
            <div className="absolute inset-0 rounded-[52px] rounded-tr-[96px] border-[6px] border-white/70 bg-gradient-to-br from-[#f8f6ff] via-[#ebe7fb] to-[#dfe4fa] shadow-glass" />
            <div className="absolute inset-[6px] rounded-[46px] rounded-tr-[90px] bg-[radial-gradient(70%_60%_at_60%_35%,rgba(177,140,255,0.28),transparent_70%)]" />
            <img
              src="/images/profile/jasim-suit.webp"
              alt="Mohamed Jasim"
              width="560"
              height="670"
              className="absolute bottom-0 left-[6px] w-[calc(100%-12px)] select-none"
              style={{ clipPath: 'inset(-40% 0 0 0 round 0 0 46px 46px)' }}
              draggable="false"
            />
          </div>

          {/* Floating cards */}
          <div className="glass-card animate-float absolute -right-3 top-[6%] bg-white/95 px-4 py-3 text-center sm:-right-10">
            <div className="text-3xl font-semibold tracking-tight text-ink">4</div>
            <div className="mt-0.5 text-[11px] leading-tight text-ink-muted">
              Live AI
              <br />
              apps
            </div>
          </div>

          <div className="glass-card animate-float-slow absolute -bottom-8 -right-3 w-44 bg-white/95 px-4 py-3 sm:-right-16">
            <div className="text-[11px] text-ink-muted">Eval pass rate</div>
            <div className="text-xl font-semibold tracking-tight text-ink">94%</div>
            <Sparkline />
          </div>

          <div className="glass-card animate-float absolute -left-5 top-[48%] flex h-14 w-14 bg-white/95 items-center justify-center rounded-full sm:-left-8">
            <Sparkles className="h-5 w-5 text-accent-bright" />
          </div>
        </div>
      </div>
    </section>
  );
}
