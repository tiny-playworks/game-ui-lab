import type { ReactNode } from 'react';
import { DocsLocaleProvider, LocaleToggle, Localized } from './locale';
import './docs.css';

export function DocShell({
  eyebrowZh,
  eyebrowEn,
  titleZh,
  titleEn,
  summaryZh,
  summaryEn,
  children,
}: {
  eyebrowZh: string;
  eyebrowEn: string;
  titleZh: string;
  titleEn: string;
  summaryZh: string;
  summaryEn: string;
  children: ReactNode;
}) {
  return (
    <DocsLocaleProvider>
      <div className="docs-page">
        <header className="docs-hero">
          <div className="docs-hero__copy">
            <Localized as="p" className="docs-eyebrow" zh={eyebrowZh} en={eyebrowEn} />
            <Localized as="h1" className="docs-title" zh={titleZh} en={titleEn} />
            <Localized as="p" className="docs-summary" zh={summaryZh} en={summaryEn} />
          </div>
          <LocaleToggle />
        </header>
        <main className="docs-content">{children}</main>
      </div>
    </DocsLocaleProvider>
  );
}
