'use client';

import Navbar from '@/components/Navbar';
import FloatingShapes from '@/components/FloatingShapes';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import SkillsSection from '@/sections/SkillsSection';
import ProjectsSection from '@/sections/ProjectsSection';
import TimelineSection from '@/sections/TimelineSection';
import AchievementsSection from '@/sections/AchievementsSection';
import ContactSection from '@/sections/ContactSection';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <>
      <FloatingShapes />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
