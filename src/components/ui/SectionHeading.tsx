import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface Props {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
}

export function SectionHeading({ index, label, title, intro, id }: Props) {
  return (
    <Reveal className="mb-12 max-w-3xl sm:mb-16">
      <p className="eyebrow mb-5 flex items-center gap-3">
        <span className="text-accent-text">{index}</span>
        <span aria-hidden className="h-px w-10 bg-line-strong" />
        <span>{label}</span>
      </p>
      <h2 id={id} className="h-display text-balance text-[clamp(2.25rem,6vw,4.25rem)]">
        {title}
      </h2>
      {intro && <p className="mt-6 max-w-2xl text-pretty text-lg text-ink-2">{intro}</p>}
    </Reveal>
  );
}
