import React, { useRef, useEffect, useState } from 'react';
import { ShoppingBag, Calendar, Sparkles, Building2, Car, Compass, Bot, MapPin, Terminal, Code2, ArrowUpRight, CheckCircle2, Camera } from 'lucide-react';
import { useProfilePhoto } from '../context/ProfilePhotoContext';

export function About() {
  const { photoUrl, uploadPhoto } = useProfilePhoto();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret owner shortcut: Shift + P to select raw original camera file
      if (e.shiftKey && e.key.toLowerCase() === 'p') {
        fileInputRef.current?.click();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOwnerPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadPhoto(file);
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 4000);
    }
  };

  const domains = [
    {
      icon: ShoppingBag,
      title: 'E-Commerce',
      description: 'Modern luxury streetwear e-commerce experiences with curated lookbooks and seamless shopping flows.',
      example: 'BUIKÉ Clothing Store',
    },
    {
      icon: Bot,
      title: 'AI Assistants & Tools',
      description: 'Intelligent conversational workspaces, AI assistant chatbots, and smart automated productivity tools.',
      example: 'ChatBI AI Assistant',
    },
    {
      icon: Calendar,
      title: 'Event Platforms',
      description: 'Discovery platforms connecting users with concerts, tech summits, nightlife, and memorable events.',
      example: 'Eventera',
    },
    {
      icon: Sparkles,
      title: 'Luxury Event Websites',
      description: 'High-end digital experiences designed for bespoke wedding planning and grand production services.',
      example: 'Amara Events & Aurelia Events',
    },
    {
      icon: Building2,
      title: 'Business-Style Interfaces',
      description: 'High-converting, service-oriented interfaces engineered for clean brand presentation and trust.',
      example: 'Corporate & Client Portals',
    },
    {
      icon: Car,
      title: 'Automotive Websites',
      description: 'High-octane showroom landing pages highlighting performance metrics and exotic vehicle specs.',
      example: 'Luxury Cars Dealership',
    },
  ];

  return (
    <section id="about" className="py-32 sm:py-36 lg:py-40 relative border-t border-white/10 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Editorial Developer Profile Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-28 sm:mb-36">
          
          {/* Left Column: Biography & Technical Profile */}
          <div data-reveal="fade-right" className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold font-mono">
                  Developer Profile
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase leading-none">
                Building. Learning. Improving<span className="text-white/30">.</span>
              </h2>

              <p className="text-2xl sm:text-3xl font-serif italic text-white/80 font-light leading-snug">
                "I don't just study technology. I build with it."
              </p>
            </div>

            <div className="space-y-5 text-sm sm:text-base text-white/70 font-sans leading-relaxed">
              <p>
                I'm <strong className="text-white">Buike</strong>, a web developer and AI builder based in Owerri, Imo State, Nigeria. Rather than building passive toy demos, I dedicate my focus to shipping real, live-deployed websites that solve actual business problems, captivate users, and withstand real-world use.
              </p>
              <p>
                My work bridges clean aesthetic design with robust web engineering: from multi-page luxury e-commerce platforms and automated event ecosystems, to intelligent conversational AI workspaces. I'm constantly testing cutting-edge tech, integrating modern AI models, and optimizing client-side performance.
              </p>
            </div>

            {/* Quick Developer Passport Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 font-mono">
              <div data-reveal className="p-4 border border-white/10 bg-[#050505] space-y-1">
                <div className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5 text-white/60" />
                  <span>Base Location</span>
                </div>
                <div className="text-sm font-bold text-white">Owerri, Imo State</div>
                <div className="text-[10px] text-white/40">Nigeria // Global Remote</div>
              </div>

              <div data-reveal className="p-4 border border-white/10 bg-[#050505] space-y-1 reveal-delay-100">
                <div className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase tracking-widest">
                  <Terminal className="w-3.5 h-3.5 text-white/60" />
                  <span>Discipline</span>
                </div>
                <div className="text-sm font-bold text-white">Full-Stack</div>
                <div className="text-[10px] text-white/40">Web &amp; AI Builder</div>
              </div>

              <div data-reveal className="p-4 border border-white/10 bg-[#050505] space-y-1 col-span-2 sm:col-span-1 reveal-delay-200">
                <div className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase tracking-widest">
                  <Code2 className="w-3.5 h-3.5 text-white/60" />
                  <span>Track Record</span>
                </div>
                <div className="text-sm font-bold text-white">6 Live Sites</div>
                <div className="text-[10px] text-white/40">Deployed &amp; Verified</div>
              </div>
            </div>

            <div data-reveal className="pt-2 flex items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:invert transition-all active:scale-95"
              >
                <span>Explore 6 Live Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all active:scale-95"
              >
                <span>Contact Buike</span>
              </a>
            </div>
          </div>

          {/* Right Column: Editorial Developer Portrait Card */}
          <div data-reveal="fade-left" className="lg:col-span-5 w-full">
            <div className="relative p-3 bg-[#060606] border border-white/15 shadow-2xl group">
              
              {/* Corner Architectural Crosshairs */}
              <span className="absolute top-1 left-1 text-[10px] font-mono text-white/30 select-none">+</span>
              <span className="absolute top-1 right-1 text-[10px] font-mono text-white/30 select-none">+</span>
              <span className="absolute bottom-1 left-1 text-[10px] font-mono text-white/30 select-none">+</span>
              <span className="absolute bottom-1 right-1 text-[10px] font-mono text-white/30 select-none">+</span>

              {/* Hidden Owner Photo Input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleOwnerPhotoChange}
                className="hidden"
                aria-hidden="true"
              />

              {/* Photo Card Frame */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative overflow-hidden bg-neutral-950 aspect-[4/5] border border-white/10 cursor-pointer group/frame"
                title="Click to update with your exact original camera photo"
              >
                <img
                  src={photoUrl || "/images/buike-portfolio-profile.jpg"}
                  alt="Buike - Web Developer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top sm:object-center transition-transform duration-500 group-hover/frame:scale-[1.02]"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.tried) {
                      target.dataset.tried = '1';
                      target.src = '/buike-portfolio-profile.jpg';
                    } else if (target.dataset.tried === '1') {
                      target.dataset.tried = '2';
                      target.src = '/images/buike-profile.jpg';
                    } else {
                      target.style.display = 'none';
                      const fallback = target.parentElement?.querySelector('.avatar-placeholder');
                      if (fallback) (fallback as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div className="avatar-placeholder hidden w-full h-full flex-col items-center justify-center p-6 bg-neutral-900 text-center space-y-4">
                  <div className="w-20 h-20 rounded-full border border-white/20 bg-neutral-800 flex items-center justify-center shadow-inner">
                    <span className="font-display font-black text-3xl text-white tracking-wider">B</span>
                  </div>
                  <div className="space-y-1 max-w-[200px]">
                    <span className="text-xs font-mono font-bold tracking-wider text-white uppercase block">
                      Buike &bull; Developer
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 block uppercase tracking-wider">
                      buike-portfolio-profile.jpg
                    </span>
                  </div>
                </div>

                {/* Saved Notification Banner */}
                {savedNotice && (
                  <div className="absolute top-12 left-3 right-3 bg-emerald-500 text-black font-mono text-[10px] font-bold py-2 px-3 rounded-sm flex items-center justify-center gap-2 z-30 shadow-2xl animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Profile Photo Updated &amp; Saved Permanently!</span>
                  </div>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/frame:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white z-20 pointer-events-none p-4 text-center backdrop-blur-[2px]">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">
                    Click to update photo
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    buike-portfolio-profile.jpg &bull; Zero distortions
                  </span>
                </div>

                {/* Top Overlay Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-white/80 pointer-events-auto">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-black/75 backdrop-blur-md border border-white/15 rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>ONLINE // READY TO CODE</span>
                  </div>
                  <div className="px-2 py-1 bg-black/75 backdrop-blur-md border border-white/15 text-[8px] font-mono tracking-widest text-white/60">
                    OWERRI, IMO
                  </div>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/85 backdrop-blur-md border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-display font-black text-white uppercase tracking-wider">
                      BUIKE
                    </span>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      title="Set your exact original photo (Owner shortcut: Shift+P)"
                      className="text-[9px] font-mono text-white/50 hover:text-white uppercase tracking-widest cursor-pointer transition-colors"
                    >
                      ID // DEV-01
                    </button>
                  </div>
                  <div className="text-[10px] font-mono text-white/70 tracking-wider uppercase flex items-center justify-between pt-0.5">
                    <span>Web Developer &amp; AI Builder</span>
                    <span className="text-emerald-400">Available</span>
                  </div>
                </div>
              </div>

              {/* Developer Footnote */}
              <div className="pt-3 px-1 flex items-center justify-between text-xs font-mono text-white/40 uppercase tracking-wider">
                <span>Frontend &amp; Full-Stack Specialist</span>
                <span className="text-white/60 font-semibold">Owerri, Nigeria</span>
              </div>

              {/* Direct selection button for the owner */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full mt-3 py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-emerald-400/50 text-xs font-mono uppercase tracking-widest text-white transition-all flex items-center justify-center gap-2 cursor-pointer rounded-sm group/btn"
              >
                <Camera className="w-4 h-4 text-emerald-400 group-hover/btn:scale-110 transition-transform" />
                <span>Select &amp; Apply profile (2).jpeg</span>
              </button>

            </div>
          </div>

        </div>

        {/* Real Domain Experience Grid */}
        <div className="space-y-10 pt-16 sm:pt-20 border-t border-white/10">
          <div data-reveal className="flex items-center justify-between pb-4 border-b border-white/10">
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold font-mono">
              Proven Project Domains
            </span>
            <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
              6 Production Deployments
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {domains.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  data-reveal
                  className={`p-8 bg-[#050505] border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group space-y-6 reveal-delay-${(idx % 3) * 100 + 100}`}
                >
                  <div className="space-y-4">
                    <div className="w-11 h-11 border border-white/20 bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    <span>Live Example</span>
                    <span className="text-white/80">{item.example}</span>
                  </div>
                </div>
              );
            })}

            {/* Philosophy Card */}
            <div data-reveal className="p-8 bg-white/5 border border-white/20 flex flex-col justify-between space-y-6 reveal-delay-200">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-xl text-white tracking-tight">
                  Engineering Philosophy
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-serif italic text-base">
                  "Clean design, responsive layouts, and zero simulated fluff. Every project deployed is accessible to real users."
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50 uppercase tracking-widest">
                <span>Approach</span>
                <span className="text-white font-bold">Real Deployments First</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

