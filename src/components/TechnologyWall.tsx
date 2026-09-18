import { TECH_WALL } from '../data/portfolioData';

export function TechnologyWall() {
  return (
    <section className="py-28 sm:py-32 lg:py-36 relative border-t border-white/10 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        <div data-reveal className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.3em] font-bold">
              Core Toolkit
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Technology Ecosystem
          </h3>
          <p className="text-sm text-white/60 font-sans">
            Engineered using modern, battle-tested languages, frameworks, and deployment engines.
          </p>
        </div>

        {/* Monochrome Tech Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
          {TECH_WALL.map((tech, idx) => (
            <div
              key={idx}
              data-reveal="scale"
              className={`p-5 bg-[#050505] border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col items-center justify-center text-center space-y-3 group cursor-default reveal-delay-${(idx % 5) * 100 + 100}`}
            >
              <div className="w-10 h-10 border border-white/20 bg-white/5 flex items-center justify-center font-mono font-bold text-xs text-white group-hover:bg-white group-hover:text-black transition-all">
                {tech.symbol}
              </div>
              <div>
                <span className="text-xs sm:text-sm font-mono font-bold text-white block uppercase tracking-tight">
                  {tech.name}
                </span>
                <span className="text-[10px] font-mono text-white/40 block uppercase tracking-widest pt-0.5">
                  {tech.category}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

