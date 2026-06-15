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

export const mapMarkerDotRecipe = cva({
  base: {
    display: "grid",
    width: "12px",
    height: "12px",
    placeItems: "center",
    border: "2px solid var(--game-ui-marker-color)",
    borderRadius: "999px",
    background: "rgba(4, 8, 18, 0.84)",
    boxShadow: "0 0 16px color-mix(in srgb, var(--game-ui-marker-color), transparent 58%)",
  },
  variants: {
    active: {
      true: { width: "16px", height: "16px" },
      false: {},
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const mapMarkerLabelClass = css({
  padding: "2px 5px",
  border: "1px solid color-mix(in srgb, var(--game-ui-marker-color), transparent 46%)",
  borderRadius: "999px",
  background: panelSurface,
});

export const mapMarkerRecipe = cva({
  base: {
    "--game-ui-marker-color": muted,
    position: "absolute",
    top: "var(--game-ui-marker-y)",
    left: "var(--game-ui-marker-x)",
    display: "inline-flex",
    appearance: "none",
    alignItems: "center",
    gap: "5px",
    padding: 0,
    border: 0,
    background: "transparent",
    color: "var(--game-ui-marker-color)",
    cursor: "default",
    fontFamily: "var(--game-ui-font-sans)",
    font: "inherit",
    fontSize: "10px",
    fontWeight: "900",
    transform: "translate(-50%, -50%)",
  },
  variants: {
    tone: {
      ally: { "--game-ui-marker-color": "var(--game-ui-marker-ally)" },
      enemy: { "--game-ui-marker-color": "var(--game-ui-marker-enemy)" },
      objective: { "--game-ui-marker-color": "var(--game-ui-marker-objective)" },
      neutral: {},
    },
    active: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    tone: "neutral",
    active: false,
  },
});
