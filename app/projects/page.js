'use client';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaAndroid, FaBookOpen } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GitHubActivity from '@/components/GitHubActivity';
import styles from './projects.module.css';

const projects = [
    {
        id: 1,
        title: 'Code Review AI',
        problem: 'Developers need fast, structured feedback on code — not generic AI chat responses.',
        description: 'Full-stack AI-powered code review platform with streaming reviews (SSE), multiple review templates, GitHub PR review, an AI chat assistant with LaTeX rendering, and PDF export.',
        techStack: ['Next.js 15', 'TypeScript', 'MongoDB', 'NextAuth', 'Gemini/Groq', 'Monaco Editor'],
        liveUrl: 'https://code-review-ai-blond.vercel.app/',
        githubUrl: 'https://github.com/Chakshita2123/Code-Review-AI',
        status: 'live'
    },
    {
        id: 2,
        title: 'MARKD — Attendance Tracker',
        problem: 'Students need a reliable, mobile-native way to track attendance without relying on spreadsheets or fragile college portals.',
        description: 'Cross-platform attendance tracker with Google OAuth, native Android sign-in via Capacitor, AI-powered timetable upload (Gemini Vision + Groq fallback), and balance tracking.',
        techStack: ['React', 'Node.js', 'MongoDB', 'Capacitor (Android)', 'Gemini Vision', 'Groq'],
        liveUrl: 'https://attendance-tracker-ruddy-ten.vercel.app/',
        githubUrl: 'https://github.com/Chakshita2123/Attendance-Tracker-Chakshita',
        apkUrl: 'https://github.com/Chakshita2123/Attendance-Tracker-Chakshita/releases/download/v1.0/app-debug.apk',
        caseStudyUrl: '/projects/markd',
        status: 'live',
        hasCaseStudy: true
    },
    {
        id: 3,
        title: 'Journey Curator',
        problem: 'Most "AI travel planners" are just LLM wrappers with no real predictive intelligence.',
        description: 'Travel planning platform built around a real ML core — a trip cost predictor trained with scikit-learn/XGBoost — combined with Gemini/Groq for planning assistance.',
        techStack: ['Next.js 15', 'TypeScript', 'MongoDB', 'Python', 'scikit-learn/XGBoost'],
        liveUrl: null,
        githubUrl: 'https://github.com/Chakshita2123/Journey-Curator-AI',
        status: 'in-progress'
    },
    {
        id: 4,
        title: 'This Portfolio',
        problem: 'Traditional portfolios are static PDFs disguised as websites — they don\'t demonstrate how someone actually builds.',
        description: 'A clean, AI-integrated personal portfolio with an embedded AI assistant grounded in real project data.',
        techStack: ['Next.js', 'React', 'CSS Modules', 'Gemini API'],
        liveUrl: 'https://portfolio-website-zeta-seven-42.vercel.app/',
        githubUrl: 'https://github.com/Chakshita2123/Portfolio-Website',
        status: 'live'
    }
];

export default function ProjectsPage() {
    return (
        <>
            <Navbar />
            <main className={styles.projectsPage}>
                {/* Page Header */}
                <section className={styles.pageHeader}>
                    <div className="container">
                        <span className={`section-label ${styles.animateIn}`}>Portfolio</span>
                        <h1 className={`${styles.pageTitle} ${styles.animateIn} ${styles.delay1}`}>
                            Projects
                        </h1>
                        <p className={`${styles.pageSubtitle} ${styles.animateIn} ${styles.delay2}`}>
                            End-to-end builds — from frontend to ML models — solving real problems.
                        </p>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className={`section ${styles.projectsGrid}`}>
                    <div className="container">
                        <div className={styles.grid}>
                            {projects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className={`${styles.projectCard} ${styles.animateIn}`}
                                    style={{ animationDelay: `${index * 0.08}s` }}
                                >
                                    <div className={styles.cardHeader}>
                                        <h3 className={styles.cardTitle}>{project.title}</h3>
                                        <div className={styles.badges}>
                                            {project.status === 'in-progress' && (
                                                <span className={styles.statusBadge}>In Progress</span>
                                            )}
                                            {project.hasCaseStudy && (
                                                <Link href={project.caseStudyUrl} className={styles.caseStudyBadge}>
                                                    Full Case Study →
                                                </Link>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.cardMeta}>
                                        <div className={styles.cardMetaItem}>
                                            <span className={styles.cardMetaLabel}>Problem</span>
                                            <p className={styles.cardMetaText}>{project.problem}</p>
                                        </div>
                                        <div className={styles.cardMetaItem}>
                                            <span className={styles.cardMetaLabel}>What it does</span>
                                            <p className={styles.cardMetaText}>{project.description}</p>
                                        </div>
                                    </div>

                                    <div className={styles.cardTechStack}>
                                        {project.techStack.map((tech, techIndex) => (
                                            <span key={techIndex} className="tag">{tech}</span>
                                        ))}
                                    </div>

                                    <div className={styles.cardActions}>
                                        {project.liveUrl ? (
                                            <a
                                                href={project.liveUrl}
                                                className="btn btn-primary"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FaExternalLinkAlt /> Live Demo
                                            </a>
                                        ) : (
                                            <span className={styles.wip}>In Progress</span>
                                        )}

                                        <a
                                            href={project.githubUrl}
                                            className="btn btn-secondary"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FaGithub /> GitHub
                                        </a>

                                        {project.apkUrl && (
                                            <a
                                                href={project.apkUrl}
                                                className={`btn btn-secondary ${styles.apkBtn}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FaAndroid /> Download APK
                                            </a>
                                        )}

                                        {project.caseStudyUrl && (
                                            <Link href={project.caseStudyUrl} className={`btn btn-ghost ${styles.caseStudyLink}`}>
                                                <FaBookOpen /> Deep Dive
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* GitHub Contribution Activity */}
                <GitHubActivity />

                {/* CTA Section */}
                <section className={`section ${styles.cta}`}>
                    <div className="container">
                        <div className={`${styles.ctaContent} ${styles.animateIn}`}>
                            <h2 className={styles.ctaTitle}>Want to know more about how I built these?</h2>
                            <p className={styles.ctaSubtitle}>
                                Ask me anything about my process, challenges, or technical decisions.
                            </p>
                            <Link href="/ask-ai" className="btn btn-primary">
                                Ask AI <span>✨</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
