'use client';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaAndroid } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GitHubActivity from '@/components/GitHubActivity';
import GlassTiltCard from '@/components/GlassTiltCard';
import styles from './projects.module.css';

const projects = [
    {
        id: 1,
        title: 'Code Review AI',
        tagline: 'AI-powered code reviews with streaming, PR integration & Roast Mode.',
        description: 'Full-stack AI code review platform with streaming reviews (SSE), multiple review templates, GitHub PR review, AI chat with LaTeX rendering, PDF export, and Roast Mode. Built with Next.js 15, TypeScript, MongoDB, NextAuth v5, Gemini AI + Groq fallback, Monaco Editor, and Recharts.',
        chips: ['SSE streaming', 'Gemini + Groq fallback', 'GitHub PR review'],
        techStack: ['Next.js 15', 'TypeScript', 'MongoDB', 'NextAuth', 'Gemini/Groq', 'Monaco Editor'],
        icon: '\uD83D\uDD0D',
        accent: '#C25B4E',
        accentDark: '#A34840',
        liveUrl: 'https://code-review-ai-blond.vercel.app',
        githubUrl: 'https://github.com/Chakshita2123/Code-Review-AI',
        apkUrl: null,
        caseStudyUrl: null,
        status: 'live',
    },
    {
        id: 2,
        title: 'Attendance Tracker (MARKD)',
        tagline: 'Mobile-native attendance with AI timetable scan & Android APK.',
        description: 'Node.js/Express + MongoDB + React/Vite attendance tracker with Capacitor Android APK, Google OAuth, per-subject \u201cStarting Balance\u201d feature, and Timetable AI Scan via Gemini Vision + Groq fallback.',
        chips: ['Android APK shipped', 'AI timetable scan', 'Per-subject balance'],
        techStack: ['Node.js', 'Express', 'MongoDB', 'React', 'Vite', 'Capacitor'],
        icon: '\uD83D\uDCC5',
        accent: '#3D8B6E',
        accentDark: '#2E6E56',
        liveUrl: 'https://markd-attendance-tracker.onrender.com',
        githubUrl: 'https://github.com/Chakshita2123/Attendance-Tracker-Chakshita',
        apkUrl: 'https://github.com/Chakshita2123/Attendance-Tracker-Chakshita/releases/download/v1.0/app-debug.apk',
        caseStudyUrl: '/projects/markd',
        status: 'live',
        hasCaseStudy: true,
    },
    {
        id: 3,
        title: 'Career Lens',
        tagline: 'Resume\u2013JD alignment scoring, skill gap analysis & career insights.',
        description: 'AI-powered career intelligence platform that analyses job descriptions, scores resume–JD alignment, maps skill gaps, and surfaces actionable insights to help candidates position themselves effectively for target roles. Results are presented through a clean dashboard that lets users track alignment across multiple job listings at once.',
        chips: ['Resume\u2013JD scoring', 'Skill gap analysis', 'AI-powered insights'],
        techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Gemini AI'],
        icon: '\uD83C\uDFAF',
        accent: '#6B5BA8',
        accentDark: '#574A8A',
        liveUrl: 'https://careerlens-1-y5zn.onrender.com',
        githubUrl: 'https://github.com/Chakshita2123/CareerLens',
        apkUrl: null,
        caseStudyUrl: null,
        status: 'live',
    },
    {
        id: 4,
        title: 'Flipkart Analytics Hub',
        tagline: 'E-commerce analytics dashboard with pricing trends & sentiment.',
        description: 'Data analytics dashboard for Flipkart product data — visualising pricing trends, category breakdowns, and customer review sentiment through interactive charts and a Python/pandas data pipeline. The pipeline ingests and normalises raw listing data before surfacing it through a React frontend with filterable chart views.',
        chips: ['Price trend charts', 'Sentiment analysis', 'pandas pipeline'],
        techStack: ['React', 'Python', 'pandas', 'Recharts', 'FastAPI'],
        icon: '\uD83D\uDCCA',
        accent: '#3A72A8',
        accentDark: '#2E5C88',
        liveUrl: null,
        githubUrl: 'https://github.com/Chakshita2123/Flipkart-Analytics-Hub',
        apkUrl: null,
        caseStudyUrl: null,
        status: 'in-progress',
    },
    {
        id: 5,
        title: 'Journey Curator AI',
        tagline: 'Trip planning with a real XGBoost cost predictor at its core.',
        description: 'Travel planning platform built around a real ML core \u2014 a trip cost predictor trained with scikit-learn/XGBoost \u2014 combined with Gemini/Groq for personalised itinerary generation and planning assistance.',
        note: 'Actively training the cost prediction model \u2014 check back soon.',
        chips: ['Custom XGBoost model', 'Cost predictor', 'LLM itinerary gen'],
        techStack: ['Next.js 15', 'TypeScript', 'MongoDB', 'Python', 'scikit-learn/XGBoost'],
        icon: '\u2708\uFE0F',
        accent: '#B87333',
        accentDark: '#96602A',
        liveUrl: null,
        githubUrl: 'https://github.com/Chakshita2123/Journey-Curator-AI',
        apkUrl: null,
        caseStudyUrl: null,
        status: 'in-progress',
    },
    {
        id: 6,
        title: 'Developer Portfolio',
        tagline: 'AI-integrated portfolio with embedded assistant & MARKD case study.',
        description: 'This site \u2014 a clean, AI-integrated personal portfolio with an embedded AI assistant grounded in real project data, showcasing projects, skills, and a full MARKD case study.',
        chips: ['Embedded AI assistant', 'MARKD case study', 'Design system'],
        techStack: ['Next.js', 'React', 'CSS Modules', 'Gemini API'],
        icon: '\uD83C\uDF10',
        accent: '#6B7F5E',
        accentDark: '#566B4A',
        liveUrl: 'https://portfolio-website-zeta-seven-42.vercel.app/',
        githubUrl: 'https://github.com/Chakshita2123/Portfolio-Website',
        apkUrl: null,
        caseStudyUrl: null,
        status: 'live',
    },
];

export default function ProjectsPage() {
    return (
        <>
            <Navbar />
            <main className={styles.projectsPage}>
                {/* Page Header */}
                <section className={styles.pageHeader}>
                    <div className="container">
                        <span className="section-label">Portfolio</span>
                        <h1 className={styles.pageTitle}>Projects</h1>
                        <p className={styles.pageSubtitle}>
                            End-to-end builds \u2014 from frontend to ML models \u2014 solving real problems.
                        </p>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className={styles.projectsGrid}>
                    <div className="container">
                        <div className={styles.grid}>
                            {projects.map((project) => (
                                <GlassTiltCard
                                    key={project.id}
                                    className={styles.projectCard}
                                    maxTilt={4}
                                >
                                    {/* Colored top panel */}
                                    <div
                                        className={styles.panel}
                                        style={{
                                            background: `linear-gradient(135deg, ${project.accent} 0%, ${project.accentDark} 100%)`,
                                        }}
                                    >
                                        <span className={styles.panelOrb} />

                                        <div className={styles.panelTop}>
                                            <span className={styles.panelIcon} aria-hidden="true">{project.icon}</span>
                                            <span className={project.status === 'live' ? styles.badgeLive : styles.badgeWip}>
                                                {project.status === 'live' ? 'Shipped' : 'In Progress'}
                                            </span>
                                        </div>

                                        <h3 className={styles.panelTitle}>{project.title}</h3>
                                        <p className={styles.panelTagline}>{project.tagline}</p>
                                    </div>

                                    {/* Neutral card body */}
                                    <div className={styles.cardBody}>
                                        {/* Description */}
                                        <p className={styles.cardDesc}>{project.description}</p>
                                        {project.note && (
                                            <p className={styles.inProgressNote}>
                                                <span style={{ flexShrink: 0, fontStyle: 'normal' }}>ℹ</span>
                                                {project.note}
                                            </p>
                                        )}

                                        {/* Feature chips */}
                                        <div className={styles.chips}>
                                            {project.chips.map((chip, i) => (
                                                <span key={i} className={styles.chip}>{chip}</span>
                                            ))}
                                        </div>

                                        {/* Tech stack */}
                                        <div className={styles.techStack}>
                                            {project.techStack.map((tech, i) => (
                                                <span key={i} className={styles.techTag}>{tech}</span>
                                            ))}
                                        </div>

                                        {/* Buttons */}
                                        <div className={styles.actions}>
                                            {project.liveUrl ? (
                                                <a
                                                    href={project.liveUrl}
                                                    className={styles.btnPrimary}
                                                    style={{ background: project.accent, borderColor: project.accent }}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FaExternalLinkAlt /> Live Demo
                                                </a>
                                            ) : (
                                                <span className={styles.btnDisabled}>
                                                    Coming soon
                                                </span>
                                            )}
                                            <a
                                                href={project.githubUrl}
                                                className={styles.btnGhost}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                                            >
                                                <FaGithub /> GitHub
                                            </a>
                                        </div>

                                        {/* Secondary links */}
                                        {(project.apkUrl || project.caseStudyUrl) && (
                                            <div className={styles.secondaryLinks}>
                                                {project.apkUrl && (
                                                    <a href={project.apkUrl} className={styles.textLink} target="_blank" rel="noopener noreferrer">
                                                        <FaAndroid style={{ fontSize: '0.75rem' }} /> Download APK
                                                    </a>
                                                )}
                                                {project.caseStudyUrl && (
                                                    <Link href={project.caseStudyUrl} className={styles.textLink}>
                                                        Read case study \u2192
                                                    </Link>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </GlassTiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                <GitHubActivity />

                {/* CTA Section */}
                <section className={styles.cta}>
                    <div className="container">
                        <div className={styles.ctaContent}>
                            <h2 className={styles.ctaTitle}>Want to know more about how I built these?</h2>
                            <p className={styles.ctaSubtitle}>
                                Ask me anything about my process, challenges, or technical decisions.
                            </p>
                            <Link href="/ask-ai" className="btn btn-primary">
                                Ask AI <span>\u2728</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
