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

export const locationTagMetaClass = css(upperLabel);

export const locationTagRecipe = cva({
  base: {
    display: "inline-grid",
    gap: "2px",
    minWidth: "160px",
    padding: "9px 11px",
    border: "1px solid var(--game-ui-map-line)",
    borderRadius: radiusMd,
    background: panelSurface,
    color: text,
    fontFamily: "var(--game-ui-font-sans)",
  },
  variants: {
    danger: {
      safe: {},
      contested: { borderColor: "var(--game-ui-marker-objective)" },
      hostile: { borderColor: "var(--game-ui-marker-enemy)" },
    },
  },
  defaultVariants: {
    danger: "safe",
  },
});
