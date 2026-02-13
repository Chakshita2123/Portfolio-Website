'use client';
import { useState, useEffect } from 'react';
import styles from './WelcomeIntro.module.css';

/**
 * WelcomeIntro - System-style AI intro experience
 * Features rotating AI core, data streams, pulse waves, floating particles
 */
export default function WelcomeIntro({ onComplete }) {
    const [phase, setPhase] = useState(0);
    const [exiting, setExiting] = useState(false);
    const [visible, setVisible] = useState(true);
    const [systemText, setSystemText] = useState('Initializing modules...');

    const systemMessages = [
        'Initializing modules...',
        'Calibrating interface...',
        'Loading preferences...',
        'System ready'
    ];

    useEffect(() => {
        // Phase 1: Initial fade in (0.5s)
        const phase1 = setTimeout(() => setPhase(1), 100);

        // Phase 2: Panels appear (1s)
        const phase2 = setTimeout(() => setPhase(2), 600);

        // Phase 3: Full system active (stays until exit)
        const phase3 = setTimeout(() => setPhase(3), 1500);

        // Rotate system messages
        let msgIndex = 0;
        const msgInterval = setInterval(() => {
            msgIndex = (msgIndex + 1) % systemMessages.length;
            setSystemText(systemMessages[msgIndex]);
        }, 1500);

        // Begin exit at 5 seconds
        const exitTimer = setTimeout(() => setExiting(true), 5000);

        // Complete after exit animation (1.4s) so handoff to site is seamless
        const completeTimer = setTimeout(() => {
            setVisible(false);
            onComplete?.();
        }, 6400);

        return () => {
            clearTimeout(phase1);
            clearTimeout(phase2);
            clearTimeout(phase3);
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
            clearInterval(msgInterval);
        };
    }, [onComplete]);

    if (!visible) return null;

    return (
        <div className={`${styles.overlay} ${exiting ? styles.exiting : ''}`}>
            {/* Ambient gradient background - BACKGROUND LAYER */}
            <div className={styles.ambientBg}>
                <div className={styles.gradientOrb1}></div>
                <div className={styles.gradientOrb2}></div>
                <div className={styles.gradientOrb3}></div>
                <div className={styles.vignette}></div>
            </div>

            {/* Color haze from core - BACKGROUND LAYER */}
            <div className={styles.colorHaze}></div>

            {/* Curved data streams - MIDGROUND LAYER - Reduced for performance */}
            <div className={styles.dataStreamField}>
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className={styles.dataStream}
                        style={{ '--i': i }}
                    >
                        <div className={styles.streamParticle}></div>
                    </div>
                ))}
            </div>

            {/* Floating particles - MIDGROUND LAYER - Reduced for performance */}
            <div className={styles.particleField}>
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className={styles.particle}
                        style={{
                            '--delay': `${i * 0.3}s`,
                            '--duration': `${12 + (i % 5) * 3}s`,
                            '--x': `${5 + (i * 6) % 90}%`,
                            '--y': `${5 + (i * 6) % 90}%`
                        }}
                    ></div>
                ))}
            </div>

            {/* Scattered system presence texts */}
            <div className={`${styles.systemPresence} ${styles.sp1} ${phase >= 2 ? styles.visible : ''}`}>
                Syncing modules
            </div>
            <div className={`${styles.systemPresence} ${styles.sp2} ${phase >= 2 ? styles.visible : ''}`}>
                Routing data
            </div>
            <div className={`${styles.systemPresence} ${styles.sp3} ${phase >= 3 ? styles.visible : ''}`}>
                Neural layer online
            </div>

            {/* Main content container - FOREGROUND LAYER */}
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
                        {/* Radial pulse waves */}
                        <div className={styles.pulseWave}></div>
                        <div className={`${styles.pulseWave} ${styles.pulseWave2}`}></div>
                        <div className={`${styles.pulseWave} ${styles.pulseWave3}`}></div>

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

                        {/* Additional outer rings for depth */}
                        <div className={`${styles.ring} ${styles.ring4}`}></div>
                        <div className={`${styles.ring} ${styles.ring5}`}></div>

                        {/* Outer glow ring */}
                        <div className={styles.glowRing}></div>
                    </div>
                </div>
            </div>

            {/* Corner system texts */}
            <div className={`${styles.cornerText} ${styles.topLeft} ${phase >= 2 ? styles.visible : ''}`}>
                <span>SYS.INIT</span>
            </div>
            <div className={`${styles.cornerText} ${styles.topRight} ${phase >= 2 ? styles.visible : ''}`}>
                <span>v2.0.1</span>
            </div>
            <div className={`${styles.cornerText} ${styles.bottomLeft} ${phase >= 3 ? styles.visible : ''}`}>
                <span>NODE: ACTIVE</span>
            </div>

            {/* Bottom system message */}
            <div className={`${styles.bottomMessage} ${phase >= 3 ? styles.visible : ''}`}>
                <span className={styles.systemText}>{systemText}</span>
            </div>
        </div>
    );
}
