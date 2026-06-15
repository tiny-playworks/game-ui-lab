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

export const cooldownSlotIconClass = css({
  position: "relative",
  display: "grid",
  overflow: "hidden",
  width: "52px",
  height: "52px",
  placeItems: "center",
  border: "1px solid color-mix(in srgb, var(--game-ui-cooldown-slot-color), transparent 34%)",
  borderRadius: radiusMd,
  background: `radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.18), transparent 34%), ${panelSurfaceStrong}`,
  boxShadow: shadowSoft,
  color: "var(--game-ui-cooldown-slot-color)",
  fontSize: "20px",
  fontWeight: "900",
});

export const cooldownSlotLabelClass = css({
  overflow: "hidden",
  maxWidth: "72px",
  color: muted,
  fontSize: "11px",
  fontWeight: "800",
  textAlign: "center",
  textOverflow: "ellipsis",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
});

export const cooldownSlotMaskClass = css({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  width: "100%",
  height: "var(--game-ui-cooldown-progress)",
  borderRadius: `${radiusMd} ${radiusMd} 0 0`,
  background: "var(--game-ui-cooldown-mask)",
  pointerEvents: "none",
});

export const cooldownSlotRecipe = cva({
  base: {
    position: "relative",
    display: "grid",
    appearance: "none",
    width: "72px",
    minWidth: "72px",
    gap: "5px",
    placeItems: "center",
    padding: 0,
    border: 0,
    background: "transparent",
    color: text,
    cursor: "default",
    fontFamily: "var(--game-ui-font-sans)",
    font: "inherit",
  },
  variants: {
    ready: {
      true: { "--game-ui-cooldown-slot-color": heal },
      false: { "--game-ui-cooldown-slot-color": accent },
    },
    disabled: {
      true: { opacity: 0.48, "--game-ui-cooldown-slot-color": "var(--game-ui-ability-locked)" },
      false: {},
    },
    selected: {
      true: {
        "--game-ui-cooldown-slot-color": critical,
        transform: "translateY(-3px)",
      },
      false: {},
    },
  },
  defaultVariants: {
    ready: false,
    disabled: false,
    selected: false,
  },
});
