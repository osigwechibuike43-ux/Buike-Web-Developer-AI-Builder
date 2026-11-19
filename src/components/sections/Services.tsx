import { AppWindow, Globe, RefreshCw, Rocket, ShoppingBag, Sparkles, type LucideIcon } from 'lucide-react';
import { SERVICES, PROCESS } from '@/data/content';
import type { Service } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from '@/components/ui/Icons';

export const PREFILL_EVENT = 'buike:prefill';

const ICONS: Record<Service['icon'], LucideIcon> = { globe: Globe, app: AppWindow, cart: ShoppingBag, ai: Sparkles, redesign: RefreshCw, rocket: Rocket };

export function Services() {
  const choose = (projectType: string) => {
    window.dispatchEvent(new CustomEvent<string>(PREFILL_EVENT, { detail: projectType }));
    document.getElementById('contact')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-20 border-y border-line bg-bg-2/60 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="services-title"
          index="04"
          label="Services"
          title={
            <>
              What I can <span className="accent-serif text-accent-text">build for you.</span>
            </>
          }
          intro="From a first sketch to a deployed, responsive product. Pick a starting point and it will be pre-selected in the contact form."
        />

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal as="li" key={s.id} delay={(i % 3) * 0.06} className="h-full">
                <div className="card group flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgb(20_18_15/0.5)]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brown/15 text-brown transition-colors group-hover:bg-brown group-hover:text-beige">
                    <Icon className="h-7 w-7" aria-hidden strokeWidth={1.6} />
                  </span>
                  <h3 className="h-display mt-6 text-2xl">{s.title}</h3>
                  <p className="mt-3 text-pretty text-ink-2">{s.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.includes.map((x) => (
                      <li key={x} className="chip">{x}</li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7"><button type="button" onClick={() => choose(s.projectType)} className="btn btn-ghost !min-h-11 !px-5 !text-sm self-start">
                    Contact me <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">about {s.title}</span>
                  </button></div>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-24">
          <Reveal>
            <p className="eyebrow mb-4">How we’d work together</p>
            <h3 className="h-display max-w-2xl text-balance text-4xl sm:text-5xl">
              A clear path <span className="accent-serif text-accent-text">from idea to launch.</span>
            </h3>
          </Reveal>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal as="li" key={p.number} delay={i * 0.07} className="card relative h-full p-6">
                <span className="font-serif text-6xl italic leading-none text-accent-text">{p.number}</span>
                <h4 className="h-display mt-5 text-2xl">{p.title}</h4>
                <p className="mt-3 text-ink-2">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
