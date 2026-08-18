import { useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FaFileDownload, FaArrowDown } from 'react-icons/fa';
import useMouse3D from '../hooks/useMouse3D';
import styles from './Hero.module.css';

// Lazy-load the interactive 3D Neural Engineering element to ensure zero SSR blockage
const Hero3DElement = dynamic(() => import('./Hero3DElement'), {
    ssr: false,
    loading: () => <div className={styles.blobSkeleton} />
});

export default function Hero() {
    const heroRef = useRef(null);
    const contentRef = useRef(null);

    // Subtle 3D tilt on content
    useMouse3D(heroRef, contentRef, 4);

    return (
        <section id="home" className={styles.hero} ref={heroRef}>
            <div
                className={`container ${styles.heroContainer}`}
                style={{ perspective: '1000px' }}
            >
                <div
                    className={styles.heroContent}
                    ref={contentRef}
                    style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                >
                    <span className={`${styles.greeting} ${styles.animateIn}`}>
                        Hi, I'm Chakshita
                    </span>

                    <h1 className={`${styles.headline} ${styles.animateIn} ${styles.delay1}`}>
                        Full-Stack Developer &amp;{' '}
                        <span className="gradient-text">Applied AI/ML Builder</span>
                    </h1>

                    <p className={`${styles.description} ${styles.animateIn} ${styles.delay2}`}>
                        I build products end-to-end — from native apps to ML models trained
                        from scratch — not just LLM API wrappers.
                    </p>

                    <div className={`${styles.ctas} ${styles.animateIn} ${styles.delay3}`}>
                        <Link href="/projects" className="btn btn-primary">
                            View Projects <span>→</span>
                        </Link>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`btn btn-secondary ${styles.resumeBtn}`}
                        >
                            <FaFileDownload /> Download Resume
                        </a>
                        <Link href="/ask-ai" className="btn btn-ghost">
                            Ask AI <span>✨</span>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className={`${styles.stats} ${styles.animateIn} ${styles.delay4}`}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>4+</span>
                            <span className={styles.statLabel}>Real Projects</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>Full</span>
                            <span className={styles.statLabel}>Stack</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>ML</span>
                            <span className={styles.statLabel}>+ LLM</span>
                        </div>
                    </div>
                </div>

                {/* Right column — 3D Central Geometric Shape + Neural Network Nodes */}
                <div className={`${styles.heroVisual} ${styles.animateIn} ${styles.delay2}`}>
                    <Hero3DElement />
                </div>
            </div>

            {/* Subtle Scroll Down Indicator */}
            <div className={styles.scrollIndicator}>
                <a href="#about" aria-label="Scroll down to About section" className={styles.scrollLink}>
                    <FaArrowDown className={styles.scrollIcon} />
                </a>
            </div>
        </section>
    );
}
