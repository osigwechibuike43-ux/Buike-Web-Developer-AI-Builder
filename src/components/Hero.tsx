import { InteractiveTerminal } from './InteractiveTerminal';
import { useProfilePhoto } from '../context/ProfilePhotoContext';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const { photoUrl } = useProfilePhoto();

  return (
    <section id="home" className="relative min-h-[92vh] pt-36 sm:pt-44 lg:pt-48 pb-24 sm:pb-32 lg:pb-36 flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background technical accents */}
      <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Hero Content */}
          <div data-reveal="fade-right" className="lg:col-span-7 flex flex-col justify-between text-left space-y-8">
            <div>
              {/* Eyebrow status with developer profile photo */}
              <div className="flex items-center space-x-3.5 mb-6">
                <div className="relative flex items-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white/30 shadow-lg bg-neutral-900 flex-shrink-0 flex items-center justify-center text-white">
                    <img
                      src="/images/buike-profile.jpg"
                      alt="Buike - Web Developer"
                      className="w-full h-full object-cover object-center rounded-full"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.avatar-fallback');
                        if (fallback) (fallback as HTMLElement).style.display = 'flex';
                      }}
                    />
                    <div className="avatar-fallback hidden w-full h-full items-center justify-center bg-neutral-900 text-white font-display font-black text-sm">
                      B
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-black" title="Available for projects"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">Buike</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] opacity-60 font-mono">
                    Web Developer &amp; AI Builder
                  </span>
                </div>
              </div>

              {/* Editorial Giant Display Name */}
              <h1 className="text-6xl sm:text-8xl lg:text-[110px] leading-[0.85] font-black tracking-tighter mb-6 text-white uppercase">
                BUIKE<span className="text-white/40">.</span>
              </h1>

              {/* Editorial Statement */}
              <p className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed mb-8 font-sans font-normal">
                I build modern websites, digital experiences, and technology that brings ideas to life.
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
                  className="px-8 py-4 border border-white/20 hover:border-white font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-all text-white active:scale-95 cursor-pointer"
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Editorial micro statistics */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg font-mono">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">6</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 pt-1">Production Sites</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 pt-1">Custom Built</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">AI+Web</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 pt-1">Capabilities</div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual: Developer Terminal */}
          <div data-reveal="fade-left" className="lg:col-span-5 w-full">
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

