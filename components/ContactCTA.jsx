import styles from './ContactCTA.module.css';

export default function ContactCTA() {
    return (
        <section id="contact" className={`section ${styles.contact}`}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <span className="ai-badge">Get in Touch</span>
                        <h2 className="section-title">
                            Let's Build Something <span className="gradient-text">Meaningful</span>
                        </h2>
                        <p className={styles.description}>
                            Have a project in mind? Looking for a developer who thinks differently?
                            I'd love to hear from you.
                        </p>
                        <div className={styles.ctas}>
                            <button className="btn btn-primary">
                                Contact Me <span>→</span>
                            </button>
                            <a href="mailto:hello@chakshita.ai" className="btn btn-secondary">
                                hello@chakshita.ai
                            </a>
                        </div>
                    </div>

                    {/* AI Helper Card */}
                    <div className={`${styles.aiCard} card-3d`}>
                        <div className={styles.aiCardIcon}>
                            <span>✨</span>
                        </div>
                        <div className={styles.aiCardContent}>
                            <h3 className={styles.aiCardTitle}>AI-Assisted Messages</h3>
                            <p className={styles.aiCardText}>
                                Soon, AI will help you draft professional messages or generate
                                personalized outreach — making first contact effortless.
                            </p>
                        </div>
                        <div className={styles.aiCardPreview}>
                            <div className={styles.previewInput}>
                                <span className={styles.previewPlaceholder}>
                                    "Hi Chakshita, I'm a recruiter at..."
                                </span>
                            </div>
                            <div className={styles.previewButton}>
                                <span>✨ Enhance with AI</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
