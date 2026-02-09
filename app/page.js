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

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    // Scroll to top when homepage loads
    window.scrollTo(0, 0);
    // Small delay to ensure smooth transition
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
          <AboutPreview />
          <SkillsSnapshot />
          <FeaturedProjects />
          <AskAIPreview />
          <ContactCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
