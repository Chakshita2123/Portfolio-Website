'use client';
import { useState, useEffect } from 'react';
import styles from './SkillsSnapshot.module.css';

const skillCategories = [
    {
        title: 'Frontend',
        icon: '🎨',
        skills: ['React', 'Next.js', 'JavaScript', 'HTML/CSS', 'TypeScript'],
        aiInsight: 'Core strength - React component architecture and modern CSS'
    },
    {
        title: 'Backend',
        icon: '⚙️',
        skills: ['Node.js', 'Express', 'Python', 'REST APIs'],
        aiInsight: 'Full-stack capability for complete project development'
    },
    {
        title: 'AI / Automation',
        icon: '🤖',
        skills: ['OpenAI API', 'LangChain', 'Prompt Engineering', 'Chatbots'],
        aiInsight: 'Practical AI integration with production-ready features'
    },
    {
        title: 'Tools & Platforms',
        icon: '🛠️',
        skills: ['Git', 'VS Code', 'Figma', 'Vercel', 'MongoDB'],
        aiInsight: 'Modern development workflow and deployment expertise'
    }
];

const aiInsights = [
    { icon: '🎯', text: 'Strongest in React/Next.js with practical AI integration experience' },
    { icon: '💡', text: 'Product-focused mindset - builds features that solve real problems' },
    { icon: '🚀', text: 'Rapidly adapts to new technologies and frameworks' },
    { icon: '✨', text: 'Combines clean code practices with user-centered design' }
];

export default function SkillsSnapshot() {
    const [activeCategory, setActiveCategory] = useState(null);
    const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    // Rotate AI insights
    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentInsightIndex((prev) => (prev + 1) % aiInsights.length);
                setIsVisible(true);
            }, 300);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className={`section ${styles.skills}`}>
            <div className="container">
                <div className={styles.header}>
                    <span className="ai-badge">Skills</span>
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
                                    <span key={skillIndex} className="tag">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* AI Insight on Hover */}
                            <div className={styles.categoryInsight}>
                                <span className={styles.insightIcon}>✨</span>
                                <span className={styles.insightText}>{category.aiInsight}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* AI Insight Banner */}
                <div className={styles.aiInsightBanner}>
                    <div className={styles.insightBadge}>
                        <span className={styles.sparkle}>✨</span>
                        <span>AI Insight</span>
                    </div>
                    <div className={`${styles.insightContent} ${isVisible ? styles.insightVisible : styles.insightHidden}`}>
                        <span className={styles.insightEmoji}>{aiInsights[currentInsightIndex].icon}</span>
                        <span className={styles.insightMessage}>{aiInsights[currentInsightIndex].text}</span>
                    </div>
                    <div className={styles.insightDots}>
                        {aiInsights.map((_, idx) => (
                            <span
                                key={idx}
                                className={`${styles.insightDot} ${currentInsightIndex === idx ? styles.insightDotActive : ''}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
