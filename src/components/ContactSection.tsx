import { useState } from 'react';
import { Copy, Check, Sparkles, ExternalLink, ArrowUpRight } from 'lucide-react';
import { CONTACT_INFO, LINKEDIN_URL } from '../data/portfolioData';
import { useProfilePhoto } from '../context/ProfilePhotoContext';
import { WhatsAppIcon, GmailIcon, LinkedInIcon } from './BrandIcons';
import { openDirectWhatsApp } from '../utils/whatsapp';

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const [projectType, setProjectType] = useState('E-Commerce Website');
  const { photoUrl } = useProfilePhoto();

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const dynamicWhatsAppUrl = `https://wa.me/+2349168144059?text=${encodeURIComponent(
    customMsg || `Hi Buike, I am interested in building a ${projectType} project with you.`
  )}`;

  const dynamicMailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
    `Project Inquiry: ${projectType}`
  )}&body=${encodeURIComponent(
    customMsg || `Hi Buike,\n\nI saw your portfolio and would like to discuss building a ${projectType}.\n\nBest regards,`
  )}`;

  return (
    <section id="contact" className="py-32 sm:py-36 lg:py-40 relative border-t border-white/10 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left CTA Info */}
          <div data-reveal="fade-right" className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold font-mono">
                Contact
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-none text-white">
                Have an idea?
              </h2>
              <p className="text-4xl sm:text-6xl font-serif italic text-white/80 font-light leading-none">
                Let's build it.
              </p>
            </div>

            <p className="text-sm sm:text-base text-white/60 font-sans leading-relaxed max-w-lg">
              Whether it's a high-impact website, multi-tier digital product, or AI web application, I turn visions into durable, clean code from Owerri, Imo State for worldwide clients.
            </p>

            {/* Direct Contact Cards & Presence Badge */}
            <div className="space-y-3 pt-2">
              {/* Verified Developer Presence */}
              <div data-reveal className="flex items-center space-x-3.5 p-4 bg-[#050505] border border-white/10">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-neutral-900 flex-shrink-0 flex items-center justify-center text-white">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="Buike"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center scale-105"
                    />
                  ) : (
                    <span className="font-display font-black text-sm">B</span>
                  )}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-1 ring-black"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Direct line with Buike
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 uppercase tracking-widest">
                      Fast Response
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 font-sans truncate pt-0.5">
                    No middlemen or agencies. Speak directly with the developer building your app.
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div data-reveal className="p-4 bg-[#050505] border border-white/10 flex items-center justify-between group reveal-delay-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 border border-white/20 bg-white/5 flex items-center justify-center text-white group-hover:border-white/40 transition-colors">
                    <GmailIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Email Address (Gmail)</span>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-sm font-mono text-white/90 hover:underline"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(CONTACT_INFO.email, 'email')}
                  className="p-2 border border-white/10 hover:border-white text-white/60 hover:text-white transition-colors cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* WhatsApp Card */}
              <div data-reveal className="p-4 bg-[#050505] border border-white/10 flex items-center justify-between group reveal-delay-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 border border-white/20 bg-white/5 flex items-center justify-center text-white group-hover:border-emerald-500/40 transition-colors">
                    <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">WhatsApp Contact</span>
                    <a
                      href="https://wa.me/2349168144059"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => openDirectWhatsApp(e)}
                      className="text-sm font-mono text-white/90 hover:underline"
                    >
                      {CONTACT_INFO.phone} ({CONTACT_INFO.formattedPhone})
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(CONTACT_INFO.phone, 'phone')}
                  className="p-2 border border-white/10 hover:border-white text-white/60 hover:text-white transition-colors cursor-pointer"
                  title="Copy phone"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* LinkedIn Card */}
              <div data-reveal className="p-4 bg-[#050505] border border-white/10 flex items-center justify-between group reveal-delay-300">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 border border-white/20 bg-white/5 flex items-center justify-center text-white group-hover:border-[#0A66C2]/60 transition-colors">
                    <LinkedInIcon className="w-4 h-4 text-[#0A66C2]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">LinkedIn Profile</span>
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-mono text-white/90 hover:underline flex items-center gap-1.5"
                    >
                      <span>Osigwe Chibuike</span>
                      <ArrowUpRight className="w-3 h-3 text-white/40 group-hover:text-white" />
                    </a>
                  </div>
                </div>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-white/10 hover:border-white text-white/60 hover:text-white transition-colors cursor-pointer"
                  title="Open LinkedIn profile"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div data-reveal className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="px-6 py-3.5 bg-white text-black font-bold uppercase text-xs tracking-widest hover:invert transition-all flex items-center gap-2 shadow-xl active:scale-95 cursor-pointer group"
              >
                <GmailIcon className="w-4 h-4 text-black" />
                <span>EMAIL BUIKE</span>
              </a>

              <a
                href="https://wa.me/2349168144059"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => openDirectWhatsApp(e)}
                className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold uppercase text-xs tracking-widest transition-all flex items-center gap-2 active:scale-95 cursor-pointer group shadow-xl"
              >
                <WhatsAppIcon className="w-4 h-4 text-black" />
                <span>CONTACT ON WHATSAPP</span>
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#0A66C2] hover:bg-[#004182] text-white font-bold uppercase text-xs tracking-widest transition-all flex items-center gap-2 active:scale-95 cursor-pointer group shadow-xl"
              >
                <LinkedInIcon className="w-4 h-4 text-white" />
                <span>LINKEDIN</span>
              </a>
            </div>
          </div>

          {/* Right Interactive Inquiry Composer */}
          <div data-reveal="fade-left" className="lg:col-span-6 w-full">
            <div className="p-8 bg-[#050505] border border-white/10 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white/60" />
                  <h4 className="font-display font-bold text-lg text-white uppercase tracking-tight">
                    Quick Project Inquiry
                  </h4>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Direct Response</span>
              </div>

              <div className="space-y-5">
                {/* Project Category Selection */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/40 block uppercase tracking-widest">
                    What are you looking to build?
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-white/10 text-white font-sans text-sm outline-none focus:border-white transition-colors"
                  >
                    <option value="E-Commerce Store">E-Commerce / Fashion Store</option>
                    <option value="Luxury Event Website">Luxury Event / Wedding Website</option>
                    <option value="Event Discovery Platform">Event Platform / Ticketing</option>
                    <option value="Automotive / Business Website">Automotive or Business Website</option>
                    <option value="AI Assistant / AI-Powered Web App">AI Assistant / AI-Powered Web App (Like ChatBI)</option>
                    <option value="High-Converting Landing Page">High-Converting Landing Page</option>
                  </select>
                </div>

                {/* Optional Message Field */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/40 block uppercase tracking-widest">
                    Project details or goals (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    placeholder="Briefly describe your project, timeline, or vision..."
                    className="w-full px-4 py-3 bg-black border border-white/10 text-white font-sans text-sm outline-none focus:border-white transition-colors resize-none placeholder-white/20"
                  />
                </div>

                {/* Launch Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href={dynamicWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      openDirectWhatsApp(
                        e,
                        customMsg || `Hi Buike, I am interested in building a ${projectType} project with you.`
                      );
                    }}
                    className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors text-center cursor-pointer shadow-md group"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-black" />
                    <span>Send via WhatsApp</span>
                  </a>

                  <a
                    href={dynamicMailtoUrl}
                    className="w-full py-3.5 bg-white/5 hover:bg-white hover:text-black border border-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all text-center cursor-pointer group"
                  >
                    <GmailIcon className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                    <span>Send via Gmail</span>
                  </a>
                </div>

                <p className="text-[10px] font-mono text-white/30 text-center uppercase tracking-widest pt-1">
                  Direct connection to Buike in Owerri, Imo State. No middlemen.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

