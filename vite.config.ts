import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import { SITE, SOCIALS } from './src/data/site';
import { FAQ } from './src/data/content';

/** Injects structured data (Person, WebSite, FAQPage) into index.html at build time. */
function structuredData(): Plugin {
  return {
    name: 'structured-data',
    transformIndexHtml(html) {
      const graph = [
        {
          '@type': 'Person',
          '@id': `${SITE.url}/#person`,
          name: SITE.name,
          alternateName: SITE.brand,
          jobTitle: SITE.role,
          description: SITE.description,
          url: SITE.url,
          image: `${SITE.url}/og-image.png`,
          email: `mailto:${SITE.email}`,
          address: { '@type': 'PostalAddress', addressLocality: 'Owerri', addressRegion: 'Imo State', addressCountry: 'NG' },
          sameAs: SOCIALS.filter((s) => s.id !== 'whatsapp').map((s) => s.href),
          knowsAbout: ['Web development', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'AI application development'],
        },
        { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: `${SITE.brand} — ${SITE.role}`, inLanguage: 'en', publisher: { '@id': `${SITE.url}/#person` } },
        {
          '@type': 'FAQPage',
          mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        },
      ];
      const tag = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
      return html.replace('<!--STRUCTURED_DATA-->', tag);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), structuredData()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: { target: 'es2022', sourcemap: false },
});
