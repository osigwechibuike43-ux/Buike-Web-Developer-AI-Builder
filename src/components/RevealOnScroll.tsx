import React, { ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export type RevealAnimationType = 
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'scale-up'
  | 'blur-in';

interface RevealOnScrollProps {
  children: ReactNode;
  animation?: RevealAnimationType;
  delay?: number; // In milliseconds
  duration?: number; // In milliseconds
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export function RevealOnScroll({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 650,
  threshold = 0.12,
  className = '',
  style: customStyle,
  ...props
}: RevealOnScrollProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold });

  const getInitialTransform = () => {
    switch (animation) {
      case 'fade-up':
        return 'translate3d(0, 32px, 0)';
      case 'fade-down':
        return 'translate3d(0, -32px, 0)';
      case 'fade-left':
        return 'translate3d(-32px, 0, 0)';
      case 'fade-right':
        return 'translate3d(32px, 0, 0)';
      case 'scale-up':
        return 'scale(0.94)';
      case 'blur-in':
        return 'translate3d(0, 16px, 0)';
      default:
        return 'translate3d(0, 24px, 0)';
    }
  };

  const computedStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
    filter: !isVisible && animation === 'blur-in' ? 'blur(8px)' : 'none',
    transitionProperty: 'opacity, transform, filter',
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', // Apple/editorial fluid ease-out
    willChange: isVisible ? 'auto' : 'opacity, transform',
    ...customStyle,
  };

  return (
    <div ref={ref} style={computedStyle} className={`reveal-item ${className}`} {...props}>
      {children}
    </div>
  );
}
