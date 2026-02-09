'use client';
import { useState, useEffect } from 'react';
import styles from './WelcomeIntro.module.css';

/**
 * WelcomeIntro - System-style AI intro experience
 * Features rotating AI core, glassmorphic panels, dark ambient background
 */
export default function WelcomeIntro({ onComplete }) {
    const [phase, setPhase] = useState(0);
    const [exiting, setExiting] = useState(false);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Phase 1: Initial fade in (0.5s)
        const phase1 = setTimeout(() => setPhase(1), 100);

        // Phase 2: Panels appear (1s)
        const phase2 = setTimeout(() => setPhase(2), 600);

        // Phase 3: Full system active (stays until exit)
        const phase3 = setTimeout(() => setPhase(3), 1500);

        // Begin exit at 6 seconds
        const exitTimer = setTimeout(() => setExiting(true), 6000);

        // Complete at 7 seconds
        const completeTimer = setTimeout(() => {
            setVisible(false);
            onComplete?.();
        }, 7000);

        return () => {
            clearTimeout(phase1);
            clearTimeout(phase2);
            clearTimeout(phase3);
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    if (!visible) return null;

    return (
        <div className={`${styles.overlay} ${exiting ? styles.exiting : ''}`}>
            {/* Ambient gradient background */}
            <div className={styles.ambientBg}>
                <div className={styles.gradientOrb1}></div>
                <div className={styles.gradientOrb2}></div>
            </div>

            {/* Main content container */}
            <div className={styles.container}>
                {/* Left side - System panels */}
                <div className={`${styles.leftSection} ${phase >= 1 ? styles.visible : ''}`}>
                    {/* Status panel */}
                    <div className={`${styles.panel} ${styles.statusPanel} ${phase >= 2 ? styles.visible : ''}`}>
                        <div className={styles.panelHeader}>
                            <span className={styles.statusDot}></span>
                            <span className={styles.panelLabel}>SYSTEM STATUS</span>
                        </div>
                        <div className={styles.statusText}>Online</div>
                    </div>

                    {/* Welcome text */}
                    <div className={`${styles.welcomeSection} ${phase >= 2 ? styles.visible : ''}`}>
                        <span className={styles.welcomeLabel}>WELCOME TO</span>
                        <h1 className={styles.brandName}>
                            Chakshita<span className={styles.accent}>.ai</span>
                        </h1>
                        <p className={styles.tagline}>AI-Powered Portfolio System</p>
                    </div>

                    {/* Info panel */}
                    <div className={`${styles.panel} ${styles.infoPanel} ${phase >= 3 ? styles.visible : ''}`}>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Intelligence</span>
                            <span className={styles.infoValue}>Active</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Experience</span>
                            <span className={styles.infoValue}>Personalized</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Interface</span>
                            <span className={styles.infoValue}>Ready</span>
                        </div>
                    </div>
                </div>

                {/* Right side - AI Core */}
                <div className={`${styles.rightSection} ${phase >= 1 ? styles.visible : ''}`}>
                    <div className={`${styles.aiCore} ${exiting ? styles.coreExiting : ''}`}>
                        {/* Central orb */}
                        <div className={styles.coreCenter}></div>

                        {/* Rotating rings */}
                        <div className={`${styles.ring} ${styles.ring1}`}>
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className={styles.node} style={{ '--i': i }}></div>
                            ))}
                        </div>
                        <div className={`${styles.ring} ${styles.ring2}`}>
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className={styles.node} style={{ '--i': i }}></div>
                            ))}
                        </div>
                        <div className={`${styles.ring} ${styles.ring3}`}>
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className={styles.nodeLarge} style={{ '--i': i }}></div>
                            ))}
                        </div>

                        {/* Outer glow ring */}
                        <div className={styles.glowRing}></div>
                    </div>
                </div>
            </div>

            {/* Bottom system message */}
            <div className={`${styles.bottomMessage} ${phase >= 3 ? styles.visible : ''}`}>
                <span className={styles.systemText}>Initializing personalized experience...</span>
            </div>
        </div>
    );
}
