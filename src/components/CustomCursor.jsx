import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Instant update for the precise center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering over clickable/interactive elements
      const target = e.target;
      const isInteractive = Boolean(
        target &&
          (target.closest('a') ||
            target.closest('button') ||
            target.closest('input') ||
            target.closest('textarea') ||
            target.closest('[role="button"]') ||
            target.closest('.cursor-pointer') ||
            target.closest('.interactive-hover'))
      );
      setIsHovered(isInteractive);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Smooth physics loop for the trailing fluid ring
    const render = () => {
      // Linear interpolation (lerp) for silky lag
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 hidden md:block ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Outer Fluid Kinetic Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-4 -mt-4 rounded-full border transition-[width,height,background-color,border-color] duration-200 ease-out will-change-transform ${
          isClicked
            ? 'w-6 h-6 -ml-3 -mt-3 bg-brand-cyan/25 border-brand-cyan scale-90'
            : isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 bg-brand-cyan/15 border-brand-cyan/80 backdrop-blur-[1px] shadow-[0_0_20px_rgba(6,182,212,0.4)]'
            : 'w-8 h-8 border-white/40 bg-white/5 backdrop-blur-[0.5px]'
        }`}
      />

      {/* Center Precision Target Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 rounded-full transition-[width,height,background-color,transform] duration-150 ease-out will-change-transform ${
          isHovered
            ? 'w-2 h-2 -ml-1 -mt-1 bg-brand-cyan shadow-[0_0_8px_#06b6d4]'
            : 'w-2 h-2 bg-white'
        }`}
      />
    </div>
  );
}
