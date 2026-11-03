import { Suspense, lazy, useEffect, useRef, useState } from 'react';

// The Three.js bundle is only fetched when the scene will actually be shown.
const HeroScene = lazy(() => import('./HeroScene'));

function canUse3D(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (!window.matchMedia('(min-width: 768px)').matches) return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  if ((nav.hardwareConcurrency ?? 8) < 4 || (nav.deviceMemory ?? 8) < 4) return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Decorative 3D layer behind the portrait. Renders nothing on phones, low-power devices or reduced motion. */
export function Hero3D() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);
  const box = useRef<HTMLDivElement>(null);

  // Wait until the page is idle so the 3D bundle never competes with first paint.
  useEffect(() => {
    if (!canUse3D()) return;
    const start = () => setEnabled(true);
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback && w.cancelIdleCallback) {
      const id = w.requestIdleCallback(start, { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = globalThis.setTimeout(start, 1200);
    return () => globalThis.clearTimeout(t);
  }, []);

  // Pause rendering when scrolled out of view or the tab is hidden.
  useEffect(() => {
    const el = box.current;
    if (!enabled || !el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    const onVis = () => setVisible(!document.hidden && el.getBoundingClientRect().bottom > 0);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [enabled]);

  return (
    <div ref={box} aria-hidden className="pointer-events-none absolute -inset-x-32 -inset-y-16 z-0 hidden md:block">
      {enabled && (
        <Suspense fallback={null}>
          <HeroScene active={visible} />
        </Suspense>
      )}
    </div>
  );
}
