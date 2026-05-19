import React from 'react';
import type { ReactNode } from 'react';

export interface ChoicePromptOption {
  id: string;
  label: string;
  description?: ReactNode;
  disabled?: boolean;
}

export interface ChoicePromptProps {
  title: string;
  choices: ChoicePromptOption[];
  onChoice?: (id: string) => void;
  className?: string;
}

export function ChoicePrompt({ title, choices, onChoice, className }: ChoicePromptProps) {
  return (
    <section className={['game-ui-choice-prompt', className].filter(Boolean).join(' ')} role="group" aria-label={title}>
      <strong className="game-ui-choice-prompt__title">{title}</strong>
      <div className="game-ui-choice-prompt__choices">
        {choices.map((choice) => (
          <button
            key={choice.id}
            className="game-ui-choice-prompt__choice"
            type="button"
            disabled={choice.disabled}
            onClick={() => onChoice?.(choice.id)}
          >
            <span>{choice.label}</span>
            {choice.description ? <small>{choice.description}</small> : null}
          </button>
        ))}
      </div>
    </section>
  );
}
