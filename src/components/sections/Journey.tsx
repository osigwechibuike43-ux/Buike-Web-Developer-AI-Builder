import { JOURNEY, INTERESTS } from '@/data/content';
import { SITE } from '@/data/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowUpRight, TiktokIcon } from '@/components/ui/Icons';

export function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="journey-title"
          index="05"
          label="Learning journey"
          title={
            <>
              Always building, <span className="accent-serif text-accent-text">always learning.</span>
            </>
          }
          intro="The path so far, and the things I keep coming back to."
        />

        <div className="grid gap-14 lg:grid-cols-12">
          <ol className="relative lg:col-span-7">
            <span aria-hidden className="absolute bottom-3 left-[1.15rem] top-3 w-px bg-line-strong" />
            {JOURNEY.map((step, i) => (
              <Reveal as="li" key={step.number} className="relative pb-12 pl-14 last:pb-0">
                  <span className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border font-mono text-xs ${i === JOURNEY.length - 1 ? 'border-accent-text bg-accent-text text-on-accent' : 'border-line-strong bg-bg text-ink-2'}`}>
                    {step.number}
                  </span>
                  <h3 className="h-display text-3xl">{step.title}</h3>
                  <p className="accent-serif mt-1 text-2xl text-ink-2">{step.tagline}</p>
                  <p className="mt-3 max-w-xl text-pretty text-ink-2">{step.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {step.tags.map((t) => (
                      <li key={t} className="chip">{t}</li>
                    ))}
                  </ul>
              </Reveal>
            ))}
          </ol>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <h3 className="eyebrow mb-5">Things that keep me curious</h3>
                <ul className="grid gap-3">
                  {INTERESTS.map((x) => (
                    <li key={x.title} className="card p-5">
                      <p className="font-display text-xl font-semibold">{x.title}</p>
                      <p className="mt-1 text-ink-2">{x.text}</p>
                    </li>
                  ))}
                </ul>
                <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer" className="group mt-5 flex items-center justify-between rounded-2xl bg-ink p-5 text-bg transition-colors hover:bg-accent-text hover:text-on-accent">
                  <span className="flex items-center gap-4">
                    <TiktokIcon className="h-6 w-6" />
                    <span>
                      <span className="block font-display text-lg font-semibold">Follow along on TikTok</span>
                      <span className="font-mono text-xs opacity-80">{SITE.tiktokHandle}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
