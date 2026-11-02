import { SITE } from '@/data/site';

interface Props {
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function Portrait({ className, priority = false, sizes = '(min-width: 1024px) 480px, 90vw' }: Props) {
  return (
    <img
      src={`${SITE.portrait}-1000.webp`}
      srcSet={`${SITE.portrait}-640.webp 640w, ${SITE.portrait}-1000.webp 1000w`}
      sizes={sizes}
      width={1000}
      height={1000}
      alt="Portrait of Buike, a web developer, wearing dark-framed glasses"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
    />
  );
}
