import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import TechSection from './components/TechSection';
import ProjectsSection from './components/ProjectsSection';
import ProcessSection from './components/ProcessSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <div className="relative min-h-screen font-sans text-ink">
      {/* Soft lavender light and white streaks behind the glass panels */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-page">
        <div className="absolute -left-40 -top-40 h-[640px] w-[640px] rounded-full bg-[#e3dcff] opacity-70 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-[560px] w-[560px] rounded-full bg-[#dfe8ff] opacity-80 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[520px] w-[520px] rounded-full bg-[#efe6ff] opacity-70 blur-[120px]" />
        <div className="absolute -right-24 top-16 h-[140%] w-40 rotate-[28deg] bg-gradient-to-b from-white/0 via-white/80 to-white/0 blur-2xl" />
        <div className="absolute left-[12%] top-0 h-[140%] w-24 -rotate-[22deg] bg-gradient-to-b from-white/0 via-white/60 to-white/0 blur-2xl" />
      </div>

      <CustomCursor />

      <div className="mx-auto max-w-6xl px-3 pb-6 sm:px-5">
        <Navbar />

        <main className="mt-4 space-y-4">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <TechSection />
          <ProjectsSection />
          <ProcessSection />
          <ExperienceSection />
          <ContactSection />
        </main>

        <Footer />
      </div>

      <ChatWidget />
    </div>
  );
}
