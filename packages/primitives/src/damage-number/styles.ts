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

export const damageNumberPrefixClass = css({
  marginRight: "4px",
  color: "currentColor",
  fontSize: "0.56em",
});

export const damageNumberRecipe = cva({
  base: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "56px",
    padding: "2px 8px",
    color: danger,
    fontFamily: "var(--game-ui-font-display)",
    fontSize: "var(--game-ui-damage-size, 34px)",
    lineHeight: "1",
    textShadow: "0 2px 0 rgba(0, 0, 0, 0.52), 0 0 18px currentColor",
    pointerEvents: "none",
    userSelect: "none",
    whiteSpace: "nowrap",
  },
  variants: {
    variant: {
      damage: { color: danger },
      heal: { color: heal },
      critical: { color: critical, letterSpacing: "0" },
      miss: { color: "var(--game-ui-miss)", fontSize: "calc(var(--game-ui-damage-size, 34px) * 0.72)" },
    },
  },
  defaultVariants: {
    variant: "damage",
  },
});
