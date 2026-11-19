export type ArticleCategory = 'Software Engineering' | 'Artificial Intelligence' | 'Web Development' | 'Technology' | 'My Journey';

export const ARTICLE_CATEGORIES: ArticleCategory[] = ['Software Engineering', 'Artificial Intelligence', 'Web Development', 'Technology', 'My Journey'];

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  sections: ArticleSection[];
}

/** Reading time at roughly 200 words per minute, never less than one minute. */
export function readingMinutes(a: Article): number {
  const words = a.sections.flatMap((s) => [s.heading ?? '', ...s.paragraphs]).join(' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** Personal reflections written in my own words. Edit or add articles here and they appear on the site, in the sitemap and at /blog/<slug>. */
export const ARTICLES: Article[] = [
  {
    slug: 'from-curiosity-to-code',
    title: 'From curiosity to code: how I started building for the web',
    description: 'How a simple question about how websites work turned into a habit of building and shipping projects.',
    category: 'My Journey',
    date: '2026-11-19',
    sections: [
      {
        paragraphs: [
          'Like many developers, I did not start with a plan. I started with a question: how does a website actually work? Every page I opened looked finished, and I wanted to understand what was behind it.',
        ],
      },
      {
        heading: 'Learning by building',
        paragraphs: [
          'I began with HTML and CSS and tried to recreate pages I liked. That was frustrating at first, and it was also the fastest way to learn. Tutorials taught me syntax, but building my own pages taught me why things break and how to fix them.',
          'From there I moved to JavaScript, then React and TypeScript. Each step opened up a new kind of project: first static pages, then interactive interfaces, then products with accounts and databases.',
        ],
      },
      {
        heading: 'What I still hold on to',
        paragraphs: [
          'Two habits have stayed with me. The first is to put things online as early as possible, because a live link teaches more than a folder on my computer. The second is to treat every project as practice for the next one.',
          'I am still early in this journey, and I am happy about that. There is a lot left to learn, and I would rather be building while I learn it.',
        ],
      },
    ],
  },
  {
    slug: 'why-i-design-mobile-first',
    title: 'Why I design every website mobile-first',
    description: 'A practical look at why starting from the smallest screen leads to cleaner layouts and faster pages.',
    category: 'Web Development',
    date: '2026-11-19',
    sections: [
      {
        paragraphs: [
          'Most people in Nigeria meet the internet on a phone. That single fact shapes how I build: if a site does not work well on a small screen, it does not work well for most of the people who will visit it.',
        ],
      },
      {
        heading: 'Constraints make better layouts',
        paragraphs: [
          'Starting from a narrow screen forces me to decide what matters. There is room for one column, one clear action and the content that earns its place. When the screen grows, I add space and structure instead of rescuing a cramped design.',
        ],
      },
      {
        heading: 'Speed is part of the design',
        paragraphs: [
          'Heavy images and unnecessary scripts hurt phones on slower connections the most. I try to ship properly sized images, load only what a page needs and test on a real phone, not only in a desktop browser.',
          'Accessibility belongs in the same conversation. Readable text, enough contrast and buttons large enough to tap are basic requirements, and they make the site better for everyone.',
        ],
      },
    ],
  },
  {
    slug: 'adding-ai-without-losing-the-plot',
    title: 'Adding AI to a product without losing the plot',
    description: 'Notes on using language-model APIs as a helpful feature rather than the whole product.',
    category: 'Artificial Intelligence',
    date: '2026-11-19',
    sections: [
      {
        paragraphs: [
          'Language-model APIs make it easy to add an assistant to almost anything. The harder question is whether the assistant makes the product better. I have been exploring that question through projects like ChatBI and NUVORA.',
        ],
      },
      {
        heading: 'Start with the job to be done',
        paragraphs: [
          'A chat box is not a feature on its own. I try to begin with what a person is trying to do, such as understanding a lesson or finding something in their notes, and then decide where AI genuinely helps.',
        ],
      },
      {
        heading: 'Keep the basics solid',
        paragraphs: [
          'Interfaces around AI still need loading states, clear errors and fast pages. API keys belong on the server, never in the browser. And answers should be presented honestly: a model can be wrong, so the interface should make it easy to check and correct.',
          'I see AI as a powerful tool inside a well-built product. The product still has to be good without the hype.',
        ],
      },
    ],
  },
  {
    slug: 'ship-small-ship-live',
    title: 'Ship small, ship live: lessons from putting projects online',
    description: 'Why deploying early and often has taught me more than any amount of planning.',
    category: 'Software Engineering',
    date: '2026-11-19',
    sections: [
      {
        paragraphs: [
          'A project on my laptop is a draft. A project with a link is something I can test on other devices, share with other people and be honest about. That is why I deploy early.',
        ],
      },
      {
        heading: 'Small steps, working software',
        paragraphs: [
          'I try to keep the app in a working state after every change: build a small piece, check it, commit it and move on. When something breaks, the cause is almost always in the last small step, which makes fixing it far easier.',
        ],
      },
      {
        heading: 'Use the tools that protect you',
        paragraphs: [
          'TypeScript catches a whole class of mistakes before they reach a browser. Git gives me a safe way to experiment. Automatic deployments on Vercel mean every change is one push away from being live.',
          'None of this is advanced. It is the discipline of making the next change safe, and it compounds over time.',
        ],
      },
    ],
  },
  {
    slug: 'what-im-exploring-next',
    title: 'What I am exploring next: backend, cloud and automation',
    description: 'The areas of software engineering I want to go deeper into, and why.',
    category: 'Technology',
    date: '2026-11-19',
    sections: [
      {
        paragraphs: [
          'My strongest area today is the frontend: React, TypeScript and Tailwind CSS. Working with Supabase and serverless functions has also shown me how much of a product lives behind the interface.',
        ],
      },
      {
        heading: 'Going deeper on the backend',
        paragraphs: [
          'I want to get better at designing databases, writing secure APIs and thinking about how a system behaves when many people use it at once. These are the skills that turn a good-looking app into a dependable one.',
        ],
      },
      {
        heading: 'Cloud and automation',
        paragraphs: [
          'I am also curious about cloud computing and automation: how code gets deployed, monitored and kept running, and how repetitive work can be handed to scripts.',
          'The goal is simple. I want to be able to build a product from the first screen to the server that runs it, and eventually to build products of my own.',
        ],
      },
    ],
  },
  {
    slug: 'my-everyday-stack',
    title: 'Why React, TypeScript and Tailwind are my everyday stack',
    description: 'The reasons behind the tools I reach for first when starting a new web project.',
    category: 'Web Development',
    date: '2026-11-19',
    sections: [
      {
        paragraphs: [
          'I do not believe there is one correct stack. I use React, TypeScript, Tailwind CSS and Vite for most projects because they fit how I like to work.',
        ],
      },
      {
        heading: 'React for components',
        paragraphs: [
          'Thinking in components keeps interfaces consistent and easy to change. A card, a button or a form is built once and reused everywhere, so a design change happens in one place.',
        ],
      },
      {
        heading: 'TypeScript for confidence',
        paragraphs: [
          'Types describe what my data looks like and warn me when something does not match. They make refactoring less stressful and help me return to old code with fewer surprises.',
        ],
      },
      {
        heading: 'Tailwind and Vite for speed',
        paragraphs: [
          'Tailwind lets me style directly in the markup with a consistent set of design tokens, and Vite makes the feedback loop quick. Together they keep me focused on the product instead of the tooling.',
        ],
      },
    ],
  },
];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
