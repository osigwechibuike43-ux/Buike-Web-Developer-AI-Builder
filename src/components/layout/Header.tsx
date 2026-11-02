import { useCallback, useEffect, useRef, useState } from 'react';
import { m, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { NAV, SITE } from '@/data/site';
import { useActiveSection } from '@/hooks/useActiveSection';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from './ThemeToggle';
import { ArrowUpRight, Close, Menu } from '@/components/ui/Icons';
import { cn } from '@/lib/cn';

const SECTION_IDS = NAV.map((n) => n.id);

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Scroll lock, Escape to close, and a simple focus trap while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = [toggleRef.current, ...focusables()].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open, close]);

  return (
    <>
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || open ? 'border-b border-line bg-bg/85 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-4">
        <a href="#top" aria-label="Buike, web developer. Back to top" className="rounded-lg">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
              className={cn(
                'relative rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors',
                active === item.id ? 'text-ink' : 'text-ink-2 hover:text-ink',
              )}
            >
              {item.label}
              {active === item.id && <span aria-hidden className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded bg-accent" />}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="#contact" className="btn btn-primary hidden !min-h-11 !px-5 sm:inline-flex">
            Let’s talk <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => (open ? close() : setOpen(true))}
          >
            {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {!reduce && (
        <m.div aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent" style={{ scaleX: progress }} />
      )}

    </header>
      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-bg lg:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex min-h-full flex-col justify-between pb-10 pt-6">
          <ul className="divide-y divide-line">
            {NAV.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? 'true' : undefined}
                  className="flex items-baseline justify-between py-5"
                >
                  <span className="h-display text-4xl">{item.label}</span>
                  <span className="font-mono text-xs text-ink-3">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 space-y-4">
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
              Start a project <ArrowUpRight className="h-4 w-4" />
            </a>
            <p className="eyebrow text-center">{SITE.location}</p>
          </div>
        </nav>
      </div>
    </>
  );
}
