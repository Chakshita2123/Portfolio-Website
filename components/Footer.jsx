'use client';
import Link from 'next/link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import styles from './Footer.module.css';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Skills', href: '/skills' },
    { name: 'Projects', href: '/projects' },
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
                {/* Main Content */}
                <div className={styles.mainContent}>
                    {/* Branding */}
                    <div className={styles.branding}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoText}>Chakshita</span>
                            <span className={styles.logoAi}>.ai</span>
                        </Link>
                        <p className={styles.brandTagline}>
                            An AI-ready personal portfolio
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <nav className={styles.navSection}>
                        <h4 className={styles.sectionTitle}>Navigate</h4>
                        <ul className={styles.navLinks}>
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className={styles.navLink}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Social Links */}
                    <div className={styles.socialSection}>
                        <h4 className={styles.sectionTitle}>Connect</h4>
                        <div className={styles.socialLinks}>
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target={link.url.startsWith('http') ? '_blank' : undefined}
                                    rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className={styles.socialLink}
                                    title={link.name}
                                >
                                    <span className={styles.socialIcon}>{link.icon}</span>
                                    <span className={styles.socialName}>{link.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* AI Note */}
                <div className={styles.aiNote}>
                    <span className={styles.aiNoteIcon}>✨</span>
                    <span>Designed as an AI-ready portfolio — UI first, intelligence later.</span>
                </div>

                {/* Divider */}
                <div className={styles.divider}></div>

                {/* Bottom */}
                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © 2026 Chakshita.ai
                    </p>
                    <p className={styles.madeWith}>
                        Designed with intention
                    </p>
                </div>
            </div>
        </footer>
    );
}
