import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Services', id: 'services' },
  { name: 'Work', id: 'work' },
  { name: 'Process', id: 'process' },
  { name: 'Experience', id: 'experience' },
  { name: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Highlight the section currently in the middle band of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 -mx-3 px-3 pt-3 sm:-mx-5 sm:px-5 sm:pt-5">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[calc(100%+12px)] bg-gradient-to-b from-page via-page/80 to-transparent" />
      <div className="glass relative flex items-center justify-between rounded-[22px] bg-white/60 py-2.5 pl-3 pr-2.5">
        <a href="#home" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white bg-white text-sm font-bold tracking-tight text-ink shadow-card">
            MJ
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-ink">Mohamed Jasim</span>
            <span className="block text-[11px] text-ink-muted">AI &amp; Automation Engineer</span>
          </span>
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`rounded-full px-3.5 py-1.5 text-[13px] transition-[background-color,color,box-shadow] duration-300 ease-out-expo ${
                active === link.id
                  ? 'bg-white font-medium text-ink shadow-card'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn-glass hidden px-5 py-2.5 text-[13px] lg:inline-flex">
          Let&apos;s Talk
          <ArrowUpRight className="h-4 w-4" />
        </a>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="icon-btn h-10 w-10 hover:bg-white hover:text-ink lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="glass animate-fade-in relative mt-2 flex flex-col gap-1 bg-white/80 p-3 lg:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-2xl px-4 py-3 text-sm ${
                active === link.id ? 'bg-white font-medium text-ink shadow-card' : 'text-ink-soft'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
