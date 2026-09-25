'use client';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaAndroid, FaArrowRight, FaClock } from 'react-icons/fa';
import GlassTiltCard from '@/components/GlassTiltCard';
import styles from './FeaturedProjects.module.css';

const projects = [
    {
        id: 1,
        title: 'Code Review AI',
        problem: 'Developers need fast, structured feedback on code — not generic AI chat responses.',
        description: 'Full-stack AI code review platform with streaming reviews (SSE), multiple review templates, GitHub PR review, AI chat with LaTeX rendering, PDF export, and Roast Mode. Built with Next.js 15, TypeScript, MongoDB, NextAuth v5, Gemini AI + Groq fallback, Monaco Editor, and Recharts.',
        techStack: [
            { name: 'Next.js 15', icon: 'nextjs' },
            { name: 'TypeScript', icon: 'ts' },
            { name: 'MongoDB', icon: 'mongodb' },
            { name: 'NextAuth' },
            { name: 'Gemini/Groq' },
            { name: 'Monaco Editor' }
        ],
        liveUrl: 'https://code-review-ai-blond.vercel.app',
        githubUrl: 'https://github.com/Chakshita2123/Code-Review-AI',
        status: 'live'
    },
    {
        id: 2,
        title: 'Attendance Tracker (MARKD)',
        problem: 'Students need a reliable, mobile-native way to track attendance without relying on spreadsheets or fragile college portals.',
        description: 'Node.js/Express + MongoDB + React/Vite attendance tracker with Capacitor Android APK, Google OAuth, per-subject "Starting Balance" feature, and Timetable AI Scan via Gemini Vision + Groq fallback.',
        techStack: [
            { name: 'Node.js', icon: 'nodejs' },
            { name: 'Express' },
            { name: 'MongoDB', icon: 'mongodb' },
            { name: 'React', icon: 'react' },
            { name: 'Vite', icon: 'vite' },
            { name: 'Capacitor' }
        ],
        liveUrl: 'https://markd-attendance-tracker.onrender.com',
        githubUrl: 'https://github.com/Chakshita2123/Attendance-Tracker-Chakshita',
        apkUrl: 'https://github.com/Chakshita2123/Attendance-Tracker-Chakshita/releases/download/v1.0/app-debug.apk',
        caseStudyUrl: '/projects/markd',
        status: 'live',
        hasCaseStudy: true
    },
    {
        id: 3,
        title: 'Career Lens',
        problem: 'Job seekers struggle to align their skills and resumes with real market demand without spending hours on manual research.',
        description: 'AI-powered career intelligence platform that analyses job descriptions, scores resume–JD alignment, maps skill gaps, and surfaces actionable insights to help candidates position themselves effectively for target roles.',
        techStack: [
            { name: 'React', icon: 'react' },
            { name: 'Node.js', icon: 'nodejs' },
            { name: 'MongoDB', icon: 'mongodb' },
            { name: 'Express' },
            { name: 'Gemini AI' }
        ],
        liveUrl: 'https://careerlens-1-y5zn.onrender.com',
        githubUrl: 'https://github.com/Chakshita2123/CareerLens',
        status: 'live'
    },
    {
        id: 4,
        title: 'Flipkart Analytics Hub',
        problem: 'E-commerce sellers and analysts lack an intuitive dashboard to make sense of product listings, pricing trends, and review sentiment at scale.',
        description: 'Data analytics dashboard for Flipkart product data — visualising pricing trends, category breakdowns, and customer review sentiment through interactive charts and a Python/pandas data pipeline.',
        techStack: [
            { name: 'React', icon: 'react' },
            { name: 'Python', icon: 'py' },
            { name: 'pandas' },
            { name: 'Recharts' },
            { name: 'FastAPI' }
        ],
        liveUrl: null,
        githubUrl: 'https://github.com/Chakshita2123/Flipkart-Analytics-Hub',
        status: 'in-progress'
    },
    {
        id: 5,
        title: 'Journey Curator AI',
        problem: 'Most "AI travel planners" are just LLM wrappers with no real predictive intelligence.',
        description: 'Travel planning platform built around a real ML core — a trip cost predictor trained with scikit-learn/XGBoost — combined with Gemini/Groq for personalised itinerary generation and planning assistance.',
        note: 'Actively training the cost prediction model — check back soon.',
        techStack: [
            { name: 'Next.js 15', icon: 'nextjs' },
            { name: 'TypeScript', icon: 'ts' },
            { name: 'MongoDB', icon: 'mongodb' },
            { name: 'Python', icon: 'py' },
            { name: 'scikit-learn/XGBoost' }
        ],
        liveUrl: null,
        githubUrl: 'https://github.com/Chakshita2123/Journey-Curator-AI',
        status: 'in-progress'
    },
    {
        id: 6,
        title: 'Developer Portfolio',
        problem: 'Traditional portfolios are static PDFs disguised as websites — they don\'t demonstrate how someone actually builds.',
        description: 'This site — a clean, AI-integrated personal portfolio with an embedded AI assistant grounded in real project data, showcasing projects, skills, and a full MARKD case study.',
        techStack: [
            { name: 'Next.js', icon: 'nextjs' },
            { name: 'React', icon: 'react' },
            { name: 'CSS Modules', icon: 'css' },
            { name: 'Gemini API' }
        ],
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
                        <GlassTiltCard key={project.id} className={styles.card} maxTilt={6}>
                            <div className={styles.cardTop}>
                                {project.status === 'in-progress' && (
                                    <span className={styles.statusBadge}>
                                        <FaClock style={{ marginRight: '4px', fontSize: '0.7rem' }} /> In Progress
                                    </span>
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
                                
                                {project.note && (
                                    <p className={styles.inProgressNote}>
                                        💡 {project.note}
                                    </p>
                                )}

                                <div className={styles.techStack}>
                                    {project.techStack.map((tech, idx) => (
                                        <span key={idx} className={styles.techTag}>
                                            {tech.icon && (
                                                <img
                                                    src={`https://skillicons.dev/icons?i=${tech.icon}`}
                                                    alt=""
                                                    className={styles.tagIcon}
                                                    loading="lazy"
                                                />
                                            )}
                                            {tech.name}
                                        </span>
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
                                    <span className={styles.wip}>
                                        <FaClock style={{ marginRight: '4px' }} /> In Progress
                                    </span>
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
                        </GlassTiltCard>
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
