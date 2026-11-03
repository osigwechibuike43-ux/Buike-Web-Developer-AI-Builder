import { BRAND_ICONS } from '@/data/brandIcons';
import { cn } from '@/lib/cn';

interface Props {
  icon?: string;
  /** Name used for the monogram fallback. */
  name: string;
  className?: string;
  /** Force the single-colour mark to use currentColor instead of its brand colour. */
  mono?: boolean;
}

/** Renders an official brand mark. Falls back to a monogram only where no official logo is available. */
export function BrandLogo({ icon, name, className, mono }: Props) {
  const data = icon ? BRAND_ICONS[icon] : undefined;
  if (!data) {
    return (
      <span aria-hidden className={cn('inline-flex items-center justify-center rounded-md border border-current font-display font-bold', className)} style={{ fontSize: '0.7em' }}>
        <span className="text-ink">{name.slice(0, 2)}</span>
      </span>
    );
  }
  return (
    <svg
      viewBox={data.viewBox}
      className={className}
      aria-hidden
      focusable="false"
      fill={data.color && !mono ? data.color : data.color ? 'currentColor' : undefined}
      dangerouslySetInnerHTML={{ __html: data.body }}
    />
  );
}
