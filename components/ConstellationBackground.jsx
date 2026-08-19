'use client';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import styles from './ConstellationBackground.module.css';

/**
 * 4 Featured Project Stars in the Constellation
 */
const PROJECT_STARS = [
  {
    id: 'code-review-ai',
    name: 'Code Review AI',
    tag: 'Full Stack AI',
    position: [-4.2, 2.8, 2.5],
    targetId: 'projects'
  },
  {
    id: 'markd',
    name: 'MARKD',
    tag: 'Android & Vision',
    position: [4.6, 1.5, 1.2],
    targetId: 'projects'
  },
  {
    id: 'journey-curator',
    name: 'Journey Curator',
    tag: 'ML & Prediction',
    position: [-3.6, -2.6, 3.0],
    targetId: 'projects'
  },
  {
    id: 'portfolio',
    name: 'This Portfolio',
    tag: 'Next.js & 3D',
    position: [3.8, -3.2, 2.0],
    targetId: 'projects'
  }
];

/**
 * StarField - High-performance instanced background points with varying depths
 */
function StarField({ isMobile }) {
  const pointsRef = useRef();

  const count = isMobile ? 85 : 190;

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Wide 3D volume for realistic multi-plane depth
      pos[i * 3] = (Math.random() - 0.5) * 36;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 34;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22 - 2;

      scl[i] = Math.random() * 0.8 + 0.6;
    }

    return [pos, scl];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Gentle ambient drift
      pointsRef.current.rotation.y += delta * 0.012;
      pointsRef.current.rotation.x += delta * 0.006;
    }
  });

  return (
    <group ref={pointsRef}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#93A886"
          size={isMobile ? 0.13 : 0.17}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.55}
        />
      </Points>
    </group>
  );
}

/**
 * ProjectStar - An emissive, meaningful star representing a project with HTML label
 */
function ProjectStar({ star, isMobile }) {
  const meshRef = useRef();
  const haloRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (haloRef.current) {
      // Breathing pulse on halo
      const pulse = Math.sin(time * 2.2 + (star.position[0] * 0.5)) * 0.15 + 1;
      haloRef.current.scale.set(pulse, pulse, pulse);
    }
    if (meshRef.current && hovered) {
      meshRef.current.scale.set(1.25, 1.25, 1.25);
    } else if (meshRef.current) {
      meshRef.current.scale.set(1, 1, 1);
    }
  });

  const handleClick = () => {
    const el = document.getElementById(star.targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <group position={star.position}>
      {/* Emissive core star */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <sphereGeometry args={[isMobile ? 0.16 : 0.22, 24, 24]} />
        <meshStandardMaterial
          color="#6B7F5E"
          emissive="#93A886"
          emissiveIntensity={hovered ? 1.4 : 0.85}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      {/* Soft glowing outer halo */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[isMobile ? 0.32 : 0.44, 16, 16]} />
        <meshBasicMaterial
          color="#93A886"
          transparent
          opacity={hovered ? 0.4 : 0.22}
          depthWrite={false}
        />
      </mesh>

      {/* Floating 3D HTML Tooltip Overlay */}
      <Html
        distanceFactor={18}
        position={[0, 0, 0]}
        center={false}
        zIndexRange={[100, 0]}
      >
        <div
          className={styles.projectTooltip}
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          title={`Click to view ${star.name}`}
        >
          <span className={styles.tooltipDot} />
          <span className={styles.tooltipLabel}>{star.name}</span>
          {star.tag && <span className={styles.tooltipTag}>{star.tag}</span>}
        </div>
      </Html>
    </group>
  );
}

/**
 * ConstellationScene - Contains stars, project path, and camera parallax controller
 */
function ConstellationScene({ isMobile, mousePos, scrollProgress }) {
  const { camera } = useThree();
  const groupRef = useRef();

  // Coordinates for the connected journey path between the 4 project stars
  const pathPoints = useMemo(() => {
    const pts = PROJECT_STARS.map((s) => s.position);
    return [pts[0], pts[1], pts[3], pts[2], pts[0]]; // Closed connected journey path
  }, []);

  useFrame(() => {
    if (!isMobile) {
      // Smooth lerp camera parallax based on mouse
      const targetX = mousePos.current.x * 0.75;
      const targetY = mousePos.current.y * 0.45;

      camera.position.x += (targetX - camera.position.x) * 0.03;
      camera.position.y += (targetY - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
    }

    if (groupRef.current) {
      // Subtle rotation linked to scroll
      groupRef.current.rotation.y = scrollProgress.current * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Background Starfield */}
      <StarField isMobile={isMobile} />

      {/* Thin Connected Line Path between the 4 project stars */}
      <Line
        points={pathPoints}
        color="#93A886"
        lineWidth={isMobile ? 0.8 : 1.2}
        transparent
        opacity={0.3}
        dashed={false}
      />

      {/* 4 Interactive Project Stars */}
      {PROJECT_STARS.map((star) => (
        <ProjectStar key={star.id} star={star} isMobile={isMobile} />
      ))}
    </group>
  );
}

/**
 * ConstellationBackground Component
 * Mount once at root layout level behind all content
 */
export default function ConstellationBackground() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();

    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollProgress.current = window.scrollY / maxScroll;
      }
    };

    window.addEventListener('resize', checkMobile, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!mounted) {
    return (
      <div className={styles.canvasContainer} aria-hidden="true">
        <div className={styles.ambientVignette} />
      </div>
    );
  }

  return (
    <div className={styles.canvasContainer} aria-hidden="true">
      <div className={styles.ambientVignette} />
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <ambientLight intensity={0.65} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.4} color="#93A886" />
        <ConstellationScene
          isMobile={isMobile}
          mousePos={mousePos}
          scrollProgress={scrollProgress}
        />
      </Canvas>
    </div>
  );
}
