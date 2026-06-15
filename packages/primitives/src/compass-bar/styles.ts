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

export const compassBarClass = css({
  display: "grid",
  minWidth: "280px",
  gap: space1,
  color: text,
  fontFamily: "var(--game-ui-font-sans)",
});

export const compassBarHeadingClass = css({
  color: "var(--game-ui-marker-objective)",
  fontSize: "12px",
  fontWeight: "900",
  textAlign: "center",
});

export const compassBarMarkerRecipe = cva({
  base: {
    position: "absolute",
    top: "50%",
    left: "var(--game-ui-compass-position)",
    color: muted,
    fontSize: "10px",
    fontWeight: "900",
    transform: "translate(-50%, -50%)",
  },
  variants: {
    tone: {
      ally: { color: "var(--game-ui-marker-ally)" },
      enemy: { color: "var(--game-ui-marker-enemy)" },
      objective: { color: "var(--game-ui-marker-objective)" },
      neutral: {},
    },
  },
  defaultVariants: {
    tone: "neutral",
  },
});

export const compassBarTrackClass = css({
  position: "relative",
  display: "block",
  height: "30px",
  border: "1px solid var(--game-ui-map-line)",
  borderRadius: "999px",
  background: `linear-gradient(90deg, transparent 24%, var(--game-ui-map-line) 25%, transparent 26% 74%, var(--game-ui-map-line) 75%, transparent 76%), ${panelSurface}`,
});
