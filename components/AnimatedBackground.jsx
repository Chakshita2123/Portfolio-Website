import { useEffect, useState } from 'react';
import styles from './AnimatedBackground.module.css';

export default function AnimatedBackground() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);

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

    return (
        <div className={styles.backgroundWrapper}>
            {/* Layer 1: Deep Slow Movement */}
            <div
                className={styles.gradientOrb1}
                style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
            ></div>

            {/* Layer 2: Mid-Depth Movement */}
            <div
                className={styles.gradientOrb2}
                style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}
            ></div>

            {/* Layer 3: Foreground Drift */}
            <div
                className={styles.gradientOrb3}
                style={{ transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)` }}
            ></div>

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
