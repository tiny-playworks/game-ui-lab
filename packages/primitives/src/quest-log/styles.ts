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

export const questLogActiveClass = css({
  color: "var(--game-ui-choice)",
  fontSize: "11px",
  fontWeight: "900",
  textTransform: "uppercase",
});

export const questLogClass = css({
  display: "grid",
  gap: space3,
  minWidth: "320px",
  color: text,
  fontFamily: "var(--game-ui-font-sans)",
});

export const questLogHeaderClass = css({ display: "flex", justifyContent: "space-between", ...upperLabel });

export const questLogListClass = css({ display: "grid", gap: space3 });

export const questLogQuestClass = css({
  display: "block",
  width: "100%",
  padding: 0,
  border: 0,
  borderRadius: radiusLg,
  background: "transparent",
  color: "inherit",
  cursor: "pointer",
  font: "inherit",
  textAlign: "left",
  '&[data-active="true"]': {
    boxShadow: `0 0 0 2px ${accent}`,
  },
});
