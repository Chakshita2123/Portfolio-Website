'use client';
import { useRef } from 'react';
import styles from './PersonalTouch.module.css';

/**
 * Interactive 'Outside Work' section.
 * Features a dark theme and 3 hover-reveal cards for hobbies/interests.
 */
export default function PersonalTouch() {
    const interests = [
        {
            icon: '🎨',
            title: 'Creative Coding',
            description: 'Experimenting with generative art, WebGL, and blending design with logic.',
            tags: ['p5.js', 'Three.js', 'UI Design']
        },
        {
            icon: '📚',
            title: 'Curious Reader',
            description: 'Devouring books on product design, psychology, and sci-fi futures.',
            tags: ['Design of Everyday Things', 'Sci-Fi', 'Psychology']
        },
        {
            icon: '🎮',
            title: 'Strategic Gaming',
            description: 'Unwinding with strategy games that challenge problem-solving skills.',
            tags: ['Puzzle Games', 'RTS', 'FPS']
        }
    ];

    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        Beyond the <span className="gradient-text">Code</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Fueling creativity through diverse passions
                    </p>
                </div>

                <div className={styles.grid}>
                    {interests.map((item, index) => (
                        <div
                            key={index}
                            className={styles.card}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className={styles.iconWrapper}>
                                {item.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <p className={styles.details}>{item.description}</p>

                            <div className={styles.tagList}>
                                {item.tags.map((tag, i) => (
                                    <span key={i} className={styles.tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
