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

export const floatingToastActionClass = css({
  minHeight: "28px",
  padding: "0 9px",
  border: `1px solid ${line}`,
  borderRadius: radiusSm,
  background: "rgba(255, 255, 255, 0.06)",
  color: text,
  cursor: "pointer",
  font: "inherit",
  fontSize: "12px",
  fontWeight: "800",
});

export const floatingToastCloseClass = css({
  display: "grid",
  width: "24px",
  height: "24px",
  placeItems: "center",
  border: `1px solid ${line}`,
  borderRadius: "999px",
  background: "rgba(255, 255, 255, 0.04)",
  color: muted,
  cursor: "pointer",
  font: "inherit",
  fontSize: "12px",
  fontWeight: "900",
});

export const floatingToastContentClass = css({ display: "grid", gap: "2px" });

export const floatingToastIconRecipe = cva({
  base: {
    display: "grid",
    width: "26px",
    height: "26px",
    placeItems: "center",
    border: "1px solid currentColor",
    borderRadius: "999px",
    color: accent,
    fontSize: "13px",
    fontWeight: "800",
  },
  variants: {
    variant: {
      info: { color: accent },
      success: { color: heal },
      warning: { color: critical },
      loot: { color: loot },
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export const floatingToastMessageClass = css({ color: muted, fontSize: "13px" });

export const floatingToastRecipe = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: space2,
    maxWidth: "min(420px, 88vw)",
    padding: "10px 14px",
    border: `1px solid ${line}`,
    borderLeft: `4px solid ${accent}`,
    borderRadius: radiusMd,
    background: `linear-gradient(135deg, rgba(85, 247, 210, 0.12), transparent 44%), ${panelSurfaceStrong}`,
    boxShadow: `${shadowSoft}, ${shadowGlow}`,
    color: text,
    fontFamily: "var(--game-ui-font-sans)",
  },
  variants: {
    variant: {
      info: { borderLeftColor: accent },
      success: { borderLeftColor: heal },
      warning: { borderLeftColor: critical },
      loot: { borderLeftColor: loot },
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export const floatingToastTitleClass = css({ fontSize: "13px", fontWeight: "800", textTransform: "uppercase" });
