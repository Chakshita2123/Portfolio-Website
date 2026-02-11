'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './AdaptiveIntroduction.module.css';

const modes = [
    {
        id: 'tech',
        label: 'Technical View',
        summary: "I build high-quality web applications using React and Next.js. My focus is on writing clean, efficient code that ensures websites run fast and smoothly."
    },
    {
        id: 'product',
        label: 'Product Perspective',
        summary: "I think like a product manager. I prioritize user needs and build features that are actually useful, ensuring the final product solves real-world problems."
    },
    {
        id: 'creative',
        label: 'Creative Lens',
        summary: "I care deeply about design. I use modern styling, smooth animations, and clean layouts to create websites that look premium and feel great to use."
    },
    {
        id: 'vision',
        label: 'Vision Mode',
        summary: "I am bridging the gap between standard web development and Artificial Intelligence. I build smart interfaces that go beyond static pages."
    }
];

const statusMessages = [
    "Reading my profile...",
    "Checking my skills...",
    "Adjusting the style...",
    "Writing summary...",
    "Optimizing..."
];

export default function AdaptiveIntroduction() {
    const [activeMode, setActiveMode] = useState('tech');
    const [statusIndex, setStatusIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [showActivation, setShowActivation] = useState(false);
    const containerRef = useRef(null);

    // Rotating status line
    useEffect(() => {
        const interval = setInterval(() => {
            setStatusIndex((prev) => (prev + 1) % statusMessages.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    // Scroll Reveal
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    setShowActivation(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    const currentMode = modes.find(m => m.id === activeMode);

    return (
        <div
            ref={containerRef}
            className={`${styles.container} ${isVisible ? styles.visible : styles.hidden}`}
        >
            {/* Activation Overlay (One-time animation) */}
            {showActivation && (
                <div className={styles.activationOverlay} onAnimationEnd={() => setShowActivation(false)}>
                    <div className={styles.activationText}>AI Module Activated</div>
                </div>
            )}

            {/* Header */}
            <div className={styles.header}>
                <div className={styles.titleBlock}>
                    <h3 className={styles.title}>Adaptive Introduction Engine (Beta)</h3>
                    <div className={styles.activityLine}>
                        <div className={styles.spinner}></div>
                        <span className={styles.activityText}>{statusMessages[statusIndex]}</span>
                    </div>
                </div>
                <span className={styles.badge}>AI Module v0.2 • Preview</span>
            </div>

            {/* Interactive Mode Pills */}
            <div className={styles.modeSelector}>
                {modes.map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => setActiveMode(mode.id)}
                        className={`${styles.modePill} ${activeMode === mode.id ? styles.activePill : ''}`}
                    >
                        {mode.label}
                    </button>
                ))}
            </div>

            {/* Dynamic Content Area */}
            <div className={styles.contentArea}>
                <p key={activeMode} className={`${styles.summaryText} ${styles.animateText}`}>
                    {currentMode.summary}
                </p>
            </div>

            {/* System Indicators */}
            <div className={styles.statusBar}>
                <div className={styles.statusItem}>
                    <div className={styles.statusDot}></div>
                    <span>Profile Loaded</span>
                </div>
                <div className={styles.statusItem}>
                    <div className={styles.statusDot}></div>
                    <span>Projects Ready</span>
                </div>
                <div className={styles.statusItem}>
                    <div className={`${styles.statusDot} ${styles.optimizingDot}`}></div>
                    <span>Optimizing...</span>
                </div>
                <div className={styles.statusItem}>
                    <span>AI Beta</span>
                </div>
            </div>

            {/* Philosophy Line */}
            <p className={styles.philosophy}>
                "Most portfolios are static. This one adapts."
            </p>
        </div>
    );
}
