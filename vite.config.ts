import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import { SITE, SOCIALS } from './src/data/site';
import { FAQ } from './src/data/content';
import { ARTICLES } from './src/data/blog';

/** Replaces %TOKENS% in index.html and injects JSON-LD (Person, ProfilePage, WebSite, FAQPage) at build time. */
function seo(): Plugin {
  let graphNodes: Record<string, unknown>[] = [];
  let outDir = 'dist';
  return {
    name: 'seo',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    transformIndexHtml(html) {
      const photo = `${SITE.url}${SITE.photo}`;
      const photoSquare = `${SITE.url}${SITE.photoSquare}`;
      const tokens: Record<string, string> = {
        '%TITLE%': SITE.title,
        '%SHORT_TITLE%': SITE.shortTitle,
        '%DESCRIPTION%': SITE.description,
        '%URL%': SITE.url,
        '%PHOTO_SQUARE%': SITE.photoSquare,
        '%PHOTO_ALT%': SITE.photoAlt,
      };
      let out = html;
      for (const [k, v] of Object.entries(tokens)) out = out.split(k).join(v);

      const person = {
        '@type': 'Person',
        '@id': `${SITE.url}/#person`,
        name: SITE.name,
        givenName: 'Osigwe',
        additionalName: 'Chibuike',
        familyName: 'Joseph',
        alternateName: [SITE.brand, 'Osigwe Chibuike'],
        jobTitle: SITE.roleFull,
        description: SITE.description,
        url: `${SITE.url}/`,
        mainEntityOfPage: { '@id': `${SITE.url}/#profilepage` },
        image: {
          '@type': 'ImageObject',
          '@id': `${SITE.url}/#photo`,
          url: photo,
          contentUrl: photo,
          width: 720,
          height: 900,
          encodingFormat: 'image/jpeg',
          name: 'Osigwe Chibuike Joseph — Web Developer in Nigeria',
          caption: SITE.photoAlt,
          representativeOfPage: true,
          thumbnailUrl: photoSquare,
        },
        email: `mailto:${SITE.email}`,
        nationality: { '@type': 'Country', name: 'Nigeria' },
        homeLocation: { '@type': 'Place', name: 'Owerri, Imo State, Nigeria' },
        address: { '@type': 'PostalAddress', addressLocality: 'Owerri', addressRegion: 'Imo State', addressCountry: 'NG' },
        hasOccupation: [
          { '@type': 'Occupation', name: 'Web Developer', occupationLocation: { '@type': 'Country', name: 'Nigeria' } },
          { '@type': 'Occupation', name: 'Software Developer', occupationLocation: { '@type': 'Country', name: 'Nigeria' } },
        ],
        sameAs: SOCIALS.filter((s) => s.id !== 'whatsapp').map((s) => s.href),
        knowsAbout: [
          'Web development',
          'Software engineering',
          'Artificial intelligence',
          'React',
          'TypeScript',
          'Tailwind CSS',
          'Supabase',
          'AI application development',
        ],
        knowsLanguage: 'en',
      };

      const graph = [
        person,
        {
          '@type': 'ProfilePage',
          '@id': `${SITE.url}/#profilepage`,
          url: `${SITE.url}/`,
          name: SITE.title,
          description: SITE.description,
          inLanguage: 'en-NG',
          isPartOf: { '@id': `${SITE.url}/#website` },
          mainEntity: { '@id': `${SITE.url}/#person` },
          primaryImageOfPage: { '@id': `${SITE.url}/#photo` },
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE.url}/#website`,
          url: `${SITE.url}/`,
          name: SITE.shortTitle,
          alternateName: `${SITE.brand} — ${SITE.role}`,
          inLanguage: 'en-NG',
          publisher: { '@id': `${SITE.url}/#person` },
        },
        {
          '@type': 'FAQPage',
          mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        },
      ];
      graphNodes = graph;
      const tag = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
      return out.replace('<!--STRUCTURED_DATA-->', tag);
    },
    /** Emits a static HTML page per article (own title, canonical and BlogPosting data) plus sitemap.xml. */
    writeBundle() {
      const indexFile = path.join(outDir, 'index.html');
      if (!fs.existsSync(indexFile)) return;
      const base = fs.readFileSync(indexFile, 'utf8');
      const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
      const [person, , website] = graphNodes;

      for (const a of ARTICLES) {
        const url = `${SITE.url}/blog/${a.slug}`;
        const title = `${a.title} | ${SITE.name}`;
        const post = {
          '@type': 'BlogPosting',
          '@id': `${url}#article`,
          headline: a.title,
          description: a.description,
          datePublished: a.date,
          dateModified: a.date,
          inLanguage: 'en-NG',
          mainEntityOfPage: url,
          author: { '@id': `${SITE.url}/#person` },
          publisher: { '@id': `${SITE.url}/#person` },
          image: `${SITE.url}${SITE.photo}`,
        };
        const ld = `<script type="application/ld+json" data-article-ld>${JSON.stringify({ '@context': 'https://schema.org', '@graph': [person, website, post] })}</script>`;
        const html = base
          .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
          .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(a.description)}$2`)
          .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
          .replace(/(<link rel="alternate" hreflang="[^"]*" href=")[^"]*(")/g, `$1${url}$2`)
          .replace(/(<meta property="og:type" content=")[^"]*(")/, '$1article$2')
          .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
          .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(a.description)}$2`)
          .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
          .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
          .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(a.description)}$2`)
          .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, ld);
        const dir = path.join(outDir, 'blog', a.slug);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), html);
      }

      const today = new Date().toISOString().slice(0, 10);
      const urls = [
        `  <url>
    <loc>${SITE.url}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${SITE.url}${SITE.photo}</image:loc>
      <image:title>${esc(SITE.shortTitle)}</image:title>
      <image:caption>${esc(SITE.photoAlt)}</image:caption>
    </image:image>
  </url>`,
        ...ARTICLES.map(
          (a) => `  <url>
    <loc>${SITE.url}/blog/${a.slug}</loc>
    <lastmod>${a.date}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>`,
        ),
      ];
      fs.writeFileSync(
        path.join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`,
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seo()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: { target: 'es2022', sourcemap: false },
});
