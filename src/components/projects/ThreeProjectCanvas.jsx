import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// Light-theme palette shared by every project model
const PALETTE = {
  accent: 0x7c5cff,
  sky: 0x9fb6ff,
  mint: 0x7fe0d0,
  amber: 0xffc27a,
  pass: 0x8ee6a8,
  fail: 0xfca5b8,
  paper: 0xf6f4ff,
  ink: 0x3a3e52,
  line: 0xa9a6c8,
};

export default function ThreeProjectCanvas({ type = 'ai-chatbot' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 200;

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

    // --- Lighting: soft, bright studio light for the white theme ---
    scene.add(new THREE.HemisphereLight(0xffffff, 0xdfe3ea, 1.1));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-3, -2, 2);
    scene.add(fillLight);

    // --- Procedural 3D Object Creation based on Project Type ---
    const group = new THREE.Group();
    scene.add(group);

    let mainMesh, wireMesh, ringMesh1, ringMesh2, particlesMesh;

    if (type === 'n8n-outreach-bot') {
      // 0. n8n Outreach Bot: linked workflow nodes orbiting a central agent core
      const coreGeo = new THREE.IcosahedronGeometry(0.62, 1);
      const coreMat = new THREE.MeshStandardMaterial({
        color: PALETTE.accent,
        roughness: 0.35,
        metalness: 0.1,
        transparent: true,
        opacity: 0.9,
      });
      mainMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(mainMesh);

      // Four workflow nodes: trigger, AI agent, review, send
      const nodeGeo = new THREE.BoxGeometry(0.42, 0.42, 0.42);
      const nodeColors = [PALETTE.sky, PALETTE.accent, PALETTE.amber, PALETTE.mint];
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
          roughness: 0.35,
          metalness: 0.1,
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
        color: PALETTE.accent,
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
        color: PALETTE.line,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      wireMesh = new THREE.Mesh(shellGeo, shellMat);
      group.add(wireMesh);

      // Orbit ring holding the flow together
      const flowRingGeo = new THREE.TorusGeometry(1.75, 0.02, 16, 90);
      const flowRingMat = new THREE.MeshBasicMaterial({
        color: PALETTE.sky,
        transparent: true,
        opacity: 0.6,
      });
      ringMesh1 = new THREE.Mesh(flowRingGeo, flowRingMat);
      ringMesh1.rotation.x = Math.PI / 2.6;
      group.add(ringMesh1);

    } else if (type === 'rag-docuchat') {
      // RAG DocuChat: a fanned stack of document pages with a retrieval scan ring
      const pageGeo = new THREE.BoxGeometry(1.1, 1.45, 0.05);
      const pageColors = [PALETTE.mint, PALETTE.accent, PALETTE.sky, PALETTE.accent, PALETTE.mint];
      pageColors.forEach((color, i) => {
        const pageMat = new THREE.MeshStandardMaterial({
          color,
          roughness: 0.35,
          metalness: 0.1,
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
      const lineMat = new THREE.LineBasicMaterial({ color: PALETTE.line, transparent: true, opacity: 0.7 });
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
      const scanMat = new THREE.MeshBasicMaterial({ color: PALETTE.mint, transparent: true, opacity: 0.7 });
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
      particlesMesh = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: PALETTE.accent, size: 0.04 }));
      group.add(particlesMesh);

    } else if (type === 'tripagent') {
      // TripAgent: route of waypoint pins joined by a path, circled by the agent's loop ring
      const stops = [
        new THREE.Vector3(-1.3, -0.5, 0.2),
        new THREE.Vector3(-0.5, 0.45, -0.3),
        new THREE.Vector3(0.35, -0.2, 0.35),
        new THREE.Vector3(1.2, 0.55, -0.1),
      ];
      const stopColors = [PALETTE.sky, PALETTE.accent, PALETTE.amber, PALETTE.mint];
      stops.forEach((p, i) => {
        const pinMat = new THREE.MeshStandardMaterial({ color: stopColors[i], roughness: 0.35, metalness: 0.1 });
        const pin = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.42, 20), pinMat);
        pin.position.set(p.x, p.y + 0.2, p.z);
        pin.rotation.x = Math.PI;
        group.add(pin);
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 20, 20), pinMat);
        head.position.set(p.x, p.y + 0.46, p.z);
        group.add(head);
        if (i === 1) mainMesh = head;
      });
      const curve = new THREE.CatmullRomCurve3(stops);
      const pathGeo = new THREE.TubeGeometry(curve, 80, 0.025, 8, false);
      const pathMat = new THREE.MeshBasicMaterial({ color: PALETTE.line, transparent: true, opacity: 0.6 });
      group.add(new THREE.Mesh(pathGeo, pathMat));

      const loopGeo = new THREE.TorusGeometry(1.75, 0.02, 16, 90);
      ringMesh1 = new THREE.Mesh(loopGeo, new THREE.MeshBasicMaterial({ color: PALETTE.sky, transparent: true, opacity: 0.6 }));
      ringMesh1.rotation.x = Math.PI / 2.3;
      group.add(ringMesh1);

      const guardGeo = new THREE.TorusGeometry(2.0, 0.012, 16, 90);
      ringMesh2 = new THREE.Mesh(guardGeo, new THREE.MeshBasicMaterial({ color: PALETTE.accent, transparent: true, opacity: 0.35 }));
      ringMesh2.rotation.y = Math.PI / 2.5;
      group.add(ringMesh2);

    } else if (type === 'billscan') {
      // BillScan: a receipt with printed line items, a scan beam and extracted table cells
      const paperMat = new THREE.MeshStandardMaterial({ color: PALETTE.paper, roughness: 0.4, metalness: 0.1, transparent: true, opacity: 0.9 });
      mainMesh = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.7, 0.04), paperMat);
      mainMesh.position.x = -0.45;
      mainMesh.rotation.z = 0.06;
      group.add(mainMesh);

      const inkMat = new THREE.LineBasicMaterial({ color: PALETTE.ink });
      const inkPts = [];
      for (let r = 0; r < 8; r++) {
        const y = 0.62 - r * 0.16;
        const w = r === 7 ? 0.3 : 0.62;
        inkPts.push(new THREE.Vector3(-0.3, y, 0), new THREE.Vector3(-0.3 + w, y, 0));
      }
      const ink = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(inkPts), inkMat);
      ink.position.set(mainMesh.position.x, 0, 0.03);
      ink.rotation.z = mainMesh.rotation.z;
      group.add(ink);

      const beam = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.03, 0.05), new THREE.MeshBasicMaterial({ color: PALETTE.amber, transparent: true, opacity: 0.85 }));
      beam.position.set(-0.45, 0.1, 0.06);
      group.add(beam);

      // Extracted table: a grid of cells floating beside the receipt
      const cellColors = [PALETTE.sky, PALETTE.accent, PALETTE.accent, PALETTE.mint];
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 3; c++) {
          const cell = new THREE.Mesh(
            new THREE.BoxGeometry(0.3, 0.16, 0.05),
            new THREE.MeshStandardMaterial({ color: cellColors[r], roughness: 0.35, metalness: 0.1, transparent: true, opacity: 0.8 }),
          );
          cell.position.set(0.55 + c * 0.34, 0.4 - r * 0.24, 0.2);
          group.add(cell);
        }
      }
      ringMesh1 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.02, 16, 90), new THREE.MeshBasicMaterial({ color: PALETTE.amber, transparent: true, opacity: 0.5 }));
      ringMesh1.rotation.x = Math.PI / 2.2;
      group.add(ringMesh1);

    } else if (type === 'evallab') {
      // EvalLab: an answer sheet of pass/fail cubes inside a scoring ring
      const passMat = new THREE.MeshStandardMaterial({ color: PALETTE.pass, roughness: 0.35, metalness: 0.1 });
      const failMat = new THREE.MeshStandardMaterial({ color: PALETTE.fail, roughness: 0.35, metalness: 0.1 });
      const fails = new Set([3, 11, 17]);
      let n = 0;
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 5; c++) {
          const cube = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.26, 0.26), fails.has(n) ? failMat : passMat);
          cube.position.set(-0.72 + c * 0.36, 0.54 - r * 0.36, 0);
          group.add(cube);
          if (n === 7) mainMesh = cube;
          n++;
        }
      }
      const score = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.05, 16, 100, Math.PI * 2 * 0.94), new THREE.MeshBasicMaterial({ color: PALETTE.pass, transparent: true, opacity: 0.75 }));
      ringMesh1 = score;
      group.add(score);
      ringMesh2 = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.012, 16, 90), new THREE.MeshBasicMaterial({ color: PALETTE.line, transparent: true, opacity: 0.35 }));
      ringMesh2.rotation.x = Math.PI / 2.4;
      group.add(ringMesh2);

    } else if (type === 'ai-chatbot') {
      // 1. AI Chatbot: 3D Holographic AI Neural Core with Floating Particle Halo
      const geo = new THREE.IcosahedronGeometry(1.2, 1);
      const mat = new THREE.MeshStandardMaterial({
        color: PALETTE.accent,
        roughness: 0.35,
        metalness: 0.1,
        wireframe: false,
        transparent: true,
        opacity: 0.85,
      });
      mainMesh = new THREE.Mesh(geo, mat);
      group.add(mainMesh);

      // Outer Wireframe Shell
      const wireMat = new THREE.MeshBasicMaterial({
        color: PALETTE.line,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      wireMesh = new THREE.Mesh(geo, wireMat);
      wireMesh.scale.set(1.08, 1.08, 1.08);
      group.add(wireMesh);

      // Orbiting Particle Halo Rings
      const ringGeo1 = new THREE.TorusGeometry(1.7, 0.02, 16, 100);
      const ringMat1 = new THREE.MeshBasicMaterial({ color: PALETTE.accent, transparent: true, opacity: 0.7 });
      ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
      ringMesh1.rotation.x = Math.PI / 3;
      group.add(ringMesh1);

      const ringGeo2 = new THREE.TorusGeometry(2.0, 0.015, 16, 100);
      const ringMat2 = new THREE.MeshBasicMaterial({ color: PALETTE.sky, transparent: true, opacity: 0.5 });
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
        color: PALETTE.accent,
        transparent: true,
        opacity: 0.8,
      });
      particlesMesh = new THREE.Points(particleGeo, particleMat);
      group.add(particlesMesh);

    } else if (type === 'ecommerce-platform') {
      // 2. E-Commerce Platform: 3D Cyber Vault Cube with Floating Golden/Cyan Rings
      const boxGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
      const boxMat = new THREE.MeshStandardMaterial({
        color: PALETTE.sky,
        roughness: 0.35,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85,
      });
      mainMesh = new THREE.Mesh(boxGeo, boxMat);
      group.add(mainMesh);

      const boxWireGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
      const boxWireMat = new THREE.MeshBasicMaterial({
        color: PALETTE.line,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      wireMesh = new THREE.Mesh(boxWireGeo, boxWireMat);
      group.add(wireMesh);

      // Concentric Rings
      const ringGeo = new THREE.TorusGeometry(1.8, 0.03, 16, 80);
      const ringMat = new THREE.MeshStandardMaterial({ color: PALETTE.mint, roughness: 0.3, metalness: 0.1 });
      ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
      group.add(ringMesh1);

    } else {
      // 3. Task Management: 3D Crystalline Matrix Octahedron with Glowing Vertices
      const octGeo = new THREE.OctahedronGeometry(1.4, 0);
      const octMat = new THREE.MeshStandardMaterial({
        color: PALETTE.mint,
        roughness: 0.35,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85,
      });
      mainMesh = new THREE.Mesh(octGeo, octMat);
      group.add(mainMesh);

      const octWireMat = new THREE.MeshBasicMaterial({
        color: PALETTE.line,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      wireMesh = new THREE.Mesh(octGeo, octWireMat);
      wireMesh.scale.set(1.06, 1.06, 1.06);
      group.add(wireMesh);

      // Floating Lattice Rings
      const ringGeo = new THREE.TorusGeometry(1.8, 0.02, 16, 80);
      const ringMat = new THREE.MeshBasicMaterial({ color: PALETTE.accent, transparent: true, opacity: 0.6 });
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
    <div className="relative flex h-full min-h-[200px] w-full cursor-grab select-none items-center justify-center active:cursor-grabbing">
      <div ref={mountRef} className="w-full h-full" />
      
    </div>
  );
}
