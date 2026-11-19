import { Suspense, lazy } from 'react';
import { LazyMotion, domAnimation } from 'motion/react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Work } from '@/components/sections/Work';
import { About } from '@/components/sections/About';
import { Toolbox } from '@/components/sections/Toolbox';
import { Services } from '@/components/sections/Services';
import { Journey } from '@/components/sections/Journey';
import { Exploring } from '@/components/sections/Exploring';
import { Faq } from '@/components/sections/Faq';
import { BackToTop } from '@/components/ui/BackToTop';
import { Contact } from '@/components/sections/Contact';
import { Blog } from '@/components/sections/Blog';
import { usePathname } from '@/lib/router';

const ArticlePage = lazy(() => import('@/pages/ArticlePage'));

export default function App() {
  const path = usePathname();
  const slug = path.startsWith('/blog/') ? decodeURIComponent(path.slice('/blog/'.length)) : null;
  return (
    <LazyMotion features={domAnimation} strict={false}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-bg">
        Skip to content
      </a>
      <Header />
      <main id="main">
        {slug ? (
          <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
            <ArticlePage slug={slug} />
          </Suspense>
        ) : (
          <>
            <Hero />
            <Work />
            <About />
            <Toolbox />
            <Services />
            <Journey />
            <Exploring />
            <Blog />
            <Faq />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <BackToTop />
    </LazyMotion>
  );
}
