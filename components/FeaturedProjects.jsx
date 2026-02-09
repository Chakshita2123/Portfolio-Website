'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './FeaturedProjects.module.css';

const projects = [
    {
        id: 1,
        title: 'AI Study Assistant',
        problem: 'Students struggle to find relevant study material quickly',
        techStack: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
        liveUrl: '#',
        githubUrl: '#',
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
        problem: 'Teams need a simple way to visualize project progress',
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
        problem: 'Small businesses need affordable online storefronts',
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
        title: 'Portfolio Website',
        problem: 'Traditional portfolios fail to communicate thinking',
        techStack: ['Next.js', 'React', 'CSS Modules', 'Gemini API'],
        liveUrl: '#',
        githubUrl: '#',
        relevance: { student: 8, recruiter: 10, founder: 7 },
        personaHighlight: {
            student: 'See how to build a standout portfolio',
            recruiter: 'Live example of modern frontend + AI skills',
            founder: 'Demonstrates product thinking and innovation'
        }
    }
];

const personas = [
    { value: 'recruiter', label: '💼 Recruiter' },
    { value: 'student', label: '🎓 Student' },
    { value: 'founder', label: '🚀 Founder' }
];

export default function FeaturedProjects() {
    const [selectedPersona, setSelectedPersona] = useState('recruiter');

    // Sort projects by relevance and take top 3
    const sortedProjects = useMemo(() => {
        return [...projects]
            .sort((a, b) => b.relevance[selectedPersona] - a.relevance[selectedPersona])
            .slice(0, 3);
    }, [selectedPersona]);

    const currentPersona = personas.find(p => p.value === selectedPersona);

    return (
        <section id="projects" className={`section ${styles.projects}`}>
            <div className="container">
                <div className={styles.header}>
                    <span className="ai-badge">Projects</span>
                    <h2 className="section-title">
                        Featured <span className="gradient-text">Work</span>
                    </h2>
                    <p className="section-subtitle">
                        Real problems solved with modern technology.
                    </p>
                </div>

                {/* Persona Selector */}
                <div className={styles.personaSelector}>
                    <label className={styles.personaLabel}>I am a:</label>
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
                    <div className={styles.aiRecommendation}>
                        <span className={styles.aiRecIcon}>✨</span>
                        <span>Showing top projects for {currentPersona?.label}</span>
                    </div>
                </div>

                {/* Project Cards */}
                <div className={styles.grid}>
                    {sortedProjects.map((project, index) => (
                        <div key={project.id} className={styles.card}>
                            {index === 0 && (
                                <span className={styles.topPick}>⭐ Top Pick</span>
                            )}
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{project.title}</h3>
                                <p className={styles.cardHighlight}>
                                    💡 {project.personaHighlight[selectedPersona]}
                                </p>
                                <p className={styles.cardProblem}>
                                    <span className={styles.problemLabel}>Problem:</span> {project.problem}
                                </p>
                                <div className={styles.techStack}>
                                    {project.techStack.map((tech, idx) => (
                                        <span key={idx} className="tag">{tech}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.cardActions}>
                                <a href={project.liveUrl} className="btn btn-primary">
                                    Live Demo
                                </a>
                                <a href={project.githubUrl} className="btn btn-secondary">
                                    GitHub
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Link */}
                <div className={styles.viewAll}>
                    <Link href="/projects" className="btn btn-ghost">
                        View All Projects →
                    </Link>
                </div>
            </div>
        </section>
    );
}
