import type { CSSProperties } from 'react';
import type { Project } from '@/types';
import { cn } from '@/lib/cn';

const host = (url?: string) => (url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'github.com');

/** Generated preview panel in each project's own palette. Swap in a real screenshot via `project.image`. */
export function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  const { bg, fg, accent } = project.palette;
  const faint = `color-mix(in srgb, ${fg} 14%, transparent)`;
  const soft = `color-mix(in srgb, ${fg} 30%, transparent)`;
  const urlText = `color-mix(in srgb, ${fg} 78%, ${bg})`;

  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Screenshot of ${project.name}`}
        loading="lazy"
        decoding="async"
        className={cn('aspect-[16/10] w-full rounded-xl border border-line object-cover object-top', className)}
      />
    );
  }

  const bar = (w: string, o = faint, h = '0.4rem'): CSSProperties => ({ width: w, height: h, background: o, borderRadius: 999 });

  const body = (() => {
    switch (project.visual) {
      case 'learning':
        return (
          <div className="grid h-full grid-cols-[2.2rem_1fr] gap-4">
            <div className="relative flex flex-col items-center justify-between py-1">
              <span className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2" style={{ background: soft }} />
              {[1, 1, 0, 0].map((on, i) => (
                <span key={i} className="relative h-3.5 w-3.5 rounded-full border-2" style={{ borderColor: on ? accent : soft, background: on ? accent : bg }} />
              ))}
            </div>
            <div className="flex flex-col justify-center gap-3">
              <p className="font-display text-[clamp(1.1rem,3.2vw,1.9rem)] font-bold leading-[1.05] tracking-tight">
                Learn. Understand.
                <br />
                <span style={{ color: accent }}>Become.</span>
              </p>
              <div style={bar('100%', faint, '0.45rem')}>
                <div style={{ ...bar('58%', accent, '0.45rem') }} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="space-y-1.5 rounded-lg border p-2" style={{ borderColor: faint }}>
                    <div style={bar('70%', soft)} />
                    <div style={bar('45%')} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className="flex h-full flex-col justify-end gap-2.5">
            <div className="w-[68%] space-y-1.5 rounded-2xl rounded-bl-sm p-3" style={{ background: faint }}>
              <div style={bar('92%', soft)} />
              <div style={bar('64%', soft)} />
            </div>
            <div className="ml-auto w-[48%] space-y-1.5 rounded-2xl rounded-br-sm p-3" style={{ background: accent }}>
              <div style={bar('90%', bg)} />
              <div style={bar('50%', bg)} />
            </div>
            <div className="w-[78%] space-y-1.5 rounded-2xl rounded-bl-sm p-3" style={{ background: faint }}>
              <div style={bar('96%', soft)} />
              <div style={bar('80%', soft)} />
              <div style={bar('40%', soft)} />
            </div>
            <div className="mt-1 flex items-center justify-between rounded-full border px-3 py-2" style={{ borderColor: soft }}>
              <div style={bar('42%')} />
              <span className="h-4 w-4 rounded-full" style={{ background: accent }} />
            </div>
          </div>
        );
      case 'fashion':
        return (
          <div className="flex h-full flex-col justify-between">
            <p className="text-center font-display text-[clamp(1.6rem,6vw,3rem)] font-extrabold tracking-[0.35em] pl-[0.35em]">BUIKÉ</p>
            <div className="grid flex-1 grid-cols-3 gap-2 pt-3">
              {['#2a2a2a', '#e8e8e8', '#4a4a4a'].map((c, i) => (
                <div key={c} className={cn('rounded-sm', i === 1 && 'mt-4')} style={{ background: c }} />
              ))}
            </div>
          </div>
        );
      case 'wedding':
        return (
          <div className="flex h-full flex-col items-center justify-between text-center">
            <div>
              <p className="font-serif text-[clamp(1.6rem,6vw,3rem)] italic leading-none">Aurelia</p>
              <div className="mx-auto mt-2 h-px w-16" style={{ background: accent }} />
            </div>
            <div className="grid w-full flex-1 grid-cols-3 items-end gap-3 pt-3">
              {[0.9, 1, 0.8].map((h, i) => (
                <div key={i} className="rounded-t-full" style={{ height: `${h * 100}%`, background: i === 1 ? accent : faint }} />
              ))}
            </div>
          </div>
        );
      case 'events':
        return (
          <div className="flex h-full flex-col justify-between">
            <div>
              <p className="font-serif text-[clamp(1.6rem,6vw,3rem)] leading-none">Amara</p>
              <div className="mt-2 h-px w-20" style={{ background: accent }} />
            </div>
            <div className="grid flex-1 grid-cols-3 gap-2 pt-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-md" style={{ background: `linear-gradient(160deg, color-mix(in srgb, ${accent} ${30 + i * 18}%, ${bg}), ${bg})`, border: `1px solid ${faint}` }} />
              ))}
            </div>
          </div>
        );
      case 'discover':
        return (
          <div className="flex h-full flex-col gap-2.5">
            <div className="flex gap-1.5">
              {['All', 'Music', 'Tech', 'Arts'].map((t, i) => (
                <span key={t} className="rounded-full px-2.5 py-1 font-mono text-[0.55rem]" style={{ background: i === 0 ? accent : faint, color: i === 0 ? bg : fg }}>
                  {t}
                </span>
              ))}
            </div>
            <div className="grid flex-1 grid-cols-3 gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col justify-between rounded-lg border p-2" style={{ borderColor: faint }}>
                  <span className="h-2 w-2 rounded-sm" style={{ background: i % 2 ? accent : soft }} />
                  <div className="space-y-1">
                    <div style={bar('80%', soft, '0.3rem')} />
                    <div style={bar('50%', faint, '0.3rem')} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'swap':
        return (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="relative h-14 w-40">
              <span className="absolute left-0 top-0 h-14 w-14 rounded-full border-2" style={{ borderColor: accent, background: faint }} />
              <span className="absolute right-0 top-0 h-14 w-14 rounded-full" style={{ background: accent }} />
              <svg viewBox="0 0 40 20" className="absolute left-1/2 top-1/2 h-5 w-10 -translate-x-1/2 -translate-y-1/2" aria-hidden>
                <path d="M4 7h28m0 0-5-5m5 5-5 5M36 14H8m0 0 5-5m-5 5 5 5" fill="none" stroke={fg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-display text-[clamp(1.1rem,3.4vw,1.8rem)] font-bold tracking-tight">
              Skill<span style={{ color: accent }}>Swapr</span>
            </p>
            <div className="flex gap-2">
              {['Design', 'Code', 'Music'].map((t) => (
                <span key={t} className="rounded-full border px-2.5 py-1 font-mono text-[0.55rem]" style={{ borderColor: soft }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        );
      case 'estate':
        return (
          <div className="relative flex h-full flex-col justify-between">
            <p className="font-serif text-[clamp(1.6rem,6vw,3rem)] leading-none tracking-wide">
              NOIR <span style={{ color: accent }}>ESTATE</span>
            </p>
            <div className="flex flex-1 items-end gap-2 pt-3">
              {[0.45, 0.8, 0.6, 1, 0.7, 0.5].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h * 100}%`, background: i === 3 ? accent : faint, border: `1px solid ${faint}` }} />
              ))}
            </div>
          </div>
        );
      case 'builder':
        return (
          <div className="grid h-full grid-cols-[1fr_1.4fr] gap-3">
            <div className="flex flex-col gap-2 rounded-lg border p-2.5" style={{ borderColor: faint }}>
              <div style={bar('60%', accent, '0.4rem')} />
              <div style={bar('100%', soft)} />
              <div style={bar('85%', faint)} />
              <div style={bar('92%', faint)} />
              <div className="mt-auto rounded-md px-2 py-1.5 text-center font-mono text-[0.5rem]" style={{ background: accent, color: bg }}>
                Generate
              </div>
            </div>
            <div className="relative flex flex-col gap-2 rounded-lg border p-2.5" style={{ borderColor: faint }}>
              <div className="h-1/3 rounded-md" style={{ background: faint }} />
              <div className="grid flex-1 grid-cols-2 gap-2">
                <div className="rounded-md" style={{ background: soft }} />
                <div className="rounded-md" style={{ background: faint }} />
              </div>
              <svg viewBox="0 0 16 16" className="absolute bottom-3 right-4 h-5 w-5" aria-hidden>
                <path d="M2 1.5 13 7l-4.6 1.4L6.5 13 2 1.5Z" fill={accent} stroke={bg} strokeWidth="1" />
              </svg>
            </div>
          </div>
        );
      case 'auto':
        return (
          <div className="relative flex h-full flex-col justify-between overflow-hidden">
            <div aria-hidden className="absolute -right-6 bottom-0 h-full w-2/3 opacity-60" style={{ background: `repeating-linear-gradient(115deg, transparent 0 14px, ${faint} 14px 16px)` }} />
            <p className="relative font-display text-[clamp(1.5rem,5.6vw,2.8rem)] font-extrabold italic leading-[0.95] tracking-tight">
              LUXURY
              <br />
              <span style={{ color: accent }}>CARS</span>
            </p>
            <div className="relative flex items-end justify-between">
              <div className="flex gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="space-y-1">
                    <div style={bar('1.6rem', accent, '0.35rem')} />
                    <div style={bar('2.4rem', faint, '0.3rem')} />
                  </div>
                ))}
              </div>
              <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
                <circle cx="24" cy="24" r="18" fill="none" stroke={faint} strokeWidth="4" />
                <path d="M24 6a18 18 0 0 1 15.6 27" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        );
    }
  })();

  return (
    <div aria-hidden className={cn('relative aspect-[16/10] w-full overflow-hidden rounded-xl border', className)} style={{ background: bg, color: fg, borderColor: faint }}>
      <div className="flex h-7 items-center gap-1.5 border-b px-3" style={{ borderColor: faint }}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: soft }} />
        ))}
        <span className="ml-2 truncate font-mono text-[0.6rem]" style={{ color: urlText }}>
          {host(project.liveUrl)}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 top-7 p-[clamp(0.7rem,2.4vw,1.25rem)]">{body}</div>
    </div>
  );
}
