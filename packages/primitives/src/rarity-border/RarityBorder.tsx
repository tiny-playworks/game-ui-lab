import React from 'react';
import type { ReactNode } from 'react';

export type RarityBorderTone = 'common' | 'rare' | 'epic' | 'legendary';

export interface RarityBorderProps {
  children: ReactNode;
  tone?: RarityBorderTone;
  active?: boolean;
  className?: string;
}

export function RarityBorder({
  children,
  tone = 'common',
  active = true,
  className,
}: RarityBorderProps) {
  return (
    <div
      className={['game-ui-rarity-border', className].filter(Boolean).join(' ')}
      data-tone={tone}
      data-active={active}
    >
      {children}
    </div>
  );
}

