'use client';
import Link from 'next/link';
import styles from './AboutPreview.module.css';

export default function AboutPreview() {
    return (
        <section id="about" className={`section ${styles.about}`}>
            <div className={`container ${styles.aboutContainer}`}>
                <div className={styles.content}>
                    <span className="section-label">About Me</span>

                    <h2 className="section-title">
                        Developer. Builder. <span className="gradient-text">Problem Solver.</span>
                    </h2>

                    <p className={styles.summary}>
                        I'm a full-stack developer with a growing focus on applied AI/ML —
                        building products end-to-end rather than just wrapping LLM APIs.
                        My work spans React/Next.js frontends, Node.js/MongoDB backends, and
                        increasingly, real model training (regression, prediction pipelines)
                        alongside LLM integration for features like OCR, chat, and recommendations.
                    </p>

                    <p className={styles.summary}>
                        Currently a B.Tech CSE student, building projects that solve real
                        problems — from AI-assisted code review to native Android apps to
                        ML-driven predictions. Currently open to internships and full-time
                        opportunities.
                    </p>

                    <div className={styles.infoRow}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoIcon}>🎓</span>
                            <span className={styles.infoText}>B.Tech in Computer Science</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoIcon}>📍</span>
                            <span className={styles.infoText}>India</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoIcon}>💼</span>
                            <span className={styles.infoText}>Open to opportunities</span>
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Link href="/about" className="btn btn-secondary">
                        More About Me →
                    </Link>
                    <Link href="/projects" className="btn btn-ghost">
                        See My Work →
                    </Link>
                </div>
            </div>
        </section>
    );
}
