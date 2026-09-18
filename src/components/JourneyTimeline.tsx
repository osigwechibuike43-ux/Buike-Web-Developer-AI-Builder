import { JOURNEY_STEPS } from '../data/portfolioData';

export function JourneyTimeline() {
  return (
    <section className="py-32 sm:py-36 lg:py-40 relative border-t border-white/10 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div data-reveal className="max-w-3xl mb-20 sm:mb-24 space-y-6">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold font-mono">
              Evolution &amp; Trajectory
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase leading-none">
            Developer Journey<span className="text-white/30">.</span>
          </h2>

          <p className="text-2xl sm:text-3xl font-serif italic text-white/80 font-light leading-snug">
            "From first principles to full-stack production deployments."
          </p>

          <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed">
            A transparent timeline of how I progressed from foundational programming concepts to engineering full-stack production websites and exploring artificial intelligence.
          </p>
        </div>

        {/* Visual Timeline Steps */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-6 space-y-14 sm:space-y-16 pb-6">
          {JOURNEY_STEPS.map((step) => (
            <div key={step.number} data-reveal="fade-left" className="relative pl-8 sm:pl-12 group">
              {/* Timeline marker node */}
              <div className="absolute -left-[17px] top-1 w-8 h-8 bg-black border border-white/20 flex items-center justify-center font-mono text-xs font-bold text-white group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                {step.number}
              </div>

              {/* Step Content Card */}
              <div className="p-8 bg-[#050505] border border-white/10 hover:border-white/30 transition-all space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <h3 className="font-display font-bold text-xl text-white uppercase tracking-tight">
                    {step.title}
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/60 bg-white/5 px-3 py-1 border border-white/10">
                    {step.tagline}
                  </span>
                </div>

                <p className="text-sm text-white/70 font-sans leading-relaxed">
                  {step.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest mr-1 font-bold">
                    Key Focus:
                  </span>
                  {step.techStack.map((item, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/70 font-mono text-[11px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

