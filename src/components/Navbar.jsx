import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      if (isScrolled !== scrolledRef.current) {
        scrolledRef.current = isScrolled;
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SERVICES', href: '#services' },
    { name: 'PROJECTS', href: '#projects' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#home" className="font-display text-xl font-black tracking-widest uppercase text-white">
          PORTFOLIO<span className="text-brand-cyan">.</span>
        </a>

        {/* Center Pill Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-5 py-1.5 text-[11px] font-mono tracking-widest uppercase font-semibold text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2 text-[11px] font-mono tracking-widest uppercase font-bold rounded-full bg-white text-black hover:bg-zinc-200 transition-all"
          >
            LET'S TALK
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-zinc-300 hover:text-white p-2"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono tracking-widest uppercase font-bold text-zinc-300 hover:text-white py-2 border-b border-white/10"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center py-3 text-xs font-mono tracking-widest uppercase font-bold rounded-full bg-white text-black"
          >
            LET'S TALK
          </a>
        </div>
      )}
    </header>
  );
}
