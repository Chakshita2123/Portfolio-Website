'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' }
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

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
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: Theme Toggle + CTA */}
        <div className={styles.navActions}>
          <ThemeToggle />
          <Link href="/ask-ai" className={`btn btn-primary ${styles.navCta}`}>
            Ask AI <span className={styles.ctaEmoji}>🤖</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
