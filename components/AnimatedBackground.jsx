'use client';
import { useEffect, useState } from 'react';
import usePerformanceTier from '@/hooks/usePerformanceTier';
import styles from './AnimatedBackground.module.css';

export default function AnimatedBackground() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);
    const { reducedMotion, lowTier } = usePerformanceTier();

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
            const y = (e.clientY / window.innerHeight) * 2 - 1; // -1 to 1
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Generate static particles for cinematic dust effect
        const newParticles = Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 10 + Math.random() * 20,
            size: Math.random() * 3 + 1
        }));
        setParticles(newParticles);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const reduceMotion = reducedMotion || lowTier;

    return (
        <div
            className={styles.backgroundWrapper}
            data-reduced-motion={reduceMotion ? 'true' : 'false'}
        >
            {/* Layer 1: Deepest parallax - hero background depth */}
            <div
                className={styles.gradientOrb1}
                style={{ transform: `translate(${mousePos.x * -35}px, ${mousePos.y * -35}px)` }}
            />

            {/* Layer 2: Mid-depth */}
            <div
                className={styles.gradientOrb2}
                style={{ transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px)` }}
            />

            {/* Layer 3: Foreground - strongest parallax */}
            <div
                className={styles.gradientOrb3}
                style={{ transform: `translate(${mousePos.x * -70}px, ${mousePos.y * -70}px)` }}
            />

            {/* Cinematic Particles */}
            <div className={styles.particlesContainer}>
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className={styles.particle}
                        style={{
                            left: `${p.left}%`,
                            top: `${p.top}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            animationDelay: `${p.delay}s`,
                            animationDuration: `${p.duration}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Cinematic Noise Overlay */}
            <div className={styles.noiseOverlay}></div>
        </div>
    );
}
