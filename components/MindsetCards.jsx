'use client';
import { useRef, useCallback, useState } from 'react';
import styles from './MindsetCards.module.css';

/**
 * Interactive mindset cards with 3D tilt, cursor glow, and click ripple.
 * All effects are disabled when prefers-reduced-motion is active.
 */
export default function MindsetCards({ cards }) {
    return (
        <div className={styles.mindsetGrid}>
            {cards.map((card, index) => (
                <MindsetCard key={index} card={card} index={index} />
            ))}
        </div>
    );
}

function MindsetCard({ card, index }) {
    const cardRef = useRef(null);
    const [ripples, setRipples] = useState([]);

    // ── 3D tilt + glow follow ──
    const handleMouseMove = useCallback((e) => {
        const el = cardRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left; // cursor X inside card
        const y = e.clientY - rect.top;  // cursor Y inside card
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        // Rotation: ±12 deg max
        const rotateY = ((x - cx) / cx) * 12;
        const rotateX = ((cy - y) / cy) * 12;

        el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;

        // Move glow overlay
        const glowEl = el.querySelector('[data-glow]');
        if (glowEl) {
            glowEl.style.background = `radial-gradient(circle 180px at ${x}px ${y}px, rgba(14,165,233,0.12), transparent 70%)`;
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        const el = cardRef.current;
        if (!el) return;
        el.style.transform = '';
        const glowEl = el.querySelector('[data-glow]');
        if (glowEl) {
            glowEl.style.background = '';
        }
    }, []);

    // ── Click ripple ──
    const handleClick = useCallback((e) => {
        const el = cardRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height) * 2.5;

        const id = Date.now();
        setRipples((prev) => [...prev, { id, x, y, size }]);

        // Clean up after animation
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 650);
    }, []);

    return (
        <div className={styles.cardWrapper}>
            <div
                ref={cardRef}
                className={styles.card}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                style={{ animationDelay: `${index * 0.1}s` }}
            >
                {/* Glow overlay */}
                <div data-glow className={styles.glowOverlay} />

                {/* Click ripples */}
                {ripples.map((r) => (
                    <span
                        key={r.id}
                        className={styles.ripple}
                        style={{
                            left: r.x - r.size / 2,
                            top: r.y - r.size / 2,
                            width: r.size,
                            height: r.size,
                        }}
                    />
                ))}

                {/* Card content */}
                <div className={styles.cardContent}>
                    <span className={styles.icon}>{card.icon}</span>
                    <h3 className={styles.title}>{card.title}</h3>
                    <p className={styles.description}>{card.description}</p>
                </div>
            </div>
        </div>
    );
}
