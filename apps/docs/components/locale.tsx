import React, {
  createContext,
  use,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export { Localized } from './localized';
export { LocaleToggle } from './locale-toggle';

export type DocsLocale = 'zh' | 'en';

interface LocaleContextValue {
  locale: DocsLocale;
  setLocale: (locale: DocsLocale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);
const storageKey = 'tiny-playworks-docs-locale';

export function DocsLocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<DocsLocale>(() => readInitialLocale());

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(storageKey, locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: setLocaleState,
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useDocsLocale() {
  const context = use(LocaleContext);

  if (!context) {
    throw new Error('useDocsLocale must be used inside DocsLocaleProvider');
  }

  return context;
}

function readInitialLocale(): DocsLocale {
  if (typeof window === 'undefined') {
    return 'zh';
  }

  const saved = window.localStorage.getItem(storageKey);
  return saved === 'en' ? 'en' : 'zh';
}
