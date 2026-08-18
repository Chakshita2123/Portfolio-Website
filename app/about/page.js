import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EducationTimeline from '@/components/EducationTimeline';
import MindsetCards from '@/components/MindsetCards';
import SkillsOverview from '@/components/SkillsOverview';
import PersonalTouch from '@/components/PersonalTouch';
import CurrentlyBuilding from '@/components/CurrentlyBuilding';
import styles from './about.module.css';

export const metadata = {
    title: "About | Chakshita",
    description: "Chakshita — full-stack developer and applied AI/ML builder. B.Tech CSE student building real products end-to-end.",
};

const mindsetCards = [
    {
        icon: '🎯',
        title: 'Design Thinking',
        description: 'Start with the user, work backwards to the solution.'
    },
    {
        icon: '🧩',
        title: 'Problem Solving',
        description: 'Break complex challenges into elegant, simple solutions.'
    },
    {
        icon: '📚',
        title: 'Always Learning',
        description: 'Stay curious, explore new tools, and embrace change.'
    },
    {
        icon: '🤖',
        title: 'AI-First Approach',
        description: 'Build products that think, adapt, and improve over time.'
    }
];

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className={styles.aboutPage}>
                {/* Page Header */}
                <section className={styles.pageHeader}>
                    <div className="container">
                        <span className={`section-label ${styles.animateIn}`}>About Me</span>
                        <h1 className={`${styles.pageTitle} ${styles.animateIn} ${styles.delay1}`}>
                            Building real products end-to-end — from frontends to ML models.
                        </h1>
                    </div>
                </section>

                {/* Main About Section */}
                <section className={`section ${styles.mainAbout}`}>
                    <div className={`container ${styles.aboutGrid}`}>
                        <div className={`${styles.storyContent} ${styles.animateIn} ${styles.delay2}`}>
                            <h2 className={styles.sectionTitle}>The Story</h2>
                            <p className={styles.paragraph}>
                                I'm a full-stack developer with a growing focus on applied AI/ML —
                                building products end-to-end rather than just wrapping LLM APIs.
                                My work spans React/Next.js frontends, Node.js/MongoDB backends, and
                                increasingly, real model training (regression, prediction pipelines)
                                alongside LLM integration for features like OCR, chat, and recommendations.
                            </p>
                            <p className={styles.paragraph}>
                                Currently a B.Tech CSE student, building projects that solve real
                                problems — from AI-assisted code review to native Android apps to
                                ML-driven predictions. Currently open to internships and full-time
                                opportunities.
                            </p>
                        </div>

                        <div className={styles.sidebarContent}>
                            <CurrentlyBuilding />
                        </div>
                    </div>
                </section>

                {/* Education Section */}
                <EducationTimeline />

                {/* Mindset Section */}
                <section className={`section ${styles.mindset}`}>
                    <div className="container">
                        <h2 className={`${styles.sectionTitle} ${styles.centerText}`}>
                            How I <span className="gradient-text">Think</span>
                        </h2>
                        <p className={`${styles.sectionSubtitle} ${styles.centerText}`}>
                            Product values that guide my work
                        </p>

                        <MindsetCards cards={mindsetCards} />
                    </div>
                </section>

                {/* Skills Summary */}
                <section className={`section ${styles.skillsSummary}`}>
                    <div className="container">
                        <h2 className={`${styles.sectionTitle} ${styles.centerText}`}>Skills at a Glance</h2>
                        <SkillsOverview />

                        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                            <a href="/projects" className="btn btn-secondary">
                                See My Projects →
                            </a>
                        </div>
                    </div>
                </section>

                {/* Personal Touch (Outside Work) */}
                <PersonalTouch />

                {/* CTA Section */}
                <section className={`section ${styles.cta}`}>
                    <div className="container">
                        <div className={`${styles.ctaContent} ${styles.animateIn}`}>
                            <h2 className={styles.ctaTitle}>Want to see how I apply this thinking?</h2>
                            <p className={styles.ctaSubtitle}>
                                Explore my projects and see these principles in action.
                            </p>
                            <a href="/projects" className="btn btn-primary">
                                View Projects <span>→</span>
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
