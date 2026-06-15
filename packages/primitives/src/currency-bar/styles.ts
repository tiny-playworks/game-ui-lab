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

export const currencyBarClass = css({
  display: "flex",
  flexWrap: "wrap",
  gap: space2,
  alignItems: "center",
  color: text,
  fontFamily: "var(--game-ui-font-sans)",
});

export const currencyBarItemClass = css({ listStyle: "none" });

export const currencyBarItemRecipe = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: space2,
    padding: "6px 10px",
    border: `1px solid ${line}`,
    borderRadius: radiusMd,
    background: panelSurface,
  },
  variants: {
    tone: {
      gold: { color: "var(--game-ui-currency-gold, var(--game-ui-critical))" },
      silver: { color: "var(--game-ui-muted)" },
      gem: { color: "var(--game-ui-currency-gem, var(--game-ui-loot))" },
      token: { color: accent },
      neutral: { color: text },
    },
    compact: {
      true: { padding: "4px 8px" },
      false: {},
    },
  },
  defaultVariants: {
    tone: "neutral",
    compact: false,
  },
});

export const currencyBarListClass = css({
  display: "flex",
  flexWrap: "wrap",
  gap: space2,
  padding: 0,
  margin: 0,
  listStyle: "none",
});
