'use client';
import { useEffect, useRef, useMemo } from 'react';
import { usePerformanceTier } from '@/hooks/usePerformanceTier';
import styles from './AnimatedBackground.module.css';

/**
 * Optimized AnimatedBackground - Uses direct DOM manipulation for parallax
 * and memoization for particles to avoid React re-renders on mouse move.
 */
export default function AnimatedBackground() {
    const orb1Ref = useRef(null);
    const orb2Ref = useRef(null);
    const orb3Ref = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef(0);
    const { reducedMotion, lowTier } = usePerformanceTier();

    // Memoize particles so they're only generated once
    const particles = useMemo(() => {
        return Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 10 + Math.random() * 20,
            size: Math.random() * 3 + 1
        }));
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

            {/* Cinematic Particles - Skip when reduced motion */}
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
                                animationDuration: `${p.duration}s`
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Cinematic Noise Overlay */}
            <div className={styles.noiseOverlay}></div>
        </div>
    );
}
