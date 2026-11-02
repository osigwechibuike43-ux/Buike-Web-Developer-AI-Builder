import type { ReactNode } from 'react';
import { m, useReducedMotion } from 'motion/react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li';
}

/** Fades and lifts content into view once. Respects reduced-motion. */
export function Reveal({ children, delay = 0, y = 22, className, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = as === 'li' ? m.li : m.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
