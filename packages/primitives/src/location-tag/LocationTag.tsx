import React from 'react';

export type LocationDanger = 'safe' | 'contested' | 'hostile';

export interface LocationTagProps {
  name: string;
  zone?: string;
  danger?: LocationDanger;
  status?: string;
  className?: string;
}

export function LocationTag({ name, zone, danger = 'safe', status, className }: LocationTagProps) {
  return (
    <article className={['game-ui-location-tag', className].filter(Boolean).join(' ')} data-danger={danger} aria-label={`${name} ${danger} location`}>
      <span className="game-ui-location-tag__zone">{zone ?? 'Location'}</span>
      <strong>{name}</strong>
      {status ? <span className="game-ui-location-tag__status">{status}</span> : null}
    </article>
  );
}
