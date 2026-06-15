import React from "react";
import type { ReactNode } from "react";
import { mergeClass } from "../styles";
import { rarityBorderRecipe } from "./styles";

export type RarityBorderTone = "common" | "rare" | "epic" | "legendary";

export interface RarityBorderProps {
  children: ReactNode;
  tone?: RarityBorderTone;
  active?: boolean;
  className?: string;
}

export function RarityBorder({ children, tone = "common", active = true, className }: RarityBorderProps) {
  return (
    <div className={mergeClass(rarityBorderRecipe({ tone, active }), className)} data-tone={tone} data-active={active}>
      {children}
    </div>
  );
}
