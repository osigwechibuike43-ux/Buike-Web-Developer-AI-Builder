import { useEffect } from 'react';
import { ARTICLES, formatDate, getArticle, readingMinutes } from '@/data/blog';
import { SITE } from '@/data/site';
import { ArticleCover } from '@/components/ui/ArticleCover';
import { ArrowRight } from '@/components/ui/Icons';
import { linkClick } from '@/lib/router';

/** Keeps the document head accurate for client-side navigation (the build also emits a static page per article). */
function useArticleHead(title: string, description: string, url: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const set = (sel: string, attr: string, value: string) => {
      const el = document.querySelector<HTMLMetaElement | HTMLLinkElement>(sel);
      const old = el?.getAttribute(attr) ?? '';
      el?.setAttribute(attr, value);
      return () => el?.setAttribute(attr, old);
    };
    document.title = title;
    const undo = [
      set('meta[name="description"]', 'content', description),
      set('link[rel="canonical"]', 'href', url),
      set('meta[property="og:title"]', 'content', title),
      set('meta[property="og:description"]', 'content', description),
      set('meta[property="og:url"]', 'content', url),
      set('meta[name="twitter:title"]', 'content', title),
      set('meta[name="twitter:description"]', 'content', description),
    ];
    return () => {
      document.title = previousTitle;
      undo.forEach((fn) => fn());
    };
  }, [title, description, url]);
}

export default function ArticlePage({ slug }: { slug: string }) {
  const article = getArticle(slug);
  const url = `${SITE.url}/blog/${slug}`;
  useArticleHead(
    article ? `${article.title} | ${SITE.name}` : `Article not found | ${SITE.name}`,
    article?.description ?? 'This article could not be found.',
    article ? url : `${SITE.url}/`,
  );

  useEffect(() => {
    if (!article) return;
    document.querySelectorAll('script[data-article-ld]').forEach((el) => el.remove());
    const tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.dataset.articleLd = '';
    tag.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description,
      datePublished: article.date,
      dateModified: article.date,
      inLanguage: 'en-NG',
      mainEntityOfPage: url,
      author: { '@type': 'Person', name: SITE.name, url: `${SITE.url}/` },
      image: `${SITE.url}${SITE.photo}`,
    });
    document.head.appendChild(tag);
    return () => tag.remove();
  }, [article, url]);

  if (!article) {
    return (
      <div className="container-x py-40 text-center">
        <h1 className="h-display text-5xl">Article not found</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-2">That article does not exist or may have moved.</p>
        <a href="/#blog" onClick={linkClick} className="btn btn-primary mt-8">
          Back to the journal
        </a>
      </div>
    );
  }

  const more = ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <article className="pb-24 pt-28 sm:pt-36">
      <div className="container-x max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs uppercase tracking-[0.16em] text-ink-3">
          <a href="/#blog" onClick={linkClick} className="hover:text-ink">
            ← Developer Journal
          </a>
        </nav>
        <p className="eyebrow">{article.category}</p>
        <h1 className="h-display mt-4 text-balance text-[clamp(2.2rem,6vw,3.8rem)]">{article.title}</h1>
        <p className="mt-5 text-pretty text-xl text-ink-2">{article.description}</p>
        <p className="mt-6 flex flex-wrap items-center gap-x-3 font-mono text-xs text-ink-3">
          <span>By {SITE.name}</span>·<time dateTime={article.date}>{formatDate(article.date)}</time>·<span>{readingMinutes(article)} min read</span>
        </p>
      </div>

      <div className="container-x mt-10 max-w-4xl">
        <ArticleCover category={article.category} className="overflow-hidden rounded-3xl border border-line-strong" />
      </div>

      <div className="container-x mt-12 max-w-3xl space-y-6 text-lg leading-relaxed text-ink-2">
        {article.sections.map((s, i) => (
          <section key={i} className="space-y-5">
            {s.heading && <h2 className="h-display pt-4 text-3xl text-ink">{s.heading}</h2>}
            {s.paragraphs.map((p, j) => (
              <p key={j} className="text-pretty">
                {p}
              </p>
            ))}
          </section>
        ))}

        <div className="card mt-14 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink">
            <strong className="font-semibold">Have an idea?</strong> Let’s build something meaningful.
          </p>
          <a href="/#contact" onClick={linkClick} className="btn btn-primary">
            Get in touch <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {more.length > 0 && (
        <aside aria-labelledby="more-title" className="container-x mt-20 max-w-4xl">
          <h2 id="more-title" className="eyebrow mb-6">
            More from the journal
          </h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {more.map((a) => (
              <li key={a.slug} className="card p-5">
                <p className="font-mono text-xs text-ink-3">{a.category}</p>
                <a href={`/blog/${a.slug}`} onClick={linkClick} className="mt-2 block font-display text-lg font-semibold leading-snug hover:text-accent-text">
                  {a.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  );
}
