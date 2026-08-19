'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './FloatingAIOrb.module.css';

function SparklesIcon({ className }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            width="22"
            height="22"
            aria-hidden="true"
        >
            <path d="M12 2.5C12.3 2.5 12.6 2.7 12.7 3L15.3 9.7L22 12.3C22.4 12.4 22.4 13 22 13.1L15.3 15.7L12.7 22.4C12.6 22.7 12.3 22.9 12 22.9C11.7 22.9 11.4 22.7 11.3 22.4L8.7 15.7L2 13.1C1.6 13 1.6 12.4 2 12.3L8.7 9.7L11.3 3C11.4 2.7 11.7 2.5 12 2.5Z" />
            <path d="M19 2.5C19.2 2.5 19.4 2.6 19.5 2.8L20.5 5.5L23.2 6.5C23.5 6.6 23.5 7 23.2 7.1L20.5 8.1L19.5 10.8C19.4 11 19.2 11.1 19 11.1C18.8 11.1 18.6 11 18.5 10.8L17.5 8.1L14.8 7.1C14.5 7 14.5 6.6 14.8 6.5L17.5 5.5L18.5 2.8C18.6 2.6 18.8 2.5 19 2.5Z" />
        </svg>
    );
}

export default function FloatingAIOrb() {
    const pathname = usePathname();
    const [isHovered, setIsHovered] = useState(false);

    // Hide the floating orb on the actual /ask-ai full page to avoid redundancy
    if (pathname === '/ask-ai') return null;

    return (
        <div className={styles.orbContainer}>
            <Link
                href="/ask-ai"
                className={styles.orbLink}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-label="Ask Chakshita AI Assistant"
                title="Ask Chakshita AI"
            >
                {/* Ambient Breathing Aura */}
                <div className={styles.orbAura} />
                
                {/* 3D Luminous Sphere */}
                <div className={styles.orbSphere}>
                    <div className={styles.orbHighlight} />
                    <div className={styles.orbInnerIcon}>
                        <SparklesIcon className={styles.sparkleIcon} />
                    </div>
                </div>

                {/* Hover Tooltip Label */}
                <div className={`${styles.orbTooltip} ${isHovered ? styles.orbTooltipVisible : ''}`}>
                    <span className={styles.tooltipPulse} />
                    <span className={styles.tooltipText}>Ask AI</span>
                </div>
            </Link>
        </div>
    );
}
