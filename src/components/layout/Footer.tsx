import { CV, NAV, SITE, SOCIALS } from '@/data/site';
import { LogoMark } from '@/components/ui/Logo';
import { ArrowUpRight, Download, SocialIcon } from '@/components/ui/Icons';
import { linkClick } from '@/lib/router';

const linkClass = 'rounded text-beige/75 transition-colors hover:text-beige focus-visible:text-beige';

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-chocolate text-beige">
      <div className="container-x py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-3">
              <LogoMark className="h-10 w-10 [&_rect]:fill-[#F4EFEA] [&_path]:fill-[#30241E]" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[1.35rem] font-bold tracking-tight">
                  Buike<span className="text-[#D9A27C]">.</span>
                </span>
                <span className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-beige/70">Web Developer</span>
              </span>
            </span>
            <p className="mt-6 max-w-sm text-pretty text-beige/75">
              Software developer from Nigeria building modern websites and AI-powered products that solve real problems.
            </p>
            <a href="/#contact" onClick={linkClick} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-beige px-6 font-semibold text-chocolate transition-transform hover:-translate-y-0.5">
              Start a conversation <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-beige/70">Explore</p>
            <ul className="space-y-2.5">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`/#${n.id}`} onClick={linkClick} className={linkClass}>
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={CV.href} download={CV.filename} className={`${linkClass} inline-flex items-center gap-2`}>
                  Download CV <Download className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-beige/70">Elsewhere</p>
            <ul className="space-y-2.5">
              {SOCIALS.map((s) => (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={`${linkClass} group inline-flex items-center gap-3`}>
                    <SocialIcon id={s.id} className="h-5 w-5" />
                    <span>{s.label}</span>
                    <span className="sr-only">(opens in a new tab)</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
            <a href={`mailto:${SITE.email}`} className="mt-5 inline-block font-mono text-sm text-beige/75 underline decoration-beige/30 underline-offset-4 hover:text-beige">
              {SITE.email}
            </a>
          </div>
        </div>

        <p aria-hidden data-text="BUiKE." className="mt-16 select-none overflow-hidden whitespace-nowrap text-center font-display text-[clamp(4.5rem,23vw,17rem)] font-bold leading-[0.8] tracking-[-0.05em] text-beige/[0.07] before:content-[attr(data-text)]" />

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-beige/15 pt-6 text-sm text-beige/70 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Buike Web Developer. All rights reserved.</p>
          <p className="font-mono text-xs">Designed and built by {SITE.name} · {SITE.location.split(',').slice(-1)[0].trim()}</p>
          <a href="/#top" onClick={linkClick} className="font-mono text-xs uppercase tracking-[0.18em] text-beige/80 hover:text-beige">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
