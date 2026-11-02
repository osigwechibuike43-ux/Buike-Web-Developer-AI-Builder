import { useState } from 'react';
import { SKILL_GROUPS } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

export function Toolbox() {
  const [focus, setFocus] = useState<string>('all');
  const tabs = [{ id: 'all', title: 'Everything' }, ...SKILL_GROUPS.map((g) => ({ id: g.id, title: g.title }))];

  return (
    <section id="toolbox" aria-labelledby="toolbox-title" className="scroll-mt-20 py-24 sm:py-32">
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

        <div role="group" aria-label="Filter toolbox by area" className="mb-10 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={focus === t.id}
              onClick={() => setFocus(t.id)}
              className={cn(
                'min-h-11 rounded-full border px-5 text-sm font-medium transition-colors',
                focus === t.id ? 'border-ink bg-ink text-bg' : 'border-line-strong text-ink-2 hover:border-ink hover:text-ink',
              )}
            >
              {t.title}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {SKILL_GROUPS.map((g, i) => {
            const dim = focus !== 'all' && focus !== g.id;
            return (
              <Reveal key={g.id} delay={(i % 2) * 0.08}>
                <div className={cn('card h-full p-7 transition-[opacity,transform] duration-300', dim && 'scale-[0.985] opacity-35')}>
                  <p className="eyebrow mb-3 text-accent-text">0{i + 1}</p>
                  <h3 className="h-display text-3xl">{g.title}</h3>
                  <p className="mt-2 text-ink-2">{g.blurb}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <li key={item} className="rounded-full border border-line-strong bg-bg px-4 py-2 text-sm font-medium transition-colors hover:border-accent-text hover:text-accent-text">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
