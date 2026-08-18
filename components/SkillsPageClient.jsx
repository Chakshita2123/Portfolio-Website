'use client';
import { FaAward } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '@/app/skills/skills.module.css';

const skillCategories = [
    {
        title: 'Frontend Development',
        level: 'Core Strength',
        levelClass: 'levelCore',
        icon: '🎨',
        skills: [
            { name: 'React', description: 'Component architecture, hooks, state management', icon: 'react' },
            { name: 'Next.js 15', description: 'App Router, SSR, streaming SSE, API routes', icon: 'nextjs' },
            { name: 'JavaScript / TypeScript', description: 'ES6+, async patterns, type safety', icon: 'js,ts' },
            { name: 'HTML & CSS Modules', description: 'Semantic markup, Flexbox, Grid, CSS animations', icon: 'html,css' },
            { name: 'Monaco Editor', description: 'In-browser code editor integration with syntax highlighting', icon: 'vscode' },
        ]
    },
    {
        title: 'Backend & Data',
        level: 'Full-Stack',
        levelClass: 'levelWorking',
        icon: '⚙️',
        skills: [
            { name: 'Node.js & Express', description: 'REST APIs, server-sent events, middleware', icon: 'nodejs,express' },
            { name: 'MongoDB', description: 'Database schema modelling, Mongoose, Atlas', icon: 'mongodb' },
            { name: 'Python', description: 'ML training pipelines, data preprocessing, scripting', icon: 'py' },
            { name: 'NextAuth & OAuth', description: 'Google OAuth, session management, route protection', icon: 'postman' },
        ]
    },
    {
        title: 'AI / ML & Automation',
        level: 'Core Focus',
        levelClass: 'levelCore',
        icon: '🤖',
        skills: [
            { name: 'Gemini API & Vision', description: 'Multimodal analysis, timetable OCR, code review', icon: 'tensorflow' },
            { name: 'Groq', description: 'High-speed LLM inference, fallback routing', icon: 'py' },
            { name: 'scikit-learn & XGBoost', description: 'Real regression models, prediction pipelines', icon: 'py' },
            { name: 'Prompt Engineering', description: 'Structured JSON output, error recovery, guardrails', icon: 'react' },
        ]
    },
    {
        title: 'Platforms & Tools',
        level: 'Deployment',
        levelClass: 'levelWorking',
        icon: '🛠️',
        skills: [
            { name: 'Capacitor', description: 'Deploying cross-platform web apps to native Android APKs', icon: 'androidstudio' },
            { name: 'Git & GitHub', description: 'Version control, PR reviews, release workflows', icon: 'git,github' },
            { name: 'Vercel', description: 'Serverless deployment, edge configuration, CI/CD', icon: 'vercel' },
            { name: 'Postman', description: 'API testing, documentation, and endpoint verification', icon: 'postman' },
        ]
    },
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

export default function SkillsPageClient() {
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <>
            <Navbar />
            <main className={styles.skillsPage}>
                {/* Page Header */}
                <section className={styles.pageHeader}>
                    <div className="container">
                        <span className={`section-label ${styles.animateIn}`}>Capabilities</span>
                        <h1 className={`${styles.pageTitle} ${styles.animateIn} ${styles.delay1}`}>
                            Skills &amp; Technologies
                        </h1>
                        <p className={`${styles.pageSubtitle} ${styles.animateIn} ${styles.delay2}`}>
                            A toolkit built for end-to-end product development — from frontend to ML model training.
                        </p>
                    </div>
                </section>

                {/* Core Skill Categories */}
                <section className={`section ${styles.skillCategories}`}>
                    <div className="container">
                        <div className={styles.categoriesGrid}>
                            {skillCategories.map((category, index) => (
                                <div
                                    key={index}
                                    className={`${styles.categoryCard} ${styles.animateIn}`}
                                    style={{ animationDelay: `${index * 0.08}s` }}
                                    onMouseMove={handleMouseMove}
                                >
                                    <div className={styles.spotlight} />
                                    <div className={styles.cardHeader}>
                                        <span className={styles.cardIcon}>{category.icon}</span>
                                        <div className={styles.cardTitleGroup}>
                                            <h2 className={styles.cardTitle}>{category.title}</h2>
                                            <span className={`${styles.levelBadge} ${styles[category.levelClass]}`}>
                                                {category.level}
                                            </span>
                                        </div>
                                    </div>

                                    <ul className={styles.skillList}>
                                        {category.skills.map((skill, skillIndex) => (
                                            <li key={skillIndex} className={styles.skillItem}>
                                                <div className={styles.skillHeader}>
                                                    {skill.icon && (
                                                        <img
                                                            src={`https://skillicons.dev/icons?i=${skill.icon}`}
                                                            alt={`${skill.name} icon`}
                                                            className={styles.skillIcon}
                                                            loading="lazy"
                                                        />
                                                    )}
                                                    <span className={styles.skillName}>{skill.name}</span>
                                                </div>
                                                <span className={styles.skillDescription}>{skill.description}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Certifications Section */}
                <section className={`section ${styles.certificationsSection}`}>
                    <div className="container">
                        <div className={styles.certCard}>
                            <div className={styles.certHeader}>
                                <FaAward className={styles.certIcon} />
                                <div>
                                    <h2 className={styles.certTitle}>Certifications</h2>
                                    <p className={styles.certSubtitle}>Verified professional specializations and courses</p>
                                </div>
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

                {/* How I Apply These Skills */}
                <section className={`section ${styles.application}`}>
                    <div className="container">
                        <div className={`${styles.applicationContent} ${styles.animateIn}`}>
                            <h2 className={styles.sectionTitle}>
                                How I <span className="gradient-text">Apply</span> These Skills
                            </h2>
                            <p className={styles.applicationText}>
                                I don't just learn technologies — I apply them to solve real problems.
                                Every project I build focuses on creating value for users, whether that's
                                an AI-assisted code review platform, a native Android attendance app, or a
                                travel cost predictor built around a trained ML model.
                            </p>
                            <p className={styles.applicationText}>
                                My approach is always <strong>product-focused</strong>: understand the problem
                                first, train or integrate the right tools second, and ship working software end-to-end.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className={`section ${styles.cta}`}>
                    <div className="container">
                        <div className={`${styles.ctaContent} ${styles.animateIn}`}>
                            <h2 className={styles.ctaTitle}>Want to see these skills in action?</h2>
                            <p className={styles.ctaSubtitle}>
                                Explore my projects and case studies to see these technologies in production.
                            </p>
                            <a href="/projects" className="btn btn-primary">
                                View Projects <span>→</span>
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
