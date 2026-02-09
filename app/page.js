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

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Check if intro has already been shown in this session
    // This prevents re-running the intro when navigating back to home
    const introShown = sessionStorage.getItem('introShown');
    if (introShown) {
      setShowIntro(false);
      setContentVisible(true);
    }
  }, []);

  const handleIntroComplete = () => {
    // Mark intro as shown for this session
    sessionStorage.setItem('introShown', 'true');
    setShowIntro(false);
    window.scrollTo(0, 0);
    setTimeout(() => setContentVisible(true), 50);
  };

  return (
    <>
      {showIntro && <WelcomeIntro onComplete={handleIntroComplete} />}
      <div style={{
        opacity: contentVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
        visibility: showIntro ? 'hidden' : 'visible'
      }}>
        <Navbar />
        <main>
          <Hero />

          <ScrollReveal>
            <AboutPreview />
          </ScrollReveal>

          <ScrollReveal>
            <SkillsSnapshot />
          </ScrollReveal>

          <ScrollReveal>
            <FeaturedProjects />
          </ScrollReveal>

          <ScrollReveal>
            <AskAIPreview />
          </ScrollReveal>

          <ScrollReveal>
            <ContactCTA />
          </ScrollReveal>
        </main>
        <Footer />
      </div>
    </>
  );
}
