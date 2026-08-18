import { FaGithub } from 'react-icons/fa';
import styles from './GitHubActivity.module.css';

export default function GitHubActivity() {
    return (
        <section className={`section ${styles.activitySection}`}>
            <div className="container">
                <div className={styles.card}>
                    <div className={styles.header}>
                        <div className={styles.titleGroup}>
                            <FaGithub className={styles.githubIcon} />
                            <div>
                                <h3 className={styles.title}>GitHub Activity</h3>
                                <p className={styles.subtitle}>Continuous code commits &amp; project updates</p>
                            </div>
                        </div>
                        <a
                            href="https://github.com/Chakshita2123"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost"
                        >
                            @Chakshita2123 →
                        </a>
                    </div>
                    <div className={styles.chartWrapper}>
                        <img
                            src="https://ghchart.rshah.org/0ea5e9/Chakshita2123"
                            alt="Chakshita's GitHub contribution graph"
                            className={styles.chartImg}
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
