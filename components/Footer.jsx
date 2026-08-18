'use client';
import Link from 'next/link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdEmail, MdArrowOutward } from 'react-icons/md';
import styles from './Footer.module.css';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Skills', href: '/skills' },
    { name: 'Projects', href: '/projects' },
    { name: 'Ask AI', href: '/ask-ai' },
    { name: 'Contact', href: '/contact' },
];

const socialLinks = [
    { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/chakshita-jaswal-4a691a2ba/' },
    { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/Chakshita2123' },
    { name: 'Email', icon: <MdEmail />, url: 'mailto:chakshitajaswal2106@gmail.com' },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContainer}`}>
                {/* 4-Column Main Content */}
                <div className={styles.columnsGrid}>
                    {/* Col 1: Brand */}
                    <div className={styles.brandCol}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoText}>Chakshita</span>
                            <span className={styles.logoAi}>.ai</span>
                        </Link>
                        <p className={styles.brandTagline}>
                            Full-Stack Developer &amp; Applied AI/ML Builder
                        </p>
                        <p className={styles.brandBio}>
                            Building production-ready software and intelligent systems end-to-end.
                        </p>
                        <div className={styles.availability}>
                            <span className={styles.statusDot}></span>
                            <span>Open for opportunities</span>
                        </div>
                    </div>

                    {/* Col 2: Navigate */}
                    <div className={styles.navCol}>
                        <h4 className={styles.colTitle}>Navigate</h4>
                        <ul className={styles.linksList}>
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className={styles.linkItem}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Connect */}
                    <div className={styles.connectCol}>
                        <h4 className={styles.colTitle}>Connect</h4>
                        <ul className={styles.linksList}>
                            {socialLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.url}
                                        target={link.url.startsWith('http') ? '_blank' : undefined}
                                        rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className={styles.socialLinkItem}
                                    >
                                        <span className={styles.socialIcon}>{link.icon}</span>
                                        <span>{link.name}</span>
                                        {link.url.startsWith('http') && (
                                            <MdArrowOutward className={styles.arrowIcon} />
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4: Get in Touch */}
                    <div className={styles.ctaCol}>
                        <h4 className={styles.colTitle}>Get in Touch</h4>
                        <p className={styles.ctaText}>
                            Have a project in mind or interested in collaborating? Let's connect.
                        </p>
                        <Link href="/contact" className={styles.contactBtn}>
                            Start a Conversation →
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <div className={styles.divider}></div>

                {/* Bottom Row */}
                <div className={styles.bottomRow}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} Chakshita Jaswal. All rights reserved.
                    </p>
                    <p className={styles.taglineNote}>
                        Designed with intention
                    </p>
                </div>
            </div>
        </footer>
    );
}
