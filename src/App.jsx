import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      {/* Sleek Custom Interactive Cursor */}
      <CustomCursor />

      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Floating Dark-Theme Chatbot Widget */}
      <ChatWidget />

      <Footer />
    </div>
  );
}
