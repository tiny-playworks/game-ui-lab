import React from 'react';
import type { ReactNode } from 'react';
import { CooldownSlot } from '../cooldown-slot';

export interface AbilityBarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  progress?: number;
  ready?: boolean;
  locked?: boolean;
  cost?: ReactNode;
}

export interface AbilityBarProps {
  abilities: AbilityBarItem[];
  label?: string;
  className?: string;
}

export function AbilityBar({ abilities, label = 'Ability bar', className }: AbilityBarProps) {
  return (
    <div className={['game-ui-ability-bar', className].filter(Boolean).join(' ')} role="group" aria-label={label}>
      {abilities.map((ability) => (
        <div className="game-ui-ability-bar__item" key={ability.id} data-locked={ability.locked ?? false}>
          <CooldownSlot
            progress={ability.progress ?? (ability.ready ? 1 : 0)}
            label={ability.label}
            icon={ability.icon}
            ready={ability.ready}
            disabled={ability.locked}
          />
          {ability.cost ? <span className="game-ui-ability-bar__cost">{ability.cost}</span> : null}
        </div>
      ))}
    </div>
  );
}
