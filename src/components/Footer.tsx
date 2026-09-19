import { useState, useRef, useEffect } from 'react';
import { ArrowUp, ExternalLink, Volume2, VolumeX, Sliders, Check, Github } from 'lucide-react';
import { CONTACT_INFO, GITHUB_URL, LINKEDIN_URL } from '../data/portfolioData';
import { useSound } from '../context/SoundContext';
import { useLanguage } from '../context/LanguageContext';
import { WhatsAppIcon, GmailIcon, LinkedInIcon } from './BrandIcons';
import { openDirectWhatsApp } from '../utils/whatsapp';
import { FooterLanguageSelector } from './FooterLanguageSelector';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { soundEnabled, toggleSound, volume, setVolume, playHoverSound } = useSound();
  const { t } = useLanguage();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close settings popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    if (settingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [settingsOpen]);

  const navLinks = [
    { name: t.nav.home, id: 'home' },
    { name: t.nav.projects, id: 'projects' },
    { name: t.nav.about, id: 'about' },
    { name: t.nav.skills, id: 'skills' },
    { name: t.nav.services, id: 'services' },
    { name: t.nav.contact, id: 'contact' },
  ];

  return (
    <footer className="pt-24 sm:pt-28 pb-16 border-t border-white/10 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-14 sm:space-y-16">
        
        {/* Main Footer Row */}
        <div data-reveal className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-14 sm:pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-display font-black text-sm">
                B
              </div>
              <span className="font-display font-black tracking-[0.2em] text-2xl text-white">
                BUIKE<span className="text-white/40">.</span>
              </span>
            </div>
            <p className="text-xs font-mono text-white/50 uppercase tracking-widest">
              Web Developer &amp; AI Builder
            </p>
            <p className="text-xs text-white/40 font-sans max-w-sm leading-relaxed">
              I build modern websites, digital experiences, and technology that brings ideas to life for clients worldwide.
            </p>
          </div>

          {/* Navigation links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-widest">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Actions: Language Selector, Sound FX Toggle & Settings + Back to top */}
          <div className="flex flex-wrap items-center gap-3 relative" ref={settingsRef}>
            <FooterLanguageSelector />

            {/* Sound Toggle Button Group */}
            <div className="flex items-center border border-white/15 bg-neutral-950/80 rounded-sm">
              <button
                type="button"
                onClick={toggleSound}
                className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest px-3 py-2 transition-all cursor-pointer ${
                  soundEnabled
                    ? 'text-white bg-white/10 hover:bg-white/15'
                    : 'text-white/40 hover:text-white/70'
                }`}
                title={soundEnabled ? 'Disable UI hover sounds' : 'Enable ambient UI hover sounds'}
                aria-label="Toggle UI hover sounds"
              >
                {soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-white/40" />
                )}
                <span>Sound FX: <strong className={soundEnabled ? 'text-emerald-400' : 'text-white/40'}>{soundEnabled ? 'ON' : 'OFF'}</strong></span>
              </button>

              <button
                type="button"
                onClick={() => setSettingsOpen((prev) => !prev)}
                className={`p-2 border-l border-white/15 transition-colors cursor-pointer ${
                  settingsOpen ? 'text-white bg-white/20' : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
                title="Audio settings"
                aria-label="Audio settings menu"
              >
                <Sliders className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Audio Settings Popover */}
            {settingsOpen && (
              <div className="absolute right-0 bottom-full mb-3 w-72 p-4 bg-neutral-950 border border-white/20 shadow-2xl rounded-sm z-50 animate-fade-in font-mono space-y-3.5 text-left">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] uppercase tracking-widest text-white/50">
                  <span className="flex items-center gap-1.5 text-white font-bold">
                    <Sliders className="w-3 h-3 text-white" />
                    Audio Settings
                  </span>
                  <span className="text-emerald-400 text-[9px]">Web Audio API</span>
                </div>

                {/* Primary Toggle Row */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-white font-bold tracking-wider">Hover &amp; Click FX</div>
                    <div className="text-[10px] text-white/40">Tactile UI feedback</div>
                  </div>
                  <button
                    type="button"
                    onClick={toggleSound}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer border ${
                      soundEnabled ? 'bg-emerald-500/20 border-emerald-500' : 'bg-neutral-800 border-white/10'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform ${
                        soundEnabled ? 'translate-x-5 bg-emerald-400' : 'translate-x-0 bg-white/30'
                      }`}
                    />
                  </button>
                </div>

                {/* Volume Presets */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] text-white/50 uppercase tracking-widest flex items-center justify-between">
                    <span>Volume Level</span>
                    <span className="text-white/80">{Math.round(volume * 100)}%</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { label: 'Subtle', val: 0.1 },
                      { label: 'Balanced', val: 0.2 },
                      { label: 'Audible', val: 0.35 },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setVolume(preset.val);
                          if (soundEnabled) {
                            playHoverSound();
                          }
                        }}
                        className={`text-[10px] uppercase py-1.5 border transition-all cursor-pointer ${
                          Math.abs(volume - preset.val) < 0.05
                            ? 'border-white bg-white text-black font-bold'
                            : 'border-white/10 text-white/60 hover:text-white hover:border-white/30 bg-neutral-900'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Test Sound Button */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                  <span className="text-white/40">Interactive elements test</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (!soundEnabled) toggleSound();
                      else playHoverSound();
                    }}
                    className="text-white hover:underline text-[10px] uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    Test Blip
                  </button>
                </div>
              </div>
            )}

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/60 hover:text-white px-3 py-2 border border-white/10 hover:border-white/30 transition-all cursor-pointer bg-neutral-950/80 rounded-sm"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Bottom copyright & real channels */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/30">
          <div className="uppercase tracking-widest">
            &copy; 2026 BUIKE. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="text-white/40 hover:text-white transition-colors flex items-center gap-1.5 group"
            >
              <GmailIcon className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
              <span>{CONTACT_INFO.email}</span>
            </a>
            <a
              href="https://wa.me/2349168144059"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => openDirectWhatsApp(e)}
              className="text-white/40 hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400/80 group-hover:text-emerald-400 transition-colors" />
              <span>Contact on WhatsApp</span>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-[#0A66C2] group-hover:text-white transition-colors" />
              <span>LinkedIn</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer"
            >
              <Github className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
              <span>Visit My GitHub</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

