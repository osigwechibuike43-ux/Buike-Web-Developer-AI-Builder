import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Languages, ChevronUp, Check, Search, X, Globe, Sparkles } from 'lucide-react';
import { useLanguage, Language, ALL_LANGUAGES, LanguageMeta } from '../context/LanguageContext';

interface FooterLanguageSelectorProps {
  className?: string;
}

const POPULAR_CODES: Language[] = ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ar', 'ig'];

export function FooterLanguageSelector({ className = '' }: FooterLanguageSelectorProps) {
  const { language, setLanguage, currentLanguageMeta, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 75);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      setSearchQuery('');
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Filtered list
  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return ALL_LANGUAGES;
    const q = searchQuery.toLowerCase().trim();
    return ALL_LANGUAGES.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.nativeName.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const popularLanguages = useMemo(() => {
    return ALL_LANGUAGES.filter((item) => POPULAR_CODES.includes(item.code));
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={popoverRef}>
      {/* Footer Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group flex items-center gap-2.5 px-3.5 py-2 border transition-all cursor-pointer font-mono text-xs uppercase tracking-wider rounded-sm select-none ${
          isOpen
            ? 'border-white bg-white text-black font-semibold shadow-lg'
            : 'border-white/15 bg-neutral-950/80 hover:border-white/40 text-white/80 hover:text-white hover:bg-neutral-900 active:scale-95'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        title="Select website language"
      >
        <div className="flex items-center gap-2">
          {/* Professional Dual Translation Icon */}
          <Languages
            className={`w-3.5 h-3.5 transition-colors ${
              isOpen ? 'text-black' : 'text-white/70 group-hover:text-white'
            }`}
          />
          <span className="text-sm leading-none">{currentLanguageMeta.flag}</span>
        </div>

        <div className="flex items-center gap-1.5 font-bold">
          <span>{currentLanguageMeta.code.toUpperCase()}</span>
          <span className={`text-[10px] font-normal ${isOpen ? 'text-black/60' : 'text-white/40'}`}>
            &bull;
          </span>
          <span className={`text-[11px] font-medium truncate max-w-[90px] sm:max-w-[120px] ${isOpen ? 'text-black/90' : 'text-white/90'}`}>
            {currentLanguageMeta.nativeName}
          </span>
        </div>

        <ChevronUp
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-black' : 'text-white/40 group-hover:text-white'
          }`}
        />
      </button>

      {/* Upwards-Opening Executive Popover Dialog */}
      {isOpen && (
        <div
          className="absolute right-0 sm:right-auto sm:left-0 bottom-full mb-3 w-[330px] sm:w-[460px] max-w-[95vw] bg-neutral-950 border border-white/20 shadow-2xl rounded-sm z-50 overflow-hidden font-mono text-left animate-in fade-in zoom-in-95 duration-150"
          role="dialog"
          aria-modal="true"
          aria-label="Language & Localization Selector"
        >
          {/* Header */}
          <div className="p-3.5 border-b border-white/10 bg-neutral-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-white/10 border border-white/15 flex items-center justify-center">
                <Languages className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-wider flex items-center gap-2">
                  <span>Language &amp; Region</span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-white/10 text-white/70 border border-white/10 rounded font-normal">
                    {ALL_LANGUAGES.length} Locales
                  </span>
                </div>
                <div className="text-[10px] text-white/40">Select your preferred viewing language</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/40 hover:text-white border border-transparent hover:border-white/20 rounded transition-all cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick select popular pills */}
          <div className="px-3 pt-3 pb-2 border-b border-white/10 bg-neutral-950">
            <div className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              <span>Quick Select</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {popularLanguages.map((pop) => {
                const isActive = language === pop.code;
                return (
                  <button
                    key={pop.code}
                    type="button"
                    onClick={() => handleSelectLanguage(pop.code)}
                    className={`text-[10px] px-2 py-1 rounded-sm border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'border-white bg-white text-black font-bold shadow'
                        : 'border-white/10 bg-neutral-900 text-white/70 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <span>{pop.flag}</span>
                    <span>{pop.nativeName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instant Search Bar */}
          <div className="p-2.5 border-b border-white/10 bg-neutral-900/30">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search languages, countries, codes (e.g. French, 简体中文, ja)..."
                className="w-full bg-neutral-900 border border-white/10 text-white text-xs pl-8 pr-8 py-2 placeholder-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all font-mono"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-white/40 hover:text-white p-0.5 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Language Grid */}
          <div className="max-h-64 sm:max-h-72 overflow-y-auto p-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 custom-scrollbar bg-neutral-950">
            {filteredLanguages.length === 0 ? (
              <div className="col-span-full py-8 text-center text-white/40 text-xs font-mono">
                No languages found matching "{searchQuery}"
              </div>
            ) : (
              filteredLanguages.map((langItem) => {
                const isSelected = language === langItem.code;
                return (
                  <button
                    key={langItem.code}
                    type="button"
                    onClick={() => handleSelectLanguage(langItem.code)}
                    className={`p-2 rounded-sm border text-left transition-all cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'border-white bg-white text-black font-semibold shadow-sm'
                        : 'border-white/10 bg-neutral-900/50 hover:bg-neutral-900 hover:border-white/25 text-white/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="text-base flex-shrink-0 leading-none">
                        {langItem.flag}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs truncate font-bold">
                            {langItem.nativeName}
                          </span>
                          <span
                            className={`text-[9px] px-1 py-0.2 rounded font-mono uppercase font-bold border ${
                              isSelected
                                ? 'border-black/30 text-black/80'
                                : 'border-white/20 text-white/50'
                            }`}
                          >
                            {langItem.code}
                          </span>
                        </div>
                        <div
                          className={`text-[10px] truncate ${
                            isSelected ? 'text-black/70' : 'text-white/40 group-hover:text-white/60'
                          }`}
                        >
                          {langItem.name} &bull; {langItem.region}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-black flex-shrink-0 ml-1.5 stroke-[2.5]" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Metadata Status Row */}
          <div className="p-2.5 border-t border-white/10 bg-neutral-900/70 flex items-center justify-between text-[10px] text-white/40">
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3 text-white/50" />
              <span>Active: <strong className="text-white">{currentLanguageMeta.name}</strong> ({currentLanguageMeta.flag})</span>
            </div>
            <span className="hidden sm:inline text-white/30">[ESC] to close</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Also export alias for compatibility
export { FooterLanguageSelector as LanguageToggle };
