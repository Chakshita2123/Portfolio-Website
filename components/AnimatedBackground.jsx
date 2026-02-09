'use client';
import styles from './AnimatedBackground.module.css';

/**
 * AnimatedBackground - A living, breathing gradient background
 * Uses slow-moving CSS gradients for a calm, premium feel
 */
export default function AnimatedBackground() {
    return (
        <div className={styles.backgroundWrapper}>
            {/* Primary ambient gradient layer */}
            <div className={styles.gradientOrb1}></div>
            
            {/* Secondary gradient layer */}
            <div className={styles.gradientOrb2}></div>
            
            {/* Tertiary soft glow */}
            <div className={styles.gradientOrb3}></div>
            
            {/* Subtle noise overlay for texture */}
            <div className={styles.noiseOverlay}></div>
        </div>
    );
}
