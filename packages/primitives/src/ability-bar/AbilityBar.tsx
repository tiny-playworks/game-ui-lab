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
  shortcut?: ReactNode;
  charges?: number;
  cooldownLabel?: ReactNode;
}

export interface AbilityBarProps {
  abilities: AbilityBarItem[];
  selectedId?: string;
  onAbilityClick?: (id: string, item: AbilityBarItem) => void;
  label?: string;
  className?: string;
}

export function AbilityBar({
  abilities,
  selectedId,
  onAbilityClick,
  label = 'Ability bar',
  className,
}: AbilityBarProps) {
  return (
    <div className={mergeClass(abilityBarClass, className)} role="group" aria-label={label}>
      {abilities.map((ability) => (
        <div
          className={abilityBarItemClass}
          key={ability.id}
          data-locked={ability.locked ?? false}
          data-selected={selectedId === ability.id}
        >
          <CooldownSlot
            progress={ability.progress ?? (ability.ready ? 1 : 0)}
            label={ability.label}
            icon={ability.icon}
            ready={ability.ready}
            selected={selectedId === ability.id}
            disabled={ability.locked}
            shortcut={ability.shortcut}
            charges={ability.charges}
            cooldownLabel={ability.cooldownLabel}
            onClick={ability.locked ? undefined : onAbilityClick ? () => onAbilityClick(ability.id, ability) : undefined}
          />
          {ability.cost ? <span className={abilityBarCostClass}>{ability.cost}</span> : null}
        </div>
      ))}
    </div>
  );
}
