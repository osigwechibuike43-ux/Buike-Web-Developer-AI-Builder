import { ShoppingBag, Calendar, Sparkles, Building2, Car, Compass, Bot } from 'lucide-react';

export function About() {
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
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-6">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold font-mono">
              About Buike
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase leading-none">
            Building. Learning. Improving<span className="text-white/30">.</span>
          </h2>

          <p className="text-2xl sm:text-3xl font-serif italic text-white/80 font-light leading-snug">
            "I don't just study technology. I build with it."
          </p>

          <p className="text-base sm:text-lg text-white/70 font-sans leading-relaxed">
            I'm Buike, a web developer passionate about turning ideas into functional digital products. I enjoy building websites, experimenting with modern technologies, and exploring how artificial intelligence can change the way we create software.
          </p>
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

