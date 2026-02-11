'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
    {
        title: 'E-Commerce Store',
        description: 'A full-featured online store with product listings, shopping cart, user authentication, and payment integration. Clean UI with responsive design.',
        tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind'],
        gradient: 'from-lavender/10 via-pastel-pink/5 to-transparent',
        accentColor: 'rgba(196, 181, 253, 0.5)',
        liveUrl: '#',
        githubUrl: '#',
    },
    {
        title: 'Task Management App',
        description: 'A beautiful task manager with drag-and-drop boards, real-time updates, and collaborative features. Built with modern design patterns.',
        tech: ['React', 'Express', 'MongoDB', 'Tailwind'],
        gradient: 'from-sky/10 via-mint/5 to-transparent',
        accentColor: 'rgba(125, 211, 252, 0.5)',
        liveUrl: '#',
        githubUrl: '#',
    },
    {
        title: 'Portfolio Website',
        description: 'This very website! A cinematic scroll-based personal portfolio with smooth animations, glassmorphism design, and attention to every detail.',
        tech: ['Next.js', 'Tailwind', 'Framer Motion', 'GSAP'],
        gradient: 'from-peach/10 via-pastel-pink/5 to-transparent',
        accentColor: 'rgba(253, 186, 116, 0.5)',
        liveUrl: '#',
        githubUrl: '#',
    },
];

const projectVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function ProjectsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="projects" className="relative py-24 md:py-32" ref={ref}>
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <p className="text-sm font-semibold tracking-widest uppercase mb-3 text-lavender-dark">
                        Featured Work
                    </p>
                    <h2
                        className="font-display text-3xl md:text-5xl font-bold mb-4"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Things I&apos;ve <span className="gradient-text">Built</span>
                    </h2>
                    <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        Each project is a learning journey and a step forward.
                    </p>
                </motion.div>

                {/* Projects */}
                <div className="space-y-8">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            variants={projectVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            transition={{ delay: i * 0.2 }}
                            className="group relative"
                        >
                            <div
                                className={`relative rounded-3xl p-8 md:p-10 bg-gradient-to-br ${project.gradient} transition-all duration-500 hover:-translate-y-2`}
                                style={{
                                    border: '1px solid var(--border-color)',
                                    boxShadow: '0 4px 24px var(--shadow-color)',
                                }}
                            >
                                {/* Glow effect */}
                                <div
                                    className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                                    style={{ background: project.accentColor }}
                                />

                                {/* Project Preview Placeholder */}
                                <div
                                    className="w-full h-48 md:h-56 rounded-2xl mb-6 overflow-hidden"
                                    style={{
                                        background: `linear-gradient(135deg, var(--bg-secondary), var(--surface))`,
                                        border: '1px solid var(--border-color)',
                                    }}
                                >
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-lavender/30 to-pastel-pink/20 flex items-center justify-center">
                                                <span className="text-2xl">✨</span>
                                            </div>
                                            <p className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>
                                                {project.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <h3
                                    className="font-display text-2xl font-bold mb-3"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {project.title}
                                </h3>
                                <p className="mb-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                    {project.description}
                                </p>

                                {/* Tech Stack Badges */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5"
                                            style={{
                                                background: 'var(--bg-secondary)',
                                                color: 'var(--text-primary)',
                                                border: '1px solid var(--border-color)',
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                        style={{ background: 'var(--gradient-accent)' }}
                                    >
                                        <ExternalLink size={15} />
                                        Live Demo
                                    </a>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold glass transition-all duration-300 hover:-translate-y-1"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        <Github size={15} />
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
