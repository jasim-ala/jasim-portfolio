import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ThreeProjectCanvas({ type = 'ai-chatbot' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 240;

    // --- Scene, Camera & Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 3, 10);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 3, 10);
    pointLight2.position.set(-3, -3, 2);
    scene.add(pointLight2);

    // --- Procedural 3D Object Creation based on Project Type ---
    const group = new THREE.Group();
    scene.add(group);

    let mainMesh, wireMesh, ringMesh1, ringMesh2, particlesMesh;

    if (type === 'ai-chatbot') {
      // 1. AI Chatbot: 3D Holographic AI Neural Core with Floating Particle Halo
      const geo = new THREE.IcosahedronGeometry(1.2, 1);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: false,
        transparent: true,
        opacity: 0.85,
      });
      mainMesh = new THREE.Mesh(geo, mat);
      group.add(mainMesh);

      // Outer Wireframe Shell
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      wireMesh = new THREE.Mesh(geo, wireMat);
      wireMesh.scale.set(1.08, 1.08, 1.08);
      group.add(wireMesh);

      // Orbiting Particle Halo Rings
      const ringGeo1 = new THREE.TorusGeometry(1.7, 0.02, 16, 100);
      const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.7 });
      ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
      ringMesh1.rotation.x = Math.PI / 3;
      group.add(ringMesh1);

      const ringGeo2 = new THREE.TorusGeometry(2.0, 0.015, 16, 100);
      const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.5 });
      ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
      ringMesh2.rotation.y = Math.PI / 4;
      group.add(ringMesh2);

      // Surrounding Floating Particles
      const particleGeo = new THREE.BufferGeometry();
      const particleCount = 120;
      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        const radius = 1.6 + Math.random() * 0.8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i + 2] = radius * Math.cos(phi);
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particleMat = new THREE.PointsMaterial({
        size: 0.04,
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.8,
      });
      particlesMesh = new THREE.Points(particleGeo, particleMat);
      group.add(particlesMesh);

    } else if (type === 'ecommerce-platform') {
      // 2. E-Commerce Platform: 3D Cyber Vault Cube with Floating Golden/Cyan Rings
      const boxGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
      const boxMat = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        roughness: 0.15,
        metalness: 0.9,
        transparent: true,
        opacity: 0.85,
      });
      mainMesh = new THREE.Mesh(boxGeo, boxMat);
      group.add(mainMesh);

      const boxWireGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
      const boxWireMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      wireMesh = new THREE.Mesh(boxWireGeo, boxWireMat);
      group.add(wireMesh);

      // Concentric Rings
      const ringGeo = new THREE.TorusGeometry(1.8, 0.03, 16, 80);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3, metalness: 0.8 });
      ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
      group.add(ringMesh1);

    } else {
      // 3. Task Management: 3D Crystalline Matrix Octahedron with Glowing Vertices
      const octGeo = new THREE.OctahedronGeometry(1.4, 0);
      const octMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        roughness: 0.1,
        metalness: 0.9,
        transparent: true,
        opacity: 0.85,
      });
      mainMesh = new THREE.Mesh(octGeo, octMat);
      group.add(mainMesh);

      const octWireMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      wireMesh = new THREE.Mesh(octGeo, octWireMat);
      wireMesh.scale.set(1.06, 1.06, 1.06);
      group.add(wireMesh);

      // Floating Lattice Rings
      const ringGeo = new THREE.TorusGeometry(1.8, 0.02, 16, 80);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.6 });
      ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
      ringMesh1.rotation.x = Math.PI / 2;
      group.add(ringMesh1);
    }

    // --- Interactive 360° Drag & Inertia Controls ---
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0.003, y: 0.005 };

    const handlePointerDown = (clientX, clientY) => {
      isDragging = true;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerMove = (clientX, clientY) => {
      if (!isDragging) return;
      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      rotationVelocity.y = deltaX * 0.008;
      rotationVelocity.x = deltaY * 0.008;

      group.rotation.y += rotationVelocity.y;
      group.rotation.x += rotationVelocity.x;

      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    // Mouse Listeners
    const onMouseDown = (e) => handlePointerDown(e.clientX, e.clientY);
    const onMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);
    const onMouseUp = () => handlePointerUp();

    // Touch Listeners
    const onTouchStart = (e) => {
      if (e.touches.length > 0) handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchMove = (e) => {
      if (e.touches.length > 0) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => handlePointerUp();

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // --- Animation Loop ---
    let animId;
    let isRunning = false;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        // Apply smooth inertia damping & subtle idle auto-rotation
        rotationVelocity.x *= 0.95;
        rotationVelocity.y *= 0.95;

        group.rotation.x += rotationVelocity.x + 0.003;
        group.rotation.y += rotationVelocity.y + 0.006;
      }

      // Counter-rotate secondary elements for dynamic depth
      if (ringMesh1) ringMesh1.rotation.z += 0.01;
      if (ringMesh2) ringMesh2.rotation.z -= 0.008;
      if (particlesMesh) particlesMesh.rotation.y += 0.004;

      renderer.render(scene, camera);
    };

    // --- Visibility / Viewport Culling Observer ---
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isRunning) {
            isRunning = true;
            animate();
          }
        } else {
          if (isRunning) {
            isRunning = false;
            cancelAnimationFrame(animId);
          }
        }
      },
      { threshold: 0.1 }
    );

    intersectionObserver.observe(container);

    // --- Resize Observer ---
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.render(scene, camera);
    });

    resizeObserver.observe(container);

    // --- Cleanup on unmount ---
    return () => {
      cancelAnimationFrame(animId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();

      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [type]);

  return (
    <div className="relative w-full h-[300px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      <div ref={mountRef} className="w-full h-full" />
      
      {/* 3D Drag Indicator Badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 border border-white/15 backdrop-blur-md text-[10px] font-mono text-zinc-300 pointer-events-none flex items-center gap-1.5 whitespace-nowrap shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping" />
        <span>Drag to rotate 3D object (360°)</span>
      </div>
    </div>
  );
}
