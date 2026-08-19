'use client';
import { useState } from 'react';
import { FaAward } from 'react-icons/fa';
import styles from './SkillsSnapshot.module.css';

const skillCategories = [
    {
        title: 'Frontend',
        icon: '🎨',
        skills: [
            { name: 'React', icon: 'react' },
            { name: 'Next.js 15', icon: 'nextjs' },
            { name: 'TypeScript', icon: 'ts' },
            { name: 'JavaScript', icon: 'js' },
            { name: 'HTML/CSS', icon: 'html,css' }
        ],
        insight: 'Core strength — React/Next.js component architecture and modern CSS'
    },
    {
        title: 'Backend',
        icon: '⚙️',
        skills: [
            { name: 'Node.js', icon: 'nodejs' },
            { name: 'Express', icon: 'express' },
            { name: 'Python', icon: 'py' },
            { name: 'MongoDB', icon: 'mongodb' },
            { name: 'REST APIs', icon: 'postman' }
        ],
        insight: 'Full-stack capability — from API design to database modelling'
    },
    {
        title: 'AI / ML & Automation',
        icon: '🤖',
        skills: [
            { name: 'scikit-learn / XGBoost', icon: 'py' },
            { name: 'Gemini API & Vision', icon: 'tensorflow' },
            { name: 'Groq Cloud', icon: 'py' },
            { name: 'Prompt Engineering', icon: 'react' },
            { name: 'Capacitor', icon: 'androidstudio' }
        ],
        insight: 'Real model training + LLM integration — not just API wrappers'
    },
    {
        title: 'Tools & Platforms',
        icon: '🛠️',
        skills: [
            { name: 'Git & GitHub', icon: 'git' },
            { name: 'VS Code', icon: 'vscode' },
            { name: 'Vercel', icon: 'vercel' },
            { name: 'Postman', icon: 'postman' },
            { name: 'Figma', icon: 'figma' }
        ],
        insight: 'Modern development workflow and rapid shipping'
    }
];

const certifications = [
    {
        name: 'Meta Marketing Analytics Professional Certificate',
        issuer: 'Meta'
    },
    {
        name: 'Finance for Everyone Specialization',
        issuer: 'McMaster University'
    },
    {
        name: 'Google Prompting Essentials Specialization',
        issuer: 'Google'
    },
    {
        name: 'IBM Generative AI Fundamentals Specialization',
        issuer: 'IBM'
    },
    {
        name: 'Prompt Design in Vertex AI',
        issuer: 'Google Cloud'
    },
    {
        name: 'Build Real World AI Applications with Gemini and Imagen',
        issuer: 'Google Cloud'
    }
];

export default function SkillsSnapshot() {
    const [activeCategory, setActiveCategory] = useState(null);

    return (
        <section className={`section ${styles.skills}`}>
            <div className="container">
                <div className={styles.header}>
                    <span className="section-label">Skills</span>
                    <h2 className="section-title">
                        Technologies I <span className="gradient-text">Work With</span>
                    </h2>
                    <p className="section-subtitle">
                        A focused toolkit for building modern, intelligent applications.
                    </p>
                </div>

                <div className={styles.grid}>
                    {skillCategories.map((category, index) => (
                        <div
                            key={index}
                            className={`${styles.category} ${activeCategory === index ? styles.categoryActive : ''}`}
                            onMouseEnter={() => setActiveCategory(index)}
                            onMouseLeave={() => setActiveCategory(null)}
                        >
                            <div className={styles.categoryHeader}>
                                <span className={styles.categoryIcon}>{category.icon}</span>
                                <h3 className={styles.categoryTitle}>{category.title}</h3>
                            </div>
                            <div className={styles.skillTags}>
                                {category.skills.map((skill, skillIndex) => (
                                    <span key={skillIndex} className={`tag ${styles.skillTag}`}>
                                        {skill.icon && (
                                            <img
                                                src={`https://skillicons.dev/icons?i=${skill.icon}`}
                                                alt=""
                                                className={styles.tagIcon}
                                                loading="lazy"
                                            />
                                        )}
                                        {skill.name}
                                    </span>
                                ))}
                            </div>

                            {/* Subtle insight on card */}
                            <div className={styles.categoryInsight}>
                                <span className={styles.insightText}>{category.insight}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Certifications Strip */}
                <div className={styles.certificationsSection}>
                    <div className={styles.certHeader}>
                        <FaAward className={styles.certIcon} />
                        <h3 className={styles.certTitle}>Certifications</h3>
                    </div>
                    <div className={styles.certChips}>
                        {certifications.map((cert, index) => (
                            <div key={index} className={styles.certChip}>
                                <span className={styles.certName}>{cert.name}</span>
                                <span className={styles.certIssuer}>{cert.issuer}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
