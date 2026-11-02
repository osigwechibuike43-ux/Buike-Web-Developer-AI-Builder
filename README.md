# Buike — Web Developer (portfolio)

Portfolio of **Osigwe Chibuike Joseph** ("Buike"), a web developer in Nigeria.
React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion · Vercel.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # type-check
npm run build      # production build to dist/
npm run preview
```

The `/api/contact` function only runs on Vercel (or with `vercel dev`). Under plain `npm run dev` the contact form
falls back to "Open in email / WhatsApp" links, with the visitor's message preserved.

## Contact form setup (Vercel)

Set these environment variables in the Vercel project, then redeploy:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Create at https://resend.com/api-keys. Without it the form uses the email/WhatsApp fallback. |
| `CONTACT_TO_EMAIL` | Inbox that receives enquiries (default `buikedev27@gmail.com`). |
| `CONTACT_FROM_EMAIL` | Sender. Use `Buike Portfolio <onboarding@resend.dev>` until you verify a domain in Resend. |

The endpoint validates input, escapes HTML, rejects cross-origin posts, uses a honeypot and a best-effort
rate limit (5 per hour per IP per instance).

## Editing content

| What | Where |
| --- | --- |
| Name, contact, social links, site URL | `src/data/site.ts` |
| Projects (stack, links, personal vs client) | `src/data/projects.ts` |
| Skills, services, journey, FAQ | `src/data/content.ts` |
| Real project screenshots | add a file to `public/projects/` and set `image` on the project |
| Colours and type | CSS variables at the top of `src/index.css` |

Every project is labelled **Personal project** or **Client work** from its `kind` field. Nothing on the site claims
clients, testimonials, employment or certifications; add them only when they are real.

## Structure

```
api/contact.ts            Vercel function (Resend)
src/components/layout     Header (mobile menu), Footer, ThemeToggle
src/components/sections   Hero, Work, About, Toolbox, Services, Journey, Faq, Contact
src/components/ui         Logo, Reveal, Portrait, ProjectVisual, icons
src/data                  Content
design/                   Original portrait source
```
