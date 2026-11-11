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
      {/* Gradients instead of blurred layers: same look, no per-frame blur cost on phones */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-page"
        style={{
          backgroundImage: [
            'radial-gradient(640px 640px at 0% 0%, rgba(227, 220, 255, 0.75), transparent 70%)',
            'radial-gradient(560px 560px at 100% 35%, rgba(223, 232, 255, 0.85), transparent 70%)',
            'radial-gradient(520px 520px at 45% 100%, rgba(239, 230, 255, 0.75), transparent 70%)',
            'linear-gradient(118deg, transparent 62%, rgba(255, 255, 255, 0.6) 70%, transparent 78%)',
            'linear-gradient(68deg, transparent 8%, rgba(255, 255, 255, 0.45) 14%, transparent 20%)',
          ].join(', '),
        }}
      />

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
