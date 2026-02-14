'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaPaperPlane, FaMagic, FaSpinner } from 'react-icons/fa';
import { MdEmail, MdCheckCircle, MdError } from 'react-icons/md';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './contact.module.css';

const contactMethods = [
    {
        icon: <MdEmail />,
        label: 'Email',
        value: 'chakshitajaswal2106@gmail.com',
        href: 'mailto:chakshitajaswal2106@gmail.com',
        description: 'Best for detailed inquiries'
    },
    {
        icon: <FaLinkedin />,
        label: 'LinkedIn',
        value: 'Connect on LinkedIn',
        href: 'https://www.linkedin.com/in/chakshita-jaswal-4a691a2ba/',
        description: 'For professional networking'
    },
    {
        icon: <FaGithub />,
        label: 'GitHub',
        value: 'Check out my code',
        href: 'https://github.com/Chakshita2123',
        description: 'Explore my projects'
    }
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [focusedField, setFocusedField] = useState(null);
    const [isRewriting, setIsRewriting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error'

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear status when user types
        if (status) setStatus(null);
    };

    const handleRewrite = async () => {
        if (!formData.message.trim()) return;

        setIsRewriting(true);
        setStatus(null);

        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: formData.message,
                    mode: 'enhance-message'
                })
            });

            const data = await response.json();

            if (data.success && data.message) {
                setFormData(prev => ({ ...prev, message: data.message.trim() }));
            } else {
                console.error('AI Rewrite failed:', data.error);
                setStatus('error-ai'); // Custom error state for AI failure
            }
        } catch (error) {
            console.error('AI Rewrite Error:', error);
            setStatus('error-ai');
        } finally {
            setIsRewriting(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setStatus('validation-error');
            return;
        }

        setIsSubmitting(true);
        setStatus(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission Error:', error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <main className={styles.contactPage}>
                {/* Page Header */}
                <section className={styles.pageHeader}>
                    <div className="container">
                        <div className={`${styles.headerContent} ${styles.animateIn}`}>
                            <span className="ai-badge">Let's Connect</span>
                            <h1 className={styles.pageTitle}>Get in Touch</h1>
                            <p className={styles.pageSubtitle}>
                                Interested in working together or have a question? I'd love to hear from you.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className={`section ${styles.contactSection}`}>
                    <div className="container">
                        <div className={styles.contactGrid}>
                            {/* Contact Form */}
                            <div className={`${styles.formContainer} ${styles.animateIn} ${styles.delay1}`}>
                                <h2 className={styles.sectionTitle}>Send a Message</h2>

                                <form className={styles.contactForm} onSubmit={handleSubmit}>
                                    <div className={`${styles.formGroup} ${focusedField === 'name' ? styles.focused : ''}`}>
                                        <label htmlFor="name" className={styles.formLabel}>Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="What should I call you?"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField(null)}
                                            className={styles.formInput}
                                            required
                                        />
                                    </div>

                                    <div className={`${styles.formGroup} ${focusedField === 'email' ? styles.focused : ''}`}>
                                        <label htmlFor="email" className={styles.formLabel}>Your Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Where can I reach you?"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            className={styles.formInput}
                                            required
                                        />
                                    </div>

                                    <div className={`${styles.formGroup} ${focusedField === 'message' ? styles.focused : ''}`}>
                                        <label htmlFor="message" className={styles.formLabel}>Your Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell me about your project, opportunity, or just say hello..."
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('message')}
                                            onBlur={() => setFocusedField(null)}
                                            className={styles.formTextarea}
                                            required
                                        />
                                    </div>

                                    {/* AI Assistance */}
                                    <div className={styles.aiAssistCard}>
                                        <div className={styles.aiAssistHeader}>
                                            <span className={styles.aiAssistIcon}>✨</span>
                                            <span className={styles.aiAssistTitle}>AI Writing Assistant</span>
                                        </div>
                                        <p className={styles.aiAssistText}>
                                            Not sure how to phrase it? Type a rough draft above, and let AI polish it for you.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={handleRewrite}
                                            disabled={isRewriting || !formData.message.trim()}
                                            className={styles.aiRewriteBtn}
                                        >
                                            {isRewriting ? (
                                                <><FaSpinner className="spin" /> Rewriting...</>
                                            ) : (
                                                <><FaMagic /> Enhance with AI</>
                                            )}
                                        </button>
                                        {status === 'error-ai' && (
                                            <p className={styles.errorMessage} style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                                                AI service unavailable at the moment.
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className={`btn btn-primary ${styles.submitBtn}`}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <><FaSpinner className="spin" /> Sending...</>
                                        ) : (
                                            <>Send Message <FaPaperPlane /></>
                                        )}
                                    </button>

                                    {status === 'success' && (
                                        <div className={styles.successMessage}>
                                            <MdCheckCircle /> Message sent successfully!
                                        </div>
                                    )}
                                    {status === 'error' && (
                                        <div className={styles.errorMessage}>
                                            <MdError /> Something went wrong. Please try again.
                                        </div>
                                    )}

                                    {/* Response Time Note */}
                                    <p className={styles.responseNote}>
                                        <span className={styles.noteIcon}>⏱️</span>
                                        I usually respond within 24–48 hours
                                    </p>
                                </form>
                            </div>

                            {/* Contact Options */}
                            <div className={`${styles.optionsContainer} ${styles.animateIn} ${styles.delay2}`}>
                                <h2 className={styles.sectionTitle}>Other Ways to Connect</h2>

                                <div className={styles.contactMethods}>
                                    {contactMethods.map((method, index) => (
                                        <a
                                            key={index}
                                            href={method.href}
                                            target={method.href.startsWith('http') ? '_blank' : undefined}
                                            rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            className={styles.contactCard}
                                        >
                                            <span className={styles.cardIcon}>{method.icon}</span>
                                            <div className={styles.cardContent}>
                                                <span className={styles.cardLabel}>{method.label}</span>
                                                <span className={styles.cardValue}>{method.value}</span>
                                                <span className={styles.cardDescription}>{method.description}</span>
                                            </div>
                                            <span className={styles.cardArrow}>→</span>
                                        </a>
                                    ))}
                                </div>

                                {/* Availability Card */}
                                <div className={styles.availabilityCard}>
                                    <div className={styles.availabilityHeader}>
                                        <span className={styles.availabilityDot}></span>
                                        <span className={styles.availabilityTitle}>Currently Available For</span>
                                    </div>
                                    <div className={styles.availabilityTags}>
                                        <span className={styles.availabilityTag}>Internships</span>
                                        <span className={styles.availabilityTag}>Full-time Roles</span>
                                        <span className={styles.availabilityTag}>Collaborations</span>
                                        <span className={styles.availabilityTag}>Hackathons</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Closing Note */}
                <section className={`section ${styles.closingSection}`}>
                    <div className="container">
                        <div className={`${styles.closingContent} ${styles.animateIn}`}>
                            <p className={styles.closingText}>
                                Looking forward to connecting. <span className={styles.wave}>👋</span>
                            </p>
                            <div className={styles.closingLinks}>
                                <Link href="/projects" className="btn btn-secondary">
                                    View My Work
                                </Link>
                                <Link href="/ask-ai" className="btn btn-ghost">
                                    Ask Chakshita AI
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
