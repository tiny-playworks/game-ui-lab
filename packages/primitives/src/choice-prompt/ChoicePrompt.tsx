import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
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
  icon?: ReactNode;
  meta?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export interface ChoicePromptProps {
  title: string;
  choices: ChoicePromptOption[];
  selectedId?: string;
  onChoice?: (id: string, choice: ChoicePromptOption) => void;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function ChoicePrompt({ title, choices, selectedId, onChoice, label, className, style }: ChoicePromptProps) {
  return (
    <section className={mergeClass(choicePromptClass, className)} role="group" aria-label={label ?? title} style={style}>
      <strong className={choicePromptTitleClass}>{title}</strong>
      <div className={choicePromptChoicesClass}>
        {choices.map((choice) => (
          <button
            key={choice.id}
            className={mergeClass(choicePromptChoiceClass, choice.className)}
            type="button"
            disabled={choice.disabled}
            data-selected={selectedId === choice.id}
            onClick={() => onChoice?.(choice.id, choice)}
          >
            <span>
              {choice.icon ? <span aria-hidden="true">{choice.icon}</span> : null}
              {choice.label}
            </span>
            {choice.description ? <small className={choicePromptChoiceDescriptionClass}>{choice.description}</small> : null}
            {choice.meta ? <small className={choicePromptChoiceDescriptionClass}>{choice.meta}</small> : null}
          </button>
        ))}
      </div>
    </section>
  );
}
