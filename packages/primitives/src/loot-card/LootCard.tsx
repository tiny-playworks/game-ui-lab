import React from "react";
import type { ReactNode } from "react";
import {
  lootCardBodyClass,
  lootCardIconClass,
  lootCardMetaClass,
  lootCardNameClass,
  lootCardQuantityClass,
  lootCardRecipe,
  lootCardTextClass,
  mergeClass,
} from "../styles";

export type LootRarity = "common" | "rare" | "epic" | "legendary";

export interface LootCardProps {
  name: string;
  rarity?: LootRarity;
  quantity?: number;
  value?: string;
  subtitle?: string;
  icon?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

function formatQuantity(quantity?: number) {
  if (!quantity || quantity <= 1) {
    return null;
  }

  return `x${Math.round(quantity)}`;
}

export function LootCard({
  name,
  rarity = "common",
  quantity,
  value,
  subtitle,
  icon,
  selected = false,
  onClick,
  className,
}: LootCardProps) {
  const quantityText = formatQuantity(quantity);
  const Component = onClick ? "button" : "article";
  const componentProps = onClick
    ? {
        type: "button" as const,
        onClick,
        "aria-pressed": selected,
        "aria-label": `${name} ${rarity} loot`,
      }
    : {
        "aria-label": `${name} ${rarity} loot`,
      };

  return (
    <Component
      className={mergeClass(lootCardRecipe({ rarity, selected }), className)}
      data-rarity={rarity}
      data-selected={selected}
      {...componentProps}
    >
      <span className={lootCardIconClass} aria-hidden="true">
        {icon ?? name.slice(0, 1)}
      </span>
      <span className={lootCardBodyClass}>
        <span className={lootCardNameClass}>{name}</span>
        {subtitle ? <span className={lootCardTextClass}>{subtitle}</span> : null}
      </span>
      <span className={lootCardMetaClass}>
        {quantityText ? <span className={lootCardQuantityClass}>{quantityText}</span> : null}
        {value ? <span className={lootCardTextClass}>{value}</span> : null}
      </span>
    </Component>
  );
}
