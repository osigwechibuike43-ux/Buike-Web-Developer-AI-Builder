import { useState } from 'react';
import { ARTICLES, ARTICLE_CATEGORIES, formatDate, readingMinutes, type ArticleCategory } from '@/data/blog';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ArticleCover } from '@/components/ui/ArticleCover';
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
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((a, i) => (
              <Reveal as="li" key={a.slug} delay={(i % 3) * 0.06}>
                <article className="card group relative flex h-full flex-col overflow-hidden transition-shadow hover:shadow-[0_24px_50px_-28px_rgb(20_18_15/0.5)]">
                  <ArticleCover category={a.category} />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-xs text-ink-3">
                      <time dateTime={a.date}>{formatDate(a.date)}</time> · {readingMinutes(a)} min read
                    </p>
                    <h3 className="h-display mt-3 text-2xl">
                      <a href={`/blog/${a.slug}`} onClick={linkClick} className="after:absolute after:inset-0 hover:text-accent-text">
                        {a.title}
                      </a>
                    </h3>
                    <p className="mt-3 text-pretty text-ink-2">{a.description}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold">
                      Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      <span className="sr-only">: {a.title}</span>
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
