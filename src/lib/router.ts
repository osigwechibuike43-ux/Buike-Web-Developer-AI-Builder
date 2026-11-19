import { useEffect, useState } from 'react';

const EVENT = 'buike:navigate';

const currentPath = () => window.location.pathname.replace(/\/+$/, '') || '/';

export function usePathname(): string {
  const [path, setPath] = useState(currentPath);
  useEffect(() => {
    const sync = () => setPath(currentPath());
    window.addEventListener('popstate', sync);
    window.addEventListener(EVENT, sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener(EVENT, sync);
    };
  }, []);
  return path;
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Client-side navigation for internal links (supports "/path" and "/#section"). */
export function navigate(to: string) {
  const url = new URL(to, window.location.origin);
  const samePath = url.pathname.replace(/\/+$/, '') === currentPath().replace(/\/+$/, '') || (url.pathname === '/' && currentPath() === '/');
  if (!samePath) {
    window.history.pushState(null, '', url.pathname + url.hash);
    window.dispatchEvent(new Event(EVENT));
  } else if (url.hash) {
    window.history.pushState(null, '', url.pathname + url.hash);
  }
  const scroll = () => {
    const target = url.hash ? document.getElementById(url.hash.slice(1)) : null;
    if (target) target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'auto' });
  };
  // Wait for the new route to render before scrolling.
  window.setTimeout(scroll, samePath ? 0 : 60);
}

/** onClick handler for <a href="/..."> that keeps modified clicks (new tab etc.) native. */
export function linkClick(e: React.MouseEvent<HTMLAnchorElement>, after?: () => void) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const href = e.currentTarget.getAttribute('href');
  if (!href || !href.startsWith('/') || e.currentTarget.target === '_blank' || e.currentTarget.hasAttribute('download')) return;
  e.preventDefault();
  navigate(href);
  after?.();
}
