import styles from './CurrentlyBuilding.module.css';

export default function CurrentlyBuilding() {
    return (
        <div className={styles.wrapper}>
            <div className={`container ${styles.container}`}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <span className={styles.indicator}>●</span>
                        <span className={styles.title}>Currently building:</span>
                    </div>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <span className={styles.arrow}>→</span>
                            <span>Migrating MARKD to native Android with Capacitor</span>
                        </li>
                        <li className={styles.item}>
                            <span className={styles.arrow}>→</span>
                            <span>Training an XGBoost model for Journey Curator's cost predictor</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
