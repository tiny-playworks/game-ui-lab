import React from 'react';
import type { ReactNode } from 'react';
import type { PrimitivePropDoc } from '../lib/primitiveDocs';

interface PrimitiveCardProps {
  name: string;
  summary: string;
  tokenNote: string;
  usage?: string;
  states?: string[];
  props?: PrimitivePropDoc[];
  children: ReactNode;
}

export function PrimitiveCard({
  name,
  summary,
  tokenNote,
  usage,
  states = [],
  props = [],
  children,
}: PrimitiveCardProps) {
  return (
    <article className="overview-card">
      <div className="overview-card__header">
        <span className="overview-card__eyebrow">Primitive</span>
        <h2>{name}</h2>
      </div>
      <p className="overview-card__summary">{summary}</p>
      <div className="overview-card__sample">{children}</div>
      {usage ? <code className="overview-card__usage">{usage}</code> : null}
      {states.length ? (
        <div className="overview-card__states" aria-label={`${name} states`}>
          {states.map((state) => (
            <span key={state}>{state}</span>
          ))}
        </div>
      ) : null}
      {props.length ? (
        <div className="overview-card__props" aria-label={`${name} props`}>
          {props.map((prop) => (
            <div key={prop.name} className="overview-card__prop-row">
              <strong>{prop.name}</strong>
              <code>{prop.type}</code>
              <span>{prop.description}</span>
            </div>
          ))}
        </div>
      ) : null}
      <p className="overview-card__footnote">{tokenNote}</p>
    </article>
  );
}
