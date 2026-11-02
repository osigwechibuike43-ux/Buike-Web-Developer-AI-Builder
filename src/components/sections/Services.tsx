import { SERVICES, PROCESS } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from '@/components/ui/Icons';

export const PREFILL_EVENT = 'buike:prefill';

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
          label="What I can build"
          title={
            <>
              One developer. <span className="accent-serif text-accent-text">The whole site.</span>
            </>
          }
          intro="From a first sketch to a deployed, responsive product. Choose a starting point and it will be pre-selected in the contact form."
        />

        <ol className="divide-y divide-line border-y border-line">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.id} className="grid gap-6 py-9 lg:grid-cols-12 lg:items-start lg:gap-10">
                <span className="font-mono text-sm text-ink-3 lg:col-span-1">0{i + 1}</span>
                <div className="lg:col-span-4">
                  <h3 className="h-display text-3xl sm:text-4xl">{s.title}</h3>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-pretty text-ink-2">{s.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.includes.map((x) => (
                      <li key={x} className="chip">{x}</li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-2 lg:text-right">
                  <button type="button" onClick={() => choose(s.projectType)} className="btn btn-ghost !min-h-11 !px-5 !text-sm">
                    Start this <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">: {s.title}</span>
                  </button>
                </div>
            </Reveal>
          ))}
        </ol>

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
