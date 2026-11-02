import { LazyMotion, domAnimation } from 'motion/react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Work } from '@/components/sections/Work';
import { About } from '@/components/sections/About';
import { Toolbox } from '@/components/sections/Toolbox';
import { Services } from '@/components/sections/Services';
import { Journey } from '@/components/sections/Journey';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict={false}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-bg">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Work />
        <About />
        <Toolbox />
        <Services />
        <Journey />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </LazyMotion>
  );
}
