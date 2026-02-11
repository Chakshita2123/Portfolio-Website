'use client';
import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './projects.module.css';

const projects = [
    {
        id: 1,
        title: 'AI Study Assistant',
        problem: 'Students struggle to find relevant study materials quickly and often waste time on unfocused searches.',
        solution: 'Built an AI-powered assistant that understands context and delivers personalized study recommendations instantly.',
        challenge: 'Creating a natural conversation flow while maintaining accuracy in recommendations.',
        outcome: 'Reduced average search time by 60% in user testing.',
        techStack: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
        liveUrl: '#',
        githubUrl: '#',
        // Persona relevance: higher = more relevant
        relevance: { student: 10, recruiter: 8, founder: 6 },
        personaHighlight: {
            student: 'Perfect for understanding AI-powered learning tools',
            recruiter: 'Demonstrates full-stack AI integration skills',
            founder: 'Shows ability to build user-centric AI products'
        }
    },
    {
        id: 2,
        title: 'Task Flow Dashboard',
        problem: 'Teams need a simple way to visualize project progress without complex enterprise tools.',
        solution: 'Designed a clean, intuitive dashboard that surfaces the right information at the right time.',
        challenge: 'Balancing simplicity with powerful features for diverse team needs.',
        outcome: 'Adopted by 3 student teams for semester projects.',
        techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
        liveUrl: '#',
        githubUrl: '#',
        relevance: { student: 7, recruiter: 9, founder: 10 },
        personaHighlight: {
            student: 'Great example of collaborative tooling',
            recruiter: 'Shows TypeScript and database expertise',
            founder: 'Demonstrates product thinking and team tooling'
        }
    },
    {
        id: 3,
        title: 'E-Commerce Platform',
        problem: 'Small businesses need affordable, professional online storefronts without technical complexity.',
        solution: 'Created a modular e-commerce template with easy customization and secure payment integration.',
        challenge: 'Ensuring seamless checkout experience across different payment methods.',
        outcome: 'Template used by 2 local businesses for their online presence.',
        techStack: ['React', 'Express', 'Stripe', 'MongoDB'],
        liveUrl: '#',
        githubUrl: '#',
        relevance: { student: 5, recruiter: 7, founder: 10 },
        personaHighlight: {
            student: 'Learn payment integration patterns',
            recruiter: 'Full-stack development with real business impact',
            founder: 'Ready-to-deploy solution for small businesses'
        }
    },
    {
        id: 4,
        title: 'Portfolio Website (This Site)',
        problem: 'Traditional portfolios are static and fail to communicate developer thinking effectively.',
        solution: 'Built an AI-ready portfolio that showcases not just work, but vision and problem-solving approach.',
        challenge: 'Designing for future AI features while keeping current UX excellent.',
        outcome: 'A living portfolio that grows with new capabilities.',
        techStack: ['Next.js', 'React', 'CSS Modules', 'Gemini API'],
        liveUrl: '#',
        githubUrl: '#',
        relevance: { student: 8, recruiter: 10, founder: 7 },
        personaHighlight: {
            student: 'See how to build a standout portfolio',
            recruiter: 'Live example of modern frontend + AI skills',
            founder: 'Demonstrates product thinking and innovation'
        }
    },
];

const personas = [
    { value: 'recruiter', label: '💼 Recruiter', description: 'Looking for technical skills & experience' },
    { value: 'student', label: '🎓 Student', description: 'Learning from real projects' },
    { value: 'founder', label: '🚀 Founder', description: 'Evaluating for collaboration' },
];

export default function ProjectsPage() {
    const [selectedPersona, setSelectedPersona] = useState('recruiter');
    const [aiRecommendation, setAiRecommendation] = useState('');
    const [isLoadingRec, setIsLoadingRec] = useState(false);

    // Fetch AI recommendation when persona changes
    const fetchRecommendation = useCallback(async (persona) => {
        setIsLoadingRec(true);
        try {
            const projectTitles = projects.map(p => p.title).join(', ');
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: `As a ${persona}, which of these projects should I look at first: ${projectTitles}? Give me a 1-2 sentence recommendation only.`,
                    context: persona
                })
            });
            const data = await response.json();
            if (response.ok && data.message) {
                setAiRecommendation(data.message);
            } else {
                setAiRecommendation('');
            }
        } catch (error) {
            setAiRecommendation('');
        } finally {
            setIsLoadingRec(false);
        }
    }, []);

    useEffect(() => {
        fetchRecommendation(selectedPersona);
    }, [selectedPersona, fetchRecommendation]);

    // Sort projects by relevance to selected persona
    const sortedProjects = useMemo(() => {
        return [...projects].sort((a, b) =>
            b.relevance[selectedPersona] - a.relevance[selectedPersona]
        );
    }, [selectedPersona]);

    // Get top project as featured
    const featuredProject = sortedProjects[0];
    const otherProjects = sortedProjects.slice(1);

    const currentPersona = personas.find(p => p.value === selectedPersona);

    return (
        <>
            <Navbar />
            <main className={styles.projectsPage}>
                {/* Page Header */}
                <section className={styles.pageHeader}>
                    <div className="container">
                        <span className={`ai-badge ${styles.animateIn}`}>Portfolio</span>
                        <h1 className={`${styles.pageTitle} ${styles.animateIn} ${styles.delay1}`}>
                            Projects
                        </h1>
                        <p className={`${styles.pageSubtitle} ${styles.animateIn} ${styles.delay2}`}>
                            A selection of projects where I applied design, development, and AI thinking to solve real problems.
                        </p>
                    </div>
                </section>

                {/* Context Selector */}
                <section className={`section ${styles.contextSelector}`}>
                    <div className="container">
                        <div className={`${styles.selectorCard} ${styles.animateIn}`}>
                            <div className={styles.selectorContent}>
                                <label className={styles.selectorLabel}>I am a:</label>
                                <div className={styles.personaButtons}>
                                    {personas.map(persona => (
                                        <button
                                            key={persona.value}
                                            className={`${styles.personaBtn} ${selectedPersona === persona.value ? styles.personaBtnActive : ''}`}
                                            onClick={() => setSelectedPersona(persona.value)}
                                        >
                                            {persona.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.aiRecommendation}>
                                <span className={styles.aiIcon}>✨</span>
                                <span>Projects sorted by relevance for {currentPersona?.label}</span>
                            </div>
                        </div>

                        {/* AI Recommendation */}
                        {(aiRecommendation || isLoadingRec) && (
                            <div className={styles.aiRecBox}>
                                <span className={styles.aiRecLabel}>AI Recommendation</span>
                                <p className={styles.aiRecText}>
                                    {isLoadingRec ? 'Thinking...' : aiRecommendation}
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Featured Project */}
                {featuredProject && (
                    <section className={`section ${styles.featuredSection}`}>
                        <div className="container">
                            <div className={styles.featuredLabel}>
                                <span className={styles.starIcon}>⭐</span>
                                <span>Most Relevant for You</span>
                            </div>

                            <div className={`${styles.featuredCard} ${styles.animateIn}`} key={featuredProject.id}>
                                <div className={styles.featuredContent}>
                                    <h2 className={styles.featuredTitle}>{featuredProject.title}</h2>

                                    {/* Persona-specific highlight */}
                                    <div className={styles.personaHighlight}>
                                        <span className={styles.highlightIcon}>💡</span>
                                        <span>{featuredProject.personaHighlight[selectedPersona]}</span>
                                    </div>

                                    <div className={styles.projectMeta}>
                                        <div className={styles.metaItem}>
                                            <span className={styles.metaLabel}>Problem</span>
                                            <p className={styles.metaText}>{featuredProject.problem}</p>
                                        </div>
                                        <div className={styles.metaItem}>
                                            <span className={styles.metaLabel}>Solution</span>
                                            <p className={styles.metaText}>{featuredProject.solution}</p>
                                        </div>
                                    </div>

                                    <div className={styles.projectDetails}>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Key Challenge</span>
                                            <p className={styles.detailText}>{featuredProject.challenge}</p>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <span className={styles.detailLabel}>Outcome</span>
                                            <p className={styles.detailText}>{featuredProject.outcome}</p>
                                        </div>
                                    </div>

                                    <div className={styles.techStack}>
                                        {featuredProject.techStack.map((tech, index) => (
                                            <span key={index} className="tag">{tech}</span>
                                        ))}
                                    </div>

                                    <div className={styles.projectActions}>
                                        <a href={featuredProject.liveUrl} className="btn btn-primary">
                                            Live Demo <span>→</span>
                                        </a>
                                        <a href={featuredProject.githubUrl} className="btn btn-secondary">
                                            <FaGithub /> GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Other Projects */}
                <section className={`section ${styles.projectsGrid}`}>
                    <div className="container">
                        <h2 className={`${styles.sectionTitle} ${styles.animateIn}`}>More Projects</h2>

                        <div className={styles.grid}>
                            {otherProjects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className={`${styles.projectCard} ${styles.animateIn}`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <h3 className={styles.cardTitle}>{project.title}</h3>

                                    {/* Persona-specific highlight */}
                                    <p className={styles.cardHighlight}>
                                        💡 {project.personaHighlight[selectedPersona]}
                                    </p>

                                    <div className={styles.cardMeta}>
                                        <div className={styles.cardMetaItem}>
                                            <span className={styles.cardMetaLabel}>Problem</span>
                                            <p className={styles.cardMetaText}>{project.problem}</p>
                                        </div>
                                        <div className={styles.cardMetaItem}>
                                            <span className={styles.cardMetaLabel}>Solution</span>
                                            <p className={styles.cardMetaText}>{project.solution}</p>
                                        </div>
                                    </div>

                                    <div className={styles.cardDetails}>
                                        <p><strong>Challenge:</strong> {project.challenge}</p>
                                        <p><strong>Outcome:</strong> {project.outcome}</p>
                                    </div>

                                    <div className={styles.cardTechStack}>
                                        {project.techStack.map((tech, techIndex) => (
                                            <span key={techIndex} className="tag">{tech}</span>
                                        ))}
                                    </div>

                                    <div className={styles.cardActions}>
                                        <a href={project.liveUrl} className="btn btn-primary">
                                            Live Demo
                                        </a>
                                        <a href={project.githubUrl} className="btn btn-secondary">
                                            <FaGithub /> GitHub
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className={`section ${styles.cta}`}>
                    <div className="container">
                        <div className={`${styles.ctaContent} ${styles.animateIn}`}>
                            <h2 className={styles.ctaTitle}>Want to know more about how I built these?</h2>
                            <p className={styles.ctaSubtitle}>
                                Ask me anything about my process, challenges, or technical decisions.
                            </p>
                            <Link href="/ask-ai" className="btn btn-primary">
                                Ask Chakshita AI <span>✨</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
