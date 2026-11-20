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
    <section id="services" aria-labelledby="services-title" className="scroll-mt-20 border-y border-line bg-bg-2/60 py-14 sm:py-24 lg:py-32">
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

        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal as="li" key={s.id} delay={(i % 3) * 0.06} className="h-full">
                <div
                  style={{ '--c': s.color } as React.CSSProperties}
                  className="card group flex h-full flex-col p-4 transition-all sm:p-5 duration-300 hover:-translate-y-1 hover:border-[var(--c)] hover:shadow-[0_20px_40px_-26px_var(--c)]"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--c)_14%,transparent)] text-[var(--c)] transition-colors duration-300 group-hover:bg-[var(--c)] group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden strokeWidth={1.8} />
                    </span>
                    <h3 className="h-display text-lg leading-tight">{s.title}</h3>
                  </div>
                  <p className="mt-2.5 line-clamp-2 text-pretty text-sm sm:mt-3.5 sm:line-clamp-3 text-ink-2">{s.description}</p>
                  <ul className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
                    {s.includes.slice(0, 3).map((x) => (
                      <li key={x} className="chip !px-2.5 !py-0.5 !text-[0.68rem]">{x}</li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-3 sm:pt-5">
                    <button type="button" onClick={() => choose(s.projectType)} className="btn btn-ghost !min-h-11 !px-4 !text-sm">
                      Contact me <ArrowRight className="h-4 w-4" />
                      <span className="sr-only">about {s.title}</span>
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-14 sm:mt-24">
          <Reveal>
            <p className="eyebrow mb-4">How we’d work together</p>
            <h3 className="h-display max-w-2xl text-balance text-3xl sm:text-5xl">
              A clear path <span className="accent-serif text-accent-text">from idea to launch.</span>
            </h3>
          </Reveal>
          <ol className="mt-7 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal as="li" key={p.number} delay={i * 0.07} className="card relative h-full p-4 sm:p-6">
                <span className="font-serif text-4xl italic leading-none sm:text-6xl text-accent-text">{p.number}</span>
                <h4 className="h-display mt-3 text-xl sm:mt-5 sm:text-2xl">{p.title}</h4>
                <p className="mt-2 text-sm text-ink-2 sm:mt-3 sm:text-base">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
