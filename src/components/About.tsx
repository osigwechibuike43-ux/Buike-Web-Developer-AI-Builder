import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { ShoppingBag, Calendar, Sparkles, Building2, Car, Compass, Bot, MapPin, Terminal, Code2, ArrowUpRight, Upload, RotateCcw, Check, Sliders, Image as ImageIcon } from 'lucide-react';
import { useProfilePhoto } from '../context/ProfilePhotoContext';

export function About() {
  const [photoFilter, setPhotoFilter] = useState<'mono' | 'color'>('color');
  const [showVignette, setShowVignette] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { photoUrl, uploadPhoto, resetToDefault, isCustom } = useProfilePhoto();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadPhoto(file);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      await uploadPhoto(file);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
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
    <section id="about" className="py-28 relative border-t border-white/10 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Editorial Developer Profile Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* Left Column: Biography & Technical Profile */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold font-mono">
                  Identity // Developer Profile
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase leading-none">
                Building. Learning. Improving<span className="text-white/30">.</span>
              </h2>

              <p className="text-2xl sm:text-3xl font-serif italic text-white/85 font-light leading-snug">
                "I don't just study technology. I build with it."
              </p>
            </div>

            <div className="space-y-4 text-base text-white/70 font-sans leading-relaxed">
              <p>
                I'm <strong className="text-white font-semibold">Buike</strong>, a web developer and AI builder passionate about turning ideas into functional, production-ready digital products. Rather than building endless toy demos, I dedicate my focus to shipping real, live-deployed websites that solve problems, captivate users, and withstand real-world use.
              </p>
              <p>
                My work bridges clean aesthetic design with robust web engineering: from multi-page luxury e-commerce platforms and automated event ecosystems, to intelligent conversational AI workspaces. I'm constantly testing cutting-edge tech, integrating modern AI models, and optimizing client-side performance.
              </p>
            </div>

            {/* Quick Developer Passport Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 font-mono">
              <div className="p-4 border border-white/10 bg-[#050505] space-y-1">
                <div className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase tracking-widest">
                  <MapPin className="w-3 h-3" />
                  <span>Base</span>
                </div>
                <div className="text-sm font-bold text-white">Owerri, Imo State</div>
                <div className="text-[10px] text-white/50">Nigeria // Global Remote</div>
              </div>

              <div className="p-4 border border-white/10 bg-[#050505] space-y-1">
                <div className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase tracking-widest">
                  <Terminal className="w-3 h-3" />
                  <span>Discipline</span>
                </div>
                <div className="text-sm font-bold text-white">Full-Stack</div>
                <div className="text-[10px] text-white/50">Web & AI Builder</div>
              </div>

              <div className="p-4 border border-white/10 bg-[#050505] space-y-1 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase tracking-widest">
                  <Code2 className="w-3 h-3" />
                  <span>Track Record</span>
                </div>
                <div className="text-sm font-bold text-white">6+ Deployed</div>
                <div className="text-[10px] text-white/50">100% Live Sites</div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
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
          <div className="lg:col-span-5 w-full">
            <div className="relative p-3 bg-[#060606] border border-white/15 shadow-2xl group">
              
              {/* Corner Architectural Crosshairs */}
              <span className="absolute top-1 left-1 text-[10px] font-mono text-white/30 select-none">+</span>
              <span className="absolute top-1 right-1 text-[10px] font-mono text-white/30 select-none">+</span>
              <span className="absolute bottom-1 left-1 text-[10px] font-mono text-white/30 select-none">+</span>
              <span className="absolute bottom-1 right-1 text-[10px] font-mono text-white/30 select-none">+</span>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload custom developer photo"
              />

              {/* Photo Card Frame (with Drag & Drop zone) */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative overflow-hidden bg-neutral-950 aspect-[4/5] border transition-all ${
                  isDragging
                    ? 'border-emerald-400 ring-2 ring-emerald-400/50 scale-[0.99]'
                    : 'border-white/10 hover:border-white/25'
                }`}
              >
                <img
                  src={photoUrl}
                  alt="Buike - Web Developer & AI Builder"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-top sm:object-center transition-all duration-700 ${
                    photoFilter === 'mono'
                      ? 'grayscale contrast-110 brightness-95'
                      : 'grayscale-0 contrast-100'
                  }`}
                />

                {/* Subtle gradient vignette (Toggleable) */}
                {showVignette && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none"></div>
                )}

                {/* Drag over highlight banner */}
                {isDragging && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
                    <Upload className="w-10 h-10 text-emerald-400 animate-bounce mb-2" />
                    <p className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      Drop Your Image Here
                    </p>
                    <p className="text-[10px] text-white/60 font-sans mt-1">
                      Sets your exact photo across the entire portfolio
                    </p>
                  </div>
                )}

                {/* Success Banner */}
                {uploadSuccess && (
                  <div className="absolute top-12 left-3 right-3 bg-emerald-500/90 text-black font-mono text-[10px] font-bold py-1.5 px-3 rounded-sm flex items-center justify-center gap-1.5 z-30 shadow-lg animate-fade-in">
                    <Check className="w-3.5 h-3.5" />
                    <span>Exact Photo Applied Successfully!</span>
                  </div>
                )}

                {/* Top Overlay Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-white/80 pointer-events-auto">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-black/75 backdrop-blur-md border border-white/15 rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{isCustom ? 'AUTHENTIC PHOTO ACTIVE' : 'ONLINE // READY TO CODE'}</span>
                  </div>

                  {/* Filter Switcher */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPhotoFilter(photoFilter === 'mono' ? 'color' : 'mono')}
                      className="px-2 py-1 bg-black/75 backdrop-blur-md border border-white/20 hover:border-white/50 text-white transition-all text-[8px] tracking-wider uppercase active:scale-95 cursor-pointer font-bold"
                      title="Toggle Natural Color or Editorial Mono"
                    >
                      {photoFilter === 'color' ? 'PHOTO: COLOR' : 'PHOTO: MONO'}
                    </button>
                  </div>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/85 backdrop-blur-md border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-display font-black text-white uppercase tracking-wider">
                      BUIKE
                    </span>
                    <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest">
                      ID // DEV-01
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-white/70 tracking-wider uppercase flex items-center justify-between pt-0.5">
                    <span>Web Developer &amp; AI Builder</span>
                    <span className="text-emerald-400">Available</span>
                  </div>
                </div>
              </div>

              {/* Quick Image Controls Bar */}
              <div className="pt-3 px-1 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                  >
                    <Upload className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Upload / Change Photo</span>
                  </button>

                  <button
                    onClick={() => setShowVignette(!showVignette)}
                    className="py-2 px-2.5 bg-[#0a0a0a] hover:bg-white/10 border border-white/15 text-white text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer"
                    title="Toggle background vignette gradient"
                  >
                    {showVignette ? 'Vignette: ON' : 'Vignette: OFF'}
                  </button>

                  {isCustom && (
                    <button
                      onClick={resetToDefault}
                      className="py-2 px-2 bg-[#0a0a0a] hover:bg-red-500/20 hover:text-red-400 border border-white/15 text-white/60 text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer"
                      title="Reset to default image"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Micro Help Note */}
                <div className="flex items-center justify-between text-[9px] font-mono text-white/40 uppercase tracking-widest px-0.5">
                  <span>Drag &amp; drop or click Upload</span>
                  <span>Applies site-wide</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Real Domain Experience Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold font-mono">
              Proven Project Domains
            </span>
            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
              6 Real Deployments
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 bg-[#050505] border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group space-y-6"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 border border-white/20 bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-wider">
                    <span>Live Example</span>
                    <span className="text-white font-medium">{item.example}</span>
                  </div>
                </div>
              );
            })}

            {/* Philosophy Card */}
            <div className="p-8 bg-white/5 border border-white/20 flex flex-col justify-between space-y-6">
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

