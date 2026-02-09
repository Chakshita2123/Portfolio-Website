'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './OrbitSystem.module.css';

/**
 * OrbitSystem - A 3D-style rotating system with mouse interaction
 * Replaces static visuals with a living, breathing AI core
 */
export default function OrbitSystem() {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Calculate rotation based on mouse position (subtle tilt)
        const rotateX = (y / rect.height) * -20; // Invert Y for natural tilt
        const rotateY = (x / rect.width) * 20;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div
            className={styles.orbitContainer}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                '--rotate-x': `${rotation.x}deg`,
                '--rotate-y': `${rotation.y}deg`
            }}
        >
            <div className={styles.system}>
                {/* Core Nucleus */}
                <div className={styles.nucleus}>
                    <div className={styles.coreGlow}></div>
                </div>

                {/* Rotating Rings */}
                <div className={`${styles.ring} ${styles.ring1}`}></div>
                <div className={`${styles.ring} ${styles.ring2}`}></div>
                <div className={`${styles.ring} ${styles.ring3}`}></div>

                {/* Orbital Nodes */}
                <div className={`${styles.orbit} ${styles.orbit1}`}>
                    <div className={styles.planet}></div>
                </div>
                <div className={`${styles.orbit} ${styles.orbit2}`}>
                    <div className={styles.planet}></div>
                </div>
            </div>
        </div>
    );
}
