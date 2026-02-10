'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './OrbitSystem.module.css';

/**
 * OrbitSystem - A 3D-style rotating system with mouse interaction
 * Replaces static visuals with a living, breathing AI core
 */
export default function OrbitSystem() {
    return (
        <div className={styles.orbitContainer}>
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
