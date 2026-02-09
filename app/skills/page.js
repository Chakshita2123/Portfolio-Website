import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './skills.module.css';

export const metadata = {
    title: "Skills & Capabilities | Chakshita.ai",
    description: "A focused overview of the technologies and skills I actively work with — frontend development, AI integration, and modern web tools.",
};

const skillCategories = [
    {
        title: 'Frontend Development',
        level: 'Core Focus',
        levelClass: 'levelCore',
        icon: '🎨',
        skills: [
            { name: 'React', description: 'Component architecture, hooks, state management' },
            { name: 'Next.js', description: 'SSR, routing, API routes, optimization' },
            { name: 'JavaScript / TypeScript', description: 'ES6+, async/await, type safety' },
            { name: 'HTML & CSS', description: 'Semantic markup, Flexbox, Grid, animations' },
            { name: 'Responsive Design', description: 'Mobile-first, cross-browser compatibility' },
        ]
    },
    {
        title: 'Backend (Foundational)',
        level: 'Working Knowledge',
        levelClass: 'levelWorking',
        icon: '⚙️',
        skills: [
            { name: 'Node.js', description: 'Express basics, REST APIs, middleware' },
            { name: 'API Integration', description: 'Fetching, authentication, error handling' },
            { name: 'Database Basics', description: 'MongoDB, PostgreSQL fundamentals' },
        ]
    },
    {
        title: 'AI & Automation',
        level: 'Core Focus',
        levelClass: 'levelCore',
        icon: '🤖',
        skills: [
            { name: 'AI API Integration', description: 'OpenAI, LangChain, prompt engineering' },
            { name: 'Prompt Design', description: 'Structuring prompts for reliable outputs' },
            { name: 'AI-Enhanced UX', description: 'Building intelligent user experiences' },
            { name: 'Automation Workflows', description: 'Streamlining repetitive tasks' },
        ]
    },
    {
        title: 'Tools & Platforms',
        level: 'Working Knowledge',
        levelClass: 'levelWorking',
        icon: '🛠️',
        skills: [
            { name: 'Git & GitHub', description: 'Version control, branching, collaboration' },
            { name: 'VS Code', description: 'Extensions, debugging, productivity' },
            { name: 'Deployment', description: 'Vercel, Netlify, CI/CD basics' },
            { name: 'Figma', description: 'Design handoffs, prototyping' },
        ]
    }
];

export default function SkillsPage() {
    return (
        <>
            <Navbar />
            <main className={styles.skillsPage}>
                {/* Page Header */}
                <section className={styles.pageHeader}>
                    <div className="container">
                        <span className={`ai-badge ${styles.animateIn}`}>Capabilities</span>
                        <h1 className={`${styles.pageTitle} ${styles.animateIn} ${styles.delay1}`}>
                            Skills & Capabilities
                        </h1>
                        <p className={`${styles.pageSubtitle} ${styles.animateIn} ${styles.delay2}`}>
                            A focused overview of the technologies and skills I actively work with.
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
                                    className={`${styles.categoryCard} ${styles.animateIn} ${category.level === 'Core Focus' ? styles.coreCategory : ''}`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
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
                                                <span className={styles.skillName}>{skill.name}</span>
                                                <span className={styles.skillDescription}>{skill.description}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* AI Insight Placeholder */}
                <section className={`section ${styles.aiInsight}`}>
                    <div className="container">
                        <div className={`${styles.aiCard} ${styles.animateIn}`}>
                            <div className={styles.aiCardContent}>
                                <div className={styles.aiCardHeader}>
                                    <span className={styles.aiIcon}>✨</span>
                                    <h3 className={styles.aiTitle}>AI-Powered Skill Analysis</h3>
                                </div>
                                <p className={styles.aiDescription}>
                                    AI-powered analysis will highlight my strongest skills based on real
                                    project usage, showing depth and experience in each area.
                                </p>
                                <div className={styles.aiPreviewBars}>
                                    <div className={styles.previewBar}>
                                        <span className={styles.barLabel}>React</span>
                                        <div className={styles.barTrack}>
                                            <div className={styles.barFill} style={{ width: '90%' }}></div>
                                        </div>
                                    </div>
                                    <div className={styles.previewBar}>
                                        <span className={styles.barLabel}>Next.js</span>
                                        <div className={styles.barTrack}>
                                            <div className={styles.barFill} style={{ width: '85%' }}></div>
                                        </div>
                                    </div>
                                    <div className={styles.previewBar}>
                                        <span className={styles.barLabel}>AI Integration</span>
                                        <div className={styles.barTrack}>
                                            <div className={styles.barFill} style={{ width: '75%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.aiCardDecor}></div>
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
                                a smoother interface, a smarter workflow, or an experience that just
                                feels right.
                            </p>
                            <p className={styles.applicationText}>
                                My approach is always <strong>user-centric</strong>: understand the problem
                                first, choose the right tools second. The best code is code that serves
                                people, not just passes tests.
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
                                Explore my projects and see how I apply these technologies to real problems.
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
