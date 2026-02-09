'use client';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>Chakshita</span>
          <span className={styles.logoAi}>.ai</span>
        </Link>

        {/* Navigation Links */}
        <ul className={styles.navLinks}>
          <li><Link href="/" className={styles.navLink}>Home</Link></li>
          <li><Link href="/about" className={styles.navLink}>About</Link></li>
          <li><Link href="/skills" className={styles.navLink}>Skills</Link></li>
          <li><Link href="/projects" className={styles.navLink}>Projects</Link></li>
          <li><Link href="/contact" className={styles.navLink}>Contact</Link></li>
        </ul>

        {/* CTA Button - Links to Ask AI page */}
        <Link href="/ask-ai" className={`btn btn-primary ${styles.navCta}`}>
          Ask AI <span className={styles.ctaEmoji}>🤖</span>
        </Link>
      </div>
    </nav>
  );
}
