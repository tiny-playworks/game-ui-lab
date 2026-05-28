import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { CooldownSlot } from '../cooldown-slot/CooldownSlot';
import { abilityBarClass, abilityBarCostClass, abilityBarItemClass, mergeClass } from '../styles';
import type { GameUiCollectionRenderer } from '../types';

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
  className?: string;
}

export interface AbilityBarProps {
  abilities: AbilityBarItem[];
  selectedId?: string;
  onAbilityClick?: (id: string, item: AbilityBarItem) => void;
  renderAbility?: GameUiCollectionRenderer<AbilityBarItem>;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function AbilityBar({
  abilities,
  selectedId,
  onAbilityClick,
  renderAbility,
  label = 'Ability bar',
  className,
  style,
}: AbilityBarProps) {
  return (
    <fieldset className={mergeClass(abilityBarClass, className)} aria-label={label} style={style}>
      {abilities.map((ability, index) => {
        const selected = selectedId === ability.id;
        const disabled = Boolean(ability.locked);
        const defaultNode = (
          <div
            className={mergeClass(abilityBarItemClass, ability.className)}
            data-locked={disabled}
            data-selected={selected}
          >
            <CooldownSlot
              progress={ability.progress ?? (ability.ready ? 1 : 0)}
              label={ability.label}
              icon={ability.icon}
              ready={ability.ready}
              selected={selected}
              disabled={ability.locked}
              shortcut={ability.shortcut}
              charges={ability.charges}
              cooldownLabel={ability.cooldownLabel}
              onClick={ability.locked ? undefined : onAbilityClick ? () => onAbilityClick(ability.id, ability) : undefined}
            />
            {ability.cost ? <span className={abilityBarCostClass}>{ability.cost}</span> : null}
          </div>
        );

        return (
          <React.Fragment key={ability.id}>
            {renderAbility ? renderAbility(ability, { index, selected, disabled }, defaultNode) : defaultNode}
          </React.Fragment>
        );
      })}
    </fieldset>
  );
}
