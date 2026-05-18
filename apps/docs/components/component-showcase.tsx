import type { ReactNode } from 'react';
import { Localized } from './locale';

export function ComponentShowcase({
  eyebrowZh,
  eyebrowEn,
  titleZh,
  titleEn,
  summaryZh,
  summaryEn,
  code,
  children,
}: {
  eyebrowZh: string;
  eyebrowEn: string;
  titleZh: string;
  titleEn: string;
  summaryZh: string;
  summaryEn: string;
  code: string;
  children: ReactNode;
}) {
  return (
    <section className="docs-showcase">
      <header className="docs-showcase__header">
        <Localized as="p" className="docs-showcase__eyebrow" zh={eyebrowZh} en={eyebrowEn} />
        <Localized as="h2" className="docs-showcase__title" zh={titleZh} en={titleEn} />
        <Localized as="p" className="docs-showcase__summary" zh={summaryZh} en={summaryEn} />
      </header>
      <div className="docs-showcase__body">
        <div className="docs-showcase__preview">{children}</div>
        <pre className="docs-showcase__code"><code>{code}</code></pre>
      </div>
    </section>
  );
}
