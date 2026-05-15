import React from 'react';
import type { ReactNode } from 'react';

interface PrimitiveCardProps {
  name: string;
  summary: string;
  tokenNote: string;
  children: ReactNode;
}

export function PrimitiveCard({ name, summary, tokenNote, children }: PrimitiveCardProps) {
  return (
    <article className="overview-card">
      <div className="overview-card__header">
        <span className="overview-card__eyebrow">Primitive</span>
        <h2>{name}</h2>
      </div>
      <p className="overview-card__summary">{summary}</p>
      <div className="overview-card__sample">{children}</div>
      <p className="overview-card__footnote">{tokenNote}</p>
    </article>
  );
}
