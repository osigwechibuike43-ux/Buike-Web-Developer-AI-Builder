import { Bot, Code2, Compass, Globe, Layers, type LucideIcon } from 'lucide-react';
import type { ArticleCategory } from '@/data/blog';
import { cn } from '@/lib/cn';

const THEMES: Record<ArticleCategory, { bg: string; fg: string; accent: string }> = {
  'Software Engineering': { bg: '#30241E', fg: '#F4EFEA', accent: '#D9A27C' },
  'Artificial Intelligence': { bg: '#14172B', fg: '#ECEBFA', accent: '#8B7CFF' },
  'Web Development': { bg: '#F1E4D6', fg: '#30241E', accent: '#8B654A' },
  Technology: { bg: '#10211C', fg: '#E6F3EE', accent: '#4FC3A1' },
  'My Journey': { bg: '#E4470F', fg: '#FFF6F0', accent: '#30241E' },
};

export const CATEGORY_ICONS: Record<ArticleCategory, LucideIcon> = {
  'Software Engineering': Layers,
  'Artificial Intelligence': Bot,
  'Web Development': Globe,
  Technology: Code2,
  'My Journey': Compass,
};
export const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  'Software Engineering': '#B07A55',
  'Artificial Intelligence': '#8B5CF6',
  'Web Development': '#2F6FED',
  Technology: '#0F9D8A',
  'My Journey': '#E4470F',
};

/** Generated cover art: a category-coloured panel with a code-bracket motif. No stock photography. */
export function ArticleCover({ category, className, compact = false }: { category: ArticleCategory; className?: string; compact?: boolean }) {
  const t = THEMES[category];
  const Icon = CATEGORY_ICONS[category];
  return (
    <div aria-hidden className={cn('relative w-full overflow-hidden', compact ? 'aspect-[21/8]' : 'aspect-[16/9]', className)} style={{ background: t.bg, color: t.fg }}>
      <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" focusable="false">
        <circle cx="270" cy="34" r="78" fill={t.accent} opacity="0.22" />
        <circle cx="38" cy="168" r="64" fill={t.accent} opacity="0.16" />
      </svg>
      <Icon className="absolute left-1/2 top-1/2 h-[34%] w-auto -translate-x-1/2 -translate-y-[58%]" strokeWidth={1.4} style={{ color: t.accent }} />
      <span className="absolute bottom-3 left-4 rounded-full border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em]" style={{ borderColor: `${t.fg}55` }}>
        {category}
      </span>
    </div>
  );
}
