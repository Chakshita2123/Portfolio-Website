'use client';
import Link from 'next/link';
import { FaGraduationCap, FaMapMarkerAlt, FaBriefcase, FaCode, FaRobot, FaMobileAlt, FaLayerGroup } from 'react-icons/fa';
import styles from './AboutPreview.module.css';

export default function AboutPreview() {
    return (
        <section id="about" className={`section ${styles.about}`}>
            <div className={`container ${styles.aboutContainer}`}>
                {/* Left Column: Story & Personal Details */}
                <div className={styles.content}>
                    <span className="section-label">About Me</span>

                    <h2 className="section-title">
                        Developer. Builder. <span className="gradient-text">Problem Solver.</span>
                    </h2>

                    <p className={styles.summary}>
                        I'm a full-stack developer with a focused approach to applied AI/ML —
                        building products end-to-end rather than just wrapping LLM APIs.
                        My work spans React/Next.js frontends, Node.js/MongoDB backends, and
                        increasingly, real model training (regression, prediction pipelines)
                        alongside LLM integration for OCR, code analysis, and smart workflows.
                    </p>

                    <p className={styles.summary}>
                        Currently a B.Tech CSE student (5th Sem), building projects that solve real
                        student and developer problems — from AI code reviews to native mobile attendance
                        management. Open to high-impact internships and full-time opportunities.
                    </p>

                    <div className={styles.infoRow}>
                        <div className={styles.infoItem}>
                            <FaGraduationCap className={styles.infoIcon} />
                            <span className={styles.infoText}>B.Tech CSE (5th Sem)</span>
                        </div>
                        <div className={styles.infoItem}>
                            <FaMapMarkerAlt className={styles.infoIcon} />
                            <span className={styles.infoText}>India</span>
                        </div>
                        <div className={styles.infoItem}>
                            <FaBriefcase className={styles.infoIcon} />
                            <span className={styles.infoText}>Open to Opportunities</span>
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

                {/* Right Column: Key Focus Areas & Defensible Stats Cards */}
                <div className={styles.statsCardGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.cardHeader}>
                            <FaCode className={styles.cardIcon} />
                            <span className={styles.statNumber}>4+</span>
                        </div>
                        <h4 className={styles.cardTitle}>Real Projects Shipped</h4>
                        <p className={styles.cardDesc}>Production Next.js platforms, ML models, &amp; Android APK release.</p>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.cardHeader}>
                            <FaRobot className={styles.cardIcon} />
                            <span className={styles.statNumber}>AI + ML</span>
                        </div>
                        <h4 className={styles.cardTitle}>Applied Intelligence</h4>
                        <p className={styles.cardDesc}>Gemini Vision OCR, Groq LLM pipelines, &amp; scikit-learn/XGBoost.</p>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.cardHeader}>
                            <FaMobileAlt className={styles.cardIcon} />
                            <span className={styles.statNumber}>Native</span>
                        </div>
                        <h4 className={styles.cardTitle}>Cross-Platform Android</h4>
                        <p className={styles.cardDesc}>Capacitor integration, Google OAuth native sign-in, &amp; APK distribution.</p>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.cardHeader}>
                            <FaLayerGroup className={styles.cardIcon} />
                            <span className={styles.statNumber}>Full Stack</span>
                        </div>
                        <h4 className={styles.cardTitle}>End-to-End Delivery</h4>
                        <p className={styles.cardDesc}>Database schema design, REST APIs, state management, &amp; responsive UI.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
