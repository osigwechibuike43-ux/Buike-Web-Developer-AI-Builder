import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/projectsData';
import { ProjectMockup } from './ProjectMockup';

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
}

export function FeaturedProjects({ onSelectProject }: FeaturedProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'AI & Intelligence', 'E-Commerce / Fashion', 'Event Platforms & Luxury', 'Automotive'];

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'AI & Intelligence') return p.category.includes('AI') || p.category.includes('Intelligence') || p.id === 'chatbi';
    if (activeFilter === 'E-Commerce / Fashion') return p.category.includes('E-Commerce') || p.category.includes('Fashion');
    if (activeFilter === 'Event Platforms & Luxury') return p.category.includes('Event') || p.category.includes('Weddings');
    if (activeFilter === 'Automotive') return p.category.includes('Automotive');
    return true;
  });

  return (
    <section id="projects" className="py-28 relative border-t border-white/10 bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <h2 className="text-[10px] uppercase tracking-[0.5em] opacity-40 font-bold font-mono">
                Selected Work
              </h2>
            </div>
            <p className="text-3xl sm:text-5xl lg:text-6xl font-serif italic font-light tracking-tight text-white">
              Real world deployments.
            </p>
            <p className="text-xs sm:text-sm font-mono text-white/50 uppercase tracking-widest">
              6 live production websites built with modern web architecture
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-mono transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-white text-black font-bold'
                    : 'border border-white/15 text-white/50 hover:text-white hover:border-white/30 bg-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Alternating Editorial Projects Layout */}
        <div className="space-y-28 sm:space-y-36">
          {filteredProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                {/* Visual Preview Side */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <ProjectMockup
                    project={project}
                    onOpenCaseStudy={() => onSelectProject(project)}
                  />
                </div>

                {/* Information / Description Side */}
                <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  {/* Number & Category */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="font-mono text-3xl font-black text-white/40">
                      {project.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 px-3 py-1 border border-white/10 bg-white/5">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Headline */}
                  <div className="space-y-2">
                    {project.isFeatured && (
                      <span className="text-[10px] bg-white text-black px-2.5 py-0.5 font-bold uppercase tracking-widest inline-block w-fit">
                        Featured
                      </span>
                    )}
                    <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
                      {project.name}
                    </h3>
                    {project.headline && (
                      <p className="text-sm font-serif italic text-white/70">
                        "{project.headline}"
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono uppercase text-white/40 tracking-[0.2em] block font-bold">
                      Key Highlights:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.highlights.slice(0, 4).map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-white/80 font-sans">
                          <span className="w-1 h-1 bg-white shrink-0"></span>
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/70 font-mono text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-white text-black font-bold uppercase text-xs tracking-widest hover:invert transition-all flex items-center gap-2 active:scale-95 shadow-md"
                    >
                      <span>{project.buttonText} &rarr;</span>
                    </a>

                    <button
                      onClick={() => onSelectProject(project)}
                      className="px-6 py-3.5 border border-white/20 font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-all text-white flex items-center gap-2 cursor-pointer"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
