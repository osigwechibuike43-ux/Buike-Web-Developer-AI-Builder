import { useState } from 'react';
import { ARTICLES, ARTICLE_CATEGORIES, formatDate, readingMinutes, type ArticleCategory } from '@/data/blog';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ArticleCover, CATEGORY_COLORS, CATEGORY_ICONS } from '@/components/ui/ArticleCover';
import { ArrowRight } from '@/components/ui/Icons';
import { linkClick } from '@/lib/router';
import { cn } from '@/lib/cn';

export function Blog() {
  const [category, setCategory] = useState<ArticleCategory | 'all'>('all');
  const visible = ARTICLES.filter((a) => category === 'all' || a.category === category);
  const tabs: { id: ArticleCategory | 'all'; label: string }[] = [{ id: 'all', label: 'All' }, ...ARTICLE_CATEGORIES.map((c) => ({ id: c, label: c }))];

  return (
    <section id="blog" aria-labelledby="blog-title" className="scroll-mt-20 border-y border-line bg-bg-2/60 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="blog-title"
          index="07"
          label="Blog"
          title={
            <>
              Developer <span className="accent-serif text-accent-text">Journal.</span>
            </>
          }
          intro="Notes on software engineering, AI, web development and what I am learning along the way."
        />

        <div role="group" aria-label="Filter articles by category" className="mb-10 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={category === t.id}
              onClick={() => setCategory(t.id)}
              className={cn(
                'min-h-11 rounded-full border px-4 text-sm font-medium transition-colors',
                category === t.id ? 'border-ink bg-ink text-bg' : 'border-line-strong text-ink-2 hover:border-ink hover:text-ink',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p role="status" className="sr-only">
          Showing {visible.length} {visible.length === 1 ? 'article' : 'articles'}
        </p>

        {visible.length === 0 ? (
          <p className="card p-8 text-ink-2">No articles in this category yet. New posts are added regularly.</p>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((a, i) => {
              const Icon = CATEGORY_ICONS[a.category];
              return (
                <Reveal as="li" key={a.slug} delay={(i % 3) * 0.06} className="h-full">
                  <article
                    style={{ '--c': CATEGORY_COLORS[a.category] } as React.CSSProperties}
                    className="card group relative flex h-full flex-col overflow-hidden p-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--c)] hover:shadow-[0_20px_40px_-26px_var(--c)]"
                  >
                    <ArticleCover category={a.category} compact className="rounded-xl" />
                    <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-4">
                      <p className="flex items-center gap-2.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-3">
                        <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--c)_16%,transparent)] text-[var(--c)]">
                          <Icon className="h-4 w-4" strokeWidth={1.8} />
                        </span>
                        <span>
                          <time dateTime={a.date}>{formatDate(a.date)}</time> · {readingMinutes(a)} min
                        </span>
                      </p>
                      <h3 className="h-display mt-3 text-lg leading-snug">
                        <a href={`/blog/${a.slug}`} onClick={linkClick} className="after:absolute after:inset-0 hover:text-accent-text">
                          {a.title}
                        </a>
                      </h3>
                      <p className="mt-2 line-clamp-2 text-pretty text-sm text-ink-2">{a.description}</p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold">
                        Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        <span className="sr-only">: {a.title}</span>
                      </span>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
