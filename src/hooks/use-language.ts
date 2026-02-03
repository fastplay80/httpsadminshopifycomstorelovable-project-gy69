import { useState, useEffect, useCallback } from 'react';
import { ShopifyLanguageCode, getCurrentLanguage } from '@/lib/shopify';

/**
 * Hook to track the current language and trigger re-renders on language change.
 * Use this in components that need to refetch data when the language changes.
 */
export function useLanguage() {
  const [language, setLanguage] = useState<ShopifyLanguageCode>(getCurrentLanguage);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<string>) => {
      const newLang = event.detail.toUpperCase() as ShopifyLanguageCode;
      if (['IT', 'EN', 'DE', 'FR', 'ES', 'NL'].includes(newLang)) {
        setLanguage(newLang);
      }
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  return language;
}

/**
 * Hook that provides a refetch trigger when language changes.
 * Returns a key that changes on language change - use this as a React Query key dependency.
 */
export function useLanguageKey() {
  const language = useLanguage();
  return language;
}
