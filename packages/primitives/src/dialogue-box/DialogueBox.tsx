import React from 'react';
import type { ReactNode } from 'react';
import {
  dialogueBoxContentClass,
  dialogueBoxPortraitClass,
  dialogueBoxRecipe,
  dialogueBoxSpeakerClass,
  dialogueBoxTextClass,
  mergeClass,
} from '../styles';

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
    <article className={mergeClass(dialogueBoxRecipe({ tone }), className)} data-tone={tone} aria-label={`${speaker} dialogue`}>
      <span className={dialogueBoxPortraitClass} aria-hidden="true">{portrait ?? speaker.slice(0, 1)}</span>
      <span className={dialogueBoxContentClass}>
        <strong className={dialogueBoxSpeakerClass}>{speaker}</strong>
        <span className={dialogueBoxTextClass}>{text}</span>
      </span>
    </article>
  );
}
