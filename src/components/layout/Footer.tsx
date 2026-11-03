import { NAV, SITE, SOCIALS } from '@/data/site';
import { Logo, LogoMark } from '@/components/ui/Logo';
import { ArrowUpRight, SocialIcon } from '@/components/ui/Icons';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-2">
      <div className="container-x py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Logo />
            <p className="mt-6 max-w-sm text-pretty text-ink-2">
              Building. Learning. Engineering. Based in {SITE.location}, turning ideas into digital experiences.
            </p>
            <a href="#contact" className="btn btn-primary mt-8">
              Start a conversation <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="eyebrow mb-4">Sections</p>
            <ul className="space-y-2.5">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-ink-2 transition-colors hover:text-ink">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">Elsewhere</p>
            <ul className="space-y-2.5">
              {SOCIALS.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-ink-2 transition-colors hover:text-ink"
                  >
                    <SocialIcon id={s.id} className="h-5 w-5" />
                    <span>{s.label}</span>
                    <span className="sr-only">(opens in a new tab)</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
            <a href={`mailto:${SITE.email}`} className="mt-5 inline-block font-mono text-sm text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink">
              {SITE.email}
            </a>
          </div>
        </div>

        <p aria-hidden data-text="BUiKE." className="mt-16 select-none overflow-hidden whitespace-nowrap text-center font-display text-[clamp(4.5rem,23vw,17rem)] font-bold leading-[0.8] tracking-[-0.05em] text-brown/25 before:content-[attr(data-text)]" />

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-sm text-ink-3 sm:flex-row sm:items-center">
          <p className="flex items-center gap-3">
            <LogoMark className="h-6 w-6" />
            <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          </p>
          <p className="font-mono text-xs">
            Designed and built by Buike · {SITE.location}
          </p>
          <a href="#top" className="font-mono text-xs uppercase tracking-[0.18em] text-ink-2 hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
