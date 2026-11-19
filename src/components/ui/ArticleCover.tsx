import type { ArticleCategory } from '@/data/blog';
import { cn } from '@/lib/cn';

const THEMES: Record<ArticleCategory, { bg: string; fg: string; accent: string }> = {
  'Software Engineering': { bg: '#30241E', fg: '#F4EFEA', accent: '#D9A27C' },
  'Artificial Intelligence': { bg: '#14172B', fg: '#ECEBFA', accent: '#8B7CFF' },
  'Web Development': { bg: '#F1E4D6', fg: '#30241E', accent: '#8B654A' },
  Technology: { bg: '#10211C', fg: '#E6F3EE', accent: '#4FC3A1' },
  'My Journey': { bg: '#E4470F', fg: '#FFF6F0', accent: '#30241E' },
};

/** Generated cover art: a category-coloured panel with a code-bracket motif. No stock photography. */
export function ArticleCover({ category, className }: { category: ArticleCategory; className?: string }) {
  const t = THEMES[category];
  return (
    <div aria-hidden className={cn('relative aspect-[16/9] w-full overflow-hidden', className)} style={{ background: t.bg, color: t.fg }}>
      <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" focusable="false">
        <circle cx="270" cy="34" r="78" fill={t.accent} opacity="0.22" />
        <circle cx="38" cy="168" r="64" fill={t.accent} opacity="0.16" />
        <path d="M120 66 82 90l38 24M200 66l38 24-38 24" fill="none" stroke={t.accent} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m172 58-24 64" fill="none" stroke={t.fg} strokeWidth="9" strokeLinecap="round" opacity="0.85" />
      </svg>
      <span className="absolute bottom-3 left-4 rounded-full border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em]" style={{ borderColor: `${t.fg}55` }}>
        {category}
      </span>
    </div>
  );
}
