import React from "react";
import type { ReactNode } from "react";
import {
  abilityTooltipDescriptionClass,
  abilityTooltipKindClass,
  abilityTooltipMetaClass,
  abilityTooltipNameClass,
  abilityTooltipRecipe,
  mergeClass,
} from "../styles";

export type AbilityTooltipState = "ready" | "cooling" | "locked";

export interface AbilityTooltipProps {
  name: string;
  description: ReactNode;
  cost?: ReactNode;
  cooldown?: ReactNode;
  state?: AbilityTooltipState;
  kind?: string;
  className?: string;
}

export function AbilityTooltip({
  name,
  description,
  cost,
  cooldown,
  state = "ready",
  kind = "Ability",
  className,
}: AbilityTooltipProps) {
  return (
    <article
      className={mergeClass(abilityTooltipRecipe({ state }), className)}
      data-state={state}
      role="tooltip"
      aria-label={`${name} ${state}`}
    >
      <span className={abilityTooltipKindClass}>{kind}</span>
      <strong className={abilityTooltipNameClass}>{name}</strong>
      <span className={abilityTooltipDescriptionClass}>{description}</span>
      <span className={abilityTooltipMetaClass}>
        {cost ? <span>Cost {cost}</span> : null}
        {cooldown ? <span>Cooldown {cooldown}</span> : null}
      </span>
    </article>
  );
}
