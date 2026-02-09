import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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

const timeline = [
    {
        year: '2024',
        title: 'AI & Modern Web Focus',
        description: 'Deep dive into AI integrations, Next.js, and product thinking'
    },
    {
        year: '2023',
        title: 'Hackathons & Projects',
        description: 'Built real-world projects, participated in hackathons'
    },
    {
        year: '2022',
        title: 'Frontend Foundations',
        description: 'Mastered React, JavaScript, and modern CSS'
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

                        <div className={`${styles.aiCard} ${styles.animateIn} ${styles.delay3}`}>
                            <div className={styles.aiCardHeader}>
                                <span className={styles.aiIcon}>✨</span>
                                <span className={styles.aiTitle}>AI Feature Coming Soon</span>
                            </div>
                            <p className={styles.aiDescription}>
                                This section will generate personalized introductions based on
                                who's viewing — tailored for recruiters, collaborators, or fellow developers.
                            </p>
                            <div className={styles.aiPreview}>
                                <div className={styles.previewLine}></div>
                                <div className={styles.previewLine}></div>
                                <div className={styles.previewLineShort}></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Education Section */}
                <section className={`section ${styles.education}`}>
                    <div className="container">
                        <h2 className={`${styles.sectionTitle} ${styles.centerText}`}>Education</h2>
                        <div className={`${styles.eduCard} ${styles.animateIn}`}>
                            <div className={styles.eduIcon}>🎓</div>
                            <div className={styles.eduContent}>
                                <h3 className={styles.eduDegree}>Bachelor of Technology</h3>
                                <p className={styles.eduField}>Computer Science & Engineering</p>
                                <p className={styles.eduInstitution}>Your University Name</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mindset Section */}
                <section className={`section ${styles.mindset}`}>
                    <div className="container">
                        <h2 className={`${styles.sectionTitle} ${styles.centerText}`}>
                            How I <span className="gradient-text">Think</span>
                        </h2>
                        <p className={`${styles.sectionSubtitle} ${styles.centerText}`}>
                            Product values that guide my work
                        </p>

                        <div className={styles.mindsetGrid}>
                            {mindsetCards.map((card, index) => (
                                <div key={index} className={`${styles.mindsetCard} ${styles.animateIn}`} style={{ animationDelay: `${index * 0.1}s` }}>
                                    <span className={styles.mindsetIcon}>{card.icon}</span>
                                    <h3 className={styles.mindsetTitle}>{card.title}</h3>
                                    <p className={styles.mindsetDescription}>{card.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Skills Summary */}
                <section className={`section ${styles.skillsSummary}`}>
                    <div className="container">
                        <div className={styles.skillsContent}>
                            <h2 className={styles.sectionTitle}>Skills at a Glance</h2>
                            <p className={styles.paragraph}>
                                My toolkit spans <strong>React, Next.js, TypeScript</strong>, and modern CSS
                                on the frontend, with growing expertise in <strong>AI integrations</strong>
                                and product development.
                            </p>
                            <p className={styles.paragraph}>
                                Rather than listing everything here, I let my projects speak for themselves.
                            </p>
                            <a href="/projects" className="btn btn-secondary">
                                See My Projects →
                            </a>
                        </div>
                        <div className={`${styles.skillsAiHint} ${styles.animateIn}`}>
                            <span className={styles.aiHintIcon}>✨</span>
                            <span>AI-based skill insights will be added here later</span>
                        </div>
                    </div>
                </section>

                {/* Journey Timeline */}
                <section className={`section ${styles.journey}`}>
                    <div className="container">
                        <h2 className={`${styles.sectionTitle} ${styles.centerText}`}>
                            My <span className="gradient-text">Journey</span>
                        </h2>

                        <div className={styles.timeline}>
                            {timeline.map((item, index) => (
                                <div key={index} className={`${styles.timelineItem} ${styles.animateIn}`} style={{ animationDelay: `${index * 0.15}s` }}>
                                    <div className={styles.timelineYear}>{item.year}</div>
                                    <div className={styles.timelineContent}>
                                        <h3 className={styles.timelineTitle}>{item.title}</h3>
                                        <p className={styles.timelineDescription}>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={`${styles.journeyAiHint} ${styles.animateIn}`}>
                            <span>✨ AI-generated summaries will enhance this section later</span>
                        </div>
                    </div>
                </section>

                {/* Personal Touch */}
                <section className={`section ${styles.personal}`}>
                    <div className="container">
                        <h2 className={`${styles.sectionTitle} ${styles.centerText}`}>Outside Work</h2>
                        <p className={`${styles.personalText} ${styles.animateIn}`}>
                            When I'm not coding, you'll find me exploring new technologies,
                            reading about product design, or working on creative side projects
                            that blend art and tech. I believe the best developers stay curious
                            about the world beyond their screens.
                        </p>
                    </div>
                </section>

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
