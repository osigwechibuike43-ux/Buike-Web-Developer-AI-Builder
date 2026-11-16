import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import { SITE, SOCIALS } from './src/data/site';
import { FAQ } from './src/data/content';

/** Replaces %TOKENS% in index.html and injects JSON-LD (Person, ProfilePage, WebSite, FAQPage) at build time. */
function seo(): Plugin {
  return {
    name: 'seo',
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
      const tag = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
      return out.replace('<!--STRUCTURED_DATA-->', tag);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seo()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: { target: 'es2022', sourcemap: false },
});
