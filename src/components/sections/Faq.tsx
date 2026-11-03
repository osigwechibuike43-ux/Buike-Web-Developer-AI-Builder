import { FAQ } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Plus } from '@/components/ui/Icons';

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 border-t border-line bg-bg-2/60 py-24 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="faq-title"
            index="07"
            label="Good questions"
            title={
              <>
                A few things <span className="accent-serif text-accent-text">you might ask.</span>
              </>
            }
          />
        </div>
        <div className="lg:col-span-7">
          {FAQ.map((f) => (
            <details key={f.q} className="faq group border-b border-line first:border-t">
              <summary className="flex min-h-[4rem] cursor-pointer items-center justify-between gap-6 py-5 text-left">
                <span className="h-display text-xl sm:text-2xl">{f.q}</span>
                <Plus className="faq-plus h-6 w-6 shrink-0 text-accent-text transition-transform duration-300" />
              </summary>
              <p className="max-w-2xl pb-6 text-pretty text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
