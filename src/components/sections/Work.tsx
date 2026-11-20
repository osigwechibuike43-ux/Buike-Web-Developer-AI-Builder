import { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '@/data/projects';
import { PROJECT_FILTERS, type Project, type ProjectFilter } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectVisual } from '@/components/ui/ProjectVisual';
import { ProjectMark } from '@/components/ui/ProjectMark';
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

function GithubGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden focusable="false">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function ProjectLinks({ project, compact = false }: { project: Project; compact?: boolean }) {
  const size = compact ? '!min-h-11 !px-5 !text-sm' : '';
  const primaryUrl = project.liveUrl ?? project.repoUrl;
  return (
    <>
      {primaryUrl && (
        <a href={primaryUrl} target="_blank" rel="noopener noreferrer" className={cn('btn btn-primary', size)}>
          {project.liveUrl ? (compact ? 'Live site' : 'Visit live site') : compact ? 'GitHub' : 'View on GitHub'} <ArrowUpRight className="h-4 w-4" />
          <span className="sr-only">({project.name}, opens in a new tab)</span>
        </a>
      )}
      {project.liveUrl && project.repoUrl && (
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={cn('btn btn-ghost', size)}>
          <GithubGlyph /> GitHub
          <span className="sr-only">({project.name} source code, opens in a new tab)</span>
        </a>
      )}
    </>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const accent = project.palette.accent === '#FFFFFF' ? project.palette.fg : project.palette.accent;
  return (
    <article
      style={{ '--pc': accent } as React.CSSProperties}
      className="card group relative flex h-full flex-col overflow-hidden p-2 sm:p-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--pc)] hover:shadow-[0_22px_44px_-26px_var(--pc)]"
    >
      <button type="button" onClick={() => onOpen(project)} aria-label={`Open details for ${project.name}`} className="hidden w-full overflow-hidden rounded-xl text-left sm:block">
        <ProjectVisual project={project} compact className="transition-transform duration-500 group-hover:scale-[1.02]" />
      </button>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-2 sm:px-2.5 sm:pb-2.5 sm:pt-4">
        <div className="flex items-center gap-3">
          <ProjectMark project={project} className="h-10 w-10 sm:h-11 sm:w-11" />
          <div className="min-w-0">
            <h3 className="h-display truncate text-lg leading-tight sm:text-xl">{project.name}</h3>
            <p className="truncate font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-3">{project.category}</p>
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-pretty text-sm text-ink-2 sm:mt-3">{project.description}</p>

        <ul className="mt-2.5 flex flex-wrap gap-1.5 sm:mt-3" aria-label={`${project.name} technologies`}>
          {project.stack.slice(0, 3).map((s) => (
            <li key={s} className="chip !px-2.5 !py-0.5 !text-[0.68rem]">{s}</li>
          ))}
          {project.stack.length > 3 && <li className="chip !px-2.5 !py-0.5 !text-[0.68rem]">+{project.stack.length - 3}</li>}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-3 sm:pt-4">
          <ProjectLinks project={project} compact />
          <button type="button" onClick={() => onOpen(project)} className="btn btn-ghost !min-h-11 !px-4 !text-sm">
            Details
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
                  <ProjectMark project={project} className="h-12 w-12" />
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

                <div className="mt-8 flex flex-wrap gap-3">
                  <ProjectLinks project={project} />
                </div>
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
  const [filter, setFilter] = useState<ProjectFilter | 'all'>('all');
  const list = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.filters.includes(filter));

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-20 py-14 sm:py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          id="work-title"
          index="01"
          label="Featured projects"
          title={
            <>
              Live projects, <span className="accent-serif text-accent-text">built end to end.</span>
            </>
          }
          intro="Every project below links to a live site or its source code. They are all personal or concept builds, and each one is labelled so you always know what you are looking at."
        />

        <div role="group" aria-label="Filter projects" className="mb-6 flex flex-wrap gap-2 sm:mb-10">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'min-h-10 rounded-full border px-3.5 text-sm font-medium transition-colors sm:min-h-11 sm:px-4',
                filter === f.id ? 'border-ink bg-ink text-bg' : 'border-line-strong text-ink-2 hover:border-ink hover:text-ink',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p role="status" className="sr-only">
          Showing {list.length} {list.length === 1 ? 'project' : 'projects'}
        </p>

        <ul key={filter} className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 3) * 0.06} className="h-full">
              <ProjectCard project={p} onOpen={setSelected} />
            </Reveal>
          ))}
        </ul>

        <p className="mt-6 max-w-2xl text-sm text-ink-3 sm:mt-10">
          Project descriptions summarise what each build is designed to do. Client work will appear here with its own “Client work” label when it is added.
        </p>
      </div>
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
