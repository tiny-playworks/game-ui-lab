// @ts-nocheck
import { css, cva } from "@tiny-playworks/styled-system/css";
import {
  panelSurface,
  panelSurfaceStrong,
  line,
  text,
  muted,
  accent,
  heal,
  danger,
  critical,
  loot,
  shield,
  mana,
  energy,
  stamina,
  debuff,
  radiusSm,
  radiusMd,
  radiusLg,
  space1,
  space2,
  space3,
  space4,
  space5,
  shadowSoft,
  shadowGlow,
  upperLabel,
} from "../tokens";

export const abilityTooltipDescriptionClass = css({ color: muted, fontSize: "13px" });

export const abilityTooltipKindClass = css(upperLabel);

export const abilityTooltipMetaClass = css({ display: "flex", gap: space2, ...upperLabel });

export const abilityTooltipNameClass = css({ color: "var(--game-ui-ability-ready)", fontSize: "16px" });

export const abilityTooltipRecipe = cva({
  base: {
    display: "grid",
    gap: space1,
    maxWidth: "280px",
    padding: "12px",
    border: "1px solid color-mix(in srgb, var(--game-ui-ability-ready), transparent 42%)",
    borderRadius: radiusMd,
    background: panelSurfaceStrong,
    boxShadow: shadowSoft,
    color: text,
    fontFamily: "var(--game-ui-font-sans)",
  },
  variants: {
    state: {
      ready: {},
      cooling: {},
      locked: { borderColor: "var(--game-ui-ability-locked)", opacity: 0.72 },
    },
  },
  defaultVariants: {
    state: "ready",
  },
});
