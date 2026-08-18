'use client';
import styles from './SkillsOverview.module.css';

const skillCategories = [
    {
        title: 'Frontend',
        icon: '🎨',
        skills: ['React', 'Next.js 15', 'TypeScript', 'JavaScript', 'CSS Modules', 'HTML/CSS']
    },
    {
        title: 'Backend',
        icon: '⚙️',
        skills: ['Node.js', 'Express', 'Python', 'MongoDB', 'REST APIs', 'NextAuth']
    },
    {
        title: 'AI / ML & Automation',
        icon: '🤖',
        skills: ['Gemini API', 'Groq', 'scikit-learn', 'XGBoost', 'Prompt Engineering', 'Gemini Vision']
    },
    {
        title: 'Tools & Platforms',
        icon: '🛠️',
        skills: ['Git / GitHub', 'Capacitor', 'Monaco Editor', 'Vercel', 'VS Code', 'Postman']
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
