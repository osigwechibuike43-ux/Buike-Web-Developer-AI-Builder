import { useState } from 'react';
import { X, ExternalLink, ArrowUpRight, Check } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'case-study' | 'live-demo'>('case-study');
  const [iframeLoaded, setIframeLoaded] = useState(false);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-black border border-white/20 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#0a0a0a] border-b border-white/10 sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono px-2.5 py-1 bg-white text-black font-bold">
              {project.number}
            </span>
            <div>
              <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-tight">
                {project.name}
              </h3>
              <p className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                {project.category}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Tab switcher */}
            <div className="hidden sm:flex items-center bg-black border border-white/15 p-0.5">
              <button
                onClick={() => setActiveTab('case-study')}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeTab === 'case-study' ? 'bg-white text-black font-bold' : 'text-white/40 hover:text-white'
                }`}
              >
                Case Study
              </button>
              <button
                onClick={() => setActiveTab('live-demo')}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeTab === 'live-demo' ? 'bg-white text-black font-bold' : 'text-white/40 hover:text-white'
                }`}
              >
                Live Frame
              </button>
            </div>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-colors"
            >
              <span>Visit</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-white/50 hover:text-white border border-white/10 hover:border-white/30 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-8 bg-black">
          
          {/* Tab 1: Case Study */}
          {activeTab === 'case-study' && (
            <div className="space-y-8">
              
              {/* Project Title Banner */}
              <div className="p-8 bg-[#050505] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] font-bold">
                    {project.headline || project.category}
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-serif italic text-white/90 font-light">
                    {project.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/70 font-sans max-w-xl leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:invert transition-all self-start sm:self-center shrink-0 flex items-center gap-2"
                >
                  <span>{project.buttonText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Grid: Overview & Objective */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#050505] border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest font-bold">
                    <span>01. Overview</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                    {project.caseStudy.overview}
                  </p>
                </div>

                <div className="p-6 bg-[#050505] border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest font-bold">
                    <span>02. Objective</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                    {project.caseStudy.objective}
                  </p>
                </div>
              </div>

              {/* Grid: Design & Development */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#050505] border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest font-bold">
                    <span>03. Design Direction</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                    {project.caseStudy.design}
                  </p>
                </div>

                <div className="p-6 bg-[#050505] border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest font-bold">
                    <span>04. Development Approach</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                    {project.caseStudy.development}
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div className="p-6 bg-[#050505] border border-white/10 space-y-4">
                <div className="text-xs font-mono text-white/50 uppercase tracking-widest font-bold">
                  Key Visible &amp; Tested Features
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.caseStudy.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-white/80 font-sans">
                      <Check className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block font-bold">
                  Technologies Used in This Project
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-white/5 border border-white/15 text-white font-mono text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live URL footer note */}
              <div className="p-4 bg-[#0a0a0a] border border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                <span>Verified Deployment: <strong className="text-white">{project.liveUrl}</strong></span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline flex items-center gap-1 font-semibold uppercase tracking-wider"
                >
                  Open in New Tab <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

            </div>
          )}

          {/* Tab 2: Live Demo Frame */}
          {activeTab === 'live-demo' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-white/50">
                <span>Loading live site embed: {project.liveUrl}</span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline flex items-center gap-1 uppercase tracking-wider font-bold"
                >
                  Launch full screen <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="w-full h-[550px] border border-white/10 bg-[#070707] overflow-hidden relative">
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white/50 text-xs font-mono space-y-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent animate-spin"></div>
                    <span>Connecting to {project.name} live deployment...</span>
                  </div>
                )}
                <iframe
                  src={project.liveUrl}
                  title={project.name}
                  onLoad={() => setIframeLoaded(true)}
                  className="w-full h-full border-0 bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

