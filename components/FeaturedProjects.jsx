'use client';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaAndroid, FaArrowRight } from 'react-icons/fa';
import styles from './FeaturedProjects.module.css';

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

export default function FeaturedProjects() {
    return (
        <section id="projects" className={styles.projects}>
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.sectionLabel}>Featured Work</span>
                    <h2 className={styles.sectionTitle}>
                        Selected Projects
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Real problems solved with real technology — from native Android apps to ML models trained from scratch.
                    </p>
                </div>

                {/* Project Cards Grid */}
                <div className={styles.grid}>
                    {projects.map((project) => (
                        <div key={project.id} className={styles.card}>
                            <div className={styles.cardTop}>
                                {project.status === 'in-progress' && (
                                    <span className={styles.statusBadge}>In Progress</span>
                                )}
                                {project.hasCaseStudy && (
                                    <span className={styles.caseStudyBadge}>Case Study</span>
                                )}
                            </div>

                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{project.title}</h3>
                                <p className={styles.cardProblem}>
                                    <span className={styles.problemLabel}>Problem:</span>{' '}
                                    {project.problem}
                                </p>
                                <p className={styles.cardDesc}>{project.description}</p>
                                <div className={styles.techStack}>
                                    {project.techStack.map((tech, idx) => (
                                        <span key={idx} className={styles.techTag}>{tech}</span>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.cardActions}>
                                {project.liveUrl ? (
                                    <a
                                        href={project.liveUrl}
                                        className={`btn ${styles.primaryAction}`}
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
                                    className={`btn ${styles.secondaryAction}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaGithub /> GitHub
                                </a>

                                {project.apkUrl && (
                                    <a
                                        href={project.apkUrl}
                                        className={`btn ${styles.apkBtn}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaAndroid /> APK
                                    </a>
                                )}

                                {project.caseStudyUrl && (
                                    <Link href={project.caseStudyUrl} className={styles.caseStudyBtn}>
                                        Read full case study →
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Link */}
                <div className={styles.viewAll}>
                    <Link href="/projects" className={styles.viewAllLink}>
                        View all projects and case studies <FaArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
}
