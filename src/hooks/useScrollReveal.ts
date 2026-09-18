import { useEffect, useRef, useState } from 'react';

export interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook providing an IntersectionObserver ref for smooth element animations.
 * When the element intersects the viewport, it applies active classes or triggers state.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Fallback if IntersectionObserver isn't supported
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

/**
 * Higher-level observer utility that automatically finds all elements with
 * `data-reveal` or `.reveal-on-scroll` attributes and transitions them into view
 * as the user scrolls through any page or dynamic section.
 */
export function initGlobalIntersectionObserver(): () => void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    // Graceful fallback for environments without observer support
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('is-revealed');
    });
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.classList.add('is-revealed');
          obs.unobserve(target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  const observeElements = () => {
    const elements = document.querySelectorAll('[data-reveal]:not(.is-revealed)');
    elements.forEach((el) => observer.observe(el));
  };

  observeElements();

  // Also setup a lightweight MutationObserver so dynamic content or filtering
  // automatically triggers observation on new elements
  const mutationObserver = new MutationObserver(() => {
    observeElements();
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => {
    observer.disconnect();
    mutationObserver.disconnect();
  };
}
