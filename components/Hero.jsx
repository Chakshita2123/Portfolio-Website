import { useRef } from 'react';
import Link from 'next/link';
import useMouse3D from '../hooks/useMouse3D';
import styles from './Hero.module.css';
import AnimatedBackground from './AnimatedBackground';
import OrbitSystem from './OrbitSystem';

export default function Hero() {
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const visualRef = useRef(null);

    // Apply 3D tilt to content (subtle)
    useMouse3D(heroRef, contentRef, 5);

    // Apply 3D tilt to orbit system (stronger but smoother)
    useMouse3D(heroRef, visualRef, 15);

    return (
        <section id="home" className={styles.hero} ref={heroRef}>
            {/* Living animated background */}
            <AnimatedBackground />

            <div
                className={`container ${styles.heroContainer}`}
                style={{
                    perspective: '1000px'
                }}
            >
                {/* Left Column - Content */}
                <div
                    className={styles.heroContent}
                    ref={contentRef}
                    style={{
                        // Initial transform for static rendering, 
                        // hook will override with 3D transform on mount
                        transform: 'translateZ(0)',
                        willChange: 'transform'
                    }}
                >
                    <span className={`${styles.greeting} ${styles.animateIn}`}>Hi, I'm Chakshita 👋</span>

                    <h1 className={`${styles.headline} ${styles.animateIn} ${styles.delay1}`}>
                        An <span className="gradient-text">AI-Powered</span> Portfolio,
                        <br />Not Just a Resume
                    </h1>

                    <p className={`${styles.description} ${styles.animateIn} ${styles.delay2}`}>
                        I design and build intelligent, user-centric web experiences
                        using modern frontend technologies. This portfolio thinks,
                        adapts, and responds — showcasing not just my work, but my vision.
                    </p>

                    <div className={`${styles.ctas} ${styles.animateIn} ${styles.delay3}`}>
                        <Link href="/ask-ai" className="btn btn-primary">
                            Ask Chakshita AI <span>✨</span>
                        </Link>
                        <Link href="/projects" className="btn btn-secondary">
                            View Projects <span>→</span>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className={`${styles.stats} ${styles.animateIn} ${styles.delay4}`}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>10+</span>
                            <span className={styles.statLabel}>Projects</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>5+</span>
                            <span className={styles.statLabel}>Technologies</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>AI</span>
                            <span className={styles.statLabel}>Powered</span>
                        </div>
                    </div>
                </div>

                {/* Right Column - Visual */}
                <div className={`${styles.heroVisual} ${styles.animateIn} ${styles.delay2}`}>
                    <div
                        className={styles.visualContainer}
                        ref={visualRef}
                        style={{
                            willChange: 'transform'
                        }}
                    >
                        {/* Abstract AI Visual */}
                        {/* 3D Orbit System */}
                        <OrbitSystem />

                        {/* Floating Cards */}
                        <div className={`${styles.floatingCard} ${styles.card1} card-3d`}>
                            <span className={styles.cardIcon}>🧠</span>
                            <span className={styles.cardText}>AI Ready</span>
                        </div>

                        <div className={`${styles.floatingCard} ${styles.card2} card-3d`}>
                            <span className={styles.cardIcon}>⚡</span>
                            <span className={styles.cardText}>Fast & Modern</span>
                        </div>

                        <div className={`${styles.floatingCard} ${styles.card3} card-3d`}>
                            <span className={styles.cardIcon}>🎯</span>
                            <span className={styles.cardText}>Personalized</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Hint */}
            <div className={styles.scrollHint}>
                <span className={styles.scrollHintText}>Scroll to explore how this portfolio is designed to think.</span>
            </div>
        </section>
    );
}
