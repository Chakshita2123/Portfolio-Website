'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Lightbulb, Code2, Sparkles } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    }),
};

const storyParagraphs = [
    {
        icon: Heart,
        title: 'Passion for Development',
        text: "I didn't just discover coding — I fell in love with it. There's something magical about turning ideas into interactive experiences that people can use and enjoy. Every project is a new canvas.",
    },
    {
        icon: Code2,
        title: 'Frontend + Backend Balance',
        text: "I believe great products need both a beautiful face and a strong backbone. I'm drawn to understanding the full picture — from crafting pixel-perfect UIs to architecting robust server-side logic.",
    },
    {
        icon: Lightbulb,
        title: 'Problem Solving Mindset',
        text: "Each bug is a puzzle, each feature is a challenge. I thrive on the process of breaking down complex problems into elegant solutions. The 'aha' moment never gets old.",
    },
    {
        icon: Sparkles,
        title: 'Always Growing',
        text: "I'm not just learning technologies — I'm evolving as a developer. Every day brings new concepts to explore, new patterns to master, and new opportunities to push my boundaries.",
    },
];

const infoCards = [
    { label: 'Currently Learning', value: 'React & Next.js Ecosystem' },
    { label: 'Tech Interests', value: 'Full Stack Development, UI/UX' },
    { label: 'Fun Fact', value: 'I debug with music on 🎵' },
];

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" className="relative py-24 md:py-32" ref={ref}>
            <div className="max-w-5xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    custom={0}
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="mb-16"
                >
                    <p className="text-sm font-semibold tracking-widest uppercase mb-3 text-lavender-dark">
                        About Me
                    </p>
                    <h2
                        className="font-display text-3xl md:text-5xl font-bold mb-6"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        The Story Behind
                        <br />
                        <span className="gradient-text">the Code</span>
                    </h2>
                    <p className="text-lg max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        I&apos;m Chakshita — an aspiring full stack developer who believes that technology should feel as good as it works.
                    </p>
                </motion.div>

                {/* Story Paragraphs */}
                <div className="grid gap-6 md:gap-8 mb-16">
                    {storyParagraphs.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.title}
                                custom={i + 1}
                                variants={fadeUp}
                                initial="hidden"
                                animate={isInView ? 'visible' : 'hidden'}
                                className="group flex gap-5 p-6 rounded-2xl transition-all duration-300 hover:bg-lavender/5"
                                style={{ border: '1px solid transparent' }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-lavender/20 to-pastel-pink/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                    <Icon size={22} className="text-lavender-dark" />
                                </div>
                                <div>
                                    <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                        {item.title}
                                    </h3>
                                    <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                        {item.text}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Info Cards */}
                <motion.div
                    custom={5}
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid sm:grid-cols-3 gap-4"
                >
                    {infoCards.map((card) => (
                        <div
                            key={card.label}
                            className="glass rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            style={{ boxShadow: '0 4px 20px var(--shadow-color)' }}
                        >
                            <p className="text-xs font-semibold tracking-widest uppercase mb-2 text-lavender-dark">
                                {card.label}
                            </p>
                            <p className="font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
                                {card.value}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
