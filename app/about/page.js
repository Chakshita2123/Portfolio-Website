import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EducationTimeline from '@/components/EducationTimeline';
import AdaptiveIntroduction from '@/components/AdaptiveIntroduction';
import MindsetCards from '@/components/MindsetCards';
import SkillsOverview from '@/components/SkillsOverview';
import PersonalTouch from '@/components/PersonalTouch';
import styles from './about.module.css';

export const metadata = {
    title: "About | Chakshita.ai",
    description: "Learn about Chakshita - a frontend developer with an AI-first mindset, building intelligent, user-centric web experiences.",
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
                        <span className={`ai-badge ${styles.animateIn}`}>About Me</span>
                        <h1 className={`${styles.pageTitle} ${styles.animateIn} ${styles.delay1}`}>
                            Building intelligent, user-centric web experiences with a product mindset.
                        </h1>
                    </div>
                </section>

                {/* Main About Section */}
                <section className={`section ${styles.mainAbout}`}>
                    <div className={`container ${styles.aboutGrid}`}>
                        <div className={`${styles.storyContent} ${styles.animateIn} ${styles.delay2}`}>
                            <h2 className={styles.sectionTitle}>The Story</h2>
                            <p className={styles.paragraph}>
                                I'm Chakshita — a frontend developer passionate about creating experiences
                                that feel intuitive, look beautiful, and work flawlessly. My journey started
                                with curiosity about how websites work, and evolved into a deep commitment to
                                building products that genuinely help people.
                            </p>
                            <p className={styles.paragraph}>
                                I focus on the intersection of <strong>frontend development</strong> and
                                <strong> AI-powered thinking</strong>. I believe the future of web development
                                isn't just about writing code — it's about creating intelligent systems that
                                understand users and adapt to their needs.
                            </p>
                            <p className={styles.paragraph}>
                                The problems I enjoy solving most are ones where technology can feel invisible —
                                where the experience is so smooth that users don't think about the engineering
                                behind it. That's the kind of work that excites me.
                            </p>
                        </div>

                        <AdaptiveIntroduction />
                    </div>
                </section>

                {/* Education Section */}
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
