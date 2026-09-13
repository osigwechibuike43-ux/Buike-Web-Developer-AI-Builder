import { useState, useEffect } from 'react';
import { Project } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ProjectModal } from './components/ProjectModal';
import { SkillsSection } from './components/SkillsSection';
import { TechnologyWall } from './components/TechnologyWall';
import { JourneyTimeline } from './components/JourneyTimeline';
import { ServicesSection } from './components/ServicesSection';
import { OpenSourceSection } from './components/OpenSourceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'services', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-white selection:text-black">
      {/* Sticky Navigation Bar */}
      <Navbar onNavigate={scrollToSection} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Cinematic Hero Section */}
        <Hero onNavigate={scrollToSection} />

        {/* 2. Authentic About Section */}
        <About />

        {/* 3. Featured Work / Selected Work (5 Deployed Websites) */}
        <FeaturedProjects onSelectProject={(project) => setSelectedProject(project)} />

        {/* 4. Skills & Technical Stacks */}
        <SkillsSection />

        {/* 5. Technology Ecosystem Wall */}
        <TechnologyWall />

        {/* 6. Development Journey Timeline */}
        <JourneyTimeline />

        {/* 7. Professional Services */}
        <ServicesSection onContactClick={() => scrollToSection('contact')} />

        {/* 8. Open Source & Code */}
        <OpenSourceSection />

        {/* 9. Strong Final CTA & Contact Section */}
        <ContactSection />
      </main>

      {/* Minimal Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Case Study & Live Preview Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
