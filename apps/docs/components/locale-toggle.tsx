import { useDocsLocale } from "./locale";

export function LocaleToggle() {
  const { locale, setLocale } = useDocsLocale();

  return (
    <div className="docs-locale-toggle" role="tablist" aria-label="Language switch">
      <button type="button" className={locale === "zh" ? "is-active" : ""} onClick={() => setLocale("zh")}>
        中文
      </button>
      <button type="button" className={locale === "en" ? "is-active" : ""} onClick={() => setLocale("en")}>
        English
      </button>
    </div>
  );
}
