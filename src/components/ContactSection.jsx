import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle, Send, Phone, Mail, MapPin } from 'lucide-react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-28 bg-black text-white relative border-t border-white/10">
      <div className="container mx-auto px-6">
        
        {/* Giant Metallic LET'S TALK Title Matching Reference */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-zinc-400 mb-2 block">
            WORK WITH ME
          </span>
          <h2 className="font-display text-6xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-600">
            LET'S TALK
          </h2>
        </div>

        {/* Pill Action Links Row Matching Reference */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <a
            href="mailto:jasimala07@gmail.com"
            className="px-8 py-3 text-xs font-mono tracking-widest uppercase font-bold rounded-full bg-white text-black hover:bg-zinc-200 transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-white/20 active:scale-95"
          >
            EMAIL ME
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          
          {/* Direct Details */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold font-display uppercase tracking-tight text-white mb-2">Direct Contact</h3>
              <p className="text-xs text-zinc-400 font-mono uppercase mb-8 leading-relaxed">
                Available for full-time IT support, web development, and cybersecurity roles in Ajman/Dubai UAE or remotely.
              </p>

              <div className="space-y-6 font-mono text-xs">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-white/10 text-white border border-white/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase">Phone</span>
                    <p className="font-bold text-white">+971 56 766 5827</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-white/10 text-white border border-white/20">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase">Email</span>
                    <p className="font-bold text-white">jasimala07@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-white/10 text-white border border-white/20">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase">Location</span>
                    <p className="font-bold text-white">Ajman, United Arab Emirates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <CheckCircle className="w-12 h-12 text-emerald-400 mb-4 animate-bounce" />
                <h4 className="text-xl font-bold font-display uppercase text-white">MESSAGE SENT SUCCESSFULLY</h4>
                <p className="text-xs font-mono text-zinc-400 mt-2">Thank you, Mohamed Jasim will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ALEX SMITH"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ALEX@EXAMPLE.COM"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="HELLO JASIM, I WOULD LIKE TO DISCUSS..."
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-white text-black font-mono font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all active:scale-[0.99]"
                >
                  <span>SEND MESSAGE</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
