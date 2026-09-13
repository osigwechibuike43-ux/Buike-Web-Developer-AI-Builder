import { Code, Briefcase, ShoppingBag, Rocket, Bot, Check, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

interface ServicesSectionProps {
  onContactClick: () => void;
}

export function ServicesSection({ onContactClick }: ServicesSectionProps) {
  const icons = [Code, Briefcase, ShoppingBag, Rocket, Bot];

  return (
    <section id="services" className="py-28 relative border-t border-white/10 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-6">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold font-mono">
              Offerings &amp; Solutions
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase leading-none">
            What I Can Build For You<span className="text-white/30">.</span>
          </h2>

          <p className="text-2xl sm:text-3xl font-serif italic text-white/80 font-light leading-snug">
            "End-to-end engineering tailored to distinct brand identities."
          </p>

          <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed">
            From luxury brand portfolios and multi-category e-commerce stores to custom web applications and AI-enhanced interfaces.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={service.id}
                className="p-8 bg-[#050505] border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="w-10 h-10 border border-white/20 bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-white/40">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white uppercase tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block font-bold">
                      Deliverables:
                    </span>
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-white/80 font-sans">
                        <span className="w-1 h-1 bg-white shrink-0"></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={onContactClick}
                    className="w-full py-3 bg-white/5 border border-white/15 hover:border-white hover:bg-white hover:text-black text-white text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Inquire About {service.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

