'use client';
import { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import styles from './ContactCTA.module.css';

export default function ContactCTA() {
    const [message, setMessage] = useState('');
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [enhancedMessage, setEnhancedMessage] = useState('');

    const handleEnhance = async () => {
        if (!message.trim() || isEnhancing) return;

        setIsEnhancing(true);
        try {
            const res = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: message,
                    mode: 'enhance-message'
                })
            });
            const data = await res.json();
            if (data.success) {
                setEnhancedMessage(data.message);
            }
        } catch (error) {
            console.error('Enhancement failed:', error);
        } finally {
            setIsEnhancing(false);
        }
    };

    const copyToClipboard = () => {
        if (enhancedMessage) {
            navigator.clipboard.writeText(enhancedMessage);
            // Optional: Show a toast or small "Copied!" feedback if needed, 
            // but for now the user can just see the text.
        }
    };

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
                            <a href="mailto:chakshitajaswal2106@gmail.com" className="btn btn-secondary">
                                <MdEmail /> Send Email
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
                            {enhancedMessage ? (
                                <div className={styles.enhancedResult}>
                                    <div className={styles.resultHeader}>
                                        <span className={styles.resultLabel}>✨ Enhanced Message</span>
                                        <button
                                            onClick={() => setEnhancedMessage('')}
                                            className={styles.resetBtn}
                                        >
                                            Draft New
                                        </button>
                                    </div>
                                    <textarea
                                        readOnly
                                        className={styles.enhancedTextarea}
                                        value={enhancedMessage}
                                        onClick={(e) => e.target.select()}
                                    />
                                    <button
                                        className={styles.previewButton}
                                        onClick={copyToClipboard}
                                    >
                                        Copy to Clipboard
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className={styles.previewInput}>
                                        <textarea
                                            className={styles.messageInput}
                                            placeholder="Type a rough draft (e.g., 'Hi Chakshita, I'm a recruiter at Google...')"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        className={`${styles.previewButton} ${isEnhancing || !message.trim() ? styles.disabled : ''}`}
                                        onClick={handleEnhance}
                                        disabled={isEnhancing || !message.trim()}
                                    >
                                        {isEnhancing ? 'Enhancing...' : '✨ Enhance with AI'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
