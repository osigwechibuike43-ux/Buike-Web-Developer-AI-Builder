import { useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { Bot, Database, Network, Sparkles } from 'lucide-react';
import { TECHNOLOGIES, TECH_GROUPS } from '@/data/tech';
import type { Tech, TechGroup } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { cn } from '@/lib/cn';

const GLYPHS = { api: Network, sql: Database, agent: Bot, prompt: Sparkles } as const;
// Near-black brands switch to the page ink colour so they stay visible in dark mode.
const NEAR_BLACK = new Set(['#000000', '#181717']);

function TechCard({ tech, index }: { tech: Tech; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const Glyph = tech.glyph ? GLYPHS[tech.glyph] : null;
  const mono = NEAR_BLACK.has(tech.brand.toUpperCase());

  // Subtle 3D tilt for mouse users only; touch and reduced-motion get the plain hover state.
  const onMove = (e: PointerEvent<HTMLLIElement>) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${(-y * 9).toFixed(2)}deg) rotateY(${(x * 11).toFixed(2)}deg) translateZ(0)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <li
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ '--brand': mono ? 'var(--ink)' : tech.brand, animationDelay: `${Math.min(index, 12) * 28}ms` } as CSSProperties}
      className="card tech-card group relative flex h-full flex-col gap-2.5 overflow-hidden p-3.5 transition-[transform,box-shadow,border-color] sm:gap-4 sm:p-5 duration-200 ease-out will-change-transform hover:border-[var(--brand)] hover:shadow-[0_18px_40px_-22px_var(--brand)]"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-line transition-transform duration-200 group-hover:scale-110 sm:h-14 sm:w-14 sm:rounded-2xl"
          style={{ color: mono ? 'var(--ink)' : tech.brand, background: 'color-mix(in srgb, var(--brand) 12%, var(--bg))' }}
        >
          {tech.icon || !Glyph ? <BrandLogo icon={tech.icon} name={tech.name} mono={mono} className="h-6 w-6 sm:h-8 sm:w-8" /> : <Glyph className="h-5 w-5 sm:h-7 sm:w-7" strokeWidth={1.6} aria-hidden />}
        </span>
        <span className="chip hidden !text-[0.65rem] sm:inline-flex">{tech.category}</span>
      </div>
      <div>
        <h3 className="font-display text-base font-semibold leading-tight sm:text-xl">{tech.name}</h3>
        <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-[var(--brand)] sm:hidden">{tech.category}</p>
        <p className="mt-1.5 hidden text-sm text-ink-2 sm:block">{tech.description}</p>
      </div>
      <span aria-hidden className="mt-auto h-1 w-10 rounded-full transition-[width] duration-300 group-hover:w-full" style={{ background: 'var(--brand)' }} />
    </li>
  );
}

export function Toolbox() {
  const [focus, setFocus] = useState<TechGroup | 'all'>('all');
  const visible = TECHNOLOGIES.filter((t) => focus === 'all' || t.groups.includes(focus));

  return (
    <section id="toolbox" aria-labelledby="toolbox-title" className="scroll-mt-20 py-14 sm:py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          id="toolbox-title"
          index="03"
          label="Toolbox"
          title={
            <>
              Everything <span className="accent-serif text-accent-text">connects.</span>
            </>
          }
          intro="From the interface people touch to the AI and data behind it. Pick a group to focus on it."
        />

        <div role="group" aria-label="Filter technologies by area" className="mb-6 flex flex-wrap gap-2 sm:mb-10">
          {TECH_GROUPS.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={focus === t.id}
              onClick={() => setFocus(t.id)}
              className={cn(
                'min-h-10 rounded-full border px-4 text-sm sm:min-h-11 sm:px-5 font-medium transition-colors',
                focus === t.id ? 'border-ink bg-ink text-bg' : 'border-line-strong text-ink-2 hover:border-ink hover:text-ink',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <Reveal>
          <ul key={focus} aria-live="polite" className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((t, i) => (
              <TechCard key={t.id} tech={t} index={i} />
            ))}
          </ul>
        </Reveal>
        <p className="mt-6 text-sm text-ink-3" role="status">
          Showing {visible.length} {visible.length === 1 ? 'technology' : 'technologies'}.
        </p>
      </div>
    </section>
  );
}
