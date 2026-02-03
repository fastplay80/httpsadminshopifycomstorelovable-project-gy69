import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('minnelea-language');
    return languages.find(l => l.code === saved) || languages[0];
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('minnelea-language', language.code);
    setIsOpen(false);
    
    // Dispatch custom event for other components to react
    window.dispatchEvent(new CustomEvent('languageChange', { detail: language.code }));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 p-2 hover:bg-muted rounded-sm transition-colors text-sm"
        aria-label="Seleziona lingua"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-base" aria-hidden="true">{currentLanguage.flag}</span>
        <span className="hidden md:inline text-muted-foreground uppercase text-xs font-medium">
          {currentLanguage.code}
        </span>
        <ChevronDown className={cn(
          "w-3 h-3 text-muted-foreground transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-1 z-50 bg-background border border-border rounded-sm shadow-lg py-1 min-w-[160px] animate-fade-in"
          role="listbox"
          aria-label="Lingue disponibili"
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2 text-sm transition-colors text-left",
                currentLanguage.code === language.code 
                  ? "bg-muted text-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
              role="option"
              aria-selected={currentLanguage.code === language.code}
            >
              <span className="text-base" aria-hidden="true">{language.flag}</span>
              <span className="flex-1">{language.name}</span>
              {currentLanguage.code === language.code && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
