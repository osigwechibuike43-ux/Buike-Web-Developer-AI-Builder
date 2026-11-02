import { cn } from '@/lib/cn';

/** The Buike mark: a geometric "B" with an ember full stop, set in a rounded tile. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn('shrink-0', className)}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <rect width="64" height="64" rx="16" fill="var(--ink)" />
      <path
        fill="var(--bg)"
        fillRule="evenodd"
        d="M16 14H33C40 14 44 18 44 23.5C44 27 42.3 29.6 39.5 31C43.2 32.3 45.5 35.4 45.5 39.5C45.5 46 40.5 50 33.5 50H16Z M24 21V28H32C34.8 28 36 26.6 36 24.5C36 22.4 34.8 21 32 21Z M24 35V43H33C36 43 37.5 41.5 37.5 39C37.5 36.5 36 35 33 35Z"
      />
      <circle cx="53" cy="47" r="3.6" fill="var(--accent)" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <LogoMark className="h-10 w-10" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] font-bold tracking-tight">
          Buike<span className="text-accent">.</span>
        </span>
        {!compact && (
          <span className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink-3">Web Developer</span>
        )}
      </span>
    </span>
  );
}
