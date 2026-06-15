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

export const pauseMenuActionsClass = css({ display: "grid", gap: space2, minWidth: "220px" });

export const pauseMenuClass = css({
  position: "fixed",
  inset: 0,
  display: "grid",
  maxWidth: "none",
  maxHeight: "none",
  margin: 0,
  placeItems: "center",
  padding: space3,
  border: "none",
  background: "rgba(3, 7, 18, 0.72)",
  color: text,
  fontFamily: "var(--game-ui-font-sans)",
  pointerEvents: "auto",
});

export const pauseMenuItemRecipe = cva({
  base: {
    padding: "10px 14px",
    border: `1px solid ${line}`,
    borderRadius: radiusMd,
    background: panelSurfaceStrong,
    color: text,
    fontWeight: "800",
    cursor: "pointer",
    transition: "border-color var(--game-ui-duration-fast)",
  },
  variants: {
    danger: {
      true: { borderColor: danger, color: danger },
      false: {},
    },
  },
  defaultVariants: { danger: false },
});

export const pauseMenuTitleClass = css({ fontSize: "20px", fontWeight: "900" });
