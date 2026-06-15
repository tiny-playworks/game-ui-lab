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

export const gameTimerBarClass = css({
  display: "block",
  height: "6px",
  borderRadius: "999px",
  background: `linear-gradient(90deg, ${accent} var(--game-ui-timer-progress, 100%), color-mix(in srgb, ${line}, transparent 40%) var(--game-ui-timer-progress, 100%))`,
});

export const gameTimerLabelClass = css(upperLabel);

export const gameTimerRecipe = cva({
  base: {
    display: "grid",
    gap: space2,
    minWidth: "180px",
    padding: space2,
    border: `1px solid ${line}`,
    borderRadius: radiusMd,
    background: panelSurface,
    color: text,
    fontFamily: "var(--game-ui-font-sans)",
  },
  variants: {
    variant: { bar: {}, ring: { justifyItems: "center" } },
    warning: {
      true: { borderColor: danger, color: danger },
      false: {},
    },
  },
  defaultVariants: { variant: "bar", warning: false },
});

export const gameTimerRingClass = css({
  display: "grid",
  width: "56px",
  height: "56px",
  placeItems: "center",
  borderRadius: "50%",
  border: `3px solid color-mix(in srgb, ${accent}, transparent 60%)`,
  background: `conic-gradient(${accent} var(--game-ui-timer-progress, 100%), transparent var(--game-ui-timer-progress, 100%))`,
});

export const gameTimerValueClass = css({ fontSize: "18px", fontWeight: "900" });
