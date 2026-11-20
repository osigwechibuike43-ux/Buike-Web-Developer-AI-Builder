import type { ReactNode } from 'react';
import type { Project } from '@/types';
import { cn } from '@/lib/cn';

/** A small original mark per project, drawn in that project's own palette. Replace with an official logo any time. */
function glyph(id: string, fg: string, accent: string): ReactNode {
  const stroke = { fill: 'none', stroke: accent, strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  switch (id) {
    case 'nuvora': // a nova: four-point star
      return (
        <>
          <path d="M16 5c1 6 3 8 11 11-8 3-10 5-11 11-1-6-3-8-11-11 8-3 10-5 11-11Z" fill={accent} />
          <circle cx="25" cy="7" r="1.8" fill={fg} />
        </>
      );
    case 'chatbi': // chat bubble with typing dots
      return (
        <>
          <path d="M6 8.5A3.5 3.5 0 0 1 9.5 5h13A3.5 3.5 0 0 1 26 8.5v9a3.5 3.5 0 0 1-3.5 3.5H14l-5 5v-5h-.5A3.5 3.5 0 0 1 5 17.5Z" {...stroke} />
          <circle cx="11" cy="13" r="1.5" fill={accent} />
          <circle cx="16" cy="13" r="1.5" fill={accent} />
          <circle cx="21" cy="13" r="1.5" fill={accent} />
        </>
      );
    case 'buike-clothing': // hanger
      return (
        <>
          <path d="M16 12V9.5a2.5 2.5 0 1 0-2.5-2.5" {...stroke} />
          <path d="M16 12 5.5 20a1.8 1.8 0 0 0 1.1 3.2h18.8a1.8 1.8 0 0 0 1.1-3.2L16 12Z" {...stroke} />
        </>
      );
    case 'aurelia-events': // diamond
      return (
        <>
          <path d="M9 6h14l5 7-12 14L4 13Z" {...stroke} />
          <path d="M4 13h24M12 6l-2 7 6 14 6-14-2-7" {...stroke} strokeWidth={1.8} />
        </>
      );
    case 'amara-events': // interlocking rings
      return (
        <>
          <circle cx="12" cy="17" r="7" {...stroke} />
          <circle cx="20" cy="17" r="7" {...stroke} />
          <circle cx="16" cy="6.5" r="1.7" fill={accent} />
        </>
      );
    case 'eventera': // calendar with check
      return (
        <>
          <rect x="5" y="7" width="22" height="20" rx="4" {...stroke} />
          <path d="M5 13h22M11 4v5M21 4v5M11.5 20l3 3 6-6" {...stroke} />
        </>
      );
    case 'luxury-cars': // speedometer
      return (
        <>
          <path d="M5 22a11 11 0 1 1 22 0" {...stroke} />
          <path d="m16 22 6-8" {...stroke} />
          <circle cx="16" cy="22" r="2" fill={accent} />
        </>
      );
    case 'nexus': // connected nodes
      return (
        <>
          <path d="m16 9-8 13M16 9l8 13M8 22h16" {...stroke} strokeWidth={1.8} />
          <circle cx="16" cy="8" r="3.4" fill={accent} />
          <circle cx="7.5" cy="23" r="3.4" fill={accent} />
          <circle cx="24.5" cy="23" r="3.4" fill={accent} />
        </>
      );
    default:
      return null;
  }
}

export function ProjectMark({ project, className }: { project: Project; className?: string }) {
  const { bg, fg, accent } = project.palette;
  const g = glyph(project.id, fg, accent);
  return (
    <span
      aria-hidden
      className={cn('inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl border', className)}
      style={{ background: bg, borderColor: `color-mix(in srgb, ${accent} 50%, transparent)` }}
    >
      {g ? (
        <svg viewBox="0 0 32 32" className="h-[62%] w-[62%]" focusable="false">
          {g}
        </svg>
      ) : (
        <span className="font-display font-bold" style={{ color: accent }}>
          {project.name.slice(0, 1)}
        </span>
      )}
    </span>
  );
}
