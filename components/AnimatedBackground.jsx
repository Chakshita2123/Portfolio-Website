'use client';
import styles from './AnimatedBackground.module.css';

/**
 * AnimatedBackground - Soft, dreamy animated aurora background
 * Uses sage-neutral palette blobs with smooth GPU-accelerated motion and fine grain overlay.
 */
export default function AnimatedBackground() {
    return (
        <div className={styles.auroraBackground} aria-hidden="true">
            <div className={`${styles.auroraBlob} ${styles.blob1}`} />
            <div className={`${styles.auroraBlob} ${styles.blob2}`} />
            <div className={`${styles.auroraBlob} ${styles.blob3}`} />
            <div className={`${styles.auroraBlob} ${styles.blob4}`} />
            <div className={styles.noiseOverlay} />
        </div>
    );
}
