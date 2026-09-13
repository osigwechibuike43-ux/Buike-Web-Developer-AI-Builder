import { InteractiveTerminal } from './InteractiveTerminal';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background technical accents */}
      <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-between text-left space-y-8">
            <div>
              {/* Eyebrow status */}
              <div className="flex items-center space-x-2 mb-6">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold font-mono">
                  Web Developer &amp; AI Builder
                </span>
              </div>

              {/* Editorial Giant Display Name */}
              <h1 className="text-6xl sm:text-8xl lg:text-[110px] leading-[0.85] font-black tracking-tighter mb-6 text-white uppercase">
                BUIKE<span className="text-white/20">.</span>
              </h1>

              {/* Editorial Statement */}
              <p className="text-lg sm:text-xl text-white/70 max-w-lg leading-relaxed mb-8 font-sans">
                I build modern websites, digital experiences, and technology that brings ideas to life. Focused on clean, responsive, and AI-powered products.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('projects')}
                  className="px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest hover:invert transition-all active:scale-95 shadow-xl cursor-pointer"
                >
                  View My Work
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-4 border border-white/20 font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-all text-white active:scale-95 cursor-pointer"
                >
                  Collaborate
                </button>
              </div>
            </div>

            {/* Editorial micro statistics */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg font-mono">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">6+</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 pt-1">Live Deployed Sites</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 pt-1">Real Code &amp; UX</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">AI+Web</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 pt-1">Modern Stack</div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual: Developer Terminal */}
          <div className="lg:col-span-5 w-full">
            <div className="relative">
              <InteractiveTerminal />
            </div>
          </div>

        </div>
      </div>

      {/* Subtle bottom scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center opacity-40 text-[9px] font-mono uppercase tracking-[0.4em]">
        <span>Scroll</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-white to-transparent mt-2"></div>
      </div>
    </section>
  );
}

