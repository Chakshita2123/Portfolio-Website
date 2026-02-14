'use client';
import styles from './SkillsOverview.module.css';

const skillCategories = [
    {
        title: 'Frontend',
        icon: '🎨',
        skills: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion']
    },
    {
        title: 'Backend',
        icon: '⚙️',
        skills: ['Node.js', 'Express', 'Python', 'MongoDB', 'PostgreSQL']
    },
    {
        title: 'AI & Data',
        icon: '🧠',
        skills: ['OpenAI API', 'LangChain', 'RAG Systems', 'Vector DBs', 'Pandas']
    },
    {
        title: 'Tools',
        icon: '🛠️',
        skills: ['Git', 'Docker', 'Figma', 'Vercel', 'VS Code']
    }
];

export default function SkillsOverview() {
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div className={styles.grid}>
            {skillCategories.map((category, index) => (
                <div
                    key={index}
                    className={styles.card}
                    style={{ transitionDelay: `${index * 50}ms` }}
                    onMouseMove={handleMouseMove}
                >
                    <div className={styles.spotlight} />
                    <div className={styles.categoryHeader}>
                        <div className={styles.iconWrapper}>{category.icon}</div>
                        <h3 className={styles.categoryTitle}>{category.title}</h3>
                    </div>

                    <div className={styles.skillList}>
                        {category.skills.map((skill, i) => (
                            <span key={i} className={styles.skillTag}>{skill}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
