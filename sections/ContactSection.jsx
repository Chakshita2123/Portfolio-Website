'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Github, FileDown } from 'lucide-react';

const contactLinks = [
    {
        icon: Mail,
        label: 'Email',
        href: 'mailto:chakshita@example.com',
        color: 'from-lavender/20 to-pastel-pink/10',
        hoverColor: 'hover:border-lavender/50',
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/chakshita',
        color: 'from-sky/20 to-mint/10',
        hoverColor: 'hover:border-sky/50',
    },
    {
        icon: Github,
        label: 'GitHub',
        href: 'https://github.com/Chakshita2123',
        color: 'from-peach/20 to-pastel-pink/10',
        hoverColor: 'hover:border-peach/50',
    },
    {
        icon: FileDown,
        label: 'Resume',
        href: '#',
        color: 'from-mint/20 to-sky/10',
        hoverColor: 'hover:border-mint/50',
    },
];

export default function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="contact" className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
            {/* Gradient Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lavender/5 to-pastel-pink/5" />
                <motion.div
                    className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-lavender/20 to-pastel-pink/10 blur-3xl"
                    animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-sky/15 to-peach/10 blur-3xl"
                    animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                />
            </div>

            <div className="max-w-3xl mx-auto px-6 text-center">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-sm font-semibold tracking-widest uppercase mb-3 text-lavender-dark">
                        Get in Touch
                    </p>
                    <h2
                        className="font-display text-3xl md:text-5xl font-bold mb-6"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Let&apos;s Build Something
                        <br />
                        <span className="gradient-text">Amazing Together</span>
                    </h2>
                    <p className="text-lg mb-12 max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        I&apos;m always excited to connect, collaborate, and explore new opportunities.
                        Feel free to reach out!
                    </p>
                </motion.div>

                {/* Contact Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {contactLinks.map((link, i) => {
                        const Icon = link.icon;
                        return (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target={link.href.startsWith('http') ? '_blank' : undefined}
                                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                                className={`group glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${link.hoverColor}`}
                                style={{ boxShadow: '0 4px 20px var(--shadow-color)' }}
                            >
                                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                                    <Icon size={22} style={{ color: 'var(--text-primary)' }} />
                                </div>
                                <p className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                                    {link.label}
                                </p>
                            </motion.a>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
