import React, { useRef } from 'react';

export default function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const rafIdRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !spotlightRef.current) return;
    const card = cardRef.current;
    const spotlight = spotlightRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (((y - centerY) / centerY) * -6).toFixed(2);
    const rotateY = (((x - centerX) / centerX) * 6).toFixed(2);

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(() => {
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
      spotlight.style.opacity = '1';
      spotlight.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.12), transparent 70%)`;
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !spotlightRef.current) return;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    spotlightRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'transform 0.15s ease-out',
        willChange: 'transform',
      }}
      className={`relative group rounded-3xl overflow-hidden transform-gpu ${className}`}
    >
      {/* Radial Spotlight Glow Border */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl z-0 opacity-0"
      />

      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
