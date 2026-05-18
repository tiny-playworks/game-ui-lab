import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ElementType,
  type ReactNode,
} from 'react';

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
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('useDocsLocale must be used inside DocsLocaleProvider');
  }

  return context;
}

export function Localized({
  zh,
  en,
  as,
  className,
}: {
  zh: ReactNode;
  en: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const { locale } = useDocsLocale();
  const Tag = as ?? 'span';

  return <Tag className={className}>{locale === 'zh' ? zh : en}</Tag>;
}

export function LocaleToggle() {
  const { locale, setLocale } = useDocsLocale();

  return (
    <div className="docs-locale-toggle" role="tablist" aria-label="Language switch">
      <button
        type="button"
        className={locale === 'zh' ? 'is-active' : ''}
        onClick={() => setLocale('zh')}
      >
        中文
      </button>
      <button
        type="button"
        className={locale === 'en' ? 'is-active' : ''}
        onClick={() => setLocale('en')}
      >
        English
      </button>
    </div>
  );
}

function readInitialLocale(): DocsLocale {
  if (typeof window === 'undefined') {
    return 'zh';
  }

  const saved = window.localStorage.getItem(storageKey);
  return saved === 'en' ? 'en' : 'zh';
}
