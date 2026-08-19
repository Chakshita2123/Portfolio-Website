'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaSparkles } from 'react-icons/fa6';
import styles from './FloatingAIOrb.module.css';

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
                        <FaSparkles className={styles.sparkleIcon} />
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
