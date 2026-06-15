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

export const rewardRevealActionClass = css({
  minHeight: "34px",
  border: "1px solid color-mix(in srgb, var(--game-ui-loot), transparent 28%)",
  borderRadius: radiusMd,
  background: "color-mix(in srgb, var(--game-ui-loot), transparent 84%)",
  color: text,
  cursor: "pointer",
  font: "inherit",
  fontSize: "12px",
  fontWeight: "900",
  textTransform: "uppercase",
});

export const rewardRevealHeaderClass = css({ display: "grid", gap: "3px" });

export const rewardRevealRecipe = cva({
  base: {
    position: "relative",
    display: "grid",
    gap: space3,
    minWidth: "280px",
    padding: "14px",
    border: "1px solid color-mix(in srgb, var(--game-ui-loot), transparent 42%)",
    borderRadius: radiusLg,
    background: `radial-gradient(circle at 20% 0%, color-mix(in srgb, var(--game-ui-loot), transparent 78%), transparent 34%), ${panelSurfaceStrong}`,
    boxShadow: `${shadowSoft}, 0 0 28px color-mix(in srgb, var(--game-ui-loot), transparent 82%)`,
    color: text,
    fontFamily: "var(--game-ui-font-sans)",
  },
  variants: {
    state: {
      sealed: {},
      revealed: {},
      claimed: { opacity: 0.72 },
    },
  },
  defaultVariants: {
    state: "sealed",
  },
});

export const rewardRevealStateClass = css({
  color: loot,
  fontSize: "11px",
  fontWeight: "900",
  textTransform: "uppercase",
});

export const rewardRevealTitleClass = css({ fontSize: "16px" });
