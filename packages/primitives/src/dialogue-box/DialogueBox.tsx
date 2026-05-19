import React from 'react';
import type { ReactNode } from 'react';

export type DialogueTone = 'neutral' | 'ally' | 'warning';

export interface DialogueBoxProps {
  speaker: string;
  text: ReactNode;
  portrait?: ReactNode;
  tone?: DialogueTone;
  className?: string;
}

export function DialogueBox({ speaker, text, portrait, tone = 'neutral', className }: DialogueBoxProps) {
  return (
    <article className={['game-ui-dialogue-box', className].filter(Boolean).join(' ')} data-tone={tone} aria-label={`${speaker} dialogue`}>
      <span className="game-ui-dialogue-box__portrait" aria-hidden="true">{portrait ?? speaker.slice(0, 1)}</span>
      <span className="game-ui-dialogue-box__content">
        <strong>{speaker}</strong>
        <span>{text}</span>
      </span>
    </article>
  );
}
