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

export const loadingOverlayClass = css({
  position: "fixed",
  inset: 0,
  display: "grid",
  placeContent: "center",
  justifyItems: "center",
  gap: space3,
  padding: space3,
  background: "rgba(3, 7, 18, 0.84)",
  color: text,
  fontFamily: "var(--game-ui-font-sans)",
  pointerEvents: "auto",
});

export const loadingOverlayMessageClass = css({ color: muted, fontSize: "14px", fontWeight: "700" });

export const loadingOverlayProgressClass = css({
  display: "block",
  width: "min(320px, 80vw)",
  height: "8px",
  border: "none",
  appearance: "none",
  borderRadius: "999px",
  background: `linear-gradient(90deg, ${accent} var(--game-ui-loading-progress, 0%), color-mix(in srgb, ${line}, transparent 40%) var(--game-ui-loading-progress, 0%))`,
  "&::-webkit-progress-bar": {
    borderRadius: "999px",
    background: `color-mix(in srgb, ${line}, transparent 40%)`,
  },
  "&::-webkit-progress-value": {
    borderRadius: "999px",
    background: accent,
  },
  "&::-moz-progress-bar": {
    borderRadius: "999px",
    background: accent,
  },
});

export const loadingOverlayTitleClass = css({ fontSize: "22px", fontWeight: "900" });
