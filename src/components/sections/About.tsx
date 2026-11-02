import { SITE } from '@/data/site';
import { PROJECTS } from '@/data/projects';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowUpRight } from '@/components/ui/Icons';

const FACTS = [
  ['Based in', SITE.location],
  ['Timezone', SITE.timezone],
  ['Focus', 'Frontend and AI-powered products'],
  ['Core stack', 'React, TypeScript, Tailwind, Supabase'],
  ['Status', SITE.status],
];

const NOTES = [
  { text: 'Ship it live.', tilt: '-rotate-2', tone: 'bg-note' },
  { text: 'Fast first, then beautiful.', tilt: 'rotate-1', tone: 'bg-surface border border-line-strong' },
  { text: 'Keep learning, keep building.', tilt: '-rotate-1', tone: 'bg-note' },
];

export function About() {
  const latest = PROJECTS[0];
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 border-y border-line bg-bg-2/60 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="about-title"
          index="02"
          label="About"
          title={
            <>
              I build things <span className="accent-serif text-accent-text">that are live,</span> not just demos.
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="space-y-6 text-pretty text-lg text-ink-2 lg:col-span-7">
            <p>
              I’m <strong className="font-semibold text-ink">Osigwe Chibuike Joseph</strong>, known online as Buike. I’m a web developer from Owerri, Nigeria, and I like to ship websites that real people can open, use and share.
            </p>
            <p>
              My work sits where clean design meets solid engineering: storefronts, event and luxury-brand websites, and lately AI assistants and learning tools built on language-model APIs. I care about the details people feel but rarely notice, like spacing, speed and a layout that works on a small phone.
            </p>
            <p>
              I’m self-driven and always building something new. My latest project is{' '}
              <a href={latest.liveUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4">
                {latest.name}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              , an AI-powered learning platform.
            </p>

            <dl className="card mt-10 divide-y divide-line px-6 py-2 text-base">
              {FACTS.map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8">
                  <dt className="eyebrow w-32 shrink-0">{k}</dt>
                  <dd className="text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="relative mx-auto max-w-md space-y-5 lg:mt-6">
              {NOTES.map((n) => (
                <p key={n.text} className={`${n.tone} ${n.tilt} rounded-xl px-6 py-5 font-display text-2xl font-semibold leading-tight shadow-[0_14px_30px_-18px_rgb(20_18_15/0.5)] transition-transform hover:rotate-0`}>
                  {n.text}
                </p>
              ))}
              <a href="#work" className="mt-6 inline-flex items-center gap-2 pl-2 font-mono text-sm uppercase tracking-[0.16em] text-ink-2 hover:text-ink">
                See what I’ve built <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
