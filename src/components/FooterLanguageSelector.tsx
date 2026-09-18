import React from 'react';
import { Languages, ChevronDown } from 'lucide-react';
import { useLanguage, Language, ALL_LANGUAGES } from '../context/LanguageContext';

interface FooterLanguageSelectorProps {
  className?: string;
}

export function FooterLanguageSelector({ className = '' }: FooterLanguageSelectorProps) {
  const { language, setLanguage, currentLanguageMeta } = useLanguage();

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <label htmlFor="language-select" className="sr-only">
        Select website language
      </label>
      <div className="relative flex items-center bg-neutral-950 border border-white/20 hover:border-white/40 focus-within:border-white transition-all rounded-sm px-3 py-2 font-mono text-xs text-white">
        <Languages className="w-3.5 h-3.5 text-white/70 mr-2 flex-shrink-0" />
        <span className="text-sm leading-none mr-2 flex-shrink-0" aria-hidden="true">
          {currentLanguageMeta.flag}
        </span>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="bg-transparent text-white font-mono text-xs font-bold uppercase tracking-wider cursor-pointer outline-none pr-6 appearance-none"
          aria-label="Select website language"
        >
          {ALL_LANGUAGES.map((lang) => (
            <option
              key={lang.code}
              value={lang.code}
              className="bg-neutral-950 text-white font-mono py-2 text-xs"
            >
              {lang.flag} {lang.name} — {lang.nativeName}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-white/40 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}

export { FooterLanguageSelector as LanguageToggle };
