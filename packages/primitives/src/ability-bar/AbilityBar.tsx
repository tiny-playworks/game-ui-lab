import React from "react";
import type { CSSProperties, ReactNode } from "react";
import { CooldownSlot } from "../cooldown-slot/CooldownSlot";
import { abilityBarClass, abilityBarCostClass, abilityBarItemClass, mergeClass } from "../styles";
import type { GameUiCollectionRenderer } from "../types";

export type AbilityBarItemVariant = "basic" | "ultimate" | "passive";

export interface AbilityBarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  progress?: number;
  ready?: boolean;
  active?: boolean;
  locked?: boolean;
  cost?: ReactNode;
  resourceCost?: ReactNode;
  shortcut?: ReactNode;
  triggerKey?: string;
  charges?: number;
  cooldownLabel?: ReactNode;
  cooldownText?: ReactNode;
  comboHint?: ReactNode;
  variant?: AbilityBarItemVariant;
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
  label = "Ability bar",
  className,
  style,
}: AbilityBarProps) {
  function handleKeyDown(event: React.KeyboardEvent<HTMLFieldSetElement>) {
    if (!onAbilityClick) {
      return;
    }

    const key = event.key.toLowerCase();
    const ability = abilities.find((item) => item.triggerKey?.toLowerCase() === key && !item.locked);

    if (!ability) {
      return;
    }

    event.preventDefault();
    onAbilityClick(ability.id, ability);
  }

  return (
    <fieldset
      className={mergeClass(abilityBarClass, className)}
      aria-label={label}
      style={style}
      onKeyDown={handleKeyDown}
    >
      {abilities.map((ability, index) => {
        const selected = selectedId === ability.id;
        const active = Boolean(ability.active);
        const disabled = Boolean(ability.locked);
        const variant = ability.variant ?? "basic";
        const cost = ability.resourceCost ?? ability.cost;
        const defaultNode = (
          <div
            className={mergeClass(abilityBarItemClass, ability.className)}
            data-active={active}
            data-locked={disabled}
            data-selected={selected}
            data-trigger-key={ability.triggerKey}
            data-variant={variant}
          >
            <CooldownSlot
              progress={ability.progress ?? (ability.ready ? 1 : 0)}
              label={ability.label}
              icon={ability.icon}
              ready={ability.ready}
              selected={selected || active}
              disabled={ability.locked}
              shortcut={ability.shortcut ?? ability.triggerKey}
              charges={ability.charges}
              cooldownLabel={ability.cooldownText ?? ability.cooldownLabel}
              onClick={
                ability.locked ? undefined : onAbilityClick ? () => onAbilityClick(ability.id, ability) : undefined
              }
            />
            {cost ? <span className={abilityBarCostClass}>{cost}</span> : null}
            {ability.comboHint ? <span className={abilityBarCostClass}>{ability.comboHint}</span> : null}
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
