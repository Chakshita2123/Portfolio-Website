'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutPreview from '@/components/AboutPreview';
import SkillsSnapshot from '@/components/SkillsSnapshot';
import FeaturedProjects from '@/components/FeaturedProjects';
import AskAIPreview from '@/components/AskAIPreview';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';
import WelcomeIntro from '@/components/WelcomeIntro';
import ScrollReveal from '@/components/ScrollReveal';
import { usePerformanceTier } from '@/hooks/usePerformanceTier';
import styles from './page.module.css';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [contentReveal, setContentReveal] = useState(false);
  const { reducedMotion } = usePerformanceTier();

  useEffect(() => {
    // Check if intro has already been shown in this session
    const hasShown = sessionStorage.getItem('welcomeShown');

    if (hasShown || reducedMotion) {
      setShowIntro(false);
      setContentReveal(true);
    }
  }, [reducedMotion]);

  const handleIntroComplete = () => {
    sessionStorage.setItem('welcomeShown', 'true');
    setShowIntro(false);
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setContentReveal(true));
    });
  };

  return (
    <>
      {showIntro && <WelcomeIntro onComplete={handleIntroComplete} />}
      <div
        className={styles.siteContent}
        data-reveal={contentReveal}
        aria-hidden={showIntro}
      >
        <Navbar />
        <main className={styles.main}>
          <Hero />

          <ScrollReveal stagger>
            <AboutPreview />
          </ScrollReveal>

          <ScrollReveal stagger>
            <SkillsSnapshot />
          </ScrollReveal>

          <ScrollReveal stagger>
            <FeaturedProjects />
          </ScrollReveal>

          <ScrollReveal stagger>
            <AskAIPreview />
          </ScrollReveal>

          <ScrollReveal stagger>
            <ContactCTA />
          </ScrollReveal>
        </main>
        <Footer />
      </div>
    </>
  );
}
