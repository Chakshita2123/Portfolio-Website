'use client';
import styles from './OrbitSystem.module.css';

/**
 * OrbitSystem - Hero-only AI core with multiple orbit layers,
 * breathing inner core, and different rotation speeds for depth.
 */
export default function OrbitSystem() {
    return (
        <div className={styles.orbitContainer}>
            <div className={styles.system}>
                {/* Inner breathing core */}
                <div className={styles.nucleus}>
                    <div className={styles.coreInner} />
                    <div className={styles.coreGlow} />
                </div>

                {/* Multiple orbit layers - different speeds for depth */}
                <div className={`${styles.ring} ${styles.ring1}`} />
                <div className={`${styles.ring} ${styles.ring2}`} />
                <div className={`${styles.ring} ${styles.ring3}`} />
                <div className={`${styles.ring} ${styles.ring4}`} />
                <div className={`${styles.ring} ${styles.ring5}`} />

                {/* Orbital nodes on rings */}
                <div className={`${styles.orbit} ${styles.orbit1}`}>
                    <div className={styles.planet} />
                </div>
                <div className={`${styles.orbit} ${styles.orbit2}`}>
                    <div className={styles.planet} />
                </div>
                <div className={`${styles.orbit} ${styles.orbit3}`}>
                    <div className={styles.planet} />
                </div>
            </div>
        </div>
    );
}
