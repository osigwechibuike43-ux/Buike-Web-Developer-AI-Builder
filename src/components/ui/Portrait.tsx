import { SITE } from '@/data/site';

interface Props {
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function Portrait({ className, priority = false, sizes = '(min-width: 1024px) 400px, 90vw' }: Props) {
  return (
    <img
      src={`${SITE.portrait}-720.webp`}
      srcSet={`${SITE.portrait}-480.webp 480w, ${SITE.portrait}-720.webp 720w`}
      sizes={sizes}
      width={720}
      height={900}
      alt="Black-and-white portrait of Buike, a web developer, wearing dark-framed glasses"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
    />
  );
}
