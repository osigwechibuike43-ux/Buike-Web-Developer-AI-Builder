import { EXPLORING_NOW, USING_TODAY } from '@/data/tech';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function Exploring() {
  return (
    <section id="exploring" aria-labelledby="exploring-title" className="scroll-mt-20 border-t border-line bg-bg-2/60 py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          id="exploring-title"
          index="06"
          label="Currently exploring"
          title={
            <>
              What I use, and <span className="accent-serif text-accent-text">what I’m learning.</span>
            </>
          }
          intro="An honest split: the tools I already build with, and the disciplines I’m actively working to master."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="card h-full p-8">
              <p className="eyebrow mb-3 flex items-center gap-2">
                <span aria-hidden className="h-2 w-2 rounded-full bg-emerald-500" /> Using today
              </p>
              <h3 className="h-display text-3xl">In my projects now</h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {USING_TODAY.map((t) => (
                  <li key={t} className="rounded-full border border-line-strong bg-bg px-4 py-2 text-sm font-medium">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="h-full rounded-[1.25rem] border border-brown/40 bg-beige/60 p-8 dark:bg-chocolate/40">
              <p className="eyebrow mb-3 flex items-center gap-2">
                <span aria-hidden className="h-2 w-2 rounded-full bg-brown" /> Learning now
              </p>
              <h3 className="h-display text-3xl">On my learning list</h3>
              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {EXPLORING_NOW.map((t, i) => (
                  <li key={t} className="flex items-baseline gap-3 border-b border-line pb-3">
                    <span className="font-mono text-xs text-ink-2">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-medium">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
