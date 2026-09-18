import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { CONTACT_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { useProfilePhoto } from '../context/ProfilePhotoContext';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { photoUrl } = useProfilePhoto();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: 'home' },
    { name: t.nav.about, href: 'about' },
    { name: t.nav.projects, href: 'projects' },
    { name: t.nav.skills, href: 'skills' },
    { name: t.nav.services, href: 'services' },
    { name: t.nav.contact, href: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/85 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl shadow-black/80'
            : 'bg-black/40 backdrop-blur-sm border-b border-white/5 py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="group flex items-center space-x-3 text-left focus:outline-none cursor-pointer"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 group-hover:border-white transition-all flex-shrink-0 bg-neutral-900 flex items-center justify-center text-white">
              <img
                src={photoUrl || "/images/buike-portfolio-profile.jpg"}
                alt="Buike"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center scale-105"
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
                    const fallback = target.parentElement?.querySelector('.logo-fallback');
                    if (fallback) (fallback as HTMLElement).style.display = 'flex';
                  }
                }}
              />
              <div className="logo-fallback hidden w-full h-full items-center justify-center font-display font-black text-xs">
                B
              </div>
            </div>
            <div className="text-2xl font-black tracking-tighter text-white">
              BUIKE<span className="text-white/40">.</span>
            </div>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.25em] text-white/50 font-mono font-medium border-l border-white/20 pl-3">
              Web &amp; AI
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-medium uppercase tracking-[0.2em]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`transition-all py-1 cursor-pointer ${
                    isActive
                      ? 'text-white font-bold border-b border-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Action Button & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="px-3 py-2 border border-white/10 hover:border-white/30 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all text-white bg-white/5 hover:bg-white/10 active:scale-95 cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle color theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-[10px] font-bold">LIGHT</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-[10px] font-bold">DARK</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className="px-5 py-2 border border-white/20 hover:border-white rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all active:scale-95 text-white cursor-pointer font-medium"
            >
              {t.nav.letsTalk}
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-white/80 hover:text-white border border-white/15 rounded-lg bg-white/5 active:scale-95"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-blue-600" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/80 hover:text-white focus:outline-none border border-white/10 rounded-lg bg-white/5"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/98 backdrop-blur-2xl md:hidden pt-28 px-8 flex flex-col justify-between pb-12 border-b border-white/10">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 font-bold">
                {t.nav.menuIndex}
              </span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-2.5 py-1 border border-white/15 rounded-full text-[10px] font-mono uppercase tracking-wider text-white"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3 h-3 text-amber-300" />
                    <span>LIGHT</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3 h-3 text-blue-600" />
                    <span>DARK</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={`flex items-center justify-between text-left py-2 text-xl font-display uppercase tracking-wider transition-colors ${
                      isActive ? 'text-white font-black' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="text-xs font-mono text-white/30">/{link.href}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="text-xs font-mono text-white/50">
              <span className="block text-white font-medium mb-1">{t.nav.available}</span>
              <span>{CONTACT_INFO.email}</span>
            </div>
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full py-3.5 bg-white text-black uppercase text-xs tracking-widest font-bold flex items-center justify-center gap-2 hover:invert transition-all cursor-pointer"
            >
              <span>{t.nav.letsTalk}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

