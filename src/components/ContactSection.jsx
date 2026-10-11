import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import GlassObject from './GlassObject';

const EMAIL = 'jasimala07@gmail.com';

const DETAILS = [
  { icon: Mail, value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: Phone, value: '+971 56 766 5827', href: 'tel:+971567665827' },
  { icon: MapPin, value: 'Ajman, United Arab Emirates' },
];

const TOPICS = ['AI automation / n8n workflow', 'AI app (RAG, agents)', 'IT support role', 'Cybersecurity role', 'Something else'];

const fieldClass =
  'w-full rounded-xl border border-white/90 bg-white/70 px-4 py-3 text-[13px] text-ink shadow-card placeholder:text-ink-faint transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-accent-ring';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', topic: '', message: '' });
  const update = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });

  // The site is static, so the form hands the message to the visitor's email app
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Portfolio enquiry: ${formData.topic || 'General'} (${formData.name})`;
    const body = `${formData.message}\n\n${formData.name}\n${formData.email}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="glass relative overflow-hidden px-6 py-10 sm:px-12 sm:py-12">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4">
          <span className="eyebrow">Let&apos;s connect</span>
          <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-ink">
            Have a role or project in mind?
            <br />
            Let&apos;s build something useful together.
          </h2>

          <ul className="mt-8 space-y-4">
            {DETAILS.map(({ icon: Icon, value, href }) => {
              const inner = (
                <>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white bg-white/80 text-ink-soft shadow-card transition-colors duration-300 group-hover:text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[13px] text-ink-soft transition-colors duration-300 group-hover:text-accent">{value}</span>
                </>
              );
              return (
                <li key={value}>
                  {href ? (
                    <a href={href} className="group flex items-center gap-3">
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-3">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="glass-card space-y-3 p-5 sm:p-6 lg:col-span-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <input type="text" required value={formData.name} onChange={update('name')} placeholder="Your Name" aria-label="Your name" className={fieldClass} />
            <input type="email" required value={formData.email} onChange={update('email')} placeholder="Your Email" aria-label="Your email" className={fieldClass} />
          </div>

          <div className="relative">
            <select
              value={formData.topic}
              onChange={update('topic')}
              aria-label="What it's about"
              className={`${fieldClass} appearance-none pr-10 ${formData.topic ? '' : 'text-ink-faint'}`}
            >
              <option value="">Your Project</option>
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          </div>

          <textarea
            rows={4}
            required
            value={formData.message}
            onChange={update('message')}
            placeholder="Your Message"
            aria-label="Your message"
            className={`${fieldClass} resize-none`}
          />

          <button type="submit" className="btn-dark w-full justify-center sm:w-auto sm:px-16">
            Send Message
            <Send className="h-4 w-4" />
          </button>
        </form>

        {/* Iridescent glass swirl */}
        <div className="relative hidden h-72 lg:col-span-3 lg:block">
          <GlassObject shape="knot" className="absolute -right-10 -top-6 h-[340px] w-[340px]" />
        </div>
      </div>
    </section>
  );
}
