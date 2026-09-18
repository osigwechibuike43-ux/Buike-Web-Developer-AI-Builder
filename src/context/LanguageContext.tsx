import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language =
  | 'en' // English
  | 'es' // Spanish
  | 'fr' // French
  | 'de' // German
  | 'zh' // Chinese (Simplified)
  | 'ja' // Japanese
  | 'ar' // Arabic
  | 'pt' // Portuguese
  | 'ru' // Russian
  | 'hi' // Hindi
  | 'it' // Italian
  | 'ko' // Korean
  | 'nl' // Dutch
  | 'tr' // Turkish
  | 'pl' // Polish
  | 'sv' // Swedish
  | 'sw' // Swahili
  | 'ig' // Igbo
  | 'yo' // Yoruba
  | 'ha'; // Hausa

export interface LanguageMeta {
  code: Language;
  name: string;
  nativeName: string;
  region: string;
  flag: string;
  dir?: 'ltr' | 'rtl';
}

export const ALL_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', region: 'Global', flag: '🇬🇧', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', region: 'Spain & Latin America', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', region: 'France & Francophonie', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', region: 'Germany / Austria / Switzerland', flag: '🇩🇪', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '简体中文', region: 'China & Worldwide', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', region: 'Japan', flag: '🇯🇵', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', region: 'Middle East & North Africa', flag: '🇸🇦', dir: 'rtl' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', region: 'Brazil & Portugal', flag: '🇧🇷', dir: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', region: 'Eastern Europe & Central Asia', flag: '🇷🇺', dir: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'India', flag: '🇮🇳', dir: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', region: 'Italy & Switzerland', flag: '🇮🇹', dir: 'ltr' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', region: 'South Korea', flag: '🇰🇷', dir: 'ltr' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', region: 'Netherlands & Belgium', flag: '🇳🇱', dir: 'ltr' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', region: 'Turkey', flag: '🇹🇷', dir: 'ltr' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', region: 'Poland', flag: '🇵🇱', dir: 'ltr' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', region: 'Sweden & Scandinavia', flag: '🇸🇪', dir: 'ltr' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', region: 'East Africa', flag: '🇰🇪', dir: 'ltr' },
  { code: 'ig', name: 'Igbo', nativeName: 'Asụsụ Igbo', region: 'Nigeria', flag: '🇳🇬', dir: 'ltr' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Èdè Yorùbá', region: 'Nigeria & West Africa', flag: '🇳🇬', dir: 'ltr' },
  { code: 'ha', name: 'Hausa', nativeName: 'Harshen Hausa', region: 'Nigeria & West Africa', flag: '🇳🇬', dir: 'ltr' },
];

export interface Translations {
  nav: {
    home: string;
    about: string;
    projects: string;
    skills: string;
    services: string;
    contact: string;
    letsTalk: string;
    menuIndex: string;
    available: string;
  };
  common: {
    language: string;
    selectLanguage: string;
    searchLanguages: string;
    allLanguages: string;
    switchLang: string;
    close: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      services: 'Services',
      contact: 'Contact',
      letsTalk: "Let's Talk →",
      menuIndex: 'Menu Index',
      available: 'Available for new projects',
    },
    common: {
      language: 'Language',
      selectLanguage: 'Select Language',
      searchLanguages: 'Search languages (name, code)...',
      allLanguages: 'All Languages',
      switchLang: 'Change language',
      close: 'Close',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      projects: 'Proyectos',
      skills: 'Habilidades',
      services: 'Servicios',
      contact: 'Contacto',
      letsTalk: 'Hablemos →',
      menuIndex: 'Índice del Menú',
      available: 'Disponible para nuevos proyectos',
    },
    common: {
      language: 'Idioma',
      selectLanguage: 'Seleccionar idioma',
      searchLanguages: 'Buscar idiomas...',
      allLanguages: 'Todos los idiomas',
      switchLang: 'Cambiar idioma',
      close: 'Cerrar',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      projects: 'Projets',
      skills: 'Compétences',
      services: 'Services',
      contact: 'Contact',
      letsTalk: 'Discuter →',
      menuIndex: 'Index du Menu',
      available: 'Disponible pour nouveaux projets',
    },
    common: {
      language: 'Langue',
      selectLanguage: 'Choisir la langue',
      searchLanguages: 'Rechercher une langue...',
      allLanguages: 'Toutes les langues',
      switchLang: 'Changer de langue',
      close: 'Fermer',
    },
  },
  de: {
    nav: {
      home: 'Startseite',
      about: 'Über mich',
      projects: 'Projekte',
      skills: 'Fähigkeiten',
      services: 'Dienstleistungen',
      contact: 'Kontakt',
      letsTalk: 'Kontaktieren →',
      menuIndex: 'Menü-Index',
      available: 'Verfügbar für neue Projekte',
    },
    common: {
      language: 'Sprache',
      selectLanguage: 'Sprache wählen',
      searchLanguages: 'Sprachen suchen...',
      allLanguages: 'Alle Sprachen',
      switchLang: 'Sprache wechseln',
      close: 'Schließen',
    },
  },
  zh: {
    nav: {
      home: '首页',
      about: '关于我',
      projects: '精选项目',
      skills: '专业技能',
      services: '服务项目',
      contact: '联系我',
      letsTalk: '立即交流 →',
      menuIndex: '导航索引',
      available: '随时可接受新项目',
    },
    common: {
      language: '语言',
      selectLanguage: '选择语言',
      searchLanguages: '搜索语言...',
      allLanguages: '所有支持语言',
      switchLang: '切换语言',
      close: '关闭',
    },
  },
  ja: {
    nav: {
      home: 'ホーム',
      about: 'プロフィール',
      projects: 'プロジェクト',
      skills: 'スキル',
      services: 'サービス',
      contact: 'お問い合わせ',
      letsTalk: '話してみる →',
      menuIndex: 'メニュー目次',
      available: '新規案件のご相談受付中',
    },
    common: {
      language: '言語',
      selectLanguage: '言語を選択',
      searchLanguages: '言語を検索...',
      allLanguages: '対応言語一覧',
      switchLang: '言語を変更',
      close: '閉じる',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'نبذة عني',
      projects: 'المشاريع',
      skills: 'المهارات',
      services: 'الخدمات',
      contact: 'اتصل بي',
      letsTalk: 'فلنتحدث →',
      menuIndex: 'فهرس القائمة',
      available: 'متاح لمشاريع جديدة',
    },
    common: {
      language: 'اللغة',
      selectLanguage: 'اختر اللغة',
      searchLanguages: 'البحث عن اللغات...',
      allLanguages: 'جميع اللغات',
      switchLang: 'تغيير اللغة',
      close: 'إغلاق',
    },
  },
  pt: {
    nav: {
      home: 'Início',
      about: 'Sobre',
      projects: 'Projetos',
      skills: 'Habilidades',
      services: 'Serviços',
      contact: 'Contato',
      letsTalk: 'Vamos Conversar →',
      menuIndex: 'Índice do Menu',
      available: 'Disponível para novos projetos',
    },
    common: {
      language: 'Idioma',
      selectLanguage: 'Selecionar idioma',
      searchLanguages: 'Pesquisar idiomas...',
      allLanguages: 'Todos os idiomas',
      switchLang: 'Mudar idioma',
      close: 'Fechar',
    },
  },
  ru: {
    nav: {
      home: 'Главная',
      about: 'Обо мне',
      projects: 'Проекты',
      skills: 'Навыки',
      services: 'Услуги',
      contact: 'Контакты',
      letsTalk: 'Связаться →',
      menuIndex: 'Индекс меню',
      available: 'Открыт для новых проектов',
    },
    common: {
      language: 'Язык',
      selectLanguage: 'Выберите язык',
      searchLanguages: 'Поиск языка...',
      allLanguages: 'Все языки',
      switchLang: 'Сменить язык',
      close: 'Закрыть',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      about: 'परिचय',
      projects: 'प्रोजेक्ट्स',
      skills: 'कौशल',
      services: 'सेवाएं',
      contact: 'संपर्क',
      letsTalk: 'बातचीत करें →',
      menuIndex: 'मेन्यू सूची',
      available: 'नई परियोजनाओं के लिए उपलब्ध',
    },
    common: {
      language: 'भाषा',
      selectLanguage: 'भाषा चुनें',
      searchLanguages: 'भाषा खोजें...',
      allLanguages: 'सभी भाषाएं',
      switchLang: 'भाषा बदलें',
      close: 'बंद करें',
    },
  },
  it: {
    nav: {
      home: 'Home',
      about: 'Chi sono',
      projects: 'Progetti',
      skills: 'Competenze',
      services: 'Servizi',
      contact: 'Contatti',
      letsTalk: 'Parliamone →',
      menuIndex: 'Indice Menu',
      available: 'Disponibile per nuovi progetti',
    },
    common: {
      language: 'Lingua',
      selectLanguage: 'Seleziona lingua',
      searchLanguages: 'Cerca lingua...',
      allLanguages: 'Tutte le lingue',
      switchLang: 'Cambia lingua',
      close: 'Chiudi',
    },
  },
  ko: {
    nav: {
      home: '홈',
      about: '소개',
      projects: '프로젝트',
      skills: '기술 스택',
      services: '제공 서비스',
      contact: '문의하기',
      letsTalk: '문의하기 →',
      menuIndex: '메뉴 목차',
      available: '새로운 프로젝트 협업 가능',
    },
    common: {
      language: '언어',
      selectLanguage: '언어 선택',
      searchLanguages: '언어 검색...',
      allLanguages: '지원 언어 전체',
      switchLang: '언어 변경',
      close: '닫기',
    },
  },
  nl: {
    nav: {
      home: 'Home',
      about: 'Over mij',
      projects: 'Projecten',
      skills: 'Vaardigheden',
      services: 'Diensten',
      contact: 'Contact',
      letsTalk: 'Neem Contact Op →',
      menuIndex: 'Menu-index',
      available: 'Beschikbaar voor nieuwe projecten',
    },
    common: {
      language: 'Taal',
      selectLanguage: 'Selecteer taal',
      searchLanguages: 'Zoek talen...',
      allLanguages: 'Alle talen',
      switchLang: 'Taal wijzigen',
      close: 'Sluiten',
    },
  },
  tr: {
    nav: {
      home: 'Anasayfa',
      about: 'Hakkımda',
      projects: 'Projeler',
      skills: 'Yetenekler',
      services: 'Hizmetler',
      contact: 'İletişim',
      letsTalk: 'Konuşalım →',
      menuIndex: 'Menü Dizini',
      available: 'Yeni projeler için uygun',
    },
    common: {
      language: 'Dil',
      selectLanguage: 'Dil seçin',
      searchLanguages: 'Dil ara...',
      allLanguages: 'Tüm diller',
      switchLang: 'Dili değiştir',
      close: 'Kapat',
    },
  },
  pl: {
    nav: {
      home: 'Strona główna',
      about: 'O mnie',
      projects: 'Projekty',
      skills: 'Umiejętności',
      services: 'Usługi',
      contact: 'Kontakt',
      letsTalk: 'Porozmawiajmy →',
      menuIndex: 'Spis menu',
      available: 'Dostępny do nowych projektów',
    },
    common: {
      language: 'Język',
      selectLanguage: 'Wybierz język',
      searchLanguages: 'Szukaj języków...',
      allLanguages: 'Wszystkie języki',
      switchLang: 'Zmień język',
      close: 'Zamknij',
    },
  },
  sv: {
    nav: {
      home: 'Hem',
      about: 'Om mig',
      projects: 'Projekt',
      skills: 'Färdigheter',
      services: 'Tjänster',
      contact: 'Kontakt',
      letsTalk: 'Kontakta mig →',
      menuIndex: 'Menyindex',
      available: 'Tillgänglig för nya uppdrag',
    },
    common: {
      language: 'Språk',
      selectLanguage: 'Välj språk',
      searchLanguages: 'Sök språk...',
      allLanguages: 'Alla språk',
      switchLang: 'Byt språk',
      close: 'Stäng',
    },
  },
  sw: {
    nav: {
      home: 'Mwanzo',
      about: 'Kuhusu Mimi',
      projects: 'Miradi',
      skills: 'Ujuzi',
      services: 'Huduma',
      contact: 'Mawasiliano',
      letsTalk: 'Tuzungumze →',
      menuIndex: 'Faharisi ya Menyu',
      available: 'Ninapatikana kwa miradi mipya',
    },
    common: {
      language: 'Lugha',
      selectLanguage: 'Chagua lugha',
      searchLanguages: 'Tafuta lugha...',
      allLanguages: 'Lugha zote',
      switchLang: 'Badili lugha',
      close: 'Funga',
    },
  },
  ig: {
    nav: {
      home: 'Ụlọ',
      about: 'Gbasara m',
      projects: 'Ọrụ m',
      skills: 'Nka na Ụzụ',
      services: 'Ọrụ m na-arụ',
      contact: 'Kpọtụrụ m',
      letsTalk: 'Ka anyị kparịta ụka →',
      menuIndex: 'Nchịkọta Nhọrọ',
      available: 'Dị njikere maka ọrụ ọhụrụ',
    },
    common: {
      language: 'Asụsụ',
      selectLanguage: 'Họrọ Asụsụ',
      searchLanguages: 'Chọọ asụsụ...',
      allLanguages: 'Asụsụ niile',
      switchLang: 'Gbanwee asụsụ',
      close: 'Mechie',
    },
  },
  yo: {
    nav: {
      home: 'Ilé',
      about: 'Nípa Mi',
      projects: 'Àwọn Iṣẹ́',
      skills: 'Ọgbọ́n Iṣẹ́',
      services: 'Àwọn Iṣẹ́ Ìsìn',
      contact: 'Kàn sí Mi',
      letsTalk: 'Jẹ́ Ká Sọ̀rọ̀ →',
      menuIndex: 'Atọ́ka Ètò',
      available: 'Wà fún àwọn iṣẹ́ tuntun',
    },
    common: {
      language: 'Èdè',
      selectLanguage: 'Yan èdè kan',
      searchLanguages: 'Wá èdè...',
      allLanguages: 'Gbogbo àwọn èdè',
      switchLang: 'Yí èdè padà',
      close: 'Tìí',
    },
  },
  ha: {
    nav: {
      home: 'Gida',
      about: 'Game da Ni',
      projects: 'Ayyuka',
      skills: 'Kwarewa',
      services: 'Ayyukan da Nake Yi',
      contact: 'Tuntube Ni',
      letsTalk: 'Bari Mu Yi Magana →',
      menuIndex: 'Tsarin Zaɓuɓɓuka',
      available: 'A shirye nake don sabbin ayyuka',
    },
    common: {
      language: 'Yare',
      selectLanguage: 'Zaɓi yare',
      searchLanguages: 'Nemi yare...',
      allLanguages: 'Dukkan yaruka',
      switchLang: 'Sauya yare',
      close: 'Rufe',
    },
  },
};

interface LanguageContextType {
  language: Language;
  currentLanguageMeta: LanguageMeta;
  allLanguages: LanguageMeta[];
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-language') as Language;
      if (saved && translations[saved]) {
        return saved;
      }
      // Check browser language
      const browserLang = navigator.language?.slice(0, 2).toLowerCase() as Language;
      if (browserLang && translations[browserLang]) {
        return browserLang;
      }
    }
    return 'en';
  });

  const currentLanguageMeta =
    ALL_LANGUAGES.find((l) => l.code === language) || ALL_LANGUAGES[0];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-language', language);
      document.documentElement.setAttribute('lang', language);
      document.documentElement.setAttribute('dir', currentLanguageMeta.dir || 'ltr');
    }
  }, [language, currentLanguageMeta.dir]);

  const setLanguage = (lang: Language) => {
    if (translations[lang]) {
      setLanguageState(lang);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        currentLanguageMeta,
        allLanguages: ALL_LANGUAGES,
        setLanguage,
        t: translations[language] || translations.en,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
