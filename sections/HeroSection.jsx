'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const textReveal = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.3 + i * 0.15,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export default function HeroSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            id="hero"
        >
            {/* Animated gradient mesh background */}
            <div className="absolute inset-0 -z-10">
                <div
                    className="absolute inset-0 animate-gradient-shift"
                    style={{
                        background: 'var(--gradient-hero)',
                        backgroundSize: '200% 200%',
                    }}
                />
                {/* Floating gradient orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-lavender/40 to-pastel-pink/30 blur-3xl"
                    animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-sky/30 to-peach/25 blur-3xl"
                    animate={{ y: [0, 30, 0], x: [0, -25, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-peach/20 to-lavender/15 blur-3xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            {/* Hero Content */}
            <motion.div
                style={{ opacity, scale, y }}
                className="relative z-10 text-center px-6 max-w-4xl mx-auto"
            >
                {/* Floating glow behind name */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-gradient-to-r from-lavender/30 via-pastel-pink/20 to-sky/30 blur-3xl rounded-full" />

                <motion.p
                    custom={0}
                    variants={textReveal}
                    initial="hidden"
                    animate="visible"
                    className="relative text-sm md:text-base font-medium tracking-widest uppercase mb-6"
                    style={{ color: 'var(--text-tertiary)' }}
                >
                    Welcome to my world
                </motion.p>

                <motion.h1
                    custom={1}
                    variants={textReveal}
                    initial="hidden"
                    animate="visible"
                    className="relative font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-4"
                    style={{ color: 'var(--text-primary)' }}
                >
                    Hi, I&apos;m{' '}
                    <span className="gradient-text">Chakshita</span>
                    <span className="opacity-30">.</span>
                </motion.h1>

                <motion.h2
                    custom={2}
                    variants={textReveal}
                    initial="hidden"
                    animate="visible"
                    className="relative font-display text-2xl sm:text-3xl md:text-4xl font-semibold mb-6"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    Aspiring Full Stack Developer
                </motion.h2>

                <motion.p
                    custom={3}
                    variants={textReveal}
                    initial="hidden"
                    animate="visible"
                    className="relative text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
                    style={{ color: 'var(--text-tertiary)' }}
                >
                    I build beautiful and functional web experiences.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    custom={4}
                    variants={textReveal}
                    initial="hidden"
                    animate="visible"
                    className="relative flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-3.5 rounded-2xl text-white font-semibold text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-lavender/25"
                        style={{ background: 'var(--gradient-accent)' }}
                    >
                        View My Work
                    </button>
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-3.5 rounded-2xl font-semibold text-base transition-all duration-300 hover:-translate-y-1 glass"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Get in Touch
                    </button>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--text-tertiary)' }}>
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <ChevronDown size={20} style={{ color: 'var(--text-tertiary)' }} />
                </motion.div>
            </motion.div>
        </section>
    );
}
