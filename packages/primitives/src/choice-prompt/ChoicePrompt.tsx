import React from 'react';
import type { ReactNode } from 'react';
import {
  choicePromptChoiceClass,
  choicePromptChoiceDescriptionClass,
  choicePromptChoicesClass,
  choicePromptClass,
  choicePromptTitleClass,
  mergeClass,
} from '../styles';

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
    <section className={mergeClass(choicePromptClass, className)} role="group" aria-label={title}>
      <strong className={choicePromptTitleClass}>{title}</strong>
      <div className={choicePromptChoicesClass}>
        {choices.map((choice) => (
          <button
            key={choice.id}
            className={choicePromptChoiceClass}
            type="button"
            disabled={choice.disabled}
            onClick={() => onChoice?.(choice.id)}
          >
            <span>{choice.label}</span>
            {choice.description ? <small className={choicePromptChoiceDescriptionClass}>{choice.description}</small> : null}
          </button>
        ))}
      </div>
    </section>
  );
}
