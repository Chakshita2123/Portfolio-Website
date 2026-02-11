'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';
import { Folder, Cpu, Award, GitBranch } from 'lucide-react';

const stats = [
    {
        icon: Folder,
        value: 10,
        suffix: '+',
        label: 'Projects Built',
        color: 'from-lavender/20 to-pastel-pink/10',
        iconColor: 'text-lavender-dark',
    },
    {
        icon: Cpu,
        value: 12,
        suffix: '+',
        label: 'Technologies Learned',
        color: 'from-sky/20 to-mint/10',
        iconColor: 'text-sky-dark',
    },
    {
        icon: Award,
        value: 3,
        suffix: '',
        label: 'Certifications',
        color: 'from-peach/20 to-pastel-pink/10',
        iconColor: 'text-peach-dark',
    },
    {
        icon: GitBranch,
        value: 50,
        suffix: '+',
        label: 'Contributions',
        color: 'from-mint/20 to-sky/10',
        iconColor: 'text-mint',
    },
];

export default function AchievementsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="achievements" className="relative py-24 md:py-32" ref={ref}>
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <p className="text-sm font-semibold tracking-widest uppercase mb-3 text-lavender-dark">
                        Highlights
                    </p>
                    <h2
                        className="font-display text-3xl md:text-5xl font-bold mb-4"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        By the <span className="gradient-text">Numbers</span>
                    </h2>
                    <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        A snapshot of my journey so far.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                transition={{
                                    delay: i * 0.1,
                                    duration: 0.6,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <div
                                    className={`glass rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group`}
                                    style={{ boxShadow: '0 4px 20px var(--shadow-color)' }}
                                >
                                    {/* Icon */}
                                    <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                                        <Icon size={24} className={stat.iconColor} />
                                    </div>

                                    {/* Number */}
                                    <div
                                        className="font-display text-3xl md:text-4xl font-bold mb-2"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                    </div>

                                    {/* Label */}
                                    <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                                        {stat.label}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
