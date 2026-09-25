'use client';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaAndroid, FaArrowRight } from 'react-icons/fa';
import GlassTiltCard from '@/components/GlassTiltCard';
import styles from './FeaturedProjects.module.css';

const projects = [
    {
        id: 1,
        title: 'Code Review AI',
        tagline: 'AI-powered code reviews with streaming, PR integration & Roast Mode.',
        chips: ['SSE streaming', 'Gemini + Groq fallback', 'GitHub PR review'],
        icon: '🔍',
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
        chips: ['Android APK shipped', 'AI timetable scan', 'Per-subject balance'],
        icon: '📅',
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
        tagline: 'Resume–JD alignment scoring, skill gap analysis & career insights.',
        description: 'AI-powered career intelligence platform that analyses job descriptions, scores resume–JD alignment, maps skill gaps, and surfaces actionable insights to help candidates position themselves effectively for target roles. Results are presented through a clean dashboard that lets users track alignment across multiple job listings at once.',
        chips: ['Resume–JD scoring', 'Skill gap analysis', 'AI-powered insights'],
        icon: '🎯',
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
        icon: '📊',
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
        chips: ['Custom XGBoost model', 'Cost predictor', 'LLM itinerary gen'],
        icon: '\u2708\ufe0f',
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
        chips: ['Embedded AI assistant', 'MARKD case study', 'Design system'],
        icon: '🌐',
        accent: '#6B7F5E',
        accentDark: '#566B4A',
        liveUrl: 'https://portfolio-website-zeta-seven-42.vercel.app/',
        githubUrl: 'https://github.com/Chakshita2123/Portfolio-Website',
        apkUrl: null,
        caseStudyUrl: null,
        status: 'live',
    },
];

export default function FeaturedProjects() {
    return (
        <section id="projects" className={styles.projects}>
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.sectionLabel}>Featured Work</span>
                    <h2 className={styles.sectionTitle}>Selected Projects</h2>
                    <p className={styles.sectionSubtitle}>
                        Real problems solved with real technology \u2014 from native Android apps to ML models trained from scratch.
                    </p>
                </div>

                <div className={styles.grid}>
                    {projects.map((project) => (
                        <GlassTiltCard key={project.id} className={styles.card} maxTilt={4}>

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

                            {/* Neutral footer */}
                            <div className={styles.footer}>
                                <div className={styles.chips}>
                                    {project.chips.map((chip, i) => (
                                        <span key={i} className={styles.chip}>{chip}</span>
                                    ))}
                                </div>

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
                                        <span className={styles.btnDisabled}>Coming soon</span>
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

                <div className={styles.viewAll}>
                    <Link href="/projects" className={styles.viewAllLink}>
                        View all projects and case studies <FaArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
}
