import React, { useRef, useEffect, useMemo } from 'react';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { ArrowDown, Sparkles } from 'lucide-react';

const TOTAL_FRAMES = 300;

export default function HeroSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Animation state refs
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const dimensionsRef = useRef({ width: 0, height: 0, physicalWidth: 0, physicalHeight: 0, dpr: 1 });
  const isLoopingRef = useRef(false);
  const isVisibleRef = useRef(true);
  const animIdRef = useRef(null);

  // Generate image sequence paths
  const imagePaths = useMemo(() => {
    return Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const frameNum = String(i + 1).padStart(3, '0');
      return `/images/hero section/ezgif-frame-${frameNum}.jpg`;
    });
  }, []);

  // Preload image array
  const { images, isLoaded, progress, loadedCount, totalCount } = useImagePreloader(imagePaths);
  const imagesRef = useRef([]);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  /**
   * Update canvas physical pixel dimensions based on clamped high-DPI scale.
   */
  const updateCanvasDimensions = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Cap DPR to 1.5 to prevent massive fill-rate bottlenecks on Retina displays while preserving crispness
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = container.clientWidth;
    const height = container.clientHeight;

    const physicalWidth = Math.round(width * dpr);
    const physicalHeight = Math.round(height * dpr);

    if (canvas.width !== physicalWidth || canvas.height !== physicalHeight) {
      canvas.width = physicalWidth;
      canvas.height = physicalHeight;
    }

    dimensionsRef.current = {
      width,
      height,
      physicalWidth,
      physicalHeight,
      dpr,
    };

    lastDrawnFrameRef.current = -1;
  };

  /**
   * Direct Single-Pass GPU-Friendly Canvas Renderer
   */
  const renderFrame = (frameIdx) => {
    const canvas = canvasRef.current;
    const loadedImages = imagesRef.current;

    if (!canvas || !loadedImages || loadedImages.length === 0) return;

    const img = loadedImages[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    const { physicalWidth, physicalHeight } = dimensionsRef.current;
    if (physicalWidth === 0 || physicalHeight === 0) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'medium';

    const imgRatio = 1920 / 1080;
    const canvasRatio = physicalWidth / physicalHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = physicalWidth;
      drawHeight = physicalWidth / imgRatio;
      offsetX = 0;
      offsetY = (physicalHeight - drawHeight) / 2;
    } else {
      drawHeight = physicalHeight;
      drawWidth = physicalHeight * imgRatio;
      offsetX = (physicalWidth - drawWidth) / 2;
      offsetY = 0;
    }

    // Direct single blit to canvas
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    lastDrawnFrameRef.current = frameIdx;
  };

  const startLoopIfNeeded = () => {
    if (isLoopingRef.current || !isVisibleRef.current || !isLoaded) return;
    isLoopingRef.current = true;

    const loop = () => {
      if (!isVisibleRef.current) {
        isLoopingRef.current = false;
        return;
      }

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.25;
      } else {
        currentFrameRef.current = target;
      }

      const frameToDraw = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      if (frameToDraw !== lastDrawnFrameRef.current) {
        renderFrame(frameToDraw);
      }

      // If we have reached the target frame, stop RAF loop to conserve CPU/GPU
      if (Math.abs(target - currentFrameRef.current) < 0.05) {
        currentFrameRef.current = target;
        isLoopingRef.current = false;
        return;
      }

      animIdRef.current = requestAnimationFrame(loop);
    };

    animIdRef.current = requestAnimationFrame(loop);
  };

  // Visibility (IntersectionObserver) Listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          updateCanvasDimensions();
          renderFrame(Math.round(currentFrameRef.current));
          startLoopIfNeeded();
        } else {
          isLoopingRef.current = false;
          if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isLoaded]);

  // Resize Listener
  useEffect(() => {
    updateCanvasDimensions();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateCanvasDimensions();
        renderFrame(Math.round(currentFrameRef.current));
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Initial Draw when loaded
  useEffect(() => {
    if (!isLoaded) return;
    updateCanvasDimensions();
    renderFrame(0);
  }, [isLoaded]);

  /**
   * Fast Mouse & Touch Movement Handlers
   */
  const handleMouseMove = (e) => {
    if (!containerRef.current || !isLoaded) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));

    targetFrameRef.current = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(percentage * (TOTAL_FRAMES - 1)))
    );

    startLoopIfNeeded();
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current || !isLoaded || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, touchX / rect.width));

    targetFrameRef.current = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(percentage * (TOTAL_FRAMES - 1)))
    );

    startLoopIfNeeded();
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full min-h-screen pt-28 pb-16 overflow-hidden bg-black text-white select-none font-sans flex flex-col justify-between"
    >
      {/* Native Direct GPU-Filtered Canvas Background */}
      <canvas
        ref={canvasRef}
        style={{ filter: 'contrast(1.06) saturate(1.06) brightness(1.01)' }}
        className={`absolute inset-0 w-full h-full block transition-opacity duration-700 pointer-events-none transform-gpu will-change-transform ${
          isLoaded ? 'opacity-85' : 'opacity-0'
        }`}
      />

      {/* Subtle Overlay Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90 pointer-events-none" />

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 transition-all duration-500">
          <div className="relative flex flex-col items-center max-w-sm w-full px-6">
            <div className="w-12 h-12 mb-4 relative flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-t-brand-cyan border-r-brand-violet border-b-transparent border-l-transparent animate-spin" />
              <Sparkles className="w-4 h-4 text-brand-cyan absolute" />
            </div>

            <h3 className="text-base font-bold font-display text-white mb-1">
              Loading 3D Experience
            </h3>
            <p className="text-xs text-zinc-400 mb-4 font-mono">
              Preloading ({loadedCount}/{totalCount})
            </p>

            <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-brand-cyan to-brand-violet h-full rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Editorial Hero Layout Container */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col justify-between h-full flex-1">
        
        {/* Compact Elegant Headline Allowing 3D Subject to be Fully Visible */}
        <div className="text-center mt-2 mb-auto py-3 pointer-events-none">
          <span className="text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-brand-cyan mb-1.5 block">
            MOHAMED JASIM • AI SPECIALIST & AUTOMATION ENGINEER
          </span>
          <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 drop-shadow-md">
            EXPLORE MY PORTFOLIO
          </h1>
        </div>

        {/* Flanking Information Layout Matching Reference Design */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-8 pointer-events-auto border-t border-white/10">
          
          {/* Left Block: EST Info & Down Circle Button */}
          <div className="md:col-span-4 flex flex-col items-start gap-4">
            <span className="text-xs font-mono tracking-widest uppercase text-zinc-400">
              AI SPECIALIST & AUTOMATION ENGINEER • AJMAN, UAE
            </span>

            <a
              href="#about"
              className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
              aria-label="Scroll to About"
            >
              <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>

          {/* Center Space for 3D Turnaround Canvas Subject */}
          <div className="hidden md:block md:col-span-4" />

          {/* Right Block: Bio Quote & Tech Tags from Updated CV */}
          <div className="md:col-span-4 flex flex-col items-end text-right gap-6">
            <p className="text-xs sm:text-sm text-zinc-300 font-mono tracking-wide max-w-xs uppercase leading-relaxed">
              AI SPECIALIST BUILDING AGENTIC WORKFLOWS AND AUTOMATIONS IN N8N, BACKED BY JAVA, PYTHON AND ENTERPRISE IT SUPPORT
            </p>

            <div className="flex flex-wrap justify-end gap-2 text-[10px] font-mono tracking-widest uppercase text-zinc-400">
              <span className="px-3 py-1 rounded-full border border-white/15 bg-black/40">AI SPECIALIST</span>
              <span className="px-3 py-1 rounded-full border border-white/15 bg-black/40">N8N AUTOMATION</span>
              <span className="px-3 py-1 rounded-full border border-white/15 bg-black/40">AGENTIC AI</span>
              <span className="px-3 py-1 rounded-full border border-white/15 bg-black/40">IT SUPPORT</span>
              <span className="px-3 py-1 rounded-full border border-white/15 bg-black/40">CYBERSECURITY</span>
              <span className="px-3 py-1 rounded-full border border-white/15 bg-black/40">DATA ANALYTICS</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
