import React from 'react';
import type { ReactNode } from 'react';
import { CooldownSlot } from '../cooldown-slot';
import { abilityBarClass, abilityBarCostClass, abilityBarItemClass, mergeClass } from '../styles';

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
    <div className={mergeClass(abilityBarClass, className)} role="group" aria-label={label}>
      {abilities.map((ability) => (
        <div className={abilityBarItemClass} key={ability.id} data-locked={ability.locked ?? false}>
          <CooldownSlot
            progress={ability.progress ?? (ability.ready ? 1 : 0)}
            label={ability.label}
            icon={ability.icon}
            ready={ability.ready}
            disabled={ability.locked}
          />
          {ability.cost ? <span className={abilityBarCostClass}>{ability.cost}</span> : null}
        </div>
      ))}
    </div>
  );
}
