import React from "react";
import type { ReactNode } from "react";
import {
  dialogueBoxContentClass,
  dialogueBoxPortraitClass,
  dialogueBoxRecipe,
  dialogueBoxSpeakerClass,
  dialogueBoxTextClass,
  mergeClass,
} from "../styles";

export type DialogueTone = "neutral" | "ally" | "warning";

export interface DialogueBoxProps {
  speaker: string;
  text: ReactNode;
  portrait?: ReactNode;
  tone?: DialogueTone;
  source?: ReactNode;
  typing?: boolean;
  onAdvance?: () => void;
  className?: string;
}

export function DialogueBox({
  speaker,
  text,
  portrait,
  tone = "neutral",
  source,
  typing = false,
  onAdvance,
  className,
}: DialogueBoxProps) {
  return (
    <article
      className={mergeClass(dialogueBoxRecipe({ tone }), className)}
      data-tone={tone}
      data-typing={typing}
      aria-label={`${speaker} dialogue`}
      onClick={onAdvance}
    >
      <span className={dialogueBoxPortraitClass} aria-hidden="true">
        {portrait ?? speaker.slice(0, 1)}
      </span>
      <span className={dialogueBoxContentClass}>
        <strong className={dialogueBoxSpeakerClass}>{speaker}</strong>
        {source ? <span>{source}</span> : null}
        <span className={dialogueBoxTextClass}>{text}</span>
      </span>
    </article>
  );
}
