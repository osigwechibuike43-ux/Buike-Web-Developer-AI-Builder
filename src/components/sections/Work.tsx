import { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '@/data/projects';
import type { Project } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectVisual } from '@/components/ui/ProjectVisual';
import { ArrowUpRight, Close } from '@/components/ui/Icons';
import { cn } from '@/lib/cn';

function KindBadge({ kind }: { kind: Project['kind'] }) {
  const personal = kind === 'personal';
  return (
    <span className={cn('chip', personal ? '' : 'border-accent-text text-accent-text')}>
      <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', personal ? 'bg-ink-3' : 'bg-accent')} />
      {personal ? 'Personal project' : 'Client work'}
    </span>
  );
}

function ProjectCard({ project, onOpen, large = false }: { project: Project; onOpen: (p: Project) => void; large?: boolean }) {
  return (
    <article className={cn('card group flex h-full flex-col overflow-hidden p-3 transition-shadow hover:shadow-[0_24px_50px_-28px_rgb(20_18_15/0.5)]', large && 'lg:grid lg:grid-cols-12 lg:gap-8 lg:p-5')}>
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open details for ${project.name}`}
        className={cn('block w-full overflow-hidden rounded-xl text-left transition-transform duration-500 group-hover:[&>div]:scale-[1.015]', large && 'lg:col-span-7')}
      >
        <ProjectVisual project={project} className="transition-transform duration-500" />
      </button>

      <div className={cn('flex flex-1 flex-col px-3 pb-3 pt-5', large && 'lg:col-span-5 lg:justify-center lg:px-2 lg:py-4')}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="font-mono text-xs text-ink-3">{project.number}</span>
          <KindBadge kind={project.kind} />
        </div>
        <p className="eyebrow">{project.category}</p>
        <h3 className={cn('h-display mt-2', large ? 'text-5xl' : 'text-3xl')}>{project.name}</h3>
        <p className="accent-serif mt-1 text-2xl text-ink-2">{project.tagline}</p>
        <p className={cn('mt-4 text-pretty text-ink-2', !large && 'line-clamp-3')}>{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${project.name} technologies`}>
          {project.stack.slice(0, large ? 7 : 4).map((s) => (
            <li key={s} className="chip">{s}</li>
          ))}
          {!large && project.stack.length > 4 && <li className="chip">+{project.stack.length - 4}</li>}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary !min-h-11 !px-5 !text-sm">
            Visit live site <ArrowUpRight className="h-4 w-4" />
            <span className="sr-only">({project.name}, opens in a new tab)</span>
          </a>
          <button type="button" onClick={() => onOpen(project)} className="btn btn-ghost !min-h-11 !px-5 !text-sm">
            Project details
          </button>
        </div>
      </div>
    </article>
  );
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (project && !dlg.open) {
      dlg.showModal();
      document.body.style.overflow = 'hidden';
    }
    if (!project && dlg.open) dlg.close();
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onClose={() => {
        document.body.style.overflow = '';
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
    >
      <div className="flex h-full items-center justify-center p-3 sm:p-8" onClick={(e) => e.target === e.currentTarget && ref.current?.close()}>
        {project && (
          <div className="relative max-h-full w-full max-w-5xl overflow-y-auto rounded-3xl border border-line-strong bg-bg p-4 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close project details"
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-bg hover:bg-ink hover:text-bg sm:right-6 sm:top-6"
            >
              <Close className="h-5 w-5" />
            </button>
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <ProjectVisual project={project} />
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {project.stack.map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-6 lg:pr-10">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-xs text-ink-3">{project.number}</span>
                  <KindBadge kind={project.kind} />
                </div>
                <p className="eyebrow">{project.category}</p>
                <h3 id="project-dialog-title" className="h-display mt-2 text-5xl">{project.name}</h3>
                <p className="accent-serif mt-1 text-3xl text-ink-2">{project.tagline}</p>
                <p className="mt-5 text-pretty text-ink-2">{project.description}</p>

                <h4 className="eyebrow mb-3 mt-8">What I focused on</h4>
                <p className="text-pretty">{project.focus}</p>

                <h4 className="eyebrow mb-3 mt-8">Highlights</h4>
                <ul className="space-y-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8">
                  Visit live site <ArrowUpRight className="h-4 w-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}

export function Work() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [featured, ...rest] = PROJECTS;

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="work-title"
          index="01"
          label="Selected work"
          title={
            <>
              Live projects, <span className="accent-serif text-accent-text">built end to end.</span>
            </>
          }
          intro="Every project below is deployed and clickable. They are all personal or concept builds, and each one is labelled so you always know what you are looking at."
        />

        <Reveal>
          <ProjectCard project={featured} onOpen={setSelected} large />
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08}>
              <ProjectCard project={p} onOpen={setSelected} />
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-sm text-ink-3">
          Project descriptions summarise what each build is designed to do. Client work will appear here with its own “Client work” label when it is added.
        </p>
      </div>
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
