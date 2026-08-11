import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useApp } from '../../context/AppContext';
import { Building2, GraduationCap, Briefcase, Calendar, MessageSquare, Shield, Sparkles } from 'lucide-react';

export const CampusCanvas = () => {
  const containerRef = useRef(null);
  const { setActiveTab } = useApp();
  const [hoveredModule, setHoveredModule] = useState(null);

  const buildings = [
    { id: 'lms', name: 'LMS Academic Complex', subtitle: 'Interactive Courses & Quizzes', icon: GraduationCap, color: '#06b6d4', pos: [-4, 0, 0] },
    { id: 'internships', name: 'Internship & Recruitment Tower', subtitle: 'Company Projects & Mentorship', icon: Briefcase, color: '#3b82f6', pos: [-1.6, 0.5, 2] },
    { id: 'events', name: 'Virtual Auditorium & Event Center', subtitle: 'Hackathons & Seminars', icon: Calendar, color: '#8b5cf6', pos: [1.6, 0.2, 2] },
    { id: 'career', name: 'Career & Portfolio Hub', subtitle: 'Job Board & Resume Builder', icon: Building2, color: '#ec4899', pos: [4, 0, 0] },
    { id: 'community', name: 'Community Forum Pavilion', subtitle: 'Q&A & Networking', icon: MessageSquare, color: '#10b981', pos: [0, -0.5, -2] },
    { id: 'admin', name: 'Platform Operations Center', subtitle: 'Admin & System Monitoring', icon: Shield, color: '#f59e0b', pos: [0, 1.2, -4] }
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070a12, 0.035);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x06b6d4, 1.5);
    dirLight.position.set(5, 12, 8);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 2, 20);
    pointLight.position.set(0, 3, 0);
    scene.add(pointLight);

    // 1. ROTATING KNOWLEDGE CUBE
    const cubeGeo = new THREE.BoxGeometry(2, 2, 2);
    const cubeMat = new THREE.MeshPhongMaterial({
      color: 0x06b6d4,
      wireframe: true,
      emissive: 0x0891b2,
      emissiveIntensity: 0.5
    });
    const knowledgeCube = new THREE.Mesh(cubeGeo, cubeMat);
    knowledgeCube.position.set(0, 3.2, 0);
    scene.add(knowledgeCube);

    // Inner Glowing Core for Cube
    const coreGeo = new THREE.OctahedronGeometry(0.9, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      roughness: 0.1,
      metalness: 0.8,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.8
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    knowledgeCube.add(coreMesh);

    // 2. PARTICLES AURORA SYSTEM
    const particleCount = 400;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 35;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 35;

      colors[i] = 0.02 + Math.random() * 0.2;
      colors[i + 1] = 0.7 + Math.random() * 0.3;
      colors[i + 2] = 0.9 + Math.random() * 0.1;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 3. BUILDINGS NODES
    const buildingMeshes = [];
    buildings.forEach((b) => {
      const group = new THREE.Group();
      group.position.set(b.pos[0], b.pos[1], b.pos[2]);

      // Base pedestal
      const baseGeo = new THREE.CylinderGeometry(1.2, 1.4, 0.4, 8);
      const baseMat = new THREE.MeshPhongMaterial({ color: 0x1e293b });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      group.add(baseMesh);

      // Building Structure
      const bGeo = new THREE.BoxGeometry(1.4, 2.2, 1.4);
      const bMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(b.color),
        roughness: 0.3,
        metalness: 0.5,
        transparent: true,
        opacity: 0.85
      });
      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.y = 1.3;
      bMesh.userData = { id: b.id, name: b.name };
      group.add(bMesh);

      // Glowing Beacon Top
      const beaconGeo = new THREE.SphereGeometry(0.3, 16, 16);
      const beaconMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(b.color) });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.y = 2.6;
      group.add(beacon);

      scene.add(group);
      buildingMeshes.push({ mesh: bMesh, group, id: b.id });
    });

    // Mouse Parallax & Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate Knowledge Cube
      knowledgeCube.rotation.x = elapsedTime * 0.4;
      knowledgeCube.rotation.y = elapsedTime * 0.6;
      coreMesh.rotation.y = -elapsedTime * 0.8;

      // Pulse particles
      particleSystem.rotation.y = elapsedTime * 0.05;

      // Floating animation for building beacons
      buildingMeshes.forEach(({ group }, idx) => {
        group.position.y = buildings[idx].pos[1] + Math.sin(elapsedTime * 2 + idx) * 0.15;
      });

      // Smooth Camera Parallax
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 1.5 + 5 - camera.position.y) * 0.03;
      camera.lookAt(0, 0.5, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[540px] rounded-3xl overflow-hidden glass-panel border border-slate-700/50 shadow-2xl">
      {/* 3D WebGL Canvas Viewport */}
      <div ref={containerRef} className="w-full h-full cursor-pointer" />

      {/* Floating Header Banner */}
      <div className="absolute top-4 left-6 pointer-events-none flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-500/30">
        <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
        <span className="text-xs font-semibold tracking-wider text-cyan-300 uppercase">
          Interactive 3D Campus Scene
        </span>
      </div>

      {/* Overlay Campus Module Building Hotspots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-3 px-4 max-w-4xl w-full">
        {buildings.map((b) => {
          const Icon = b.icon;
          const isHovered = hoveredModule === b.id;
          return (
            <button
              key={b.id}
              onClick={() => setActiveTab(b.id)}
              onMouseEnter={() => setHoveredModule(b.id)}
              onMouseLeave={() => setHoveredModule(null)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
                isHovered
                  ? 'bg-slate-800/90 border-cyan-400 scale-105 shadow-lg shadow-cyan-500/20 text-white'
                  : 'bg-slate-900/70 border-slate-700/60 text-slate-300 hover:text-white'
              }`}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${b.color}25`, color: b.color }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold leading-none">{b.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-none">{b.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
