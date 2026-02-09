'use client';
import { useState } from 'react';
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

  const handleIntroComplete = () => {
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
