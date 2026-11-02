import { m, useReducedMotion } from 'motion/react';
import { SITE } from '@/data/site';
import { PROJECTS } from '@/data/projects';
import { LogoMark } from '@/components/ui/Logo';
import { Portrait } from '@/components/ui/Portrait';
import { ArrowRight, ArrowUpRight } from '@/components/ui/Icons';

const STACK = ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Supabase', 'Node.js', 'PostgreSQL', 'Firebase', 'Groq', 'Gemini', 'Vercel', 'Git'];

export function Hero() {
  const reduce = useReducedMotion();
  const aiCount = PROJECTS.filter((p) => p.category.toLowerCase().includes('ai')).length;
  const rise = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <section id="top" aria-labelledby="hero-title" className="grain relative isolate overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 -z-10 h-[34rem] w-[34rem] rounded-full bg-accent/15 blur-3xl" />

      <div className="container-x grid items-center gap-14 pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <div className="lg:col-span-8">
          <m.p {...rise(0)} className="mb-7 inline-flex items-center gap-3 rounded-full border border-line-strong bg-surface/70 py-1.5 pl-3 pr-4 text-sm text-ink-2">
            <span className="relative flex h-2.5 w-2.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            {SITE.status}
          </m.p>

          <m.h1 {...rise(0.08)} id="hero-title" className="h-display text-balance text-[clamp(2.9rem,8.4vw,5.4rem)] lg:text-[clamp(3.6rem,6.2vw,5.6rem)]">
            I build websites <span className="accent-serif text-accent-text">people remember.</span>
          </m.h1>

          <m.p {...rise(0.18)} className="mt-8 max-w-xl text-pretty text-lg text-ink-2 sm:text-xl">
            I’m <strong className="font-semibold text-ink">Buike</strong>, a web developer in Nigeria. I design and build fast, polished websites and AI-powered products with React, TypeScript and Tailwind CSS.
          </m.p>

          <m.div {...rise(0.28)} className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn btn-primary">
              See selected work <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Start a project <ArrowUpRight className="h-4 w-4" />
            </a>
          </m.div>

          <m.dl {...rise(0.38)} className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-6">
            {[
              { k: String(PROJECTS.length), v: 'Live projects' },
              { k: String(aiCount), v: 'AI products' },
              { k: 'UTC+1', v: 'Based in Nigeria' },
            ].map((s) => (
              <div key={s.v}>
                <dt className="sr-only">{s.v}</dt>
                <dd className="h-display text-4xl sm:text-5xl">{s.k}</dd>
                <dd className="mt-1 text-sm text-ink-3" aria-hidden>
                  {s.v}
                </dd>
              </div>
            ))}
          </m.dl>
        </div>

        <m.div
          {...(reduce ? {} : { initial: { opacity: 0, rotate: 4, y: 30 }, animate: { opacity: 1, rotate: -2.5, y: 0 }, transition: { duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const } })}
          style={reduce ? { rotate: -2.5 } : undefined}
          className="relative mx-auto w-full max-w-[26rem] lg:col-span-4 lg:max-w-none lg:pl-2"
        >
          <figure className="relative rounded-[1.75rem] border border-line-strong bg-surface p-3 shadow-[0_30px_60px_-30px_rgb(20_18_15/0.45)]">
            <div className="overflow-hidden rounded-[1.25rem] bg-bg-2">
              <Portrait priority className="aspect-[4/5] w-full object-cover object-[50%_38%]" />
            </div>
            <figcaption className="flex items-center justify-between px-2 pb-1 pt-4">
              <span>
                <span className="block font-display text-lg font-semibold leading-tight">{SITE.name}</span>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-3">{SITE.role} · {SITE.location.split(',')[0]}</span>
              </span>
              <span aria-hidden className="font-serif text-3xl italic text-accent-text">Hi!</span>
            </figcaption>
          </figure>
          <LogoMark className="absolute -right-3 -top-5 h-16 w-16 rotate-[8deg] drop-shadow-lg sm:-right-6" />
          <span aria-hidden className="absolute -bottom-4 -left-2 rotate-[-4deg] rounded-md bg-note px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink shadow-md sm:-left-8">
            React · TS · Tailwind
          </span>
        </m.div>
      </div>

      <div className="marquee border-y border-line bg-bg-2/60 py-4" aria-hidden>
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex shrink-0 items-center">
              {STACK.map((s) => (
                <li key={`${dup}-${s}`} className="flex items-center whitespace-nowrap px-6 font-display text-xl font-semibold text-ink-2">
                  {s}
                  <span className="ml-12 text-accent">✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
