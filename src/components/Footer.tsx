import { ArrowUp, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import { CONTACT_INFO, GITHUB_URL } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Projects', id: 'projects' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Services', id: 'services' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="py-20 border-t border-white/10 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-12">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-display font-black text-sm">
                B
              </div>
              <span className="font-display font-black tracking-[0.2em] text-2xl text-white">
                BUIKE
              </span>
            </div>
            <p className="text-[10px] font-mono text-white/50 uppercase tracking-[0.25em] font-bold">
              Web Developer &amp; AI Builder
            </p>
            <p className="text-xs text-white/60 font-sans max-w-sm leading-relaxed">
              I build modern websites, digital experiences, and technology that brings ideas to life.
            </p>
          </div>

          {/* Navigation links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-wider">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white px-4 py-2.5 bg-white/5 border border-white/15 hover:bg-white hover:text-black transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom copyright & real channels */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div className="uppercase tracking-wider text-[11px]">
            &copy; 2026 BUIKE. All rights reserved.
          </div>

          <div className="flex items-center space-x-6 text-xs">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{CONTACT_INFO.email}</span>
            </a>
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

