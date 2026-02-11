'use client';
import { useEffect, useRef } from 'react';
import styles from './EducationTimeline.module.css';

const educationData = [
    {
        id: 1,
        degree: 'Bachelor of Engineering (B.E.)',
        field: 'Computer Science & Engineering',
        institution: 'Chitkara University, Rajpura, Punjab',
        year: '2024 – 2028',
        status: 'Currently Pursuing',
        description: 'Focused on software engineering, AI systems, frontend architecture, and modern web technologies.',
        tags: ['AI Systems', 'Data Structures', 'Frontend Engineering', 'Product Thinking', 'Hackathons']
    },
    {
        id: 2,
        degree: 'Senior Secondary (12th Grade)',
        institution: 'The Gurukul, Zirakpur, Punjab',
        year: '2023 – 2024',
        status: 'Completed',
        tags: []
    },
    {
        id: 3,
        degree: 'Secondary Education (10th Grade)',
        institution: 'Blue Bird High School, Sector 16, Panchkula, Haryana',
        year: '2021 – 2022',
        status: 'Completed',
        tags: []
    }
];

export default function EducationTimeline() {
    const sectionRef = useRef(null);
    const lineRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.visible);
                }
            });
        }, observerOptions);

        const section = sectionRef.current;
        const header = section?.querySelector(`.${styles.header}`);
        const items = section?.querySelectorAll(`.${styles.item}`);

        if (header) observer.observe(header);
        items?.forEach(item => observer.observe(item));

        // Scroll Progress Logic
        const handleScroll = () => {
            if (!lineRef.current || !progressRef.current || !sectionRef.current) return;

            const sectionRect = sectionRef.current.getBoundingClientRect();
            const sectionTop = sectionRect.top;
            const sectionHeight = sectionRect.height;
            const windowHeight = window.innerHeight;

            // Start filling when section enters viewport from bottom
            // We want it to be 0% when top of section is at bottom of viewport
            // And 100% when bottom of section is at bottom of viewport (or earlier)

            // Adjusted logic:
            // progress = 0 when (sectionTop - windowHeight) > 0
            // progress = 1 when section is significantly scrolled through

            const scrollDistance = windowHeight - sectionTop;
            const totalScrollable = sectionHeight + windowHeight * 0.2; // Adjust for earlier finish

            let progress = scrollDistance / totalScrollable;

            // Clamp progress between 0 and 1
            progress = Math.max(0, Math.min(1, progress));

            progressRef.current.style.height = `${progress * 100}%`;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 3D Tilt Effect
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -2;
        const rotateY = ((x - centerX) / centerX) * 2;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    return (
        <section className={styles.section} id="education" ref={sectionRef}>
            {/* Background Particles */}
            <div className={styles.particles}>
                <div className={styles.particle} style={{ top: '10%', left: '20%', width: '4px', height: '4px', opacity: 0.2 }}></div>
                <div className={styles.particle} style={{ top: '40%', left: '80%', width: '3px', height: '3px', animationDelay: '2s', opacity: 0.15 }}></div>
                <div className={styles.particle} style={{ top: '70%', left: '10%', width: '5px', height: '5px', animationDelay: '4s', opacity: 0.1 }}></div>
            </div>

            <div className="container">
                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        Academic <span className="gradient-text">Journey</span>
                    </h2>
                    <p className={styles.subtitle}>
                        My academic foundation blends engineering discipline with AI-driven product thinking.
                    </p>
                </div>

                {/* Timeline */}
                <div className={styles.timelineContainer}>
                    {/* Vertical Line */}
                    <div className={styles.verticalLine} ref={lineRef}>
                        <div className={styles.scrollProgress} ref={progressRef}></div>
                    </div>

                    {/* Timeline Items */}
                    {educationData.map((item) => (
                        <div key={item.id} className={styles.item}>
                            {/* Left: Year (Desktop) */}
                            <div className={styles.yearColumn}>
                                {item.year}
                            </div>

                            {/* Center: Dot */}
                            <div className={styles.dotContainer}>
                                <div className={styles.dot}></div>
                            </div>

                            {/* Right: Content Card */}
                            <div
                                className={styles.card}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className={styles.mobileYear}>{item.year}</div>

                                {item.status === 'Currently Pursuing' && (
                                    <div className={styles.statusBadge}>
                                        🟢 {item.status}
                                    </div>
                                )}

                                <div className={styles.institution}>{item.institution}</div>
                                <h3 className={styles.degree}>{item.degree}</h3>
                                {item.field && <div className={styles.field}>{item.field}</div>}

                                {item.description && (
                                    <p className={styles.description}>{item.description}</p>
                                )}

                                {item.tags && item.tags.length > 0 && (
                                    <div className={styles.tags}>
                                        {item.tags.map(tag => (
                                            <span key={tag} className={styles.tag}>{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
