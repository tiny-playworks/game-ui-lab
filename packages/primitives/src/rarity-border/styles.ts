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

export const rarityBorderRecipe = cva({
  base: {
    "--game-ui-rarity-color": "var(--game-ui-rarity-common)",
    position: "relative",
    display: "grid",
    overflow: "hidden",
    border: "1px solid color-mix(in srgb, var(--game-ui-rarity-color), transparent 26%)",
    borderRadius: radiusLg,
    background:
      "linear-gradient(135deg, color-mix(in srgb, var(--game-ui-rarity-color), transparent 86%), transparent 42%), rgba(9, 14, 28, 0.78)",
    boxShadow:
      "inset 0 0 0 1px rgba(255, 255, 255, 0.04), 0 0 28px color-mix(in srgb, var(--game-ui-rarity-color), transparent 78%)",
    "&::before": {
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      background:
        "linear-gradient(120deg, transparent 0 34%, color-mix(in srgb, var(--game-ui-rarity-color), transparent 56%) 48%, transparent 62% 100%)",
      content: '""',
      opacity: 0,
      transform: "translateX(-70%)",
    },
    "& > *": {
      position: "relative",
      zIndex: 1,
    },
  },
  variants: {
    tone: {
      common: {},
      rare: { "--game-ui-rarity-color": "var(--game-ui-rarity-rare)" },
      epic: { "--game-ui-rarity-color": "var(--game-ui-rarity-epic)" },
      legendary: { "--game-ui-rarity-color": "var(--game-ui-rarity-legendary)" },
    },
    active: {
      true: {
        "&::before": {
          animation: "game-ui-rarity-sweep 1.8s var(--game-ui-ease-out) infinite",
          opacity: 0.9,
          "@media (prefers-reduced-motion: reduce)": {
            animation: "none",
            opacity: 0.18,
            transform: "none",
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    tone: "common",
    active: true,
  },
});
