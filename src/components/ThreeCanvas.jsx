import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas({ theme = 'dark' }) {
  const canvasRef = useRef(null);
  const themeRef = useRef(theme);
  const lightingRef = useRef(null);

  // Keep themeRef updated
  useEffect(() => {
    themeRef.current = theme;
    if (lightingRef.current) {
      lightingRef.current.updateTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5.8);

    // 2. WebGL Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
    } catch (e) {
      console.warn('WebGL initialization failed, falling back gracefully:', e);
      return;
    }

    // 3. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x181c26, 1.2);
    scene.add(ambientLight);

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xfff1cf, 3.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Rim Light
    const rimLight = new THREE.DirectionalLight(0x70a5f5, 1.8);
    rimLight.position.set(-5, -4, -3);
    scene.add(rimLight);

    // Point Light - Specular glint on diamond facets
    const pointLight = new THREE.PointLight(0xd4af37, 2.5, 10);
    pointLight.position.set(0, 1.5, 2);
    scene.add(pointLight);

    // 4. Central Emblem Group: Reflecting To Inspire's Winged Torch & Star Crest
    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    // Primary Diamond Star Material (Polished Champagne Gold in Dark, Amethyst-Gold in Light)
    const starMaterial = new THREE.MeshStandardMaterial({
      color: 0xdfb75c,
      metalness: 0.92,
      roughness: 0.18,
      envMapIntensity: 1.5
    });

    // Dark Obsidian / Deep Violet Accent Material (Mirroring the logo's right wing)
    const wingAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0x14161d,
      metalness: 0.85,
      roughness: 0.25
    });

    const ring1Material = new THREE.MeshStandardMaterial({
      color: 0xdfb75c,
      metalness: 0.90,
      roughness: 0.20
    });

    // A. The Apex Diamond Star (Faceted Double Pyramid)
    const starGeom = new THREE.OctahedronGeometry(0.85, 0);
    starGeom.scale(0.8, 1.45, 0.8);
    const starMesh = new THREE.Mesh(starGeom, starMaterial);
    starMesh.position.set(0, 0.45, 0);
    emblemGroup.add(starMesh);

    // B. Inner Radiant Core (Glowing polyhedral heart)
    const coreGeom = new THREE.IcosahedronGeometry(0.35, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xfff4d6,
      wireframe: true
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    coreMesh.position.set(0, 0.45, 0);
    emblemGroup.add(coreMesh);

    // C. The Winged Orbital Rings (Kinetic Gyroscope curves)
    const ring1Geom = new THREE.TorusGeometry(1.65, 0.032, 24, 100);
    const ring1Mesh = new THREE.Mesh(ring1Geom, ring1Material);
    ring1Mesh.rotation.x = Math.PI / 3;
    ring1Mesh.rotation.y = Math.PI / 6;
    emblemGroup.add(ring1Mesh);

    const ring2Geom = new THREE.TorusGeometry(2.1, 0.024, 24, 100);
    const ring2Mesh = new THREE.Mesh(ring2Geom, wingAccentMaterial);
    ring2Mesh.rotation.x = -Math.PI / 4;
    ring2Mesh.rotation.y = Math.PI / 3;
    emblemGroup.add(ring2Mesh);

    // D. Outer Delicate Halo
    const ring3Geom = new THREE.TorusGeometry(2.55, 0.015, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.45
    });
    const ring3Mesh = new THREE.Mesh(ring3Geom, ring3Mat);
    ring3Mesh.rotation.x = Math.PI / 2.2;
    emblemGroup.add(ring3Mesh);

    // 5. Ambient Stardust Particle Field (420 points)
    const particleCount = 420;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xe5c06e,
      size: 0.038,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    // Method to dynamically adapt WebGL scene to active theme
    const applyThemeToScene = (t) => {
      const isLight = t === 'light';
      if (isLight) {
        ambientLight.color.setHex(0xeae5f5);
        ambientLight.intensity = 1.4;
        keyLight.color.setHex(0xffffff);
        keyLight.intensity = 2.6;
        rimLight.color.setHex(0xc4b5fd);
        rimLight.intensity = 1.6;
        pointLight.color.setHex(0x7c3aed);
        pointLight.intensity = 2.2;

        starMaterial.color.setHex(0xa855f7);
        starMaterial.roughness = 0.22;
        wingAccentMaterial.color.setHex(0x3b1d54);
        ring1Material.color.setHex(0xd4af37);
        ring3Mat.color.setHex(0x8b5cf6);
        coreMat.color.setHex(0x7c3aed);
        particleMat.color.setHex(0x7c3aed);
        particleMat.opacity = 0.45;
      } else {
        ambientLight.color.setHex(0x181c26);
        ambientLight.intensity = 1.2;
        keyLight.color.setHex(0xfff1cf);
        keyLight.intensity = 3.2;
        rimLight.color.setHex(0x70a5f5);
        rimLight.intensity = 1.8;
        pointLight.color.setHex(0xd4af37);
        pointLight.intensity = 2.5;

        starMaterial.color.setHex(0xdfb75c);
        starMaterial.roughness = 0.18;
        wingAccentMaterial.color.setHex(0x14161d);
        ring1Material.color.setHex(0xdfb75c);
        ring3Mat.color.setHex(0xd4af37);
        coreMat.color.setHex(0xfff4d6);
        particleMat.color.setHex(0xe5c06e);
        particleMat.opacity = 0.65;
      }
    };

    // Apply initial theme state
    applyThemeToScene(themeRef.current);

    // Expose update handler
    lightingRef.current = {
      updateTheme: (newTheme) => applyThemeToScene(newTheme)
    };

    // 6. Interaction State Tracking (Mouse Parallax & Scroll Choreography)
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      if (prefersReducedMotion) return;
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetMouseX = (e.clientX - halfW) / halfW;
      targetMouseY = (e.clientY - halfH) / halfH;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation Loop with Continuous Physics & Scrollytelling Choreography
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse coordinates for butter-smooth parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Calculate scroll progress (0 to 1 across document)
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const scrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      const scrollY = window.scrollY;

      if (!prefersReducedMotion) {
        // Continuous Idle Rotations
        ring1Mesh.rotation.z = elapsedTime * 0.35;
        ring2Mesh.rotation.y = elapsedTime * 0.28;
        ring3Mesh.rotation.z = -elapsedTime * 0.18;
        coreMesh.rotation.x = elapsedTime * 0.5;
        coreMesh.rotation.y = elapsedTime * 0.4;
        starMesh.rotation.y = elapsedTime * 0.45;

        // Idle vertical float
        const hoverOffset = Math.sin(elapsedTime * 1.6) * 0.08;

        // Scroll Choreography Interpolations
        let targetX = 0;
        let targetY = hoverOffset;
        let targetZ = 0;
        let targetRotX = 0;
        let targetRotY = 0;
        let targetScale = 1;

        if (scrollY < 600) {
          // Hero Stage
          const p = scrollY / 600;
          targetX = 1.2 * p;
          targetY = hoverOffset - 0.2 * p;
          targetZ = -0.5 * p;
          targetRotY = p * 0.8;
          targetScale = 1 - 0.15 * p;
        } else if (scrollY < 1400) {
          // Services Stage (shifts right)
          const p = (scrollY - 600) / 800;
          targetX = 1.2 + 0.4 * p;
          targetY = -0.2 - 0.3 * p + hoverOffset;
          targetZ = -0.5 - 0.4 * p;
          targetRotX = 0.25 * p;
          targetRotY = 0.8 + 0.6 * p;
          targetScale = 0.85 - 0.1 * p;
        } else if (scrollY < 2400) {
          // Work / Showcase Stage (shifts left to allow cards on right)
          const p = (scrollY - 1400) / 1000;
          targetX = 1.6 - 3.2 * p;
          targetY = -0.5 + 0.3 * p + hoverOffset;
          targetZ = -0.9 - 0.2 * p;
          targetRotX = 0.25 - 0.3 * p;
          targetRotY = 1.4 + 0.8 * p;
          targetScale = 0.75 + 0.05 * p;
        } else if (scrollY < 3400) {
          // About / Philosophy Stage (re-centers with poetic prominence)
          const p = (scrollY - 2400) / 1000;
          targetX = -1.6 + 1.6 * p;
          targetY = -0.2 + 0.2 * p + hoverOffset;
          targetZ = -1.1 + 0.5 * p;
          targetRotY = 2.2 + 0.5 * p;
          targetScale = 0.8 + 0.15 * p;
        } else {
          // Team & Contact Stage
          const p = Math.min((scrollY - 3400) / 1000, 1);
          targetX = 0 + 1.1 * p;
          targetY = 0 - 0.4 * p + hoverOffset;
          targetZ = -0.6 - 0.3 * p;
          targetRotY = 2.7 + 0.6 * p;
          targetScale = 0.95 - 0.15 * p;
        }

        // Responsive multiplier for mobile viewports to prevent text obstruction
        const isMobile = window.innerWidth < 768;
        const responsiveXMult = isMobile ? 0.25 : 1.0;
        const responsiveScaleMult = isMobile ? 0.62 : 1.0;

        const finalTargetX = targetX * responsiveXMult;
        const finalTargetScale = targetScale * responsiveScaleMult;

        // Apply mouse parallax on top of target position
        emblemGroup.position.x += (finalTargetX + mouseX * (isMobile ? 0.15 : 0.45) - emblemGroup.position.x) * 0.06;
        emblemGroup.position.y += (targetY - mouseY * (isMobile ? 0.12 : 0.35) - emblemGroup.position.y) * 0.06;
        emblemGroup.position.z += (targetZ - emblemGroup.position.z) * 0.06;

        emblemGroup.rotation.x += (targetRotX + mouseY * 0.25 - emblemGroup.rotation.x) * 0.06;
        emblemGroup.rotation.y += (targetRotY + mouseX * 0.35 - emblemGroup.rotation.y) * 0.06;

        const currentScale = emblemGroup.scale.x;
        const newScale = currentScale + (finalTargetScale - currentScale) * 0.06;
        emblemGroup.scale.set(newScale, newScale, newScale);

        // Particle field subtle orbit
        particleSystem.rotation.y = elapsedTime * 0.04 + scrollProgress * 1.5;
        particleSystem.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      lightingRef.current = null;

      // Dispose Three.js resources
      starGeom.dispose();
      starMaterial.dispose();
      wingAccentMaterial.dispose();
      ring1Material.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      ring1Geom.dispose();
      ring2Geom.dispose();
      ring3Geom.dispose();
      ring3Mat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="three-canvas-container" aria-hidden="true">
      <canvas ref={canvasRef} className="three-webgl-canvas" />
      <div className="canvas-gradient-overlay" />
    </div>
  );
}
