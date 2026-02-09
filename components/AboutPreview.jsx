'use client';
import { useState, useEffect } from 'react';
import styles from './AboutPreview.module.css';

const personas = [
    { value: 'recruiter', label: '💼 Recruiter', icon: '💼' },
    { value: 'student', label: '🎓 Student', icon: '🎓' },
    { value: 'founder', label: '🚀 Founder', icon: '🚀' }
];

const personaIntros = {
    recruiter: {
        title: "For Recruiters",
        description: "Chakshita is ideal for roles requiring frontend development with AI integration. She demonstrates strong React/Next.js skills, practical AI implementation experience, and product-focused thinking. Currently available for internships, full-time positions, and collaborative projects.",
        highlights: ["React/Next.js Expert", "AI Integration", "Product Thinking"]
    },
    student: {
        title: "For Fellow Students",
        description: "Hi! I'm Chakshita, a B.Tech student passionate about building real-world projects. I love combining frontend development with AI to create intelligent applications. Always excited to connect, collaborate, and learn together!",
        highlights: ["Learning Together", "Project Collaboration", "AI Exploration"]
    },
    founder: {
        title: "For Founders",
        description: "Looking for someone who can build AI-powered features quickly? I combine frontend skills with practical AI integration experience. I focus on shipping working products, not just technical demos. Let's build something impactful together.",
        highlights: ["Ship Fast", "AI-Powered", "Product Focus"]
    }
};

export default function AboutPreview() {
    const [selectedPersona, setSelectedPersona] = useState('recruiter');
    const [isAnimating, setIsAnimating] = useState(false);
    const [displayedIntro, setDisplayedIntro] = useState(personaIntros.recruiter);

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => {
            setDisplayedIntro(personaIntros[selectedPersona]);
            setIsAnimating(false);
        }, 200);
        return () => clearTimeout(timer);
    }, [selectedPersona]);

    return (
        <section id="about" className={`section ${styles.about}`}>
            <div className={`container ${styles.aboutContainer}`}>
                <div className={styles.content}>
                    <span className="ai-badge">About Me</span>

                    <h2 className="section-title">
                        Developer. Designer. <span className="gradient-text">Builder.</span>
                    </h2>

                    <p className={styles.summary}>
                        I'm a passionate frontend developer focused on creating intuitive,
                        performant web applications. With a strong foundation in modern
                        JavaScript frameworks and a keen eye for design, I bridge the gap
                        between beautiful interfaces and powerful functionality.
                    </p>

                    <p className={styles.summary}>
                        Currently exploring the intersection of AI and user experience —
                        building tools that don't just work, but think and adapt.
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
                    </div>
                </div>

                {/* AI Personalization Card */}
                <div className={styles.aiCard}>
                    <div className={styles.aiCardHeader}>
                        <span className={styles.aiIcon}>✨</span>
                        <span className={styles.aiTitle}>AI Personalized Intro</span>
                    </div>

                    {/* Persona Selector */}
                    <div className={styles.personaSelector}>
                        <span className={styles.personaLabel}>I am a:</span>
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

                    {/* Personalized Content */}
                    <div className={`${styles.personalizedContent} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}>
                        <h4 className={styles.introTitle}>{displayedIntro.title}</h4>
                        <p className={styles.introDescription}>{displayedIntro.description}</p>
                        <div className={styles.highlights}>
                            {displayedIntro.highlights.map((highlight, idx) => (
                                <span key={idx} className={styles.highlightTag}>{highlight}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
