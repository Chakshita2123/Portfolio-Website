import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaAndroid, FaArrowLeft } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './markd.module.css';

export const metadata = {
    title: 'MARKD Case Study | Chakshita',
    description: 'Deep dive into MARKD — an attendance tracker built with React, Capacitor for native Android, Google OAuth, and Gemini Vision AI.',
};

export default function MarkdCaseStudyPage() {
    return (
        <>
            <Navbar />
            <main className={styles.caseStudyPage}>
                {/* Header */}
                <header className={styles.header}>
                    <div className="container">
                        <Link href="/projects" className={styles.backLink}>
                            <FaArrowLeft /> Back to all projects
                        </Link>
                        <span className="section-label">Case Study</span>
                        <h1 className={styles.title}>MARKD — Attendance Tracker</h1>
                        <p className={styles.subtitle}>
                            A cross-platform attendance tracking application designed for college students, 
                            featuring native Android deployment, Google OAuth, and AI-powered timetable parsing.
                        </p>

                        {/* Action Buttons */}
                        <div className={styles.actions}>
                            <a
                                href="https://attendance-tracker-ruddy-ten.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                <FaExternalLinkAlt /> Live Demo
                            </a>
                            <a
                                href="https://github.com/Chakshita2123/Attendance-Tracker-Chakshita"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                            >
                                <FaGithub /> GitHub Repository
                            </a>
                            <a
                                href="https://github.com/Chakshita2123/Attendance-Tracker-Chakshita/releases/download/v1.0/app-debug.apk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`btn btn-secondary ${styles.apkBtn}`}
                            >
                                <FaAndroid /> Download Android APK
                            </a>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <section className={styles.contentSection}>
                    <div className={`container ${styles.contentContainer}`}>
                        
                        {/* Meta Sidebar */}
                        <aside className={styles.sidebar}>
                            <div className={styles.metaCard}>
                                <h3 className={styles.metaTitle}>Project Details</h3>
                                
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Role</span>
                                    <span className={styles.metaValue}>Solo Full-Stack Developer</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Timeline</span>
                                    <span className={styles.metaValue}>Completed &amp; Live</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Platforms</span>
                                    <span className={styles.metaValue}>Web &amp; Native Android</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Tech Stack</span>
                                    <div className={styles.tags}>
                                        <span className="tag">React</span>
                                        <span className="tag">Node.js</span>
                                        <span className="tag">MongoDB</span>
                                        <span className="tag">Capacitor</span>
                                        <span className="tag">Gemini Vision API</span>
                                        <span className="tag">Groq</span>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Case Study Body */}
                        <article className={styles.article}>
                            {/* The Problem */}
                            <div className={styles.sectionBlock}>
                                <h2 className={styles.sectionHeading}>The Problem</h2>
                                <p className={styles.paragraph}>
                                    Students juggle multiple subjects with different attendance criteria (like the strict 75% cutoff).
                                    Most rely on manual spreadsheets or clunky college portals that only update days after classes.
                                    Missing the critical threshold often isn't visible until it's too late to make up missed sessions.
                                </p>
                            </div>

                            {/* My Approach */}
                            <div className={styles.sectionBlock}>
                                <h2 className={styles.sectionHeading}>My Approach</h2>
                                <p className={styles.paragraph}>
                                    I designed MARKD from the ground up to eliminate manual tracking friction:
                                </p>
                                <ul className={styles.bulletList}>
                                    <li>
                                        <strong>Cross-Platform Core:</strong> Built with React and wrapped with Capacitor to deliver a fast web app and a standalone native Android APK.
                                    </li>
                                    <li>
                                        <strong>Low-Friction Sign-In:</strong> Integrated Google OAuth to eliminate password fatigue and sync user records safely across devices.
                                    </li>
                                    <li>
                                        <strong>AI Timetable Ingestion:</strong> Used Gemini Vision API to allow students to snap a photo or upload an image of their class schedule. The model extracts course names, times, and professors automatically.
                                    </li>
                                    <li>
                                        <strong>Intelligent Attendance Balances:</strong> Calculates exactly how many classes a student can safely skip or must attend to remain above their cutoff.
                                    </li>
                                </ul>
                            </div>

                            {/* Key Challenge */}
                            <div className={styles.sectionBlock}>
                                <h2 className={styles.sectionHeading}>Key Challenge</h2>
                                <p className={styles.paragraph}>
                                    Migrating from a standard web-only Google Sign-In to native Capacitor Google Sign-In on Android required handling OAuth redirect flows differently across environments.
                                </p>
                                <p className={styles.paragraph}>
                                    In the mobile app, standard browser redirects cause broken session contexts. I implemented native intent handlers and configured deep linking scheme URLs with Capacitor plugins, while preserving standard popup/redirect authentication on the desktop web app without code duplication.
                                </p>
                            </div>

                            {/* What I'd Do Differently */}
                            <div className={styles.sectionBlock}>
                                <h2 className={styles.sectionHeading}>What I'd Do Differently</h2>
                                <p className={styles.paragraph}>
                                    I would set up the Groq fallback for timetable parsing earlier in development. During initial testing, rate limit spikes on multimodal endpoints caused intermittent timeouts. Implementing a fallback routing mechanism between Gemini Vision and Groq solved this, but should have been in place from day one.
                                </p>
                            </div>

                            {/* Bottom CTAs */}
                            <div className={styles.bottomCta}>
                                <h3>Experience MARKD</h3>
                                <p>Try the live web app or install the Android build directly.</p>
                                <div className={styles.actions}>
                                    <a
                                        href="https://attendance-tracker-ruddy-ten.vercel.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                    >
                                        <FaExternalLinkAlt /> Open Web App
                                    </a>
                                    <a
                                        href="https://github.com/Chakshita2123/Attendance-Tracker-Chakshita/releases/download/v1.0/app-debug.apk"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-secondary"
                                    >
                                        <FaAndroid /> Download APK
                                    </a>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
