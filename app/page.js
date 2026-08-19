'use client';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CurrentlyBuilding from '@/components/CurrentlyBuilding';
import AboutPreview from '@/components/AboutPreview';
import SkillsSnapshot from '@/components/SkillsSnapshot';
import FeaturedProjects from '@/components/FeaturedProjects';
import GitHubActivity from '@/components/GitHubActivity';
import AskAIPreview from '@/components/AskAIPreview';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.siteContent} data-reveal="true">
        <Navbar />
        <main className={styles.main}>
          <Hero />

          <CurrentlyBuilding />

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
            <GitHubActivity />
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
