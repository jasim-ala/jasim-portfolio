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

    if (type === 'n8n-outreach-bot') {
      // 0. n8n Outreach Bot: linked workflow nodes orbiting a central agent core
      const coreGeo = new THREE.IcosahedronGeometry(0.62, 1);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        roughness: 0.15,
        metalness: 0.9,
        transparent: true,
        opacity: 0.9,
      });
      mainMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(mainMesh);

      // Four workflow nodes: trigger, AI agent, review, send
      const nodeGeo = new THREE.BoxGeometry(0.42, 0.42, 0.42);
      const nodeColors = [0x8b5cf6, 0x06b6d4, 0xf59e0b, 0x10b981];
      const nodeCount = nodeColors.length;
      const radius = 1.65;
      const nodePositions = [];

      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const pos = new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.55,
          Math.sin(angle) * radius * 0.35
        );
        nodePositions.push(pos);

        const nodeMat = new THREE.MeshStandardMaterial({
          color: nodeColors[i],
          roughness: 0.2,
          metalness: 0.85,
          transparent: true,
          opacity: 0.92,
        });
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.copy(pos);
        node.rotation.set(0.4, 0.6, 0);
        group.add(node);
      }

      // Connectors drawn between consecutive nodes, like a workflow canvas
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.55,
      });
      const linePoints = [];
      for (let i = 0; i < nodeCount; i++) {
        linePoints.push(nodePositions[i], nodePositions[(i + 1) % nodeCount]);
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      const connectors = new THREE.LineSegments(lineGeo, lineMat);
      group.add(connectors);

      // Wireframe shell around the agent core
      const shellGeo = new THREE.IcosahedronGeometry(0.85, 1);
      const shellMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      wireMesh = new THREE.Mesh(shellGeo, shellMat);
      group.add(wireMesh);

      // Orbit ring holding the flow together
      const flowRingGeo = new THREE.TorusGeometry(1.75, 0.02, 16, 90);
      const flowRingMat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.6,
      });
      ringMesh1 = new THREE.Mesh(flowRingGeo, flowRingMat);
      ringMesh1.rotation.x = Math.PI / 2.6;
      group.add(ringMesh1);

    } else if (type === 'rag-docuchat') {
      // RAG DocuChat: a fanned stack of document pages with a retrieval scan ring
      const pageGeo = new THREE.BoxGeometry(1.1, 1.45, 0.05);
      const pageColors = [0x10b981, 0x06b6d4, 0x8b5cf6, 0x06b6d4, 0x10b981];
      pageColors.forEach((color, i) => {
        const pageMat = new THREE.MeshStandardMaterial({
          color,
          roughness: 0.2,
          metalness: 0.85,
          transparent: true,
          opacity: 0.55 + i * 0.08,
        });
        const page = new THREE.Mesh(pageGeo, pageMat);
        page.position.set((i - 2) * 0.12, (i - 2) * 0.06, (i - 2) * 0.22);
        page.rotation.z = (i - 2) * 0.06;
        group.add(page);
        if (i === pageColors.length - 1) mainMesh = page;
      });

      // Text lines on the front page
      const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });
      const linePoints = [];
      for (let r = 0; r < 6; r++) {
        const y = 0.5 - r * 0.2;
        const width = r === 5 ? 0.35 : 0.75;
        linePoints.push(new THREE.Vector3(-0.38, y, 0), new THREE.Vector3(-0.38 + width, y, 0));
      }
      const textLines = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(linePoints), lineMat);
      textLines.position.copy(mainMesh.position);
      textLines.position.z += 0.03;
      textLines.rotation.z = mainMesh.rotation.z;
      group.add(textLines);

      // Scan ring sweeping the stack (retrieval)
      const scanGeo = new THREE.TorusGeometry(1.35, 0.025, 16, 90);
      const scanMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.7 });
      ringMesh1 = new THREE.Mesh(scanGeo, scanMat);
      ringMesh1.rotation.x = Math.PI / 2.2;
      group.add(ringMesh1);

      // Retrieved chunks drifting out as particles
      const count = 90;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 1.6 + Math.random() * 0.7;
        const a = Math.random() * Math.PI * 2;
        positions[i * 3] = Math.cos(a) * r;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1.6;
        positions[i * 3 + 2] = Math.sin(a) * r;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesMesh = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x06b6d4, size: 0.04 }));
      group.add(particlesMesh);

    } else if (type === 'ai-chatbot') {
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
      
    </div>
  );
}
