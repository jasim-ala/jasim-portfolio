import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/*
 * Decorative iridescent glass object (the swirl and bubble in the design).
 * It idles slowly and turns with page scroll; rendering pauses whenever it
 * is off screen.
 *
 * shape: 'knot' (twisted ribbon) | 'bubble' (sphere)
 */
export default function GlassObject({ shape = 'knot', className = '' }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return; // No WebGL: the page simply shows no decoration
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.style.display = 'block';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;
    scene.environment = env;
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
    camera.position.set(0, 0, shape === 'knot' ? 7.2 : 5.4);

    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(2, 4, 3);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xc9b8ff, 1.2);
    rim.position.set(-3, -2, -2);
    scene.add(rim);

    const geometry =
      shape === 'knot'
        ? new THREE.TorusKnotGeometry(0.95, 0.34, 320, 48, 2, 3)
        : new THREE.SphereGeometry(1.2, 96, 96);

    const material = new THREE.MeshPhysicalMaterial({
      color: shape === 'knot' ? 0xd6c8ff : 0xf1edff,
      roughness: 0.12,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      iridescence: 1,
      iridescenceIOR: 1.45,
      iridescenceThicknessRange: [180, 620],
      sheen: 1,
      sheenColor: new THREE.Color(0xb9a6ff),
      transparent: true,
      opacity: shape === 'knot' ? 0.94 : 0.62,
      envMapIntensity: 1.3,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.set(0.5, 0.3, 0.2);
    scene.add(mesh);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let scrollTarget = window.scrollY;
    let scrollEased = scrollTarget;
    const onScroll = () => {
      scrollTarget = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = `${w}px`;
      renderer.domElement.style.height = `${h}px`;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    let running = false;
    let last = 0;
    let idle = 0;
    const frame = (now) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 1 / 20);
      last = now;
      if (!reducedMotion) idle += dt * 0.25;
      // Damped scroll so the turn eases in and out instead of snapping
      scrollEased += (scrollTarget - scrollEased) * (1 - Math.exp(-dt * 4));
      const s = scrollEased * 0.0012;
      mesh.rotation.x = 0.5 + s * 0.6 + Math.sin(idle * 0.8) * 0.08;
      mesh.rotation.y = 0.3 + idle + s;
      mesh.position.y = Math.sin(idle * 1.4) * 0.06;
      renderer.render(scene, camera);
      requestAnimationFrame(frame);
    };

    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        last = performance.now();
        requestAnimationFrame(frame);
      } else if (!entry.isIntersecting) {
        running = false;
      }
    });
    visibility.observe(host);

    return () => {
      running = false;
      visibility.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      geometry.dispose();
      material.dispose();
      env.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [shape]);

  return <div ref={hostRef} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
