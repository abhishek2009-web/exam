import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeCanvas = ({ themeMode = 'cyan', activeCategory = 'engineering' }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Color Palettes based on active exam category
    let primaryColorHex = 0x00f2fe;
    let secondaryColorHex = 0x4facfe;

    if (activeCategory === 'medical') {
      primaryColorHex = 0x10b981;
      secondaryColorHex = 0x14b8a6;
    } else if (activeCategory === 'civil_services') {
      primaryColorHex = 0xfbbf24;
      secondaryColorHex = 0xf97316;
    } else if (activeCategory === 'management') {
      primaryColorHex = 0xe100ff;
      secondaryColorHex = 0x7f00ff;
    } else if (activeCategory === 'law') {
      primaryColorHex = 0x3b82f6;
      secondaryColorHex = 0x6366f1;
    } else if (activeCategory === 'banking_gov') {
      primaryColorHex = 0x06b6d4;
      secondaryColorHex = 0x0284c7;
    } else if (activeCategory === 'global') {
      primaryColorHex = 0x8b5cf6;
      secondaryColorHex = 0xc084fc;
    }

    // 3. Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(primaryColorHex, 2, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(secondaryColorHex, 1.5, 50);
    pointLight2.position.set(-10, -10, 5);
    scene.add(pointLight2);

    // 4. Particle Constellation
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      scales[i] = Math.random() * 0.15 + 0.05;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: primaryColorHex,
      size: 0.18,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // 5. Category-Specific Main 3D Mesh
    let mainGroup = new THREE.Group();

    if (activeCategory === 'medical') {
      // DNA Helix Strand
      const helixGeometry = new THREE.TorusKnotGeometry(4.5, 0.8, 100, 16);
      const helixMaterial = new THREE.MeshStandardMaterial({
        color: primaryColorHex,
        wireframe: true,
        roughness: 0.2,
        metalness: 0.8
      });
      const helixMesh = new THREE.Mesh(helixGeometry, helixMaterial);
      mainGroup.add(helixMesh);
    } else if (activeCategory === 'civil_services' || activeCategory === 'management') {
      // Golden Polyhedron Rings
      const ringGeo = new THREE.TorusGeometry(5, 0.4, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: primaryColorHex,
        wireframe: false,
        roughness: 0.3,
        metalness: 0.9
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      
      const innerIcoGeo = new THREE.IcosahedronGeometry(2.5, 0);
      const innerIcoMat = new THREE.MeshStandardMaterial({
        color: secondaryColorHex,
        wireframe: true
      });
      const innerIcoMesh = new THREE.Mesh(innerIcoGeo, innerIcoMat);

      mainGroup.add(ringMesh);
      mainGroup.add(innerIcoMesh);
    } else {
      // Engineering Default: Wireframe Polyhedron with inner glowing sphere
      const icoGeo = new THREE.IcosahedronGeometry(4, 1);
      const icoMat = new THREE.MeshStandardMaterial({
        color: primaryColorHex,
        wireframe: true,
        roughness: 0.1,
        metalness: 0.9
      });
      const icoMesh = new THREE.Mesh(icoGeo, icoMat);

      const sphereGeo = new THREE.SphereGeometry(1.8, 32, 32);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: secondaryColorHex,
        roughness: 0.2,
        metalness: 0.5,
        transparent: true,
        opacity: 0.8
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);

      mainGroup.add(icoMesh);
      mainGroup.add(sphereMesh);
    }

    mainGroup.position.set(7, 0, -2);
    scene.add(mainGroup);

    // 6. Interactive Parallax Mouse Movement
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate Main 3D Objects
      mainGroup.rotation.x += 0.005;
      mainGroup.rotation.y += 0.008;

      // Rotate Particles
      particles.rotation.y += 0.0008;

      // Parallax smooth camera movement
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeCategory, themeMode]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
    />
  );
};
