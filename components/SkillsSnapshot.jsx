'use client';
import { useState } from 'react';
import { FaAward, FaCodeBranch, FaCheckCircle, FaLaptopCode, FaServer, FaBrain, FaTools } from 'react-icons/fa';
import styles from './SkillsSnapshot.module.css';

const treeData = {
    root: {
        title: 'Core Stack',
        subtitle: 'Full-Stack & Applied AI',
        icon: <FaCodeBranch />
    },
    categories: [
        {
            id: 'frontend',
            title: 'Frontend',
            icon: <FaLaptopCode />,
            badgeIcon: '🎨',
            insight: 'React/Next.js architecture & modern styling',
            skills: [
                { name: 'React', icon: 'react', desc: 'Component architecture & state' },
                { name: 'Next.js 15', icon: 'nextjs', desc: 'App Router, SSR & API routes' },
                { name: 'TypeScript', icon: 'ts', desc: 'Strict types & safety' },
                { name: 'JavaScript (ES6+)', icon: 'js', desc: 'Modern async & DOM' },
                { name: 'HTML5 & CSS3', icon: 'html,css', desc: 'Responsive & modular CSS' }
            ]
        },
        {
            id: 'backend',
            title: 'Backend',
            icon: <FaServer />,
            badgeIcon: '⚙️',
            insight: 'API design, server architecture & databases',
            skills: [
                { name: 'Node.js', icon: 'nodejs', desc: 'Async runtime & microservices' },
                { name: 'Express', icon: 'express', desc: 'RESTful API routing' },
                { name: 'Python', icon: 'py', desc: 'ML pipelines & data scripts' },
                { name: 'MongoDB', icon: 'mongodb', desc: 'Mongoose schemas & Atlas' },
                { name: 'REST APIs', icon: 'postman', desc: 'Endpoint design & auth' }
            ]
        },
        {
            id: 'ai-ml',
            title: 'AI / ML & Vision',
            icon: <FaBrain />,
            badgeIcon: '🤖',
            insight: 'Applied ML models + multimodal LLM integration',
            skills: [
                { name: 'scikit-learn & XGBoost', icon: 'py', desc: 'Regression & prediction models' },
                { name: 'Gemini API & Vision', icon: 'tensorflow', desc: 'Multimodal OCR & extraction' },
                { name: 'Groq Cloud', icon: 'py', desc: 'Ultra-low latency LLM inference' },
                { name: 'Prompt Engineering', icon: 'react', desc: 'System prompts & structured output' },
                { name: 'Capacitor', icon: 'androidstudio', desc: 'Native Android bridge' }
            ]
        },
        {
            id: 'tools',
            title: 'Tools & Platforms',
            icon: <FaTools />,
            badgeIcon: '🛠️',
            insight: 'Modern shipping pipelines & developer workflows',
            skills: [
                { name: 'Git & GitHub', icon: 'git', desc: 'Version control & PR workflows' },
                { name: 'VS Code', icon: 'vscode', desc: 'Primary development IDE' },
                { name: 'Vercel', icon: 'vercel', desc: 'CI/CD & cloud deployments' },
                { name: 'Postman', icon: 'postman', desc: 'API testing & documentation' },
                { name: 'Figma', icon: 'figma', desc: 'UI/UX wireframes & design' }
            ]
        }
    ]
};

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
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [activeSkill, setActiveSkill] = useState(null);

    return (
        <section className={`section ${styles.skillsSection}`}>
            <div className="container">
                {/* Header */}
                <div className={styles.header}>
                    <span className="section-label">Skill Tree</span>
                    <h2 className="section-title">
                        Technologies I <span className="gradient-text">Work With</span>
                    </h2>
                    <p className="section-subtitle">
                        A connected, branching technical toolkit built through real projects.
                    </p>
                </div>

                {/* The Skill Tree Network */}
                <div className={styles.treeContainer}>
                    {/* Background Tech Network Grid Overlay */}
                    <div className={styles.treeCanvasGrid} aria-hidden="true" />

                    {/* Tier 0: Root Node */}
                    <div className={styles.rootWrapper}>
                        <div 
                            className={`${styles.rootNode} ${hoveredCategory ? styles.rootConnected : ''}`}
                            onMouseEnter={() => setHoveredCategory('root')}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            <div className={styles.rootPulseRing} />
                            <div className={styles.rootIconCircle}>
                                {treeData.root.icon}
                            </div>
                            <div className={styles.rootContent}>
                                <span className={styles.rootTag}>ROOT NODE</span>
                                <h3 className={styles.rootTitle}>{treeData.root.title}</h3>
                                <span className={styles.rootSubtitle}>{treeData.root.subtitle}</span>
                            </div>
                        </div>

                        {/* Root Trunk Line */}
                        <div className={styles.trunkLine} />
                    </div>

                    {/* Tier 1 & 2: 4 Category Branches & Child Tool Nodes */}
                    <div className={styles.branchesGrid}>
                        {treeData.categories.map((category) => {
                            const isCatActive = hoveredCategory === category.id;

                            return (
                                <div 
                                    key={category.id} 
                                    className={`${styles.branchColumn} ${isCatActive ? styles.branchActive : ''}`}
                                    onMouseEnter={() => setHoveredCategory(category.id)}
                                    onMouseLeave={() => setHoveredCategory(null)}
                                >
                                    {/* Connecting Line from Trunk to Category */}
                                    <div className={styles.categoryConnector} />

                                    {/* Category Branch Node */}
                                    <div className={styles.categoryNode}>
                                        <div className={styles.categoryHeader}>
                                            <span className={styles.categoryIconBadge}>{category.badgeIcon}</span>
                                            <div className={styles.categoryTitleWrapper}>
                                                <span className={styles.branchLabel}>BRANCH</span>
                                                <h4 className={styles.categoryTitle}>{category.title}</h4>
                                            </div>
                                        </div>
                                        <p className={styles.categoryInsight}>{category.insight}</p>
                                    </div>

                                    {/* Vertical Stem down to Tools */}
                                    <div className={styles.toolStemLine} />

                                    {/* Child Tool Nodes */}
                                    <div className={styles.toolNodesList}>
                                        {category.skills.map((skill, idx) => {
                                            const isSkillHovered = activeSkill?.name === skill.name;

                                            return (
                                                <div
                                                    key={idx}
                                                    className={`${styles.toolNode} ${isSkillHovered ? styles.toolNodeHovered : ''}`}
                                                    onMouseEnter={() => setActiveSkill(skill)}
                                                    onMouseLeave={() => setActiveSkill(null)}
                                                >
                                                    {/* Branch leaf connector */}
                                                    <div className={styles.leafConnector} />

                                                    <div className={styles.toolNodeBody}>
                                                        <div className={styles.toolIconContainer}>
                                                            {skill.icon ? (
                                                                <img
                                                                    src={`https://skillicons.dev/icons?i=${skill.icon}`}
                                                                    alt=""
                                                                    className={styles.toolIconImg}
                                                                    loading="lazy"
                                                                />
                                                            ) : (
                                                                <FaCheckCircle className={styles.toolCheck} />
                                                            )}
                                                        </div>

                                                        <div className={styles.toolInfo}>
                                                            <span className={styles.toolName}>{skill.name}</span>
                                                            <span className={styles.toolDesc}>{skill.desc}</span>
                                                        </div>

                                                        <span className={styles.activeDot} title="Skill active & unlocked" />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Active Skill Inspector Bar (Bottom Tooltip) */}
                    <div className={`${styles.inspectorBar} ${activeSkill ? styles.inspectorVisible : ''}`}>
                        <div className={styles.inspectorInner}>
                            <span className={styles.inspectorTag}>NODE INSPECT</span>
                            <span className={styles.inspectorName}>{activeSkill ? activeSkill.name : 'Hover over any node to inspect specialization'}</span>
                            <span className={styles.inspectorDivider}>—</span>
                            <span className={styles.inspectorDesc}>{activeSkill ? activeSkill.desc : 'All skills unlocked & active'}</span>
                        </div>
                    </div>
                </div>

                {/* Certifications Strip */}
                <div className={styles.certificationsSection}>
                    <div className={styles.certHeader}>
                        <FaAward className={styles.certIcon} />
                        <h3 className={styles.certTitle}>Professional Certifications</h3>
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
