'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const milestones = [
    {
        year: '2023',
        title: 'Started My Coding Journey',
        description: 'Wrote my first line of code. Fell in love with the magic of turning ideas into reality through HTML & CSS.',
        icon: '🚀',
    },
    {
        year: '2023',
        title: 'Discovered JavaScript',
        description: 'Learned the language of interactivity. Building dynamic features felt like a superpower.',
        icon: '⚡',
    },
    {
        year: '2024',
        title: 'Embraced React',
        description: 'Dove into component-based architecture. Building reusable UI felt elegant and powerful.',
        icon: '⚛️',
    },
    {
        year: '2024',
        title: 'Went Full Stack',
        description: 'Added Node.js, Express, and MongoDB to my toolkit. Understanding the complete picture changed everything.',
        icon: '🔗',
    },
    {
        year: '2025',
        title: 'Built Real Projects',
        description: 'Put it all together — shipping real applications, learning from real users, solving real problems.',
        icon: '✨',
    },
    {
        year: 'Future',
        title: 'The Journey Continues',
        description: 'Exploring cloud deployment, advanced patterns, open source, and everything that makes the web better.',
        icon: '🌟',
    },
];

export default function TimelineSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="timeline" className="relative py-24 md:py-32" ref={ref}>
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <p className="text-sm font-semibold tracking-widest uppercase mb-3 text-lavender-dark">
                        My Journey
                    </p>
                    <h2
                        className="font-display text-3xl md:text-5xl font-bold mb-4"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Learning & <span className="gradient-text">Growth</span>
                    </h2>
                    <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        Every milestone tells a story of curiosity, persistence, and evolution.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px">
                        <motion.div
                            className="w-full h-full bg-gradient-to-b from-lavender/50 via-pastel-pink/50 to-sky/50"
                            initial={{ scaleY: 0 }}
                            animate={isInView ? { scaleY: 1 } : {}}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            style={{ transformOrigin: 'top' }}
                        />
                    </div>

                    {/* Milestones */}
                    <div className="space-y-12">
                        {milestones.map((milestone, i) => (
                            <motion.div
                                key={milestone.title}
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    delay: 0.3 + i * 0.15,
                                    duration: 0.7,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Dot */}
                                <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-lavender to-pastel-pink -translate-x-1.5 mt-2 z-10 ring-4"
                                    style={{ ringColor: 'var(--bg-primary)' }}
                                />

                                {/* Content */}
                                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                                    <div
                                        className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                        style={{ boxShadow: '0 4px 20px var(--shadow-color)' }}
                                    >
                                        <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                                            <span className="text-2xl">{milestone.icon}</span>
                                            <span className="text-xs font-bold tracking-widest uppercase text-lavender-dark">
                                                {milestone.year}
                                            </span>
                                        </div>
                                        <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                            {milestone.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
