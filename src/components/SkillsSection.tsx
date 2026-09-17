import { Code, Server, Database, Wrench, Bot, Check } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export function SkillsSection() {
  const categoryIcons = [Code, Server, Database, Wrench, Bot];

  return (
    <section id="skills" className="py-28 relative border-t border-white/10 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-6">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold font-mono">
              Capabilities
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase leading-none">
            Technical Stack &amp; Skills<span className="text-white/30">.</span>
          </h2>

          <p className="text-2xl sm:text-3xl font-serif italic text-white/80 font-light leading-snug">
            "Tools chosen for speed, reliability, and precision."
          </p>

          <p className="text-sm sm:text-base text-white/60 font-sans leading-relaxed">
            A comprehensive overview of the modern toolset and programming languages I use to construct responsive, scalable, and intelligent web applications.
          </p>
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = categoryIcons[idx % categoryIcons.length];
            return (
              <div
                key={cat.title}
                className="p-8 bg-[#050505] border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 border border-white/20 bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">
                        {cat.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-white/30">
                      0{idx + 1}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center justify-between px-3 py-2 bg-white/5 border border-white/5"
                      >
                        <span className="text-xs font-mono text-white/90">
                          {skill.name}
                        </span>
                        <Check className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  Verified in 6 Live Deployments
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

