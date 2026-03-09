'use client';
import { useEffect, useRef, useState } from 'react';
import { usePerformanceTier } from '@/hooks/usePerformanceTier';
import styles from './AnimatedBackground.module.css';

/**
 * Enhanced AnimatedBackground - Premium cinematic effects
 * Includes: gradient orbs, aurora waves, shooting stars,
 * perspective grid, floating particles, and parallax mouse tracking.
 */
export default function AnimatedBackground() {
    const orb1Ref = useRef(null);
    const orb2Ref = useRef(null);
    const orb3Ref = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef(0);
    const { reducedMotion, lowTier } = usePerformanceTier();

    // Generate particles only on the client to avoid SSR hydration mismatch
    const [particles, setParticles] = useState([]);
    const [shootingStars, setShootingStars] = useState([]);

    useEffect(() => {
        setParticles(
            Array.from({ length: 30 }).map((_, i) => ({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 100,
                delay: Math.random() * 8,
                duration: 8 + Math.random() * 20,
                size: Math.random() * 3 + 1,
                drift: (Math.random() - 0.5) * 60,
            }))
        );
        setShootingStars(
            Array.from({ length: 4 }).map((_, i) => ({
                id: i,
                top: Math.random() * 50,
                left: Math.random() * 70,
                delay: i * 4 + Math.random() * 3,
                duration: 1.5 + Math.random() * 1,
                angle: 15 + Math.random() * 30,
            }))
        );
    }, []);

    useEffect(() => {
        if (reducedMotion || lowTier) return;

        const orb1 = orb1Ref.current;
        const orb2 = orb2Ref.current;
        const orb3 = orb3Ref.current;
        if (!orb1 || !orb2 || !orb3) return;

        const handleMouseMove = (e) => {
            targetRef.current = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1
            };
        };

        // Smooth animation loop with LERP
        const tick = () => {
            const t = targetRef.current;
            const m = mouseRef.current;

            // LERP for smooth movement
            m.x += (t.x - m.x) * 0.05;
            m.y += (t.y - m.y) * 0.05;

            // Direct DOM updates - no React re-renders
            orb1.style.transform = `translate(${m.x * -35}px, ${m.y * -35}px)`;
            orb2.style.transform = `translate(${m.x * 50}px, ${m.y * 50}px)`;
            orb3.style.transform = `translate(${m.x * -70}px, ${m.y * -70}px)`;

            rafRef.current = requestAnimationFrame(tick);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, [reducedMotion, lowTier]);

    const reduceMotion = reducedMotion || lowTier;

    return (
        <div
            className={styles.backgroundWrapper}
            data-reduced-motion={reduceMotion ? 'true' : 'false'}
        >
            {/* Layer 1: Deepest parallax - hero background depth */}
            <div ref={orb1Ref} className={styles.gradientOrb1} />

            {/* Layer 2: Mid-depth */}
            <div ref={orb2Ref} className={styles.gradientOrb2} />

            {/* Layer 3: Foreground - strongest parallax */}
            <div ref={orb3Ref} className={styles.gradientOrb3} />

            {/* Aurora Wave Effect */}
            {!reduceMotion && (
                <div className={styles.auroraContainer}>
                    <div className={styles.auroraWave1} />
                    <div className={styles.auroraWave2} />
                    <div className={styles.auroraWave3} />
                </div>
            )}

            {/* Perspective Grid Floor */}
            <div className={styles.gridContainer}>
                <div className={styles.perspectiveGrid} />
            </div>

            {/* Shooting Stars */}
            {!reduceMotion && (
                <div className={styles.shootingStarsContainer}>
                    {shootingStars.map((star) => (
                        <div
                            key={star.id}
                            className={styles.shootingStar}
                            style={{
                                top: `${star.top}%`,
                                left: `${star.left}%`,
                                animationDelay: `${star.delay}s`,
                                animationDuration: `${star.duration}s`,
                                '--star-angle': `${star.angle}deg`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Enhanced Cinematic Particles */}
            {!reduceMotion && (
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
                                animationDuration: `${p.duration}s`,
                                '--drift-x': `${p.drift}px`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Vignette Overlay */}
            <div className={styles.vignetteOverlay} />

            {/* Cinematic Noise Overlay */}
            <div className={styles.noiseOverlay}></div>
        </div>
    );
}
