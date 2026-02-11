'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TiltCard from '../components/TiltCard';

const skillCategories = [
    {
        title: 'Frontend',
        color: 'from-lavender/20 to-pastel-pink/10',
        glowColor: 'rgba(196, 181, 253, 0.25)',
        borderColor: 'rgba(196, 181, 253, 0.3)',
        skills: [
            { name: 'HTML', desc: 'Semantic markup & accessibility' },
            { name: 'CSS', desc: 'Layouts, animations, responsive design' },
            { name: 'JavaScript', desc: 'ES6+, async, DOM manipulation' },
            { name: 'React', desc: 'Components, hooks, state management' },
            { name: 'Tailwind', desc: 'Utility-first styling framework' },
        ],
    },
    {
        title: 'Backend',
        color: 'from-sky/20 to-mint/10',
        glowColor: 'rgba(125, 211, 252, 0.25)',
        borderColor: 'rgba(125, 211, 252, 0.3)',
        skills: [
            { name: 'Node.js', desc: 'Server-side JavaScript runtime' },
            { name: 'Express', desc: 'Web framework for REST APIs' },
            { name: 'MongoDB', desc: 'NoSQL database & aggregation' },
            { name: 'APIs', desc: 'RESTful design & integration' },
        ],
    },
    {
        title: 'Tools',
        color: 'from-peach/20 to-pastel-pink/10',
        glowColor: 'rgba(253, 186, 116, 0.25)',
        borderColor: 'rgba(253, 186, 116, 0.3)',
        skills: [
            { name: 'Git', desc: 'Version control & branching' },
            { name: 'GitHub', desc: 'Collaboration & open source' },
            { name: 'VS Code', desc: 'Extensions & productivity' },
        ],
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.08,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export default function SkillsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="skills" className="relative py-24 md:py-32" ref={ref}>
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <p className="text-sm font-semibold tracking-widest uppercase mb-3 text-lavender-dark">
                        Skills & Technologies
                    </p>
                    <h2
                        className="font-display text-3xl md:text-5xl font-bold mb-4"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        My <span className="gradient-text">Toolkit</span>
                    </h2>
                    <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        Technologies I work with to bring ideas to life.
                    </p>
                </motion.div>

                {/* Skill Categories */}
                <div className="space-y-12">
                    {skillCategories.map((category, catIdx) => (
                        <div key={category.title}>
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: catIdx * 0.2, duration: 0.5 }}
                                className="font-display text-xl font-semibold mb-6 flex items-center gap-3"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                <span className={`w-8 h-1 rounded-full bg-gradient-to-r ${category.color}`} />
                                {category.title}
                            </motion.h3>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {category.skills.map((skill, i) => (
                                    <motion.div
                                        key={skill.name}
                                        custom={catIdx * 5 + i}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate={isInView ? 'visible' : 'hidden'}
                                    >
                                        <TiltCard
                                            glowColor={category.glowColor}
                                            className="group rounded-2xl transition-all duration-300 hover:-translate-y-1"
                                        >
                                            <div
                                                className={`relative p-5 rounded-2xl bg-gradient-to-br ${category.color} transition-all duration-300 h-full`}
                                                style={{
                                                    border: `1px solid ${category.borderColor}`,
                                                    boxShadow: '0 2px 12px var(--shadow-color)',
                                                }}
                                            >
                                                <h4
                                                    className="font-display font-semibold text-base mb-1"
                                                    style={{ color: 'var(--text-primary)' }}
                                                >
                                                    {skill.name}
                                                </h4>
                                                <p
                                                    className="text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    style={{ color: 'var(--text-secondary)' }}
                                                >
                                                    {skill.desc}
                                                </p>
                                            </div>
                                        </TiltCard>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
